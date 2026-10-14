/** Small pieces with the look of a terminal app, written in plain words. */

/** A bordered welcome box, in the style of a terminal app's start-up screen. */
export function WelcomeBox({ name }: { name: string }) {
  return (
    <div className="welcome" role="note">
      <p className="welcome-title">
        <span className="welcome-star" aria-hidden="true">✻</span> Hi, I&apos;m {name}. Welcome!
      </p>
      <p className="welcome-dim">
        Scroll to explore, or press <kbd>/</kbd> to jump to any section.
      </p>
    </div>
  );
}

/** A two-part box showing how things worked before and after. */
export function BeforeAfter({ title, before, after }: { title: string; before: string[]; after: string[] }) {
  return (
    <figure className="ba">
      <figcaption className="ba-title">
        <span aria-hidden="true">⏺ </span>
        {title}
      </figcaption>
      <div className="ba-cols">
        <div className="ba-col ba-before">
          <p className="ba-label">Before</p>
          <ul>
            {before.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="ba-col ba-after">
          <p className="ba-label">After</p>
          <ul>
            {after.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
