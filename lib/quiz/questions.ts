export type QuestionId =
  | "temperature"
  | "roomClimate"
  | "material"
  | "allergies"
  | "washing"
  | "sleepSituation"
  | "bedSize"
  | "skinFeel";

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
  insight?: string;
};

export const questions: Question[] = [
  {
    id: "temperature",
    number: 1,
    title: "Wie oft wachen Sie nachts durchgeschwitzt auf?",
    subtitle:
      "Seien Sie ehrlich – das verrät uns am meisten über die richtige Decke für Sie.",
    options: [
      { value: "heavy_sweat", label: "Fast jede Nacht – es nervt wirklich", emoji: "🔥" },
      { value: "light_sweat", label: "Immer wieder, vor allem im Sommer", emoji: "💧" },
      { value: "normal", label: "Selten – geht eigentlich", emoji: "🌤" },
      { value: "cold", label: "Im Gegenteil: Mir ist oft zu kalt", emoji: "❄️" },
    ],
    insight:
      "Die meisten Decken speichern Wärme – statt sie abzuleiten. BEFA fertigt seit 1994 in Limburg genau für dieses Problem.",
  },
  {
    id: "roomClimate",
    number: 2,
    title: "Wie hart trifft Ihr Schlafzimmer die Sommerhitze?",
    subtitle: "Dachgeschoss, Westseite, kein Rollladen – das alles macht einen Unterschied.",
    options: [
      { value: "hot", label: "Unter dem Dach – hier staut sich alles", emoji: "☀️" },
      { value: "warm", label: "Warm, aber auszuhalten", emoji: "🌡" },
      { value: "normal", label: "Normal temperiert", emoji: "🌙" },
      { value: "cool", label: "Eher kühl, ich lüfte viel", emoji: "🌬" },
    ],
    insight:
      "Unsere Clima-Steppung wurde für genau diese Situation entwickelt: Sie leitet gestaute Körperwärme seitlich nach außen ab.",
  },
  {
    id: "material",
    number: 3,
    title: "Wenn Sie an Ihre ideale Decke denken – woraus ist sie?",
    subtitle: "Es gibt kein falsch. Jedes Material hat seinen eigenen Charakter.",
    options: [
      { value: "natural", label: "Etwas Natürliches – Daune oder Kamelhaar", emoji: "🪶" },
      { value: "plant", label: "Pflanzlich – Tencel oder Aloe Vera", emoji: "🌿" },
      { value: "synthetic", label: "Vegan & synthetisch – Primaloft", emoji: "♻️" },
      { value: "any", label: "Egal – Hauptsache, sie funktioniert", emoji: "✨" },
    ],
    insight:
      "Unsere Daunen stammen ausschließlich von Downpass-zertifizierten Betrieben. Kein Lebendrupf, kein Zwangsstopfen – das garantieren wir schriftlich.",
  },
  {
    id: "allergies",
    number: 4,
    title: "Reagiert Ihre Haut auf etwas – oder sind Sie empfindlich?",
    subtitle: "Kein Grund zur Sorge. Wir haben für jede Empfindlichkeit die passende Lösung.",
    options: [
      { value: "dust", label: "Hausstaub & Milben sind mein Problem", emoji: "🤧" },
      { value: "animal", label: "Tierhaare oder Daune machen mir zu schaffen", emoji: "🐥" },
      { value: "skin", label: "Meine Haut reagiert schnell gereizt", emoji: "🧴" },
      { value: "none", label: "Alles gut – ich vertrage alles", emoji: "✅" },
    ],
    insight:
      "Jeder BEFA-Bezug ist nach Oeko-Tex Standard 100 zertifiziert – garantiert frei von gesundheitsbedenklichen Schadstoffen.",
  },
  {
    id: "washing",
    number: 5,
    title: "Soll Ihre Decke auch in 5 Jahren noch frisch sein?",
    subtitle: "Waschbarkeit entscheidet, wie lange sich eine Decke wirklich gut anfühlt.",
    options: [
      { value: "machine60", label: "Ja – sie muss bei 60 °C in die Maschine", emoji: "🧺" },
      { value: "occasional", label: "Gelegentlich waschen reicht mir", emoji: "🫧" },
      { value: "professional", label: "Fachreinigung ist für mich ok", emoji: "✨" },
    ],
    insight:
      "Unsere waschbaren Modelle behalten ihre Form auch nach dutzenden 60°-Wäschen – Ergebnis von drei Jahrzehnten Manufaktur-Handwerk.",
  },
  {
    id: "sleepSituation",
    number: 6,
    title: "Teilen Sie Ihr Bett – oder gehört es nur Ihnen?",
    options: [
      { value: "single", label: "Nur mir – herrlich", emoji: "🛏" },
      { value: "partner", label: "Mit Partner*in", emoji: "💑" },
    ],
    insight:
      "Zu zweit heizt sich das Bett schneller auf. Deshalb haben wir Modelle mit besonders gleichmäßiger Füllverteilung – keine Kältebrücken beim Wälzen.",
  },
  {
    id: "bedSize",
    number: 7,
    title: "Welche Größe hat Ihre Matratze?",
    subtitle: "Wir empfehlen Ihnen die passende Decken-Größe – ohne Rechnerei.",
    options: [
      { value: "135x200", label: "135 × 200 cm (Standard)" },
      { value: "155x220", label: "155 × 220 cm (Übergröße)" },
      { value: "200x200", label: "200 × 200 cm (Doppel)" },
      { value: "200x220", label: "200 × 220 cm (Doppel XL)" },
      { value: "240x220", label: "240 × 220 cm (King)" },
    ],
    insight:
      "Jede Größe wird in unserer Manufaktur in Limburg einzeln konfektioniert – keine Massenware aus Fernost.",
  },
  {
    id: "skinFeel",
    number: 8,
    title: "Stellen Sie sich vor, Sie liegen gerade im Bett – wie fühlt sich die Decke an?",
    subtitle: "Das entscheidet über das kleine Glück der ersten Minuten nach dem Hinlegen.",
    options: [
      { value: "cool_smooth", label: "Kühl und seidig-glatt", emoji: "❄️" },
      { value: "soft_fluffy", label: "Weich und umhüllend", emoji: "☁️" },
      { value: "light_airy", label: "Federleicht und luftig", emoji: "🪶" },
    ],
    insight:
      "Unser Tencel-Bezug nimmt bis zu 50 % mehr Feuchtigkeit auf als Baumwolle – und bleibt kühl-glatt, selbst bei 28 °C im Schlafzimmer.",
  },
];

export type Answers = Partial<Record<QuestionId, string>>;
