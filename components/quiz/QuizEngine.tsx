"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { questions } from "@/lib/quiz/questions";
import { useQuizStore } from "@/lib/store";
import { ProgressBar } from "./ProgressBar";
import { OptionCard } from "./OptionCard";
import { trackPixel } from "@/lib/pixel";

export function QuizEngine() {
  const router = useRouter();
  const { answers, step, setAnswer, setStep } = useQuizStore();
  const [mounted, setMounted] = useState(false);
  const lastInputWasKeyboard = useRef(false);

  useEffect(() => {
    setMounted(true);
    trackPixel("InitiateCheckout", { content_category: "quiz_start" });

    const onKey = () => (lastInputWasKeyboard.current = true);
    const onMouse = () => (lastInputWasKeyboard.current = false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onMouse);
    window.addEventListener("touchstart", onMouse);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onMouse);
      window.removeEventListener("touchstart", onMouse);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const q = questions[step];
    if (q) {
      trackPixel("ViewContent", {
        content_name: `q${q.number}_${q.id}`,
        content_category: "quiz_question",
      });
    }
  }, [step, mounted]);

  const q = questions[step];
  const isLast = step === questions.length - 1;
  const selected = mounted && q ? answers[q.id] : undefined;

  const advance = () => {
    if (isLast) {
      router.push("/sommerdecke/ergebnis");
    } else {
      setStep(step + 1);
    }
  };

  const handleSelect = (value: string) => {
    setAnswer(q.id, value);
    if (lastInputWasKeyboard.current) {
      // Keyboard-User sollen selbst weiter-klicken – Auto-Advance klaut Screenreader-Fokus
      return;
    }
    // Insight kurz sichtbar lassen, bevor wir weiter gehen
    setTimeout(advance, q.insight ? 1600 : 320);
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4 sm:px-5 py-5 sm:py-12">
      <ProgressBar current={step + 1} total={questions.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="mt-6 sm:mt-10"
        >
          <h1 className="font-serif text-[1.625rem] sm:text-4xl leading-[1.2] sm:leading-tight mb-2 text-[var(--color-navy)]">
            {q.title}
          </h1>
          {q.subtitle && (
            <p className="text-sm sm:text-base text-[var(--color-muted)] mb-5 sm:mb-6 leading-relaxed">{q.subtitle}</p>
          )}

          <div
            role="radiogroup"
            aria-label={q.title}
            className="space-y-2.5 sm:space-y-3 mt-5 sm:mt-8"
          >
            {q.options.map((opt, i) => (
              <OptionCard
                key={opt.value}
                option={opt}
                selected={selected === opt.value}
                onClick={() => handleSelect(opt.value)}
                index={i}
              />
            ))}
          </div>

          {q.insight && selected && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="mt-6 flex gap-3 rounded-sm border border-[var(--color-border)] bg-[var(--color-offwhite)] px-4 py-3"
              aria-live="polite"
            >
              <span className="text-[var(--color-ink)] shrink-0 mt-0.5" aria-hidden>
                ✦
              </span>
              <p className="text-sm text-[var(--color-ink)]/80 leading-relaxed">
                <span className="font-semibold text-[var(--color-ink)]">BEFA-Manufaktur · </span>
                {q.insight}
              </p>
            </motion.div>
          )}

          <div className="mt-7 sm:mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)] disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:underline py-3 -my-3 min-h-[44px]"
            >
              ← Zurück
            </button>
            {selected && (
              <button
                type="button"
                onClick={advance}
                className="btn-secondary text-sm min-h-[48px]"
              >
                {isLast ? "Ergebnis anzeigen →" : "Weiter →"}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
