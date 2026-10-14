# Daivy

Personal site built with Next.js 16 (App Router, Cache Components, Turbopack) and Tailwind CSS 4.

```bash
npm run dev     # http://localhost:3000
npm run build   # every route is prerendered as static
npm run lint
```

## Editing

- `content/site.ts`: name, tagline, links, projects, experience, toolkit. Most edits happen here.
- `app/page.tsx`: page layout and section copy.
- `app/globals.css`: design tokens (light and dark) and the shared typographic components.

The root layout exports `ensureStatic = "navigation"`, so the build fails if anything starts rendering per request.

`reference/` holds the original design notes and is not part of the app.
