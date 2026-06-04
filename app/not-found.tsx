import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--color-bg)]">
      <p className="section-label mb-4">404</p>
      <h1 className="heading-xl font-display text-[var(--color-text)] text-center mb-8">
        Page introuvable
      </h1>
      <Link href="/" className="btn-primary">
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
