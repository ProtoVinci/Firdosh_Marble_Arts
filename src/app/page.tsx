import Image from "next/image";
import { ContactBar } from "@/components/ContactBar";
import { Feature, Rail, Trio } from "@/components/Frames";
import { Header } from "@/components/Header";
import { InstallApp } from "@/components/InstallApp";
import { Marquee } from "@/components/Marquee";
import { Mark } from "@/components/Mark";
import { ScrollMotion } from "@/components/ScrollMotion";
import { WorksIndex } from "@/components/WorksIndex";
import {
  FOUNTAINS,
  HERO,
  MANDIRS,
  MARQUEE,
  NAV,
  PHONE_HREF,
  STUDIO,
  TRADE,
  WHATSAPP_HREF,
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

const PHONE = STUDIO.phones[0];

export default function Page() {
  return (
    <>
      <ScrollMotion />
      <Header />
      <ContactBar />

      <main id="top">
        {/* ---------------------------------------------------------- Hero */}
        <section className="relative pt-[6rem] lg:pt-[8.5rem]">
          <div className={`${SHELL} grid gap-y-10 lg:items-center lg:grid-cols-12 lg:gap-x-10`}>
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-clay" />
                <span className="micro text-ink/65">{HERO.eyebrow}</span>
              </div>

              <h1 className="display mt-7 text-[clamp(2.6rem,8.4vw,5.5rem)] lg:text-hero">
                Marble mandirs and{" "}
                <em className="font-normal italic text-clay">
                  <span className="whitespace-nowrap">hand-carved</span> stone.
                </em>
              </h1>

              <p className="mt-8 max-w-[40ch] text-lead leading-[1.45] text-umber">
                {HERO.lead}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid"
                >
                  Chat on WhatsApp
                  <span aria-hidden className="btn-arrow">
                    &rarr;
                  </span>
                </a>
                <a href={PHONE_HREF} className="btn btn-line">
                  Call {PHONE}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              {/* The LCP image: no reveal, it paints with the first frame. */}
              <figure className="relative">
                <div className="media relative aspect-4/5 w-full overflow-hidden bg-shell">
                  <HeroImage />
                </div>
              </figure>
            </div>
          </div>

          {/* The three lines of business, straight under the fold, so a
              visitor knows what the workshop does before scrolling into
              the photographs. */}
          <div className={`${SHELL} mt-14 lg:mt-24`}>
            <div className="rule" />
            <h2 className="micro pt-8 text-ink/65">What we do</h2>
            <ul className="mt-8 grid gap-y-8 sm:grid-cols-3 sm:gap-x-10">
              {TRADE.map((item, i) => (
                <li
                  key={item.title}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                >
                  <span className="numeral text-[1.5rem] text-clay">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-2 text-[1.5rem] leading-tight">{item.title}</h3>
                  <p className="mt-2 max-w-[34ch] text-[0.9375rem] leading-relaxed text-umber">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------- Marquee */}
        <section aria-hidden className="mt-14 border-y border-ink/12 py-5 lg:mt-24">
          <Marquee
            items={MARQUEE}
            duration={55}
            itemClassName="display text-[1.75rem] italic text-ink/80 sm:text-[2.25rem]"
          />
        </section>

        {/* ------------------------------------------------- Mandirs (dark) */}
        <section
          id="mandirs"
          className="on-dark scroll-mt-24 bg-ink pt-16 pb-16 text-bone lg:pt-32 lg:pb-32"
        >
          <div className={SHELL}>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <span className="micro text-bone/60" data-reveal>
                  Mandirs &amp; temples
                </span>
                <h2 className="display mt-5 text-display" data-reveal>
                  Temple work
                  <br />
                  <em className="font-normal italic text-sand">in white marble.</em>
                </h2>
              </div>
              <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-bone/70" data-reveal>
                Freestanding mandirs, temple facades, jali screens and carved
                arches. Scroll sideways for more.
              </p>
            </div>
          </div>

          <div className="mt-10 lg:mt-20">
            <Feature item={FEATURE_IMG} ratio="3 / 2" />
          </div>

          <div className="mt-5">
            <Rail items={RAIL_MANDIRS} label="More mandirs and temple work" />
          </div>
        </section>

        {/* ------------------------------------------- Selected works (light) */}
        <section id="works" className="scroll-mt-24 bg-bone py-16 lg:py-36">
          <div className={SHELL}>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <span className="micro text-ink/65" data-reveal>
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
              <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-umber" data-reveal>
                Twelve carved pieces — mandirs, jali screens, reliefs and
                figures. Move down the list to see each one.
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
                <span className="micro text-ink/65" data-reveal>
                  Water features
                </span>
                <h2 className="display mt-5 text-title" data-reveal>
                  Marble
                  <br />
                  <em className="font-normal italic">fountains.</em>
                </h2>
              </div>
              <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-umber" data-reveal>
                A tiered pavilion fountain, a fountain with carved fish around
                its pool, and an inlaid wall fountain.
              </p>
            </div>

            <div className="mt-10 lg:mt-16">
              <Trio items={FOUNTAINS} />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- Contact */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          className="on-dark relative scroll-mt-[4.5rem] bg-ink py-16 text-bone lg:py-32"
        >
          {/* Older links and the installed app's shortcuts point at these. */}
          <span id="enquire" aria-hidden className="absolute top-0 scroll-mt-[4.5rem]" />
          <span id="visit" aria-hidden className="absolute top-0 scroll-mt-[4.5rem]" />

          <div className={SHELL}>
            <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
              <div className="lg:col-span-7">
                <span className="micro text-bone/60" data-reveal>
                  Contact
                </span>
                <h2 id="contact-title" className="display mt-5 text-display" data-reveal>
                  Contact
                  <br />
                  <em className="font-normal italic text-sand">{STUDIO.name}.</em>
                </h2>
                <p className="mt-8 max-w-[42ch] text-lead leading-[1.5] text-bone/75" data-reveal>
                  Call or message us about marble supply, handcraft items or
                  temple work.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" data-reveal>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-solid-light"
                  >
                    Chat on WhatsApp
                    <span aria-hidden className="btn-arrow">
                      &rarr;
                    </span>
                  </a>
                  <a href={PHONE_HREF} className="btn btn-line-light">
                    Call {PHONE}
                  </a>
                </div>
                <p className="mt-5 max-w-[48ch] text-[0.875rem] leading-relaxed text-bone/60" data-reveal>
                  WhatsApp opens with a short greeting already typed. You can
                  change it, add photographs of your site, and press Send when
                  you are ready.
                </p>
              </div>

              <div className="lg:col-span-5 lg:pt-4">
                <dl className="grid gap-y-8 border-t border-bone/15 pt-8">
                  <div data-reveal>
                    <dt className="micro text-bone/60">Phone &amp; WhatsApp</dt>
                    <dd className="mt-3">
                      <a href={PHONE_HREF} className="link-draw text-[1.25rem] text-bone">
                        {PHONE}
                      </a>
                    </dd>
                  </div>
                  <div data-reveal style={{ "--reveal-delay": "70ms" } as React.CSSProperties}>
                    <dt className="micro text-bone/60">Residence</dt>
                    <dd className="mt-3 leading-relaxed">
                      <address className="not-italic text-bone/85">
                        {STUDIO.residence}
                        <br />
                        {STUDIO.district}
                      </address>
                    </dd>
                  </div>
                  <div data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
                    <dt className="micro text-bone/60">Godown &amp; marble supply</dt>
                    <dd className="mt-3 leading-relaxed">
                      <address className="not-italic text-bone/85">
                        {STUDIO.godown}
                        <br />
                        {STUDIO.district}
                      </address>
                    </dd>
                  </div>
                  <div data-reveal style={{ "--reveal-delay": "210ms" } as React.CSSProperties}>
                    <dt className="micro text-bone/60">GSTIN</dt>
                    <dd className="mt-3 text-[0.9375rem] tracking-[0.06em] text-bone/85 tabular-nums">
                      {STUDIO.gstin}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------------------------------ Footer */}
      {/* Bottom padding clears the fixed contact bar below `lg`. */}
      <footer className="bg-bone pt-12 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pt-16 lg:pb-0">
        <div className={`${SHELL} pb-12`}>
          <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-8">
            <div className="flex items-center gap-2.5">
              <Mark className="h-7 w-7 text-clay" />
              <span className="flex flex-col leading-none">
                <span className="font-[family-name:var(--font-display)] text-lg">
                  {STUDIO.name}
                </span>
                <span className="mt-1.5 max-w-[44ch] text-[0.8125rem] leading-snug text-ink/65">
                  {STUDIO.tagline}
                </span>
              </span>
            </div>

            <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="micro link-draw py-2 text-ink/70 hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="rule mt-10" />
          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <p className="text-[0.8125rem] text-ink/65">
              &copy; {new Date().getFullYear()} {STUDIO.name}. {STUDIO.location}.
            </p>
            <p className="text-[0.8125rem] text-ink/65 tabular-nums">GSTIN {STUDIO.gstin}</p>
          </div>
          <InstallApp className="mt-4 text-ink/65 hover:text-ink" />
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
      quality={68}
      priority
      fetchPriority="high"
      sizes="(max-width: 1024px) 100vw, 42vw"
      style={{ objectPosition: HERO_IMG.focus ?? "50% 50%" }}
      className="object-cover"
    />
  );
}
