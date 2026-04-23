export type QuestionId =
  | "temperature"
  | "roomClimate"
  | "material"
  | "allergies"
  | "washing"
  | "sleepSituation"
  | "bedSize"
  | "skinFeel"
  | "budget";

export type Option = {
  value: string;
  label: string;
  hint?: string;
  emoji?: string;
};

export type Question = {
  id: QuestionId;
  number: number;
  title: string;
  subtitle?: string;
  options: Option[];
};

export const questions: Question[] = [
  {
    id: "temperature",
    number: 1,
    title: "Wie ist deine Schlaftemperatur im Sommer?",
    subtitle: "Sei ehrlich – davon hängt das Matching am stärksten ab.",
    options: [
      { value: "heavy_sweat", label: "Ich schwitze stark", emoji: "🔥" },
      { value: "light_sweat", label: "Ich schwitze leicht", emoji: "💧" },
      { value: "normal", label: "Normal – weder noch", emoji: "🌤" },
      { value: "cold", label: "Ich friere trotzdem", emoji: "❄️" },
    ],
  },
  {
    id: "roomClimate",
    number: 2,
    title: "Wie ist dein Schlafzimmer nachts?",
    options: [
      { value: "hot", label: "Dachgeschoss oder sehr heiß", emoji: "☀️" },
      { value: "warm", label: "Warm, aber erträglich", emoji: "🌡" },
      { value: "normal", label: "Normal temperiert", emoji: "🌙" },
      { value: "cool", label: "Eher kühl", emoji: "🌬" },
    ],
  },
  {
    id: "material",
    number: 3,
    title: "Welches Material bevorzugst du?",
    subtitle: "Wähle, was sich für dich richtig anfühlt.",
    options: [
      { value: "natural", label: "Naturfüllung (Daune, Kamelhaar)", emoji: "🪶" },
      { value: "plant", label: "Pflanzlich (Tencel, Aloe Vera)", emoji: "🌿" },
      { value: "synthetic", label: "Vegan-synthetisch (Primaloft)", emoji: "♻️" },
      { value: "any", label: "Egal – Hauptsache gut", emoji: "✨" },
    ],
  },
  {
    id: "allergies",
    number: 4,
    title: "Hast du Allergien oder empfindliche Haut?",
    options: [
      { value: "dust", label: "Hausstaub / Milben", emoji: "🤧" },
      { value: "animal", label: "Tierhaare / Daune", emoji: "🐥" },
      { value: "skin", label: "Empfindliche Haut", emoji: "🧴" },
      { value: "none", label: "Nein, alles gut", emoji: "✅" },
    ],
  },
  {
    id: "washing",
    number: 5,
    title: "Wie wichtig ist dir Waschbarkeit?",
    options: [
      { value: "machine60", label: "Muss bei 60° in die Maschine", emoji: "🧺" },
      { value: "occasional", label: "Gelegentlich waschbar reicht", emoji: "🫧" },
      { value: "professional", label: "Fachreinigung ist ok", emoji: "✨" },
    ],
  },
  {
    id: "sleepSituation",
    number: 6,
    title: "Schläfst du allein oder mit Partner*in?",
    options: [
      { value: "single", label: "Allein", emoji: "🛏" },
      { value: "partner", label: "Mit Partner*in", emoji: "💑" },
    ],
  },
  {
    id: "bedSize",
    number: 7,
    title: "Welche Deckengröße brauchst du?",
    subtitle: "Orientiere dich an deiner Matratzengröße.",
    options: [
      { value: "135x200", label: "135 × 200 cm (Standard)" },
      { value: "155x220", label: "155 × 220 cm (Übergröße)" },
      { value: "200x200", label: "200 × 200 cm (Doppel)" },
      { value: "200x220", label: "200 × 220 cm (Doppel XL)" },
      { value: "240x220", label: "240 × 220 cm (King)" },
    ],
  },
  {
    id: "skinFeel",
    number: 8,
    title: "Welches Hautgefühl magst du nachts?",
    options: [
      { value: "cool_smooth", label: "Kühl und glatt", emoji: "❄️" },
      { value: "soft_fluffy", label: "Weich und flauschig", emoji: "☁️" },
      { value: "light_airy", label: "Leicht und luftig", emoji: "🪶" },
    ],
  },
  {
    id: "budget",
    number: 9,
    title: "Was darf deine Traum-Sommerdecke kosten?",
    subtitle: "Mit 10 % Gutschein. Einmalige Investition, die 10+ Jahre hält.",
    options: [
      { value: "low", label: "Bis 80 €" },
      { value: "mid", label: "80 – 150 €" },
      { value: "high", label: "150 – 300 €" },
      { value: "premium", label: "300 € +" },
    ],
  },
];

export type Answers = Partial<Record<QuestionId, string>>;
