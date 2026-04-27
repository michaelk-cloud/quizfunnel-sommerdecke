export type Decke = {
  slug: string;
  name: string;
  tagline: string;
  fillingType: "daune" | "daune-premium" | "pflanzlich" | "synthetisch" | "naturhaar";
  priceFrom: number;
  image: string;
  heroImage: string;
  shopUrl: string;
  material: string;
  warmthLevel: 1 | 2 | 3; // 1 = sehr kühl, 3 = wärmer
  washable: boolean;
  allergikerSafe: boolean;
  vegan: boolean;
  usps: string[];
  description: string;
  careNotes: string;
};

export const decken: Decke[] = [
  {
    slug: "mikrofaser-aloe-vera",
    name: "Mikrofaser Aloe Vera Sommerdecke",
    tagline: "Der kühlende Einstieg – pflegeleicht und hygienisch.",
    fillingType: "synthetisch",
    priceFrom: 39.9,
    image: "/decken/mikrofaser-aloe-vera.jpg",
    heroImage: "/decken/mikrofaser-aloe-vera.jpg",
    shopUrl: "https://befa-limburg.de/products/bettdecke-sommer",
    material: "100 % Polyester, Aloe-Vera-Ausrüstung",
    warmthLevel: 1,
    washable: true,
    allergikerSafe: true,
    vegan: true,
    usps: [
      "Bei 60° waschbar – ideal für Allergiker",
      "Aloe-Vera-Ausrüstung pflegt die Haut",
      "Leicht, atmungsaktiv, schnelltrocknend",
      "Beste Wahl für heiße Nächte unter Budget",
    ],
    description:
      "Eine vollsynthetische Sommerdecke für alle, die unkomplizierte Hygiene lieben. Die Aloe-Vera-Ausrüstung sorgt für ein zartes Hautgefühl, das Füllmaterial bleibt leicht und atmungsaktiv.",
    careNotes: "Waschbar bei 60 °C, trocknergeeignet.",
  },
  {
    slug: "primaloft-bio",
    name: "Primaloft Bio Bettdecke",
    tagline: "Die vegane Hightech-Decke mit seidigem Hautgefühl.",
    fillingType: "synthetisch",
    priceFrom: 69.9,
    image: "/decken/primaloft-bio.jpg",
    heroImage: "/decken/primaloft-bio.jpg",
    shopUrl: "https://befa-limburg.de/products/primaloft-bettdecke-sommer",
    material: "100 % Primaloft Bio (biologisch abbaubar)",
    warmthLevel: 1,
    washable: true,
    allergikerSafe: true,
    vegan: true,
    usps: [
      "Biologisch abbaubare Hightech-Faser",
      "Fühlt sich an wie Daune – ohne Tierprodukte",
      "Waschbar bei 60°, trocknergeeignet",
      "Perfekt für Veganer und Allergiker",
    ],
    description:
      "Primaloft Bio ist eine der modernsten synthetischen Füllungen am Markt: Bauschig wie Daune, aber vegan, biologisch abbaubar und unkompliziert in der Pflege. Die Decke hält angenehm warm ohne zu überhitzen.",
    careNotes: "Waschbar bei 60 °C, trocknergeeignet.",
  },
  {
    slug: "clima-primaloft",
    name: "Clima Bettdecke Primaloft",
    tagline: "Temperaturregulierend durch die gesamte Saison.",
    fillingType: "synthetisch",
    priceFrom: 89.9,
    image: "/decken/clima-primaloft.jpg",
    heroImage: "/decken/clima-primaloft.jpg",
    shopUrl: "https://befa-limburg.de/products/clima-bettdecke-100-primaloft-bio-sommerdecke",
    material: "100 % Primaloft Bio, Clima-Steppung",
    warmthLevel: 2,
    washable: true,
    allergikerSafe: true,
    vegan: true,
    usps: [
      "Clima-Zonen leiten Feuchtigkeit nach außen",
      "Ideal für Paare mit unterschiedlichem Wärmebedürfnis",
      "Vegan, biologisch abbaubar",
      "Waschbar bei 60°",
    ],
    description:
      "Die Clima-Steppung transportiert Körperfeuchtigkeit schneller ab und hält dich auch in lauen Sommernächten trocken. Eine überzeugende Allrounder-Option für alle, die nicht zwei Decken pro Jahr brauchen wollen.",
    careNotes: "Waschbar bei 60 °C, trocknergeeignet.",
  },
  {
    slug: "daunendecke-60",
    name: "Daunendecke 60 % Daune – Sommer",
    tagline: "Der sanfte Einstieg in echte Naturfüllung.",
    fillingType: "daune",
    priceFrom: 85.9,
    image: "/decken/daunendecke-60.jpg",
    heroImage: "/decken/daunendecke-60.jpg",
    shopUrl: "https://befa-limburg.de/products/sommer-daunendecke-60",
    material: "60 % neue Daune, 40 % neue Feder",
    warmthLevel: 1,
    washable: false,
    allergikerSafe: false,
    vegan: false,
    usps: [
      "Bewährte Daunen-Feder-Mischung",
      "Downpass-zertifiziert – ethische Herkunft",
      "Made in Germany",
      "Einstieg in Naturdecken zum fairen Preis",
    ],
    description:
      "Unser Klassiker für alle, die das natürliche Schlafgefühl von Daunen schätzen. Die 60/40-Mischung sorgt für einen angenehmen Stand der Decke und wohlige Leichtigkeit in Sommernächten.",
    careNotes: "Fachreinigung empfohlen.",
  },
  {
    slug: "gaensedaunendecke-90",
    name: "Gänsedaunendecke 90 % – Sommer",
    tagline: "Leichter Premium-Klassiker aus reiner Gänsedaune.",
    fillingType: "daune-premium",
    priceFrom: 129.9,
    image: "/decken/gaensedaunendecke-90.jpg",
    heroImage: "/decken/gaensedaunendecke-90.jpg",
    shopUrl: "https://befa-limburg.de/products/sommer-bettdecke-gansedaunen",
    material: "90 % neue Gänsedaune, 10 % neue Feder",
    warmthLevel: 1,
    washable: false,
    allergikerSafe: false,
    vegan: false,
    usps: [
      "90 % Gänsedaune – außergewöhnliche Leichtigkeit",
      "Downpass-zertifiziert",
      "NOMITE-geeignet für Hausstauballergiker",
      "Handwerkliche Fertigung in Deutschland",
    ],
    description:
      "Gänsedaunen sind größer und bauschiger als Entendaunen – das Resultat ist eine federleichte Sommerdecke mit maximalem Isolationswert pro Gramm. Die perfekte Wahl für Naturliebhaber mit Qualitätsanspruch.",
    careNotes: "Fachreinigung empfohlen.",
  },
  {
    slug: "tencel-daunendecke",
    name: "Tencel Daunendecke",
    tagline: "Daune trifft kühlen Tencel-Bezug.",
    fillingType: "daune-premium",
    priceFrom: 189.9,
    image: "/decken/tencel-daunendecke.jpg",
    heroImage: "/decken/tencel-daunendecke.jpg",
    shopUrl: "https://befa-limburg.de/products/tencel-daunendecke-90-neue-weisse-naturdaune-sommerdecke",
    material: "90 % neue Daune mit Tencel™-Bezug",
    warmthLevel: 1,
    washable: false,
    allergikerSafe: true,
    vegan: false,
    usps: [
      "Tencel-Bezug fühlt sich seidig-kühl auf der Haut an",
      "Feuchtigkeitsabtransport dank Lyocell-Fasern",
      "90 % Daunenfüllung, federleicht",
      "Made in Germany, Oeko-Tex Standard 100",
    ],
    description:
      "Die Kombination aus hochwertiger Daunenfüllung und einem Bezug aus Tencel™-Lyocell ist unschlagbar, wenn du nachts schwitzt, aber nicht auf Naturfüllung verzichten willst. Der Bezug fühlt sich seidig-kühl an und transportiert Feuchtigkeit aktiv ab.",
    careNotes: "Fachreinigung empfohlen.",
  },
  {
    slug: "kamelhaar-sommer",
    name: "Kamelhaar Sommerdecke",
    tagline: "Temperaturausgleich durch Naturhaar.",
    fillingType: "naturhaar",
    priceFrom: 149.9,
    image: "/decken/kamelhaar-sommer.jpg",
    heroImage: "/decken/kamelhaar-sommer.jpg",
    shopUrl: "https://befa-limburg.de/products/kamelhaar-bettdecke-100-kamelhaarfullung-sommerdecke",
    material: "100 % Kamelhaar-Flaumfüllung",
    warmthLevel: 2,
    washable: false,
    allergikerSafe: true,
    vegan: false,
    usps: [
      "Kamelhaar reguliert Temperatur auf natürliche Weise",
      "Nimmt Feuchtigkeit auf, ohne sich klamm anzufühlen",
      "Für Allergiker geeignet",
      "Eine Decke für fast alle Jahreszeiten",
    ],
    description:
      "Kamelhaar ist eines der faszinierendsten Naturmaterialien: Es nimmt viel Feuchtigkeit auf und gibt sie langsam wieder ab – ideal für Menschen mit wechselndem Wärmebedürfnis. Besonders beliebt bei Allergikern, die kein Synthetik wollen.",
    careNotes: "Fachreinigung empfohlen.",
  },
  {
    slug: "tencel-gaensedaunendecke",
    name: "Tencel Gänsedaunendecke",
    tagline: "Das Premium-Sommer-Flaggschiff.",
    fillingType: "daune-premium",
    priceFrom: 279.9,
    image: "/decken/tencel-gaensedaunendecke.jpg",
    heroImage: "/decken/tencel-gaensedaunendecke.jpg",
    shopUrl: "https://befa-limburg.de/products/tencel-daunendecke-90-neue-weisse-gansedaune-sommer",
    material: "90 % neue Gänsedaune mit Tencel™-Bezug",
    warmthLevel: 1,
    washable: false,
    allergikerSafe: true,
    vegan: false,
    usps: [
      "Das Beste aus zwei Welten: 90 % Gänsedaune + Tencel",
      "Außergewöhnlich leicht, kühl auf der Haut",
      "NOMITE-geeignet",
      "Handgefertigt in Limburg",
    ],
    description:
      "Wenn du keine Kompromisse machen willst: Die Tencel Gänsedaunendecke kombiniert die leichteste und bauschigste Daunenfüllung mit dem kühlenden Lyocell-Bezug. Jahrzehntelange Lebensdauer bei richtiger Pflege.",
    careNotes: "Fachreinigung empfohlen.",
  },
];

export function getDeckeBySlug(slug: string): Decke | undefined {
  return decken.find((d) => d.slug === slug);
}
