import { PHONE_HREF, WHATSAPP_HREF } from "@/lib/content";

/**
 * Persistent call / WhatsApp strip for phones. Most enquiries to a trade
 * workshop start with a call or a chat, so both should never be more than a
 * thumb away. Server-rendered — it needs no JavaScript — and hidden from
 * `lg` up, where the header carries the WhatsApp button. The footer pads its
 * bottom by the bar's height so the bar never covers the last lines.
 */
export function ContactBar() {
  const item =
    "flex min-h-14 flex-1 items-center justify-center px-2 py-3 text-center text-[0.9375rem] font-medium transition-colors duration-200";

  return (
    <nav
      aria-label="Contact"
      data-contact-bar
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-ink/12 bg-bone pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] lg:hidden"
    >
      <a href={PHONE_HREF} className={`${item} text-ink active:bg-shell`}>
        Call us
      </a>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={`${item} bg-ink text-bone active:bg-clay`}
      >
        Chat on WhatsApp
      </a>
    </nav>
  );
}
