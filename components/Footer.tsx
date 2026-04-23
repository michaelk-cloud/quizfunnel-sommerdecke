import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-cream)] border-t border-[var(--color-border)] mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-[var(--color-muted)]">
        <div className="flex flex-wrap items-center gap-6">
          <span className="font-serif text-[var(--color-navy)] text-lg">
            Schlafen wie auf Wolken
          </span>
          <nav className="flex flex-wrap gap-5 ml-auto">
            <Link href="/impressum" className="hover:text-[var(--color-navy)]">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-[var(--color-navy)]">
              Datenschutz
            </Link>
            <a
              href="https://befa-limburg.de"
              target="_blank"
              rel="noopener"
              className="hover:text-[var(--color-navy)]"
            >
              befa-limburg.de
            </a>
          </nav>
        </div>
        <p className="mt-4 text-xs leading-relaxed">
          © {new Date().getFullYear()} Quizfunnel für BEFA Limburg – Handgefertigte
          Bettwaren aus Deutschland. Die empfohlenen Decken werden direkt bei
          befa-limburg.de gekauft.
        </p>
      </div>
    </footer>
  );
}
