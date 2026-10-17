# Firdosh Marble Arts — Website Redesign & Implementation Brief

**Purpose:** Give Claude Code a disciplined, source-grounded plan to make the existing website feel premium, client-focused, polished, and fast—without inventing business facts or making unrelated changes.

**How to use this file:** Open the existing `Firdosh_Marble_Arts-main` project in Claude Code Desktop, paste the **Master Instruction** near the end of this file into the task, and tell Claude Code to follow this document phase by phase. Keep this file in the repository or provide it in the Claude Code conversation as project guidance.

---

## 1. The outcome we want

Redesign the site so a potential customer can quickly understand what Firdosh Marble Arts does, trust the workmanship shown in the real photographs, find the right kind of work for their needs, and contact the business without unnecessary friction.

The finished website should feel:

- **Premium and craft-led:** restrained, confident, carefully composed, and worthy of custom marble work.
- **Client-centric:** visitors can understand services and the next step without decoding poetic copy or filling out a long form.
- **Visually polished:** consistent typography, spacing, alignment, image treatment, interaction states, and page rhythm.
- **Fast and stable:** quick first paint, efficient image loading, smooth scrolling, no avoidable animation or layout jank, and no stale assets after releases.
- **Trustworthy:** use only business facts and images already supported by the project or explicitly confirmed by the owner.
- **Easy to maintain:** small, deliberate changes that fit the current stack and project conventions.

Do not treat “premium” as an excuse to add distracting effects. The goal is confident art direction and effortless usability—not animation for its own sake.

## 2. What the uploaded project actually contains

The archive has been inspected. Use these facts as the starting point, but re-check the working tree before editing.

| Area | What is in the archive |
|---|---|
| Framework | Next.js App Router, React, TypeScript, Tailwind CSS v4 |
| Routes | The inspected project has a main page in `src/app/page.tsx`; no separate `src/app/contact/page.tsx` was found in the archive |
| Business data and copy | `src/lib/content.ts` |
| Main styling | `src/app/globals.css` |
| Shared layout | `src/app/layout.tsx` |
| Header/mobile navigation | `src/components/Header.tsx` |
| Mobile contact strip | `src/components/ContactBar.tsx` |
| Current enquiry interface | `src/components/EnquiryForm.tsx` |
| Work-image layouts | `src/components/Frames.tsx`, `src/components/WorksIndex.tsx` |
| Reveal/motion behavior | `src/components/ScrollMotion.tsx`, `src/components/Marquee.tsx` |
| PWA/service worker | `src/components/PwaRegister.tsx`, `src/components/InstallApp.tsx`, `src/app/manifest.ts`, `public/sw.js` |
| Image assets | 25 files under `public/work/` according to the project README |
| Existing scripts | `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck` |

### Confirmed business details already in the source

The existing `src/lib/content.ts` defines the business name, descriptor, service wording, Makrana location, two address descriptions, GSTIN, and one phone number. The current primary number is **+91 99290 00106**. The code uses a `PHONE_HREF` helper and a `whatsappLink()` helper.

The repository deliberately avoids unsupported claims. Preserve that rule. In particular, do not invent email addresses, office hours, exact map coordinates, project counts, years of experience, awards, customer testimonials, guarantees, shipping coverage, delivery times, stone availability, pricing, or service promises.

### Important clarification about the current form

The code in `src/components/EnquiryForm.tsx` does **not** automatically send a submission to an owner inbox or a backend. It composes the entered details into a WhatsApp message, opens WhatsApp, and asks the visitor to press Send there. The site already has phone and WhatsApp links, but the enquiry form is still a prominent interaction and can feel like an unnecessary step to a customer who simply wants to call or start a WhatsApp chat.

**Desired change:** make direct call and WhatsApp the obvious primary contact paths. Remove the form-driven journey rather than pretending the website can send a WhatsApp message without the user's final action.

### Important clarification about the contact “page”

The archive appears to be a one-page marketing site. Its contact destination is the `#enquire` section of `src/app/page.tsx`, not a separate route. Default to redesigning that section as a finished **Contact Us** destination and update its labels and calls to action consistently. Do not create a second, duplicate contact route solely based on the phrase “contact page.” Create a standalone `/contact` route only if an actual existing route is discovered in the working project or a separate URL is explicitly required.

