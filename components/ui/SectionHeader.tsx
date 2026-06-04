"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealWords } from "@/components/ui/Reveal";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  animated?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className = "",
  animated = true,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isCenter = align === "center";

  return (
    <motion.div
      ref={ref}
      initial={animated ? { opacity: 0, y: 20 } : false}
      animate={animated && inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`section-header ${isCenter ? "section-header-center" : "section-header-left"} ${className}`}
    >
      <SectionLabel>{label}</SectionLabel>
      <h2 className="heading-lg font-display text-[var(--color-text)] section-header-title">
        <RevealWords text={title} />
      </h2>
      {description && (
        <p className="section-header-desc text-muted text-base leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
