"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/lib/store";
import { matchTop3 } from "@/lib/quiz/match";
import { MatchCard } from "@/components/result/MatchCard";
import { StickyEmailBanner } from "@/components/StickyEmailBanner";
import { RevealGate } from "@/components/result/RevealGate";
import { questions } from "@/lib/quiz/questions";
import { trackPixel } from "@/lib/pixel";

export function ErgebnisView() {
  const router = useRouter();
  const { answers, email, revealSkipped, completedAt, markCompleted } = useQuizStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const filled = questions.filter((q) => answers[q.id]).length;
    if (filled < questions.length) {
      router.replace("/sommerdecke/quiz");
      return;
    }
    // Funnel-Step: Quiz beendet, Ergebnis erreicht.
    // Wir feuern QuizCompleted nur einmal (idempotent via completedAt).
    if (!completedAt) {
      trackPixel("CompleteRegistration", {
        content_category: "sommerdecke_quiz",
        content_name: "quiz_completed",
        status: "completed",
      });
      // Custom Event zusätzlich – Meta Pixel akzeptiert beliebige Event-Namen
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("trackCustom", "QuizCompleted", {
          content_category: "sommerdecke_quiz",
        });
      }
      markCompleted();
    }
  }, [mounted, answers, router, markCompleted, completedAt]);

  // Reveal-Gate sichtbar wenn: Quiz fertig, noch keine Email submittet, noch nicht geskippt.
  const showRevealGate = mounted && email === null && !revealSkipped;

  // Body-Scroll sperren solange das Gate offen ist – sonst scrollt der User
  // hinter das Overlay und sieht durch den Blur, dass es ohne Email weitergeht.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (showRevealGate) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showRevealGate]);

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

  // Wenn Reveal-Gate sichtbar: Content darunter ist nicht interaktiv, nur Teaser-Optik.
  const blurStyle = showRevealGate
    ? ({ filter: "blur(8px)", pointerEvents: "none" as const, userSelect: "none" as const })
    : undefined;

  return (
    <>
      <div aria-hidden={showRevealGate} style={blurStyle}>
        <section className="bg-[var(--color-offwhite)] py-10 sm:py-16">
          <div className="mx-auto max-w-5xl px-5 text-center">
            <p className="trust-chip justify-center mb-3 sm:mb-4">
              <span>✦</span> Ihr Ergebnis
            </p>
            <h1 className="font-serif text-[var(--color-ink)] mb-3 sm:mb-4">
              Diese drei Sommerdecken passen zu <em>Ihnen</em>.
            </h1>
            <p className="text-base sm:text-lg text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
              Auf Basis Ihrer Antworten haben wir die drei passendsten BEFA-Decken berechnet.
              Sichern Sie sich 10 % Willkommens-Rabatt und bestellen Sie direkt bei BEFA.
            </p>
          </div>
        </section>

        <section
          className="mx-auto max-w-6xl px-4 sm:px-5 py-10 sm:py-12"
          style={{
            paddingBottom: showRevealGate
              ? undefined
              : "calc(var(--banner-h, 180px) + 2.5rem)",
          }}
        >
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {matches.map((m, i) => (
              <MatchCard key={m.decke.slug} match={m} rank={i + 1} />
            ))}
          </div>

          <div className="mt-10 sm:mt-14 border-y border-[var(--color-border)] py-7 sm:py-8 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 text-center">
            <TrustItem value="32" unit="Jahre" label="Manufaktur in Limburg" />
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
      </div>

      {showRevealGate && <RevealGate />}
      {!showRevealGate && <StickyEmailBanner />}
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
