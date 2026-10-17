# Firdosh Marble Arts

One-page marketing site for a Makrana marble supplier, handcraft workshop and
temple contractor. Next.js 16 (App Router) + Tailwind v4. No UI libraries.

---

## No invented content

Everything on the page traces to one of two sources:

1. The client's own **GST invoice** — business name, the line
   *"All Kinds of Marble Suppliers, Handcraft Items & Temple Contractor"*,
   both addresses, GSTIN, phone.
2. **The photographs** they supplied — every product description is written
   from what is actually visible in the shots.

Nothing else is asserted. There are no statistics, no testimonials, no
"500+ projects", no turnaround promises, no "we ship overseas", no founding
year. Where a fact was unknown (email, domain, lead times, how many years in
business) it was **left out rather than invented**.

This is enforced by `src/lib/content.ts`, which carries a header comment saying
so. If someone adds a claim, it has to go in that file where it is visible.

Consequences worth knowing about:

- **No FAQ section.** Every answer would have been fiction — lead times,
  shipping policy, maintenance schedules. Cut it rather than ship plausible
  lies.
- **No process section.** The old "six stages, block to basin" was invented
  craft romance. Replaced by *The trade* — the three lines of business that are
  printed on their own invoice.
- **No stone stock list.** Kandassan limestone and travertine were my guesses.
  Replaced by a *Visit* section carrying the real address, godown, phone and
  GSTIN, which is more useful to a Makrana trade buyer anyway.
- **Gallery captions removed.** "Hotel courtyard" and "Resort entrance" were
  fiction; we do not know where these pieces were installed.

---

## Performance

Measured on a production build (`next build && next start`), cold cache:

| | Desktop 1440×900 | Mobile 390×844 |
|---|---|---|
| DOMContentLoaded | ~30 ms | ~23 ms |
| Load | ~122 ms | ~148 ms |
| Initial transfer | ~373 KB (18 requests) | ~314 KB (16 requests) |
| JS | ~144 KB | ~144 KB |
| Fonts + CSS | ~144 KB | ~144 KB |
| Whole page, scrolled | ~654 KB | ~511 KB |
| Image requests, whole page | 12 | 11 |
| Average image size | — | ~20 KB |
| DOM nodes | 492 | 492 |
| Long tasks during full-page scroll | 0 | 0 |
| Horizontal overflow | none | none |

The page carries **25 photographs** and exactly one of them is eager; the other
24 are `loading="lazy"`. Stepping through the works index costs 33–104 KB per
move rather than the 577 KB a single burst would cost — see "Making the index
work" above.

Cumulative layout shift is effectively zero (0.0001) and there are no long
tasks at either size.

Six things were deliberately done to keep it smooth:

1. **The grain is a static `background-image` on `body`,** not a fixed
   overlay. The original used `position: fixed` + `mix-blend-mode: multiply`,
   which forces the compositor to re-blend the entire viewport on every scroll
   frame. That is the single easiest way to make a page stutter.
2. **No `backdrop-filter` on the sticky header.** Blur-on-scroll is expensive on
   mobile GPUs; the header uses a solid background instead.
3. **Fraunces ships without the `SOFT` axis.** Rounding the terminals by ~1% is
   imperceptible at display sizes and keeping the axis out halved the variable
   font from 118 KB to 66 KB. `WONK` is kept — it is visible.
4. **`content-visibility: auto` is deliberately not used** on sections holding
   `[data-reveal]` elements. It starves the IntersectionObserver: the skipped
   subtree reports ratio 0, and because IO only re-fires on threshold crossings,
   the reveal never triggers and the content stays permanently invisible. It is
   commented in `globals.css`. It was tried, it broke the page, it was removed.
5. **`public/work` holds exactly 25 files.** `node prune-images.cjs` reports and
   deletes anything the site no longer references.
6. **`outputFileTracingRoot` and `turbopack.root` are pinned to the project
   folder.** Without them Next walks up to `C:\Users\Parth`, picks up a stray
   `package-lock.json` in the home directory, and prints a warning on every
   build.

### Smoothness pass (latest)

- **Hero paints without waiting for React.** Above-the-fold text uses a CSS
  `animation` (`.hero-in`) and the hero photograph has no reveal at all, so
  the first frame no longer depends on hydration.
- **Image reveals animate `opacity`/`transform` only.** The old `clip-path`
  wipe repainted a full-width photograph on the main thread every frame.
