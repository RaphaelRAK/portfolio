"use client";

import { motion } from "framer-motion";

export function BrowserPreview({ url, displayUrl }: { url: string; displayUrl: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      className="hidden lg:block shrink-0"
      style={{ width: 360 }}
    >
      <div className="rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl shadow-black/60">
        {/* Browser chrome */}
        <div className="px-3 py-2.5 bg-zinc-800 border-b border-zinc-700 flex items-center gap-2.5">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 bg-zinc-900 rounded-md px-2.5 py-1 flex items-center gap-1.5 min-w-0">
            <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 shrink-0 text-emerald-400">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 2a9 9 0 0 1 0 12M8 2a9 9 0 0 0 0 12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="text-[10px] text-zinc-400 font-mono truncate">{displayUrl}</span>
          </div>
          <div className="flex gap-1 shrink-0">
            <span className="w-3.5 h-3.5 rounded-sm bg-zinc-700" />
            <span className="w-3.5 h-3.5 rounded-sm bg-zinc-700" />
          </div>
        </div>

        {/* Iframe viewport */}
        <div className="relative overflow-hidden bg-white" style={{ height: 340 }}>
          <iframe
            src={url}
            title="Plüm Services — aperçu du site"
            className="absolute top-0 left-0 border-none"
            style={{
              width: "154%",
              height: "154%",
              transform: "scale(0.65)",
              transformOrigin: "top left",
              pointerEvents: "none",
            }}
            loading="lazy"
          />
          {/* Hover overlay — link to site */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 hover:opacity-100 transition-opacity duration-200"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)" }}
          >
            <span className="text-xs bg-white text-zinc-900 font-semibold px-3 py-1.5 rounded-full shadow-lg">
              Visiter le site →
            </span>
          </a>
        </div>
      </div>

      {/* Caption */}
      <p className="text-xs text-zinc-600 text-center mt-2 tracking-wide">
        plumservices.co
      </p>
    </motion.div>
  );
}
