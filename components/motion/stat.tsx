"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function CountUp({ to, start }: { to: number; start: boolean }) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!start || reduce) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, to, reduce]);

  return <>{value}</>;
}

/**
 * A big serif figure with a caption, like si.gov's "13 executive orders". The numbers count
 * up the first time it scrolls into view.
 */
export function Stat({ from, to, suffix, children }: { from: number; to?: number; suffix?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const label = `${from}${to ? `–${to}` : ""}${suffix ?? ""}`;

  return (
    <div ref={ref} className="stat">
      <p className="stat-figure" aria-label={label}>
        <span aria-hidden="true">
          <CountUp to={from} start={inView} />
          {to !== undefined && (
            <>
              –<CountUp to={to} start={inView} />
            </>
          )}
          {suffix}
        </span>
      </p>
      <p className="stat-caption">{children}</p>
    </div>
  );
}
