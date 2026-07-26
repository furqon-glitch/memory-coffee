import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis feeds GSAP's ticker so ScrollTrigger and smooth scroll share one clock.
 * Call once at the app root. Honours prefers-reduced-motion by skipping inertial
 * smoothing and letting the browser scroll natively.
 */
export function initSmoothScroll() {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) {
    ScrollTrigger.refresh();
    return { lenis: null, cleanup: () => {} };
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const onTick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  const cleanup = () => {
    gsap.ticker.remove(onTick);
    lenis.destroy();
  };

  return { lenis, cleanup };
}
