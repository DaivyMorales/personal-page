"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeCookie, locales, type Locale } from "@/content/i18n/config";

/** A small "EN · ES" toggle in the corner. Remembers the choice in a cookie for next time. */
export function LangSwitch({ lang, label, right = false }: { lang: Locale; label: string; right?: boolean }) {
  const pathname = usePathname();
  // The same page in the other language: swap the first path segment.
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <nav aria-label={label} className={right ? "lang-switch lang-switch-right" : "lang-switch"}>
      {locales.map((l, i) => (
        <span key={l} className="lang-item">
          {i > 0 && <span aria-hidden="true">·</span>}
          <Link
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "true" : undefined}
            onClick={() => {
              document.cookie = `${localeCookie}=${l}; path=/; max-age=31536000; samesite=lax`;
            }}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
