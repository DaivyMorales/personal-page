// Everything on the site that is about you lives here. Edit freely.

export const site = {
  name: "Daivy",
  fullName: "Daivy Joao Morales Mora",
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

export const toolkit = [
  { area: "AI", items: "Claude, Claude Code, Codex, MCP, LLM architecture, RAG, spec-driven development" },
  { area: "Engineering", items: "Python, Django, FastAPI, LangGraph, LangChain, LangSmith, TypeScript, React, Next.js" },
  { area: "Automation", items: "n8n, Make, REST APIs" },
  { area: "Data", items: "SQL, PostgreSQL, Supabase, Firebase" },
  { area: "Cloud", items: "AWS, Vercel, Railway, Render" },
  { area: "Design", items: "Figma" },
  { area: "Certifications", items: "Claude AI, Python, Make, IBM AI, AWS" },
];
