import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 bg-[var(--color-bg)]">
      {/* Halos colorés */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[28rem] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 30% 50%, rgba(46,91,255,0.12), transparent 70%), radial-gradient(ellipse 45% 55% at 70% 50%, rgba(244,63,94,0.08), transparent 70%)",
        }}
      />

      <p
        className="font-display text-[clamp(6rem,20vw,12rem)] font-bold leading-none tracking-tighter bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(92deg, #2e5bff 15%, #0ea5e9 60%, #10b981 100%)",
        }}
      >
        404
      </p>

      <h1 className="heading-md mt-4 text-center font-display text-[var(--color-text)]">
        Cette page n&apos;existe pas.
      </h1>
      <p className="mt-3 max-w-sm text-center text-sm leading-relaxed text-muted">
        Le lien est peut-être cassé, ou la page a été déplacée pendant le redesign.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary">
          Retour à l&apos;accueil
        </Link>
        <Link href="/#projects" className="btn-secondary">
          Voir les projets
        </Link>
      </div>
    </main>
  );
}