## 3. Findings and how to treat them

Separate **confirmed source facts** from **issues that must be reproduced**. Do not report a performance bug as proven just because the owner experiences lag.

### A. Confirmed opportunities for improvement

1. **The contact journey asks for too much interaction.** The current form asks for a name, contact detail, work type, stone, dimensions/height, location, timeline, and notes before composing a WhatsApp message. Replace it with direct choices: WhatsApp or phone call.
2. **Conversion language is form-led.** The header, hero, and mobile bottom strip use labels such as “Request a Quote,” “Get a quote,” and “Enquire.” Align them around a simple next step such as “Contact Us,” “Chat on WhatsApp,” or “Call the Workshop,” without sending every visitor into form fields.
3. **The contact destination should answer the basic questions immediately.** Make the verified phone number readable and tappable; show a direct WhatsApp action; state what kinds of enquiries are welcome using only supported business/service content; and show only verified address details.
4. **Motion is spread across multiple components.** The site includes scroll reveals, a scrolling marquee, a changing works preview, mobile-nav transitions, and header scroll state. These may be fine individually, but their cumulative feel must be audited on real devices. Retain only motion that supports comprehension and does not impair access or responsiveness.
5. **The current page is highly art-directed but should be judged from the customer's perspective.** Make sure editorial language and layout do not hide service clarity, real work, direct contact, or the next step.
6. **The contact links and anchors are repeated in several places.** Header, mobile contact bar, main page, and footer all link to contact destinations. Update them together and test every anchor so no CTA points to a stale ID.

### B. Performance concerns to investigate—not assume

The included README documents earlier production-build measurements and many intentional optimizations. These are historical project notes, not proof of the experience on the owner's current device, hosting environment, or current build. Before refactoring performance code, establish a fresh baseline.

Inspect these areas:

- Whether the owner is judging `npm run dev` or a production build. Development mode can feel materially slower; compare against `npm run build` followed by `npm run start`.
- Real production load and scroll behavior on a mid-range mobile device and desktop.
- Image transfer sizes, duplicate requests, hero image loading, image decode timing, and layout shifts.
- Whether there are long tasks or dropped frames during scroll, menu open/close, and works-preview changes.
- Whether the service worker in `public/sw.js` or browser cache is showing stale assets after changes.
- Whether the custom font files, image optimizer, animations, or browser extensions/network conditions are the actual bottleneck.
- Whether all hidden/off-screen UI is still mounting more content or images than needed.

Do not remove the image optimization, service worker, PWA features, or existing motion helpers without profiling and a specific reason. Do not add `content-visibility: auto` to reveal-observed sections; the README explains that this previously prevented some observed content from revealing correctly.

### C. Content and brand safety checks

`src/lib/content.ts`, the existing project README, `RESHOOT-NOTES.md`, the invoice-derived details described there, and the supplied photographs are the current project's content references. Still review the actual visible copy instead of blindly assuming every sentence is approved.

In particular, flag any claim that cannot be tied to a known source. Do not strengthen statements such as “supplied and fitted on site,” inventory, delivery, or installation details unless they are supported by the project source or owner confirmation. Where proof is missing, use restrained factual wording or leave the claim out.

---

## 4. Client-first user journey

Design the page around these questions, in this order:

1. **What is this business?** Make “Firdosh Marble Arts” and its relevant offering understandable immediately.
2. **Is this the kind of work I need?** Present the existing product/service categories clearly, supported by real photographs.
3. **Can I trust the work?** Give the photography room to do the work. Use accurate captions and alt text, consistent image crops, and clear navigation between categories.
4. **What should I do next?** Make WhatsApp and phone contact prominent and consistent.
5. **Where is the business?** Show verified location/address information in a readable format, without inventing opening hours or embedding an unverified map pin.

### Priority order

- **Primary conversion:** Chat on WhatsApp.
- **Secondary conversion:** Call the workshop.
- **Supporting content:** Service categories, selected real work, location and business identifiers.
- **Optional supporting feature:** existing installable-app/PWA UI, but it must never compete visually with the primary contact actions.

