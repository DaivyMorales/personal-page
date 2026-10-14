/** Small pieces with the look of a terminal app, written in plain words. */

/** A bordered welcome box, in the style of a terminal app's start-up screen. */
export function WelcomeBox({ title, hintBefore, hintAfter }: { title: string; hintBefore: string; hintAfter: string }) {
  return (
    <div className="welcome" role="note">
      <p className="welcome-title">
        <span className="welcome-star" aria-hidden="true">✻</span> {title}
      </p>
      <p className="welcome-dim">
        {hintBefore} <kbd>/</kbd> {hintAfter}
      </p>
    </div>
  );
}

/** A two-part box showing how things worked before and after. */
export function BeforeAfter({
  title,
  before,
  after,
  beforeLabel,
  afterLabel,
}: {
  title: string;
  before: string[];
  after: string[];
  beforeLabel: string;
  afterLabel: string;
}) {
  return (
    <figure className="ba">
      <figcaption className="ba-title">
        <span aria-hidden="true">⏺ </span>
        {title}
      </figcaption>
      <div className="ba-cols">
        <div className="ba-col ba-before">
          <p className="ba-label">{beforeLabel}</p>
          <ul>
            {before.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="ba-col ba-after">
          <p className="ba-label">{afterLabel}</p>
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
