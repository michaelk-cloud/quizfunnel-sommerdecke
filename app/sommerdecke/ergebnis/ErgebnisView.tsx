"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/lib/store";
import { matchTop3 } from "@/lib/quiz/match";
import { MatchCard } from "@/components/result/MatchCard";
import { StickyEmailBanner } from "@/components/StickyEmailBanner";
import { questions } from "@/lib/quiz/questions";

export function ErgebnisView() {
  const router = useRouter();
  const { answers, markCompleted } = useQuizStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const filled = questions.filter((q) => answers[q.id]).length;
    if (filled < questions.length) {
      router.replace("/sommerdecke/quiz");
    } else {
      markCompleted();
    }
  }, [mounted, answers, router, markCompleted]);

  if (!mounted) {
    return (
      <section className="bg-[var(--color-cream)] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <div className="mx-auto h-3 w-24 bg-white/60 rounded mb-6" />
          <div className="mx-auto h-10 w-80 max-w-full bg-white/60 rounded mb-4" />
          <div className="mx-auto h-4 w-96 max-w-full bg-white/60 rounded" />
        </div>
      </section>
    );
  }
  const matches = matchTop3(answers);

  return (
    <>
      <section className="bg-[var(--color-offwhite)] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <p className="trust-chip justify-center mb-4">
            <span>✦</span> Ihr Ergebnis
          </p>
          <h1 className="font-serif text-[var(--color-ink)] mb-4">
            Diese drei Sommerdecken passen zu <em>Ihnen</em>.
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            Auf Basis Ihrer Antworten haben wir die drei passendsten BEFA-Decken berechnet.
            Sichern Sie sich 10 % Willkommens-Rabatt und bestellen Sie direkt bei BEFA.
          </p>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-5 py-12"
        style={{ paddingBottom: "calc(var(--banner-h, 160px) + 3rem)" }}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {matches.map((m, i) => (
            <MatchCard key={m.decke.slug} match={m} rank={i + 1} />
          ))}
        </div>

        <div className="mt-14 border-y border-[var(--color-border)] py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <TrustItem value="100" unit="Jahre" label="Manufaktur in Limburg" />
          <TrustItem value="Oeko-Tex" unit="Standard 100" label="Schadstoff-geprüft" />
          <TrustItem value="Downpass" unit="zertifiziert" label="Tierschutz-Standard" />
          <TrustItem value="Made in" unit="Germany" label="Handgefertigt" />
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => router.push("/sommerdecke/quiz")}
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] underline underline-offset-4"
          >
            Quiz neu starten
          </button>
        </div>
      </section>

      <StickyEmailBanner />
    </>
  );
}

function TrustItem({
  value,
  unit,
  label,
}: {
  value: string;
  unit: string;
  label: string;
}) {
  return (
    <div>
      <div className="font-serif text-2xl text-[var(--color-ink)] leading-none">
        {value}
        <span className="text-sm font-sans font-normal ml-1 text-[var(--color-muted)]">
          {unit}
        </span>
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">
        {label}
      </div>
    </div>
  );
}