A first-time visitor should not be required to enter personal details before seeing the phone number or WhatsApp link.

## 5. Visual design direction

Use the existing design system as the starting point, not as a reason to preserve every current composition. The current palette is based on limestone/bone, shell, sand, ink, and a clay accent; the display face is Fraunces and the supporting face is Inter. Refine these established choices consistently before introducing anything new.

### Desired visual character

- Architectural, quiet, premium, tactile, and contemporary.
- Strong image hierarchy, deliberate negative space, and consistent alignment.
- Crisp reading contrast and a clear heading/body type scale.
- Restrained color usage: background neutrals carry most of the page; use the accent only for focus, links, and important actions.
- Buttons that look obviously tappable, have clear labels, and have consistent sizes and interaction states.
- Responsive layouts that are designed intentionally for mobile instead of simply shrinking the desktop page.

### Avoid

- Excessive gradients, glassmorphism, glowing buttons, random shadows, decorative blobs, noisy textures, fake 3D, or stock “luxury” visuals.
- A generic template look or an unrelated brand identity.
- Parallax, cursor effects, elaborate page transitions, or more looping animations added just to make the site feel premium.
- Inconsistent corner radii, arbitrary card styles, several unrelated accent colors, and excessive uppercase micro-copy.
- Tiny low-contrast labels, unclear icon-only buttons, and poetic headlines that leave customers guessing what the business offers.
- Crops that hide important marble details or unsupported use-case captions such as naming a hotel/resort/customer/project when that fact is not documented.

### Design-system rules

1. Audit `src/app/globals.css` before changing tokens. Reuse existing variables where they work.
2. Define a consistent spacing, typography, border, button, and interaction system; do not add one-off values everywhere.
3. Keep headings readable at every breakpoint and prevent text collisions or overlap with imagery.
4. Maintain visible `:focus-visible` styles, keyboard usability, and reduced-motion support.
5. Make hover, focus, active, disabled, and menu-open states feel intentional and consistent.
6. Check all main sections at mobile widths before signing off.

---

## 6. Contact redesign specification

This is a high-priority requirement, not an optional visual improvement.

### Remove the form-based path

- Remove the form fields and form-specific success/edit state from the main conversion path.
- Stop importing/rendering `EnquiryForm` in the contact section once the direct-contact replacement is working.
- Do not build an API endpoint, database, email workflow, CMS, or new form provider. None is needed for the requested direct-contact approach.
- Remove the form-specific UI strings and unused component/imports only when they are genuinely unused. Avoid unrelated cleanup.

### Required direct actions

**Primary CTA — WhatsApp**

- Use the existing `whatsappLink()` helper from `src/lib/content.ts`; do not duplicate the business number in multiple components.
- Use a short, neutral, pre-filled opening message such as: “Hello, I found Firdosh Marble Arts through your website and would like to enquire about marble work.”
- Use an accessible text label such as **Chat on WhatsApp**.
- If opened in a new tab/window, include the appropriate `target` and `rel` attributes.
- Display the verified phone number nearby so visitors can see which business they are contacting.
- Be truthful that WhatsApp still requires the visitor to press Send inside WhatsApp. Do not label a pre-filled message as already sent.

**Secondary CTA — Phone call**

- Use the existing `PHONE_HREF` helper or the same existing canonical source used to construct it.
- Use a clear label such as **Call the Workshop**.
- Render the number in readable text and make it a `tel:` link, so mobile visitors can tap it and desktop visitors can copy it.

### Contact layout and content

Create a deliberate contact composition—not a blank replacement panel. It should include:

- A clear heading such as **Contact Firdosh Marble Arts**.
- One concise sentence explaining that visitors can call or message about the existing documented categories of marble supply, handcraft work, and temple-related work.
- Two visually clear actions: WhatsApp first, phone second.
- The verified phone number as visible text.
- Verified location/address information already present in `STUDIO`/`FACTS`, arranged for easy scanning and mobile use.
- GSTIN only if it helps the practical trust/contact context; keep it secondary rather than a headline.
- No invented opening hours, email address, response-time promise, map pin, phone number, or additional branch.

Do not make a third-party map embed a requirement. A map link can be considered only if it can be created honestly from the verified address text and provides real user value; never invent latitude/longitude or claim an exact pin is verified.

