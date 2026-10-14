# Daivy

Personal site built with Next.js 16 (App Router, Cache Components, Turbopack), Tailwind CSS 4 and Motion (Framer Motion). Styled after clig.dev. Uses pnpm.

```bash
pnpm dev     # http://localhost:3000
pnpm build   # every route is prerendered as static
pnpm lint
```

## Editing

- `content/i18n/en.ts` and `content/i18n/es.ts`: every piece of text, in English and Spanish. They must have the same shape (TypeScript checks it). `**bold**` and `_italic_` work in the longer strings.
- `content/site.ts`: things that don't change between languages: name, email, URL, social links and the toolkit icons.
- `app/page.tsx`: page layout and section copy.
- `app/globals.css`: design tokens (light and dark), layout, sticky headings, bullets.
- `components/motion/`: the animations (hero letters, scroll reveals, word-by-word quote, progress bar, magnetic button). All respect the visitor's reduced-motion setting.

The root layout exports `ensureStatic = "navigation"`, so the build fails if anything starts rendering per request.

## Languages

The site lives at `/en` and `/es` (pages are under `app/[lang]`). `proxy.ts` sends visitors who land on `/` to their saved choice (the `NEXT_LOCALE` cookie set by the EN · ES switch) or else their browser's language. To add a language, add its code to `content/i18n/config.ts`, a dictionary next to `en.ts`, and register it in `content/i18n/index.ts`.

`reference/` holds the original design notes and is not part of the app.
