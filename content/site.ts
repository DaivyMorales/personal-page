// Everything on the site that is about you lives here. Edit freely.
// Brand icons come from Simple Icons (simple-icons.org); look up a name there and import `si<Name>`.

import {
  siClaude,
  siDjango,
  siFastapi,
  siFigma,
  siFirebase,
  siGit,
  siGithub,
  siLangchain,
  siLanggraph,
  siMake,
  siModelcontextprotocol,
  siN8n,
  siNextdotjs,
  siPostgresql,
  siPython,
  siRailway,
  siReact,
  siRender,
  siSupabase,
  siTypescript,
  siVercel,
} from "simple-icons";
import type { TechIconSource } from "@/components/tech-icon";

// Facts that don't change between languages. All wording lives in content/i18n/en.ts and es.ts.
export const site = {
  name: "Daivy",
  fullName: "Daivy Morales",
  // Used for canonical URLs, the sitemap and Open Graph images.
  url: "https://daivy.dev",
  email: "daivymorales7705@gmail.com",
  // Add links here (e.g. { label: "GitHub", href: "https://github.com/you" }) and they show up under Contact.
  social: [] as { label: string; href: string }[],
};

export type Tech = { name: string; icon: TechIconSource };

export type ToolkitArea = "ai" | "engineering" | "automation" | "data" | "cloud" | "tools" | "certifications";

// Area labels and a few generic item names are translated in the dictionaries.
export const toolkit: { area: ToolkitArea; items: Tech[] }[] = [
  {
    area: "ai",
    items: [
      { name: "Claude", icon: siClaude },
      { name: "Claude Code", icon: siClaude },
      { name: "Codex", icon: { monogram: "Cx" } },
      { name: "MCP", icon: siModelcontextprotocol },
      { name: "LLM architecture", icon: { glyph: "graph" } },
      { name: "RAG", icon: { glyph: "retrieval" } },
      { name: "Spec-driven development", icon: { glyph: "spec" } },
    ],
  },
  {
    area: "engineering",
    items: [
      { name: "Python", icon: siPython },
      { name: "Django", icon: siDjango },
      { name: "FastAPI", icon: siFastapi },
      { name: "LangGraph", icon: siLanggraph },
      { name: "LangChain", icon: siLangchain },
      { name: "LangSmith", icon: { monogram: "LS" } },
      { name: "TypeScript", icon: siTypescript },
      { name: "React", icon: siReact },
      { name: "Next.js", icon: siNextdotjs },
    ],
  },
  {
    area: "automation",
    items: [
      { name: "n8n", icon: siN8n },
      { name: "Make", icon: siMake },
      { name: "REST APIs", icon: { glyph: "api" } },
    ],
  },
  {
    area: "data",
    items: [
      { name: "SQL", icon: { glyph: "database" } },
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "Supabase", icon: siSupabase },
      { name: "Firebase", icon: siFirebase },
    ],
  },
  {
    area: "cloud",
    items: [
      { name: "AWS", icon: { monogram: "aws" } },
      { name: "Vercel", icon: siVercel },
      { name: "Railway", icon: siRailway },
      { name: "Render", icon: siRender },
    ],
  },
  {
    area: "tools",
    items: [
      { name: "Figma", icon: siFigma },
      { name: "Git", icon: siGit },
      { name: "GitHub", icon: siGithub },
    ],
  },
  {
    area: "certifications",
    items: [
      { name: "Claude AI", icon: siClaude },
      { name: "Python", icon: siPython },
      { name: "Make", icon: siMake },
      { name: "IBM AI", icon: { monogram: "IBM" } },
      { name: "AWS", icon: { monogram: "aws" } },
    ],
  },
];
