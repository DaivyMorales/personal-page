"use client";

import { useState } from "react";

/**
 * A message box styled like Claude Code's input prompt. Enter opens the visitor's
 * mail app with the message filled in; Shift+Enter adds a new line.
 */
export function ContactPrompt({ email }: { email: string }) {
  const [message, setMessage] = useState("");

  const send = () => {
    const body = message.trim();
    if (!body) return;
    const subject = "Hello from your site";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form
      className="cprompt"
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
    >
      <label className="cprompt-box">
        <span className="cprompt-caret" aria-hidden="true">&gt;</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              send();
            }
          }}
          rows={1}
          placeholder="Write me a message…"
          aria-label="Message"
        />
      </label>
      <p className="cprompt-foot">
        <span>Press Enter to send it by email</span>
        <button type="submit" disabled={!message.trim()}>
          send
        </button>
      </p>
    </form>
  );
}
