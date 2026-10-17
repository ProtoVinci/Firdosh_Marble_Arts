/**
 * Renders the PWA icon set from the site mark. Re-run after changing the
 * mark:  node scripts/make-icons.cjs
 *
 * `sharp` ships with Next, so this adds no dependency.
 */
const sharp = require("sharp");
const path = require("node:path");

const INK = "#16130f";
const BONE = "#f2ede3";

// The mark, drawn on a 32-unit grid (same geometry as src/app/icon.svg).
const MARK = `
  <g fill="none" stroke="${BONE}" stroke-width="1.6" stroke-linecap="round" transform="translate(1.6 1.6)">
    <path d="M14.4 2.2c.9 1.2 1.4 2.1 1.4 2.9S15 8 14.4 8s-1.4-.7-1.4-1.7.5-1.7 1.4-2.9Z"/>
    <path d="M7 10.4c2 1.3 4.6 2 7.4 2s5.4-.7 7.4-2"/>
    <path d="M3.2 19.2c3.1 2 7 3 11.2 3s8.1-1 11.2-3"/>
    <path d="M1.6 26.4h25.6"/>
  </g>`;

/** `scale` is the share of the canvas the mark occupies. */
const svg = (scale) => {
  const size = 32 * scale;
  const offset = (32 - size) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="${INK}"/>
    <g transform="translate(${offset} ${offset}) scale(${scale})">${MARK}</g>
  </svg>`;
};

const out = (...p) => path.join(__dirname, "..", ...p);

const jobs = [
  // "any" icons: mark fills ~72% of the canvas.
  ["public/icons/icon-192.png", 192, 0.72],
  ["public/icons/icon-512.png", 512, 0.72],
  // Maskable: platforms crop to a circle/squircle, so keep the mark inside
  // the central 80% safe zone.
  ["public/icons/maskable-512.png", 512, 0.52],
  // iOS ignores the manifest for the home-screen icon and wants this.
  ["src/app/apple-icon.png", 180, 0.64],
];

(async () => {
  for (const [file, size, scale] of jobs) {
    await sharp(Buffer.from(svg(scale)), { density: 384 })
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(out(file));
    console.log("wrote", file);
  }
})();
