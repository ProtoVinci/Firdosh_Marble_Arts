# Firdosh Marble Arts — Current Repository Audit & Performance Fix Plan

**Audit date:** 17 October 2026  
**Scope:** Source snapshot supplied as `Firdosh_Marble_Arts(1).zip`  
**Purpose:** Improve client conversion, perceived quality, reliability and real-world performance without inventing business information or making unrelated changes.

> **Current-source rule:** This document is based on the files inside the uploaded ZIP, not a live website inspection or Git history. The source in the ZIP is authoritative for this audit. Re-check the working tree before any edit. Do not assume that a video section, enquiry form, page, or asset exists unless it is found in the current project.

## 1. Executive summary

The project is a one-page Next.js App Router website with Tailwind CSS v4, 25 locally stored work photographs, direct WhatsApp/phone contact links, a mobile contact bar, scroll reveals, a marquee, a works index and an optional PWA/service worker. The implementation is already fairly lean and has several good foundations: server-rendered page content, Next Image responsive sizing, only one priority image, reduced-motion styles, real contact details, and no fabricated testimonials or business statistics.

There are two important caveats:

1. **The reported “hero to videos section” hitch cannot be attributed to a video element in this ZIP.** This archive has no video files and no `<video>` element/component in `src`. After the hero and its “What we do” block, the next distinct section is a moving text marquee, followed by the mandir gallery. `RESHOOT-NOTES.md` says four supplied videos were intentionally left out. If the version running in a browser visibly contains a video section, the live/working project and this ZIP are not the same snapshot. Do not invent video paths or make a speculative video rewrite from this archive.
2. **A plausible source-level scroll bottleneck exists in `ScrollMotion.tsx`.** Its animation-frame safety sweep measured element positions and immediately changed `data-reveal` in the same loop. That read/write pattern can cause repeated style/layout work if several elements are revealed together. This archive includes a minimal, low-risk change that batches geometry reads before applying reveal changes. It is a reasoned fix to a plausible source issue, not proof that it explains every reported hitch; it must still be measured on the actual deployment/device.

There is also a clearly visible content error: the work named `relief-varaha.jpg` was captioned “Lion-headed figure” even though the photograph visibly shows a two-figure narrative relief under carved foliage. The caption and alt text have been changed to a neutral visual description to avoid misidentifying the subject.

### Highest-priority actions

| Priority | Finding | Required action |
|---|---|---|
| P0 | User reports a video-section hitch, but the uploaded snapshot has no video implementation | Verify that the ZIP matches the code currently running. If it does not, export the exact branch/commit before implementing a video-specific fix. |
| P1 | Scroll reveal fallback may interleave layout reads and DOM writes | Batch its reads before writes; included in this patched source. Profile the hero-to-next-section transition in production. |
| P1 | Current performance claims in README are historical, not re-measured here | Treat the old table as historical only; capture a new production baseline on the real host and device. README is annotated accordingly. |
| P1 | `WorksIndex.tsx` updates `mounted` state during render when the active image window advances | Inspect in React Profiler. Refactor only if profiling shows avoidable extra render work or image decode contention; preserve its “nearby frames only” behavior. |
| P1 | Public portfolio title/alt for one relief misdescribes the image | Corrected to “Two-figure narrative relief” with a visual alt description. |
| P1 | `Firdosh_Marble_Arts_Redesign_Plan.md` describes a removed form and a nonexistent component | It is marked as superseded. Use this audit as the current task specification. |
| P2 | Several source photographs contain distracting real-world backgrounds | Review at full size with the owner. Re-crop only when it preserves the work, or request better original photos; never replace them with invented/AI project photos. |
| P2 | Domain/social metadata is incomplete | Add `metadataBase`, a canonical URL and a verified social preview only when the real production domain is confirmed. |

## 2. Repository inventory and file hygiene

### What is actually included

- 72 ZIP entries, approximately 3.4 MB uncompressed.
- Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4.
- Main page: `src/app/page.tsx`.
- Shared styles and design tokens: `src/app/globals.css`.
- Business content and image catalogue: `src/lib/content.ts`.
- Client-side islands: `Header.tsx`, `ScrollMotion.tsx`, `WorksIndex.tsx`, `InstallApp.tsx`, `PwaRegister.tsx`.
- 25 JPG photographs in `public/work/`, approximately 2.86 MiB combined before responsive optimization.
- PWA icons, manifest and `public/sw.js`.
- `README.md`, `RESHOOT-NOTES.md`, a previous redesign brief, `.claude/launch.json`, `startup.bat`, and two maintenance scripts.

