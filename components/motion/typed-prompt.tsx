"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A shell prompt that types a command, then reveals its "output" (the children) underneath,
 * like running `whoami` in a terminal.
 */
export function TypedPrompt({
  prompt,
  command,
  delay = 1200,
  children,
}: {
  prompt: string;
  command: string;
  /** Milliseconds before typing starts. */
  delay?: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const done = reduce || typed >= command.length;

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let timer: number;
    const tick = () => {
      i += 1;
      setTyped(i);
      if (i < command.length) timer = window.setTimeout(tick, 70 + Math.random() * 60);
    };
    timer = window.setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [command, delay, reduce]);

  return (
    <div className="typed">
      <p className="typed-line" aria-label={`${prompt} ${command}`}>
        <span aria-hidden="true">
          <span className="typed-prompt">{prompt}</span> {reduce ? command : command.slice(0, typed)}
          <span className={done ? "cursor cursor-blink" : "cursor"} />
        </span>
      </p>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.5, delay: reduce ? 0 : 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
