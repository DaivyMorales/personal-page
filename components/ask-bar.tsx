"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import portrait from "@/assets/daivy.jpg";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";

/**
 * A pill-shaped "Ask me anything…" box that floats at the bottom of the screen, like
 * america.gov's. Typing a question and pressing Enter opens the chat page with it already asked.
 * While empty, it cycles through example questions.
 */
export function AskBar({ lang, t }: { lang: Locale; t: Dictionary["ask"] }) {
  const examples = t.examples;
  const router = useRouter();
  const reduce = useReducedMotion();
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || message || focused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % examples.length), 3800);
    return () => clearInterval(id);
  }, [reduce, message, focused, examples.length]);

  // Open the chat page with the question (or the example on show) already asked.
  const send = () => {
    const q = message.trim() || examples[index];
    router.push(`/${lang}/chat?q=${encodeURIComponent(q)}`);
  };

  return (
    <motion.form
      className="askbar"
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 18, delay: 1.8 }}
    >
      <Image src={portrait} alt="" width={40} height={40} sizes="40px" placeholder="blur" className="askbar-photo" />
      <label className="askbar-field">
        <span className="sr-only">{t.messageLabel}</span>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="off"
        />
        {!message && (
          <span className="askbar-placeholder" aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={focused ? "ask" : index}
                initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {focused ? t.askAnything : `${t.try} “${examples[index]}”`}
              </motion.span>
            </AnimatePresence>
          </span>
        )}
      </label>
      <motion.button
        type="submit"
        className="askbar-send"
        aria-label={t.send}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </motion.button>
    </motion.form>
  );
}
