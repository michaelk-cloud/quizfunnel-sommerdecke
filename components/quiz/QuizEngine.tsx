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
    setTimeout(advance, 280);
  };

  return (
    <div className="mx-auto w-full max-w-xl px-5 py-6 sm:py-12">
      <ProgressBar current={step + 1} total={questions.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="mt-10"
        >
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight mb-2 text-[var(--color-navy)]">
            {q.title}
          </h1>
          {q.subtitle && (
            <p className="text-[var(--color-muted)] mb-6">{q.subtitle}</p>
          )}

          <div
            role="radiogroup"
            aria-label={q.title}
            className="space-y-3 mt-8"
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

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)] disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:underline"
            >
              ← Zurück
            </button>
            {selected && (
              <button
                type="button"
                onClick={advance}
                className="btn-secondary text-sm"
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
