import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const NAV_LINKS = [
  { to: "/menu", label: "Menu" },
  { to: "/#cerita", label: "Cerita" },
  { to: "/#lokasi", label: "Lokasi" },
];

const WA_LINK = "https://wa.me/62887433362919";

const GLASS =
  "border border-white/[0.12] bg-black/30 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)]";

export default function Header() {
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const reservasiRef = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`fixed left-0 right-0 top-0 z-[100] w-full transition-all duration-300 motion-reduce:transition-none ${
        scrolled
          ? "border-b border-white/[0.08] bg-black/60 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto grid max-w-5xl grid-cols-3 items-center gap-2 px-4 transition-all duration-300 motion-reduce:transition-none sm:gap-4 sm:px-8 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        {/* Left — logo */}
        <div className="flex justify-start">
          <Link ref={logoRef} to="/" className="flex items-center">
            <img
              src="/logo-memory-cafe.png"
              alt="Memory Coffee"
              className="h-7 w-auto sm:h-9"
            />
          </Link>
        </div>

        {/* Center — nav (desktop) / hamburger (mobile) */}
        <div ref={navWrapRef} className="relative flex justify-center">
          <nav className="hidden items-center gap-8 font-body text-xs uppercase tracking-[0.15em] text-cream/70 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="transition-colors hover:text-amber"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center text-cream md:hidden"
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
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-center transition-colors hover:bg-white/5 hover:text-amber"
                >
                  {link.label}
                </Link>
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
