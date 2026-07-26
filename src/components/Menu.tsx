import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "../lib/useScrollReveal";
import MixedHeading from "./ui/MixedHeading";
import MenuItemCard from "./menu/MenuItemCard";
import { MENU, MENU_CATEGORIES, type MenuCategory } from "../data/menu";

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Menu({ showBackLink = false }: { showBackLink?: boolean }) {
  const ref = useScrollReveal<HTMLElement>();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(
    MENU_CATEGORIES[0]
  );

  function handleBack() {
    // Step back through history when we got here from within the app, so
    // ScrollManager can restore the home page to where the user left it.
    // Otherwise (direct link/refresh on /menu) there's nothing to restore,
    // so just go to "/" fresh.
    const historyState = window.history.state as { idx?: number } | null;
    if (typeof historyState?.idx === "number" && historyState.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  const items = useMemo(
    () => MENU.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="menu" ref={ref} className="relative bg-ink px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {showBackLink && (
          <button
            type="button"
            data-reveal
            onClick={handleBack}
            className="mb-8 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.15em] text-cream/60 transition-colors hover:text-amber"
          >
            <ArrowLeftIcon />
            Kembali ke Home
          </button>
        )}

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

        <div
          data-reveal
          className="mt-10 flex gap-2 overflow-x-auto pb-2 sm:mt-12 sm:flex-wrap sm:gap-2.5"
        >
          {MENU_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                activeCategory === category
                  ? "border-amber bg-amber/10 text-amber"
                  : "border-cream/10 text-cream/60 hover:border-cream/30 hover:text-cream"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
