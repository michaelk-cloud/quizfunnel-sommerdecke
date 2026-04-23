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
      router.replace("/quiz");
    } else {
      markCompleted();
    }
  }, [mounted, answers, router, markCompleted]);

  if (!mounted) return <div className="min-h-[60vh]" />;
  const matches = matchTop3(answers);

  return (
    <>
      <section className="bg-[var(--color-cream)] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <p className="trust-chip justify-center mb-4">
            <span>✦</span> Dein Ergebnis
          </p>
          <h1 className="font-serif text-[var(--color-navy)] mb-4">
            Diese drei Sommerdecken passen zu dir.
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            Auf Basis deiner Antworten haben wir die drei passendsten BEFA-Decken
            berechnet. Klick dich durch, sichere dir 10 % Rabatt und bestelle direkt im Shop.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 pb-36 sm:pb-32">
        <div className="grid gap-6 md:grid-cols-3">
          {matches.map((m, i) => (
            <MatchCard key={m.decke.slug} match={m} rank={i + 1} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => router.push("/quiz")}
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)] underline underline-offset-4"
          >
            Quiz neu starten
          </button>
        </div>
      </section>

      <StickyEmailBanner />
    </>
  );
}
