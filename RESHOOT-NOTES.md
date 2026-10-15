# Photo brief — Firdosh Marble Arts

## What we were given

131 photographs arrived in `new_material` on 15 October, plus 4 videos (which
were ignored — the client has not asked for video).

They were not usable as a drop. After processing:

| | |
|---|---|
| Files received | 131 |
| Exact duplicates removed | 11 |
| Unique frames | 120 |
| **Rejected on visual review** | **~20** |
| **Published** | **25** |

### Duplicates

Matching on file size found some. Perceptual hashing (dHash) found the rest —
several frames had been re-sent at different sizes under different names. One
mandir was in the set **three times**; a second pair appeared twice each.

Run `node prune-images.cjs` in `site/` to audit what the site actually
references.

### Rejected, and why

Nothing was rejected for being an ordinary photo. These were excluded because
they undercut the work:

- **Instagram and WhatsApp UI chrome** still visible in frame — status bars,
  reaction rows, share buttons, "reply" bars.
- **Watermarks** across the image.
- **Blue tarpaulin and construction scaffolding** behind otherwise good pieces.
- **Floor debris** — stone chips, offcuts and tools in shot.
- **Work in progress** with a hand or mallet in frame.
- **Cropped so tight** the subject was unreadable.
- **Soft or low-resolution** where a better frame existed.

### Trimmed before use

Three arrived as phone screenshots with black letterbox bars. Those were
detected and trimmed programmatically, then put through the same warm-stone
grade as the existing set so all 25 read as one body of work.

---

## What is on the site now

| Chapter | Count | Notes |
|---|---|---|
| Hero | 1 | Mandir with jali screens at dusk |
| Mandirs & temples | 10 | One wide feature, then a rail |
| Selected works | 12 | Numbered index, one large sticky preview |
| Courtyard fountains | 3 | Deliberately cut back from the original set |

### Cut after a full-size review

`mandir-studio` was removed. It has orange paint scribbled across the stone, and
no crop can hide it. Its place in the mandir rail is now `mandir-backlit` — a
pierced Om panel lit from behind.

Four more were salvaged by cropping the edges, where all the damage was:
`mandir-outdoor` (stacked timber), `mandir-treelife` (blurred foreground
object), `mandir-peacock` (workshop clutter) and `kiosk-outdoor` (scaffolding).

**Please judge photographs at full size before sending them.** Every one of
those five looked acceptable as a thumbnail.

---

## Still needed

The new material moved the site much closer to the right story, but these gaps
remain.

### 1. Temple contracting is now the flagship — and still under-photographed

The site leads with temple work because it is what the client actually does,
and their invoice says *"All Kinds of Marble Suppliers, Handcraft Items &
Temple Contractor"*. Nine mandirs is good. What is missing is the **other**
half of that line:

- A full temple under construction, shot from scaffold height
- A temple **interior** — sanctum, dome from inside, ceiling carving
- A **statue** — any Ganesh, Krishna, Nandi or Tulsi figure in the round
- A **plinth, samadhi or jaali-heavy exterior facade**
- One shot with the **client's own people** working on a mandir

None of the photos supplied show a statue, and the material read "mandir" to
us as a domestic or temple installation rather than a full construction
contract.

### 2. The people are still missing

Across 131 photographs there is not one clear portrait of an artisan at work.
For a business whose entire claim is hand-carving, that is the single biggest
remaining gap. One good photograph of hands and chisel on stone would do more
than any further catalogue shot.

### 3. Neutral-background product shots

Several pieces are photographed in rooms with bedsheets, curtains and ceiling
fans behind them. It proves the work is installed, which is genuinely useful —
but a clean sweep-background shot of the same piece would sell better and could
be used at any size.

### 4. Consistent lighting

The new drop mixes overcast daylight, warm interior lighting and direct
midday sun. The grade pulls them together but cannot fix it. Overcast or early
morning for the next batch.

---

## How to shoot the next batch

- **Landscape 3:2** for features, **vertical 4:5** for rails, **1:1** for detail.
  The site has fixed frames for each; matching them means nothing gets cropped.
- Avoid: overhead power lines, green mesh fence, blue paint, brick, scaffolding,
  tarpaulin, floor debris.
- Send originals, not WhatsApp forwards. WhatsApp re-compresses to ~100 KB and
  the softness is baked in — several frames in this drop are unusable for that
  reason alone.
- One photo, one subject. Do not send a contact sheet.

---

## Confirm before launch

Taken from the client's GST invoice and identity documents:

- **Business name** — Firdosh Marble Arts ✅
- **Address** — Near Minara Masjid, Makrana 341505; godown Near Gurudwara,
  Bye Pass Road, Makrana 341505; Dist. Didwana–Kuchaman, Rajasthan ✅
- **Phone** — +91 99290 00106 ✅. The invoice also lists a second number that is
  cut off after 9 digits; get the full 10.
- **GSTIN** — 08QEMPK2026C1ZF ✅ (shown in the footer)
- **Owner** — Kalamuddin ✅

Still guessed by me, please correct:

- **`metadataBase`** is deliberately absent — see the comment in
  `layout.tsx`. Guessing a domain would bake a wrong absolute URL into every
  share card. Add it once the real domain is known.
- **No email anywhere on the site**, because none was supplied. Add one to
  `STUDIO` in `src/lib/content.ts` and wire it into `Header` and the enquiry
  block.
- **No founding year, no client count, no award claims.** Deliberately omitted.