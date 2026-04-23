export const metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 prose prose-sm">
      <h1 className="font-serif text-[var(--color-navy)] mb-6">Datenschutz</h1>
      <p className="text-[var(--color-muted)] leading-relaxed mb-4">
        Wir verarbeiten deine Email-Adresse ausschließlich zum Versand unseres
        Sommerdecken-Ratgebers und weiterer Schlafkomfort-Tipps. Du kannst dich jederzeit
        mit einem Klick am Ende jeder Mail abmelden.
      </p>
      <p className="text-[var(--color-muted)] leading-relaxed mb-4">
        Unsere Emails versenden wir über Klaviyo (Klaviyo, Inc., USA). Beim Besuch dieser
        Website setzen wir den Meta Pixel ein, um die Effektivität unserer Werbeanzeigen
        zu messen.
      </p>
      <p className="text-sm text-[var(--color-muted)] mt-6">
        Vollständige Datenschutzerklärung: siehe{" "}
        <a
          href="https://befa-limburg.de/pages/datenschutz"
          target="_blank"
          rel="noopener"
          className="underline"
        >
          befa-limburg.de/datenschutz
        </a>
        .
      </p>
    </div>
  );
}
