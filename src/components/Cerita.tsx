import { useScrollReveal } from "../lib/useScrollReveal";
import MixedHeading from "./ui/MixedHeading";
import storyImg from "../assets/story.jpg";

export default function Cerita() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="cerita" ref={ref} className="relative bg-ink px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-reveal className="overflow-hidden rounded-3xl border border-cream/10">
          <img
            src={storyImg}
            alt="Sudut Memory Coffee dengan cangkir bertumpuk di meja bar"
            className="h-[420px] w-full object-cover object-[50%_30%] brightness-110 sm:h-[520px]"
            loading="lazy"
          />
        </div>

        <div>
          <span data-reveal className="font-body text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Cerita Kami &middot; Sejak 2023
          </span>
          <MixedHeading
            data-reveal
            className="mt-4 text-4xl sm:text-6xl"
            segments={[
              { text: "RUANG BUAT", variant: "sans" },
              { text: "MENYIMPAN", variant: "sans" },
              { text: "momen", variant: "script" },
            ]}
          />
          <p data-reveal className="mt-6 max-w-md font-body text-base leading-relaxed text-cream/70">
            Memory Coffee mulai buka di Lorok Pakjo pada 2023 — dari sudut kecil yang
            perlahan jadi tempat orang-orang balik lagi dan lagi. Di dalam, ruangnya sejuk
            dan tenang, pas buat kerja atau ngobrol panjang. Di luar, teras rindang jadi
            favorit buat yang suka udara terbuka sambil ditemani secangkir kopi.
          </p>
          <p data-reveal className="mt-4 max-w-md font-body text-base leading-relaxed text-cream/70">
            Setiap gelas yang kami sajikan adalah undangan untuk pelan-pelan — nikmati
            waktunya, simpan momennya.
          </p>
        </div>
      </div>
    </section>
  );
}
