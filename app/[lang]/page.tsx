import Image from "next/image";
import { notFound } from "next/navigation";
import { siClaude, siLanggraph, siN8n } from "simple-icons";
import portrait from "@/assets/daivy.jpg";
import { AskBar } from "@/components/ask-bar";
import { ConsoleWink } from "@/components/console-wink";
import { LangSwitch } from "@/components/lang-switch";
import { GraphPaper } from "@/components/graph-paper";
import { Hero } from "@/components/motion/hero";
import { Reveal, ScrubText, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Stat } from "@/components/motion/stat";
import { TypedPrompt } from "@/components/motion/typed-prompt";
import { PhilosophyModal } from "@/components/philosophy-modal";
import { Rich } from "@/components/rich";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { techIcon } from "@/components/tech-icon";
import { Terminal } from "@/components/terminal";
import { BeforeAfter } from "@/components/terminal-bits";
import { Ticker } from "@/components/ticker";
import { Toc } from "@/components/toc";
import { getDictionary, hasLocale } from "@/content/i18n";
import { site, toolkit } from "@/content/site";

const order = ["about", "experience", "projects", "education", "toolkit", "contact", "philosophy"] as const;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const sections = order.map((id) => ({ id, ...t.sections[id] }));
  const sdgAnswer = `Soli Deo Gloria. ${t.sdg.trust}. ✝`;

  return (
    <div className="layout">
      <GraphPaper />
      <LangSwitch lang={lang} label={t.langSwitch} />

      <Hero name={site.name}>
        <TypedPrompt prompt="daivy ~ %" command="whoami">
          <p className="m-0">
            {t.hero.bio} <a href="#about">{t.hero.readOn}</a>.
          </p>
        </TypedPrompt>
      </Hero>

      <Ticker items={t.ticker} crossAfter={3} />

      <Toc items={sections} labels={t.toc} />

      <main className="content">
        <Section id="about" title={t.sections.about.label}>
          <Reveal>
            <p>
              <Rich text={t.about.intro} />
            </p>
          </Reveal>
          <blockquote className="pull">
            <ScrubText
              text={t.about.quote.text}
              parts={[
                t.about.quote.lead,
                {
                  inline: (
                    <Image src={portrait} alt="" width={64} height={64} sizes="64px" className="inline-pic inline-photo" />
                  ),
                },
                t.about.quote.middle,
                {
                  inline: (
                    <span className="inline-stack">
                      {[siClaude, siN8n, siLanggraph].map((icon) => (
                        <span key={icon.slug} className="inline-pic inline-logo" style={{ color: `#${icon.hex}` }}>
                          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d={icon.path} />
                          </svg>
                        </span>
                      ))}
                    </span>
                  ),
                },
                t.about.quote.end,
              ]}
            />
            <cite>{t.about.quote.cite}</cite>
          </blockquote>
          <Reveal>
            <p>
              <Rich text={t.about.now} />
            </p>
          </Reveal>
          <Stat from={97} to={99} suffix="%">
            {t.about.stat}
          </Stat>
          <Reveal>
            <BeforeAfter {...t.about.beforeAfter} />
          </Reveal>
        </Section>

        <Section id="experience" title={t.sections.experience.label}>
          {t.experience.roles.map((role) => (
            <article key={role.company} className="role">
              <Reveal>
                <h3 className="role-title">
                  {role.title} <span className="role-at">{t.experience.at}</span> {role.company}
                </h3>
                <p className="role-meta">
                  {role.period} · {role.place}
                </p>
                {role.summary && <p>{role.summary}</p>}
              </Reveal>
              <Stagger className="bullets">
                {role.highlights.map((h) => (
                  <StaggerItem key={h}>{h}</StaggerItem>
                ))}
              </Stagger>
            </article>
          ))}
        </Section>

        <Section id="projects" title={t.sections.projects.label}>
          <Reveal>
            <p>{t.projects.intro}</p>
          </Reveal>
          <Stagger className="bullets bullets-term">
            {t.projects.items.map((p) => (
              <StaggerItem key={p.name}>
                <strong>
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer">
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                </strong>
                <span className="text-dim"> ({p.kind})</span>
                <br />
                {p.description}
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <Section id="education" title={t.sections.education.label}>
          {t.education.map((e) => (
            <Reveal key={e.school} className="role">
              <h3 className="role-title">{e.degree}</h3>
              <p className="role-meta">
                {e.school} · {e.period} · {e.place}
              </p>
            </Reveal>
          ))}
        </Section>

        <Section id="toolkit" title={t.sections.toolkit.label}>
          {toolkit.map(({ area, items }) => (
            <div key={area} className="tech-group">
              <h3 className="tech-area">{t.toolkit.areas[area]}</h3>
              <Stagger className="tech-list">
                {items.map(({ name, icon }) => {
                  const { svg, brand, darkBrand } = techIcon(icon);
                  return (
                    <StaggerItem
                      key={name}
                      className="tech-chip"
                      style={brand ? ({ "--brand": brand } as React.CSSProperties) : undefined}
                      data-dark-brand={darkBrand || undefined}
                    >
                      <span className="tech-icon">{svg}</span>
                      {t.toolkit.names[name] ?? name}
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          ))}
        </Section>

        <Section id="contact" title={t.sections.contact.label}>
          <Reveal>
            <p>
              {t.contact.before} <a href={`mailto:${site.email}`}>{site.email}</a>. {t.contact.after}
            </p>
          </Reveal>
          {site.social.length > 0 && (
            <Stagger className="bullets">
              {site.social.map(({ label, href }) => (
                <StaggerItem key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Section>

        <Section id="philosophy" title={t.sections.philosophy.label}>
          <Reveal>
            <p>{t.philosophy.teaser}</p>
          </Reveal>
          <Reveal>
            <PhilosophyModal t={t.philosophy} email={site.email} lang={lang} />
          </Reveal>
        </Section>

        <ConsoleWink message={t.console} />
      </main>

      <SiteFooter fullName={site.fullName} email={site.email} lang={lang} t={t.footer} sections={t.sections} sdg={t.sdg} />

      <AskBar email={site.email} t={t.ask} />
      <Terminal sections={sections} email={site.email} lang={lang} t={t.terminal} sdg={sdgAnswer} />
    </div>
  );
}
