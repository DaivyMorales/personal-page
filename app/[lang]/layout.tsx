import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { MotionProvider, ScrollProgress } from "@/components/motion/chrome";
import { CustomCursor, PageIris } from "@/components/motion/cursor";
import { getDictionary, hasLocale, locales } from "@/content/i18n";
import { site } from "@/content/site";
import "../globals.css";

// Every page on this site is static. Fail the build if that ever changes.
export const ensureStatic = "navigation";

// Prerender one copy of the site per language: /en and /es.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const serif = Instrument_Serif({
  variable: "--font-serif-face",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return { metadataBase: new URL(site.url) };
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s · ${site.name}` },
    description: t.meta.description,
    applicationName: site.name,
    authors: [{ name: site.fullName, url: site.url }],
    // Tell search engines about the other language's version of each page.
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: t.meta.ogLocale,
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  // Labels the circle transition shows for each page, and for each language when switching.
  const pageNames = Object.fromEntries(
    locales.flatMap((l) => [
      [`/${l}`, site.name],
      [`/${l}/philosophy`, getDictionary(l).philosophy.title],
      [`/${l}/chat`, getDictionary(l).chat.pageTitle],
    ]),
  );
  const langNames = Object.fromEntries(locales.map((l) => [l, getDictionary(l).langName]));

  return (
    <html lang={lang} className={`${plexMono.variable} ${serif.variable}`} data-scroll-behavior="smooth">
      <body>
        <MotionProvider>
          <ScrollProgress />
          {children}
          <PageIris pageNames={pageNames} langNames={langNames} />
          <CustomCursor />
        </MotionProvider>
      </body>
    </html>
  );
}
