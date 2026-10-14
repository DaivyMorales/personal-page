// Everything on the site that is about you lives here. Edit freely.

export const site = {
  name: "Daivy",
  tagline: "software engineer",
  // Used for canonical URLs, the sitemap and Open Graph images.
  url: "https://daivy.dev",
  description:
    "Daivy's personal site: things I've built, what I'm working on, and how to reach me.",
  headline: "Building software that feels effortless.",
  bio: "I'm Daivy, a software engineer. I build fast, careful web products and enjoy turning messy problems into simple tools people like to use.",
  // The pill in the top right. Set `available` to false to hide it.
  availability: { available: true, label: "Available for new projects" },
  // The clock in the top left shows your local time in this zone.
  timeZone: "America/New_York",
  location: "Somewhere on Earth",
  email: "hello@example.com",
  social: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
] as const;

export type Project = {
  name: string;
  kind: string;
  description: string;
  href?: string;
};

export const projects: Project[] = [
  {
    name: "Personal site",
    kind: "Next.js",
    description: "This site. Fully static, built with Next.js and typeset with care.",
    href: "https://github.com/",
  },
  {
    name: "Project two",
    kind: "TypeScript",
    description: "One sentence on what it does and why it was worth building.",
  },
  {
    name: "Project three",
    kind: "Python",
    description: "One sentence on what it does and what you learned from it.",
  },
];

export type Role = {
  period: string;
  title: string;
  where: string;
  note: string;
};

export const experience: Role[] = [
  { period: "2025 – now", title: "Software Engineer", where: "Company", note: "What you own and one result you are proud of." },
  { period: "2023 – 2025", title: "Developer", where: "Company", note: "The kind of work, and the size of the team." },
  { period: "2021 – 2023", title: "Studies", where: "School", note: "What you studied, and the project that stuck." },
];

export const toolkit = [
  { area: "Languages", items: "TypeScript, Python, SQL" },
  { area: "Web", items: "React, Next.js, CSS" },
  { area: "Tools", items: "Git, Figma, Claude Code" },
];
