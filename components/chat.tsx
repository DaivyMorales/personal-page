"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import portrait from "@/assets/daivy.jpg";
import { Rich } from "@/components/rich";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";

type ChatCopy = Dictionary["chat"];
type Answer = ChatCopy["fallback"];

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; answer: Answer; shown: number; status: "thinking" | "streaming" | "done" };

const ease = [0.22, 1, 0.36, 1] as const;
const spinner = ["·", "✢", "✳", "✶", "✻", "✽", "✻", "✶", "✳", "✢"];

/** Lowercase, strip accents and punctuation: "¿Dónde estudiaste?" → ["donde", "estudiaste"]. */
const words = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

/**
 * The mock "model": pick the knowledge entry sharing the most keywords with the question.
 * Multi-word keywords ("how do you work") match as phrases and count double.
 */
function answerFor(question: string, t: ChatCopy): Answer {
  const list = words(question);
  const asked = new Set(list);
  const phrase = ` ${list.join(" ")} `;
  let best: Answer = t.fallback;
  let bestScore = 0;
  for (const entry of t.knowledge) {
    const score = entry.keywords.reduce(
      (sum, k) => sum + (k.includes(" ") ? (phrase.includes(` ${k} `) ? 2 : 0) : asked.has(k) ? 1 : 0),
      0,
    );
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }
  return best;
}

/** Paragraphs separated by blank lines; lines starting with "- " become a list. */
function Formatted({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((block, i) => {
        const lines = block.split("\n");
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="chat-list">
              {lines.map((l, j) => (
                <li key={j}>
                  <Rich text={l.slice(2)} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            <Rich text={block} />
          </p>
        );
      })}
    </>
  );
}

const icon = { width: 15, height: 15, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

function Thumb({ down = false, filled = false }: { down?: boolean; filled?: boolean }) {
  return (
    <svg {...icon} style={down ? { transform: "rotate(180deg)" } : undefined}>
      <path d="M5 7v6.5H2.5V7H5Zm0 0 2.6-4.6c.5-.9 1.9-.6 1.9.5v2.8h3.1c.9 0 1.6.9 1.4 1.8l-1 4.6c-.2.8-.8 1.3-1.6 1.3H5" fill={filled ? "currentColor" : "none"} />
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg {...icon}>
      <rect x="5.5" y="5.5" width="8" height="8" rx="2" />
      <path d="M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" />
    </svg>
  );
}
function Check() {
  return (
    <svg {...icon}>
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg {...icon} width={12} height={12}>
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg {...icon} width={12} height={12}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 7.5v3.5M8 5.2v.1" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg {...icon} width={12} height={12}>
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
      <path d="m2 4 6 4.5L14 4" />
    </svg>
  );
}

function Thinking({ label }: { label: string }) {
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % spinner.length), 90);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <p className="chat-thinking" role="status">
      <span aria-hidden="true">{reduce ? "✻" : spinner[frame]}</span>
      <span className="chat-shimmer">{label}…</span>
    </p>
  );
}

