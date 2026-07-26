import { Link } from "react-router-dom";
import { useScrollReveal } from "../lib/useScrollReveal";
import MixedHeading from "./ui/MixedHeading";
import MenuItemCard from "./menu/MenuItemCard";
import { MENU } from "../data/menu";

const PREVIEW_ITEMS = MENU.filter((item) => item.category === "Signature").slice(0, 6);

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MenuPreview() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative bg-ink px-6 py-24 sm:px-10 sm:py-32">
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

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {PREVIEW_ITEMS.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        <div data-reveal className="mt-12 flex justify-center sm:mt-14">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-amber/30 px-6 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-amber transition-colors hover:bg-amber/10"
          >
            Menu Lengkap
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
