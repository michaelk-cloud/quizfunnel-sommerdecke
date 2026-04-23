export type QuestionId =
  | "temperature"
  | "painDuration"
  | "roomClimate"
  | "morningImpact"
  | "material"
  | "allergies"
  | "washing"
  | "sleepSituation"
  | "bedSize"
  | "skinFeel"
  | "dreamState";

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
    id: "painDuration",
    number: 2,
    title: "Wie lange geht das schon so?",
    subtitle: "Damit sind Sie nicht allein. Die gute Nachricht: Es lässt sich ändern.",
    options: [
      { value: "recent", label: "Seit diesem Sommer", emoji: "🌱" },
      { value: "one_two", label: "Ein, zwei Jahre ungefähr", emoji: "📆" },
      { value: "longer", label: "Schon länger – 3 Jahre oder mehr", emoji: "⏳" },
      { value: "always", label: "Solange ich denken kann", emoji: "😮‍💨" },
    ],
    insight:
      "Je länger die Nächte schlecht sind, desto mehr summiert sich das tagsüber – an Energie, Laune, Konzentration. Das muss nicht sein.",
  },
  {
    id: "roomClimate",
    number: 3,
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
    id: "morningImpact",
    number: 4,
    title: "Wie starten Sie nach einer schlechten Nacht in den Tag?",
    subtitle: "Was viele unterschätzen: wie sehr eine Nacht den ganzen Tag färbt.",
    options: [
      { value: "irritated", label: "Gereizt – schon beim ersten Kaffee", emoji: "😤" },
      { value: "exhausted", label: "Müde, obwohl ich „genug“ geschlafen habe", emoji: "🥱" },
      { value: "foggy", label: "Kopf dumpf, Konzentration fehlt", emoji: "🌫" },
      { value: "ok", label: "Eigentlich ok – noch", emoji: "🙂" },
    ],
    insight:
      "Guter Schlaf ist kein Luxus. Er ist die Grundlage für Energie, Geduld, Fokus. Wer das einmal spürt, will nicht mehr zurück.",
  },
  {
    id: "material",
    number: 5,
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
    number: 6,
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
    number: 7,
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
    number: 8,
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
    number: 9,
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
    number: 10,
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
  {
    id: "dreamState",
    number: 11,
    title: "Wenn Sie wieder wirklich durchschlafen – was wäre das wert?",
    subtitle:
      "Stellen Sie sich den ersten Kaffee morgen vor: nicht gerädert, sondern klar und wach.",
    options: [
      { value: "energy", label: "Endlich Energie für den Tag", emoji: "⚡" },
      { value: "patience", label: "Geduldiger mit Familie und Kollegen", emoji: "🫶" },
      { value: "focus", label: "Konzentrierter bei der Arbeit", emoji: "🎯" },
      { value: "myself", label: "Einfach wieder ich selbst sein", emoji: "🌅" },
    ],
    insight:
      "Unsere Kunden berichten dasselbe: Die erste durchgeschlafene Woche vergisst man nicht mehr. Genau darauf arbeiten wir zu.",
  },
];

export type Answers = Partial<Record<QuestionId, string>>;
