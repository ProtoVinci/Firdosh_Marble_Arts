"use client";

import { useEffect, useRef, useState } from "react";
import { NAV, PHONE_HREF, STUDIO, WHATSAPP_HREF } from "@/lib/content";
import { InstallApp } from "./InstallApp";
import { Mark } from "./Mark";

/** Everything behind the open mobile menu, made inert while it is open. */
const BEHIND = "body > main, body > footer, body > [data-contact-bar]";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    // Keyboard and screen-reader users stay inside the menu: the page
    // behind it cannot be tabbed to or read while it is open.
    const behind = [...document.querySelectorAll<HTMLElement>(BEHIND)];
    behind.forEach((el) => (el.inert = true));
    firstLinkRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      behind.forEach((el) => (el.inert = false));
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? "border-b border-ink/12 bg-bone"
            : "border-b border-transparent bg-bone/0"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-[156rem] items-center justify-between px-5 sm:px-8 lg:px-10 xl:px-12 2xl:px-16">
          {/* A plain anchor: next/link to a hash made the router prefetch
              the current route's RSC payload twice on every load. */}
          <a
            href="#top"
            className="group flex items-center gap-2.5 py-2"
            onClick={() => setOpen(false)}
          >
            <Mark className="h-6 w-6 shrink-0 text-clay transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-180" />
            <span className="flex flex-col leading-none">
              <span className="font-[family-name:var(--font-display)] text-[0.95rem] leading-none font-normal tracking-[-0.01em]">
                {STUDIO.name}
              </span>
              <span className="micro mt-1 text-[0.6875rem] text-ink/65">{STUDIO.descriptor}</span>
            </span>
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="micro link-draw text-ink/75 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid hidden min-h-11 px-5 py-2 text-[0.875rem] lg:inline-flex"
            >
              Chat on WhatsApp
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="micro -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-5 bg-ink transition-all duration-400 ease-[var(--ease-out-expo)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-5 bg-ink transition-all duration-400 ease-[var(--ease-out-expo)] ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay. Visibility switches at once on open — while it is
          still transitioning from `hidden` nothing inside can take focus —
          and only waits for the fade on close. */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 bg-bone duration-500 ease-[var(--ease-out-expo)] lg:hidden ${
          open
            ? "visible opacity-100 transition-opacity"
            : "invisible opacity-0 transition-[opacity,visibility]"
        }`}
      >
        <div className="flex h-full flex-col justify-between gap-10 overflow-y-auto px-5 pt-24 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-28">
          <nav aria-label="Sections" className="flex flex-col">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display border-b border-ink/12 py-4 text-[2.25rem] transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] sm:py-5 sm:text-[2.6rem]"
                style={{
                  transitionDelay: open ? `${120 + i * 70}ms` : "0ms",
                  transform: open ? "none" : "translateY(1.5rem)",
                  opacity: open ? 1 : 0,
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid"
            >
              Chat on WhatsApp
            </a>
            <a href={PHONE_HREF} className="btn btn-line">
              Call {STUDIO.phones[0]}
            </a>
            <p className="mt-3 max-w-[34ch] text-[0.875rem] leading-snug text-ink/65">
              {STUDIO.residence}
            </p>
            <InstallApp className="text-ink/70" />
          </div>
        </div>
      </div>
    </>
  );
}
