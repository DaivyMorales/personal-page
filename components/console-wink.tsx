"use client";

import { useEffect } from "react";

let greeted = false;

/** A note for anyone who opens the developer tools. */
export function ConsoleWink({ message }: { message: string }) {
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      `%cDaivy%c\n${message}`,
      "font: 400 32px Georgia, serif",
      "font: 12px ui-monospace, monospace; line-height: 1.6",
    );
  }, [message]);
  return null;
}