- **Images are WebP, capped at 1080px, quality 68, cached for a year**
  (`next.config.ts`). The default ladder upscaled 700–1000px sources to
  1920px, and AVIF encoding on first request was the slowest thing the
  server did.
- **Works viewer keeps visited frames mounted** and loads two rows ahead, so
  moving up and down the list never flashes blank.
- **Marquees pause while off screen.**
- **No enquiry form.** Contact is direct: every "Chat on WhatsApp" button
  uses `WHATSAPP_HREF` (a `wa.me` link with a short greeting typed in), and
  every call button uses `PHONE_HREF`, both from `src/lib/content.ts`. The
  site never says a message was sent — WhatsApp only opens a draft.
- **Mobile Call / WhatsApp bar** (`ContactBar.tsx`).

Dev mode (`npm run dev`) is always much slower than production; judge speed
on `startup.bat` option 1. Keeping the project inside OneDrive also slows
builds and dev reloads because every `.next` and `node_modules` file is
synced; a folder outside OneDrive (or excluding those two folders) is faster.

### Installable app (PWA)

- `src/app/manifest.ts` — name, colours, standalone display, icons, and two
  home-screen shortcuts (contact, works).
- `public/icons/*` and `src/app/apple-icon.png` — generated from the site
  mark by `node scripts/make-icons.cjs` (re-run it if the mark changes).
- `public/sw.js` — hand-written service worker, no dependency. HTML is
  network-first with a 3.5 s timeout then the saved copy, so the site opens
  on a weak signal or offline; `/_next/static` is cache-first (content-hashed);
  photographs are stale-while-revalidate, capped at 60. **Bump `VERSION` in
  `sw.js` to force every visitor onto fresh caches.**
- `PwaRegister` registers the worker in production only (a worker in `next dev`
  caches stale hot-reload chunks). Test PWA behaviour with `startup.bat`
  option 1; installing needs HTTPS or `localhost`.
- `InstallApp` shows an "Install app" link in the footer and mobile menu when
  the browser offers it, or an Add-to-Home-Screen hint on iOS. It renders
  nothing once installed.
- Mobile: `viewport-fit=cover` with safe-area padding (notches, home bar),
  coarse-pointer hit areas on text
  links, 44 px menu button. Checked for horizontal overflow at 320, 360, 390
  and 768 px.

### Running it

`startup.bat` is the way to run the site on this machine. Double-click it:

- **1 — Production.** Builds once if needed, then serves the optimised output.
  Use this normally.
- **2 — Development.** Live reload while editing.
- **3 — Reinstall dependencies.**

It opens your browser automatically, and stops whatever is already holding
port 3000 before starting, so running it twice does not fail.

Batch files are picky: the file is saved with **CRLF** line endings, because
LF-only endings break `goto` and `set /p`. Keep it that way if you edit it.

---

## Fitting the screen

Two things were wrong with how the page met the window, both found by measuring
rather than eyeballing.

### The dead band on the right

Every section's content edges were already flush and symmetric, so the "space on
the right" was two separate things:

1. **`scrollbar-gutter: stable` reserved a permanent 15 px strip** down the
   right edge. On platforms whose scrollbar floats over the content that strip is
   simply dead. The page is always far taller than the viewport, so the scrollbar
   is always there anyway — `overflow-y: scroll` gives the identical guarantee
   against layout shift without the reserved strip. It is now removed.
2. **The container was capped at `max-w-[110rem]`,** which is 1760 px. On a 2560
   px monitor that left only **69%** of the width in use — 392 px of empty band
   each side, which is what actually read as a gap. The cap is now `156rem`
   (2496 px) and the gutters scale with the viewport.

| Viewport | Width used | Gutter each side |
|---|---|---|
| 1440 | 100% | 0 |
| 1920 | 100% | 0 |
| 2560 | 98% | 24 px |
| 3440 | 73% | 464 px |

3440 still has a band, and that is deliberate: past roughly 2500 px a text
measure stops being readable, and the full-bleed feature image and the rails
already run to the edges of the window.

### The hero headline ran under the photograph

`--text-hero` was `clamp(3.25rem, 12vw, 11.5rem)`. The hero sits in a 7-of-12
column, and at 1440 px the second line, "white marble.", came out 810 px wide
inside a 786 px track — so the italic **marble.** ran underneath the photograph.
It was correct at 1920 and wrong at 1440, which is exactly why it survived.

The clamp is now tied to the column rather than the viewport:
`clamp(2.75rem, 7.6vw, 9.75rem)`. Measured at 390, 768, 1024, 1280, 1366, 1440,
1600, 1920 and 2560, the heading overflows its column by **0 px** at every one,
with a 40 px gap to the photograph from 1020 px up.

