import type { ElementType, ReactNode } from "react";

/**
 * Memory Coffee's "mixed typography" pattern: bold uppercase Figtree for the
 * main words, Caveat script (amber, slightly smaller, gently slanted) for
 * connector words tucked in between — e.g. "SETIAP momen JADI kenangan".
 */
export type MixedSegment = {
  text: string;
  variant?: "sans" | "script";
};

const BASE_HEADLINE =
  "font-display font-extrabold uppercase tracking-[0.02em] leading-[1.05] text-cream";

/**
 * Renders just the segment spans (no wrapping heading tag). Use this when the
 * heading itself needs to be something other than a plain <h1>-<h4> — e.g.
 * wrapped in a framer-motion component — so the mixed sans/script markup
 * doesn't have to be duplicated by hand.
 */
export function renderMixedSegments(
  segments: MixedSegment[],
  scriptClassName = ""
): ReactNode {
  return segments.map((seg, i) => (
    <span key={i}>
      {i > 0 && " "}
      {seg.variant === "script" ? (
        <span
          className={`inline-block -skew-x-6 translate-y-[0.05em] align-baseline whitespace-nowrap font-script text-[0.72em] font-semibold normal-case tracking-normal text-terracotta ${scriptClassName}`}
        >
          {seg.text}
        </span>
      ) : (
        seg.text
      )}
    </span>
  ));
}

type MixedHeadingProps = {
  segments: MixedSegment[];
  as?: ElementType;
  className?: string;
  scriptClassName?: string;
  [key: `data-${string}`]: unknown;
};

export default function MixedHeading({
  segments,
  as: Tag = "h2",
  className = "",
  scriptClassName = "",
  ...rest
}: MixedHeadingProps) {
  return (
    <Tag className={`${BASE_HEADLINE} ${className}`} {...rest}>
      {renderMixedSegments(segments, scriptClassName)}
    </Tag>
  );
}
