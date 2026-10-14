import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AskBar } from "@/components/ask-bar";
import { LangSwitch } from "@/components/lang-switch";
import { Reveal, ScrubText, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary, hasLocale, locales } from "@/content/i18n";
import { site } from "@/content/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/philosophy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.philosophy.title,
    description: t.philosophy.pageDescription,
    alternates: {
      canonical: `/${lang}/philosophy`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/philosophy`])),
    },
  };
}

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export default async function PhilosophyPage({ params }: PageProps<"/[lang]/philosophy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const p = t.philosophy;

  return (
    <>
      <LangSwitch lang={lang} label={t.langSwitch} />
      <div className="solo">
        <Link href={`/${lang}`} className="solo-back">
          <span aria-hidden="true">← </span>
          {t.back}
        </Link>

        <main className="content solo-main">
          <p className="solo-kicker">{p.kicker}</p>
          <h1 className="solo-title">{p.title}</h1>
          <Reveal>
            <p>{p.intro}</p>
          </Reveal>

          <blockquote className="verse">
            <p className="verse-text">
              <ScrubText text={p.statement} />
            </p>
          </blockquote>

          <Stagger as="ol" className="creed">
            {p.principles.map((item, i) => (
              <StaggerItem key={item.title} className="creed-item">
                <span className="creed-num" aria-hidden="true">
                  {numerals[i]}
                </span>
                <div>
                  <h2 className="creed-title">{item.title}</h2>
                  <p className="creed-text">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <p className="solo-end">
              {p.endBefore} <a href={`mailto:${site.email}`}>{p.endLink}</a>.
            </p>
          </Reveal>
        </main>

        <AskBar lang={lang} t={t.ask} />
      </div>
      <SiteFooter fullName={site.fullName} email={site.email} lang={lang} t={t.footer} sections={t.sections} sdg={t.sdg} />
    </>
  );
}