`--text-display` came down from 7.2vw to 6.4vw for the same reason — the section
headings share the flex row with a `32ch` paragraph and had no headroom either.

### Mobile

The mobile page was **longer than the desktop one**, 9547 px against 8871 px,
which is backwards. Section padding was doing most of it:

- `py-24` → `py-16` on every section, `pt-24 pb-24` → `pt-16 pb-16` on the dark
  chapter. Desktop keeps `lg:py-32` / `lg:py-36`.
- Hero top padding 7rem → 6rem, and the inter-section margins came down.
- Grid gaps `gap-y-14`/`gap-y-16` → `gap-y-10`/`gap-y-12`.
- Index rows `py-4` → `py-3.5`, and the gap under the mobile preview `mt-10` →
  `mt-8`.
- The hero CTA row went to `gap-x-6` so "See the mandirs" sits beside the button
  instead of wrapping.

Result: **8915 px**, down 632 px, and now shorter than desktop rather than longer.
Average image weight on mobile is ~20 KB because `sizes` hands Next small
candidates.

---

## Twenty-five photographs, three chapters

The client's brief was 20–25 photographs with mandirs and temples leading and
fountains cut back, without the page feeling like a wall of images.

The answer is that **the layout changes between chapters**, so the reader never
meets more than about four photographs at a time:

| Chapter | Layout | Images |
|---|---|---|
| Hero | one portrait plate | 1 |
| Mandirs & temples | dark chapter, one wide feature + horizontal rail | 10 |
| Selected works | numbered index, one large sticky preview | 12 |
| Courtyard fountains | compact three-up, on a `shell` band | 3 |

The techniques doing the work, borrowed from the reference templates:

- **The index, not the grid.** Twelve panels were previously a four-column
  masonry. It was the weakest chapter on the page — twelve competing
  rectangles with no hierarchy, and it read as a product listing. They are now
  a numbered list beside one large sticky preview that changes as you move down
  the list, so only one photograph is ever on screen. This is the Pixello
  project-index pattern and the Sol list-plus-preview pattern.
- **Vary the scale.** One 3:2 feature, then 4:5 rails, then a single large
  preview. Uniform boxes are what make a page feel like a product listing.
- **Rails, not stacks.** A horizontal rail occupies one band, so twenty-five
  photographs do not become a twenty-five-screen page.
- **Alternate the background.** ink → bone → shell → bone → ink. The eye reads
  "new chapter" rather than "more of the same".
- **A text-only chapter** (the three lines of business) sits before the contact
  form, so the page breathes before the conversion point.

`src/components/Frames.tsx` holds three layout primitives — `Feature`, `Rail`,
`Trio` — and `src/components/WorksIndex.tsx` holds the index. All copy and all
image paths live in `src/lib/content.ts`.

### Making the index work

The index has to respond to a mouse, a keyboard and a finger, so three inputs
drive the preview:

- **Pointer hover** — `onMouseEnter` per row.
- **Keyboard** — arrow keys, `Home` and `End` move focus and the preview with
  it; `onFocus` also fires on touch, which covers phones.
- **Scrolling** — an `IntersectionObserver` with a `-45% / -45%` root margin
  picks whichever row crosses the middle band. Without this the preview would
  be dead to a reader who simply scrolls.

`active = hovered ?? focused ?? spied`, so a deliberate hover wins over the
scroll-spy and it resumes when the pointer leaves.

Two things that bit:

- **The stacked frames must not all mount.** All twelve sit in the same
  `absolute inset-0` box, so the browser's lazy-load heuristic counts every one
  as visible and fires twelve requests at once — 577 KB in a single burst.
  Mounting only `active ± 1` drops a step to 33–104 KB while keeping the next
  frame loaded before the crossfade needs it.
- **Mobile titles must wrap.** With the tag inline, 390 px truncated every
  title to "Rosette jali, square fra…". The inline tag is now `sm:block` only;
  the tag is already on the image badge.

---

## The photo drop

131 files arrived in `new_material` (plus 4 videos, which were ignored — the
client has not asked for video). They were not usable as-is:

- **11 were exact duplicates** re-sent under different names, found with a
  perceptual hash rather than by file size. One frame was in the set three times.
- **Around 20 were rejected on sight:** Instagram UI chrome, WhatsApp watermarks,
  construction scaffolding, blue tarpaulin, floor debris, work-in-progress with
  hands and tools in frame, and one image of an Om slab lying in rubble.
