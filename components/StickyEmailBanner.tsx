"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuizStore } from "@/lib/store";
import { matchTop3 } from "@/lib/quiz/match";
import { subscribe } from "@/app/actions/subscribe";
import { trackPixel } from "@/lib/pixel";
import type { Answers, QuestionId } from "@/lib/quiz/questions";

const DISCOUNT_CODE = process.env.NEXT_PUBLIC_DISCOUNT_CODE || "BEFA10";

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

export function StickyEmailBanner() {
  const { answers, email, setEmail } = useQuizStore();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);

  useEffect(() => setMounted(true), []);

  // Banner-Höhe als CSS-var publizieren, damit Seiten-Content sauber padden kann
  useEffect(() => {
    if (!bannerRef.current) return;
    const el = bannerRef.current;
    const update = () => {
      document.documentElement.style.setProperty("--banner-h", `${el.offsetHeight}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--banner-h");
    };
  }, [email, mounted]);

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
          content_name: "email_submit",
        });
      } else {
        submittingRef.current = false;
        setError(res.error ?? "Unbekannter Fehler.");
      }
    });
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked – still fine, code is visible
    }
  };

  if (!mounted) return null;

  return (
    <div
      ref={bannerRef}
      className="sticky bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-white/95 backdrop-blur shadow-[0_-4px_20px_rgba(28,35,51,0.06)]"
    >
      <AnimatePresence mode="wait">
        {!email ? (
          <motion.div
            key="pre"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mx-auto max-w-4xl px-4 py-4 sm:py-5 flex flex-col sm:flex-row gap-3 sm:gap-5 sm:items-center"
          >
            <div className="flex-1 min-w-0">
              <p className="font-serif text-lg sm:text-xl leading-tight text-[var(--color-ink)]">
                10 % Willkommens-Rabatt sichern.
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-0.5">
                Zum BEFA-Newsletter anmelden, Code per Email erhalten. Abmeldung jederzeit möglich.
              </p>
            </div>
            <form
              onSubmit={onSubmit}
              noValidate
              className="flex gap-2 w-full sm:w-auto sm:min-w-[380px]"
            >
              <label htmlFor="sticky-email" className="sr-only">
                Email-Adresse
              </label>
              <input
                id="sticky-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="ihre@email.de"
                disabled={isPending}
                className="flex-1 px-4 py-3 border border-[var(--color-border)] rounded-[4px] text-base focus:outline-none focus:border-[var(--color-navy)] bg-white disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isPending}
                className="btn-primary whitespace-nowrap disabled:opacity-70 disabled:cursor-wait"
              >
                {isPending ? "…" : "Rabatt holen"}
              </button>
            </form>
            {error && (
              <p role="alert" aria-live="polite" className="text-xs text-red-600 sm:absolute sm:bottom-1">
                {error}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="post"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl px-4 py-4 sm:py-5 flex flex-col sm:flex-row gap-3 sm:items-center"
          >
            <div className="flex-1">
              <p className="font-serif text-lg sm:text-xl leading-tight text-[var(--color-ink)]">
                Ihr Code: <span className="text-[var(--color-sale)] font-semibold">{DISCOUNT_CODE}</span>
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                Bei befa-limburg.de im Checkout einlösen. 10 % auf Ihre Sommerdecke.
              </p>
            </div>
            <button onClick={copyCode} className="btn-secondary whitespace-nowrap">
              {copied ? "Kopiert ✓" : "Code kopieren"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
