"use client";

import { motion } from "framer-motion";
import { getTechLogo } from "@/lib/devicon";

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
};

const pill = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

interface ProjectStackProps {
  items: string[];
}

export default function ProjectStack({ items }: ProjectStackProps) {
  return (
    <motion.div
      className="flex flex-wrap gap-3"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {items.map((tech) => {
        const iconUrl = getTechLogo(tech);
        return (
          <motion.span
            key={tech}
            variants={pill}
            whileHover={{ y: -2, transition: { duration: 0.2, ease: EASE } }}
            className="group section-label inline-flex items-center gap-2.5 px-4 py-2 cursor-default"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            {iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={iconUrl}
                alt=""
                width={18}
                height={18}
                className="w-[18px] h-[18px] opacity-85 shrink-0 transition-transform duration-200 group-hover:scale-110"
              />
            ) : null}
            {tech}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
