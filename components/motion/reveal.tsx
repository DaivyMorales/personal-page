"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue, type Variants } from "motion/react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Fades, lifts and un-blurs its children the first time they scroll into view. */
export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewport}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Heading text wiped in from the left, like a cursor typing it out. */
export function WipeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ clipPath: "inset(0 100% 0 0)", x: -12 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", x: 0 }}
      viewport={viewport}
      transition={{ duration: 1, ease }}
    >
      {children}
    </motion.span>
  );
}

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const item: Variants = {
  hidden: { opacity: 0, x: -24, filter: "blur(6px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.75, ease } },
};

const lists = { ul: motion.ul, tbody: motion.tbody } as const;
const items = { li: motion.li, tr: motion.tr } as const;

/** A list whose items slide in one after another. Pair with <StaggerItem>. */
export function Stagger({ as = "ul", className, children }: { as?: keyof typeof lists; className?: string; children: React.ReactNode }) {
  const Tag = lists[as];
  return (
    <Tag className={className} variants={list} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = "li", className, children }: { as?: keyof typeof items; className?: string; children: React.ReactNode }) {
  const Tag = items[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blur = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);
  return (
    <motion.span style={{ opacity, filter: blur }} className="inline-block whitespace-pre">
      {word}{" "}
    </motion.span>
  );
}

/** Text whose words light up one by one as it scrolls through the screen. */
export function ScrubText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] });
  const words = text.split(" ");

  if (reduce) return <span>{text}</span>;
  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </span>
    </span>
  );
}
