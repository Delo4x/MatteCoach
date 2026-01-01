# MatteCoach - Matematikträningsapp

En interaktiv matematikträningsapp byggd med React, TypeScript och Tailwind CSS. Appen hjälper användare att träna matematik genom mikrolektioner och quiz med omedelbar feedback.

## Funktioner

- **Dashboard**: Översikt över nuvarande nivå, statistik och snabbåtkomst till olika områden
- **Tre matematikområden**: 
  - Räkna med tal (Addition, subtraktion, multiplikation, division)
  - Ekvationer (Lösa x-värden)
  - Geometri (Former, area, omkrets, vinklar)
- **Tre nivåer per område**: Grad 1 (Lätt), Grad 2 (Medel), Grad 3 (Svår)
- **Mikrolektioner**: Korta lektioner med exempel och övningsfrågor
- **Quizpaket**: 3 paket per nivå med 10 frågor vardera
- **Progressspårning**: Automatisk spårning av framsteg, streak och felaktiga svar
- **Resultatsida**: Historik över alla quiz och statistik

## Teknisk stack

- **React 18** med TypeScript
- **Vite** som build tool
- **React Router** för routing
- **Tailwind CSS** för styling
- **Lucide React** för ikoner
- **LocalStorage** för datalagring

## Installation

1. Installera dependencies:
```bash
npm install
```

2. Starta utvecklingsservern:
```bash
npm run dev
```

3. Öppna appen i webbläsaren på `http://localhost:5173`

## Bygga för produktion

```bash
npm run build
```

Byggfilerna kommer att finnas i `dist/` mappen.

## Projektstruktur

```
src/
├── components/
│   └── ui/          # UI-komponenter (Button, Card, Input, Progress)
├── hooks/
│   └── useProgress.ts  # Hook för progresshantering
├── lib/
│   ├── questions.ts    # Frågegenerering och validering
│   └── utils.ts        # Hjälpfunktioner
├── pages/
│   ├── Dashboard.tsx       # Startsida
│   ├── AreaSelection.tsx   # Välj nivå för ett område
│   ├── Learn.tsx           # Mikrolektioner
│   ├── PacketSelection.tsx # Välj quizpaket
│   ├── Quiz.tsx            # Quiz-sidan
│   └── Results.tsx         # Resultatsida
├── types/
│   └── math.ts         # TypeScript-typer
├── App.tsx             # Huvudkomponent med routing
├── main.tsx            # Entry point
└── index.css           # Globala stilar
```

## Funktioner i detalj

### Progressspårning
- Automatisk beräkning av nuvarande nivå baserat på senaste 20 frågorna
- Streak-räkning (dagar i rad med aktivitet)
- Spårning av felaktiga svar för att kunna träna svagheter

### Quiz-funktionalitet
- 10 frågor per quiz
- Omedelbar feedback (Rätt/Fel)
- Steg-för-steg-lösningar för varje fråga
- Möjlighet att hoppa över frågor
- Resultatsammanfattning efter quiz

### Responsiv design
- Fungerar på desktop, tablet och mobil
- Modern och ren design med animationer

## Licens

MIT