### Checks on file placement

- **All 25 photographs in `public/work/` are referenced.** `node prune-images.cjs` reported 25 used and 0 unused. Do not delete any of these photographs as “unused” based on this snapshot.
- No `.env` file, `.git` directory, `node_modules`, `.next`, `dist`, or coverage folder was included in the original ZIP. This is a clean source snapshot rather than a full Git clone.
- Because `.git` is absent, it is **not possible to audit commit history, ignored files, removed secrets, other branches, tags, or GitHub-only files** from this ZIP. The audit covers the snapshot only.
- `.claude/launch.json` contains local dev/prod launch commands and ports 3010/3011; it does not contain a hard-coded machine path. Keep it if those launchers are useful in Claude Code Desktop.
- `startup.bat` is a Windows convenience launcher, not a website runtime dependency. Keep it if the project is developed on Windows; otherwise it is optional.
- `prune-images.cjs` and `scripts/make-icons.cjs` are development utilities, not visitor assets. They are reasonable to keep, but their purpose should remain documented. Do not run a destructive image prune without reviewing its output first.
- `Firdosh_Marble_Arts_Redesign_Plan.md` and `RESHOOT-NOTES.md` are internal project documents, not pages served by this Next.js route tree. They are nevertheless part of the GitHub snapshot and can be read if the repository is public. Decide whether the repository is meant to be public before publishing internal photo-review notes or a business-specific implementation brief.

### Documentation conflict found

The previous redesign brief references `src/components/EnquiryForm.tsx`; **that file does not exist in this archive**. It also speaks as though the form is still part of the current contact journey. The current `page.tsx` already provides direct WhatsApp and phone buttons. The prior brief is therefore not safe to follow as current implementation instructions. It now carries a superseded notice at the top.

The README also mentioned the `.hero-in` animation and a “See the mandirs” hero CTA, neither of which exists in current source. The README has been corrected to describe the current implementation and to label its performance table as historical rather than a verified result for this upload.

## 3. Client point-of-view review

### What is working well already

- The headline identifies marble mandirs and hand-carved stone immediately.
- The hero contains a primary WhatsApp action and a secondary tap-to-call action.
- The business's three broad offerings are surfaced before the portfolio.
- The page gives mandir work a clear lead position, then separates selected carved works and fountains into distinct visual chapters.
- The mobile contact bar keeps Call and WhatsApp one tap away.
- The Contact section repeats the verified phone number and both supplied address descriptions, rather than hiding the contact details behind a form.
- Portfolio alt text is generally descriptive and the image selection is based on supplied photographs.
- No made-up client count, award, testimonial, turnaround time, delivery promise or founding year is presented as fact.

### What still needs a client-centred final pass

1. **Make the next step obvious without adding visual noise.** Keep WhatsApp as the primary action and Call as the secondary action. Do not add another competing CTA such as “Book a consultation” unless the owner confirms that workflow exists.
2. **Make location useful, not just visible.** The addresses are displayed as text; a “Get directions” link can help local visitors once the exact place/search result is confirmed. Do not fabricate map coordinates or link to an unverified pin.
3. **Explain portfolio navigation on touch devices.** The mandir rail relies on horizontal scrolling. Preserve its keyboard/focus access and make sure the “scroll sideways” cue remains readable and doesn't rely only on a hidden scrollbar.
4. **Review the mobile navigation with keyboard and screen reader.** `Header.tsx` sets focus on the first item and makes the page behind the menu inert, but the code does not implement a complete Tab/Shift+Tab focus trap, and the header containing the menu toggle is excluded from the inert group. Verify focus order, Escape behavior, and focus return after a link selection. Fix if the browser/assistive-technology check confirms focus can leave the open menu unexpectedly.
5. **Use real proof, not decorative marketing claims.** The supplied photos show mandirs, carved jali/screens, reliefs, figures and fountains. They do not by themselves prove the scale of full temple-construction contracts. Keep the service wording tied to the business source, and request representative temple-contract photos if the owner wants to market that capability more strongly.
6. **Perform a full-size photo approval.** Thumbnail views hide backgrounds. A number of images include ordinary building or workshop context; that may be authentic, but the owner should approve it. Do not fabricate or AI-generate replacement project photographs.
7. **Keep contact facts centralised.** `src/lib/content.ts` is the source for phone and WhatsApp. Do not paste different phone numbers into individual components. The only verified phone in this ZIP is `+91 99290 00106`.

