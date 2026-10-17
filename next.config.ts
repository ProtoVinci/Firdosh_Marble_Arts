import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP only. AVIF saves ~20% more but costs several times the CPU per
    // encode, and every image is encoded on first request — on a small
    // self-hosted box that shows up as slow first loads for each visitor.
    formats: ["image/webp"],
    // Most source photographs are 700–1000px wide (the largest is 1600).
    // The default ladder goes up to 3840px, which made the optimizer
    // upscale small sources (e.g. w=1920 for a 736px photo) for no gain.
    deviceSizes: [480, 750, 1080],
    // 68 is visually indistinguishable on these photographs and ~15% lighter
    // than the default 75 in WebP.
    qualities: [68],
    // Photographs never change under the same filename; keep the encoded
    // copies for a year instead of the 4-hour default.
    minimumCacheTTL: 31536000,
  },
  /**
   * Pin the workspace root to this folder so Next does not walk up the
   * tree and pick up a stray package-lock.json from a parent directory.
   */
  outputFileTracingRoot: __dirname,
  /**
   * The "N" route badge `next dev` draws in the bottom-left corner sat on
   * top of the mobile Call / WhatsApp bar and read as part of the site.
   * Production never shows it; compile and runtime errors still appear
   * in development with this off.
   */
  devIndicators: false,
  async headers() {
    return [
      {
        // The worker must never be served from a stale cache, or a fixed
        // build would not reach returning visitors.
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
