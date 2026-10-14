// English copy for the whole site. Spanish lives in es.ts and must have the same shape.
// In longer strings, **double asterisks** make bold text and _underscores_ make italics.

export const en = {
  langName: "English",
  meta: {
    title: "Daivy · Product AI Engineer",
    description:
      "Daivy Morales, Product AI Engineer. I build production-oriented agentic systems and workflow automation, taking AI products from concept to beta.",
    ogLocale: "en_US",
  },
  hero: {
    bio: "Product AI Engineer building production-oriented agentic systems and workflow automation. I take AI products from concept to beta.",
    readOn: "Read on",
  },
  sections: {
    about: { label: "About", hint: "Who I am" },
    experience: { label: "Experience", hint: "Where I've worked" },
    projects: { label: "Projects", hint: "Things I've built" },
    education: { label: "Education", hint: "Where I studied" },
    toolkit: { label: "Toolkit", hint: "What I work with" },
    contact: { label: "Contact", hint: "How to reach me" },
    philosophy: { label: "Philosophy", hint: "How I work" },
  },
  about: {
    intro:
      "I'm **Daivy Morales**, a Product AI Engineer based in Mosquera, Colombia. I build production-oriented agentic systems and workflow automation, and I like the whole arc of a product: from the first idea, through the architecture, to a beta people actually use.",
    quote: {
      text: "I turn unstructured business processes into measurable operational capacity.",
      lead: "I",
      middle: "turn unstructured business processes",
      end: "into measurable operational capacity.",
      cite: "What I do, in one line",
    },
    now: "Right now I'm the sole AI engineer at **JOYC Brands**, where I built the company's sourcing operating system _from idea to beta_.",
    stat: "estimated lower cost than a comparable U.S. delivery model, for enterprise-level sourcing software at JOYC Brands. It gives the team back 30–40 hours a month.",
    beforeAfter: {
      title: "What changed for the sourcing team",
      beforeLabel: "Before",
      afterLabel: "After",
      before: [
        "Chasing suppliers across long email threads",
        "Copying quotes into spreadsheets by hand",
        "30–40 hours a month of follow-up",
      ],
      after: [
        "Suppliers, quotes and decisions in one place",
        "AI reads messages and drafts the routine replies",
        "People keep the negotiation and the final call",
      ],
    },
  },
  experience: {
    at: "at",
    roles: [
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
        summary: "",
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
        summary: "",
        highlights: [
          "Found and recruited strategic channel partners for the IBM business unit, growing the sales network.",
          "Earned WatsonX and AI Fundamentals certifications to help partners adopt generative AI.",
        ],
      },
    ],
  },
  projects: {
    intro: "Things I've designed and built end to end, from concept to a product people use.",
    items: [
      {
        name: "Venedict",
        kind: "Multi-agent · Finance",
        href: "",
        description:
          "An AI platform for investment analysis. Two autonomous agents argue the bullish and the bearish thesis asynchronously, so the decision is not shaped by one side's bias. Built end to end, from concept to a premium product.",
      },
      {
        name: "Baruch Delivery Assistant",
        kind: "n8n · WhatsApp",
        href: "",
        description:
          "A WhatsApp assistant for Baruch Restaurant that takes orders and manages deliveries on its own through n8n workflows and careful prompt design. It closed 8 direct sales in its first deployment and removed manual admin work for the staff.",
      },
      {
        name: "“Mark” and “Consuelo”",
        kind: "LangGraph · OFI Services",
        href: "",
        description:
          "Mark is a marketing platform where autonomous agents generate images and publish content; Consuelo is an HR platform whose interface I rebuilt into a professional product the HR teams adopted.",
      },
    ],
  },
  education: [
    {
      school: "Politécnico Grancolombiano",
      degree: "Bachelor of Engineering in Software, specialising in IT and Infrastructure",
      place: "Bogotá",
      period: "2024 – Mar 2027",
    },
    { school: "American School Way", degree: "English, B2+", place: "Mosquera", period: "2024 – 2025" },
    { school: "SENA", degree: "Associate Degree in Software", place: "Mosquera", period: "2022 – 2024" },
  ],
  toolkit: {
    areas: {
      ai: "AI",
      engineering: "Engineering",
      automation: "Automation",
      data: "Data",
      cloud: "Cloud",
      tools: "Tools",
      certifications: "Certifications",
    },
    // Only names that change between languages; everything else is a product name.
    names: {
      "LLM architecture": "LLM architecture",
      "Spec-driven development": "Spec-driven development",
      "REST APIs": "REST APIs",
      "IBM AI": "IBM AI",
    } as Record<string, string>,
  },
  contact: {
    before: "The best way to reach me is by email at",
    after:
      "I'm happy to talk about AI products, agentic systems and automation work. Or just use the box at the bottom of the screen.",
  },
  philosophy: {
    teaser:
      "Skills can be learned and tools change every year. What doesn't change is how I work: honestly, carefully, and with the people I build for in mind.",
    teaserLine: "Want to know how I work?",
    keys: "Honesty · Trust · Integrity · Humility · People · Craft · Ownership · Generosity",
    kicker: "Philosophy",
    title: "How I work",
    intro:
      "Skills can be learned and tools change every year. These are the things I won't trade for speed or money, whether I'm building alone or leading a team.",
    statement: "Build it with care, for the people who will actually use it.",
    workWithMe: "Work with me",
    openAsPage: "Open as a page →",
    close: "Close",
    endBefore: "If this sounds like how you like to work too,",
    endLink: "write to me",
    pageDescription: "Daivy's working philosophy: a few principles for building products with care.",
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
  },
  ticker: [
    "Agentic systems",
    "JOYC Brands",
    "Workflow automation",
    "OFI Services",
    "LangGraph",
    "Claude Code",
    "n8n",
    "Nexsys · IBM",
  ],
  ask: {
    examples: [
      "Can you build an AI assistant for my business?",
      "How would you automate our order follow-ups?",
      "Are you available for a new project?",
      "What did you build at JOYC Brands?",
    ],
    try: "Try",
    askAnything: "Ask Daivy anything…",
    messageLabel: "Message to Daivy",
    send: "Ask",
  },
  chat: {
    title: "Ask me anything",
    pageTitle: "Chat",
    intro: "A small assistant that knows my work. Ask about my experience, projects, skills or how I work.",
    placeholder: "Ask anything…",
    thinking: "Thinking",
    sources: "Sources",
    followups: "Related",
    copy: "Copy",
    copied: "Copied",
    newChat: "New chat",
    back: "Daivy",
    send: "Send",
    you: "You",
    assistant: "Daivy's assistant",
    disclaimer: "Demo assistant with sample answers about my work.",
    disclaimerLink: "Email me for a real conversation",
    suggestions: [
      "What do you do?",
      "What did you build at JOYC Brands?",
      "Tell me about your projects",
      "Are you available for a new project?",
    ],
    // Mock answers. The best match by keywords wins; `fallback` answers anything else.
    // Answers use **bold**, blank lines between paragraphs and "- " for bullet points.
    knowledge: [
      {
        keywords: ["hi", "hello", "hey", "who", "yourself", "introduce", "daivy", "what do you do", "about you"],
        answer:
          "Hi! I'm Daivy's assistant. **Daivy Morales** is a Product AI Engineer based in Mosquera, Colombia.\n\nHe builds production-oriented agentic systems and workflow automation, and takes AI products from the first idea to a beta people actually use.",
        sources: [{ label: "About", href: "#about" }],
        followups: ["What did you build at JOYC Brands?", "What tools do you use?"],
      },
      {
        keywords: ["joyc", "brands", "sourcing", "current", "now", "job", "role"],
        answer:
          "At **JOYC Brands** (Brooklyn, remote) Daivy is the sole AI engineer. He built the company's sourcing operating system from idea to beta:\n\n- Supplier intelligence, specs, quotes, conversations and production decisions in one workflow\n- AI that reads supplier messages, extracts the details and drafts routine replies\n- 30–40 hours a month given back to the sourcing team\n\nThe estimate is a **97–99% lower cost** than a comparable U.S. delivery model.",
        sources: [
          { label: "Experience · JOYC Brands", href: "#experience" },
          { label: "About", href: "#about" },
        ],
        followups: ["What did you do at OFI Services?", "Tell me about your projects"],
      },
      {
        keywords: ["ofi", "lead", "team", "mark", "consuelo", "consultant", "netherlands", "india"],
        answer:
          "At **OFI Services** (Amsterdam, remote) Daivy led a team of three AI consultants.\n\n- Built the **Mark** marketing platform end to end on autonomous agents with Python, LangGraph and LangChain\n- Coordinated with engineering teams in the Netherlands and India\n- Redesigned **Mark** and **Consuelo** from prototypes into professional products, which lifted adoption",
        sources: [{ label: "Experience · OFI Services", href: "#experience" }],
        followups: ["What tools do you use?", "How do you work?"],
      },
      {
        keywords: ["project", "projects", "built", "build", "venedict", "baruch", "whatsapp", "side"],
        answer:
          "A few things Daivy designed and built end to end:\n\n- **Venedict**: an investment-analysis platform where two agents debate the bullish and bearish thesis, so decisions aren't shaped by one side's bias\n- **Baruch Delivery Assistant**: a WhatsApp assistant on n8n that takes orders and manages deliveries; it closed 8 sales in its first launch\n- **Mark** and **Consuelo**: marketing and HR platforms built at OFI Services",
        sources: [{ label: "Projects", href: "#projects" }],
        followups: ["Can you build an AI assistant for my business?", "What tools do you use?"],
      },
      {
        keywords: ["tools", "stack", "skills", "tech", "python", "langgraph", "next", "react", "use", "technologies"],
        answer:
          "Daivy's day-to-day toolkit:\n\n- **AI**: Claude, Claude Code, Codex, MCP, RAG, spec-driven development\n- **Engineering**: Python, Django, FastAPI, LangGraph, LangChain, TypeScript, React, Next.js\n- **Automation**: n8n, Make\n- **Data and cloud**: PostgreSQL, Supabase, Firebase, AWS, Vercel",
        sources: [{ label: "Toolkit", href: "#toolkit" }],
        followups: ["Tell me about your projects", "Where did you study?"],
      },
      {
        keywords: ["study", "studied", "education", "degree", "university", "school", "english", "sena"],
        answer:
          "Daivy is finishing a **Bachelor of Engineering in Software** at Politécnico Grancolombiano (until March 2027), after an associate degree in software at SENA. He also holds a **B2+ English** level.",
        sources: [{ label: "Education", href: "#education" }],
        followups: ["What do you do?", "Are you available for a new project?"],
      },
      {
        keywords: ["available", "availability", "hire", "hiring", "contact", "email", "freelance", "together", "price", "cost", "rates", "new project"],
        answer:
          "Daivy is always happy to talk about AI products, agentic systems and automation work.\n\nThe best next step is a short email with what you're trying to build: **daivymorales7705@gmail.com**.",
        sources: [{ label: "Contact", href: "#contact" }],
        followups: ["How do you work?", "Tell me about your projects"],
      },
      {
        keywords: ["assistant", "business", "automate", "automation", "chatbot", "agent", "agents", "company"],
        answer:
          "Yes, that's exactly the kind of work Daivy does. A typical path:\n\n- Map the messy process and where time is lost\n- Build an agent or workflow that reads, sorts and drafts the routine parts\n- Keep people in charge of the decisions that matter\n- Ship a beta quickly, then measure the hours it gives back\n\nAt JOYC Brands that approach saved the team 30–40 hours a month.",
        sources: [
          { label: "Experience", href: "#experience" },
          { label: "Projects", href: "#projects" },
        ],
        followups: ["Are you available for a new project?", "What tools do you use?"],
      },
      {
        keywords: ["philosophy", "values", "principles", "approach", "honest", "honesty", "trust", "how do you work", "how you work"],
        answer:
          "Daivy's short version: **build it with care, for the people who will actually use it.**\n\n- Honesty, always\n- His word is his contract\n- Integrity when no one is watching\n- Ownership, end to end",
        sources: [{ label: "How I work", href: "/philosophy" }],
        followups: ["Are you available for a new project?", "What do you do?"],
      },
      {
        keywords: ["where", "location", "based", "live", "colombia", "remote", "timezone"],
        answer:
          "Daivy is based in **Mosquera, Colombia**, and works remotely with teams in the U.S. and Europe.",
        sources: [{ label: "About", href: "#about" }],
        followups: ["Are you available for a new project?"],
      },
    ],
    fallback: {
      answer:
        "Good question. I'm a small demo with sample answers, so I don't have that one yet.\n\nTry asking about Daivy's experience, projects, skills or education, or email him directly at **daivymorales7705@gmail.com**.",
      sources: [{ label: "Contact", href: "#contact" }],
      followups: ["What do you do?", "Tell me about your projects"],
    },
  },
  footer: {
    tagline: ["AI products,", "built with care."],
    sub: "Leave your email and I'll write back.",
    placeholder: "you@example.com",
    emailLabel: "Your email address",
    button: "Say hi",
    mailSubject: "Let's talk",
    mailBody: "Hi Daivy, I'd like to talk. You can reach me at",
    explore: "Explore",
    more: "More",
    contact: "Contact",
    emailMe: "Email me",
    howIWork: "How I work",
  },
  terminal: {
    verbs: ["Reading", "Pondering", "Scrolling", "Browsing", "Wandering", "Perusing", "Skimming"],
    read: "read",
    press: "press",
    forCommands: "for commands",
    openMenu: "Open command menu",
    title: "daivy — commands",
    placeholder: "/ type a command",
    foot: "↑↓ to move · enter to run · esc to close",
    notFound: "command not found:",
    emailHint: "Write to me",
    topHint: "Back to the top",
    philosophyHint: "How I work",
    helpHint: "How to use this menu",
    help: "/        open this menu\n↑ ↓      move up and down\nenter    go there\nesc      close",
    switchName: "español",
    switchHint: "Ver en español",
  },
  toc: { contents: "Contents", close: "Close" },
  sdg: { aria: "S.D.G., Soli Deo Gloria. In Christ I trust.", trust: "In Christ I trust" },
  console: "Thanks for looking under the hood. Built with Next.js, Motion and a lot of care.\nIn Christ I trust. ✝",
  back: "Daivy",
  langSwitch: "Language",
  notFound: { text: "There is nothing at this address.", back: "Back home" },
};

export type Dictionary = typeof en;