### Copy / image accuracy correction included

`WORKS` used the title “Lion-headed figure, deep relief” and alt text “Deep-carved marble relief of a lion-headed figure” for `relief-varaha.jpg`. The visible content is a two-figure relief beneath foliage, not a lion-headed figure. The caption is now “Two-figure narrative relief” and the alt text describes the visible carving without guessing the identities of the figures.

## 4. Performance findings

### 4.1 Hero-to-next-section hitch: confirmed scope mismatch

A search of `src/`, `public/`, and the page implementation found no `<video>` usage, video component, `.mp4`, `.webm`, or video poster asset in this ZIP. The `public/work/` folder contains JPG still photographs only. The page sequence in `src/app/page.tsx` is:

1. Hero + “What we do”
2. Animated text marquee
3. Mandirs and temples (feature photo + horizontal rail)
4. Selected works (scroll-aware list + large preview)
5. Fountains
6. Contact

Consequently, do not claim that a video decoder caused the reported lag based on this repository. If the real website contains videos between the hero and mandirs, capture/export the exact current source and assets first.

### 4.2 Source-level scroll sweep: fix included

`src/components/ScrollMotion.tsx` uses one `IntersectionObserver` to reveal elements. It also has an rAF-throttled scroll fallback to reveal elements that an observer might miss after a rapid scroll or restored/anchor position. Before this patch, the fallback loop did the following for each pending element:

- call `getBoundingClientRect()` (geometry/style read);
- if the element qualified, set a `data-reveal` attribute immediately (DOM/style write);
- then read geometry for the next element.

When several elements qualified, this could interleave writes and reads in one animation frame. The updated code collects all qualifying elements in an array first, then writes reveal states in a separate loop. This minimizes forced repeated style/layout calculations without removing the existing observer, reduced-motion support, or fallback safety net.

**What this patch does not prove:** It doesn't prove the scroll hitch is gone on the user's device, nor does it solve a video implementation that is absent from the ZIP. Validate it in production using Chrome DevTools Performance and check whether dropped frames or “Recalculate Style / Layout” work decreases during a repeatable scroll.

### 4.3 `WorksIndex.tsx`: potential secondary rendering cost

`WorksIndex` watches 12 rows, changes a preview image as the visitor scrolls/hover/focuses, and retains the active frame plus nearby frames. This “load only near the active image” strategy is sensible and helps avoid downloading all 12 images immediately.

Two details need profile-based review:

- The component calls `setMounted()` during render if its desired active-frame window is not mounted. React may rerun that component before commit for those state changes. This is not proof of a bug, but it is a render-phase state update worth revisiting if React Profiler shows repeated extra render passes during row changes.
- Each newly mounted image may need a network request, decode and paint. On lower-powered devices, inspect the moment the preview changes before reducing the image quality or removing the index interaction.

Do **not** eagerly mount all 12 images as a “fix”. The component comments and structure intentionally prevent a burst of requests.

### 4.4 Next/Image optimizer and source images

The website uses `next/image`, `quality={68}`, responsive `sizes`, `priority` on the hero, and a WebP-only optimizer configuration. That's a reasonable base. The 25 original JPEGs total about 2.86 MiB, with the largest source around 257 KiB; not every image loads on the first screen, and Next can request smaller WebP candidates.

On a self-hosted/small-CPU production server, the first request for a new optimized image size can involve encoding work. However, the code alone does not prove that this is the cause. Confirm with the Network panel and the server CPU/latency before changing the strategy.

Only if profiling shows image optimization is a bottleneck:

1. Compare the initial request to `/_next/image?...` with the returned image's bytes and response time.
2. Consider pre-generating responsive WebP variants at the widths actually used, then serving those static assets or using an image CDN. Keep responsive sizing and caching; don't blindly set every image to eager/unoptimized.
3. Retest cold and warm cache, mobile data conditions, the hero LCP image and the `WorksIndex` image changes.

