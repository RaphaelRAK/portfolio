"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/metadata";
import posthog from "posthog-js";

const navLinks = [
  { label: "Parcours", href: "#experience" },
  { label: "Projets", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

const CV_PATH = "/CV_Raphael_Rakotonaivo.pdf";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(247,245,240,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        }}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-display text-xl font-light tracking-widest text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-300"
          >
            RAR
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="section-label transition-colors duration-200 cursor-pointer relative"
                    style={{ color: isActive ? "var(--color-text)" : "var(--color-text-muted)" }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--color-accent)]"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right actions desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={CV_PATH}
              download
              className="section-label text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200 flex items-center gap-1.5"
              onClick={() => posthog.capture("cv_downloaded", { source: "navbar" })}
            >
              CV
              <span className="text-[10px] opacity-60">↓</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="section-label border border-[var(--color-accent)] text-[var(--color-accent)] px-4 py-2 hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-200"
              onClick={() => posthog.capture("nav_contact_clicked")}
            >
              Me contacter
            </a>
          </div>

          {/* Hamburger mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className="block w-6 h-px bg-[var(--color-text)] transition-all duration-300 origin-center"
              style={menuOpen ? { transform: "rotate(45deg) translate(3px, 3px)" } : {}}
            />
            <span
              className="block w-6 h-px bg-[var(--color-text)] transition-all duration-300"
              style={menuOpen ? { opacity: 0 } : {}}
            />
            <span
              className="block w-6 h-px bg-[var(--color-text)] transition-all duration-300 origin-center"
              style={menuOpen ? { transform: "rotate(-45deg) translate(3px, -3px)" } : {}}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ backgroundColor: "var(--color-bg)" }}
          >
            <ul className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className="font-display text-5xl font-light transition-colors duration-200 cursor-pointer"
                    style={{
                      color: activeSection === link.href.slice(1)
                        ? "var(--color-accent)"
                        : "var(--color-text)",
                    }}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-4"
              >
                <a
                  href={CV_PATH}
                  download
                  className="section-label text-[var(--color-text-muted)]"
                  onClick={() => { setMenuOpen(false); posthog.capture("cv_downloaded", { source: "mobile_menu" }); }}
                >
                  Télécharger mon CV ↓
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="section-label text-[var(--color-accent)]"
                  onClick={() => { setMenuOpen(false); posthog.capture("nav_contact_clicked", { source: "mobile_menu" }); }}
                >
                  {siteConfig.email}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
