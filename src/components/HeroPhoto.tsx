import { useEffect, useRef, useState } from "react";
import heroBg from "../assets/hero-bg.jpg";
import heroCutout from "../assets/hero-cutout.png";
import "./HeroPhoto.css";

/**
 * BACKUP — no longer rendered on the page (replaced by ui/scroll-morph-hero
 * as the main hero). Kept here in case we want the photo hero back.
 *
 * Ported directly from reference.html (root of the project). Structure, class
 * names, CSS values, and the pointer/scroll parallax math are kept as close to
 * the source as possible — see HeroPhoto.css for the verbatim styles.
 */
export default function HeroPhoto() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => setGo(true), 150);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return () => clearTimeout(revealTimer);

    const hero = heroRef.current;
    const bg = bgRef.current;
    const fg = fgRef.current;
    if (!hero || !bg || !fg) return () => clearTimeout(revealTimer);

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let rafId: number;

    const onPointerMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };

    hero.addEventListener("pointermove", onPointerMove);

    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const sy = window.scrollY || 0;
      bg.style.transform = `scale(1.07) translate(${-cx * 7}px, ${-cy * 6 - sy * 0.03}px)`;
      fg.style.transform = `scale(1.07) translate(${-cx * 15}px, ${-cy * 12 - sy * 0.03}px)`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      clearTimeout(revealTimer);
      hero.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={heroRef} className={`mc-hero hero${go ? " go" : ""}`} id="hero">
      <div className="ph bg" ref={bgRef} style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="tint" />
      <div className="head">
        <div className="memory reveal d2">MEMORY</div>
      </div>
      <div className="ph fg" ref={fgRef} style={{ backgroundImage: `url(${heroCutout})` }} />
      <div className="script reveal d3">coffee</div>
      <div className="vignette" />
      <svg className="grain" aria-hidden="true">
        <filter id="mc-hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} />
        </filter>
        <rect width="100%" height="100%" filter="url(#mc-hero-grain)" />
      </svg>

      <div className="ui">
        <div className="eyebrow-l reveal d1">Kedai kopi &middot; Palembang</div>
        <div className="tags reveal d1">
          &mdash; Cold Brew
          <br />
          &mdash; Suasana
          <br />
          &mdash; Kenangan
        </div>
        <div className="card reveal d3">
          <b>Memory Coffee</b>
          <br />
          Lokasi: Lorok Pakjo, Palembang
          <br />
          Jam: 08.00&ndash;22.00 tiap hari
          <br />
          Rating: <b>4,8</b> &middot; 894 ulasan Google
        </div>
        <div className="copy reveal d3">
          Kopi hangat, obrolan panjang, dan sudut yang bikin betah berjam-jam. Ruang buat
          menyimpan momen terbaikmu.
        </div>
      </div>
    </section>
  );
}
