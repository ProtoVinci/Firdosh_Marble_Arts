type MarqueeProps = {
  items: readonly string[];
  /** Seconds for one full pass. Larger = slower. */
  duration?: number;
  reverse?: boolean;
  separator?: string;
  className?: string;
  itemClassName?: string;
};

/**
 * Infinite horizontal ticker. The track holds two identical runs and
 * translates -50%, so the loop is seamless without measuring anything.
 */
export function Marquee({
  items,
  duration = 38,
  reverse = false,
  separator = "—",
  className = "",
  itemClassName = "",
}: MarqueeProps) {
  const run = (key: string) => (
    <div className="flex shrink-0 items-center" key={key} aria-hidden={key === "b"}>
      {items.map((item, i) => (
        <span className={`flex shrink-0 items-center ${itemClassName}`} key={`${key}-${i}`}>
          <span className="whitespace-nowrap">{item}</span>
          <span aria-hidden className="px-[0.7em] opacity-40">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {run("a")}
        {run("b")}
      </div>
    </div>
  );
}