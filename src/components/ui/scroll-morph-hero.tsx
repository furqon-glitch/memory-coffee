import { useState, useEffect, useMemo, useRef, Fragment } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { renderMixedSegments } from "./MixedHeading";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
  src: string;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({ src, index, target }: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-ink/80"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src={src} alt={`memory-coffee-${index}`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-ink flex flex-col items-center justify-center p-4 border border-cream/10"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center">
            <p className="text-[8px] font-bold text-[#C67D3E] uppercase tracking-widest mb-1">
              Lihat
            </p>
            <p className="text-xs font-medium text-cream">Detail</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Main Hero Component ---
// PLACEHOLDER — ganti dengan foto Memory Coffee nanti.
// Foto kopi/cafe dari Unsplash (bukan foto asli Memory Coffee), tinggal
// tukar URL di array ini begitu foto Memory Coffee sudah tersedia.
const IMAGES = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&q=80",
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&q=80",
  "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=300&q=80",
  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=80",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=300&q=80",
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&q=80",
  "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&q=80",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=300&q=80",
  "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80",
  "https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=300&q=80",
  "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=80",
  "https://images.unsplash.com/photo-1506372023823-741c83b836fe?w=300&q=80",
  "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=300&q=80",
  "https://images.unsplash.com/photo-1524350876685-274059332603?w=300&q=80",
  "https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=300&q=80",
  "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=300&q=80",
  "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=300&q=80",
  "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&q=80",
  "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=300&q=80",
];

// Derived from IMAGES so resizing the array above never breaks the circle/arc math.
const TOTAL_IMAGES = IMAGES.length;
const MAX_SCROLL = 3000; // Virtual scroll range

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Container Size ---
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  // --- Virtual Scroll Logic ---
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  // Once the internal scatter->circle->arc scroll is exhausted in the
  // direction the user is scrolling, release control back to the page
  // (Lenis) instead of trapping the gesture here forever.
  const LENIS_PREVENT_ATTR = "data-lenis-prevent";
  const releaseToPage = (container: HTMLElement) =>
    container.removeAttribute(LENIS_PREVENT_ATTR);
  const captureFromPage = (container: HTMLElement) =>
    container.setAttribute(LENIS_PREVENT_ATTR, "true");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const current = scrollRef.current;
      const exhaustedDown = current >= MAX_SCROLL && e.deltaY > 0;
      const exhaustedUp = current <= 0 && e.deltaY < 0;

      if (exhaustedDown || exhaustedUp) {
        // Let this tick fall through to normal page scroll.
        releaseToPage(container);
        return;
      }

      captureFromPage(container);
      e.preventDefault();
      const newScroll = Math.min(Math.max(current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY; // always track latest position, even while released

      const current = scrollRef.current;
      const exhaustedDown = current >= MAX_SCROLL && deltaY > 0;
      const exhaustedUp = current <= 0 && deltaY < 0;

      if (exhaustedDown || exhaustedUp) {
        releaseToPage(container);
        return;
      }

      captureFromPage(container);
      e.preventDefault();
      const newScroll = Math.min(Math.max(current + deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  // 2. Scroll Rotation (Shuffling)
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  // --- Mouse Parallax ---
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  // --- Intro Sequence ---
  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 500);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // --- Random Scatter Positions ---
  const scatterPositions = useMemo(() => {
    return IMAGES.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  // --- Render Loop (Manual Calculation for Morph) ---
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  // --- Content Opacity ---
  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  return (
    <div
      ref={containerRef}
      data-lenis-prevent="true"
      className="relative w-full h-full bg-[#0E0E0E] overflow-hidden"
    >
      {/* Storefront background photo — sits behind the photo circle & text */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-background.jpg"
          alt="Storefront Memory Coffee"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#0E0E0E] sm:h-1/2" />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">
        {/* Intro Text (Fades out) */}
        <div className="absolute z-20 flex max-w-[240px] flex-col items-center justify-center px-4 text-center pointer-events-none top-1/2 -translate-y-1/2 md:z-0 md:max-w-none md:px-0">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            className="font-display font-extrabold uppercase tracking-[0.02em] leading-[1.2] text-xl text-cream md:text-5xl md:leading-[1.05]"
          >
            {/* Forced 2-line break on mobile so each line is short enough to
                never crop against the photo circle; the literal space keeps
                desktop's single-line text identical once md:hidden removes
                the <br>. */}
            <Fragment key="hero-line-1">
              {renderMixedSegments([
                { text: "SETIAP", variant: "sans" },
                { text: "momen", variant: "script" },
              ])}
            </Fragment>{" "}
            <br className="md:hidden" />
            <Fragment key="hero-line-2">
              {renderMixedSegments([
                { text: "JADI", variant: "sans" },
                { text: "kenangan", variant: "script" },
              ])}
            </Fragment>
          </motion.h1>
        </div>

        {/* Arc Active Content (Fades in) */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute top-[32%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
        >
          <h2 className="font-display font-extrabold uppercase tracking-[0.02em] leading-[1.05] text-3xl md:text-5xl text-cream mb-4">
            Menu &amp; Momen Kami
          </h2>
          <p className="text-sm md:text-base text-cream/70 max-w-lg leading-relaxed">
            Kopi hangat, obrolan panjang, <br className="hidden md:block" />
            dan sudut yang bikin betah berjam-jam.
          </p>
        </motion.div>

        {/* Main Container */}
        <div className="relative flex items-center justify-center w-full h-full">
          {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const lineSpacing = 70;
              const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
              const lineX = i * lineSpacing - lineTotalWidth / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);

              // A. Calculate Circle Position
              // Mobile gets its own (smaller) radius + base card scale so the
              // ring of photos and the centered heading both fit within a
              // narrow viewport — desktop keeps the original numbers.
              const circleRadius = isMobile
                ? Math.min(minDimension * 0.28, 130)
                : Math.min(minDimension * 0.35, 350);
              const circleBaseScale = isMobile ? 0.65 : 1;
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              // B. Calculate Bottom Arc Position
              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);

              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY = arcApexY + arcRadius;

              const spreadAngle = isMobile ? 100 : 130;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_IMAGES - 1);

              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const maxRotation = spreadAngle * 0.8;
              const boundedRotation = -scrollProgress * maxRotation;

              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.4 : 1.8,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(circleBaseScale, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={i}
                src={src}
                index={i}
                total={TOTAL_IMAGES}
                phase={introPhase}
                target={target}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
