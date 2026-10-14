"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * si.gov's cursor: a thin ring that trails the pointer and swells into a solid disc over
 * anything clickable. `mix-blend-mode: difference` makes it invert whatever is underneath,
 * so it works on both the white page and the black footer. Mouse users only.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ref.current!;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      ring.classList.remove("cursor-off");
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      ring.classList.toggle("cursor-big", !!target?.closest("a, button, [role=option], input, textarea, label, .sdg"));
    };
    const onLeave = () => ring.classList.add("cursor-off");
    const onDown = () => ring.classList.add("cursor-press");
    const onUp = () => ring.classList.remove("cursor-press");

    const tick = () => {
      // Ease 20% of the way each frame: a soft trailing lag.
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return <div ref={ref} className="cursor-ring cursor-off" aria-hidden="true" />;
}

/**
 * si.gov's page transition: clicking a link to another page grows a solid circle from the
 * click point, shows the page's name, then shrinks away once the new page is in.
 */
export function PageIris({
  pageNames,
  langNames,
}: {
  /** Label per pathname, e.g. { "/es/philosophy": "Cómo trabajo" }. */
  pageNames: Record<string, string>;
  /** Language names by locale, shown when only the language changes. */
  langNames: Record<string, string>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef(false);

  // When the route changes, open the curtain on the new page.
  useEffect(() => {
    const iris = ref.current!;
    if (!pending.current) return;
    pending.current = false;
    // Shrink back into the middle of the new page.
    iris.style.transition = "none";
    iris.style.setProperty("--x", "50%");
    iris.style.setProperty("--y", "50%");
    void iris.offsetWidth;
    iris.style.transition = "";
    const id = requestAnimationFrame(() => iris.classList.remove("iris-on"));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    const iris = ref.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;

      e.preventDefault();
      // Move the (still closed) circle to the click without animating, then grow it from there.
      iris.style.transition = "none";
      iris.style.setProperty("--x", `${e.clientX}px`);
      iris.style.setProperty("--y", `${e.clientY}px`);
      void iris.offsetWidth;
      iris.style.transition = "";
      // Switching language (same page, other locale) shows the language's name instead.
      const [, fromLang, ...fromRest] = location.pathname.split("/");
      const [, toLang, ...toRest] = url.pathname.split("/");
      const samePageOtherLang = fromLang !== toLang && fromRest.join("/") === toRest.join("/");
      labelRef.current!.textContent = samePageOtherLang ? (langNames[toLang] ?? "") : (pageNames[url.pathname] ?? "");
      iris.classList.add("iris-on");
      pending.current = true;
      window.setTimeout(() => router.push(url.pathname + url.hash), 650);
    };
    // Capture phase, so this runs before Next's <Link> handles the click.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, pageNames, langNames]);

  return (
    <div ref={ref} className="iris" aria-hidden="true">
      <b ref={labelRef} />
    </div>
  );
}
