import { QuizEngine } from "@/components/quiz/QuizEngine";

export const metadata = {
  title: "Sommerdecken-Quiz | Schlafen wie auf Wolken",
};

export default function QuizPage() {
  return (
    <section className="min-h-[calc(100vh-200px)] bg-[var(--color-cream)]">
      <QuizEngine />
    </section>
  );
}
