import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <p className="section-label text-[var(--color-accent)] mb-4">404</p>
      <h1
        className="font-display font-light text-[var(--color-text)] text-center mb-8"
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
      >
        Page introuvable
      </h1>
      <Link
        href="/"
        className="section-label border border-[var(--color-accent)] text-[var(--color-accent)] px-6 py-3 hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-200"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
