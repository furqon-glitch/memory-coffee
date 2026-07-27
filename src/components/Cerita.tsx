import { useScrollReveal } from "../lib/useScrollReveal";
import MixedHeading from "./ui/MixedHeading";
import CeritaVideoReel from "./CeritaVideoReel";

export default function Cerita() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="cerita" ref={ref} className="relative bg-ink py-24 sm:py-32">
      {/* Full-bleed split: video flush to the left edge, copy on the right.
          Stacks to video-then-text on mobile. */}
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[54%_1fr] lg:gap-14 xl:gap-20">
        <CeritaVideoReel />

        <div className="px-6 sm:px-10 lg:max-w-xl lg:pl-0 lg:pr-10 xl:pr-16">
          <span
            data-reveal
            className="block font-body text-[11px] font-medium uppercase tracking-[0.22em] text-muted"
          >
            Cerita Kami &middot; Sejak 2023
          </span>
          <MixedHeading
            data-reveal
            className="mt-3 text-3xl sm:text-4xl lg:text-[2.5rem]"
            segments={[
              { text: "RUANG BUAT", variant: "sans" },
              { text: "MENYIMPAN", variant: "sans" },
              { text: "momen", variant: "script" },
            ]}
          />
          <p
            data-reveal
            className="mt-5 max-w-md font-body text-sm leading-relaxed text-cream/70"
          >
            Memory Coffee mulai buka di Lorok Pakjo pada 2023 — dari sudut kecil yang
            perlahan jadi tempat orang-orang balik lagi dan lagi. Di dalam, ruangnya sejuk
            dan tenang, pas buat kerja atau ngobrol panjang. Di luar, teras rindang jadi
            favorit buat yang suka udara terbuka sambil ditemani secangkir kopi.
          </p>
          <p
            data-reveal
            className="mt-3.5 max-w-md font-body text-sm leading-relaxed text-cream/70"
          >
            Setiap gelas yang kami sajikan adalah undangan untuk pelan-pelan — nikmati
            waktunya, simpan momennya.
          </p>
        </div>
      </div>
    </section>
  );
}
