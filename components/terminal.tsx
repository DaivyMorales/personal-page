"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { localeCookie, locales, type Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";

export type TerminalSection = { id: string; label: string; hint: string };

type Command = { name: string; hint: string; run: () => void; hidden?: boolean };

// Claude Code's thinking spinner.
const spinner = ["·", "✢", "✳", "✶", "✻", "✽", "✻", "✶", "✳", "✢"];

/** "Sobre mí" → "sobre-mi": a typeable command name from a section label. */
const slug = (label: string) =>
  label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");

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
export function Terminal({
  sections,
  email,
  lang,
  t,
  sdg,
}: {
  sections: TerminalSection[];
  email: string;
  lang: Locale;
  t: Dictionary["terminal"];
  /** The hidden /sdg command's answer. */
  sdg: string;
}) {
  const reduce = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const verbs = t.verbs;
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
  }, [verbs]);
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
      ...sections.map((s) => ({ name: slug(s.label), hint: s.hint, run: () => go(s.id) })),
      { name: lang === "es" ? "correo" : "email", hint: t.emailHint, run: () => (window.location.href = `mailto:${email}`) },
      {
        name: lang === "es" ? "arriba" : "top",
        hint: t.topHint,
        run: () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }),
      },
      {
        name: t.switchName,
        hint: t.switchHint,
        run: () => {
          const other = locales.find((l) => l !== lang)!;
          document.cookie = `${localeCookie}=${other}; path=/; max-age=31536000; samesite=lax`;
          router.push(`/${other}${pathname.replace(/^\/[^/]+/, "")}`);
        },
      },
      { name: lang === "es" ? "ayuda" : "help", hint: t.helpHint, run: () => setEcho({ mono: true, text: t.help }) },
      // Not listed; for anyone who found the footer.
      { name: "sdg", hint: "Soli Deo Gloria", hidden: true, run: () => setEcho({ text: sdg }) },
    ],
    [sections, email, go, reduce, router, pathname, lang, t, sdg],
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
  const answersInPlace = (c: Command) => c.name === "sdg" || c.name === "help" || c.name === "ayuda";
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
      <button type="button" className="statusline" onClick={() => { setEcho(null); setOpen(true); }} aria-label={t.openMenu}>
        <span className="statusline-glyph" aria-hidden="true">
          {busy ? (reduce ? "✻" : spinner[frame]) : "●"}
        </span>
        <span>{busy ? `${verb}… ${where}` : where}</span>
        <span className="statusline-read">
          · {read}% {t.read}
        </span>
        {!busy && (
          <span className="statusline-hint">
            · {t.press} <kbd>/</kbd> {t.forCommands}
          </span>
        )}
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
                <em>{t.title}</em>
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
                  placeholder={t.placeholder}
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
                  {matches.length === 0 && (
                    <li className="term-empty">
                      {t.notFound} {q}
                    </li>
                  )}
                </ul>
              )}
              <p className="term-foot" aria-hidden="true">
                {t.foot}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
