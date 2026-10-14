"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type Principle = { title: string; text: string };

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const ease = [0.7, 0, 0.25, 1] as const;

// True only in the browser, after hydration: the portal target (document.body) doesn't exist on the server.
const noop = () => () => {};
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

/**
 * A teaser button that opens "How I work" in a full-screen window. The window grows as a
 * circle out of the button (like si.gov's page transition) and the principles reveal one by one.
 */
export function PhilosophyModal({
  intro,
  statement,
  principles,
  email,
}: {
  intro: string;
  statement: string;
  principles: Principle[];
  email: string;
}) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const show = () => {
    const r = buttonRef.current!.getBoundingClientRect();
    setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setOpen(true);
  };
  const hide = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  // Lock page scroll, focus the close button, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, hide]);

  const circle = (r: string) => `circle(${r} at ${origin.x}px ${origin.y}px)`;

  return (
    <>
      <button ref={buttonRef} type="button" className="pm-teaser" onClick={show} aria-haspopup="dialog">
        <span className="pm-teaser-line">
          <span className="pm-teaser-words">Want to know how I work?</span>
          <span className="pm-teaser-arrow" aria-hidden="true">
            ↗
          </span>
        </span>
        <span className="pm-teaser-keys" aria-hidden="true">
          Honesty · Trust · Integrity · Humility · People · Craft · Ownership · Generosity
        </span>
      </button>

      {/* Rendered at the end of <body>: a fixed overlay can't live inside a transformed parent. */}
      {mounted &&
        createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pm-title"
            className="pm"
            initial={reduce ? { opacity: 0 } : { clipPath: circle("0px") }}
            animate={reduce ? { opacity: 1 } : { clipPath: circle("150vmax") }}
            exit={reduce ? { opacity: 0 } : { clipPath: circle("0px") }}
            transition={{ duration: reduce ? 0.2 : 0.8, ease }}
          >
            <button ref={closeRef} type="button" className="pm-close" onClick={hide} aria-label="Close">
              <span aria-hidden="true">×</span>
              <span className="pm-close-hint" aria-hidden="true">
                esc
              </span>
            </button>

            <div className="pm-grid">
              <motion.div
                className="pm-side"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="pm-kicker">Philosophy</p>
                <h2 id="pm-title" className="pm-title">
                  How I work
                </h2>
                <p className="pm-intro">{intro}</p>
                <p className="pm-statement">“{statement}”</p>
                <p className="pm-links">
                  <a href={`mailto:${email}`}>Work with me</a>
                  <span aria-hidden="true">·</span>
                  <Link href="/philosophy" onClick={() => document.documentElement.style.removeProperty("overflow")}>
                    Open as a page →
                  </Link>
                </p>
              </motion.div>

              <ol className="pm-list">
                {principles.map((p, i) => (
                  <motion.li
                    key={p.title}
                    className="pm-item"
                    initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: reduce ? 0 : 0.55 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="pm-num" aria-hidden="true">
                      {numerals[i]}
                    </span>
                    <div>
                      <h3 className="pm-item-title">{p.title}</h3>
                      <p className="pm-item-text">{p.text}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