### Consistency across the site

- Hero primary CTA: guide people to the direct contact destination or directly to WhatsApp; it must no longer promise a form if the form is removed.
- Header desktop CTA: use a contact-focused label and send the visitor to the right destination.
- Mobile sticky contact bar: keep the Call and WhatsApp actions prominent. Replace “Get a quote” with a clear label consistent with the new contact area or a direct WhatsApp action. Ensure the bar does not cover important page content or form controls (there should no longer be enquiry fields).
- Footer: update “Enquire” to “Contact” or equivalent and ensure it points to the correct anchor.
- If renaming `#enquire` to `#contact`, update every internal link together. Either preserve a compatibility anchor or verify that no old `#enquire` link remains. Never leave a broken navigation target.

### Interaction and accessibility

- Both actions must work on mobile and desktop.
- The WhatsApp link must use the correct country-code-first digits via the helper.
- The phone link must use a valid `tel:` value.
- Buttons must have visible focus styles and meaningful text; do not rely on icons alone.
- Do not block the user with an alert, fake submission confirmation, spinner, required fields, or “success” message for a message that has not been sent.

---

## 7. Phase-by-phase implementation plan

Claude Code must complete these phases **in order**. At the end of each phase, verify the changes before proceeding. Do not skip to a later phase because it is more visually interesting. Do not stop after merely writing another plan; implement the work unless an actual blocker makes safe progress impossible.

### Phase 0 — Establish a safe baseline

**Goal:** Know what exists and what is actually slow before touching code.

**Actions:**

1. Read `AGENTS.md`, `README.md`, `RESHOOT-NOTES.md`, `package.json`, `next.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/lib/content.ts`, and all components used by the current page.
2. Follow `AGENTS.md`: this repository calls out version-specific Next.js behavior. If dependencies are installed, read the relevant local Next.js documentation under `node_modules/next/dist/docs/` before changing Next APIs or conventions. Do not rely only on generic training knowledge.
3. Check `git status` first. Never discard or overwrite pre-existing user changes. Do not run destructive cleanup commands against user work.
4. Run existing checks where the environment allows: `npm run typecheck`, `npm run lint`, and `npm run build`. If dependencies are absent, use the lockfile (`npm ci`) only if installation is permitted by the environment and network access; otherwise report the blocker and continue with static inspection.
5. Test a production build (`npm run build` then `npm run start`) rather than judging only `npm run dev`, if the environment supports it.
6. Capture/reference baseline screenshots at 390 px mobile, tablet around 768 px, desktop around 1440 px, and a wide desktop around 1920 px if a browser/screenshot tool is available.
7. Record performance observations: initial image requests, image bytes, layout shift, scroll smoothness, menu open/close behavior, and console errors. Use Lighthouse or browser DevTools only if available; do not install a new test stack without a reason.

**Deliverable for this phase:** a concise baseline inside the Claude Code response: checks that passed/failed, reproducible issues, and issues that could not be verified. Keep it factual.

**Gate:** Do not remove performance code or dependencies before this baseline is established. If a check is unavailable, document it; do not pretend it ran.

### Phase 1 — Lock content facts and the redesign scope

**Goal:** Ensure the redesign is grounded and avoid expanding scope.

**Actions:**

1. Treat `src/lib/content.ts` as the main content source and centralize any necessary changes there instead of scattering repeated business details around components.
2. Inventory every page section and every CTA. Confirm the current page is a one-page site unless the working tree shows otherwise.
3. Audit visible claims against the project sources. Keep only claims supported by current source data or photographs; flag uncertain statements rather than inventing a replacement fact.
4. Keep the current image library. Use only supplied assets unless the owner supplies more. Do not add stock imagery or generate fake marble-project photography.
5. Confirm the verified direct-contact number is the existing `STUDIO.phones[0]`. Do not add a second number or email.
6. Write a small implementation checklist before making visual edits, then proceed to the next phase without asking the user to re-approve already specified requirements.

**Gate:** Contact must be direct; no form or backend requirement. No unsupported business claims or new route by assumption.

### Phase 2 — Establish and apply the visual system

**Goal:** Make the page feel like one coherent premium brand.

