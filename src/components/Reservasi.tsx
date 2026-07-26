import { useScrollReveal } from "../lib/useScrollReveal";
import MixedHeading from "./ui/MixedHeading";

const WA_LINK =
  "https://wa.me/62887433362919?text=" +
  encodeURIComponent("Halo Memory Coffee, saya mau reservasi tempat.");

export default function Reservasi() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="reservasi"
      ref={ref}
      className="relative overflow-hidden bg-ink px-6 py-24 sm:px-10 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(230,169,78,0.1), transparent 70%)",
        }}
      />
      <div data-reveal className="relative mx-auto max-w-2xl text-center">
        <span className="font-body text-xs font-medium uppercase tracking-[0.25em] text-muted">
          Reservasi
        </span>
        <MixedHeading
          className="mt-4 text-4xl sm:text-6xl"
          segments={[
            { text: "SIMPAN TEMPATMU", variant: "sans" },
            { text: "BUAT", variant: "sans" },
            { text: "nanti", variant: "script" },
          ]}
        />
        <p className="mx-auto mt-6 max-w-md font-body text-base leading-relaxed text-cream/70">
          Mau datang rame-rame atau cari sudut buat sendirian? Kabari kami dulu lewat
          WhatsApp, biar mejanya siap pas kamu sampai.
        </p>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-transform duration-300 hover:scale-[1.03]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39c1.44.79 3.06 1.2 4.71 1.2h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.13h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.16 8.16 0 0 1-1.26-4.34c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.24.85 5.79 2.4a8.13 8.13 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2Zm4.5-6.14c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.83-.2-.48-.4-.42-.56-.42-.14 0-.3-.02-.46-.02s-.43.06-.65.3c-.23.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.2 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.08.15-1.17-.06-.1-.22-.16-.47-.28Z" />
          </svg>
          Chat via WhatsApp
        </a>

        <p className="mt-4 font-body text-sm text-cream/45">0887-4333-62919</p>
      </div>
    </section>
  );
}
