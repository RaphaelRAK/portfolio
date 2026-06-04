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
      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-[var(--color-border)] text-muted bg-[var(--color-bg)]">
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" aria-hidden width={12} height={12} style={{ objectFit: "contain" }} />
        )}
        {name}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-[var(--color-border)] text-muted bg-[var(--color-surface-2)]">
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="" aria-hidden width={14} height={14} style={{ objectFit: "contain" }} />
      )}
      {name}
    </span>
  );
}
