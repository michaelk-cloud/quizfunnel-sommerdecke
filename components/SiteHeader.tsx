import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="bg-white border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center">
        <Link href="/sommerdecke" aria-label="BEFA Limburg – Startseite">
          <Image
            src="/befa-logo.png"
            alt="BEFA Limburg Bettwarenfabrik GmbH"
            width={120}
            height={48}
            priority
            className="h-8 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
