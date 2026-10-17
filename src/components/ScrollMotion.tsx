"use client";

import { useEffect } from "react";

/** Longest reveal: 0.7s transition + 0.21s stagger, plus a margin. */
const SAFETY_MS = 1600;

/**
 * One observer for the whole document. Elements opt in with
 * `data-reveal` (fade + rise) or `data-reveal-img` (fade + rise on a
 * `.media` descendant). Keeping this in a single client island lets every
 * section stay a server component.
 *
 * Also pauses the marquees while they are off screen, so two infinite
 * animations are not ticking for the whole session.
 */
export function ScrollMotion() {
  useEffect(() => {
    const targets = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-img]"),
    ];
    const pending = new Set(targets);
    const revealed: HTMLElement[] = [];

    const show = (el: HTMLElement) => {
      if (!pending.delete(el)) return;
      if (el.hasAttribute("data-reveal")) el.dataset.reveal = "in";
      if (el.hasAttribute("data-reveal-img")) el.dataset.revealImg = "in";
      revealed.push(el);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      targets.forEach(show);
      return;
    }

    /**
     * Safety net. A reveal is a CSS transition, so if the renderer never
     * advances it (background tab, throttled device) the element would sit
     * at opacity 0 with nothing left to trigger a redraw. One timer,
     * debounced across all reveals, snaps anything that failed to finish.
     */
    let safetyTimer = 0;
    const armSafety = () => {
      window.clearTimeout(safetyTimer);
      safetyTimer = window.setTimeout(() => {
        for (const el of revealed.splice(0)) {
          const target = el.hasAttribute("data-reveal-img")
            ? el.querySelector<HTMLElement>(".media")
            : el;
          if (!target?.isConnected) continue;
          if (parseFloat(getComputedStyle(target).opacity) >= 0.99) continue;
          target.style.transition = "none";
          target.style.opacity = "1";
          target.style.transform = "none";
        }
      }, SAFETY_MS);
    };

    const reveal = (el: HTMLElement) => {
      show(el);
      armSafety();
    };

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
     * IntersectionObserver only reports at rendering opportunities, and a
     * fast scroll or restored scroll position can outrun it. This sweeps
     * whatever is already inside the viewport once per frame while
     * scrolling, and detaches itself when nothing is left to reveal.
     */
    let queued = false;
    const sweep = () => {
      queued = false;
      if (!pending.size) {
        window.removeEventListener("scroll", onScroll);
        return;
      }
      // Anything at or above the bottom edge counts, including elements the
      // reader has already scrolled past: an anchor jump can skip a section
      // entirely, and it must not be blank when they scroll back up.
      const limit = window.innerHeight * 0.94;
      for (const el of pending) {
        if (el.getBoundingClientRect().top < limit) reveal(el);
      }
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(sweep);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pageshow", onScroll);
    requestAnimationFrame(sweep);
    const sweepTimer = window.setTimeout(sweep, 400);

    // Pause the tickers when they are off screen.
    const marquees = document.querySelectorAll<HTMLElement>(".marquee");
    const tickerIo = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) el.removeAttribute("data-offscreen");
        else el.setAttribute("data-offscreen", "");
      }
    });
    marquees.forEach((m) => tickerIo.observe(m));

    return () => {
      io.disconnect();
      tickerIo.disconnect();
      window.clearTimeout(safetyTimer);
      window.clearTimeout(sweepTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", onScroll);
    };
  }, []);

  return null;
}
