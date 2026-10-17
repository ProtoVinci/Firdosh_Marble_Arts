/**
 * Tiny external store for "can this site be installed?".
 *
 * `beforeinstallprompt` fires once per page, so it is captured here at
 * module load and shared by every install button. It is not supported on
 * iOS Safari, where installing is a manual Share → Add to Home Screen.
 */

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export type InstallMode = "none" | "prompt" | "ios" | "installed";

let deferred: InstallEvent | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const standaloneQuery = () => window.matchMedia("(display-mode: standalone)");

const isStandalone = () =>
  standaloneQuery().matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  // iPadOS reports itself as a Mac with a touch screen.
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as InstallEvent;
    emit();
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    emit();
  });
  standaloneQuery().addEventListener("change", emit);
}

export function subscribeInstall(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getInstallMode(): InstallMode {
  if (isStandalone()) return "installed";
  if (deferred) return "prompt";
  if (isIOS()) return "ios";
  return "none";
}

export const getServerInstallMode = (): InstallMode => "none";

/** Shows the browser's install dialog. Resolves true if the visitor accepted. */
export async function promptInstall(): Promise<boolean> {
  if (!deferred) return false;
  const event = deferred;
  deferred = null;
  emit();
  await event.prompt();
  const { outcome } = await event.userChoice;
  return outcome === "accepted";
}
