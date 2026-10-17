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

/** `tel:` link for the primary invoice number. */
export const PHONE_HREF = `tel:${STUDIO.phones[0].replace(/\s/g, "")}`;

/** wa.me wants the number as digits only, country code first. */
export const WHATSAPP_NUMBER = STUDIO.phones[0].replace(/\D/g, "");

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Opening line placed in the visitor's WhatsApp compose box. It is only a
 * draft: nothing reaches the business until the visitor presses Send, so no
 * copy on the site may say a message "has been sent".
 */
export const WHATSAPP_GREETING =
  "Hello, I found Firdosh Marble Arts through your website and would like to enquire about marble work.";

/** The one WhatsApp link every contact action on the page uses. */
export const WHATSAPP_HREF = whatsappLink(WHATSAPP_GREETING);

/**
 * Section links, shared by the header, the mobile menu and the footer so
 * the three can never disagree. `#enquire` and `#visit` still resolve (they
 * now sit inside the contact section) for old links and installed apps.
 */
export const NAV = [
  { label: "Mandirs", href: "#mandirs" },
  { label: "Works", href: "#works" },
  { label: "Fountains", href: "#fountains" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  eyebrow: "Makrana · Rajasthan",
  lead: "Marble suppliers, handcraft items and temple contractors in Makrana, Rajasthan. Mandirs, jali screens, fountains and carved figures.",
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
    alt: "White marble mandir with a carved tree-of-life panel and lit jali side screens, set in a room between two windows",
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
    alt: "White marble mandir wall with a backlit Om medallion and inlaid dark-stone floral motifs",
  },
  {
    image: "/work/mandir-outdoor.jpg",
    alt: "Carved white marble mandir standing outdoors",
  },
  {
    image: "/work/mandir-treelife.jpg",
    alt: "White marble mandir with carved pillars and arch, and a coloured-stone tree-of-life inlay on the back wall",
  },
  {
    image: "/work/mandir-peacock.jpg",
    alt: "White marble mandir arch with blue-painted peacock figures and an inlaid peacock-feather fan on the back wall",
  },
  {
    image: "/work/mandir-balustrade.jpg",
    alt: "White marble temple with a carved balustrade and steps",
  },
  {
    image: "/work/mandir-lit.jpg",
    alt: "Lit white marble mandir with a pierced arch and an Om medallion, idols in place and cabinets below",
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
    alt: "Tiered marble fountain with carved fish figures around a blue-tiled pool",
    focus: "50% 74%",
  },
  {
    image: "/work/wall-panels.jpg",
    alt: "Marble wall fountain with tiered bowls on an inlaid central arch, flanked by two carved floral panels",
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
    alt: "White marble mandir with carved pillars, a pierced jali arch and an inlaid floral medallion on the back wall",
    title: "Mandir with pierced jali arch",
    tag: "Mandir",
  },
  {
    image: "/work/jali-screen.jpg",
    alt: "White marble mandir with a domed top, a geometric jali screen under a carved arch and three drawers below",
    title: "Mandir with geometric jali screen",
    tag: "Jali",
  },
  {
    image: "/work/panel-door.jpg",
    alt: "Carved marble doorway with a scalloped arch, lion figures in niches above and a wooden door",
    title: "Scalloped doorway surround",
    tag: "Doorway",
  },
  {
    image: "/work/panel-om.jpg",
    alt: "White marble mandir with blue-accented carving on the arch, a sunburst panel behind brass idols and carved drawers below",
    title: "Mandir with blue-accented arch",
    tag: "Mandir",
  },
  {
    image: "/work/panel-relief.jpg",
    alt: "Narrative marble relief panel carved with figures and animals",
    title: "Narrative relief panel",
    tag: "Relief",
  },
  {
    image: "/work/relief-varaha.jpg",
    alt: "Marble relief of two figures seated on a swing beneath carved foliage, with a peacock at the right",
    title: "Two-figure narrative relief",
    tag: "Relief",
  },
  {
    image: "/work/panel-unit.jpg",
    alt: "Large white marble mandir with three arched bays, a scalloped parapet, cut-lattice panels and side shelves",
    title: "Three-bay mandir with shelves",
    tag: "Mandir",
  },
  {
    image: "/work/kiosk-outdoor.jpg",
    alt: "Carved white marble chhatri standing outdoors",
    title: "Outdoor chhatri",
    tag: "Chhatri",
  },
  {
    image: "/work/carve-elephant.jpg",
    alt: "Pair of carved white marble elephants with raised trunks, each with a front foot on a carved log",
    title: "Pair of elephants, trunks raised",
    tag: "Figure",
  },
  {
    image: "/work/carve-lotus.jpg",
    alt: "Carved white marble lotus flanked by two birds with plumed tails, on a wave-carved base",
    title: "Lotus with a pair of birds",
    tag: "Panel",
  },
  {
    image: "/work/carve-roundel.jpg",
    alt: "Carved white marble peacock standing in front of a large openwork scroll roundel",
    title: "Peacock before a carved roundel",
    tag: "Figure",
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
    body: "Mandirs, temple facades, jali screens and carved surrounds.",
  },
] as const;

export const MARQUEE = [
  "Mandirs & temples",
  "Jali screens",
  "Marble supply",
  "Temple contracting",
  "Handcraft items",
  "Marble fountains",
  "Carved reliefs",
  "Makrana marble",
] as const;