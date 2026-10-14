"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type TerminalSection = { id: string; label: string; hint: string };

type Command = { name: string; hint: string; run: () => void; hidden?: boolean };

// Claude Code's thinking spinner, and some of its kind of verbs.
const spinner = ["·", "✢", "✳", "✶", "✻", "✽", "✻", "✶", "✳", "✢"];
const verbs = ["Reading", "Pondering", "Scrolling", "Browsing", "Wandering", "Perusing", "Skimming"];

const ease = [0.22, 1, 0.36, 1] as const;

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/**
 * A terminal flavour for the page: a status line in the corner that spins while you scroll,
 * and a slash-command menu (press "/") for jumping around, like Claude Code.
 */
export function Terminal({ sections, email }: { sections: TerminalSection[]; email: string }) {
  const reduce = useReducedMotion();
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids);

  // Status line: spin while scrolling, settle when idle.
  const [busy, setBusy] = useState(false);
  const [frame, setFrame] = useState(0);
  const [verb, setVerb] = useState(verbs[0]);
  const [read, setRead] = useState(0);
  useEffect(() => {
    let idle = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setRead(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
      setBusy((was) => {
        if (!was) setVerb(verbs[Math.floor(Math.random() * verbs.length)]);
        return true;
      });
      clearTimeout(idle);
      idle = window.setTimeout(() => setBusy(false), 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idle);
    };
  }, []);
  useEffect(() => {
    if (!busy || reduce) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % spinner.length), 90);
    return () => clearInterval(id);
  }, [busy, reduce]);

  // Slash commands.
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [echo, setEcho] = useState<{ text: string; mono?: boolean } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [reduce]);

  const commands: Command[] = useMemo(
    () => [
      ...sections.map((s) => ({ name: s.id, hint: s.hint, run: () => go(s.id) })),
      { name: "email", hint: "Write to me", run: () => (window.location.href = `mailto:${email}`) },
      { name: "top", hint: "Back to the top", run: () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }) },
      {
        name: "help",
        hint: "How to use this menu",
        run: () =>
          setEcho({
            mono: true,
            text: "/        open this menu\n↑ ↓      move up and down\nenter    go there\nesc      close",
          }),
      },
      // Not listed; for anyone who found the footer.
      { name: "sdg", hint: "Soli Deo Gloria", hidden: true, run: () => setEcho({ text: "Soli Deo Gloria. In Christ I trust. ✝" }) },
    ],
    [sections, email, go, reduce],
  );

  const q = query.replace(/^\//, "").trim().toLowerCase();
  const matches = commands.filter((c) => (c.hidden ? q === c.name : c.name.startsWith(q)));
  const selected = matches[Math.min(cursor, matches.length - 1)];

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, []);

  // Commands that answer in the window keep it open; the rest close it first.
  const answersInPlace = (c: Command) => c.name === "sdg" || c.name === "help";
  const runSelected = () => {
    if (!selected) return;
    if (!answersInPlace(selected)) close();
    selected.run();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof Element && e.target.closest("input, textarea, [contenteditable]");
      if (!open && e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setEcho(null);
        setOpen(true);
      } else if (open && e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const where = active ? `~/${active}` : "~";

  return (
    <>
      {/* Status line */}
      <button type="button" className="statusline" onClick={() => { setEcho(null); setOpen(true); }} aria-label="Open command menu">
        <span className="statusline-glyph" aria-hidden="true">
          {busy ? (reduce ? "✻" : spinner[frame]) : "●"}
        </span>
        <span>{busy ? `${verb}… ${where}` : where}</span>
        <span className="statusline-read">· {read}% read</span>
        {!busy && <span className="statusline-hint">· press <kbd>/</kbd> for commands</span>}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="term-backdrop"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Commands"
              className="term"
              initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 16, scale: 0.98, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease }}
            >
              <div className="term-bar" aria-hidden="true">
                <span /><span /><span />
                <em>daivy — commands</em>
              </div>
              <label className="term-input">
                <span aria-hidden="true">&gt;</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCursor(0);
                    setEcho(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setCursor((c) => Math.min(c + 1, matches.length - 1));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setCursor((c) => Math.max(c - 1, 0));
                    } else if (e.key === "Enter") {
                      e.preventDefault();
                      runSelected();
                    }
                  }}
                  placeholder="/ type a command"
                  aria-label="Command"
                  aria-controls="term-list"
                  aria-activedescendant={selected ? `cmd-${selected.name}` : undefined}
                  autoComplete="off"
                  spellCheck={false}
                />
              </label>
              {echo ? (
                <p className={echo.mono ? "term-echo term-echo-mono" : "term-echo"}>{echo.text}</p>
              ) : (
                <ul id="term-list" role="listbox" className="term-list">
                  {matches.map((c) => (
                    <li
                      key={c.name}
                      id={`cmd-${c.name}`}
                      role="option"
                      aria-selected={c === selected}
                      onMouseEnter={() => setCursor(matches.indexOf(c))}
                      onClick={() => {
                        if (!answersInPlace(c)) close();
                        c.run();
                      }}
                    >
                      <span className="term-name">/{c.name}</span>
                      <span className="term-hint">{c.hint}</span>
                    </li>
                  ))}
                  {matches.length === 0 && <li className="term-empty">command not found: {q}</li>}
                </ul>
              )}
              <p className="term-foot" aria-hidden="true">
                ↑↓ to move · enter to run · esc to close
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
