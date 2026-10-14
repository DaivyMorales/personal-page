import { ConsoleWink } from "@/components/console-wink";
import { ContactDock } from "@/components/contact-dock";
import { Hero } from "@/components/motion/hero";
import { Reveal, ScrubText, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Stat } from "@/components/motion/stat";
import { Section } from "@/components/section";
import { techIcon } from "@/components/tech-icon";
import { Ticker } from "@/components/ticker";
import { Toc, type TocItem } from "@/components/toc";
import { education, experience, projects, site, ticker, toolkit } from "@/content/site";

const sections: TocItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "toolkit", label: "Toolkit" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <div className="layout">
      <Hero name={site.name}>
        <p className="m-0">
          {site.bio} <a href="#about">Read on</a>.
        </p>
      </Hero>

      <Ticker items={ticker} crossAfter={3} />

      <Toc items={sections} />

      <main className="content">
        <Section id="about" title="About">
          <Reveal>
            <p>
              I&apos;m <strong>{site.fullName}</strong>, a {site.tagline} based in {site.location}. I build
              production-oriented agentic systems and workflow automation, and I like the whole arc of a
              product: from the first idea, through the architecture, to a beta people actually use.
            </p>
          </Reveal>
          <blockquote className="pull">
            <ScrubText text="I turn unstructured business processes into measurable operational capacity." />
            <cite>What I do, in one line</cite>
          </blockquote>
          <Reveal>
            <p>
              Right now I&apos;m the sole AI engineer at <strong>JOYC Brands</strong>, where I built the
              company&apos;s sourcing operating system <em>from idea to beta</em>.
            </p>
          </Reveal>
          <Stat from={97} to={99} suffix="%">
            estimated lower cost than a comparable U.S. delivery model, for enterprise-level sourcing
            software at JOYC Brands. It gives the team back 30–40 hours a month.
          </Stat>
        </Section>

        <Section id="experience" title="Experience">
          {experience.map((role) => (
            <article key={role.company} className="role">
              <Reveal>
                <h3 className="role-title">
                  {role.title} <span className="role-at">at</span> {role.company}
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

        <Section id="projects" title="Projects">
          <Reveal>
            <p>Things I&apos;ve designed and built end to end, from concept to a product people use.</p>
          </Reveal>
          <Stagger className="bullets">
            {projects.map((p) => (
              <StaggerItem key={p.name}>
                <strong>
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer">{p.name}</a>
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

        <Section id="education" title="Education">
          {education.map((e) => (
            <Reveal key={e.school} className="role">
              <h3 className="role-title">{e.degree}</h3>
              <p className="role-meta">
                {e.school} · {e.period} · {e.place}
              </p>
            </Reveal>
          ))}
        </Section>

        <Section id="toolkit" title="Toolkit">
          {toolkit.map(({ area, items }) => (
            <div key={area} className="tech-group">
              <h3 className="tech-area">{area}</h3>
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
                      {name}
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          ))}
        </Section>

        <Section id="contact" title="Contact">
          <Reveal>
            <p>
              The best way to reach me is by email at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>. I&apos;m happy to talk about AI products,
              agentic systems and automation work.
            </p>
          </Reveal>
          {site.social.length > 0 && (
            <Stagger className="bullets">
              {site.social.map(({ label, href }) => (
                <StaggerItem key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Section>

        <footer className="flex flex-wrap items-baseline gap-x-3 pb-32 text-dim">
          <span>© {site.fullName}</span>
          {/* Bach signed his scores "S.D.G.": Soli Deo Gloria. */}
          <span className="sdg" tabIndex={0} aria-label="S.D.G., Soli Deo Gloria. In Christ I trust.">
            <span aria-hidden="true">S.D.G.</span>
            <span className="sdg-reveal" aria-hidden="true">
              Soli Deo Gloria · <em>In Christ I trust</em>
            </span>
          </span>
        </footer>
        <ConsoleWink />
      </main>

      <ContactDock />
    </div>
  );
}
