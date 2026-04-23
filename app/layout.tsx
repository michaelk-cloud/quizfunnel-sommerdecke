import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { MetaPixel } from "@/components/MetaPixel";
import { Footer } from "@/components/Footer";
import { ConsentBanner } from "@/components/ConsentBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://schlafenwieaufwolken.de";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Finde deine perfekte Sommerdecke | Schlafen wie auf Wolken",
  description:
    "In 90 Sekunden zur idealen Sommerdecke. Persönliches Matching aus den besten Befa-Decken – Made in Germany, Oeko-Tex zertifiziert.",
  openGraph: {
    title: "Finde deine perfekte Sommerdecke",
    description: "Persönliches Decken-Matching in 90 Sekunden.",
    type: "website",
    locale: "de_DE",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  return (
    <html lang="de" className={`${inter.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
        {pixelId && <MetaPixel pixelId={pixelId} />}
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
