"use client";

import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { DotText } from "@/components/motion/dot-text";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ name, children }: { name: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // As the hero scrolls away the name shrinks, rises and blurs out.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const scale = useTransform(progress, [0, 1], [1, reduce ? 1 : 0.82]);
  const y = useTransform(progress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const opacity = useTransform(progress, [0, 0.85], [1, 0]);
  const blur = useTransform(progress, [0, 1], [0, reduce ? 0 : 10]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <header ref={ref} className="hero">
      <motion.h1 className="hero-title" style={{ scale, y, opacity, filter }}>
        <span className="sr-only">{name}</span>
        {/* The name drawn as a field of dots, like si.gov's "SI". */}
        <DotText text={name} fontClassName="font-serif" className="hero-dots" />
      </motion.h1>
      <motion.div
        className="hero-lede"
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease, delay: 1.1 }}
      >
        {children}
      </motion.div>
    </header>
  );
}
