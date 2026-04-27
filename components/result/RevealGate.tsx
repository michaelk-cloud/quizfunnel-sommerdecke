"use client";

import { useRef, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { useQuizStore } from "@/lib/store";
import { matchTop3 } from "@/lib/quiz/match";
import { subscribe } from "@/app/actions/subscribe";
import { trackPixel } from "@/lib/pixel";
import type { Answers, QuestionId } from "@/lib/quiz/questions";

const REQUIRED_KEYS: QuestionId[] = [
  "temperature",
  "painDuration",
  "roomClimate",
  "morningImpact",
  "material",
  "allergies",
  "washing",
  "sleepSituation",
  "bedSize",
  "skinFeel",
  "dreamState",
];

function hasAllAnswers(answers: Answers): answers is Required<Answers> {
  return REQUIRED_KEYS.every((k) => typeof answers[k] === "string" && answers[k]!.length > 0);
}

export function RevealGate() {
  const { answers, setEmail, skipReveal } = useQuizStore();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current || isPending) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const emailValue = (formData.get("email") as string | null)?.trim() ?? "";

    if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setError("Bitte geben Sie eine gültige Email-Adresse ein.");
      return;
    }

    if (!hasAllAnswers(answers)) {
      setError("Bitte beantworten Sie erst alle Quiz-Fragen.");
      return;
    }

    submittingRef.current = true;
    setError(null);

    startTransition(async () => {
      const matches = matchTop3(answers).map((m) => m.decke.slug);
      const res = await subscribe({
        email: emailValue,
        answers,
        matches: [matches[0], matches[1], matches[2]],
      });
      if (res.ok) {
        setEmail(emailValue);
        trackPixel("Lead", {
          content_category: "sommerdecke_quiz",
          content_name: "reveal_gate_submit",
        });
      } else {
        submittingRef.current = false;
        setError(res.error ?? "Unbekannter Fehler.");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-start sm:items-center justify-center px-4 py-6 sm:py-10 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-white/40 backdrop-blur-md"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white border border-[var(--color-border)] shadow-[0_24px_60px_rgba(28,35,51,0.16)] rounded-sm overflow-hidden"
      >
        {/* Sale-Stripe oben */}
        <div className="h-[3px] w-full bg-[var(--color-sale)]" />

        <div className="p-6 sm:p-8">
          <p className="trust-chip mb-3">
            <span>✦</span> Ihre Empfehlungen sind bereit
          </p>

          <h2 className="font-serif text-[1.625rem] sm:text-3xl leading-[1.15] mb-3 text-[var(--color-ink)]">
            Email eintragen, <em>10 % Rabatt</em> sichern und Ergebnis freischalten.
          </h2>

          <p className="text-sm sm:text-[0.9375rem] text-[var(--color-muted)] leading-relaxed mb-6">
            Wir schicken Ihnen Ihren persönlichen Rabattcode für{" "}
            <span className="text-[var(--color-ink)] font-semibold">
              befa-limburg.de
            </span>{" "}
            – einlösbar auf jede Sommerdecke.
          </p>

          <form onSubmit={onSubmit} noValidate className="space-y-2.5">
            <label htmlFor="reveal-email" className="sr-only">
              Email-Adresse
            </label>
            <input
              id="reveal-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              autoFocus
              placeholder="ihre@email.de"
              disabled={isPending}
              className="w-full px-4 py-3 min-h-[52px] border border-[var(--color-border)] rounded-[4px] text-base focus:outline-none focus:border-[var(--color-ink)] bg-white disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full min-h-[52px] disabled:opacity-70 disabled:cursor-wait"
            >
              {isPending ? "Wird freigeschaltet …" : "Empfehlungen freischalten →"}
            </button>
          </form>

          {error && (
            <p
              role="alert"
              aria-live="polite"
              className="text-xs text-[var(--color-sale)] mt-3"
            >
              {error}
            </p>
          )}

          <ul className="mt-5 grid grid-cols-3 gap-2 text-[0.625rem] uppercase tracking-[0.08em] text-[var(--color-muted)] font-semibold text-center">
            <li className="flex flex-col items-center gap-1">
              <span className="text-[var(--color-ink)]">✓</span>
              <span>Versand­kostenfrei</span>
            </li>
            <li className="flex flex-col items-center gap-1">
              <span className="text-[var(--color-ink)]">✓</span>
              <span>Nur 1 Email</span>
            </li>
            <li className="flex flex-col items-center gap-1">
              <span className="text-[var(--color-ink)]">✓</span>
              <span>Jederzeit kündbar</span>
            </li>
          </ul>

          <p className="mt-5 text-[0.6875rem] leading-relaxed text-[var(--color-muted)]">
            Mit dem Eintrag abonnieren Sie den BEFA-Newsletter (Manufaktur-News,
            saisonale Angebote). Abmeldung jederzeit über den Link in jeder
            Email.{" "}
            <a
              href="/datenschutz"
              className="underline hover:text-[var(--color-ink)]"
            >
              Datenschutz
            </a>
            .
          </p>

          <button
            type="button"
            onClick={() => {
              skipReveal();
              trackPixel("ViewContent", {
                content_category: "sommerdecke_quiz",
                content_name: "reveal_gate_skipped",
              });
            }}
            className="mt-5 mx-auto block text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)] underline underline-offset-4"
          >
            Nein danke – Ergebnis ohne Rabatt anzeigen
          </button>
        </div>
      </motion.div>
    </div>
  );
}
