import Link from "next/link";
import Image from "next/image";

export default function SommerdeckeLanding() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="bg-[var(--color-offwhite)]">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 items-stretch">
          <div className="order-2 lg:order-1 px-6 py-14 sm:py-20 lg:py-24 lg:px-14 flex flex-col justify-center">
            <p className="trust-chip mb-6">
              <span>✦</span> Made in Germany – seit 1994
            </p>
            <h1 className="font-serif mb-6 text-[var(--color-ink)] text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05]">
              Schwitzen Sie
              <br />
              <em>Nacht für Nacht?</em>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--color-muted)] leading-relaxed mb-10 max-w-xl">
              Dann liegt es selten an der Hitze – sondern an Ihrer Decke. Finden Sie in
              90 Sekunden die Sommerdecke aus der BEFA-Manufaktur, die Ihre Körperwärme
              aktiv nach außen leitet.
            </p>
            <div>
              <Link href="/sommerdecke/quiz" className="btn-primary">
                Jetzt Decke finden – 90 Sekunden
              </Link>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
              Kostenlos · inklusive 10 % Willkommens-Rabatt
            </p>
          </div>

          <div className="order-1 lg:order-2 relative aspect-[4/5] lg:aspect-auto lg:min-h-[640px]">
            <Image
              src="/hero-sommerdecke.webp"
              alt="Sommerdecke in hellem Schlafzimmer – BEFA Limburg"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
        <div className="text-center mb-14">
          <p className="trust-chip justify-center mb-4">Das eigentliche Problem</p>
          <h2 className="font-serif text-[var(--color-ink)] mb-5">
            Wenn Sie nachts schwitzen, ist selten <em>die Hitze</em> schuld.
          </h2>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
            Standard-Sommerdecken aus dem Möbelhaus stauen Wärme statt sie abzuleiten.
            Die Folge: Sie wachen durchgeschwitzt auf, wälzen sich, sind morgens gerädert.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          <Problem
            title="Synthetik-Füllung"
            text="Speichert Wärme und Feuchtigkeit – bis es drunter tropft."
          />
          <Problem
            title="Dichter Bezug"
            text="Polyester-Gewebe lässt keine Luft durch. Hitzestau vorprogrammiert."
          />
          <Problem
            title="Kein Feuchtigkeits­management"
            text="Schweiß bleibt zwischen Haut und Stoff – statt zu verdunsten."
          />
        </div>
      </section>

      {/* LÖSUNG */}
      <section className="bg-[var(--color-offwhite)] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <p className="trust-chip justify-center mb-4">Die BEFA-Manufaktur</p>
            <h2 className="font-serif text-[var(--color-ink)] mb-5">
              Eine Decke, die Ihre <em>Körperwärme</em> aktiv nach außen leitet.
            </h2>
            <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
              In Limburg produziert BEFA seit 1994 Bettdecken, die für deutsche Sommernächte
              gemacht sind – mit Materialien, die Körperwärme wegführen statt sie zu speichern.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Solution
              tag="Tencel-Bezug"
              title="Transportiert Feuchtigkeit aktiv ab"
              text="Pflanzenbasierte Fasern, die bis zu 50 % mehr Feuchtigkeit aufnehmen als Baumwolle – kühl-glatt auf der Haut."
            />
            <Solution
              tag="Clima-Steppung"
              title="Leitet Wärme nach außen"
              text="Speziell entwickelte Kammer-Struktur, die aufgestaute Körperwärme seitlich nach außen entweichen lässt."
            />
            <Solution
              tag="Aloe-Vera-Ausrüstung"
              title="Hautfreundlich für sensible Schläfer"
              text="Zusätzlich bei 60 °C waschbar – für Allergiker das Wichtigste in der warmen Jahreszeit."
            />
          </div>
        </div>
      </section>

      {/* WIE FUNKTIONIERT DAS QUIZ */}
      <section className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
        <div className="text-center mb-14">
          <p className="trust-chip justify-center mb-4">So funktioniert es</p>
          <h2 className="font-serif text-[var(--color-ink)] mb-4">
            In 90 Sekunden zu <em>Ihrer</em> Decke.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Step number="01" title="9 Fragen beantworten">
            Zu Schlaftemperatur, Raumklima, Material-Vorlieben und Bettgröße. Ehrliche
            Antworten – kein Fachwissen nötig.
          </Step>
          <Step number="02" title="Ihre Top-3 sehen">
            Der Algorithmus gewichtet Ihre Antworten und zeigt Ihnen die drei passendsten
            BEFA-Decken für Ihre Schlafsituation.
          </Step>
          <Step number="03" title="10 % Rabatt sichern">
            Email eintragen, Willkommens-Rabatt per Newsletter erhalten und direkt bei
            befa-limburg.de bestellen.
          </Step>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-[var(--color-border)] py-12 bg-white">
        <div className="mx-auto max-w-5xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Trust label="Oeko-Tex Standard 100" />
          <Trust label="Downpass zertifiziert" />
          <Trust label="Handgefertigt in Limburg" />
          <Trust label="Familienbetrieb seit 1994" />
        </div>
      </section>

      {/* CTA ENDE */}
      <section className="bg-[var(--color-ink)] text-white py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-serif mb-5 text-white">
            Schlafen Sie endlich wieder <em>durch</em>.
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Die falsche Decke ist der häufigste Grund für unruhige Sommernächte.
            Beantworten Sie 9 Fragen und wir zeigen Ihnen die drei BEFA-Decken,
            die zu Ihrer Schlafsituation passen.
          </p>
          <Link
            href="/sommerdecke/quiz"
            className="btn-primary bg-white text-[var(--color-ink)] border-white hover:bg-white/90 hover:text-[var(--color-ink)]"
          >
            Jetzt Quiz starten
          </Link>
          <p className="mt-5 text-xs uppercase tracking-[0.15em] text-white/60">
            90 Sekunden · kostenlos · inklusive Rabatt-Code
          </p>
        </div>
      </section>
    </div>
  );
}

function Problem({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <div className="w-10 h-[2px] bg-[var(--color-sale)] mx-auto mb-4" />
      <h3 className="font-serif text-xl mb-2 text-[var(--color-ink)]">{title}</h3>
      <p className="text-sm text-[var(--color-muted)] leading-relaxed">{text}</p>
    </div>
  );
}

function Solution({
  tag,
  title,
  text,
}: {
  tag: string;
  title: string;
  text: string;
}) {
  return (
    <div className="card p-6 flex flex-col">
      <span className="text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--color-muted)] font-semibold mb-3">
        {tag}
      </span>
      <h3 className="font-serif text-xl text-[var(--color-ink)] mb-3 leading-snug">
        {title}
      </h3>
      <p className="text-sm text-[var(--color-muted)] leading-relaxed">{text}</p>
    </div>
  );
}

function Trust({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-10 w-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-ink)]">
        ✦
      </div>
      <span className="text-xs uppercase tracking-[0.1em] text-[var(--color-muted)] font-semibold">
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
      <div className="font-serif text-3xl text-[var(--color-ink)] mb-3">{number}</div>
      <h3 className="font-serif text-xl mb-2 text-[var(--color-ink)]">{title}</h3>
      <p className="text-[var(--color-muted)] leading-relaxed text-sm">{children}</p>
    </div>
  );
}
