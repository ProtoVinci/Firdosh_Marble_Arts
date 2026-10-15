import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /**
   * This project sits at C:\Users\Parth\Desktop\Kalamu_Sisodiya\site, so both
   * of these would otherwise walk all the way up to C:\Users\Parth and pick up
   * the stray package-lock.json in the home directory, which made every build
   * print "Next.js ignored package-lock.json ... would include your home
   * directory". Pinning both to the project folder keeps the root here.
   */
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;