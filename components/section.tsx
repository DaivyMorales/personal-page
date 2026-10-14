export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="section-head">
        <h2 id={`${id}-title`}>{title}</h2>
        <span className="section-index" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      {children}
    </section>
  );
}

/** A footnote marker that shows its note in the right margin on wide screens. */
export function SideNote({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <>
      <sup className="ref" aria-hidden="true">{n}</sup>
      <span className="side" role="note">
        <span aria-hidden="true">{n}</span>
        {children}
      </span>
    </>
  );
}