export function Chat({ t, lang, email }: { t: ChatCopy; lang: Locale; email: string }) {
  const reduce = useReducedMotion();
  const params = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState<number | null>(null);
  const [rating, setRating] = useState<Record<number, "up" | "down">>({});
  const nextId = useRef(0);
  const asked = useRef(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // The answer currently being "generated", so Stop can cut it short.
  const stream = useRef<{ timer: number; interval: number; botId: number; shown: number } | null>(null);

  const busy = messages.some((m) => m.role === "assistant" && m.status !== "done");

  const ask = useCallback(
    (question: string) => {
      const q = question.trim();
      if (!q) return;
      const answer = answerFor(q, t);
      const userId = nextId.current++;
      const botId = nextId.current++;
      setMessages((ms) => [
        ...ms,
        { id: userId, role: "user", text: q },
        { id: botId, role: "assistant", answer, shown: 0, status: "thinking" },
      ]);

      const total = answer.answer.split(" ").length;
      const update = (fn: (m: Extract<Message, { role: "assistant" }>) => Partial<Message>) =>
        setMessages((ms) => ms.map((m) => (m.id === botId && m.role === "assistant" ? ({ ...m, ...fn(m) } as Message) : m)));

      // "Think" for a moment, then stream the answer a few words at a time.
      stream.current = { timer: 0, interval: 0, botId, shown: 0 };
      stream.current.timer = window.setTimeout(() => {
        if (reduce) {
          update(() => ({ status: "done", shown: total }));
          stream.current = null;
          return;
        }
        update(() => ({ status: "streaming" }));
        // Progress lives here, not inside the state updater: React may run updaters twice.
        let shown = 0;
        const id = window.setInterval(() => {
          shown = Math.min(total, shown + 1 + Math.floor(Math.random() * 3));
          const done = shown >= total;
          if (stream.current) stream.current.shown = shown;
          if (done) {
            window.clearInterval(id);
            stream.current = null;
          }
          update(() => ({ shown, status: done ? "done" : "streaming" }));
        }, 45);
        if (stream.current) stream.current.interval = id;
      }, reduce ? 0 : 900 + Math.random() * 600);
    },
    [t, reduce],
  );

  // Arriving from the Ask bar with ?q=…: ask it straight away (once).
  useEffect(() => {
    const q = params.get("q");
    if (q && !asked.current) {
      asked.current = true;
      ask(q);
    }
  }, [params, ask]);

  // Keep the newest words in view while the answer streams in.
  const last = messages.at(-1);
  const progress = last?.role === "assistant" ? `${last.status}${last.shown}` : String(messages.length);
  useEffect(() => {
    if (messages.length) endRef.current?.scrollIntoView({ block: "end", behavior: reduce ? "auto" : "smooth" });
  }, [progress, messages.length, reduce]);

  // Stop: freeze the answer where it is (or drop it if nothing was written yet).
  const stop = () => {
    const current = stream.current;
    if (!current) return;
    window.clearTimeout(current.timer);
    window.clearInterval(current.interval);
    stream.current = null;
    setMessages((ms) =>
      current.shown === 0
        ? ms.filter((m) => m.id !== current.botId)
        : ms.map((m) => (m.id === current.botId && m.role === "assistant" ? { ...m, status: "done" } : m)),
    );
    inputRef.current?.focus();
  };

  const submit = () => {
    if (busy) return;
    ask(draft);
    setDraft("");
  };

  // Source links point into the site: "#about" → "/en#about", "/philosophy" → "/en/philosophy".
  const href = (h: string) => `/${lang}${h}`;

  return (
    <div className="chat">
      <header className="chat-top">
        <Link href={`/${lang}`} className="solo-back">
          <span aria-hidden="true">← </span>
          {t.back}
        </Link>
        {messages.length > 0 && !busy && (
          <button
            type="button"
            className="chat-new"
            onClick={() => {
              setMessages([]);
              setRating({});
              inputRef.current?.focus();
            }}
          >
            + {t.newChat}
          </button>
        )}
      </header>

      <main className="chat-main" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {messages.length === 0 && (
            <motion.section
              key="empty"
              className="chat-empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease }}
            >
              <Image src={portrait} alt="" width={64} height={64} sizes="64px" placeholder="blur" className="chat-empty-photo" />
              <h1 className="chat-title">{t.title}</h1>
              <p className="chat-intro">{t.intro}</p>
              <div className="chat-pills">
                {t.suggestions.map((s, i) => (
                  <motion.button
                    key={s}
                    type="button"
                    className="chat-pill"
                    onClick={() => ask(s)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <div className="chat-thread">
          {messages.map((m) =>
            m.role === "user" ? (
              <motion.div
                key={m.id}
                className="chat-user"
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease }}
                style={{ originX: 1, originY: 1 }}
              >
                <span className="sr-only">{t.you}: </span>
                {m.text}
              </motion.div>
            ) : (
              <motion.article
                key={m.id}
                className="chat-bot"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
              >
                {m.status === "thinking" ? (
                  <Thinking label={t.thinking} />
                ) : (
                  <div className="chat-answer">
                    <Formatted text={m.answer.answer.split(" ").slice(0, m.shown).join(" ")} />
                    {m.status === "streaming" && <span className="chat-caret" aria-hidden="true" />}
                  </div>
                )}

                {m.status === "done" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <div className="chat-meta">
                      <span className="chat-meta-label">{t.sources}</span>
                      {m.answer.sources.map((s, i) => (
                        <motion.span
                          key={s.label}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.08, ease }}
                        >
                          <Link href={href(s.href)} className="chat-source">
                            <span aria-hidden="true">↗</span> {s.label}
                          </Link>
                        </motion.span>
                      ))}
                    </div>
                    {/* Feedback and copy, as on america.gov. */}
                    <div className="chat-actions">
                      <span className="chat-action-group">
                        {(["up", "down"] as const).map((v) => (
                          <button
                            key={v}
                            type="button"
                            className="chat-action"
                            aria-label={v === "up" ? t.good : t.bad}
                            aria-pressed={rating[m.id] === v}
                            onClick={() =>
                              setRating((r) => {
                                const next = { ...r };
                                if (r[m.id] === v) delete next[m.id];
                                else next[m.id] = v;
                                return next;
                              })
                            }
                          >
                            <Thumb down={v === "down"} filled={rating[m.id] === v} />
                          </button>
                        ))}
                      </span>
                      <button
                        type="button"
                        className="chat-action chat-action-solo"
                        aria-label={copied === m.id ? t.copied : t.copy}
                        onClick={() => {
                          navigator.clipboard?.writeText(m.answer.answer.replace(/\*\*/g, ""));
                          setCopied(m.id);
                          window.setTimeout(() => setCopied((c) => (c === m.id ? null : c)), 1600);
                        }}
                      >
                        {copied === m.id ? <Check /> : <CopyIcon />}
                      </button>
                    </div>
                    {m.id === last?.id && (
                      <div className="chat-follow">
                        <span className="chat-meta-label">{t.followups}</span>
                        {m.answer.followups.map((f, i) => (
                          <motion.button
                            key={f}
                            type="button"
                            className="chat-pill"
                            onClick={() => ask(f)}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease }}
                          >
                            {f}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.article>
            ),
          )}
          <div ref={endRef} />
        </div>
      </main>

      {/* The input dock: the composer pinned to the bottom, with a fade above it. */}
      <div className="chat-dock">
        <div className="chat-fade" aria-hidden="true" />
        <form
          className="chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <p className="chat-notice">
            <span className="chat-notice-item">
              <LockIcon /> <span className="chat-dotted">{t.privacy}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="chat-notice-item" title={t.sampleHint}>
              <InfoIcon /> <span className="chat-dotted">{t.sample}</span>
            </span>
            <span aria-hidden="true">·</span>
            <a className="chat-notice-item" href={`mailto:${email}`}>
              <MailIcon /> <span className="chat-dotted">{t.emailMe}</span>
            </a>
          </p>
          {/* Composer: the text grows on top, a toolbar with hints and the send button below. */}
          <div className="composer">
            <textarea
              ref={inputRef}
              value={draft}
              rows={1}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  submit();
                }
              }}
              autoFocus
            />
            <div className="composer-bar">
              <span className="composer-hint" aria-hidden="true">
                <kbd>↵</kbd> {t.toSend}
                <span className="composer-sep">·</span>
                <kbd>⇧</kbd>
                <kbd>↵</kbd> {t.newLine}
              </span>
              <AnimatePresence mode="wait" initial={false}>
                {busy ? (
                  <motion.button
                    key="stop"
                    type="button"
                    className="composer-send composer-ready"
                    aria-label={t.stop}
                    onClick={stop}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="composer-stop" aria-hidden="true" />
                  </motion.button>
                ) : (
                  <motion.button
                    key="send"
                    type="submit"
                    className={draft.trim() ? "composer-send composer-ready" : "composer-send"}
                    aria-label={t.send}
                    disabled={!draft.trim()}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: draft.trim() ? 1 : 0.92, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 26 }}
                    whileTap={{ scale: 0.88 }}
                  >
                    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M8 13V3M3.8 7.2 8 3l4.2 4.2" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
