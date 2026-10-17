"use client";

import { useState, useSyncExternalStore } from "react";
import {
  getInstallMode,
  getServerInstallMode,
  promptInstall,
  subscribeInstall,
} from "@/lib/install";

/**
 * "Install app" link. Renders nothing unless installing is actually
 * possible: not already installed, and either the browser offered an install
 * prompt or this is iOS, which needs a manual instruction instead.
 */
export function InstallApp({ className = "" }: { className?: string }) {
  const mode = useSyncExternalStore(subscribeInstall, getInstallMode, getServerInstallMode);
  const [showHint, setShowHint] = useState(false);

  if (mode === "none" || mode === "installed") return null;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => (mode === "prompt" ? void promptInstall() : setShowHint((v) => !v))}
        aria-expanded={mode === "ios" ? showHint : undefined}
        className="micro link-draw py-2"
      >
        Install app
      </button>
      {mode === "ios" && showHint && (
        <p className="mt-2 max-w-[30ch] text-[0.8125rem] leading-relaxed opacity-70" role="status">
          Tap the Share button in Safari, then choose &ldquo;Add to Home Screen&rdquo;.
        </p>
      )}
    </div>
  );
}
