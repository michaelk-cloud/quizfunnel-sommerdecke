"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Decke } from "@/lib/quiz/decken";
import { StickyEmailBanner } from "@/components/StickyEmailBanner";
import { trackPixel } from "@/components/MetaPixel";

export function DeckeDetail({ decke }: { decke: Decke }) {
  const utm = "?utm_source=quizfunnel&utm_medium=referral&utm_campaign=sommerdecke&utm_content=" + decke.slug;
  const shopUrl = decke.shopUrl + utm;

  const onBuy = () => {
    trackPixel("InitiateCheckout", {
      content_ids: [decke.slug],
      content_name: decke.name,
      value: decke.priceFrom,
      currency: "EUR",
    });
  };

  return (
    <>
      <nav className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-5xl px-5 py-4 text-sm">
          <Link href="/ergebnis" className="text-[var(--color-muted)] hover:text-[var(--color-navy)]">
            ← Zurück zu deinen Matches
          </Link>
        </div>
      </nav>

      <section className="bg-[var(--color-cream)] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[4/3] rounded-lg bg-white border border-[var(--color-border)] overflow-hidden"
          >
            <Image
              src={decke.image}
              alt={decke.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </motion.div>
          <div>
            <p className="trust-chip mb-3">
              <span>✦</span> Made in Germany
            </p>
            <h1 className="font-serif text-[var(--color-navy)] mb-3">{decke.name}</h1>
            <p className="text-lg text-[var(--color-muted)] mb-5">{decke.tagline}</p>
            <p className="text-[var(--color-ink)] leading-relaxed mb-6">{decke.description}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-sm text-[var(--color-muted)]">ab</span>
              <span className="font-serif text-3xl text-[var(--color-navy)]">
                {decke.priceFrom.toFixed(2).replace(".", ",")} €
              </span>
            </div>

            <a
              href={shopUrl}
              target="_blank"
              rel="noopener"
              onClick={onBuy}
              className="btn-primary w-full sm:w-auto"
            >
              Jetzt auf befa-limburg.de kaufen →
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-serif text-[var(--color-navy)] mb-6">Darum passt sie zu dir</h2>
          <ul className="space-y-3">
            {decke.usps.map((u, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-[var(--color-accent-dark)] shrink-0 mt-1">✓</span>
                <span className="text-[var(--color-ink)]">{u}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="font-serif text-xl text-[var(--color-navy)] mb-4">Material & Pflege</h3>
          <dl className="space-y-3 text-sm">
            <Row label="Material" value={decke.material} />
            <Row label="Wärmeklasse" value={["Sehr kühl", "Kühl-mittel", "Mittel"][decke.warmthLevel - 1]} />
            <Row label="Waschbar" value={decke.washable ? "Ja, bei 60 °C" : "Fachreinigung empfohlen"} />
            <Row label="Allergiker" value={decke.allergikerSafe ? "Geeignet" : "Nicht primär empfohlen"} />
            <Row label="Vegan" value={decke.vegan ? "Ja" : "Nein (Tierprodukt)"} />
            <Row label="Pflege" value={decke.careNotes} />
          </dl>
        </div>
      </section>

      <section className="bg-[var(--color-navy)] text-white py-14">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-serif mb-4">Bereit für deine neue Sommerdecke?</h2>
          <p className="text-white/80 mb-6">
            Trag oben deine Email ein, sichere dir 10 % Rabatt und bestelle direkt bei BEFA
            Limburg – handgefertigt in Deutschland.
          </p>
          <a
            href={shopUrl}
            target="_blank"
            rel="noopener"
            onClick={onBuy}
            className="inline-flex items-center gap-2 bg-white text-[var(--color-navy)] px-6 py-3 rounded-[4px] font-medium hover:bg-[var(--color-cream)] transition-colors"
          >
            Zum Shop →
          </a>
        </div>
      </section>

      <div className="pb-32 sm:pb-24" />
      <StickyEmailBanner />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-[var(--color-border)] pb-2 last:border-0">
      <dt className="text-[var(--color-muted)]">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
