import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let activeLenis: Lenis | null = null;

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
  activeLenis = lenis;

  lenis.on("scroll", ScrollTrigger.update);

  const onTick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  const cleanup = () => {
    gsap.ticker.remove(onTick);
    lenis.destroy();
    activeLenis = null;
  };

  return { lenis, cleanup };
}

/**
 * Scrolls to a target (selector, element, or Y offset) through the active
 * Lenis instance so route/hash navigation stays in sync with the smooth
 * scroll clock. Falls back to native scrolling when Lenis is off
 * (prefers-reduced-motion) or not yet initialized.
 */
export function scrollToTarget(
  target: string | number,
  options: { offset?: number; immediate?: boolean } = {}
) {
  if (activeLenis) {
    // Route changes swap in pages of very different heights; force Lenis to
    // recompute its scroll limit before targeting, or it can clamp the
    // scroll to the previous page's (shorter) bounds.
    activeLenis.resize();
    activeLenis.scrollTo(target, {
      offset: options.offset ?? 0,
      immediate: options.immediate ?? false,
      duration: 1.1,
    });
    return;
  }

  const behavior: ScrollBehavior = options.immediate ? "auto" : "smooth";

  if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior, block: "start" });
  } else {
    window.scrollTo({ top: target, behavior });
  }
}

/**
 * Pauses/resumes the Lenis-driven page scroll. Use this whenever an overlay
 * (modal, drawer) needs to own scrolling itself — Lenis intercepts wheel/touch
 * globally, so locking `body` overflow alone isn't enough to stop the
 * background page from scrolling underneath it.
 */
export function pauseSmoothScroll() {
  activeLenis?.stop();
}

export function resumeSmoothScroll() {
  activeLenis?.start();
}
