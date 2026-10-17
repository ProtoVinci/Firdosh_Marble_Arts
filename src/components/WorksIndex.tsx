"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Work = {
  image: string;
  alt: string;
  /** Row label in the index. */
  title: string;
  /** Small grouping shown on the right of the row. */
  tag?: string;
};

/**
 * A works index rather than a grid.
 *
 * A grid of twelve photographs reads as twelve competing rectangles. This
 * reads as one object: a list of works on the left, one large preview on
 * the right that changes as you move down the list. Only one photograph is
 * ever on screen at a time, so a dozen images cost the reader nothing and
 * the page stays visually quiet.
 *
 * Three inputs drive the preview, so it works with a mouse, a keyboard and
 * a finger:
 *   - pointer hover
 *   - keyboard focus / arrow keys
 *   - scrolling the list past the viewport (IntersectionObserver)
 */
export function WorksIndex({ items }: { items: readonly Work[] }) {
  const [spied, setSpied] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const active = hovered ?? focused ?? spied;

  // Frames that have been mounted stay mounted. Unmounting a photograph the
  // reader has already seen meant re-decoding it, and a blank flash, every
  // time they moved back up the list. The window reaches two rows ahead so
  // the next frame has finished loading before the crossfade gets to it.
  const [mounted, setMounted] = useState<ReadonlySet<number>>(() => new Set([0, 1, 2]));
  const wanted = [active - 1, active, active + 1, active + 2].filter(
    (i) => i >= 0 && i < items.length,
  );
  if (wanted.some((i) => !mounted.has(i))) {
    setMounted(new Set([...mounted, ...wanted]));
  }

  // Scroll-spy: whichever row is nearest the middle of the viewport wins.
  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (!rows.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const idx = rows.indexOf(visible[0].target as HTMLButtonElement);
        if (idx >= 0) setSpied(idx);
      },
      // A band across the middle of the viewport: only the row the
      // reader is actually looking at counts as active.
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );

    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, [items.length]);

  // On a phone there is no hover and the preview sits above the list, so
  // bring it back into view when the reader picks a row.
  const pick = useCallback((i: number) => {
    setSpied(i);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const el = previewRef.current;
    if (!el || window.innerWidth >= 1024) return;
    const r = el.getBoundingClientRect();
    if (r.top < 0 || r.top > window.innerHeight * 0.6) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const n = Math.min(items.length - 1, i + 1);
      setFocused(n);
      rowRefs.current[n]?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const n = Math.max(0, i - 1);
      setFocused(n);
      rowRefs.current[n]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setFocused(0);
      rowRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      setFocused(items.length - 1);
      rowRefs.current[items.length - 1]?.focus();
    }
  };

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-14">
      {/* Preview. Sticky on desktop and sized to the viewport, so it stays
          beside the list for the whole chapter instead of scrolling away. */}
      <div className="lg:sticky lg:top-32 lg:col-span-7 lg:self-start">
        <div
          ref={previewRef}
          className="relative aspect-4/5 w-full overflow-hidden bg-shell sm:aspect-16/10 lg:aspect-auto lg:h-[calc(100vh-9rem)]"
        >
          {items.map((item, i) => {
            // The twelve frames are stacked in one box, so the browser's
            // lazy-load heuristic counts every one of them as visible and
            // would fire twelve requests at once. Only frames the reader
            // has reached, or is about to, are mounted.
            if (!mounted.has(i)) return null;
            return (
              <div
                key={item.image}
                aria-hidden={i !== active}
                className="absolute inset-0 transition-opacity duration-500 ease-[var(--ease-out-expo)]"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  quality={68}
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover"
                />
              </div>
            );
          })}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-7">
            <span className="micro bg-ink/75 px-3 py-2 text-bone">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <span className="micro bg-ink/75 px-3 py-2 text-bone">
              {items[active].tag}
            </span>
          </div>
        </div>
      </div>

      {/* Index */}
      <div className="mt-8 sm:mt-10 lg:col-span-5 lg:mt-0">
        <ul className="border-t border-ink/15" onMouseLeave={() => setHovered(null)}>
          {items.map((item, i) => (
            <li key={item.image} className="border-b border-ink/15">
              <button
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                type="button"
                onMouseEnter={() => setHovered(i)}
                onFocus={() => {
                  setFocused(i);
                  pick(i);
                }}
                onBlur={() => setFocused(null)}
                onClick={() => pick(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                aria-current={i === active ? "true" : undefined}
                className="group flex w-full items-baseline gap-4 py-3.5 text-left sm:gap-6 sm:py-5"
              >
                <span
                  className={`micro w-7 shrink-0 tabular-nums transition-colors duration-300 ${
                    i === active ? "text-clay" : "text-ink/35"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block font-[family-name:var(--font-display)] text-[1.25rem] leading-tight tracking-[-0.02em] transition-transform duration-500 ease-[var(--ease-out-expo)] sm:text-[1.5rem] group-hover:translate-x-1"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {item.title}
                  </span>
                </span>
                <span
                  className={`micro hidden shrink-0 transition-opacity duration-300 sm:block ${
                    i === active ? "text-ink/45 opacity-100" : "text-ink/40 opacity-0"
                  }`}
                >
                  {item.tag}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}