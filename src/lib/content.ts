/**
 * Every value in this file is taken from the client's own GST invoice,
 * or is directly visible in the photographs they supplied.
 *
 * Nothing here is invented. Where a detail is unknown (email, domain,
 * lead times, client count) it is deliberately absent rather than filled
 * in with a plausible guess.
 */

export const STUDIO = {
  name: "Firdosh Marble Arts",
  descriptor: "Marble & Handicraft",
  /** Verbatim from the client's invoice header. */
  tagline: "Marble suppliers, handcraft items & temple contractors",
  location: "Makrana, Rajasthan",
  residence: "Near Minara Masjid, Makrana 341505",
  godown: "Near Gurudwara, Bye Pass Road, Makrana 341505",
  district: "Didwana–Kuchaman, Rajasthan",
  gstin: "08QEMPK2026C1ZF",
  phones: ["+91 99290 00106"],
} as const;

export const HERO = {
  eyebrow: "Makrana · Rajasthan",
  lead: "Marble suppliers, handcraft items and temple contractors. Mandirs, jali screens, fountains and carved figures.",
} as const;

/** `focus` is an object-position hint for sources taller than their frame. */
type Framed = { image: string; alt: string; focus?: string };

/**
 * 25 photographs across three chapters. Each chapter uses a different
 * layout on purpose — a hero, a feature and a rail, then an index that
 * shows one work at a time — so the page never presents twenty-five equal
 * boxes at once.
 */

/**
 * Order matters: [0] is the hero portrait frame, [1] is the wide feature
 * (the only landscape source, so it never gets over-cropped), the rest
 * ride the rail at 4:5.
 */
export const MANDIRS: readonly Framed[] = [
  {
    image: "/work/mandir-dusk.jpg",
    alt: "White marble mandir with carved jali screens against an evening sky",
  },
  {
    image: "/work/mandir-room.jpg",
    alt: "Full white marble mandir installed in a panelled room between two windows",
  },
  {
    image: "/work/mandir-facade.jpg",
    alt: "Large white marble mandir facade with domed roof and carved arch",
  },
  {
    image: "/work/mandir-white.jpg",
    alt: "Pure white marble mandir with carved arch and finial",
  },
  {
    image: "/work/mandir-backlit.jpg",
    alt: "Carved Om jali panel lit from behind so the pierced work reads as shadow",
  },
  {
    image: "/work/mandir-outdoor.jpg",
    alt: "Carved white marble mandir standing outdoors",
  },
  {
    image: "/work/mandir-treelife.jpg",
    alt: "White marble mandir with a tree of life carved into the jali arch",
  },
  {
    image: "/work/mandir-peacock.jpg",
    alt: "Carved white marble mandir with a peacock-feather jali fan",
  },
  {
    image: "/work/mandir-balustrade.jpg",
    alt: "White marble temple with a carved balustrade and steps",
  },
  {
    image: "/work/mandir-lit.jpg",
    alt: "Carved marble mandir installed and lit, with idols in place",
  },
];

/** Deliberately small — fountains were the old story; mandirs are the work. */
export const FOUNTAINS: readonly Framed[] = [
  {
    image: "/work/elephant-jali.jpg",
    alt: "Ornate domed marble pavilion fountain with arched niches, peacocks and relief friezes",
    focus: "50% 62%",
  },
  {
    image: "/work/elephant-peacock.jpg",
    alt: "Marble fountain with carved elephant and peacock figures around a blue-tiled pool",
    focus: "50% 74%",
  },
  {
    image: "/work/wall-panels.jpg",
    alt: "Three arched marble wall fountains with carved floral relief and basins",
  },
];

/**
 * The index chapter: twelve photographs presented one at a time.
 *
 * `title` describes what is visible in the photograph. It is not a project
 * name and not a location — we do not know which of these were delivered to
 * which site, so nothing here claims to.
 */
export const WORKS: readonly { image: string; alt: string; title: string; tag: string }[] = [
  {
    image: "/work/jali-rosette.jpg",
    alt: "Intricate carved jali rosette in a square marble frame",
    title: "Rosette jali, square frame",
    tag: "Jali",
  },
  {
    image: "/work/jali-arch.jpg",
    alt: "Ornate white marble jali arch panel with carved borders",
    title: "Arched jali with carved border",
    tag: "Jali",
  },
  {
    image: "/work/jali-screen.jpg",
    alt: "Carved marble jali screen with an arched centre panel",
    title: "Screen with arched centre",
    tag: "Screen",
  },
  {
    image: "/work/panel-door.jpg",
    alt: "Carved marble doorway with a scalloped arch and wooden door",
    title: "Scalloped doorway surround",
    tag: "Doorway",
  },
  {
    image: "/work/panel-om.jpg",
    alt: "White marble mandir panel with a carved Om and flanking lions",
    title: "Om with flanking lions",
    tag: "Panel",
  },
  {
    image: "/work/panel-relief.jpg",
    alt: "Narrative marble relief panel carved with figures and animals",
    title: "Narrative relief panel",
    tag: "Relief",
  },
  {
    image: "/work/relief-varaha.jpg",
    alt: "Deep-carved marble relief of a lion-headed figure",
    title: "Lion-headed figure, deep relief",
    tag: "Relief",
  },
  {
    image: "/work/panel-unit.jpg",
    alt: "Large white marble mandir unit with a carved arch and cabinetry",
    title: "Mandir unit with cabinetry",
    tag: "Unit",
  },
  {
    image: "/work/kiosk-outdoor.jpg",
    alt: "Carved white marble chhatri standing outdoors",
    title: "Outdoor chhatri",
    tag: "Chhatri",
  },
  {
    image: "/work/carve-elephant.jpg",
    alt: "Free-standing carved marble elephant",
    title: "Free-standing elephant",
    tag: "Figure",
  },
  {
    image: "/work/carve-lotus.jpg",
    alt: "Carved marble lotus medallion with scrolling leaves",
    title: "Lotus medallion",
    tag: "Medallion",
  },
  {
    image: "/work/carve-roundel.jpg",
    alt: "Carved marble peacock-feather roundel with a central ring",
    title: "Peacock-feather roundel",
    tag: "Medallion",
  },
];

/** The three lines of business printed on the client's own invoice. */
export const TRADE = [
  {
    title: "Marble suppliers",
    body: "Marble supplied from our godown on Bye Pass Road, Makrana.",
  },
  {
    title: "Handcraft items",
    body: "Fountains, wall panels, jali screens and figures, carved by hand.",
  },
  {
    title: "Temple contractor",
    body: "Mandirs, facades, jali screens and surrounds — supplied and fitted at the site.",
  },
] as const;

export const FACTS = [
  { label: "Residence", value: "Near Minara Masjid, Makrana 341505" },
  { label: "Godown", value: "Near Gurudwara, Bye Pass Road, Makrana 341505" },
  { label: "GSTIN", value: "08QEMPK2026C1ZF" },
] as const;

export const MARQUEE = [
  "Mandirs & temples",
  "Jali screens",
  "Marble supply",
  "Temple contracting",
  "Handcraft items",
  "Courtyard fountains",
  "Carved reliefs",
  "Makrana marble",
] as const;

export const MARQUEE_FOOTER = [
  "Makrana, Rajasthan",
  "Marble suppliers",
  "Handcraft items",
  "Temple contractor",
  "GSTIN 08QEMPK2026C1ZF",
] as const;