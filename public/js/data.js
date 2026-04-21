// ===== Mock Data =====

const DB = {
  liegenschaften: [
    { id: 1, name: 'Wohnanlage Bergstraße', adresse: 'Bergstraße 12', plz: '6900', ort: 'Bregenz', baujahr: 1998, einheiten: 12, verwalter: 'Admin', status: 'aktiv' },
    { id: 2, name: 'Residenz Am Park',      adresse: 'Parkweg 5',     plz: '6850', ort: 'Dornbirn', baujahr: 2005, einheiten: 8,  verwalter: 'Admin', status: 'aktiv' },
    { id: 3, name: 'Stadthaus Kirchgasse',  adresse: 'Kirchgasse 3',  plz: '6800', ort: 'Feldkirch', baujahr: 1975, einheiten: 6, verwalter: 'Admin', status: 'aktiv' },
  ],

  wohnungen: [
    { id: 1, liegenschaftId: 1, nr: 'A01', typ: '3-Zimmer', flaeche: 78, stockwerk: 'EG', miete: 950,  status: 'aktiv', mieterId: 1 },
    { id: 2, liegenschaftId: 1, nr: 'A02', typ: '2-Zimmer', flaeche: 55, stockwerk: '1. OG', miete: 750, status: 'aktiv', mieterId: 2 },
    { id: 3, liegenschaftId: 1, nr: 'A03', typ: '4-Zimmer', flaeche: 98, stockwerk: '1. OG', miete: 1250, status: 'aktiv', mieterId: 3 },
    { id: 4, liegenschaftId: 1, nr: 'A04', typ: '1-Zimmer', flaeche: 38, stockwerk: '2. OG', miete: 550,  status: 'leer', mieterId: null },
    { id: 5, liegenschaftId: 2, nr: 'B01', typ: '3-Zimmer', flaeche: 82, stockwerk: 'EG', miete: 1050, status: 'aktiv', mieterId: 4 },
    { id: 6, liegenschaftId: 2, nr: 'B02', typ: '2-Zimmer', flaeche: 60, stockwerk: '1. OG', miete: 820,  status: 'aktiv', mieterId: 5 },
    { id: 7, liegenschaftId: 2, nr: 'B03', typ: '2-Zimmer', flaeche: 58, stockwerk: '2. OG', miete: 800,  status: 'leer', mieterId: null },
    { id: 8, liegenschaftId: 3, nr: 'C01', typ: '3-Zimmer', flaeche: 75, stockwerk: 'EG', miete: 890,  status: 'aktiv', mieterId: 6 },
    { id: 9, liegenschaftId: 3, nr: 'C02', typ: '4-Zimmer', flaeche: 105, stockwerk: '1. OG', miete: 1350, status: 'aktiv', mieterId: 7 },
  ],

  mieter: [
    { id: 1, vorname: 'Markus',   nachname: 'Huber',    email: 'markus.huber@email.at',    telefon: '+43 664 1234567', geburtsdatum: '1985-03-14', wohnungId: 1, einzug: '2021-04-01', status: 'aktiv' },
    { id: 2, vorname: 'Sandra',   nachname: 'Mayer',    email: 'sandra.mayer@email.at',    telefon: '+43 664 2345678', geburtsdatum: '1990-07-22', wohnungId: 2, einzug: '2020-09-01', status: 'aktiv' },
    { id: 3, vorname: 'Thomas',   nachname: 'Berger',   email: 'thomas.berger@email.at',   telefon: '+43 699 3456789', geburtsdatum: '1978-11-05', wohnungId: 3, einzug: '2019-01-15', status: 'aktiv' },
    { id: 4, vorname: 'Julia',    nachname: 'Schneider', email: 'julia.schneider@email.at', telefon: '+43 676 4567890', geburtsdatum: '1995-02-18', wohnungId: 5, einzug: '2022-06-01', status: 'aktiv' },
    { id: 5, vorname: 'Andreas',  nachname: 'Wolf',     email: 'andreas.wolf@email.at',    telefon: '+43 664 5678901', geburtsdatum: '1982-09-30', wohnungId: 6, einzug: '2023-02-01', status: 'aktiv' },
    { id: 6, vorname: 'Maria',    nachname: 'Bauer',    email: 'maria.bauer@email.at',     telefon: '+43 699 6789012', geburtsdatum: '1970-05-12', wohnungId: 8, einzug: '2018-08-01', status: 'aktiv' },
    { id: 7, vorname: 'Stefan',   nachname: 'Fischer',  email: 'stefan.fischer@email.at',  telefon: '+43 676 7890123', geburtsdatum: '1988-12-24', wohnungId: 9, einzug: '2020-03-01', status: 'aktiv' },
  ],

  vertraege: [
    { id: 1, mieterId: 1, wohnungId: 1, beginn: '2021-04-01', ende: null,         miete: 950,  kaution: 2850, status: 'aktiv' },
    { id: 2, mieterId: 2, wohnungId: 2, beginn: '2020-09-01', ende: null,         miete: 750,  kaution: 2250, status: 'aktiv' },
    { id: 3, mieterId: 3, wohnungId: 3, beginn: '2019-01-15', ende: null,         miete: 1250, kaution: 3750, status: 'aktiv' },
    { id: 4, mieterId: 4, wohnungId: 5, beginn: '2022-06-01', ende: null,         miete: 1050, kaution: 3150, status: 'aktiv' },
    { id: 5, mieterId: 5, wohnungId: 6, beginn: '2023-02-01', ende: null,         miete: 820,  kaution: 2460, status: 'aktiv' },
    { id: 6, mieterId: 6, wohnungId: 8, beginn: '2018-08-01', ende: null,         miete: 890,  kaution: 2670, status: 'aktiv' },
    { id: 7, mieterId: 7, wohnungId: 9, beginn: '2020-03-01', ende: '2026-02-28', miete: 1350, kaution: 4050, status: 'aktiv' },
  ],

  zahlungen: [
    { id: 1, mieterId: 1, wohnungId: 1, betrag: 950,  faellig: '2026-04-01', bezahlt: '2026-04-01', status: 'bezahlt', typ: 'Miete April 2026' },
    { id: 2, mieterId: 2, wohnungId: 2, betrag: 750,  faellig: '2026-04-01', bezahlt: '2026-04-02', status: 'bezahlt', typ: 'Miete April 2026' },
    { id: 3, mieterId: 3, wohnungId: 3, betrag: 1250, faellig: '2026-04-01', bezahlt: null,         status: 'offen',   typ: 'Miete April 2026' },
    { id: 4, mieterId: 4, wohnungId: 5, betrag: 1050, faellig: '2026-04-01', bezahlt: '2026-04-01', status: 'bezahlt', typ: 'Miete April 2026' },
    { id: 5, mieterId: 5, wohnungId: 6, betrag: 820,  faellig: '2026-03-01', bezahlt: null,         status: 'ueberfaellig', typ: 'Miete März 2026' },
    { id: 6, mieterId: 6, wohnungId: 8, betrag: 890,  faellig: '2026-04-01', bezahlt: '2026-04-03', status: 'bezahlt', typ: 'Miete April 2026' },
    { id: 7, mieterId: 7, wohnungId: 9, betrag: 1350, faellig: '2026-04-01', bezahlt: null,         status: 'offen',   typ: 'Miete April 2026' },
    { id: 8, mieterId: 1, wohnungId: 1, betrag: 950,  faellig: '2026-03-01', bezahlt: '2026-03-01', status: 'bezahlt', typ: 'Miete März 2026' },
    { id: 9, mieterId: 2, wohnungId: 2, betrag: 750,  faellig: '2026-03-01', bezahlt: '2026-03-02', status: 'bezahlt', typ: 'Miete März 2026' },
  ],

  wartung: [
    { id: 1, wohnungId: 1, titel: 'Heizung defekt',        beschreibung: 'Heizkörper im Wohnzimmer gibt keine Wärme ab.', prioritaet: 'hoch',  status: 'in-arbeit', erstellt: '2026-04-15', abgeschlossen: null },
    { id: 2, wohnungId: 3, titel: 'Fenster klemmt',         beschreibung: 'Schlafzimmerfenster lässt sich nicht mehr öffnen.',   prioritaet: 'mittel', status: 'neu',      erstellt: '2026-04-18', abgeschlossen: null },
    { id: 3, wohnungId: 5, titel: 'Wasserhahn tropft',      beschreibung: 'Wasserhahn in der Küche tropft konstant.',            prioritaet: 'niedrig', status: 'erledigt', erstellt: '2026-04-05', abgeschlossen: '2026-04-10' },
    { id: 4, wohnungId: 8, titel: 'Steckdose defekt',       beschreibung: 'Steckdose im Badezimmer funktioniert nicht.',         prioritaet: 'hoch',  status: 'neu',      erstellt: '2026-04-20', abgeschlossen: null },
    { id: 5, wohnungId: 2, titel: 'Türschloss klemmt',      beschreibung: 'Eingangstür schwer zu öffnen.',                       prioritaet: 'mittel', status: 'erledigt', erstellt: '2026-03-20', abgeschlossen: '2026-03-25' },
    { id: 6, wohnungId: 6, titel: 'Schimmel im Bad',        beschreibung: 'Kleiner Schimmelfleck an der Decke im Badezimmer.',   prioritaet: 'hoch',  status: 'in-arbeit', erstellt: '2026-04-12', abgeschlossen: null },
  ],

  dokumente: [
    { id: 1, name: 'Mietvertrag Huber 2021.pdf',     typ: 'Mietvertrag', groesse: '245 KB', erstellt: '2021-04-01', kategorie: 'Verträge' },
    { id: 2, name: 'Betriebskostenabrechnung 2025.pdf', typ: 'Abrechnung', groesse: '1.2 MB', erstellt: '2026-01-15', kategorie: 'Abrechnungen' },
    { id: 3, name: 'Hausordnung Bergstraße.pdf',     typ: 'Hausordnung', groesse: '180 KB', erstellt: '2020-01-01', kategorie: 'Allgemein' },
    { id: 4, name: 'Wartungsprotokoll Q1 2026.pdf',  typ: 'Protokoll',   groesse: '320 KB', erstellt: '2026-04-01', kategorie: 'Wartung' },
    { id: 5, name: 'Versicherungspolizze 2026.pdf',  typ: 'Versicherung', groesse: '890 KB', erstellt: '2026-01-01', kategorie: 'Allgemein' },
  ],

  // Helper lookups
  getMieter(id) { return this.mieter.find(m => m.id === id); },
  getWohnung(id) { return this.wohnungen.find(w => w.id === id); },
  getLiegenschaft(id) { return this.liegenschaften.find(l => l.id === id); },
  getMieterName(id) { const m = this.getMieter(id); return m ? `${m.vorname} ${m.nachname}` : '—'; },
  getWohnungNr(id) { const w = this.getWohnung(id); return w ? w.nr : '—'; },
  getLiegenschaftName(id) { const l = this.getLiegenschaft(id); return l ? l.name : '—'; },
};
