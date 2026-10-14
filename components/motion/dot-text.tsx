"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number; y: number;   // current position
  vx: number; vy: number; // velocity
  tx: number; ty: number; // home position inside the shape
  r: number;              // radius
  a: number;              // base opacity
  phase: number;          // twinkle offset
};

/**
 * Paints the shape to sample onto an off-screen canvas. Anything dark (or, on a light ink,
 * anything bright) becomes dots. `family` is the resolved CSS font family to draw text with.
 */
export type DotPainter = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  family: string,
  /** True when the dots are light (on a dark background): paint solid shapes white. */
  inkLight: boolean,
) => void | Promise<void>;

/**
 * Draws a shape as a field of dots on a grid, the way si.gov draws "SI". Dots fly in from
 * scattered positions, settle into place, drift away from the cursor and twinkle.
 * By default the shape is `text`; pass `paint` to draw anything else (e.g. a photo).
 * The real content is rendered for screen readers by the caller; this canvas is decorative.
 */
export function DotText({
  text,
  paint,
  fontClassName,
  step = 7,
  halftone = false,
  assembleOnView = false,
  shimmer = false,
  className,
}: {
  text: string;
  paint?: DotPainter;
  /** Class that sets the font to sample, e.g. "font-serif". */
  fontClassName: string;
  /** Grid spacing in CSS pixels; smaller means more dots. */
  step?: number;
  /** Size each dot by how dark (or bright) the shape is there, like a printed photo. */
  halftone?: boolean;
  /** Keep the dots scattered until the canvas first scrolls into view. */
  assembleOnView?: boolean;
  /** Sweep a band of light across the dots every few seconds. */
  shimmer?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const paintRef = useRef(paint);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const probe = probeRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = false;
    let running = false;
    let start = assembleOnView ? Infinity : performance.now();
    const pointer = { x: -9999, y: -9999 };

    /** Luminance (0–1) of the ink colour, to decide whether dots mark dark or bright areas. */
    function inkIsLight() {
      const m = getComputedStyle(canvas).color.match(/[\d.]+/g);
      if (!m) return false;
      const [r, g, b] = m.map(Number);
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.5;
    }

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

      // Paint the shape once off-screen, then sample it on a grid.
      const off = document.createElement("canvas");
      off.width = Math.ceil(width);
      off.height = Math.ceil(height);
      const o = off.getContext("2d", { willReadFrequently: true })!;
      const light = inkIsLight();
      if (paintRef.current) {
        await paintRef.current(o, off.width, off.height, family, light);
      } else {
        let size = height * 0.9;
        o.font = `400 ${size}px ${family}`;
        const measured = o.measureText(text).width;
        if (measured > width * 0.92) size *= (width * 0.92) / measured;
        o.font = `400 ${size}px ${family}`;
        o.textAlign = "center";
        o.textBaseline = "alphabetic";
        const m = o.measureText(text);
        const glyphHeight = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
        o.fillStyle = "#000";
        o.fillText(text, width / 2, (height - glyphHeight) / 2 + m.actualBoundingBoxAscent);
      }
      const data = o.getImageData(0, 0, off.width, off.height).data;

      const s = Math.max(4, step * (width < 600 ? 0.7 : 1));
      const next: Dot[] = [];
      for (let y = 0; y < off.height; y += s) {
        for (let x = 0; x < off.width; x += s) {
          const i = (Math.floor(y) * off.width + Math.floor(x)) * 4;
          const alpha = data[i + 3] / 255;
          if (alpha < 0.05) continue;
          const luma = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          // Plain text is drawn black and always reads as full coverage. In halftone mode the
          // painter draws solid shapes in the ink's polarity, and photos use their tone.
          const tone = halftone ? (light ? luma : 1 - luma) : 1;
          const coverage = alpha * tone;
          if (coverage < (halftone ? 0.12 : 0.55)) continue;
          const faint = !halftone && Math.random() < 0.18;
          next.push({
            tx: x, ty: y,
            x: reduce ? x : Math.random() * width,
            y: reduce ? y : Math.random() * height,
            vx: 0, vy: 0,
            r: halftone ? s * (0.1 + 0.32 * coverage) : s * (faint ? 0.16 : 0.22),
            a: halftone ? 0.55 + 0.45 * coverage : faint ? 0.35 : 0.95,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
      dots = next;
      if (reduce) draw(performance.now());
      else if (visible) loop();
    }

    function draw(now: number) {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = getComputedStyle(canvas).color;
      const t = Math.max(0, (now - start) / 1000);
      // A soft band of light that crosses the canvas every ~7 seconds.
      const band = shimmer && !reduce ? ((t % 7) / 7) * (width + 600) - 300 : -99999;
      for (const d of dots) {
        const twinkle = reduce ? 1 : 0.75 + 0.25 * Math.sin(t * 1.6 + d.phase);
        const glow = shimmer ? Math.exp(-(((d.x - band) / 140) ** 2)) : 0;
        ctx.globalAlpha = Math.min(1, d.a * twinkle + glow * 0.5);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * (1 + glow * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function physics(now: number) {
      const t = (now - start) / 1000;
      if (t < 0) return; // still waiting to assemble
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
        physics(now);
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

    // Run only while on screen; with assembleOnView, the first sighting starts the flight in.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && start === Infinity) start = performance.now();
        if (visible && !reduce && dots.length) loop();
      },
      { threshold: assembleOnView ? 0.25 : 0 },
    );
    io.observe(canvas);

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 120);
    });
    ro.observe(canvas);

    // Rebuild when the colour scheme flips: halftone tones invert with the ink.
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const rebuild = () => build();
    scheme.addEventListener("change", rebuild);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      scheme.removeEventListener("change", rebuild);
      io.disconnect();
      ro.disconnect();
    };
  }, [text, step, halftone, assembleOnView, shimmer]);

  return (
    <>
      <span ref={probeRef} aria-hidden="true" className={`${fontClassName} pointer-events-none absolute opacity-0`}>
        {text}
      </span>
      <canvas ref={canvasRef} aria-hidden="true" className={className} />
    </>
  );
}
