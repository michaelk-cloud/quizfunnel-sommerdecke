"use client";

import { useEffect, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuizStore } from "@/lib/store";
import { matchTop3 } from "@/lib/quiz/match";
import { subscribe } from "@/app/actions/subscribe";
import { trackPixel } from "./MetaPixel";

const formSchema = z.object({
  email: z.string().email("Bitte gib eine gültige Email ein."),
});
type FormData = z.infer<typeof formSchema>;

const DISCOUNT_CODE = process.env.NEXT_PUBLIC_DISCOUNT_CODE || "BEFA10";

export function StickyEmailBanner() {
  const { answers, email, setEmail } = useQuizStore();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => setMounted(true), []);

  const onSubmit = (data: FormData) => {
    setError(null);
    startTransition(async () => {
      const matches = matchTop3(answers).map((m) => m.decke.slug);
      const res = await subscribe({
        email: data.email,
        answers: answers as Record<string, string>,
        matches: matches as [string, string, string],
      });
      if (res.ok) {
        setEmail(data.email);
        trackPixel("Lead", { content_category: "sommerdecke_quiz" });
      } else {
        setError(res.error ?? "Unbekannter Fehler.");
      }
    });
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(DISCOUNT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-white/95 backdrop-blur shadow-[0_-4px_20px_rgba(28,35,51,0.06)]">
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
              <p className="font-serif text-lg sm:text-xl leading-tight text-[var(--color-navy)]">
                Hol dir deinen persönlichen Decken-Report + 10 % Rabatt.
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-0.5">
                Wir schicken dir deine Matches per Email. Abmeldung jederzeit möglich.
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex gap-2 w-full sm:w-auto sm:min-w-[380px]"
            >
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="deine@email.de"
                {...register("email")}
                className="flex-1 px-4 py-3 border border-[var(--color-border)] rounded-[4px] text-base focus:outline-none focus:border-[var(--color-navy)] bg-white"
              />
              <button type="submit" disabled={isPending} className="btn-primary whitespace-nowrap">
                {isPending ? "…" : "Rabatt holen"}
              </button>
            </form>
            {(errors.email || error) && (
              <p className="text-xs text-red-600 sm:absolute sm:bottom-1">
                {errors.email?.message || error}
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
              <p className="font-serif text-lg sm:text-xl leading-tight text-[var(--color-navy)]">
                Dein Code: <span className="text-[var(--color-accent-dark)]">{DISCOUNT_CODE}</span>
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                Bei befa-limburg.de im Checkout einlösen. 10 % auf deine Sommerdecke.
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
