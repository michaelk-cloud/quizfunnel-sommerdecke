# Quizfunnel Sommerdecke — schlafenaufwolken.de

Mobile-first Quizfunnel für [BEFA Limburg](https://befa-limburg.de). Nutzer beantworten 9 Fragen, erhalten Top-3-Decken-Match, tragen Email ein, bekommen 10 %-Rabatt-Code und werden zum Shop geleitet.

## Tech

- Next.js 15 (App Router, Turbopack)
- Tailwind CSS v4
- Framer Motion
- Klaviyo API v2024-10
- Meta Pixel
- Vercel Hosting

## Setup

```bash
npm install
cp .env.example .env.local
# Env-Vars befüllen
npm run dev
```

## Env-Vars

| Key | Zweck |
|---|---|
| `KLAVIYO_PRIVATE_API_KEY` | Private API Key aus Klaviyo Admin → Settings → API Keys |
| `KLAVIYO_LIST_ID` | List-ID der Befa-Hauptliste |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID |
| `NEXT_PUBLIC_SITE_URL` | Canonical Domain |
| `NEXT_PUBLIC_DISCOUNT_CODE` | Rabattcode-Reveal (Standard: `BEFA10`) |

## Struktur

```
app/
  page.tsx             Landing
  quiz/page.tsx        9-Step Quiz
  ergebnis/            Top-3-Matches + Sticky Banner
  decke/[slug]/        Detail-LP pro Modell
  actions/subscribe.ts Klaviyo-Integration
components/            UI
lib/quiz/              Fragen, Decken, Matching-Algorithmus
```

## Matching-Logik

Siehe `lib/quiz/match.ts`. Jede Quiz-Antwort vergibt positive oder negative Score-Punkte an jedes Befa-Modell. Die Top 3 nach Score werden angezeigt. Hartausschlüsse (z. B. vegan + Daune) werden mit starken Minus-Punkten behandelt.

## Deploy

Vercel → GitHub-Repo verbinden → Env-Vars setzen → Domain `schlafenaufwolken.de` aufschalten.
