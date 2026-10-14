import { ContactDock } from "@/components/contact-dock";
import { Hero } from "@/components/motion/hero";
import { Reveal, ScrubText, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { Toc, type TocItem } from "@/components/toc";
import { experience, projects, site, toolkit } from "@/content/site";

const sections: TocItem[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
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
              Hi, I&apos;m <strong>{site.name}</strong>. Replace this paragraph with a few honest lines
              about who you are, what you work on, and the kind of problems you enjoy.
            </p>
          </Reveal>
          <blockquote className="pull">
            <ScrubText text="A line you live by, or something someone once told you." />
            <cite>Who said it</cite>
          </blockquote>
          <Reveal>
            <p>
              A second paragraph can say what you are doing <em>right now</em>: learning, building, or
              looking for.
            </p>
          </Reveal>
        </Section>

        <Section id="projects" title="Projects">
          <Reveal>
            <p>A few things I have built. Each one taught me something different.</p>
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
                <span className="opacity-50"> ({p.kind})</span>
                <br />
                {p.description}
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <Section id="experience" title="Experience">
          <Reveal>
            <p>Where I have worked and what I did there.</p>
          </Reveal>
          <table className="table">
            <Stagger as="tbody">
              {experience.map((r) => (
                <StaggerItem as="tr" key={r.period}>
                  <th scope="row">{r.title}</th>
                  <td className="num">{r.period}</td>
                  <td>
                    {r.where}. {r.note}
                  </td>
                </StaggerItem>
              ))}
            </Stagger>
          </table>
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
              <a href={`mailto:${site.email}`}>{site.email}</a>. I read everything.
            </p>
          </Reveal>
          <Stagger className="bullets">
            {site.social.map(({ label, href }) => (
              <StaggerItem key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <footer className="pb-32 opacity-50">© {site.name}</footer>
      </main>

      <ContactDock />
    </div>
  );
}
