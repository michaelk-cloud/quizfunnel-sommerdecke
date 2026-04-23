import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-[var(--color-cream)]">
        <div className="mx-auto max-w-5xl px-6 pt-14 pb-20 sm:pt-20 sm:pb-28 text-center">
          <p className="trust-chip justify-center mb-6">
            <span>✦</span> Made in Germany – seit 1923
          </p>
          <h1 className="font-serif text-[var(--color-navy)] mb-5">
            Finde deine perfekte Sommerdecke
            <br />
            <span className="italic text-[var(--color-accent-dark)]">in 90 Sekunden.</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-[var(--color-muted)] mb-10">
            Beantworte 9 kurze Fragen. Unser Algorithmus vergleicht deine Schlafgewohnheiten
            mit dem BEFA-Sortiment und empfiehlt dir die drei passendsten Sommerdecken –
            inklusive 10 % Gutschein.
          </p>
          <Link href="/quiz" className="btn-primary text-base">
            Quiz starten – kostenlos
          </Link>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <Trust label="Oeko-Tex" />
            <Trust label="Downpass" />
            <Trust label="Handgefertigt" />
            <Trust label="Seit 1923" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-serif text-[var(--color-navy)] text-center mb-14">
          Wie das Matching funktioniert
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Step number="1" title="9 Fragen beantworten">
            Wir fragen nach Schlaftemperatur, Materialpräferenz, Allergien, Bettgröße und
            Budget. Dauert keine 90 Sekunden.
          </Step>
          <Step number="2" title="Drei Decken-Matches erhalten">
            Unser Algorithmus gewichtet deine Antworten und zeigt dir die drei besten
            BEFA-Decken für deine Schlafsituation.
          </Step>
          <Step number="3" title="10 % Gutschein sichern">
            Email eintragen, Rabattcode erhalten und direkt bei befa-limburg.de bestellen –
            handgefertigt in Limburg.
          </Step>
        </div>
      </section>

      <section className="bg-[var(--color-navy)] text-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif mb-5">Schlafen wie auf Wolken ist kein Zufall.</h2>
          <p className="text-white/80 text-lg mb-8">
            Die falsche Decke ist der häufigste Grund für unruhigen Sommerschlaf. Wir
            helfen dir, in wenigen Minuten die richtige zu finden.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-white text-[var(--color-navy)] px-6 py-3 rounded-[4px] font-medium hover:bg-[var(--color-cream)] transition-colors"
          >
            Jetzt Quiz starten →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Trust({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-10 w-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent-dark)]">
        ✦
      </div>
      <span className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </span>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-6">
      <div className="font-serif text-4xl text-[var(--color-accent-dark)] mb-3">
        {number}
      </div>
      <h3 className="font-serif text-2xl mb-2 text-[var(--color-navy)]">{title}</h3>
      <p className="text-[var(--color-muted)] leading-relaxed">{children}</p>
    </div>
  );
}
