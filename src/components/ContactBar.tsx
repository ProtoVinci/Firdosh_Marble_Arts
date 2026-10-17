import { PHONE_HREF, whatsappLink } from "@/lib/content";

/**
 * Persistent call / WhatsApp / quote strip for phones. Most enquiries to a
 * trade workshop start with a call, so the number should never be more than
 * a thumb away. Server-rendered — it needs no JavaScript — and hidden from
 * `lg` up, where the header already carries the quote button.
 */
export function ContactBar() {
  const item =
    "micro flex flex-1 px-1 tracking-[0.12em] min-[360px]:tracking-[0.18em] items-center justify-center min-h-12 py-4 text-center transition-colors duration-200";

  return (
    <nav
      aria-label="Contact"
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-ink/12 bg-bone pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] lg:hidden"
    >
      <a href={PHONE_HREF} className={`${item} text-ink active:bg-shell`}>
        Call
      </a>
      <a
        href={whatsappLink(`Hello, I found your website and would like to enquire.`)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${item} border-x border-ink/12 text-ink active:bg-shell`}
      >
        WhatsApp
      </a>
      <a href="#enquire" className={`${item} bg-ink text-bone active:bg-clay`}>
        Get a quote
      </a>
    </nav>
  );
}
