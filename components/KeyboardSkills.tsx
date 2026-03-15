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
  SiReactquery,
  SiFigma,
  SiStorybook,
} from "react-icons/si";
import { Globe, Server, Cpu, Mic } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";

type AnyIcon = IconType | LucideIcon;

// ─── Skill registry ───────────────────────────────────────────────────────────
const skillMap: Record<string, { Icon: AnyIcon; color: string }> = {
  "React Native":    { Icon: SiReact,          color: "#61dafb" },
  "Next.js":         { Icon: SiNextdotjs,       color: "#111111" },
  "React":           { Icon: SiReact,           color: "#61dafb" },
  "TypeScript":      { Icon: SiTypescript,      color: "#3178c6" },
  "Tailwind CSS":    { Icon: SiTailwindcss,     color: "#38bdf8" },
  "Redux Toolkit":   { Icon: SiRedux,           color: "#764abc" },
  "React Query":     { Icon: SiReactquery,      color: "#ff4154" },
  "NestJS":          { Icon: SiNestjs,          color: "#e0234e" },
  "REST":            { Icon: Globe,             color: "#6366f1" },
  "PostgreSQL":      { Icon: SiPostgresql,      color: "#4169e1" },
  "Supabase":        { Icon: SiSupabase,        color: "#3ecf8e" },
  "Docker":          { Icon: SiDocker,          color: "#2496ed" },
  "Docker Compose":  { Icon: SiDocker,          color: "#2496ed" },
  "Nginx":           { Icon: SiNginx,           color: "#009900" },
  "Scaleway":        { Icon: SiScaleway,        color: "#7f3fbf" },
  "GitHub Actions":  { Icon: SiGithubactions,   color: "#2088ff" },
  "Serveur dédié":   { Icon: Server,            color: "#64748b" },
  "Stripe":          { Icon: SiStripe,          color: "#635bff" },
  "Firebase / FCM":  { Icon: SiFirebase,        color: "#ff9800" },
  "Mailjet":         { Icon: Cpu,               color: "#21a7e0" },
  "n8n":             { Icon: SiN8N,             color: "#ef6a00" },
  "ElevenLabs":      { Icon: Mic,               color: "#111111" },
  "Figma":           { Icon: SiFigma,           color: "#f24e1e" },
  "Storybook":       { Icon: SiStorybook,       color: "#ff4785" },
  "JavaScript":      { Icon: SiJavascript,      color: "#f7df1e" },
  "Python":          { Icon: SiPython,          color: "#3776ab" },
  "Java":            { Icon: Cpu,               color: "#f89820" },
  "C":               { Icon: Cpu,               color: "#a8b9cc" },
};

// Rows with QWERTY-style left offset (px)
const rows = [
  { names: ["React Native", "Next.js", "React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "React Query"], offset: 0  },
  { names: ["NestJS", "REST", "PostgreSQL", "Supabase", "Docker", "Docker Compose"],                            offset: 18 },
  { names: ["Nginx", "Scaleway", "GitHub Actions", "Serveur dédié", "Stripe", "Firebase / FCM"],                offset: 36 },
  { names: ["Mailjet", "n8n", "ElevenLabs", "Figma", "Storybook"],                                              offset: 24 },
  { names: ["JavaScript", "Python", "Java", "C"],                                                               offset: 10 },
];

// Box-shadow constants
const S_UP =
  "0 0 0 1.5px #c0c0c0, 0 5px 0 0 #a8a8a8, 0 8px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.95)";
const S_DOWN =
  "0 0 0 1.5px #c0c0c0, 0 1px 0 0 #a8a8a8, 0 2px 6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)";

// ─── Single key ───────────────────────────────────────────────────────────────
function Key({
  name,
  Icon,
  color,
  index,
}: {
  name: string;
  Icon: AnyIcon;
  color: string;
  index: number;
}) {
  function press(e: MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.transform = "translateY(4px)";
    e.currentTarget.style.boxShadow = S_DOWN;
  }
  function release(e: MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.boxShadow = S_UP;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.82 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: index * 0.028 }}
      className="w-[100px] h-[100px] shrink-0 flex flex-col items-center justify-center gap-1.5 rounded-[16px] cursor-default select-none"
      style={{
        background: "linear-gradient(180deg,#ffffff 0%,#f2f2f2 100%)",
        boxShadow: S_UP,
        transition: "transform 80ms ease, box-shadow 80ms ease",
      }}
      onMouseEnter={press}
      onMouseLeave={release}
    >
      <Icon style={{ color, width: 36, height: 36, fontSize: 36 }} />
      <span className="text-[10.5px] font-semibold text-zinc-700 text-center leading-tight px-2 max-w-full">
        {name}
      </span>
    </motion.div>
  );
}

// ─── Keyboard layout ──────────────────────────────────────────────────────────
export function KeyboardSkills() {
  let idx = 0;

  return (
    <div
      className="rounded-2xl p-6 pb-12 overflow-x-auto"
      style={{
        background: "linear-gradient(175deg, #e4e4e4 0%, #cccccc 100%)",
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -3px 0 rgba(0,0,0,0.14)",
      }}
    >
      <div className="space-y-[10px] min-w-max">
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-[10px]" style={{ marginLeft: row.offset }}>
            {row.names.map((name) => {
              const skill = skillMap[name];
              if (!skill) return null;
              const i = idx++;
              return <Key key={name} name={name} Icon={skill.Icon} color={skill.color} index={i} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
