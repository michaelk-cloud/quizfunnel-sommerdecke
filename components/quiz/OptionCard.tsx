"use client";

import { motion } from "framer-motion";
import type { Option } from "@/lib/quiz/questions";

export function OptionCard({
  option,
  selected,
  onClick,
  index,
}: {
  option: Option;
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.05 * index }}
      className={`group w-full text-left rounded-lg border px-5 py-4 flex items-center gap-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-navy)] focus-visible:ring-offset-2 ${
        selected
          ? "border-[var(--color-navy)] bg-[var(--color-navy)] text-white"
          : "border-[var(--color-border)] bg-white hover:border-[var(--color-navy)] hover:bg-[var(--color-cream)]"
      }`}
    >
      {option.emoji && (
        <span className="text-2xl shrink-0" aria-hidden>
          {option.emoji}
        </span>
      )}
      <div className="flex-1">
        <div className={`font-medium ${selected ? "text-white" : "text-[var(--color-ink)]"}`}>
          {option.label}
        </div>
        {option.hint && (
          <div
            className={`text-sm mt-0.5 ${
              selected ? "text-white/80" : "text-[var(--color-muted)]"
            }`}
          >
            {option.hint}
          </div>
        )}
      </div>
      <span
        className={`shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center ${
          selected ? "border-white" : "border-[var(--color-border)]"
        }`}
        aria-hidden
      >
        {selected && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
    </motion.button>
  );
}
