// In-memory store — später durch echte DB ersetzen
export const db = {
  liegenschaften: [
    { id: 1, name: 'Wohnanlage Bergstraße', adresse: 'Bergstraße 12', plz: '79098', ort: 'Freiburg', baujahr: 1998, einheiten: 12, status: 'aktiv' },
    { id: 2, name: 'Residenz Am Park',      adresse: 'Parkweg 5',     plz: '79100', ort: 'Freiburg', baujahr: 2005, einheiten: 8,  status: 'aktiv' },
    { id: 3, name: 'Stadthaus Kirchgasse',  adresse: 'Kirchgasse 3',  plz: '79098', ort: 'Freiburg', baujahr: 1975, einheiten: 6, status: 'aktiv' },
  ],
  wohnungen: [
    { id: 1, liegenschaftId: 1, nr: 'A01', typ: '3-Zimmer', flaeche: 78, stockwerk: 'EG',    miete: 950,  status: 'aktiv', mieterId: 1 },
    { id: 2, liegenschaftId: 1, nr: 'A02', typ: '2-Zimmer', flaeche: 55, stockwerk: '1. OG', miete: 750,  status: 'aktiv', mieterId: 2 },
    { id: 3, liegenschaftId: 1, nr: 'A03', typ: '4-Zimmer', flaeche: 98, stockwerk: '1. OG', miete: 1250, status: 'aktiv', mieterId: 3 },
    { id: 4, liegenschaftId: 1, nr: 'A04', typ: '1-Zimmer', flaeche: 38, stockwerk: '2. OG', miete: 550,  status: 'leer',  mieterId: null },
    { id: 5, liegenschaftId: 2, nr: 'B01', typ: '3-Zimmer', flaeche: 82, stockwerk: 'EG',    miete: 1050, status: 'aktiv', mieterId: 4 },
    { id: 6, liegenschaftId: 2, nr: 'B02', typ: '2-Zimmer', flaeche: 60, stockwerk: '1. OG', miete: 820,  status: 'aktiv', mieterId: 5 },
    { id: 7, liegenschaftId: 2, nr: 'B03', typ: '2-Zimmer', flaeche: 58, stockwerk: '2. OG', miete: 800,  status: 'leer',  mieterId: null },
    { id: 8, liegenschaftId: 3, nr: 'C01', typ: '3-Zimmer', flaeche: 75, stockwerk: 'EG',    miete: 890,  status: 'aktiv', mieterId: 6 },
    { id: 9, liegenschaftId: 3, nr: 'C02', typ: '4-Zimmer', flaeche: 105,stockwerk: '1. OG', miete: 1350, status: 'aktiv', mieterId: 7 },
  ],
  mieter: [
    { id: 1, vorname: 'Markus',  nachname: 'Huber',     email: 'markus.huber@email.de',    telefon: '+49 176 1234567', wohnungId: 1, einzug: '2021-04-01', status: 'aktiv' },
    { id: 2, vorname: 'Sandra',  nachname: 'Mayer',     email: 'sandra.mayer@email.de',    telefon: '+49 176 2345678', wohnungId: 2, einzug: '2020-09-01', status: 'aktiv' },
    { id: 3, vorname: 'Thomas',  nachname: 'Berger',    email: 'thomas.berger@email.de',   telefon: '+49 176 3456789', wohnungId: 3, einzug: '2019-01-15', status: 'aktiv' },
    { id: 4, vorname: 'Julia',   nachname: 'Schneider', email: 'julia.schneider@email.de', telefon: '+49 176 4567890', wohnungId: 5, einzug: '2022-06-01', status: 'aktiv' },
    { id: 5, vorname: 'Andreas', nachname: 'Wolf',      email: 'andreas.wolf@email.de',    telefon: '+49 176 5678901', wohnungId: 6, einzug: '2023-02-01', status: 'aktiv' },
    { id: 6, vorname: 'Maria',   nachname: 'Bauer',     email: 'maria.bauer@email.de',     telefon: '+49 176 6789012', wohnungId: 8, einzug: '2018-08-01', status: 'aktiv' },
    { id: 7, vorname: 'Stefan',  nachname: 'Fischer',   email: 'stefan.fischer@email.de',  telefon: '+49 176 7890123', wohnungId: 9, einzug: '2020-03-01', status: 'aktiv' },
  ],
  zahlungen: [
    { id: 1, mieterId: 1, wohnungId: 1, betrag: 950,  faellig: '2026-04-01', bezahlt: '2026-04-01', status: 'bezahlt',      typ: 'Miete April 2026' },
    { id: 2, mieterId: 2, wohnungId: 2, betrag: 750,  faellig: '2026-04-01', bezahlt: '2026-04-02', status: 'bezahlt',      typ: 'Miete April 2026' },
    { id: 3, mieterId: 3, wohnungId: 3, betrag: 1250, faellig: '2026-04-01', bezahlt: null,         status: 'offen',        typ: 'Miete April 2026' },
    { id: 4, mieterId: 4, wohnungId: 5, betrag: 1050, faellig: '2026-04-01', bezahlt: '2026-04-01', status: 'bezahlt',      typ: 'Miete April 2026' },
    { id: 5, mieterId: 5, wohnungId: 6, betrag: 820,  faellig: '2026-03-01', bezahlt: null,         status: 'ueberfaellig', typ: 'Miete März 2026' },
    { id: 6, mieterId: 6, wohnungId: 8, betrag: 890,  faellig: '2026-04-01', bezahlt: '2026-04-03', status: 'bezahlt',      typ: 'Miete April 2026' },
    { id: 7, mieterId: 7, wohnungId: 9, betrag: 1350, faellig: '2026-04-01', bezahlt: null,         status: 'offen',        typ: 'Miete April 2026' },
  ],
  wartung: [
    { id: 1, wohnungId: 1, titel: 'Heizung defekt',   beschreibung: 'Heizkörper im Wohnzimmer gibt keine Wärme ab.',    prioritaet: 'hoch',    status: 'in-arbeit', erstellt: '2026-04-15' },
    { id: 2, wohnungId: 3, titel: 'Fenster klemmt',   beschreibung: 'Schlafzimmerfenster lässt sich nicht mehr öffnen.', prioritaet: 'mittel',  status: 'neu',       erstellt: '2026-04-18' },
    { id: 3, wohnungId: 5, titel: 'Wasserhahn tropft',beschreibung: 'Wasserhahn in der Küche tropft konstant.',           prioritaet: 'niedrig', status: 'erledigt',  erstellt: '2026-04-05' },
    { id: 4, wohnungId: 8, titel: 'Steckdose defekt', beschreibung: 'Steckdose im Badezimmer funktioniert nicht.',       prioritaet: 'hoch',    status: 'neu',       erstellt: '2026-04-20' },
  ],
};

export const getMieterName = (id) => { const m = db.mieter.find(x => x.id === id); return m ? `${m.vorname} ${m.nachname}` : '—'; };
export const getWohnungNr = (id) => { const w = db.wohnungen.find(x => x.id === id); return w ? w.nr : '—'; };
export const getLiegenschaftName = (id) => { const l = db.liegenschaften.find(x => x.id === id); return l ? l.name : '—'; };
