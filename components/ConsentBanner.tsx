"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent-v1";

type ConsentValue = "accepted" | "rejected";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "rejected" ? v : null;
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  const setConsent = (value: ConsentValue) => {
    localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new CustomEvent("consent-change", { detail: value }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-md z-50"
        >
          <div className="card p-5 shadow-xl border-[var(--color-navy)]/20">
            <p className="font-serif text-lg text-[var(--color-navy)] mb-2 leading-snug">
              Cookies & Tracking
            </p>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              Wir setzen technisch notwendige Cookies und – nach deiner Zustimmung – den
              Meta Pixel ein, um die Reichweite unserer Anzeigen zu messen.{" "}
              <Link
                href="/datenschutz"
                className="underline hover:text-[var(--color-navy)]"
              >
                Mehr erfahren
              </Link>
              .
            </p>

            {details && (
              <ul className="mt-4 text-xs text-[var(--color-muted)] space-y-1 border-t border-[var(--color-border)] pt-3">
                <li>
                  <strong className="text-[var(--color-ink)]">Notwendig:</strong>{" "}
                  Session-State, Quiz-Antworten (lokal gespeichert).
                </li>
                <li>
                  <strong className="text-[var(--color-ink)]">Marketing:</strong> Meta
                  Pixel (Facebook/Instagram Ads) zur Messung von Anzeigen-Conversions.
                </li>
              </ul>
            )}

            <div className="mt-5 flex flex-col sm:flex-row gap-2">
              <button onClick={() => setConsent("accepted")} className="btn-primary flex-1">
                Alle akzeptieren
              </button>
              <button onClick={() => setConsent("rejected")} className="btn-secondary flex-1">
                Nur notwendige
              </button>
            </div>
            <button
              onClick={() => setDetails(!details)}
              className="mt-3 text-xs text-[var(--color-muted)] underline"
            >
              {details ? "Details ausblenden" : "Details anzeigen"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
