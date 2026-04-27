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

  // 1. Temperatur — die Reasons sprechen direkt zum Pain des Users
  if (answers.temperature === "heavy_sweat") {
    add(scores, "mikrofaser-aloe-vera", 4, "Aloe-Vera-Bezug bleibt selbst bei 28 °C kühl auf der Haut");
    add(scores, "primaloft-bio", 3, "Primaloft®-Faser leitet Hitzestau aktiv nach außen");
    add(scores, "tencel-daunendecke", 5, "Tencel-Faser saugt Schweiß auf, bevor er sich staut");
    add(scores, "tencel-gaensedaunendecke", 5, "Tencel-Bezug + leichte Daune: nichts wird klamm");
    add(scores, "clima-primaloft", 4, "Clima-Steppung leitet aufgestaute Wärme seitlich heraus");
  } else if (answers.temperature === "light_sweat") {
    add(scores, "primaloft-bio", 3, "Atmungsaktiv genug für laue Sommernächte");
    add(scores, "tencel-daunendecke", 3, "Tencel-Bezug zieht Feuchtigkeit weg, bevor sie nervt");
    add(scores, "clima-primaloft", 3, "Reguliert die Temperatur, ohne dass Sie aufwachen");
    add(scores, "kamelhaar-sommer", 2, "Kamelhaar puffert Schweiß-Spitzen natürlich ab");
  } else if (answers.temperature === "normal") {
    add(scores, "daunendecke-60", 3, "Sommer-leicht, ohne kalt zu wirken");
    add(scores, "gaensedaunendecke-90", 3, "Premium-Daune in der Sommer-Variante");
    add(scores, "kamelhaar-sommer", 3, "Reguliert sich von selbst – Sie merken's nicht");
    add(scores, "primaloft-bio", 2, "Vegan, leicht, ganzjährig nutzbar");
  } else if (answers.temperature === "cold") {
    add(scores, "gaensedaunendecke-90", 4, "Sommer-Gänsedaune: leicht, aber wärmt zuverlässig");
    add(scores, "kamelhaar-sommer", 4, "Kamelhaar hält Sie angenehm warm, ohne zu schwitzen");
    add(scores, "clima-primaloft", 3, "Clima-Steppung wärmt, leitet aber Hitzespitzen ab");
    add(scores, "daunendecke-60", 2, "Klassische Daune mit etwas mehr Wärmehalt");
  }

  // 2. Raumklima
  if (answers.roomClimate === "hot") {
    add(scores, "mikrofaser-aloe-vera", 2, "Speziell für Räume, die sich aufheizen");
    add(scores, "tencel-daunendecke", 3, "Tencel hält auch im Dachgeschoss kühl");
    add(scores, "tencel-gaensedaunendecke", 3, "Top-Wahl für heiße Schlafzimmer");
    add(scores, "clima-primaloft", 2, "Clima-Steppung gegen aufgestaute Hitze");
  } else if (answers.roomClimate === "warm") {
    add(scores, "primaloft-bio", 2, "Funktioniert auch bei warmen Nächten");
    add(scores, "tencel-daunendecke", 2, "Tencel passt sich der Raum-Wärme an");
    add(scores, "gaensedaunendecke-90", 1, "Sommer-Daune für gemäßigt warme Räume");
  } else if (answers.roomClimate === "cool") {
    add(scores, "kamelhaar-sommer", 3, "Wärmt mit, wenn der Raum kühl ist");
    add(scores, "gaensedaunendecke-90", 2, "Daunenwärme ohne Hitzestau");
    add(scores, "clima-primaloft", 2, "Wärmt gleichmäßig, kein Frieren am Rücken");
  }

  // 3. Material-Präferenz
  if (answers.material === "natural") {
    add(scores, "daunendecke-60", 4, "Reine Daune – wie früher, nur Sommer-leicht");
    add(scores, "gaensedaunendecke-90", 5, "90 % neue Gänsedaune, Premium-Naturfüllung");
    add(scores, "kamelhaar-sommer", 4, "100 % Kamelhaar, von Natur aus klimaregulierend");
    add(scores, "tencel-daunendecke", 3, "Daune mit pflanzlichem Tencel-Bezug");
    add(scores, "tencel-gaensedaunendecke", 4, "Premium-Daune kombiniert mit Tencel");
    ["primaloft-bio", "clima-primaloft", "mikrofaser-aloe-vera"].forEach((s) =>
      add(scores, s, -3)
    );
  } else if (answers.material === "plant") {
    add(scores, "tencel-daunendecke", 4, "Tencel® aus Eukalyptus-Holz, hautsanft");
    add(scores, "tencel-gaensedaunendecke", 4, "Tencel®-Bezug aus reinen Pflanzenfasern");
    add(scores, "mikrofaser-aloe-vera", 3, "Aloe-Vera-Veredelung beruhigt die Haut");
    add(scores, "primaloft-bio", 2, "Biobasierte Hightech-Faser");
  } else if (answers.material === "synthetic") {
    add(scores, "primaloft-bio", 5, "Vegan, biobasiert, recycelt-kompatibel");
    add(scores, "clima-primaloft", 5, "100 % vegan, hightech-temperaturregulierend");
    add(scores, "mikrofaser-aloe-vera", 3, "Vegan, allergiker-tauglich, leicht");
    ["daunendecke-60", "gaensedaunendecke-90", "kamelhaar-sommer", "tencel-daunendecke", "tencel-gaensedaunendecke"].forEach(
      (s) => add(scores, s, -4)
    );
  }

  // 4. Allergien
  if (answers.allergies === "dust") {
    add(scores, "mikrofaser-aloe-vera", 4, "Bei 60° waschbar: tötet Milben zuverlässig");
    add(scores, "primaloft-bio", 4, "60°-Wäsche-tauglich, ideal gegen Hausstaub");
    add(scores, "clima-primaloft", 4, "Komplett bei 60° waschbar");
    add(scores, "gaensedaunendecke-90", 2, "NOMITE-zertifiziert: für Hausstaub-Allergiker freigegeben");
    add(scores, "tencel-gaensedaunendecke", 2, "NOMITE-zertifiziert (Allergiker-tauglich)");
    add(scores, "daunendecke-60", -2);
  } else if (answers.allergies === "animal") {
    add(scores, "primaloft-bio", 4, "Komplett vegan, kein Federflug, keine Tierhaare");
    add(scores, "clima-primaloft", 4, "100 % tierfrei, hightech-vegan");
    add(scores, "mikrofaser-aloe-vera", 3, "Tierfrei und sanft zur Haut");
    ["daunendecke-60", "gaensedaunendecke-90", "kamelhaar-sommer", "tencel-daunendecke", "tencel-gaensedaunendecke"].forEach(
      (s) => add(scores, s, -6)
    );
  } else if (answers.allergies === "skin") {
    add(scores, "mikrofaser-aloe-vera", 3, "Aloe-Vera beruhigt empfindliche Haut nachts");
    add(scores, "tencel-daunendecke", 3, "Tencel-Bezug seidig-glatt, kein Kratzen");
    add(scores, "tencel-gaensedaunendecke", 3, "Tencel-Faser ist hautsanft, kein Reiben");
  }

  // 5. Waschbarkeit
  if (answers.washing === "machine60") {
    add(scores, "mikrofaser-aloe-vera", 4, "Bei 60° in die Maschine – Pflege wie ein T-Shirt");
    add(scores, "primaloft-bio", 4, "60°-Wäsche-fest, behält Form & Bauschkraft");
    add(scores, "clima-primaloft", 4, "Bei 60° waschbar, kein Bauschverlust");
    ["daunendecke-60", "gaensedaunendecke-90", "kamelhaar-sommer", "tencel-daunendecke", "tencel-gaensedaunendecke"].forEach(
      (s) => add(scores, s, -5)
    );
  } else if (answers.washing === "occasional") {
    add(scores, "primaloft-bio", 2, "Pflegeleicht – ab und zu reicht");
    add(scores, "clima-primaloft", 2, "Anspruchslos in der Pflege");
  }

  // 6. Skin Feel
  if (answers.skinFeel === "cool_smooth") {
    add(scores, "tencel-daunendecke", 4, "Seidig-kühl auf der Haut, selbst bei 28 °C");
    add(scores, "tencel-gaensedaunendecke", 4, "Tencel-Bezug bleibt kühl-glatt – sofort spürbar");
    add(scores, "mikrofaser-aloe-vera", 2, "Glatte Mikrofaser mit Aloe-Vera-Touch");
  } else if (answers.skinFeel === "soft_fluffy") {
    add(scores, "gaensedaunendecke-90", 4, "Daune hüllt Sie ein, ohne Wärmestau");
    add(scores, "daunendecke-60", 3, "Klassische Daunen-Wölkchen, Sommer-leicht");
    add(scores, "primaloft-bio", 3, "Daunig-weich, aber komplett vegan");
  } else if (answers.skinFeel === "light_airy") {
    add(scores, "gaensedaunendecke-90", 4, "Federleicht – Sommer-Gänsedaune");
    add(scores, "tencel-daunendecke", 3, "Leicht und atmend, schwebt fast über Ihnen");
    add(scores, "tencel-gaensedaunendecke", 3, "Top-leicht, Sommer-Variante");
    add(scores, "primaloft-bio", 2, "Hightech-leicht, ohne Schwere");
  }

  // 7. Schlafsituation – Paare brauchen aktive Klimaregelung
  if (answers.sleepSituation === "partner") {
    add(scores, "tencel-daunendecke", 2, "Zu zweit heizt's auf – Tencel führt Schweiß weg");
    add(scores, "tencel-gaensedaunendecke", 2, "Reguliert beide Wärmequellen unter der Decke");
    add(scores, "clima-primaloft", 2, "Clima-Steppung verteilt Paar-Wärme gleichmäßig");
    add(scores, "kamelhaar-sommer", 1, "Reguliert auch bei zwei Personen unaufgeregt");
  } else if (answers.sleepSituation === "single") {
    add(scores, "daunendecke-60", 1, "Klassische Solo-Begleitung im Sommer");
    add(scores, "mikrofaser-aloe-vera", 1, "Pflegeleicht für Ein-Personen-Haushalt");
  }

  // Build result; tie-break: höherer Score zuerst, bei Gleichstand günstigerer Einstiegspreis zuerst
  const results: MatchResult[] = decken
    .map((d) => ({
      decke: d,
      score: scores[d.slug]?.score ?? 0,
      reasons: scores[d.slug]?.reasons ?? [],
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.decke.priceFrom - b.decke.priceFrom;
    });

  // Guarantee we always return 3
  return results.slice(0, 3).map((r) => ({
    ...r,
    reasons: r.reasons.slice(0, 3),
  }));
}
