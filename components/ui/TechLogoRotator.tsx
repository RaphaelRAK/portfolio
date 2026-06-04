"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getTechLogo } from "@/lib/devicon";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface TechLogoRotatorProps {
  technologies: string[];
  intervalMs?: number;
}

export function TechLogoRotator({
  technologies,
  intervalMs = 2400,
}: TechLogoRotatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (technologies.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % technologies.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [technologies.length, intervalMs]);

  const currentTech = technologies[activeIndex];
  const logoUrl = getTechLogo(currentTech);

  return (
    <span
      className="relative inline-flex align-middle overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-sm"
      style={{ width: "0.92em", height: "0.92em" }}
      aria-hidden
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentTech}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt=""
              style={{ width: "0.55em", height: "0.55em", objectFit: "contain" }}
            />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
