export const metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-[var(--color-navy)] mb-8">Impressum</h1>

      <section className="mb-8">
        <h2 className="font-serif text-xl text-[var(--color-navy)] mb-3">
          Angaben gemäß § 5 TMG
        </h2>
        <address className="not-italic text-[var(--color-ink)] leading-relaxed">
          <strong>BEFA Limburg Bettwarenfabrik GmbH</strong>
          <br />
          Zum Sauerborn 22
          <br />
          65551 Limburg / Lindenholzhausen
          <br />
          Deutschland
        </address>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-xl text-[var(--color-navy)] mb-3">Vertreten durch</h2>
        <p className="text-[var(--color-ink)]">Geschäftsführer: Marco Zander</p>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-xl text-[var(--color-navy)] mb-3">Kontakt</h2>
        <p className="text-[var(--color-ink)] leading-relaxed">
          Telefon: +49 6431 975 4460
          <br />
          E-Mail:{" "}
          <a href="mailto:info@befa-limburg.de" className="underline">
            info@befa-limburg.de
          </a>
          <br />
          Web: <a href="https://befa-limburg.de" className="underline">befa-limburg.de</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-xl text-[var(--color-navy)] mb-3">Registereintrag</h2>
        <p className="text-[var(--color-ink)] leading-relaxed">
          Eintragung im Handelsregister
          <br />
          Registergericht: Amtsgericht Limburg
          <br />
          Registernummer: HRB 3845
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-xl text-[var(--color-navy)] mb-3">
          Umsatzsteuer-ID
        </h2>
        <p className="text-[var(--color-ink)]">
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
          <br />
          <strong>DE814547756</strong>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-xl text-[var(--color-navy)] mb-3">
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
        </h2>
        <address className="not-italic text-[var(--color-ink)] leading-relaxed">
          Marco Zander
          <br />
          Zum Sauerborn 22
          <br />
          65551 Limburg / Lindenholzhausen
        </address>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-xl text-[var(--color-navy)] mb-3">
          Streitschlichtung
        </h2>
        <p className="text-[var(--color-ink)] leading-relaxed">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
          (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          . Unsere E-Mail-Adresse findest du oben im Impressum. Wir sind nicht bereit
          oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-[var(--color-navy)] mb-3">
          Bildnachweis
        </h2>
        <p className="text-[var(--color-ink)] leading-relaxed text-sm">
          Produktbilder: BEFA Limburg Bettwarenfabrik GmbH. Weitere Bildmaterialien teils
          Shutterstock (Ref. 2483275947).
        </p>
      </section>
    </div>
  );
}
