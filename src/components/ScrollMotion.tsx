"use client";

import { useEffect } from "react";

/** How long a reveal transition should take, plus a margin. */
const TRANSITION_MS = 900;
const SAFETY_MS = TRANSITION_MS + 400;

/**
 * One observer for the whole document. Elements opt in with
 * `data-reveal` (fade + rise) or `data-reveal-img` (clip wipe on a
 * `.media` descendant). Keeping this in a single client island lets every
 * section stay a server component.
 */
export function ScrollMotion() {
  useEffect(() => {
    const targets = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-img]"),
    ];
    const pending = new Set(targets);

    const show = (el: HTMLElement) => {
      if (!pending.has(el)) return;
      pending.delete(el);
      if (el.hasAttribute("data-reveal")) el.dataset.reveal = "in";
      if (el.hasAttribute("data-reveal-img")) el.dataset.revealImg = "in";
    };

    /**
     * Safety net. The reveal is a CSS transition, so if the compositor
     * never advances it — background tab, throttled renderer, low-end
     * device dropping frames — the element would sit at opacity 0 with
     * nothing left to trigger a redraw. Once the transition should have
     * finished, verify it actually did, and snap to the end state if not.
     * Costs one timer per revealed element and never runs in the happy path.
     */
    const armSafety = (el: HTMLElement) => {
      window.setTimeout(() => {
        if (!el.isConnected) return;
        const styles = getComputedStyle(el);
        if (styles.opacity === "" || parseFloat(styles.opacity) >= 0.99) return;
        el.style.transition = "none";
        el.style.opacity = "1";
        el.style.transform = "none";
      }, SAFETY_MS);
    };

    const reveal = (el: HTMLElement) => {
      show(el);
      armSafety(el);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      targets.forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          reveal(el);
          io.unobserve(el);
        }
      },
      // `threshold: 0` fires as soon as any pixel is in view, so a fast
      // scroll or an anchor jump that lands past an element still reveals it.
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    targets.forEach((el) => io.observe(el));

    /**
     * Belt and braces.
     *
     * IntersectionObserver only reports at rendering opportunities, and a
     * fast scroll (momentum on a trackpad, a restored scroll position, an
     * automated jump) can outrun it and leave a heading sitting at opacity 0
     * with nothing left to trigger a redraw. This sweeps anything already
     * inside the viewport on each animation frame while scrolling, and only
     * inspects elements that have not been revealed yet. The listener
     * detaches itself the moment the set empties, so it costs nothing for
     * the rest of the session.
     */
    let queued = false;
    const sweep = () => {
      queued = false;
      if (!pending.size) {
        window.removeEventListener("scroll", onScroll);
        return;
      }
      const limit = window.innerHeight * 0.94;
      for (const el of pending) {
        const r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) reveal(el);
      }
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(sweep);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pageshow", onScroll);

    // Anything already on screen at load should not wait for a scroll.
    requestAnimationFrame(() => {
      for (const el of pending) {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.94 && r.bottom > 0) reveal(el);
      }
    });

    // Safety net for the sweep itself: whatever is still on screen a moment
    // after load is visible, whatever the observer decided.
    window.setTimeout(sweep, 400);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", onScroll);
    };
  }, []);

  return null;
}