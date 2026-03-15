"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNestjs,
  SiPostgresql,
  SiSupabase,
  SiDocker,
  SiNginx,
  SiGithubactions,
  SiStripe,
  SiFirebase,
  SiJavascript,
  SiPython,
  SiScaleway,
  SiN8N,
  SiRedux,
} from "react-icons/si";
import { Globe, Server, Cpu, Mic } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";

type AnyIcon = IconType | LucideIcon;

interface Skill {
  name: string;
  Icon?: AnyIcon;
  iconColor?: string;
}

interface Group {
  label: string;
  bg: string;
  border: string;
  shadow: string;
  labelColor: string;
  skills: Skill[];
}

const groups: Group[] = [
  {
    label: "Mobile & Web",
    bg: "#f5f7ff",
    border: "#c7d2fe",
    shadow: "#a5b4fc",
    labelColor: "#4f46e5",
    skills: [
      { name: "React Native", Icon: SiReact, iconColor: "#61dafb" },
      { name: "Next.js", Icon: SiNextdotjs, iconColor: "#111" },
      { name: "React", Icon: SiReact, iconColor: "#61dafb" },
      { name: "TypeScript", Icon: SiTypescript, iconColor: "#3178c6" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, iconColor: "#38bdf8" },
      { name: "Redux Toolkit", Icon: SiRedux, iconColor: "#764abc" },
    ],
  },
  {
    label: "Backend",
    bg: "#f8f5ff",
    border: "#ddd6fe",
    shadow: "#c4b5fd",
    labelColor: "#7c3aed",
    skills: [
      { name: "NestJS", Icon: SiNestjs, iconColor: "#e0234e" },
      { name: "REST", Icon: Globe, iconColor: "#6366f1" },
      { name: "PostgreSQL", Icon: SiPostgresql, iconColor: "#4169e1" },
      { name: "Supabase", Icon: SiSupabase, iconColor: "#3ecf8e" },
    ],
  },
  {
    label: "Infrastructure & DevOps",
    bg: "#f0fdf8",
    border: "#a7f3d0",
    shadow: "#6ee7b7",
    labelColor: "#059669",
    skills: [
      { name: "Docker", Icon: SiDocker, iconColor: "#2496ed" },
      { name: "Docker Compose", Icon: SiDocker, iconColor: "#2496ed" },
      { name: "Nginx", Icon: SiNginx, iconColor: "#009900" },
      { name: "Scaleway", Icon: SiScaleway, iconColor: "#7f3fbf" },
      { name: "GitHub Actions", Icon: SiGithubactions, iconColor: "#2088ff" },
      { name: "Serveur dédié", Icon: Server, iconColor: "#64748b" },
    ],
  },
  {
    label: "Outils tiers",
    bg: "#fffdf0",
    border: "#fde68a",
    shadow: "#fbbf24",
    labelColor: "#d97706",
    skills: [
      { name: "Stripe", Icon: SiStripe, iconColor: "#635bff" },
      { name: "Firebase / FCM", Icon: SiFirebase, iconColor: "#ff9800" },
      { name: "Mailjet", Icon: Cpu, iconColor: "#21a7e0" },
      { name: "n8n", Icon: SiN8N, iconColor: "#ef6a00" },
      { name: "ElevenLabs", Icon: Mic, iconColor: "#111" },
    ],
  },
  {
    label: "Langages",
    bg: "#fafafa",
    border: "#e4e4e7",
    shadow: "#d4d4d8",
    labelColor: "#52525b",
    skills: [
      { name: "JavaScript", Icon: SiJavascript, iconColor: "#f7df1e" },
      { name: "TypeScript", Icon: SiTypescript, iconColor: "#3178c6" },
      { name: "Python", Icon: SiPython, iconColor: "#3776ab" },
      { name: "Java", Icon: Cpu, iconColor: "#f89820" },
      { name: "C", Icon: Cpu, iconColor: "#a8b9cc" },
    ],
  },
];

function Key({
  name,
  Icon,
  iconColor,
  bg,
  border,
  shadow,
  index,
}: Skill & { bg: string; border: string; shadow: string; index: number }) {
  function handleEnter(e: MouseEvent<HTMLSpanElement>) {
    const el = e.currentTarget;
    el.style.transform = "translateY(4px)";
    el.style.boxShadow = `0 0px 0 0 ${shadow}`;
  }
  function handleLeave(e: MouseEvent<HTMLSpanElement>) {
    const el = e.currentTarget;
    el.style.transform = "translateY(0px)";
    el.style.boxShadow = `0 4px 0 0 ${shadow}`;
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 12, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: index * 0.035 }}
      className="inline-flex flex-col items-center justify-center gap-1.5 px-4 py-3 min-w-[72px] rounded-xl cursor-default select-none"
      style={{
        background: bg,
        border: `1.5px solid ${border}`,
        boxShadow: `0 4px 0 0 ${shadow}`,
        transition: "transform 80ms ease, box-shadow 80ms ease",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {Icon && (
        <Icon
          className="w-5 h-5 shrink-0"
          style={{ color: iconColor ?? "#52525b" }}
        />
      )}
      <span className="text-xs font-semibold text-zinc-700 whitespace-nowrap leading-none">
        {name}
      </span>
    </motion.span>
  );
}

export function KeyboardSkills() {
  let globalIdx = 0;

  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <div key={g.label}>
          <p
            className="text-xs font-bold tracking-widest uppercase mb-5"
            style={{ color: g.labelColor }}
          >
            {g.label}
          </p>
          <div className="flex flex-wrap gap-3">
            {g.skills.map((s) => {
              const idx = globalIdx++;
              return (
                <Key
                  key={s.name}
                  {...s}
                  bg={g.bg}
                  border={g.border}
                  shadow={g.shadow}
                  index={idx}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
