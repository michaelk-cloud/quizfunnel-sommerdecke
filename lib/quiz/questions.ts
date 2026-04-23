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
  insight?: string;
};

export const questions: Question[] = [
  {
    id: "temperature",
    number: 1,
    title: "Wie ist Ihre Schlaftemperatur im Sommer?",
    subtitle: "Seien Sie ehrlich – davon hängt das Matching am stärksten ab.",
    options: [
      { value: "heavy_sweat", label: "Ich schwitze stark", emoji: "🔥" },
      { value: "light_sweat", label: "Ich schwitze leicht", emoji: "💧" },
      { value: "normal", label: "Normal – weder noch", emoji: "🌤" },
      { value: "cold", label: "Ich friere trotzdem", emoji: "❄️" },
    ],
    insight:
      "BEFA fertigt seit 1994 in Limburg – ausgelegt auf deutsche Schlafzimmer, nicht auf klimatisierte Hotelzimmer.",
  },
  {
    id: "roomClimate",
    number: 2,
    title: "Wie ist Ihr Schlafzimmer nachts?",
    options: [
      { value: "hot", label: "Dachgeschoss oder sehr heiß", emoji: "☀️" },
      { value: "warm", label: "Warm, aber erträglich", emoji: "🌡" },
      { value: "normal", label: "Normal temperiert", emoji: "🌙" },
      { value: "cool", label: "Eher kühl", emoji: "🌬" },
    ],
    insight:
      "Unsere Clima-Steppung wurde speziell für Dachgeschoss-Schläfer entwickelt: Sie leitet gestaute Körperwärme seitlich nach außen ab.",
  },
  {
    id: "material",
    number: 3,
    title: "Welches Material bevorzugen Sie?",
    subtitle: "Wählen Sie, was sich für Sie richtig anfühlt.",
    options: [
      { value: "natural", label: "Naturfüllung (Daune, Kamelhaar)", emoji: "🪶" },
      { value: "plant", label: "Pflanzlich (Tencel, Aloe Vera)", emoji: "🌿" },
      { value: "synthetic", label: "Vegan-synthetisch (Primaloft)", emoji: "♻️" },
      { value: "any", label: "Egal – Hauptsache gut", emoji: "✨" },
    ],
    insight:
      "Unsere Daunen stammen ausschließlich von Downpass-zertifizierten Betrieben – keine Lebendrupf, kein Zwangsstopfen.",
  },
  {
    id: "allergies",
    number: 4,
    title: "Haben Sie Allergien oder empfindliche Haut?",
    options: [
      { value: "dust", label: "Hausstaub / Milben", emoji: "🤧" },
      { value: "animal", label: "Tierhaare / Daune", emoji: "🐥" },
      { value: "skin", label: "Empfindliche Haut", emoji: "🧴" },
      { value: "none", label: "Nein, alles gut", emoji: "✅" },
    ],
    insight:
      "Jeder BEFA-Bezug ist nach Oeko-Tex Standard 100 geprüft – frei von gesundheitsbedenklichen Schadstoffen.",
  },
  {
    id: "washing",
    number: 5,
    title: "Wie wichtig ist Ihnen die Waschbarkeit?",
    options: [
      { value: "machine60", label: "Muss bei 60° in die Maschine", emoji: "🧺" },
      { value: "occasional", label: "Gelegentlich waschbar reicht", emoji: "🫧" },
      { value: "professional", label: "Fachreinigung ist ok", emoji: "✨" },
    ],
    insight:
      "Unsere waschbaren Modelle behalten ihre Form auch nach dutzenden 60°-Wäschen – das Ergebnis von drei Jahrzehnten Bettwaren-Handwerk.",
  },
  {
    id: "sleepSituation",
    number: 6,
    title: "Schlafen Sie allein oder zu zweit?",
    options: [
      { value: "single", label: "Allein", emoji: "🛏" },
      { value: "partner", label: "Mit Partner*in", emoji: "💑" },
    ],
    insight:
      "Zu zweit heizt sich das Bett schneller auf. Deshalb haben wir Modelle mit besonders gleichmäßiger Füllverteilung – keine Kältebrücken beim Wälzen.",
  },
  {
    id: "bedSize",
    number: 7,
    title: "Welche Deckengröße brauchen Sie?",
    subtitle: "Orientieren Sie sich an Ihrer Matratzengröße.",
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
    title: "Welches Hautgefühl mögen Sie nachts?",
    options: [
      { value: "cool_smooth", label: "Kühl und glatt", emoji: "❄️" },
      { value: "soft_fluffy", label: "Weich und flauschig", emoji: "☁️" },
      { value: "light_airy", label: "Leicht und luftig", emoji: "🪶" },
    ],
    insight:
      "Der Tencel-Bezug nimmt bis zu 50 % mehr Feuchtigkeit auf als Baumwolle – kühl-glatt selbst bei 28 °C im Schlafzimmer.",
  },
  {
    id: "budget",
    number: 9,
    title: "Was darf Ihre Traum-Sommerdecke kosten?",
    subtitle: "Einmalige Investition, die Sie viele Jahre begleitet.",
    options: [
      { value: "low", label: "Bis 80 €" },
      { value: "mid", label: "80 – 150 €" },
      { value: "high", label: "150 – 300 €" },
      { value: "premium", label: "300 € +" },
    ],
    insight:
      "Eine BEFA-Decke begleitet Sie im Schnitt viele Jahre. Auf die Nacht gerechnet zahlen Sie wenige Cent – für gesunden Schlaf.",
  },
];

export type Answers = Partial<Record<QuestionId, string>>;
