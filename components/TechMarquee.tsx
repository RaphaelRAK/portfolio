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
import { Server } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

type AnyIcon = IconType | LucideIcon;

const items: { name: string; Icon: AnyIcon; color: string }[] = [
  { name: "React Native",   Icon: SiReact,          color: "#61dafb" },
  { name: "Next.js",        Icon: SiNextdotjs,      color: "#111111" },
  { name: "TypeScript",     Icon: SiTypescript,     color: "#3178c6" },
  { name: "NestJS",         Icon: SiNestjs,         color: "#e0234e" },
  { name: "PostgreSQL",     Icon: SiPostgresql,     color: "#4169e1" },
  { name: "Supabase",       Icon: SiSupabase,       color: "#3ecf8e" },
  { name: "Docker",         Icon: SiDocker,         color: "#2496ed" },
  { name: "GitHub Actions", Icon: SiGithubactions,  color: "#2088ff" },
  { name: "Tailwind CSS",   Icon: SiTailwindcss,    color: "#38bdf8" },
  { name: "React",          Icon: SiReact,          color: "#61dafb" },
  { name: "Scaleway",       Icon: SiScaleway,       color: "#7f3fbf" },
  { name: "Stripe",         Icon: SiStripe,         color: "#635bff" },
  { name: "Redux Toolkit",  Icon: SiRedux,          color: "#764abc" },
  { name: "React Query",    Icon: SiReactquery,     color: "#ff4154" },
  { name: "Nginx",          Icon: SiNginx,          color: "#009900" },
  { name: "JavaScript",     Icon: SiJavascript,     color: "#f7df1e" },
  { name: "Python",         Icon: SiPython,         color: "#3776ab" },
  { name: "Figma",          Icon: SiFigma,          color: "#f24e1e" },
  { name: "Storybook",      Icon: SiStorybook,      color: "#ff4785" },
  { name: "n8n",            Icon: SiN8N,            color: "#ef6a00" },
  { name: "Firebase / FCM", Icon: SiFirebase,       color: "#ff9800" },
  { name: "Serveur dédié",  Icon: Server,           color: "#64748b" },
];

// Duplicate for seamless loop
const track = [...items, ...items];

export function TechMarquee() {
  return (
    <div className="overflow-hidden py-6 border-y border-zinc-100 bg-white select-none">
      <motion.div
        className="flex gap-10 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {track.map((item, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <item.Icon
              style={{ color: item.color, width: 18, height: 18, fontSize: 18 }}
            />
            <span className="text-sm font-medium text-zinc-600 whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
