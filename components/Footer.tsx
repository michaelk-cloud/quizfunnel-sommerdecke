import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[var(--color-offwhite)] border-t border-[var(--color-border)] mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-[var(--color-muted)]">
        <div className="flex flex-wrap items-center gap-6">
          <Image
            src="/befa-logo.png"
            alt="BEFA Limburg Bettwarenfabrik GmbH"
            width={120}
            height={48}
            className="h-8 w-auto"
          />
          <nav className="flex flex-wrap gap-5 ml-auto">
            <Link href="/impressum" className="hover:text-[var(--color-ink)]">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-[var(--color-ink)]">
              Datenschutz
            </Link>
            <a
              href="https://befa-limburg.de"
              target="_blank"
              rel="noopener"
              className="hover:text-[var(--color-ink)]"
            >
              befa-limburg.de
            </a>
          </nav>
        </div>
        <p className="mt-4 text-xs leading-relaxed">
          © {new Date().getFullYear()} BEFA Limburg Bettwarenfabrik GmbH – Handgefertigte
          Bettwaren aus Deutschland seit 1923. Die empfohlenen Decken werden direkt bei
          befa-limburg.de bestellt.
        </p>
      </div>
    </footer>
  );
}
