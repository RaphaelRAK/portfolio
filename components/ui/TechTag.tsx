"use client";

import { getTechLogo } from "@/lib/devicon";

interface TechTagProps {
  name: string;
  variant?: "default" | "compact";
}

export function TechTag({ name, variant = "default" }: TechTagProps) {
  const logo = getTechLogo(name);

  if (variant === "compact") {
    return (
      <span
        className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] tracking-wide px-2 py-0.5 cursor-default"
        style={{
          border: "1px solid var(--color-border)",
          color: "var(--color-text-muted)",
        }}
      >
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" aria-hidden width={12} height={12} style={{ objectFit: "contain", flexShrink: 0 }} />
        )}
        {name}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono tracking-wide transition-all duration-150 cursor-default"
      style={{
        fontSize: 13,
        padding: "5px 12px",
        borderRadius: 6,
        backgroundColor: "var(--color-surface-2)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text-muted)",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLSpanElement;
        el.style.backgroundColor = "var(--color-surface)";
        el.style.color = "var(--color-text)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLSpanElement;
        el.style.backgroundColor = "var(--color-surface-2)";
        el.style.color = "var(--color-text-muted)";
      }}
    >
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="" aria-hidden width={16} height={16} style={{ objectFit: "contain", flexShrink: 0 }} />
      )}
      {name}
    </span>
  );
}
