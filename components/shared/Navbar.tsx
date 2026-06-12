"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/metadata";
import posthog from "posthog-js";
import { ExpandableTabs, type TabItem } from "@/components/ui/expandable-tabs";
import {
  BriefcaseBusiness,
  FolderOpen,
  Layers,
  MessageCircleQuestion,
  Mail,
} from "lucide-react";

const navLinks = [
  { label: "Parcours", href: "#experience" },
  { label: "Projets", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "FAQ", href: "#faq" },
];

const navTabs: TabItem[] = [
  { title: "Parcours", icon: BriefcaseBusiness },
  { title: "Projets", icon: FolderOpen },
  { title: "Stack", icon: Layers },
  { title: "FAQ", icon: MessageCircleQuestion },
  { type: "separator" },
  { title: "Contact", icon: Mail },
];

const tabTargets = ["#experience", "#projects", "#stack", "#faq", null, "#contact"];

const CV_PATH = "/CV_Raphael_Rakotonaivo.pdf";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        }}
      >
        <nav className="container-hanzo flex items-center justify-between py-4 md:py-5">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="pill-white text-base hover:opacity-80 transition-opacity"
          >
            RAR<span className="text-muted font-normal">.dev</span>
          </a>

          <div className="hidden md:block">
            <ExpandableTabs
              tabs={navTabs}
              onChange={(index) => {
                if (index === null) return;
                const target = tabTargets[index];
                if (target) handleNav(target);
              }}
            />
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={CV_PATH}
              download
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              onClick={() => posthog.capture("cv_downloaded", { source: "navbar" })}
            >
              CV ↓
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="btn-primary text-sm py-2.5 px-5"
              onClick={() => posthog.capture("nav_contact_clicked")}
            >
              Me contacter
            </a>
          </div>

          <button
            className="md:hidden flex flex-col items-center justify-center gap-1.5 w-11 h-11 rounded-full bg-[var(--color-surface)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className="block w-6 h-0.5 bg-[var(--color-text)] transition-all duration-300"
              style={menuOpen ? { transform: "rotate(45deg) translate(4px, 4px)" } : {}}
            />
            <span
              className="block w-6 h-0.5 bg-[var(--color-text)] transition-all duration-300"
              style={menuOpen ? { opacity: 0 } : {}}
            />
            <span
              className="block w-6 h-0.5 bg-[var(--color-text)] transition-all duration-300"
              style={menuOpen ? { transform: "rotate(-45deg) translate(4px, -4px)" } : {}}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--color-bg)] px-6"
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className="font-display text-4xl text-[var(--color-text)] cursor-pointer"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col items-center gap-4 mt-4"
              >
                <a href={CV_PATH} download className="btn-secondary" onClick={() => setMenuOpen(false)}>
                  Télécharger le CV
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="btn-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Me contacter
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
