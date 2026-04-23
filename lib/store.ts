"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Answers } from "./quiz/questions";

type QuizStore = {
  answers: Answers;
  step: number;
  email: string | null;
  completedAt: string | null;
  setAnswer: (id: keyof Answers, value: string) => void;
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
  markCompleted: () => void;
  reset: () => void;
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      answers: {},
      step: 0,
      email: null,
      completedAt: null,
      setAnswer: (id, value) =>
        set((state) => ({ answers: { ...state.answers, [id]: value } })),
      setStep: (step) => set({ step }),
      setEmail: (email) => set({ email }),
      markCompleted: () => set({ completedAt: new Date().toISOString() }),
      reset: () => set({ answers: {}, step: 0, email: null, completedAt: null }),
    }),
    { name: "quiz-sommerdecke" }
  )
);
