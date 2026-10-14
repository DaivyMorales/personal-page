/** A large serif strip that scrolls sideways forever, like si.gov's initiatives ticker. */
export function Ticker({ items, crossAfter }: { items: string[]; crossAfter?: number }) {
  // Two identical halves: the track slides by exactly one half, so the loop is seamless.
  // One separator, after item `crossAfter`, is a small cross instead of a diamond: a quiet wink.
  const half = items.flatMap((item, i) => [
    <span key={`t${i}`} className="ticker-item">{item}</span>,
    i === crossAfter ? (
      <svg key={`d${i}`} className="ticker-sep ticker-cross" viewBox="0 0 10 14" aria-hidden="true">
        <path d="M4 0h2v4h4v2H6v8H4V6H0V4h4z" fill="currentColor" />
      </svg>
    ) : (
      <span key={`d${i}`} className="ticker-sep" aria-hidden="true">◆</span>
    ),
  ]);
  return (
    <div className="ticker" aria-label={items.join(", ")} role="marquee">
      <div className="ticker-track" aria-hidden="true">
        <div className="ticker-half">{half}</div>
        <div className="ticker-half">{half}</div>
      </div>
    </div>
  );
}
