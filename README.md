# Daivy

Personal site built with Next.js 16 (App Router, Cache Components, Turbopack), Tailwind CSS 4 and Motion (Framer Motion). Styled after clig.dev. Uses pnpm.

```bash
pnpm dev     # http://localhost:3000
pnpm build   # every route is prerendered as static
pnpm lint
```

## Editing

- `content/site.ts`: name, tagline, links, projects, experience, toolkit. Most edits happen here.
- `app/page.tsx`: page layout and section copy.
- `app/globals.css`: design tokens (light and dark), layout, sticky headings, bullets.
- `components/motion/`: the animations (hero letters, scroll reveals, word-by-word quote, progress bar, magnetic button). All respect the visitor's reduced-motion setting.

The root layout exports `ensureStatic = "navigation"`, so the build fails if anything starts rendering per request.

`reference/` holds the original design notes and is not part of the app.