**Primary files:** `src/app/globals.css`, `src/app/layout.tsx`, and only the components that need to consume the refined tokens.

**Actions:**

1. Refine the existing palette and typography rather than introducing an unrelated brand. Preserve the stone/ink/clay character unless an evident contrast or hierarchy problem requires a change.
2. Standardize heading sizes, paragraph measure, section spacing, gutters, borders, action styles, and focus states.
3. Review the hero heading and all section headings at the target viewport widths for collisions, orphaned words, excessive line breaks, and overlap with imagery.
4. Set a consistent treatment for real work images: aspect ratios, object positions, neutral placeholders while loading, and responsive sizing.
5. Make interaction states visually consistent; keep the primary action immediately recognizable.
6. Do not add an animation package. Use CSS/React already in the project unless profiling reveals a concrete need.

**Gate:** The page must remain readable with JavaScript disabled where practical, and reduced-motion preferences must not hide content. Do not let visual treatment reduce contrast or conceal the main CTA.

### Phase 3 — Improve home-page hierarchy and client clarity

**Primary file:** `src/app/page.tsx`, plus targeted adjustments to `Header.tsx`, `Frames.tsx`, `WorksIndex.tsx`, and `Marquee.tsx` only where necessary.

**Actions:**

1. Make the first viewport answer what Firdosh Marble Arts does and what the visitor can do next. Keep the brand and actual offering clear; do not rely on the hero photograph or a metaphor alone.
2. Keep verified service categories easy to scan. Use short supporting text and do not make customers read long paragraphs to determine whether the business handles their kind of work.
3. Preserve the supplied portfolio photos and current grouping where it serves the story: temple/mandir work, selected carved work, and fountains. Improve hierarchy and consistency rather than flattening everything into a generic grid.
4. Make image captions descriptive and factual. Write useful alt text for meaningful photographs; use empty alt text only for genuinely decorative images.
5. Ensure a visitor can reach Contact/WhatsApp from the hero and after browsing the portfolio.
6. Remove redundant wording and repeated calls to action where they create noise; do not remove useful business facts.
7. Update navigation labels to reflect the actual sections and use consistent names in the header, mobile menu, and footer.

**Gate:** A visitor unfamiliar with the business must be able to identify its offering quickly; images and captions must not imply unnamed clients, projects, or locations.

### Phase 4 — Replace the enquiry form with direct contact

**Primary files:** `src/app/page.tsx`, `src/components/ContactBar.tsx`, `src/components/Header.tsx`, `src/lib/content.ts` if needed, and `src/components/EnquiryForm.tsx` for removal/cleanup.

**Actions:**

1. Implement the **Contact redesign specification** in Section 6.
2. Remove the input form from the page's normal contact path and remove its dependency from the contact section.
3. Lead with WhatsApp using `whatsappLink()` and provide a clearly visible tap-to-call number using `PHONE_HREF`.
4. Replace form-oriented labels with direct-contact language everywhere: hero, header, mobile contact strip, section heading, and footer.
5. Ensure a user can initiate contact without entering any details on the website.
6. Remove the now-unused form component and related code only if it has no other callers. Avoid broad file cleanup.
7. Check the WhatsApp pre-filled message for correct grammar, a neutral tone, no unsupported promises, and the correct recipient.

**Gate:** The WhatsApp and phone actions work; the form is no longer required or shown; the page never falsely claims that a WhatsApp message was sent. All contact numbers remain sourced from the canonical content helper.

### Phase 5 — Responsiveness and accessibility

**Primary files:** relevant layout/components and `src/app/globals.css`.

**Actions:**

1. Verify layouts at 320, 360, 390, 768, 1024, 1280, 1440, and 1920 px where possible.
2. Eliminate horizontal overflow, clipped headings, images covering text, uneven section gutters, and sticky controls that obscure content.
3. Check touch targets, particularly the bottom contact bar, mobile menu, phone, and WhatsApp actions.
4. Test keyboard navigation through header links, mobile navigation, work index, and contact actions. Ensure a user can open/close the mobile menu and escape it with the keyboard.
5. Verify color contrast, focus visibility, landmark/heading order, descriptive link labels, and accessible image alt text.
6. Respect `prefers-reduced-motion`. Content must remain visible if reveal JavaScript fails or an observer does not fire.
7. Check that anchor navigation does not hide section headings behind the fixed header.

