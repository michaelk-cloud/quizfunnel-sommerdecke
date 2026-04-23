import { notFound } from "next/navigation";
import { decken, getDeckeBySlug } from "@/lib/quiz/decken";
import { DeckeDetail } from "./DeckeDetail";

export async function generateStaticParams() {
  return decken.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decke = getDeckeBySlug(slug);
  if (!decke) return {};
  return {
    title: `${decke.name} | Schlafen wie auf Wolken`,
    description: decke.tagline,
  };
}

export default async function DeckePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decke = getDeckeBySlug(slug);
  if (!decke) notFound();
  return <DeckeDetail decke={decke} />;
}
