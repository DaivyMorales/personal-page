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

export const site = {
  name: "Daivy",
  fullName: "Daivy Morales",
  tagline: "Product AI Engineer",
  // Used for canonical URLs, the sitemap and Open Graph images.
  url: "https://daivy.dev",
  description:
    "Daivy Morales, Product AI Engineer. I build production-oriented agentic systems and workflow automation, taking AI products from concept to beta.",
  headline: "Agentic systems that turn messy work into measurable capacity.",
  bio: "Product AI Engineer building production-oriented agentic systems and workflow automation. I take AI products from concept to beta.",
  location: "Mosquera, Colombia",
  email: "daivymorales7705@gmail.com",
  // Add links here (e.g. { label: "GitHub", href: "https://github.com/you" }) and they show up under Contact.
  social: [] as { label: string; href: string }[],
};

// Example questions that rotate in the floating "Ask me anything" bar.
export const askExamples = [
  "Can you build an AI assistant for my business?",
  "How would you automate our order follow-ups?",
  "Are you available for a new project?",
  "What did you build at JOYC Brands?",
];

// The "How I work" page at /philosophy, linked quietly from the footer and the / menu.
export const philosophy = {
  intro:
    "Skills can be learned and tools change every year. These are the things I won't trade for speed or money, whether I'm building alone or leading a team.",
  statement: "Build it with care, for the people who will actually use it.",
  principles: [
    {
      title: "Honesty, always.",
      text: "I tell clients and teammates the truth, even when it's not what they hoped to hear. Real results, plain words, no tricks.",
    },
    {
      title: "My word is my contract.",
      text: "If I say it will be done on Friday, it's done on Friday. If something changes, you hear it from me first, not from a missed deadline.",
    },
    {
      title: "Integrity when no one is watching.",
      text: "The parts nobody will check get the same care as the demo. That's where trust is really earned.",
    },
    {
      title: "Humble enough to learn.",
      text: "I admit mistakes quickly, ask for help early and treat every project as a chance to get better.",
    },
    {
      title: "People over output.",
      text: "I respect the people I work with and the people I build for. Good technology gives them time back for what matters most.",
    },
    {
      title: "Craft over speed.",
      text: "I'd rather ship something right a little later than something careless on time. Quality is a form of respect.",
    },
    {
      title: "Ownership, end to end.",
      text: "From the first idea to the beta in people's hands, I treat the whole product as mine to get right, including the parts that go wrong.",
    },
    {
      title: "Share what I know.",
      text: "Most of what I know, someone once took the time to teach me. I try to do the same for the people around me.",
    },
  ],
};

// The sideways-scrolling strip under the hero.
export const ticker = [
  "Agentic systems",
  "JOYC Brands",
  "Workflow automation",
  "OFI Services",
  "LangGraph",
  "Claude Code",
  "n8n",
  "Nexsys · IBM",
];

export type Project = {
  name: string;
  kind: string;
  description: string;
  href?: string;
};

export const projects: Project[] = [
  {
    name: "Venedict",
    kind: "Multi-agent · Finance",
    description:
      "An AI platform for investment analysis. Two autonomous agents argue the bullish and the bearish thesis asynchronously, so the decision is not shaped by one side's bias. Built end to end, from concept to a premium product.",
  },
  {
    name: "Baruch Delivery Assistant",
    kind: "n8n · WhatsApp",
    description:
      "A WhatsApp assistant for Baruch Restaurant that takes orders and manages deliveries on its own through n8n workflows and careful prompt design. It closed 8 direct sales in its first deployment and removed manual admin work for the staff.",
  },
  {
    name: "“Mark” and “Consuelo”",
    kind: "LangGraph · OFI Services",
    description:
      "Mark is a marketing platform where autonomous agents generate images and publish content; Consuelo is an HR platform whose interface I rebuilt into a professional product the HR teams adopted.",
  },
];

export type Role = {
  title: string;
  company: string;
  place: string;
  period: string;
  summary?: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    title: "AI Engineer",
    company: "JOYC Brands",
    place: "Brooklyn, New York (remote)",
    period: "May 2026 – Present",
    summary:
      "As the company's sole AI engineer, I built its sourcing operating system from idea to beta, delivering enterprise-level functionality at an estimated 97–99% lower cost than a comparable U.S. delivery model.",
    highlights: [
      "Brought supplier intelligence, product specifications, quotations, conversations and production decisions into one workflow.",
      "Designed it to save the sourcing team 30–40 hours a month of manual follow-up and searching through email and spreadsheets.",
      "Built AI workflows that read supplier messages, extract and structure the details, and draft routine replies, leaving negotiation and final decisions to people.",
      "Laid an AI foundation that grows sourcing throughput without growing admin work at the same rate.",
    ],
  },
  {
    title: "AI & Innovation Consultant Lead",
    company: "OFI Services",
    place: "Amsterdam, Netherlands (remote)",
    period: "Jan 2026 – May 2026",
    highlights: [
      "Led a team of three AI consultants building the “Mark” platform end to end on autonomous agent architectures in Python with LangGraph and LangChain.",
      "Coordinated with engineering teams in the Netherlands and India, keeping the work aligned with global architecture standards.",
      "Redesigned the “Mark” and “Consuelo” platforms from early prototypes into professional products, which lifted user adoption.",
    ],
  },
  {
    title: "IBM Software Trainee",
    company: "Nexsys Colombia",
    place: "Bogotá, Colombia",
    period: "Jan 2024 – Jul 2024",
    highlights: [
      "Found and recruited strategic channel partners for the IBM business unit, growing the sales network.",
      "Earned WatsonX and AI Fundamentals certifications to help partners adopt generative AI.",
    ],
  },
];

export type Study = { school: string; degree: string; place: string; period: string };

export const education: Study[] = [
  {
    school: "Politécnico Grancolombiano",
    degree: "Bachelor of Engineering in Software, specialising in IT and Infrastructure",
    place: "Bogotá",
    period: "2024 – Mar 2027",
  },
  { school: "American School Way", degree: "English, B2+", place: "Mosquera", period: "2024 – 2025" },
  { school: "SENA", degree: "Associate Degree in Software", place: "Mosquera", period: "2022 – 2024" },
];

export type Tech = { name: string; icon: TechIconSource };

export const toolkit: { area: string; items: Tech[] }[] = [
  {
    area: "AI",
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
    area: "Engineering",
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
    area: "Automation",
    items: [
      { name: "n8n", icon: siN8n },
      { name: "Make", icon: siMake },
      { name: "REST APIs", icon: { glyph: "api" } },
    ],
  },
  {
    area: "Data",
    items: [
      { name: "SQL", icon: { glyph: "database" } },
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "Supabase", icon: siSupabase },
      { name: "Firebase", icon: siFirebase },
    ],
  },
  {
    area: "Cloud",
    items: [
      { name: "AWS", icon: { monogram: "aws" } },
      { name: "Vercel", icon: siVercel },
      { name: "Railway", icon: siRailway },
      { name: "Render", icon: siRender },
    ],
  },
  {
    area: "Tools",
    items: [
      { name: "Figma", icon: siFigma },
      { name: "Git", icon: siGit },
      { name: "GitHub", icon: siGithub },
    ],
  },
  {
    area: "Certifications",
    items: [
      { name: "Claude AI", icon: siClaude },
      { name: "Python", icon: siPython },
      { name: "Make", icon: siMake },
      { name: "IBM AI", icon: { monogram: "IBM" } },
      { name: "AWS", icon: { monogram: "aws" } },
    ],
  },
];
