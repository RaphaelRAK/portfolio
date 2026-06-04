"use client";

interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
  /** Larger gap between items — for big display text */
  wide?: boolean;
}

export function Marquee({
  children,
  reverse = false,
  className = "",
  wide = false,
}: MarqueeProps) {
  return (
    <div className={`marquee-wrapper ${className}`} aria-hidden>
      <div
        className={`marquee-track ${reverse ? "marquee-track-reverse" : ""} ${
          wide ? "marquee-track-wide" : ""
        }`}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
