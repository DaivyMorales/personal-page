"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

const ease = [0.22, 1, 0.36, 1] as const;

function useActiveSection(items: TocItem[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return active;
}

/** Sticky contents list on wide screens; a "Contents" button with a full-screen menu on narrow ones. */
export function Toc({ items, labels }: { items: TocItem[]; labels: { contents: string; close: string } }) {
  const active = useActiveSection(items);
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav aria-label={labels.contents} className="toc-panel">
        <ul className="toc">
          {items.map(({ id, label }) => (
            <li key={id}>
              {/* si.gov-style markers: a hollow ring per section, filled for the one in view. */}
              <a href={`#${id}`} aria-current={active === id ? "location" : undefined} className="toc-link">
                <span className="toc-dot" aria-hidden="true">
                  {active === id && (
                    <motion.span
                      layoutId="toc-active"
                      className="toc-dot-fill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className="menu-button fixed top-0 right-0 z-30 cursor-pointer bg-transparent px-[1.7em] py-[0.85em] min-[901px]:hidden"
        aria-expanded={open}
        aria-controls="toc-menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? labels.close : labels.contents}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="toc-menu"
            aria-label={labels.contents}
            className="fixed inset-0 z-20 overflow-auto bg-ground/90 px-[1.7em] pt-[3.4em] min-[901px]:hidden"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35 }}
          >
            <motion.ul
              className="toc text-[2em]"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } }, hidden: {} }}
            >
              {items.map(({ id, label }) => (
                <motion.li
                  key={id}
                  className="overflow-hidden"
                  variants={{
                    hidden: { opacity: 0, y: "100%" },
                    show: { opacity: 1, y: "0%", transition: { duration: 0.6, ease } },
                  }}
                >
                  <a href={`#${id}`} className="opacity-100!" onClick={() => setOpen(false)}>
                    {label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
