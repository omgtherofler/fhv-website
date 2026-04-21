// Design tokens — Freiburger Hausverwaltung redesign.
// Warm regional palette: Münster sandstone + Schwarzwald forest + slate.
// Two theme variants, two type pairings. Exposed via Tweaks.

const FHV_THEMES = {
  breisgau: {
    name: 'Breisgau',
    bg: '#f5f4f0',
    surface: '#faf9f5',
    ink: '#1a1a1a',
    inkSoft: '#3a3a38',
    muted: '#6b6b66',
    rule: '#d9d5cb',
    primary: '#2a3f5f',      // Münster slate-blue
    primarySoft: '#e6e9f0',
    accent: '#8b9d7f',        // Schwarzwald sage
    accentSoft: '#e3e7dc',
    warm: '#c89b5e',          // sandstone
    warmSoft: '#f1e7d4',
  },
  sandstone: {
    name: 'Sandstein',
    bg: '#f4efe8',
    surface: '#faf6ee',
    ink: '#2b2118',
    inkSoft: '#4a3c2e',
    muted: '#7a6a58',
    rule: '#ddd2bf',
    primary: '#5b3a29',       // Münster stone
    primarySoft: '#ead9c4',
    accent: '#6d7b58',        // olive
    accentSoft: '#dfe1d1',
    warm: '#a67c52',
    warmSoft: '#ecdcc5',
  },
  schwarzwald: {
    name: 'Schwarzwald',
    bg: '#f1f0ec',
    surface: '#fafaf6',
    ink: '#141814',
    inkSoft: '#2c332c',
    muted: '#5c6358',
    rule: '#cfd2c8',
    primary: '#1f3a2e',       // deep forest
    primarySoft: '#d8e0d4',
    accent: '#b8915a',        // warm wood
    accentSoft: '#ebe0c9',
    warm: '#b8915a',
    warmSoft: '#ebe0c9',
  },
};

const FHV_TYPE = {
  editorial: {
    name: 'Editorial',
    display: "'Fraunces', 'Source Serif 4', Georgia, serif",
    body: "'Source Serif 4', Georgia, serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
    displayWeight: 500,
    displayTracking: '-0.02em',
  },
  classic: {
    name: 'Klassisch',
    display: "'Cormorant Garamond', 'EB Garamond', Georgia, serif",
    body: "'Lora', Georgia, serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
    displayWeight: 500,
    displayTracking: '-0.005em',
  },
};

window.FHV_THEMES = FHV_THEMES;
window.FHV_TYPE = FHV_TYPE;
