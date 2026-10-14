import { ContactDock } from "@/components/contact-dock";
import { Hero } from "@/components/motion/hero";
import { Reveal, ScrubText, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { Toc, type TocItem } from "@/components/toc";
import { education, experience, projects, site, toolkit } from "@/content/site";

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
              company&apos;s sourcing operating system <em>from idea to beta</em>. It gives the sourcing team
              back 30–40 hours a month, at an estimated 97–99% lower cost than a comparable U.S. team.
            </p>
          </Reveal>
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
          <Stagger className="bullets">
            {toolkit.map(({ area, items }) => (
              <StaggerItem key={area}>
                <strong>{area}:</strong> {items}
              </StaggerItem>
            ))}
          </Stagger>
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

        <footer className="pb-32 text-dim">© {site.fullName}</footer>
      </main>

      <ContactDock />
    </div>
  );
}
