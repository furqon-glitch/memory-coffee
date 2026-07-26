import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#cerita", label: "Cerita" },
  { href: "#lokasi", label: "Lokasi" },
];

const WA_LINK = "https://wa.me/6285925843239";

const GLASS =
  "border border-white/[0.12] bg-black/30 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)]";

const BEAN = (
  <span
    aria-hidden="true"
    className="relative inline-block h-[16px] w-[16px] shrink-0 rotate-[-18deg] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-amber after:absolute after:inset-[2px_6px] after:rotate-[18deg] after:rounded-full after:border-l-2 after:border-ink after:content-[''] sm:h-[18px] sm:w-[18px]"
  />
);

export default function Header() {
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const reservasiRef = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = [logoRef.current, navWrapRef.current, reservasiRef.current];
    if (els.some((el) => !el)) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(els, { y: 0, opacity: 1 });
      return;
    }

    gsap.fromTo(
      els,
      { y: -24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      }
    );
  }, []);

  return (
    <header className="fixed inset-x-4 top-6 z-[100] sm:inset-x-8">
      <div className="mx-auto grid max-w-5xl grid-cols-3 items-center gap-2 sm:gap-4">
        {/* Left — logo pill */}
        <div className="flex justify-start">
          <a
            ref={logoRef}
            href="#hero"
            className={`flex items-center gap-2 rounded-full px-3 py-2 font-display text-[10px] font-extrabold uppercase tracking-wide text-cream sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-sm ${GLASS}`}
          >
            {BEAN}
            <span className="hidden sm:inline">Memory Coffee</span>
            <span className="sm:hidden">Memory</span>
          </a>
        </div>

        {/* Center — nav pill (desktop) / hamburger pill (mobile) */}
        <div ref={navWrapRef} className="relative flex justify-center">
          <nav
            className={`hidden items-center gap-8 rounded-full px-7 py-2.5 font-body text-xs uppercase tracking-[0.15em] text-cream/70 md:flex ${GLASS}`}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-amber"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-cream md:hidden ${GLASS}`}
          >
            {open ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 5l14 14M19 5 5 19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          {open && (
            <div
              className={`absolute left-1/2 top-full mt-2 flex w-40 -translate-x-1/2 flex-col gap-1 rounded-2xl p-2 font-body text-sm uppercase tracking-[0.1em] text-cream/80 md:hidden ${GLASS}`}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-center transition-colors hover:bg-white/5 hover:text-amber"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right — reservasi pill (solid terracotta CTA) */}
        <div className="flex justify-end">
          <a
            ref={reservasiRef}
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-terracotta px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.08em] text-ink shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.04] sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.1em]"
          >
            Reservasi
          </a>
        </div>
      </div>
    </header>
  );
}