**Gate:** No known overflow or CTA overlap at tested widths; keyboard and reduced-motion behavior are usable. Report untested viewports honestly.

### Phase 6 — Profile and optimize real performance

**Primary files:** touch `next.config.ts`, image components, `ScrollMotion.tsx`, `WorksIndex.tsx`, `Header.tsx`, or `public/sw.js` only when measurement supports the change.

**Actions:**

1. Re-run production tests after the design and contact changes, because the loading profile may have changed.
2. Verify that only the hero/critical above-the-fold image receives priority. Below-the-fold imagery should load efficiently and use appropriate responsive `sizes`.
3. Inspect image output and requests before changing image quality, optimizer formats, device-size settings, or caching.
4. Prefer keeping animations limited to `transform` and `opacity`; remove motion that provides no meaningful usability or brand value if it contributes to observed jank.
5. Confirm scroll reveals never leave content permanently invisible. Confirm marquee animation pauses off-screen if it remains.
6. Keep the number of client components and third-party requests as small as practical. Do not convert the whole page to a client component to solve a local interaction.
7. Inspect service-worker behavior and cache versioning only if a stale-cache issue is reproduced. If `public/sw.js` changes in a way that requires cache invalidation, update its version deliberately and test the first visit, second visit, and post-deploy visit.
8. Compare before/after measurements and describe trade-offs. Do not claim the site is faster without a measurement or a clearly identified code reduction.

**Gate:** Production build still passes. Performance changes are tied to observed causes, not guesswork. No new framework, animation library, image library, or performance plugin has been added without a justified need.

### Phase 7 — Metadata, SEO, and release integrity

**Primary files:** `src/app/layout.tsx`, `src/app/manifest.ts`, `next.config.ts`, and `public/sw.js` only if needed.

**Actions:**

1. Keep the page title and description accurate and descriptive of the real business.
2. Do not set `metadataBase`, canonical URLs, or absolute share-card URLs until the real public domain is confirmed. The current omission is intentional.
3. If the project’s actual deployed URL is provided elsewhere in the working tree and is clearly authoritative, cite that source internally before changing the metadata. If no verified domain exists, leave the absolute URL configuration unfilled and call it out in the final report.
4. Check page language, metadata, social sharing basics, favicon/icons, and PWA metadata for consistency. Do not invent domain or business data to complete a checklist.
5. Keep or adjust the PWA only if the change improves reliability. Do not remove it just because the visual redesign does not need it.

**Gate:** No placeholder domain or made-up metadata is introduced. Offline/cache behavior is not broken by a design-only change.

### Phase 8 — Final verification and handoff

**Actions:**

1. Run `npm run typecheck`, `npm run lint`, and `npm run build` after all implementation changes.
2. If a command fails, inspect whether the failure was introduced by this work. Fix new regressions; do not hide errors or disable lint/type checks to make the build appear green.
3. Test the direct phone and WhatsApp actions, all navigation anchors, mobile menu, gallery/work index behavior, and footer links.
4. Review the finished site at mobile, tablet, desktop, and wide desktop sizes. Check overflow and sticky-control overlap.
5. Test with reduced motion enabled and keyboard-only navigation if tools are available.
6. Check the browser console and network for new errors, broken assets, repeated image requests, and stale service-worker assets.
7. Review the final diff for unexpected edits, generated files, dependency churn, unrelated refactors, or accidentally changed source images.
8. Summarize what changed, which files changed, tests actually run, known limitations, and any factual decision that remains blocked on owner confirmation.

**Gate:** Deliver the implementation, not just a report. Clearly distinguish completed tests from manual checks that still need the owner.

---

## 8. Acceptance criteria

The redesign is complete only when all applicable items below are true:

### Brand, content, and usability

- [ ] The site presents a cohesive premium identity built around the existing marble/craft visual language.
- [ ] The first screen communicates the business and an obvious next step.
- [ ] Work categories are scannable and supported by real supplied images.
- [ ] Copy contains no invented facts, testimonials, project names, guarantees, hours, extra phone numbers, email, prices, or delivery promises.
- [ ] Header, mobile navigation, hero CTAs, contact section, and footer use consistent language.
- [ ] Contact is easy to find without browsing to the bottom of a long page.

