"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { STUDIO } from "@/lib/content";
import { Mark } from "./Mark";

const NAV = [
  { label: "Mandirs", href: "#mandirs" },
  { label: "Fountains", href: "#fountains" },
  { label: "Visit", href: "#visit" },
  { label: "Enquire", href: "#enquire" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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
          <Link
            href="#top"
            className="group flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <Mark className="h-6 w-6 shrink-0 text-clay transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-180" />
            <span className="flex flex-col leading-none">
              <span className="font-[family-name:var(--font-display)] text-[0.95rem] leading-none font-normal tracking-[-0.01em]">
                {STUDIO.name}
              </span>
              <span className="micro mt-1 text-ink/50">{STUDIO.descriptor}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="micro link-draw text-ink/70 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#enquire"
              className="micro hidden border border-ink/20 px-4 py-2.5 text-ink transition-colors duration-300 hover:border-clay hover:bg-clay hover:text-bone lg:inline-block"
            >
              Request a Quote
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="micro flex h-10 w-10 items-center justify-center lg:hidden"
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

      {/* Mobile overlay */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 bg-bone transition-[opacity,visibility] duration-500 ease-[var(--ease-out-expo)] lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-5 pt-28 pb-10 sm:px-8">
          <nav className="flex flex-col">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display border-b border-ink/12 py-5 text-[2.6rem] transition-all duration-700 ease-[var(--ease-out-expo)]"
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

          <div className="flex flex-col gap-1 text-ink/60">
            <span className="micro mb-3 max-w-[30ch] text-ink/40">{STUDIO.residence}</span>
            {STUDIO.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="link-draw w-fit">
                {p}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}