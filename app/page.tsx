import { ContactDock } from "@/components/contact-dock";
import { socialIcons } from "@/components/icons";
import { Section, SideNote } from "@/components/section";
import { SiteNav } from "@/components/site-nav";
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
    <div className="page">
      <aside className="rail">
        <SiteNav current="/" />
        <Toc items={sections} />
      </aside>

      <main className="column">
        <header className="flex min-h-[calc(100svh-120px)] flex-col">
          <div className="my-auto py-16">
            <p className="m-0 inline-flex h-8 items-center rounded-full bg-card px-3.5 text-[14px] shadow-[var(--card-shadow)]">
              <span className="text-muted">Hi,&nbsp;</span>I&apos;m {site.name}
              <span className="ml-1.5" aria-hidden="true">👋</span>
            </p>
            <h1 className="mt-5 mb-0 max-w-[18ch] font-serif text-[44px]/[1.05] font-normal tracking-[-0.01em] text-balance sm:text-[56px]">
              {site.headline}
            </h1>

            <div className="mt-12 grid gap-8 sm:grid-cols-[1fr_220px]">
              <ul className="m-0 flex list-none gap-2 p-0">
                {site.social.map(({ label, href }) => {
                  const Icon = socialIcons[label];
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${site.name} on ${label}`}
                        className="grid size-10 place-items-center rounded-full bg-card text-ink shadow-[var(--card-shadow)] transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div>
                <p className="m-0 text-[13.5px]/[21px] text-text-2">{site.bio}</p>
                <a href="#about" className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] text-ink no-underline">
                  Discover <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <Section id="about" index={1} title="About">
          <p>
            Hi, I&apos;m {site.name}. Replace this paragraph with a few honest lines about who you are,
            what you work on, and <span className="u">the kind of problems you enjoy</span>.
            <SideNote n={1}>Margin notes like this one sit beside the text on wide screens.</SideNote>
          </p>
          <blockquote className="pull">
            A line you live by, or something someone once told you.
            <cite>Who said it</cite>
          </blockquote>
          <p>
            A second paragraph can say what you are doing <em>right now</em>: learning, building,
            or looking for.
          </p>
        </Section>

        <Section id="projects" index={2} title="Projects">
          <p>A few things I have built. Each one taught me something different.</p>
          <ul className="mt-6 mb-7 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
            {projects.map((p) => {
              const body = (
                <>
                  <span className="flex items-baseline justify-between gap-3">
                    <strong className="font-[550]">{p.name}</strong>
                    <span className="text-xs text-muted">{p.kind}</span>
                  </span>
                  <span className="mt-1 block text-[13px]/5 text-text-2">{p.description}</span>
                </>
              );
              return (
                <li key={p.name}>
                  {p.href ? (
                    <a href={p.href} className="card block h-full px-4 py-3.5 no-underline" target="_blank" rel="noopener noreferrer">
                      {body}
                    </a>
                  ) : (
                    <div className="card h-full px-4 py-3.5">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Section>

        <Section id="experience" index={3} title="Experience">
          <p>Where I have worked and what I did there.</p>
          <table className="table">
            <tbody>
              {experience.map((r) => (
                <tr key={r.period}>
                  <th scope="row">{r.title}</th>
                  <td className="num">{r.period}</td>
                  <td>
                    <span className="text-ink">{r.where}.</span> {r.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section id="toolkit" index={4} title="Toolkit">
          <dl className="m-0 grid grid-cols-[120px_1fr] text-[13px]/5">
            {toolkit.map(({ area, items }) => (
              <div key={area} className="contents">
                <dt className="border-t border-rule py-2 text-muted">{area}</dt>
                <dd className="m-0 border-t border-rule py-2">{items}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="contact" index={5} title="Contact">
          <p>
            The best way to reach me is by email at{" "}
            <a href={`mailto:${site.email}`} className="u">{site.email}</a>. I read everything.
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-x-[18px] gap-y-1 p-0">
            {site.social.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="nav-link" target="_blank" rel="noopener noreferrer">
                  {label} ↗
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <footer className="mt-24 text-xs text-muted">
          © {site.name}
        </footer>
      </main>
      <ContactDock />
    </div>
  );
}