### Contact conversion

- [ ] No website form fields are required before a customer can contact the business.
- [ ] The WhatsApp action opens the correct business chat with an optional pre-filled message.
- [ ] The visitor is not told the message has been sent before they press Send in WhatsApp.
- [ ] The phone number is visible and links to a valid `tel:` destination.
- [ ] The number comes from the existing canonical business data/helper instead of being repeated in unrelated components.
- [ ] Mobile contact actions are thumb-friendly and do not cover important content.
- [ ] No form backend, inbox integration, new contact service, or invented email workflow was added.

### Performance and reliability

- [ ] Production build, typecheck, and lint pass—or the exact blocker is reported honestly.
- [ ] There is no new avoidable horizontal overflow or layout shift.
- [ ] Hero image priority and below-the-fold image loading remain sensible.
- [ ] Motion respects reduced-motion preferences and cannot leave important content invisible.
- [ ] No obvious scroll jank, duplicate image burst, or new long task was introduced by the redesign; measure rather than guess when profiling tools are available.
- [ ] Service-worker and PWA behavior remain intact if retained.

### Quality and scope control

- [ ] Only files needed for the requested work were changed.
- [ ] No new dependency was added without a concrete, documented need.
- [ ] No existing user changes were overwritten.
- [ ] Final report states the exact tests that were actually run.

---

## 9. Negative prompt — things Claude Code must NOT do

Treat this section as hard constraints. These are not optional style preferences.

### Do not invent facts or business capabilities

- Do **not** fabricate years of experience, completed-project counts, awards, certifications, famous clients, customer reviews, testimonials, case studies, team biographies, guarantees, or “trusted by” claims.
- Do **not** invent the business owner's name, extra phone numbers, email address, opening hours, response time, price list, minimum order, lead time, shipping regions, export availability, warranties, installation promises, stock availability, or exact service radius.
- Do **not** invent a domain, canonical URL, map coordinates, or a precise business map pin.
- Do **not** assign supplied photos to named hotels, temples, residences, resorts, or clients unless that relationship is explicitly documented.
- Do **not** change the business’s stated service categories into capabilities that are not supported by the source.
- Do **not** claim a WhatsApp message has been delivered when the site has only opened WhatsApp with a pre-filled draft.

### Do not introduce random design work

- Do **not** replace the existing brand with an unrelated theme, logo, palette, or generic template.
- Do **not** add random colors, gradients, glowing effects, glassmorphism, floating blobs, gratuitous shadows, excessive rounded cards, cursor trails, parallax, animated counters, or artificial “luxury” decoration.
- Do **not** add stock images, AI-generated marble/project photos, icon packs, decorative video backgrounds, or remote images to fill space.
- Do **not** add new sections just because a template normally includes them. No invented FAQ, pricing table, statistics section, testimonial wall, process story, blog, team section, newsletter, or lead magnet.
- Do **not** rewrite all copy into vague brand poetry. Clarity to a potential customer is more important than clever phrasing.
- Do **not** flatten the portfolio into a generic product grid if the existing image-led hierarchy is working.

### Do not over-engineer

- Do **not** add a CMS, database, form endpoint, email provider, CRM, analytics package, animation library, UI framework, or new dependency unless the existing project cannot meet a required acceptance criterion and the need is demonstrated.
- Do **not** add a new `/contact` route by assumption; the inspected site is one page. Improve the existing contact destination unless the real working tree or explicit instruction proves that a separate route is required.
- Do **not** redesign the entire site architecture, convert everything to client-rendered React, or create redundant shared abstractions for a small number of components.
- Do **not** rewrite working utilities merely to use a newer coding style.
- Do **not** remove the PWA, service worker, image optimizer, scroll observer, or other performance infrastructure without reproducing a specific problem and explaining the evidence.

### Do not damage performance or accessibility