### 4.5 Run production, not only development

`npm run dev` includes developer tooling and can feel slower than a production build. Compare using:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run start
```

If the website is run locally on Windows, check whether it is stored inside OneDrive/a continuously synced folder. `node_modules` and `.next` file churn can slow builds and hot reload. This is a workflow condition to test—not a proven cause.

### 4.6 Service worker / stale cache

`public/sw.js` uses network-first navigation and stale-while-revalidate for work images and Next image optimizer URLs. That can make repeat visits feel fast, but the first return after a deployment may briefly show an old cached image while a refresh happens in the background. Its cache version is `v1`.

Do not remove the PWA/service worker solely because the site is laggy. After changing service-worker behavior or replacing assets at stable URLs, test a returning visitor with an old cache and confirm the updated site is used. Consider a cache-version bump only when the change requires existing caches to be discarded.

### 4.7 Motion / CSS review

Current motion features include scroll reveals, a CSS marquee, hover scale on images, transitions on the header/mobile menu, and opacity changes in the works preview. Motion is not automatically bad, and much of this code animates opacity/transform. The cumulative effect still needs a real device test. Keep `prefers-reduced-motion` support and never hide core contact content behind a long animation.

Do not add `content-visibility: auto` to a parent of `[data-reveal]` elements without reworking and testing the observer. The existing stylesheet warns this broke reveal observation in prior experiments.

## 5. Metadata, accessibility and trust checks

- `src/app/layout.tsx` sets title, description, keywords, Open Graph basics, language and viewport settings.
- `metadataBase` and `og:image` are intentionally absent because the real production domain is not supplied in the archive. Add them only after the owner confirms the domain and the chosen social preview.
- No standalone `robots.ts` or `sitemap.ts` exists in the snapshot. These can be added once the production domain and indexation needs are known; don't invent a canonical URL.
- The current direct-contact implementation is correct: `WHATSAPP_HREF` opens a prefilled draft, but the visitor must press Send. Never claim that clicking the link automatically sends an enquiry.
- Check contrast for text on photographs, keyboard focus, menu focus order, 200% zoom, reduced motion, horizontal overflow, safe-area padding and touch targets on a real phone.
- Confirm the phone number, addresses and GSTIN with the owner before deployment. The code has only one trusted phone number; don't guess the incomplete secondary number discussed in internal notes.

## 6. Phase-by-phase implementation plan

Each phase is intentionally scoped. Do not start the next phase until the current phase passes its gate. Stop and ask for clarification if a required fact or the exact current source is missing.

### Phase 0 — Establish a reliable baseline

**Primary files:** none; inspection only.

1. Verify the running branch/repository matches this ZIP. If a video section exists in the running site, reconcile the code snapshot before editing.
2. Record Node/npm versions, OS, browser, test device and whether the baseline is development or production.
3. Install from lockfile; run typecheck, lint and production build.
4. Record a cold-load and warm-load trace, then repeat the exact scroll from hero to the following section 5 times.
5. Save a baseline for LCP, CLS, INP (where measurable), image request count/bytes, dropped frames, long tasks and style/layout time.

**Gate:** A build/test baseline is recorded; any existing failure is separated from changes planned below.

### Phase 1 — Confirm the project truth and remove documentation ambiguity

**Primary files:** `README.md`, `Firdosh_Marble_Arts_Redesign_Plan.md`, `WEBSITE_AUDIT_AND_PERFORMANCE_FIX.md`.

1. Treat the current source as the implementation truth and the older redesign brief as historical only.
2. Keep every business claim grounded in `src/lib/content.ts`, owner-approved copy or actual supplied images.
3. If the target version does contain a video section, use the ZIP from that exact version and locate every video source and mount point before diagnosing.

**Gate:** Claude Code can identify exactly which files and sections exist and does not plan work against missing components.

### Phase 2 — Fix confirmed content inaccuracies

**Primary file:** `src/lib/content.ts`.

1. Retain the neutral, corrected description for the two-figure relief.
2. Review all image titles and alt text against the actual photographs at full size.
3. Do not guess religious/historical figures, installation location, customer identity or project outcome from a filename.

**Gate:** Portfolio names describe visible work accurately; no new unsupported claims are added.

### Phase 3 — Apply and validate the scroll safety-sweep patch

**Primary file:** `src/components/ScrollMotion.tsx`.

1. Keep geometry reads batched ahead of the reveal-state writes.
2. Keep the one observer, reduced-motion handling, off-screen marquee pause and fallback safety behavior.
3. Profile the same scroll transition in production before and after the patch.
4. Remove this fallback only if trace evidence supports it and an equivalent tested strategy covers fast scroll, restored scroll positions and anchor jumps.

**Gate:** No regression in reveal visibility; no content remains blank after fast scrolling or anchor navigation; the repeatable trace shows no increased layout work.

### Phase 4 — Diagnose media/section jank with evidence

**Primary files depend on evidence:** `src/components/Frames.tsx`, `src/components/WorksIndex.tsx`, `src/components/ScrollMotion.tsx`, `next.config.ts`, or the actual video component if it exists in the matched repository.

1. Use the DevTools Performance recording to identify long tasks, dropped frames, layout/recalculate-style work, image decoding, and video decode/network work.
2. If the actual section uses video, prefer a poster-first strategy and defer download/play until near the viewport. Avoid mounting/playing every video immediately. Respect reduced-motion and data-saving expectations; use user-controlled playback for content visitors need to inspect.
3. If `/_next/image` dominates, measure optimizer response time before considering static responsive variants/CDN.
4. If the works index dominates, profile its render-phase `setMounted` update and image decode cost. Keep nearby-image mounting; do not preload all 12 preview images.
5. Do one performance change at a time, record the result and keep it only if it helps without changing UX.

**Gate:** A measured cause is linked to each performance change. No guess-based `will-change`, global GPU promotion or eager-loading sweep.

### Phase 5 — Client journey and responsive quality

**Primary files:** `src/app/page.tsx`, `src/components/Header.tsx`, `src/components/ContactBar.tsx`, `src/components/Frames.tsx`, `src/components/WorksIndex.tsx`, `src/app/globals.css`.

1. Keep direct WhatsApp/call as the primary contact routes. Keep their number/link sourced from `src/lib/content.ts`.
2. Verify tap targets, text reflow, touch rail behavior, image crops, section hierarchy and fixed contact-bar spacing at narrow mobile, standard mobile, tablet and desktop widths.
3. Fix mobile-menu keyboard focus behavior if testing confirms focus can escape the open menu; do not make the page behind interactive while the overlay is open.
4. Verify horizontal scrolling can be reached without a mouse and the page itself has no accidental horizontal overflow.
5. Do not introduce testimonials, ratings, reviews, prices, service promises, process steps or project outcomes without owner-supplied evidence.

**Gate:** A new client can identify the business, understand the real offerings, inspect work and contact the owner directly without entering a form.

### Phase 6 — SEO and local trust polish

**Primary files:** `src/app/layout.tsx`, optionally `src/app/robots.ts`, `src/app/sitemap.ts`, `src/lib/content.ts`.

1. Ask the owner for the exact production domain before defining `metadataBase`, canonical URLs, sitemap URLs or share links.
2. Add a social preview using an approved real project photo and meaningful crop once that image is approved.
3. Add a directions link only after confirming the target address/search result. Never invent coordinates.
4. Recheck all visible business contact details and all portfolio alts.

**Gate:** URLs and public business identity are verified; no dummy domain or made-up local-business schema data exists.

### Phase 7 — Project hygiene and release checks

**Primary files:** `package.json`, `package-lock.json`, `.gitignore`, documentation only when needed.

1. Keep dependencies minimal; add no animation or media framework without demonstrated need.
2. Keep `node_modules`, `.next`, build output, local environment values and OS files out of GitHub.
3. Decide whether internal photo-review notes and older design briefs belong in a public repository.
4. Run `node prune-images.cjs` without `--apply` first. All 25 current photos are referenced, so no image deletion is justified by this audit.
5. Run typecheck, lint and production build after source changes; then test the production server, links, console, mobile navigation, PWA cache behavior and all contact actions.

**Gate:** Clean build/tests, no broken image/contact links, no new console errors, no unreviewed asset deletions.

## 7. How to implement a real video-section optimization if the correct repository includes videos

The current ZIP does not, so this is a conditional rule for the matched code version—not an instruction to add video files now.

- For videos that are editorial content, show a real poster frame and a clear play control; do not autoplay sound or make the content inaccessible without motion.
- For decorative loops only, use an appropriately sized muted/inline source with an explicit poster and defer actual source download until near the viewport. Pause when off-screen and respect `prefers-reduced-motion`; provide a static fallback.
- Do not use full-resolution 4K clips, remote stock footage, or multiple eager-loading background videos.
- Do not load video files for a section far below the fold merely because the page rendered.
- Record network bytes and decode/render activity before and after. Avoid implementing an elaborate custom player unless controls genuinely need it.

## 8. Strict negative prompt for Claude Code

Paste this before the task begins:

> **Do not do any of the following:**
>
> - Do not invent videos, components, pages, APIs, files, business details, contact numbers, domain names, testimonials, awards, prices, opening hours, project names, shipping claims or customer outcomes.
> - Do not claim the uploaded project contains a video section. Search the current working tree first. This ZIP has no video implementation; if the running site differs, stop and request the exact current source rather than guessing.
> - Do not recreate, replace or delete files based on the older `Firdosh_Marble_Arts_Redesign_Plan.md` without checking they exist. That brief is superseded and refers to a removed `EnquiryForm.tsx`.
> - Do not rewrite the whole site, change frameworks, move routes, add dependencies, add animation/player libraries, create a backend, add analytics, or redesign unrelated components without evidence and explicit scope.
> - Do not add stock or AI-generated marble photos to represent real client work. Do not identify the people/figures in a relief unless the owner verifies their identities.
> - Do not remove the PWA/service worker, Next Image optimization, reveal observer, responsive sizing or reduced-motion handling merely because performance is suspected. Measure first.
> - Do not set every image to `priority`, eager, or unoptimized. Do not add `will-change` to large areas or use `content-visibility: auto` around observed reveal targets without a verified reason.
> - Do not “fix” a performance issue by hiding content, removing portfolio images, lowering everything to visibly poor quality, or deleting features without measurement.
> - Do not change the known phone or WhatsApp helper. WhatsApp must remain a user-initiated chat; never say the message sends automatically.
> - Do not perform destructive cleanup based only on filename guesses. Run the asset audit without `--apply` first and inspect the output.
> - Do not say a build, Lighthouse audit, browser test, or performance measurement passed unless you actually ran it and can report the result.
> - Do not bundle unrelated formatting changes or edit business copy outside the requested scope.

## 9. Master task instruction for Claude Code Desktop

```text
Read WEBSITE_AUDIT_AND_PERFORMANCE_FIX.md fully before editing. Treat it as the current source-grounded task specification. First inspect the actual working tree and confirm it matches the snapshot described in the audit. Do not assume any missing file or video component exists.

