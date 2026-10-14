"use client";

import { useEffect } from "react";

let greeted = false;

/** A note for anyone who opens the developer tools. */
export function ConsoleWink() {
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      "%cDaivy%c\nThanks for looking under the hood. Built with Next.js, Motion and a lot of care.\nIn Christ I trust. ✝",
      "font: 400 32px Georgia, serif",
      "font: 12px ui-monospace, monospace; line-height: 1.6",
    );
  }, []);
  return null;
}
