// Spanish copy. Must have the same shape as en.ts (TypeScript checks it).
// In longer strings, **double asterisks** make bold text and _underscores_ make italics.

import type { Dictionary } from "./en";

export const es: Dictionary = {
  langName: "Español",
  meta: {
    title: "Daivy · Ingeniero de IA de Producto",
    description:
      "Daivy Morales, Ingeniero de IA de Producto. Construyo sistemas agénticos listos para producción y automatización de flujos de trabajo, llevando productos de IA del concepto a la beta.",
    ogLocale: "es_CO",
  },
  hero: {
    bio: "Ingeniero de IA de Producto. Construyo sistemas agénticos listos para producción y automatización de flujos de trabajo. Llevo productos de IA del concepto a la beta.",
    readOn: "Sigue leyendo",
  },
  sections: {
    about: { label: "Sobre mí", hint: "Quién soy" },
    experience: { label: "Experiencia", hint: "Dónde he trabajado" },
    projects: { label: "Proyectos", hint: "Lo que he construido" },
    education: { label: "Educación", hint: "Dónde estudié" },
    toolkit: { label: "Herramientas", hint: "Con qué trabajo" },
    contact: { label: "Contacto", hint: "Cómo escribirme" },
    philosophy: { label: "Filosofía", hint: "Cómo trabajo" },
  },
  welcome: {
    title: "Hola, soy Daivy. ¡Bienvenido!",
    hintBefore: "Desliza para explorar, o presiona",
    hintAfter: "para ir a cualquier sección.",
  },
  about: {
    intro:
      "Soy **Daivy Morales**, Ingeniero de IA de Producto en Mosquera, Colombia. Construyo sistemas agénticos listos para producción y automatización de flujos de trabajo, y me gusta todo el recorrido de un producto: desde la primera idea, pasando por la arquitectura, hasta una beta que la gente de verdad usa.",
    quote: {
      text: "Convierto procesos de negocio desordenados en capacidad operativa medible.",
      lead: "Convierto",
      middle: "procesos de negocio desordenados",
      end: "en capacidad operativa medible.",
      cite: "Lo que hago, en una línea",
    },
    now: "Hoy soy el único ingeniero de IA en **JOYC Brands**, donde construí el sistema operativo de abastecimiento de la empresa _de la idea a la beta_.",
    stat: "menos costo estimado que un modelo de desarrollo equivalente en EE. UU., para software de abastecimiento de nivel empresarial en JOYC Brands. Le devuelve al equipo entre 30 y 40 horas al mes.",
    beforeAfter: {
      title: "Lo que cambió para el equipo de abastecimiento",
      beforeLabel: "Antes",
      afterLabel: "Después",
      before: [
        "Perseguir proveedores en hilos de correo interminables",
        "Copiar cotizaciones a hojas de cálculo a mano",
        "30–40 horas al mes de seguimiento",
      ],
      after: [
        "Proveedores, cotizaciones y decisiones en un solo lugar",
        "La IA lee los mensajes y redacta las respuestas rutinarias",
        "Las personas conservan la negociación y la decisión final",
      ],
    },
  },
  experience: {
    at: "en",
    roles: [
      {
        title: "Ingeniero de IA",
        company: "JOYC Brands",
        place: "Brooklyn, Nueva York (remoto)",
        period: "May. 2026 – Actualidad",
        summary:
          "Como único ingeniero de IA de la empresa, construí su sistema operativo de abastecimiento de la idea a la beta, con funcionalidad de nivel empresarial a un costo estimado entre 97 y 99 % menor que un modelo de desarrollo equivalente en EE. UU.",
        highlights: [
          "Reuní en un solo flujo la información de proveedores, especificaciones de producto, cotizaciones, conversaciones y decisiones de producción.",
          "Lo diseñé para ahorrarle al equipo de abastecimiento entre 30 y 40 horas al mes de seguimiento manual y búsquedas en correos y hojas de cálculo.",
          "Construí flujos con IA que leen los mensajes de proveedores, extraen y ordenan los datos y redactan respuestas rutinarias, dejando la negociación y las decisiones finales a las personas.",
          "Senté las bases de IA para que el abastecimiento crezca sin que el trabajo administrativo crezca al mismo ritmo.",
        ],
      },
      {
        title: "Líder de Consultoría en IA e Innovación",
        company: "OFI Services",
        place: "Ámsterdam, Países Bajos (remoto)",
        period: "Ene. 2026 – May. 2026",
        summary: "",
        highlights: [
          "Lideré un equipo de tres consultores de IA en el desarrollo completo de la plataforma “Mark”, con arquitecturas de agentes autónomos en Python con LangGraph y LangChain.",
          "Coordiné el trabajo con equipos de ingeniería en Países Bajos e India, alineado con estándares globales de arquitectura.",
          "Rediseñé las plataformas “Mark” y “Consuelo”, de prototipos iniciales a productos profesionales, lo que aumentó su adopción.",
        ],
      },
      {
        title: "Practicante de Software IBM",
        company: "Nexsys Colombia",
        place: "Bogotá, Colombia",
        period: "Ene. 2024 – Jul. 2024",
        summary: "",
        highlights: [
          "Identifiqué y vinculé socios de canal estratégicos para la unidad de negocio de IBM, ampliando la red de ventas.",
          "Obtuve las certificaciones de WatsonX y AI Fundamentals para ayudar a los socios a adoptar la IA generativa.",
        ],
      },
    ],
  },
  projects: {
    intro: "Productos que diseñé y construí de principio a fin, del concepto a algo que la gente usa.",
    items: [
      {
        name: "Venedict",
        kind: "Multiagente · Finanzas",
        href: "",
        description:
          "Una plataforma de IA para análisis de inversiones. Dos agentes autónomos debaten la tesis alcista y la bajista de forma asíncrona, para que la decisión no dependa del sesgo de un solo lado. Construida de principio a fin, del concepto a un producto premium.",
      },
      {
        name: "Baruch Delivery Assistant",
        kind: "n8n · WhatsApp",
        href: "",
        description:
          "Un asistente de WhatsApp para Baruch Restaurant que toma pedidos y gestiona domicilios por su cuenta, con flujos en n8n y un diseño cuidadoso de prompts. Cerró 8 ventas directas en su primer lanzamiento y le quitó trabajo administrativo manual al equipo.",
      },
      {
        name: "“Mark” y “Consuelo”",
        kind: "LangGraph · OFI Services",
        href: "",
        description:
          "Mark es una plataforma de marketing donde agentes autónomos generan imágenes y publican contenido; Consuelo es una plataforma de recursos humanos cuya interfaz rediseñé hasta convertirla en un producto profesional que los equipos adoptaron.",
      },
    ],
  },
  education: [
    {
      school: "Politécnico Grancolombiano",
      degree: "Ingeniería de Software, con énfasis en TI e Infraestructura",
      place: "Bogotá",
      period: "2024 – Mar. 2027",
    },
    { school: "American School Way", degree: "Inglés, nivel B2+", place: "Mosquera", period: "2024 – 2025" },
    { school: "SENA", degree: "Tecnólogo en Software", place: "Mosquera", period: "2022 – 2024" },
  ],
  toolkit: {
    areas: {
      ai: "IA",
      engineering: "Ingeniería",
      automation: "Automatización",
      data: "Datos",
      cloud: "Nube",
      tools: "Herramientas",
      certifications: "Certificaciones",
    },
    names: {
      "LLM architecture": "Arquitectura de LLM",
      "Spec-driven development": "Desarrollo guiado por especificaciones",
      "REST APIs": "APIs REST",
      "IBM AI": "IA de IBM",
    },
  },
  contact: {
    before: "La mejor forma de contactarme es por correo a",
    after:
      "Me encanta hablar de productos de IA, sistemas agénticos y automatización. O simplemente usa la caja en la parte de abajo de la pantalla.",
  },
  philosophy: {
    teaser:
      "Las habilidades se aprenden y las herramientas cambian cada año. Lo que no cambia es cómo trabajo: con honestidad, con cuidado y pensando en las personas para quienes construyo.",
    teaserLine: "¿Quieres saber cómo trabajo?",
    keys: "Honestidad · Confianza · Integridad · Humildad · Personas · Oficio · Responsabilidad · Generosidad",
    kicker: "Filosofía",
    title: "Cómo trabajo",
    intro:
      "Las habilidades se aprenden y las herramientas cambian cada año. Estas son las cosas que no cambio por velocidad ni por dinero, ya sea que construya solo o liderando un equipo.",
    statement: "Constrúyelo con cuidado, para las personas que de verdad lo van a usar.",
    workWithMe: "Trabajemos juntos",
    openAsPage: "Abrir como página →",
    close: "Cerrar",
    endBefore: "Si esta también es tu forma de trabajar,",
    endLink: "escríbeme",
    pageDescription: "La filosofía de trabajo de Daivy: unos pocos principios para construir productos con cuidado.",
    principles: [
      {
        title: "Honestidad, siempre.",
        text: "Les digo la verdad a clientes y compañeros, aunque no sea lo que esperaban oír. Resultados reales, palabras claras, sin trucos.",
      },
      {
        title: "Mi palabra es mi contrato.",
        text: "Si digo que estará listo el viernes, está listo el viernes. Si algo cambia, lo sabes por mí primero, no por una fecha incumplida.",
      },
      {
        title: "Integridad cuando nadie está mirando.",
        text: "Las partes que nadie va a revisar reciben el mismo cuidado que la demo. Ahí es donde de verdad se gana la confianza.",
      },
      {
        title: "Humilde para aprender.",
        text: "Reconozco mis errores rápido, pido ayuda a tiempo y veo cada proyecto como una oportunidad para mejorar.",
      },
      {
        title: "Las personas antes que los resultados.",
        text: "Respeto a las personas con las que trabajo y para quienes construyo. La buena tecnología les devuelve tiempo para lo que más importa.",
      },
      {
        title: "El oficio antes que la prisa.",
        text: "Prefiero entregar algo bien hecho un poco después que algo descuidado a tiempo. La calidad es una forma de respeto.",
      },
      {
        title: "Responsabilidad de principio a fin.",
        text: "Desde la primera idea hasta la beta en manos de la gente, trato todo el producto como mío, incluidas las partes que salen mal.",
      },
      {
        title: "Compartir lo que sé.",
        text: "Casi todo lo que sé, alguien se tomó el tiempo de enseñármelo. Intento hacer lo mismo por las personas a mi alrededor.",
      },
    ],
  },
  ticker: [
    "Sistemas agénticos",
    "JOYC Brands",
    "Automatización de flujos",
    "OFI Services",
    "LangGraph",
    "Claude Code",
    "n8n",
    "Nexsys · IBM",
  ],
  ask: {
    examples: [
      "¿Puedes construir un asistente de IA para mi negocio?",
      "¿Cómo automatizarías el seguimiento de nuestros pedidos?",
      "¿Estás disponible para un nuevo proyecto?",
      "¿Qué construiste en JOYC Brands?",
    ],
    try: "Prueba",
    askAnything: "Pregúntale a Daivy lo que quieras…",
    messageLabel: "Mensaje para Daivy",
    send: "Enviar por correo",
    subject: "Hola desde tu sitio",
  },
  footer: {
    tagline: ["Productos de IA,", "hechos con cuidado."],
    sub: "Déjame tu correo y te respondo.",
    placeholder: "tu@correo.com",
    emailLabel: "Tu correo electrónico",
    button: "Saludar",
    mailSubject: "Hablemos",
    mailBody: "Hola Daivy, me gustaría hablar contigo. Puedes escribirme a",
    explore: "Explorar",
    more: "Más",
    contact: "Contacto",
    emailMe: "Escríbeme",
    howIWork: "Cómo trabajo",
  },
  terminal: {
    verbs: ["Leyendo", "Pensando", "Explorando", "Recorriendo", "Divagando", "Ojeando", "Descubriendo"],
    read: "leído",
    press: "presiona",
    forCommands: "para comandos",
    openMenu: "Abrir menú de comandos",
    title: "daivy — comandos",
    placeholder: "/ escribe un comando",
    foot: "↑↓ moverse · enter ir · esc cerrar",
    notFound: "comando no encontrado:",
    emailHint: "Escríbeme",
    topHint: "Volver arriba",
    philosophyHint: "Cómo trabajo",
    helpHint: "Cómo usar este menú",
    help: "/        abrir este menú\n↑ ↓      subir y bajar\nenter    ir allí\nesc      cerrar",
    switchName: "english",
    switchHint: "View in English",
  },
  toc: { contents: "Contenido", close: "Cerrar" },
  sdg: { aria: "S.D.G., Soli Deo Gloria. En Cristo confío.", trust: "En Cristo confío" },
  console: "Gracias por mirar bajo el capó. Hecho con Next.js, Motion y mucho cuidado.\nEn Cristo confío. ✝",
  back: "Daivy",
  langSwitch: "Idioma",
  notFound: { text: "No hay nada en esta dirección.", back: "Volver al inicio" },
};