- **3 had letterbox bars** from being phone screenshots.

22 survived review and were trimmed and graded into `public/work`, joined by
three of the original fountains. Rejections are listed in `RESHOOT-NOTES.md` so
the client can re-shoot them properly rather than wonder why they are missing.

### A second pass, at full size

The first pass judged thumbnails. Opened one to one, five more were not good
enough and were fixed:

- **`mandir-studio` was cut.** Orange paint scribbled across the stone. No crop
  removes it, so it is gone from the site entirely rather than hidden in a
  small frame.
- **Four were salvaged by cropping.** Scaffolding, stacked timber and a blurred
  foreground object were all at the edges of `mandir-outdoor`, `mandir-treelife`,
  `mandir-peacock` and `kiosk-outdoor`. Cropping them in also improved the
  composition, and `kiosk-outdoor` went from landscape to a 643×1479 portrait
  that suits the index.
- **`mandir-balustrade`** lost 18% off the right edge to take out the building
  site; the result is 820×1000, almost exactly the 4:5 the rail wants.
- **`mandir-studio`'s slot** is now `mandir-backlit` — a pierced Om panel lit
  from behind. It is the strongest frame in the whole drop and it reads
  completely differently from the other nine mandirs, which is exactly what a
  rail needs in the middle.

The rule worth keeping: **judge every photograph at full size before it goes
near the page.** A thumbnail hides scaffolding and hides scribbles.

---

## Run

```bash
npm install
npm run dev
```

```bash
npm run typecheck
npm run lint
npm run build
```

---

## Layout

```
src/
  app/
    layout.tsx      fonts, metadata, colour scheme
    page.tsx        every section, composed server-side
    globals.css     design tokens, type styles, buttons, motion
    icon.svg        favicon
  components/
    Frames.tsx      Feature / Rail / Trio image layouts
    WorksIndex.tsx  numbered works list + sticky preview   (client)
    Header.tsx      sticky nav + mobile overlay        (client)
    ScrollMotion.tsx reveal on scroll, with a scroll sweep fallback (client)
    Marquee.tsx     seamless CSS ticker
    Mark.tsx        logo glyph
  lib/
    content.ts      ALL copy and image paths — the only file to edit for content
public/work/        25 graded photographs
prune-images.cjs    reports/deletes unreferenced images in public/work
startup.bat         double-click to run the site locally (production or dev)
```

---

## Things worth knowing

- **`@theme static`** in `globals.css` is deliberate. Tailwind v4 tree-shakes
  theme variables it cannot see referenced, which silently breaks any
  `var(--text-*)` used from plain CSS. `static` keeps them all emitted.
- **The clip-wipe reveal clips a `.media` child, never the observed element.** A
  `clip-path` on an element drives its IntersectionObserver ratio to 0, so the
  observer never reports it as visible and the reveal never fires.
- **Hidden reveal states are gated behind `.js`**, set by an inline script. If
  scripting fails, the page renders fully visible rather than blank.
- **`ScrollMotion` has two safety nets.** The reveal is a CSS transition, so if the
  compositor never advances it — background tab, throttled renderer, low-end
  device dropping frames — the element would sit at opacity 0 forever. After the
  transition window it verifies and snaps to the end state. Separately, a
  rAF-throttled scroll sweep reveals anything already inside the viewport that
  the observer missed, and detaches itself once nothing is pending. That second
  one exists because IntersectionObserver only reports at rendering
  opportunities, and a fast scroll can outrun it. Neither fires in the happy
  path.
- **`prefers-reduced-motion`** skips reveals entirely.
- **Type scale must track its column, not the viewport.** `--text-hero` sits in a
  7-of-12 grid track. Anything sized in `vw` against the window will overflow
  that track at some widths while looking correct at others.

## Before going live

- **Set the domain.** `metadataBase` is deliberately absent — see the comment in
  `layout.tsx`. Guessing it would bake a wrong absolute URL into every share
  card.
- **Add the second phone number.** The invoice lists one that is cut off after
  9 digits; only `+91 99290 00106` is confirmed.
- **Temple contracting is advertised but unphotographed.** It is on their
  invoice, so the claim is real, but there is not one temple photo on the site.
  Either get those photos or pull the claim — see `RESHOOT-NOTES.md`.
- There is **no email address anywhere on the site** because none was supplied.
  Add one to `STUDIO` in `src/lib/content.ts` and wire it into `Header` and the
  contact section.