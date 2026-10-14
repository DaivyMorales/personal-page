"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number; y: number;   // current position
  vx: number; vy: number; // velocity
  tx: number; ty: number; // home position inside a glyph
  r: number;              // radius
  a: number;              // base opacity
  phase: number;          // twinkle offset
};

/**
 * Draws `text` as a field of dots on a grid, the way si.gov draws "SI". Dots fly in from
 * scattered positions, settle into the letterforms, drift away from the cursor and twinkle.
 * The real text is rendered for screen readers by the caller; this canvas is decorative.
 */
export function DotText({
  text,
  fontClassName,
  step = 7,
  className,
}: {
  text: string;
  /** Class that sets the font to sample, e.g. "font-serif". */
  fontClassName: string;
  /** Grid spacing in CSS pixels; smaller means more dots. */
  step?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const probe = probeRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let running = false;
    const pointer = { x: -9999, y: -9999 };
    const start = performance.now();

    async function build() {
      const family = getComputedStyle(probe).fontFamily;
      await document.fonts.load(`400 200px ${family}`).catch(() => {});

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!width || !height) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Render the text once off-screen, as large as fits, then sample it on a grid.
      const off = document.createElement("canvas");
      off.width = Math.ceil(width);
      off.height = Math.ceil(height);
      const o = off.getContext("2d", { willReadFrequently: true })!;
      let size = height * 0.9;
      o.font = `400 ${size}px ${family}`;
      const measured = o.measureText(text).width;
      if (measured > width * 0.92) size *= (width * 0.92) / measured;
      o.font = `400 ${size}px ${family}`;
      o.textAlign = "center";
      o.textBaseline = "alphabetic";
      const m = o.measureText(text);
      const glyphHeight = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
      const baseline = (height - glyphHeight) / 2 + m.actualBoundingBoxAscent;
      o.fillStyle = "#000";
      o.fillText(text, width / 2, baseline);
      const data = o.getImageData(0, 0, off.width, off.height).data;

      const s = Math.max(4, step * (width < 600 ? 0.7 : 1));
      const next: Dot[] = [];
      for (let y = 0; y < off.height; y += s) {
        for (let x = 0; x < off.width; x += s) {
          if (data[(Math.floor(y) * off.width + Math.floor(x)) * 4 + 3] < 140) continue;
          // Most dots are full ink; a few are fainter, like the specks in si.gov's letters.
          const faint = Math.random() < 0.18;
          next.push({
            tx: x, ty: y,
            x: reduce ? x : Math.random() * width,
            y: reduce ? y : Math.random() * height,
            vx: 0, vy: 0,
            r: s * (faint ? 0.16 : 0.22),
            a: faint ? 0.35 : 0.95,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
      dots = next;
      if (reduce) draw(performance.now());
      else loop();
    }

    function draw(now: number) {
      const ink = getComputedStyle(canvas).color;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = ink;
      const t = (now - start) / 1000;
      for (const d of dots) {
        const twinkle = reduce ? 1 : 0.75 + 0.25 * Math.sin(t * 1.6 + d.phase);
        ctx.globalAlpha = d.a * twinkle;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function step_(now: number) {
      const t = (now - start) / 1000;
      // Spring strength ramps up over the first second so the dots arrive in a sweep, not a snap.
      const k = Math.min(1, t / 1.2) * 0.06;
      for (const d of dots) {
        let fx = (d.tx - d.x) * k;
        let fy = (d.ty - d.y) * k;
        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        const dist2 = dx * dx + dy * dy;
        const radius = 90;
        if (dist2 < radius * radius) {
          const dist = Math.sqrt(dist2) || 1;
          const push = (1 - dist / radius) * 6;
          fx += (dx / dist) * push;
          fy += (dy / dist) * push;
        }
        d.vx = (d.vx + fx) * 0.82;
        d.vy = (d.vy + fy) * 0.82;
        d.x += d.vx;
        d.y += d.vy;
      }
    }

    function loop() {
      if (running) return;
      running = true;
      const tick = (now: number) => {
        if (!visible) {
          running = false;
          return;
        }
        step_(now);
        draw(now);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    // Pause the loop while the hero is off-screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce && dots.length) loop();
    });
    io.observe(canvas);

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 120);
    });
    ro.observe(canvas);

    // Repaint with the right ink when the colour scheme changes.
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const repaint = () => reduce && draw(performance.now());
    scheme.addEventListener("change", repaint);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      scheme.removeEventListener("change", repaint);
      io.disconnect();
      ro.disconnect();
    };
  }, [text, step]);

  return (
    <>
      <span ref={probeRef} aria-hidden="true" className={`${fontClassName} pointer-events-none absolute opacity-0`}>
        {text}
      </span>
      <canvas ref={canvasRef} aria-hidden="true" className={className} />
    </>
  );
}
