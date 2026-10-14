/** A large serif strip that scrolls sideways forever, like si.gov's initiatives ticker. */
export function Ticker({ items }: { items: string[] }) {
  // Two identical halves: the track slides by exactly one half, so the loop is seamless.
  const half = items.flatMap((item, i) => [
    <span key={`t${i}`} className="ticker-item">{item}</span>,
    <span key={`d${i}`} className="ticker-sep" aria-hidden="true">◆</span>,
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
