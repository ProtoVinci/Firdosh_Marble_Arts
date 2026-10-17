import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Firdosh Marble Arts",
    short_name: "Firdosh Marble",
    description:
      "Marble suppliers, handcraft items and temple contractors in Makrana, Rajasthan.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    lang: "en-IN",
    background_color: "#f2ede3",
    theme_color: "#f2ede3",
    categories: ["business", "shopping"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Contact us", short_name: "Contact", url: "/#contact" },
      { name: "Selected works", short_name: "Works", url: "/#works" },
    ],
  };
}
