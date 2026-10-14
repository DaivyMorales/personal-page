import type { SimpleIcon } from "simple-icons";

/** Line glyphs for things that have no brand logo. Drawn on a 24px grid to sit beside Simple Icons. */
const glyphs = {
  // Stacked cylinders.
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v6.5c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V5.5" />
      <path d="M4.5 12v6.5c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V12" />
    </>
  ),
  // Curly braces around a dot: an API endpoint.
  api: (
    <>
      <path d="M8 4c-2 0-3 1-3 3v2.5c0 1.2-.8 2.5-2 2.5 1.2 0 2 1.3 2 2.5V17c0 2 1 3 3 3" />
      <path d="M16 4c2 0 3 1 3 3v2.5c0 1.2.8 2.5 2 2.5-1.2 0-2 1.3-2 2.5V17c0 2-1 3-3 3" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  // Three connected nodes: model architecture.
  graph: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.5 6h7M7.2 8.2l3.6 7.6M16.8 8.2l-3.6 7.6" />
    </>
  ),
  // A document under a magnifier: retrieval.
  retrieval: (
    <>
      <path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21H11" />
      <path d="M8 8h6M8 11.5h4" />
      <circle cx="16" cy="15" r="3.5" />
      <path d="m18.6 17.6 2.4 2.4" />
    </>
  ),
  // A checklist page: a written spec.
  spec: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="1.5" />
      <path d="m8 8 1.2 1.2L11.5 7M8 13l1.2 1.2 2.3-2.2M13.5 8.2H16M13.5 13.2H16M8 17.5h8" />
    </>
  ),
} as const;

export type Glyph = keyof typeof glyphs;
export type TechIconSource = SimpleIcon | { glyph: Glyph } | { monogram: string };

function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Returns the icon plus the brand colour (if any) to reveal on hover. */
export function techIcon(source: TechIconSource): { svg: React.ReactNode; brand?: string; darkBrand?: boolean } {
  if ("path" in source) {
    return {
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={source.path} />
        </svg>
      ),
      brand: `#${source.hex}`,
      // Near-black brands (Next.js, Vercel…) would vanish on the dark background, so they keep the text colour there.
      darkBrand: luminance(source.hex) < 0.06,
    };
  }
  if ("glyph" in source) {
    return {
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {glyphs[source.glyph]}
        </svg>
      ),
    };
  }
  return {
    svg: (
      <span className="tech-monogram" aria-hidden="true">
        {source.monogram}
      </span>
    ),
  };
}
