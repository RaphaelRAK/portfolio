import { siteConfig } from "@/lib/metadata";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-2xl font-light tracking-widest text-[var(--color-text-muted)]">
          RAR
        </p>

        <div className="flex items-center gap-6">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="section-label hover:text-[var(--color-text)] transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteConfig.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="section-label hover:text-[var(--color-text)] transition-colors"
          >
            GitLab
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="section-label hover:text-[var(--color-text)] transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <p className="section-label text-[var(--color-text-muted)]">
          La Réunion · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
