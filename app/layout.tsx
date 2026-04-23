import type { Metadata } from "next";
import { Assistant, Playfair_Display } from "next/font/google";
import "./globals.css";
import { MetaPixel } from "@/components/MetaPixel";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { ConsentBanner } from "@/components/ConsentBanner";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://schlafenaufwolken.de";
const SITE_URL = /^https?:\/\//.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Finde deine perfekte Sommerdecke | Schlafen wie auf Wolken",
  description:
    "Schwitzen Sie nachts? In 90 Sekunden finden Sie die passende Sommerdecke aus der BEFA-Manufaktur – Made in Germany, Oeko-Tex zertifiziert.",
  openGraph: {
    title: "Schwitzen Sie nachts? Finden Sie Ihre perfekte Sommerdecke",
    description: "In 90 Sekunden zur idealen Sommerdecke aus der BEFA-Manufaktur.",
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
    <html lang="de" className={`${assistant.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
        {pixelId && <MetaPixel pixelId={pixelId} />}
        <SiteHeader />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
