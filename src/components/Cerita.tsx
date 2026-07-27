import { useScrollReveal } from "../lib/useScrollReveal";
import MixedHeading from "./ui/MixedHeading";
import CeritaVideoReel from "./CeritaVideoReel";

export default function Cerita() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="cerita" ref={ref} className="relative bg-ink py-24 sm:py-32">
      {/* Video-dominant split: the left column takes ~62% so the reel stays the
          hero of the section, held off the viewport edge by a small section
          padding rather than a narrow container. Stacks on mobile. */}
      <div className="mx-auto grid max-w-[1700px] grid-cols-1 items-center gap-10 px-8 lg:grid-cols-[62%_1fr] lg:gap-12 lg:px-12">
        <CeritaVideoReel />

        <div>
          <span
            data-reveal
            className="block font-body text-[11px] font-medium uppercase tracking-[0.22em] text-muted"
          >
            Cerita Kami &middot; Sejak 2023
          </span>
          <MixedHeading
            data-reveal
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl"
            segments={[
              { text: "RUANG BUAT", variant: "sans" },
              { text: "MENYIMPAN", variant: "sans" },
              { text: "momen", variant: "script" },
            ]}
          />
          <p
            data-reveal
            className="mt-5 font-body text-[15px] leading-relaxed text-cream/70"
          >
            Memory Coffee mulai buka di Lorok Pakjo pada 2023 — dari sudut kecil yang
            perlahan jadi tempat orang-orang balik lagi dan lagi. Di dalam, ruangnya sejuk
            dan tenang, pas buat kerja atau ngobrol panjang. Di luar, teras rindang jadi
            favorit buat yang suka udara terbuka sambil ditemani secangkir kopi.
          </p>
          <p
            data-reveal
            className="mt-3.5 font-body text-[15px] leading-relaxed text-cream/70"
          >
            Setiap gelas yang kami sajikan adalah undangan untuk pelan-pelan — nikmati
            waktunya, simpan momennya.
          </p>
        </div>
      </div>
    </section>
  );
}
