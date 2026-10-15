import Image from "next/image";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Feature, Rail, Trio } from "@/components/Frames";
import { Header } from "@/components/Header";
import { Marquee } from "@/components/Marquee";
import { Mark } from "@/components/Mark";
import { ScrollMotion } from "@/components/ScrollMotion";
import { WorksIndex } from "@/components/WorksIndex";
import {
  FACTS,
  FOUNTAINS,
  MANDIRS,
  MARQUEE,
  MARQUEE_FOOTER,
  STUDIO,
  TRADE,
  WORKS,
} from "@/lib/content";

/**
 * The page container.
 *
 * The cap is deliberately generous (140rem / 2240px). An earlier 110rem cap
 * left a 2560px monitor using only 69% of its width, which read as a band of
 * dead space down the right. The gutters scale with the viewport so the
 * measure tightens on small screens and opens up on large ones.
 */
const SHELL =
  "mx-auto w-full max-w-[156rem] px-5 sm:px-8 lg:px-10 xl:px-12 2xl:px-16";

/** Mandirs[0] is the hero, [1] is the feature, the rest ride the rail. */
const HERO_IMG = MANDIRS[0];
const FEATURE_IMG = MANDIRS[1];
const RAIL_MANDIRS = MANDIRS.slice(2);

export default function Page() {
  return (
    <>
      <ScrollMotion />
      <Header />

      <main id="top">
        {/* ---------------------------------------------------------- Hero */}
        <section className="relative pt-[6rem] lg:pt-[8.5rem]">
          <div className={`${SHELL} grid gap-y-10 lg:items-center lg:grid-cols-12 lg:gap-x-10`}>
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3" data-reveal>
                <span className="h-px w-10 bg-clay" />
                <span className="micro text-ink/55">Makrana · Rajasthan</span>
              </div>

              <h1
                className="display mt-8 text-hero"
                data-reveal
                style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
              >
                Cut in
                <br />
                white&nbsp;
                <em className="font-normal italic text-clay">marble.</em>
              </h1>

              <p
                className="mt-9 max-w-[36ch] text-lead leading-[1.45] text-umber"
                data-reveal
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
              >
                Marble suppliers, handcraft items and temple contractors. Mandirs,
                jali screens, fountains and carved figures.
              </p>

              <div
                className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8 sm:gap-y-4"
                data-reveal
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              >
                <a
                  href="#enquire"
                  className="micro group inline-flex items-center gap-3 bg-ink px-5 py-4 text-bone transition-colors duration-300 hover:bg-clay sm:px-6"
                >
                  Request a quote
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
                <a href="#mandirs" className="micro link-draw text-ink/70 hover:text-ink">
                  See the mandirs
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure data-reveal-img className="relative">
                <div className="media relative aspect-4/5 w-full overflow-hidden bg-shell">
                  <HeroImage />
                </div>
              </figure>
            </div>
          </div>

          <div className={`${SHELL} mt-14 lg:mt-28`}>
            <div className="rule" />
            <dl className="grid gap-y-8 pt-8 sm:grid-cols-3 sm:gap-x-10">
              {FACTS.map((fact, i) => (
                <div
                  key={fact.label}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                >
                  <dt className="micro text-ink/45">{fact.label}</dt>
                  <dd className="mt-2.5 text-[0.9375rem] leading-snug text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------- Marquee */}
        <section className="mt-14 border-y border-ink/12 py-5 lg:mt-28">
          <Marquee
            items={MARQUEE}
            duration={55}
            itemClassName="display text-[1.75rem] italic text-ink/80 sm:text-[2.25rem]"
          />
        </section>

        {/* ------------------------------------------------- Mandirs (dark) */}
        <section
          id="mandirs"
          className="scroll-mt-24 bg-ink pt-16 pb-16 text-bone lg:pt-32 lg:pb-32"
        >
          <div className={SHELL}>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <span className="micro text-bone/40" data-reveal>
                  Mandirs &amp; temples
                </span>
                <h2 className="display mt-5 text-display" data-reveal>
                  Temple work,
                  <br />
                  <em className="font-normal italic text-sand">fitted on site.</em>
                </h2>
              </div>
              <p className="max-w-[32ch] text-sm leading-relaxed text-bone/50" data-reveal>
                Freestanding mandirs, temple facades, carved doorways, jali screens
                and chhatris — supplied and installed, not just delivered.
              </p>
            </div>
          </div>

          <div className="mt-10 lg:mt-20">
            <Feature item={FEATURE_IMG} ratio="3 / 2" />
          </div>

          <div className="mt-5">
            <Rail items={RAIL_MANDIRS} />
          </div>
        </section>

        {/* ------------------------------------------- Selected works (light) */}
        <section id="works" className="scroll-mt-24 bg-bone py-16 lg:py-36">
          <div className={SHELL}>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <span className="micro text-ink/45" data-reveal>
                  Selected works
                </span>
                <h2 className="display mt-5 text-title" data-reveal>
                  Screens, panels
                  <br />
                  <em className="font-normal italic text-clay">
                    and carved relief.
                  </em>
                </h2>
              </div>
              <p className="max-w-[32ch] text-sm leading-relaxed text-umber" data-reveal>
                Twelve pieces from the shop floor — pierced screens, narrative
                reliefs, roundels and figures. Move down the list to look at
                each one.
              </p>
            </div>

            <div className="mt-10 lg:mt-20">
              <WorksIndex items={WORKS} />
            </div>
          </div>
        </section>

        {/* ------------------------------------------- Fountains (shell band) */}
        <section id="fountains" className="scroll-mt-24 bg-shell py-16 lg:py-32">
          <div className={SHELL}>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <span className="micro text-ink/45" data-reveal>
                  Water features
                </span>
                <h2 className="display mt-5 text-title" data-reveal>
                  Courtyard
                  <br />
                  <em className="font-normal italic">fountains.</em>
                </h2>
              </div>
              <p className="max-w-[32ch] text-sm leading-relaxed text-umber" data-reveal>
                Tiered fountains, lotus bowls, wall fountains and carved figures
                around the basin.
              </p>
            </div>

            <div className="mt-10 lg:mt-16">
              <Trio items={FOUNTAINS} />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------- The trade */}
        <section className="bg-bone py-16 lg:py-32">
          <div className={SHELL}>
            <div className="rule" />
            <div className="grid gap-y-10 pt-10 sm:grid-cols-3 sm:gap-x-12">
              {TRADE.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                >
                  <span className="numeral text-[1.75rem] text-clay">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-3 text-[1.5rem]">{item.title}</h3>
                  <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-umber">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- Visit */}
        <section id="visit" className="scroll-mt-24 bg-ink py-16 text-bone lg:py-32">
          <div className={SHELL}>
            <div className="grid gap-y-10 lg:items-center lg:grid-cols-12 lg:gap-x-10">
              <div className="lg:col-span-5">
                <span className="micro text-bone/40" data-reveal>
                  Visit
                </span>
                <h2 className="display mt-5 text-display" data-reveal>
                  Find us
                  <br />
                  <em className="font-normal italic text-sand">in Makrana.</em>
                </h2>
                <p className="mt-8 max-w-[38ch] leading-relaxed text-bone/55" data-reveal>
                  Makrana is the marble town. Come to the yard to see the work before
                  you commit to anything.
                </p>
              </div>

              <div className="lg:col-span-7">
                <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
                  <div data-reveal>
                    <dt className="micro text-bone/40">Residence &amp; workshop</dt>
                    <dd className="mt-3 leading-relaxed">
                      <address className="not-italic text-bone/85">
                        {STUDIO.residence}
                        <br />
                        {STUDIO.district}
                      </address>
                    </dd>
                  </div>
                  <div
                    data-reveal
                    style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
                  >
                    <dt className="micro text-bone/40">Godown &amp; stone supply</dt>
                    <dd className="mt-3 leading-relaxed">
                      <address className="not-italic text-bone/85">{STUDIO.godown}</address>
                    </dd>
                  </div>
                  <div
                    data-reveal
                    style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
                  >
                    <dt className="micro text-bone/40">Phone</dt>
                    <dd className="mt-3 flex flex-col items-start">
                      {STUDIO.phones.map((p) => (
                        <a
                          key={p}
                          href={`tel:${p.replace(/\s/g, "")}`}
                          className="link-draw text-bone"
                        >
                          {p}
                        </a>
                      ))}
                    </dd>
                  </div>
                  <div
                    data-reveal
                    style={{ "--reveal-delay": "210ms" } as React.CSSProperties}
                  >
                    <dt className="micro text-bone/40">GSTIN</dt>
                    <dd className="numeral mt-3 text-[1.75rem] text-bone/85">
                      {STUDIO.gstin}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- Enquire */}
        <section
          id="enquire"
          className="scroll-mt-24 bg-shell py-16 lg:py-32"
        >
          <div className={SHELL}>
            <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
              <div className="lg:col-span-5">
                <span className="micro text-ink/45" data-reveal>
                  Enquiries
                </span>
                <h2 className="display mt-5 text-display" data-reveal>
                  Tell us
                  <br />
                  <em className="font-normal italic text-clay">about the space.</em>
                </h2>
                <p className="mt-8 max-w-[38ch] leading-relaxed text-umber" data-reveal>
                  The more you tell us about where it will go, the more useful our
                  first reply will be. Site photographs are always welcome.
                </p>

                <div className="mt-12 flex flex-col items-start gap-1 text-ink/60">
                  <span className="micro mb-4 text-ink/40">Prefer to call?</span>
                  {STUDIO.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="link-draw text-[1.125rem] text-ink"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 lg:pt-16">
                <EnquiryForm tone="light" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------------------------------ Footer */}
      <footer className="border-t border-ink/12 bg-bone pt-16">
        <Marquee
          items={MARQUEE_FOOTER}
          duration={46}
          separator="·"
          className="pb-12"
          itemClassName="display text-[2rem] italic text-ink/70 sm:text-[2.75rem]"
        />

        <div className={`${SHELL} pb-12`}>
          <div className="rule" />
          <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-8 pt-10">
            <div className="flex items-center gap-2.5">
              <Mark className="h-7 w-7 text-clay" />
              <span className="flex flex-col leading-none">
                <span className="font-[family-name:var(--font-display)] text-lg">
                  {STUDIO.name}
                </span>
                <span className="micro mt-1.5 max-w-[44ch] text-ink/45">
                  {STUDIO.tagline}
                </span>
              </span>
            </div>

            <nav className="flex flex-wrap gap-x-8 gap-y-2">
              {[
                { label: "Mandirs", href: "#mandirs" },
                { label: "Fountains", href: "#fountains" },
                { label: "Visit", href: "#visit" },
                { label: "Enquire", href: "#enquire" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="micro link-draw text-ink/60 hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <p className="text-[0.75rem] text-ink/35">
              &copy; {new Date().getFullYear()} {STUDIO.name}. {STUDIO.location}.
            </p>
            <p className="micro text-ink/30">GSTIN {STUDIO.gstin}</p>
          </div>
        </div>
      </footer>
    </>
  );
}

/** Kept separate so the hero can be marked priority. */
function HeroImage() {
  return (
    <Image
      src={HERO_IMG.image}
      alt={HERO_IMG.alt}
      fill
      priority
      fetchPriority="high"
      sizes="(max-width: 1024px) 100vw, 42vw"
      style={{ objectPosition: HERO_IMG.focus ?? "50% 50%" }}
      className="object-cover"
    />
  );
}