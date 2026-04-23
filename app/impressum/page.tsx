export const metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-[var(--color-navy)] mb-6">Impressum</h1>
      <p className="text-[var(--color-muted)] mb-4">
        Diese Seite wird betrieben durch den Partnerbetrieb der BEFA Bettfedernfabrik
        GmbH. Verantwortlich für den Inhalt:
      </p>
      <address className="not-italic text-[var(--color-ink)] leading-relaxed">
        <strong>BEFA Bettfedernfabrik GmbH</strong>
        <br />
        Mundipharmastraße 2<br />
        65549 Limburg / Lahn<br />
        Deutschland<br />
        Telefon: +49 6431 2109-0<br />
        E-Mail: info@befa-limburg.de
      </address>
      <p className="mt-6 text-sm text-[var(--color-muted)]">
        Vollständige Angaben: siehe{" "}
        <a
          href="https://befa-limburg.de/pages/impressum"
          target="_blank"
          rel="noopener"
          className="underline"
        >
          befa-limburg.de/impressum
        </a>
        .
      </p>
    </div>
  );
}
