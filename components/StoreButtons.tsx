"use client";

import { useEffect, useState } from "react";

type Platform = "ios" | "android" | "other";

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0">
      <path d="M3 20.5v-17c0-.83.93-1.3 1.6-.8l14 8.5c.63.38.63 1.32 0 1.7l-14 8.5c-.67.5-1.6.03-1.6-.9z" />
    </svg>
  );
}

export function StoreButtons() {
  const [platform, setPlatform] = useState<Platform>("other");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setPlatform("ios");
    } else if (/android/.test(ua)) {
      setPlatform("android");
    }
  }, []);

  const showAndroid = platform === "android" || platform === "other";
  const showIOS = platform === "ios" || platform === "other";

  return (
    <div className="flex flex-wrap gap-3 mt-8">
      {showAndroid && (
        <a
          href="https://play.google.com/store/apps/details?id=com.plumservices.plum.prod"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 transition-colors text-white px-5 py-3 rounded-2xl border border-zinc-700"
        >
          <PlayIcon />
          <div className="text-left">
            <p className="text-xs text-zinc-400 leading-none mb-0.5">Disponible sur</p>
            <p className="text-sm font-semibold leading-tight">Google Play</p>
          </div>
        </a>
      )}
      {showIOS && (
        <a
          href="https://apps.apple.com/fr/app/pl%C3%BCm-services/id6751805941"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 transition-colors text-white px-5 py-3 rounded-2xl border border-zinc-700"
        >
          <AppleIcon />
          <div className="text-left">
            <p className="text-xs text-zinc-400 leading-none mb-0.5">Disponible sur</p>
            <p className="text-sm font-semibold leading-tight">App Store</p>
          </div>
        </a>
      )}
    </div>
  );
}
