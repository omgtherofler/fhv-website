export const content = {
  nav: [
    { label: 'Leistungen', href: '#leistungen' },
    { label: 'Region', href: '#region' },
    { label: 'Über uns', href: '#ueber-uns' },
    { label: 'Preise', href: '#preise' },
    { label: 'Stimmen', href: '#stimmen' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
  hero: {
    kicker: 'Hausverwaltung · Freiburg im Breisgau',
    headline: ['Ihre Immobilie,', 'in ruhigen Händen.'],
    lede: 'Wir verwalten Miet- und Eigentumsobjekte in Freiburg und Umgebung — mit der Sorgfalt eines Familienbetriebs und den Werkzeugen einer modernen Verwaltung.',
    primary: { label: 'Termin vereinbaren', href: '#kontakt' },
    secondary: { label: 'Leistungen ansehen', href: '#leistungen' },
  },
  stats: [
    { n: '480+', l: 'verwaltete Einheiten' },
    { n: '62', l: 'WEG-Gemeinschaften' },
    { n: '< 24 h', l: 'Reaktionszeit' },
    { n: '7', l: 'Jahre im Breisgau' },
  ],
  services: [
    {
      id: 'miet', num: '01', title: 'Mietverwaltung',
      lede: 'Ein Ansprechpartner für Ihre Mietobjekte — von der Abrechnung bis zum Handwerker-Termin.',
      groups: [
        { label: 'Kaufmännisch', items: ['Mietverträge & Anpassungen', 'Betriebskostenabrechnung', 'Forderungsmanagement', 'Kautionsverwaltung'] },
        { label: 'Technisch', items: ['Instandhaltung & Reparaturen', 'Koordination von Handwerkern', 'Angebotsvergleich', 'Modernisierungen'] },
        { label: 'Betreuung', items: ['Mieter- und Eigentümerkontakt', 'Übergaben & Protokolle', 'Konfliktmanagement'] },
      ],
      price: { from: 30, unit: '€ / Einheit / Monat' },
    },
    {
      id: 'weg', num: '02', title: 'WEG-Verwaltung',
      lede: 'Transparente Verwaltung für Eigentümergemeinschaften — mit klaren Plänen und nachvollziehbaren Beschlüssen.',
      groups: [
        { label: 'Kaufmännisch', items: ['Wirtschaftsplan & Jahresabrechnung', 'Hausgeldabrechnung', 'Rücklagenmanagement'] },
        { label: 'Recht & Organisation', items: ['Eigentümerversammlungen', 'Beschlussumsetzung', 'Protokolle & Verträge'] },
        { label: 'Technisch', items: ['Instandhaltungsplanung', 'Sanierungen', 'Objektkontrollen'] },
      ],
      price: { from: 25, unit: '€ / Einheit / Monat' },
    },
    {
      id: 'buch', num: '03', title: 'Buchhaltung',
      lede: 'Saubere Zahlen — auch für externe Verwalter, die auf unsere Buchhaltung vertrauen.',
      groups: [
        { label: 'Objektbuchhaltung', items: ['Laufende Finanzbuchhaltung', 'Debitoren & Kreditoren', 'Mieten- & Hausgeldüberwachung'] },
        { label: 'Abrechnung', items: ['Betriebs- und Heizkosten', 'Jahresabrechnungen'] },
        { label: 'Zahlungsverkehr', items: ['Zahlungsmanagement', 'Mahnwesen', 'Treuhandkontenführung'] },
      ],
      price: { from: null, unit: 'auf Anfrage' },
    },
  ],
  why: [
    { title: 'Persönlich erreichbar', body: 'Ein Ansprechpartner für Ihr Objekt — kein Callcenter, keine Weiterleitung. Sie wissen, mit wem Sie sprechen.' },
    { title: 'Digital organisiert', body: 'Dokumente, Abrechnungen und Beschlüsse im geschützten Online-Portal. Jederzeit abrufbar, für alle Beteiligten.' },
    { title: 'Regional verwurzelt', body: 'Wir kennen die Handwerker, die Behörden und die Besonderheiten des Breisgauer Immobilienmarkts.' },
    { title: 'Transparent abgerechnet', body: 'Jährliche Abrechnungen mit nachvollziehbaren Positionen. Keine versteckten Kosten, keine Pauschalen.' },
  ],
  team: [
    { name: 'Markus Bender', role: 'Geschäftsführung · WEG', bio: 'Zertifizierter Verwalter (IHK). 14 Jahre Erfahrung im Immobilienmanagement Freiburg.' },
    { name: 'Carolin Fischer', role: 'Mietverwaltung', bio: 'Immobilienkauffrau. Betreut Bestandsobjekte in Freiburg, Emmendingen und im Markgräflerland.' },
    { name: 'Thomas Weiss', role: 'Buchhaltung & Abrechnung', bio: 'Bilanzbuchhalter. Sorgt für präzise Jahresabrechnungen und stabile Liquidität.' },
  ],
  testimonials: [
    { quote: 'Endlich eine Verwaltung, die zurückruft. Unsere WEG läuft seit drei Jahren geräuschlos — Versammlungen sind vorbereitet, Abrechnungen pünktlich.', author: 'Dr. A. Maier', role: 'WEG-Verwaltungsbeirat, Stadtteil Wiehre' },
    { quote: 'Ich wohne in München und vermiete zwei Wohnungen in Freiburg. Mit der FHV habe ich das Gefühl, trotzdem alles im Blick zu haben.', author: 'S. Braun', role: 'Vermieterin, Herdern' },
    { quote: 'Die Übernahme von unserer alten Verwaltung lief reibungslos. Klare Kommunikation, ehrliche Einschätzungen — und faire Preise.', author: 'P. Richter', role: 'Beiratsvorsitz, Günterstal' },
  ],
  certs: ['IHK-geprüft', 'VDIV Mitglied', 'DSGVO-konform', 'Versichert bis 5 Mio. €'],
  contact: {
    line1: 'Kaiser-Joseph-Straße 240',
    line2: '79098 Freiburg im Breisgau',
    phone: '+49 761 000 000',
    email: 'kontakt@freiburger-hausverwaltung.de',
    hours: 'Mo–Fr · 9–17 Uhr',
  },
  faq: [
    { q: 'Wie läuft ein Wechsel der Hausverwaltung ab?', a: 'Wir kümmern uns um die komplette Übergabe: Dokumente, Konten, laufende Verträge. Sie müssen nur einmal unterschreiben.' },
    { q: 'Ab welcher Größe verwalten Sie?', a: 'Ab einer einzelnen Wohneinheit. Besonders wohl fühlen wir uns bei Objekten und WEG zwischen 3 und 40 Einheiten.' },
    { q: 'Welche Regionen bedienen Sie?', a: 'Freiburg und der gesamte Breisgau — Emmendingen, Kaiserstuhl, Markgräflerland und angrenzender Schwarzwald.' },
  ],
};
