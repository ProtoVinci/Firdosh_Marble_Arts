import Image from "next/image";

/**
 * Three layouts, three different treatments.
 *
 * The trick to showing twenty-five photographs without the page feeling
 * like a wall of images is that the reader never meets more than about
 * four at once, and the treatment changes between chapters so the eye
 * reads "new section" rather than "more of the same".
 *
 *   - Feature : one large plate. Breaks the rhythm.
 *   - Rail    : horizontal scroll. Occupies a single band, so the
 *               vertical length of the page stays under control.
 *   - Trio    : asymmetric three-up for a deliberately small set.
 *
 * The middle chapter, the twelve-piece works index, lives in
 * `WorksIndex.tsx` — it shows one photograph at a time, which is the
 * whole reason a grid of twelve felt like too much.
 */

type Img = { image: string; alt: string; focus?: string };

/* ------------------------------------------------------------------ *
   Feature — one image, given room.
 * ------------------------------------------------------------------ */

export function Feature({
  item,
  ratio = "16 / 9",
  sizes = "(max-width: 1024px) 100vw, 90vw",
  priority = false,
}: {
  item: Img;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure data-reveal-img className="relative w-full overflow-hidden bg-shell" style={{ aspectRatio: ratio }}>
      <div className="media relative h-full w-full">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          quality={68}
          priority={priority}
          sizes={sizes}
          style={{ objectPosition: item.focus ?? "50% 50%" }}
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] hover:scale-[1.02]"
        />
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ *
   Rail — horizontal scroll, bleeds off the right edge.
 * ------------------------------------------------------------------ */

export function Rail({
  items,
  width = "w-[74vw] sm:w-[44vw] lg:w-[30vw]",
  ratio = "4 / 5",
  gutter = "sm:px-8",
  priorityFirst = false,
  label,
}: {
  items: readonly Img[];
  width?: string;
  ratio?: string;
  gutter?: string;
  priorityFirst?: boolean;
  /** Names the scroll region; with it the rail is focusable, so arrow
   *  keys can scroll it without a mouse or trackpad. */
  label?: string;
}) {
  return (
    // The negative margin lets the rail bleed off the right edge; the clip
    // wrapper stops that bleed counting as page-level horizontal overflow.
    <div className="overflow-x-clip">
      <div className={gutter}>
        <div
          role={label ? "region" : undefined}
          aria-label={label}
          tabIndex={label ? 0 : undefined}
          className={`-mr-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pl-5 sm:-mr-8 sm:pl-8 [&::-webkit-scrollbar]:hidden`}
          style={{ scrollbarWidth: "none" }}
        >
        {items.map((item, i) => (
          <figure key={item.image} className={`${width} shrink-0 snap-start`}>
            <div
              className="relative w-full overflow-hidden bg-shell"
              style={{ aspectRatio: ratio }}
            >
              <div className="media relative h-full w-full">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  quality={68}
                  priority={priorityFirst && i === 0}
                  sizes="(max-width: 640px) 74vw, (max-width: 1024px) 44vw, 30vw"
                  style={{ objectPosition: item.focus ?? "50% 50%" }}
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] hover:scale-[1.03]"
                />
              </div>
            </div>
          </figure>
        ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
   Trio — asymmetric three-up for a small, deliberately short set.
 * ------------------------------------------------------------------ */

export function Trio({ items }: { items: readonly Img[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
      {items.map((item, i) => (
        <figure
          key={item.image}
          data-reveal
          style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
        >
          <div
            className="relative w-full overflow-hidden bg-shell"
            style={{ aspectRatio: i === 0 ? "3 / 4" : "4 / 5" }}
          >
            <div className="media relative h-full w-full">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                quality={68}
                sizes="(max-width: 640px) 92vw, 30vw"
                style={{ objectPosition: item.focus ?? "50% 50%" }}
                className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] hover:scale-[1.03]"
              />
            </div>
          </div>
        </figure>
      ))}
    </div>
  );
}

export type { Img };