"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { MatchResult } from "@/lib/quiz/match";
import { trackPixel } from "@/lib/pixel";

export function MatchCard({ match, rank }: { match: MatchResult; rank: number }) {
  const { decke, reasons } = match;
  const shopHref = `${decke.shopUrl}?utm_source=quizfunnel&utm_medium=referral&utm_campaign=sommerdecke&utm_content=${decke.slug}`;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * rank }}
      className="card overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/3] bg-[var(--color-offwhite)] overflow-hidden">
        <div className="absolute top-3 left-3 z-10 bg-[var(--color-ink)] text-white text-xs uppercase tracking-[0.1em] font-semibold px-2.5 py-1">
          Match #{rank}
        </div>
        <Image
          src={decke.image}
          alt={decke.name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
          priority={rank === 1}
        />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-serif text-2xl text-[var(--color-ink)] leading-tight">
          {decke.name}
        </h3>
        <p className="text-sm text-[var(--color-muted)] mt-1 mb-3">{decke.tagline}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-[0.625rem] uppercase tracking-[0.08em] font-semibold px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-muted)]">
            Oeko-Tex
          </span>
          {decke.washable && (
            <span className="text-[0.625rem] uppercase tracking-[0.08em] font-semibold px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-muted)]">
              60° waschbar
            </span>
          )}
          {decke.vegan && (
            <span className="text-[0.625rem] uppercase tracking-[0.08em] font-semibold px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-muted)]">
              Vegan
            </span>
          )}
          {!decke.vegan && (
            <span className="text-[0.625rem] uppercase tracking-[0.08em] font-semibold px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-muted)]">
              Downpass
            </span>
          )}
          {decke.allergikerSafe && (
            <span className="text-[0.625rem] uppercase tracking-[0.08em] font-semibold px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-muted)]">
              Allergiker
            </span>
          )}
        </div>

        <ul className="space-y-2 mb-5 flex-1">
          {reasons.length > 0 ? (
            reasons.map((r, i) => (
              <li key={i} className="flex gap-2 text-sm text-[var(--color-ink)]">
                <span className="text-[var(--color-accent-dark)] shrink-0">✓</span>
                <span>{r}</span>
              </li>
            ))
          ) : (
            decke.usps.slice(0, 3).map((u, i) => (
              <li key={i} className="flex gap-2 text-sm text-[var(--color-ink)]">
                <span className="text-[var(--color-accent-dark)] shrink-0">✓</span>
                <span>{u}</span>
              </li>
            ))
          )}
        </ul>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
          <div>
            <span className="text-xs text-[var(--color-muted)]">ab</span>
            <div className="font-serif text-2xl text-[var(--color-ink)]">
              {decke.priceFrom.toFixed(2).replace(".", ",")} €
            </div>
          </div>
          <a
            href={shopHref}
            target="_blank"
            rel="noopener"
            onClick={() =>
              trackPixel("InitiateCheckout", {
                content_ids: [decke.slug],
                content_name: decke.name,
                value: decke.priceFrom,
                currency: "EUR",
              })
            }
            className="btn-primary text-sm"
          >
            Auf BEFA Limburg ansehen →
          </a>
        </div>
      </div>
    </motion.article>
  );
}
