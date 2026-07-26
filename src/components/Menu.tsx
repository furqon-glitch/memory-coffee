import { useScrollReveal } from "../lib/useScrollReveal";
import MixedHeading from "./ui/MixedHeading";

type MenuItem = {
  name: string;
  tag: string;
  note: string;
};

const mainstays: MenuItem[] = [
  {
    name: "Pinecano",
    tag: "Signature",
    note: "Espresso ganda dengan sentuhan pine syrup — pahit, manis, dan sedikit resin yang nyeleneh.",
  },
  {
    name: "Memory on the Rock",
    tag: "Signature",
    note: "Signature dingin kami — espresso dituang perlahan di atas es, dibiarkan mengendap rasanya.",
  },
  {
    name: "Black Cold Brew",
    tag: "Cold Brew",
    note: "Diseduh dingin 16 jam, lembut tanpa asam berlebih. Kopi murni untuk yang suka rasa jujur.",
  },
  {
    name: "White Cold Brew",
    tag: "Cold Brew",
    note: "Cold brew yang sama, dipadukan house milk — creamy tapi karakter kopinya tetap terasa.",
  },
];

const midYear: MenuItem[] = [
  {
    name: "Butterscotch Sea Salt Latte",
    tag: "Mid-Year Sips",
    note: "Manis karamel butterscotch ditutup taburan garam laut — kombinasi yang bikin nagih.",
  },
  {
    name: "White Peach Oolong Tea",
    tag: "Mid-Year Sips",
    note: "Teh oolong ringan dengan aroma peach segar. Pilihan buat yang butuh jeda dari kafein berat.",
  },
];

function Card({ item, index }: { item: MenuItem; index: number }) {
  return (
    <div
      data-reveal
      className="group relative overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 transition-colors duration-300 hover:border-amber/40 sm:p-7"
    >
      <span className="pointer-events-none absolute -right-2 -top-4 font-display font-extrabold text-7xl text-cream/[0.04] sm:text-8xl">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative mb-4 inline-block rounded-full border border-amber/30 px-3 py-1 font-body text-[10px] uppercase tracking-[0.2em] text-amber">
        {item.tag}
      </span>
      <h3 className="relative font-display font-extrabold text-2xl uppercase tracking-[0.02em] leading-[1.05] text-cream sm:text-3xl">
        {item.name}
      </h3>
      <p className="relative mt-3 max-w-sm font-body text-sm leading-relaxed text-cream/65">
        {item.note}
      </p>
    </div>
  );
}

export default function Menu() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="menu" ref={ref} className="relative bg-ink px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="max-w-4xl">
          <span className="font-body text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Menu Andalan
          </span>
          <MixedHeading
            className="mt-4 text-4xl sm:text-6xl"
            segments={[
              { text: "MENU", variant: "sans" },
              { text: "yang paling", variant: "script" },
              { text: "DICARI", variant: "sans" },
              { text: "di", variant: "script" },
              { text: "SINI", variant: "sans" },
            ]}
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2">
          {mainstays.map((item, i) => (
            <Card key={item.name} item={item} index={i} />
          ))}
        </div>

        <div
          data-reveal
          className="mt-14 rounded-3xl border border-amber/20 bg-gradient-to-br from-amber/[0.07] to-transparent p-6 sm:mt-16 sm:p-10"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="font-display font-extrabold text-2xl uppercase tracking-[0.02em] leading-[1.05] text-cream sm:text-3xl">
              Mid-Year Sips
            </h3>
            <span className="font-body text-xs font-medium uppercase tracking-[0.25em] text-muted">
              Edisi musiman
            </span>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
            {midYear.map((item) => (
              <div key={item.name} data-reveal>
                <h4 className="font-display font-extrabold text-xl uppercase tracking-[0.02em] leading-[1.05] text-cream sm:text-2xl">
                  {item.name}
                </h4>
                <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-cream/65">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
