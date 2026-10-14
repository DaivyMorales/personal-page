"use client";

import { useEffect, useState } from "react";

/**
 * Live date and time in a fixed time zone. It renders only in the browser, so the
 * prerendered page never bakes in a stale time.
 */
export function Clock({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Defer the first tick so state never updates synchronously inside the effect.
    const first = setTimeout(() => setNow(new Date()), 0);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const date = now?.toLocaleDateString("en-US", { timeZone, month: "short", day: "numeric", year: "numeric" });
  const time = now?.toLocaleTimeString("en-US", { timeZone, hour: "numeric", minute: "2-digit", second: "2-digit" });

  return (
    <time
      dateTime={now?.toISOString()}
      className="block min-h-[41px] text-[13px]/5 tabular-nums"
      suppressHydrationWarning
    >
      {now ? (
        <>
          {date}
          <br />
          <span className="text-muted">{time}</span>
        </>
      ) : null}
    </time>
  );
}
