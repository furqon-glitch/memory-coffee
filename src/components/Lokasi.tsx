import { useScrollReveal } from "../lib/useScrollReveal";
import MixedHeading from "./ui/MixedHeading";

const ADDRESS = "Jl. Proklamasi No. 45, Lorok Pakjo, Palembang";
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS
)}`;

export default function Lokasi() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="lokasi" ref={ref} className="relative bg-ink px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span data-reveal className="font-body text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Lokasi
          </span>
          <MixedHeading
            data-reveal
            className="mt-4 text-4xl sm:text-6xl"
            segments={[
              { text: "MAMPIR", variant: "sans" },
              { text: "KE", variant: "sans" },
              { text: "Lorok Pakjo", variant: "script" },
            ]}
          />

          <div data-reveal className="mt-8 space-y-5 font-body text-cream/80">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cream/45">Alamat</p>
              <p className="mt-1 text-base">{ADDRESS}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cream/45">Jam Buka</p>
              <p className="mt-1 text-base">08.00 &ndash; 22.00 tiap hari</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cream/45">Rating</p>
              <p className="mt-1 text-base">
                <span className="font-semibold text-cream">4,8</span> &middot; 894 ulasan Google
              </p>
            </div>
          </div>

          <a
            data-reveal
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-2.5 font-body text-xs uppercase tracking-[0.15em] text-cream transition-colors hover:border-amber hover:text-amber sm:text-sm"
          >
            Buka di Google Maps
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17 17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div
          data-reveal
          className="h-[360px] overflow-hidden rounded-3xl border border-cream/10 sm:h-[440px]"
        >
          <iframe
            title="Lokasi Memory Coffee di Google Maps"
            src={MAPS_EMBED_SRC}
            className="h-full w-full grayscale-[0.3] contrast-[1.05]"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
