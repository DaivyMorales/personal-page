import { Reveal } from "@/components/motion/reveal";

export type Highlight = {
  figure: string;
  caption: string;
  title: string;
  text: string;
  link?: { label: string; href: string };
};

/** america.gov-style feature rows: a rounded card with a big figure, beside a short headline. */
export function Highlights({ items }: { items: Highlight[] }) {
  return (
    <div className="hl">
      {items.map((h) => (
        <Reveal key={h.title} className="hl-row">
          <div className="hl-card" aria-hidden="true">
            <span className="hl-figure">{h.figure}</span>
            <span className="hl-caption">{h.caption}</span>
          </div>
          <div className="hl-body">
            <h3 className="hl-title">{h.title}</h3>
            <p className="hl-text">{h.text}</p>
            {h.link && (
              <a href={h.link.href} className="hl-link">
                {h.link.label} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
