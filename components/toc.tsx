"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/** "On this page" list that highlights the section currently in view. */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <ol aria-label="On this page" className="toc m-0 grid list-none gap-1.5 p-0">
      {items.map(({ id, label }, i) => (
        <li key={id} style={{ "--i": i } as React.CSSProperties}>
          <a
            href={`#${id}`}
            className="nav-link"
            aria-current={active === id ? "location" : undefined}
          >
            {label}
          </a>
        </li>
      ))}
    </ol>
  );
}
