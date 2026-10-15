import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  // `SOFT` is dropped deliberately: it rounds the terminals by a couple of
  // units that are imperceptible at display sizes, and keeping it out roughly
  // halves the variable font payload. WONK is kept — it is visible.
  axes: ["opsz", "WONK"],
  display: "swap",
  variable: "--font-fraunces",
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * No `metadataBase` is set: the client's domain has not been confirmed, and
 * guessing one would bake a wrong absolute URL into every share card and
 * canonical link. Once the domain is known, add:
 *
 *   metadataBase: new URL("https://the-real-domain.com"),
 *   openGraph: { images: ["/work/elephant-jali.jpg"] },
 */
export const metadata: Metadata = {
  title: {
    default: "Firdosh Marble Arts — Makrana marble supply & hand-carved stone",
    template: "%s — Firdosh Marble Arts",
  },
  description:
    "Marble suppliers, handcraft items and temple contractors in Makrana, Rajasthan. Fountains, wall panels, jali screens and carved figures.",
  keywords: [
    "Makrana marble supplier",
    "marble fountains Rajasthan",
    "hand carved stone",
    "jali screen",
    "temple contractor Makrana",
    "marble supplier Didwana",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Firdosh Marble Arts",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f2ede3",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Marks that scripting is available so hidden reveal states only
          // apply when something can undo them.
          dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}