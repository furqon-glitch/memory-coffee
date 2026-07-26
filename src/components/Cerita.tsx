import { useScrollReveal } from "../lib/useScrollReveal";
import MixedHeading from "./ui/MixedHeading";
import CeritaVideoReel from "./CeritaVideoReel";

export default function Cerita() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="cerita" ref={ref} className="relative bg-ink px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <CeritaVideoReel />

        <div data-reveal className="mx-auto mt-12 max-w-2xl text-center sm:mt-16">
          <span className="font-body text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Cerita Kami &middot; Sejak 2023
          </span>
          <MixedHeading
            className="mt-4 text-4xl sm:text-6xl"
            segments={[
              { text: "RUANG BUAT", variant: "sans" },
              { text: "MENYIMPAN", variant: "sans" },
              { text: "momen", variant: "script" },
            ]}
          />
        </div>

        <p
          data-reveal
          className="mx-auto mt-6 max-w-md text-center font-body text-base leading-relaxed text-cream/70"
        >
          Memory Coffee mulai buka di Lorok Pakjo pada 2023 — dari sudut kecil yang
          perlahan jadi tempat orang-orang balik lagi dan lagi. Di dalam, ruangnya sejuk
          dan tenang, pas buat kerja atau ngobrol panjang. Di luar, teras rindang jadi
          favorit buat yang suka udara terbuka sambil ditemani secangkir kopi.
        </p>
        <p
          data-reveal
          className="mx-auto mt-4 max-w-md text-center font-body text-base leading-relaxed text-cream/70"
        >
          Setiap gelas yang kami sajikan adalah undangan untuk pelan-pelan — nikmati
          waktunya, simpan momennya.
        </p>
      </div>
    </section>
  );
}