Work one phase at a time in the documented order. For each phase:
1. State the exact issue and file(s) to be changed.
2. Gather evidence before a performance change.
3. Make the smallest change that addresses the issue.
4. Run the most relevant checks available.
5. Report changed files, what changed, commands run, actual results and anything not verified.
6. Stop at the phase gate and do not start the next phase if it fails.

Do not invent facts or make unrelated UI changes. Do not claim tests passed unless they ran. If the live site visibly contains a video section but the current working tree does not, stop before editing and ask for the matching source/assets.

Start with Phase 0 only. Do not begin broad redesign or refactoring until the baseline and source mismatch have been resolved.
```

## 10. Validation notes for this audit bundle

Checks completed against the extracted source:

- `node --check` passed for `prune-images.cjs`, `scripts/make-icons.cjs`, and `public/sw.js`.
- `package.json` and `.claude/launch.json` parsed as valid JSON.
- `node prune-images.cjs` reported **25 used, 0 unused** images.
- Source search found no video element/component or video asset in the submitted archive.
- The ZIP did not include `.git`, so history-level repository checks were not possible.

**Not verified in this environment:** `npm run typecheck`, `npm run lint`, `npm run build`, browser rendering, Lighthouse/Core Web Vitals and live-device frame timing. `npm ci` could not finish because package registry requests failed with a DNS/network `EAI_AGAIN` error in this execution environment. Run the commands in Phase 0 locally where dependency installation is available before deploying the patch.

This audit includes a small scroll-sweep read/write batching change and a correction to one public portfolio caption/alt. It is not a claim that a complete redesign or the video-specific performance issue has been fixed; the video-specific path is absent from this uploaded snapshot.
