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

export function StaggerItem({
  as = "li",
  className,
  style,
  children,
  ...data
}: {
  as?: keyof typeof items;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  [dataAttr: `data-${string}`]: string | boolean | undefined;
}) {
  const Tag = items[as];
  return (
    <Tag className={className} style={style} variants={item} {...data}>
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

function Inline({ node, range, progress }: { node: React.ReactNode; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [0.3, 1]);
  const rotate = useTransform(progress, range, [-25, 0]);
  return (
    <motion.span style={{ opacity, scale, rotate }} className="scrub-inline">
      {node}
    </motion.span>
  );
}

export type ScrubPart = string | { inline: React.ReactNode };

/**
 * A sentence whose words light up one by one as it scrolls through the screen. Parts can
 * include small inline pictures that pop in at their place in the sentence, as on america.gov.
 */
export function ScrubText({ text, parts }: { text: string; parts?: ScrubPart[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] });

  // Flatten into units: each word, and each inline picture, gets its own slice of the scroll.
  type Unit = { word: string } | { inline: React.ReactNode };
  const units = (parts ?? [text]).flatMap<Unit>((p) =>
    typeof p === "string" ? p.split(" ").filter(Boolean).map((word) => ({ word })) : [p],
  );

  if (reduce) {
    return (
      <span aria-label={text}>
        <span aria-hidden="true">
          {units.map((u, i) => ("word" in u ? `${u.word} ` : <span key={i} className="scrub-inline">{u.inline}</span>))}
        </span>
      </span>
    );
  }
  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden="true">
        {units.map((u, i) => {
          const range: [number, number] = [i / units.length, (i + 1) / units.length];
          return "word" in u ? (
            <Word key={i} word={u.word} progress={scrollYProgress} range={range} />
          ) : (
            <Inline key={i} node={u.inline} progress={scrollYProgress} range={range} />
          );
        })}
      </span>
    </span>
  );
}