- Do **not** make every image eager/priority-loaded.
- Do **not** add large client-side libraries to animate simple transitions.
- Do **not** animate layout-heavy properties such as large `clip-path`, width, height, or filter effects continuously without profiling evidence.
- Do **not** hide real content behind JavaScript-only reveal states without a safe visible fallback.
- Do **not** remove keyboard focus indicators, skip/landmark semantics, accessible labels, alt text, or reduced-motion support.
- Do **not** use icons without labels for the primary WhatsApp and phone actions.
- Do **not** leave internal anchors pointing to IDs that no longer exist.
- Do **not** let the fixed mobile contact bar cover content or important controls.

### Do not make unsupported testing claims

- Do **not** say “all tests pass,” “Lighthouse is excellent,” “it is fully responsive,” or “the site is faster” unless the corresponding tests were actually run.
- Do **not** rely on the old README’s measurements as current benchmarks; reproduce them in the current environment if possible.
- Do **not** disable checks, suppress errors, or weaken TypeScript/lint rules to get a green build.
- Do **not** change unrelated files, reformat the whole codebase, rename assets unnecessarily, or delete files simply because they look unused. Verify references first.
- Do **not** overwrite any pre-existing uncommitted work.

---

## 10. Master instruction to paste into Claude Code Desktop

Copy the prompt below into the Claude Code task while this repository is open. Keep this brief available as project context.

> You are working on the existing Firdosh Marble Arts website. Read `Firdosh_Marble_Arts_Redesign_Plan.md` completely before editing and follow it as the implementation spec.
>
> **Your job is to implement the redesign, not merely recommend one. Work through Phases 0–8 in order.** Establish a baseline first, then make small, deliberate changes, verify each phase, and continue to the next phase. Do not skip the baseline or leap directly into a broad rewrite. Do not ask for approval at every phase; proceed when the acceptance gates pass. If a truly necessary business fact is missing, do not guess: use a conservative version that omits the claim and report the unresolved fact in the final handoff.
>
> The highest-priority product change is the contact flow: the inspected site is one page and its current enquiry form builds a pre-filled WhatsApp draft. Replace that form-led experience with direct, prominent WhatsApp and tap-to-call actions. Keep the phone number sourced from the existing content/helper. Never claim the WhatsApp message was sent automatically. Do not build a backend, email workflow, or extra route without a real requirement.
>
> Make the website look premium through hierarchy, spacing, typography, image curation, consistency, responsive layout, and restrained motion—not through random effects. Use the existing visual identity and the supplied local photographs. Keep all content truthful and source-grounded. Read `AGENTS.md` and any relevant local Next.js documentation before using version-sensitive APIs.
>
> **The Negative prompt in Section 9 is binding.** Do not invent business facts, add template sections, add unnecessary libraries, replace images with stock/generated imagery, rewrite unrelated architecture, or make up test results. Profile the lag before making performance changes. Preserve existing user changes and inspect `git status` first.
>
> Finish the actual implementation, then run the available `typecheck`, lint, and production build checks. Test the contact actions and navigation anchors. Review responsive layouts and performance if browser tools are available. If something cannot be tested in this environment, say so plainly instead of claiming success.
>
> In your final response, provide: (1) concise summary of the redesign, (2) files changed and why, (3) checks actually run with pass/fail results, (4) performance observations before/after if measurable, and (5) unresolved factual blockers. Do not report work as complete if a required acceptance criterion is still failing.

---

## 11. Expected final handoff format

Claude Code should finish with a brief report similar to this structure, filled in only with verified results:

1. **What changed:** key UX, visual, contact, and performance improvements.
2. **Contact behavior:** direct WhatsApp destination, tap-to-call destination, and confirmation that no website form/backend remains on the main contact path.
3. **Files changed:** list with a one-line reason per file.
4. **Validation:** exact results from `npm run typecheck`, `npm run lint`, `npm run build`, and any browser/performance checks actually completed.
5. **Limitations:** anything that could not be tested or needs owner confirmation, such as a production domain or any uncertain business claim.
6. **No unverified claims:** do not say “fully optimized,” “perfect on all devices,” or similar unless evidence supports that conclusion.

**Definition of done:** the site feels more considered and client-oriented, a visitor can contact the business immediately without filling out a form, the build remains healthy, the design works across tested screen sizes, and every business claim remains grounded in verified project information.
