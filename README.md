# Pacman Veille

Dashboard de veille cybersécurité agrégant des flux RSS de sources différentes avec catégorisation automatique et filtrage temporel.

## Fonctionnalités

- Agrégation de flux RSS (presse spécialisée + ANSSI)
- Catégorisation automatique des articles (Ransomware, Vulnérabilités, Malware, etc.)
- Filtrage par période (aujourd'hui, 48h, semaine)
- Recherche par mots-clés
- Interface responsive (mobile + desktop)
- Mode sombre

## Stack technique

- **Framework** : React 19
- **Build** : Vite 6
- **Langage** : TypeScript
- **Styles** : Tailwind CSS 4
- **Icônes** : Font Awesome 6

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## Build

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

## Structure du projet

```
├── App.tsx                 # Composant principal
├── index.tsx               # Point d'entrée React
├── index.css               # Styles Tailwind + custom
├── types.ts                # Définitions TypeScript
├── constants.ts            # Configuration des flux RSS
├── components/
│   ├── ArticleCard.tsx     # Carte d'article
│   └── FilterSidebar.tsx   # Barre de filtres
└── utils/
    └── feedParser.ts       # Parsing RSS et catégorisation
```

## Sources RSS

### Presse spécialisée
- The Hacker News
- BleepingComputer
- LeMagIT Sécurité
- Wired Security
- Zataz
- Dyrk

### ANSSI / CERT-FR
- Alertes
- Menaces & Incidents
- Avis
- IOC
- Durcissement
- Actualités

## Licence

MIT
