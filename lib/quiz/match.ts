import { decken, type Decke } from "./decken";
import type { Answers } from "./questions";

export type MatchResult = {
  decke: Decke;
  score: number;
  reasons: string[];
};

type ScoreMap = Record<string, { score: number; reasons: string[] }>;

function add(map: ScoreMap, slug: string, points: number, reason?: string) {
  if (!map[slug]) map[slug] = { score: 0, reasons: [] };
  map[slug].score += points;
  if (reason && !map[slug].reasons.includes(reason)) {
    map[slug].reasons.push(reason);
  }
}

export function matchTop3(answers: Answers): MatchResult[] {
  const scores: ScoreMap = {};
  decken.forEach((d) => (scores[d.slug] = { score: 0, reasons: [] }));

  // 1. Temperatur
  if (answers.temperature === "heavy_sweat") {
    add(scores, "mikrofaser-aloe-vera", 4, "Kühlende Aloe-Vera-Ausrüstung für heiße Nächte");
    add(scores, "primaloft-bio", 3, "Atmungsaktive Primaloft-Faser");
    add(scores, "tencel-daunendecke", 5, "Tencel-Bezug transportiert Feuchtigkeit aktiv ab");
    add(scores, "tencel-gaensedaunendecke", 5, "Tencel-Bezug hält dich spürbar kühler");
    add(scores, "clima-primaloft", 4, "Clima-Steppung leitet Körperwärme nach außen");
  } else if (answers.temperature === "light_sweat") {
    add(scores, "primaloft-bio", 3);
    add(scores, "tencel-daunendecke", 3);
    add(scores, "clima-primaloft", 3);
    add(scores, "kamelhaar-sommer", 2, "Kamelhaar reguliert Feuchtigkeit natürlich");
  } else if (answers.temperature === "normal") {
    add(scores, "daunendecke-60", 3);
    add(scores, "gaensedaunendecke-90", 3);
    add(scores, "kamelhaar-sommer", 3);
    add(scores, "primaloft-bio", 2);
  } else if (answers.temperature === "cold") {
    add(scores, "gaensedaunendecke-90", 4, "Gänsedaunen isolieren leicht, aber wärmer");
    add(scores, "kamelhaar-sommer", 4, "Kamelhaar bringt etwas mehr Wärmehalt");
    add(scores, "clima-primaloft", 3);
    add(scores, "daunendecke-60", 2);
  }

  // 2. Raumklima
  if (answers.roomClimate === "hot") {
    add(scores, "mikrofaser-aloe-vera", 2);
    add(scores, "tencel-daunendecke", 3);
    add(scores, "tencel-gaensedaunendecke", 3);
    add(scores, "clima-primaloft", 2);
  } else if (answers.roomClimate === "warm") {
    add(scores, "primaloft-bio", 2);
    add(scores, "tencel-daunendecke", 2);
    add(scores, "gaensedaunendecke-90", 1);
  } else if (answers.roomClimate === "cool") {
    add(scores, "kamelhaar-sommer", 3);
    add(scores, "gaensedaunendecke-90", 2);
    add(scores, "clima-primaloft", 2);
  }

  // 3. Material-Präferenz
  if (answers.material === "natural") {
    add(scores, "daunendecke-60", 4, "Klassische Naturfüllung");
    add(scores, "gaensedaunendecke-90", 5, "Hochwertige Gänsedaune");
    add(scores, "kamelhaar-sommer", 4, "Reines Naturhaar");
    add(scores, "tencel-daunendecke", 3);
    add(scores, "tencel-gaensedaunendecke", 4);
    ["primaloft-bio", "clima-primaloft", "mikrofaser-aloe-vera"].forEach((s) =>
      add(scores, s, -3)
    );
  } else if (answers.material === "plant") {
    add(scores, "tencel-daunendecke", 4, "Tencel aus Lyocell-Fasern");
    add(scores, "tencel-gaensedaunendecke", 4, "Tencel-Bezug aus Pflanzenfasern");
    add(scores, "mikrofaser-aloe-vera", 3, "Aloe-Vera-Ausrüstung");
    add(scores, "primaloft-bio", 2);
  } else if (answers.material === "synthetic") {
    add(scores, "primaloft-bio", 5, "Vegane Premium-Hightech-Füllung");
    add(scores, "clima-primaloft", 5, "100 % vegan");
    add(scores, "mikrofaser-aloe-vera", 3, "Rein synthetisch, tierfrei");
    ["daunendecke-60", "gaensedaunendecke-90", "kamelhaar-sommer", "tencel-daunendecke", "tencel-gaensedaunendecke"].forEach(
      (s) => add(scores, s, -4)
    );
  }

  // 4. Allergien
  if (answers.allergies === "dust") {
    add(scores, "mikrofaser-aloe-vera", 4, "Bei 60° waschbar – milbenunfreundlich");
    add(scores, "primaloft-bio", 4, "Waschbar bei 60°");
    add(scores, "clima-primaloft", 4, "Waschbar bei 60°");
    add(scores, "gaensedaunendecke-90", 2, "NOMITE-geeignet für Hausstauballergiker");
    add(scores, "tencel-gaensedaunendecke", 2, "NOMITE-geeignet");
    add(scores, "daunendecke-60", -2);
  } else if (answers.allergies === "animal") {
    add(scores, "primaloft-bio", 4, "100 % tierfrei");
    add(scores, "clima-primaloft", 4, "100 % tierfrei");
    add(scores, "mikrofaser-aloe-vera", 3, "Komplett vegan");
    ["daunendecke-60", "gaensedaunendecke-90", "kamelhaar-sommer", "tencel-daunendecke", "tencel-gaensedaunendecke"].forEach(
      (s) => add(scores, s, -6)
    );
  } else if (answers.allergies === "skin") {
    add(scores, "mikrofaser-aloe-vera", 3, "Aloe-Vera-Ausrüstung schont die Haut");
    add(scores, "tencel-daunendecke", 3, "Tencel-Bezug ist hautfreundlich");
    add(scores, "tencel-gaensedaunendecke", 3, "Tencel-Bezug ist hautfreundlich");
  }

  // 5. Waschbarkeit
  if (answers.washing === "machine60") {
    add(scores, "mikrofaser-aloe-vera", 4, "Bei 60° maschinenwaschbar");
    add(scores, "primaloft-bio", 4, "Bei 60° maschinenwaschbar");
    add(scores, "clima-primaloft", 4, "Bei 60° maschinenwaschbar");
    ["daunendecke-60", "gaensedaunendecke-90", "kamelhaar-sommer", "tencel-daunendecke", "tencel-gaensedaunendecke"].forEach(
      (s) => add(scores, s, -5)
    );
  } else if (answers.washing === "occasional") {
    add(scores, "primaloft-bio", 2);
    add(scores, "clima-primaloft", 2);
  }

  // 6. Skin Feel
  if (answers.skinFeel === "cool_smooth") {
    add(scores, "tencel-daunendecke", 4, "Seidig-kühles Tencel-Gefühl");
    add(scores, "tencel-gaensedaunendecke", 4, "Seidig-kühles Tencel-Gefühl");
    add(scores, "mikrofaser-aloe-vera", 2);
  } else if (answers.skinFeel === "soft_fluffy") {
    add(scores, "gaensedaunendecke-90", 4, "Daunen-typische Weichheit");
    add(scores, "daunendecke-60", 3);
    add(scores, "primaloft-bio", 3, "Daunen-ähnliches Gefühl, vegan");
  } else if (answers.skinFeel === "light_airy") {
    add(scores, "gaensedaunendecke-90", 4, "Extrem leicht");
    add(scores, "tencel-daunendecke", 3);
    add(scores, "tencel-gaensedaunendecke", 3);
    add(scores, "primaloft-bio", 2);
  }

  // 7. Budget
  const budget = answers.budget;
  decken.forEach((d) => {
    if (budget === "low" && d.priceFrom > 80) add(scores, d.slug, -5);
    if (budget === "mid") {
      if (d.priceFrom > 150) add(scores, d.slug, -3);
      if (d.priceFrom >= 60 && d.priceFrom <= 130) add(scores, d.slug, 2);
    }
    if (budget === "high") {
      if (d.priceFrom > 300) add(scores, d.slug, -2);
      if (d.priceFrom >= 100 && d.priceFrom <= 250) add(scores, d.slug, 2);
    }
    if (budget === "premium" && d.priceFrom >= 150) add(scores, d.slug, 2);
  });

  // Build result, filter hard exclusions and sort
  const results: MatchResult[] = decken
    .map((d) => ({
      decke: d,
      score: scores[d.slug]?.score ?? 0,
      reasons: scores[d.slug]?.reasons ?? [],
    }))
    .sort((a, b) => b.score - a.score);

  // Guarantee we always return 3
  return results.slice(0, 3).map((r) => ({
    ...r,
    reasons: r.reasons.slice(0, 3),
  }));
}
