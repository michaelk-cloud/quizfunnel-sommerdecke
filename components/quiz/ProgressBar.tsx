"use client";

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
        <span>Frage {current} von {total}</span>
        <span>{pct} %</span>
      </div>
      <div className="h-[3px] w-full bg-[var(--color-cream-dark)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-navy)] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
