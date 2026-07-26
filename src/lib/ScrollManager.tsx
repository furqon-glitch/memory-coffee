import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToTarget } from "./smoothScroll";

// Remembers how far the user had scrolled on each pathname, so navigating
// back (POP) can restore it instead of dumping them back at the top.
const scrollPositions = new Map<string, number>();

// Pages that should always open at the top regardless of navigation type —
// stepping "back" into the full menu page shouldn't inherit wherever the
// user had previously scrolled to on it.
const ALWAYS_TOP_PATHS = new Set(["/menu"]);

/**
 * Keeps scroll position in sync with client-side navigation:
 * - jumps to a hashed section (e.g. "/#cerita") when the URL has one
 * - restores the remembered scroll position on back/forward (POP) nav
 * - otherwise resets to the top for a fresh route
 * then refreshes ScrollTrigger so its measurements match the new page's
 * layout.
 */
export default function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const pathnameRef = useRef(location.pathname);

  useEffect(() => {
    pathnameRef.current = location.pathname;
    const onScroll = () => {
      scrollPositions.set(pathnameRef.current, window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();

      if (location.hash) {
        scrollToTarget(location.hash, { offset: -24, immediate: true });
        return;
      }

      const savedY = scrollPositions.get(location.pathname);
      const shouldRestore =
        navigationType === "POP" &&
        !ALWAYS_TOP_PATHS.has(location.pathname) &&
        savedY != null;

      scrollToTarget(shouldRestore ? savedY! : 0, { immediate: true });
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname, location.hash, navigationType]);

  return null;
}
