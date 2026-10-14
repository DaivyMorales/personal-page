"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** One letter of the name: rises in on load, then swells as the cursor passes over it. */
function Letter({ char, index, pointerX }: { char: string; index: number; pointerX: MotionValue<number> }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  // Distance from the cursor to this letter's centre, mapped to a lift like the macOS dock.
  const proximity = useTransform(pointerX, (x) => {
    const el = ref.current;
    if (!el || x < 0 || reduce) return 0;
    const r = el.getBoundingClientRect();
    const d = Math.abs(x - (r.left + r.width / 2));
    return Math.max(0, 1 - d / 320);
  });
  const lift = useSpring(useTransform(proximity, [0, 1], [0, -0.09]), { stiffness: 220, damping: 18 });
  const stretch = useSpring(useTransform(proximity, [0, 1], [1, 1.08]), { stiffness: 220, damping: 18 });
  const y = useMotionTemplate`${lift}em`;

  return (
    <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
      <motion.span
        ref={ref}
        className="inline-block origin-bottom"
        initial={{ y: "110%", rotate: 8, filter: "blur(14px)", opacity: 0 }}
        animate={{ y: "0%", rotate: 0, filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.15 + index * 0.07 }}
      >
        <motion.span className="inline-block origin-bottom" style={{ y, scaleY: stretch }}>
          {char}
        </motion.span>
      </motion.span>
    </span>
  );
}

export function Hero({ name, children }: { name: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(-1);
  const reduce = useReducedMotion();

  // As the hero scrolls away the title shrinks, rises and blurs out.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const scale = useTransform(progress, [0, 1], [1, reduce ? 1 : 0.82]);
  const y = useTransform(progress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const opacity = useTransform(progress, [0, 0.85], [1, 0]);
  const blur = useTransform(progress, [0, 1], [0, reduce ? 0 : 10]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <header
      ref={ref}
      className="hero"
      onPointerMove={(e) => pointerX.set(e.clientX)}
      onPointerLeave={() => pointerX.set(-1)}
    >
      <motion.h1 className="hero-title" style={{ scale, y, opacity, filter }} aria-label={name}>
        <span aria-hidden="true">
          {[...name].map((char, i) => (
            <Letter key={i} char={char} index={i} pointerX={pointerX} />
          ))}
        </span>
      </motion.h1>
      <motion.div
        className="hero-lede"
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease, delay: 0.15 + name.length * 0.07 + 0.35 }}
      >
        {children}
      </motion.div>
    </header>
  );
}
