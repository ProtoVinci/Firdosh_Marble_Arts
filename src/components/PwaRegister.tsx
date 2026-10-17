"use client";

import { useEffect } from "react";
// Imported for its side effect: it must be listening for
// `beforeinstallprompt` before the browser fires it.
import "@/lib/install";

/**
 * Registers the service worker. Production only: in development a worker
 * would cache stale hot-reload chunks and make every edit look broken.
 */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;

    const register = () =>
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .catch(() => {
          // Offline support is an enhancement; the site works without it.
        });

    // Wait for the page to finish loading so the worker's precache requests
    // never compete with the hero image.
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
