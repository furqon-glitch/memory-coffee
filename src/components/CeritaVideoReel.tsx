import { useState } from "react";

const VIDEOS = [
  "/cerita-1.mp4",
  "/cerita-2.mp4",
  "/cerita-3.mp4",
  "/cerita-4.mp4",
  "/cerita-5.mp4",
  "/cerita-6.mp4",
];

export default function CeritaVideoReel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      data-reveal
      className="relative aspect-video w-full overflow-hidden rounded-3xl border border-cream/10 bg-ink"
    >
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            i === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
      ))}

      {/* Thumbnail nav — subtle, WatchHouse-style number picker */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-0.5 rounded-full border border-white/10 bg-black/30 px-2 py-1.5 backdrop-blur-md sm:bottom-5 sm:left-5 sm:px-2.5">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Tampilkan video ${i + 1}`}
            aria-current={i === activeIndex}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full px-1.5 py-1 font-body text-[11px] tracking-wide transition-colors sm:px-2 ${
              i === activeIndex
                ? "font-medium text-amber"
                : "font-light text-white/60 hover:text-white/80"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </div>
  );
}
