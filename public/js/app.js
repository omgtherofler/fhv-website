// ===== Router =====
const views = {};
let currentView = 'dashboard';

function navigate(view) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.view === view));
  document.getElementById('breadcrumb').textContent = {
    dashboard: 'Dashboard', liegenschaften: 'Liegenschaften', wohnungen: 'Wohnungen',
    mieter: 'Mieter', vertraege: 'Mietverträge', zahlungen: 'Zahlungen',
    wartung: 'Wartung', dokumente: 'Dokumente', einstellungen: 'Einstellungen',
  }[view] || view;
  currentView = view;
  document.getElementById('content').innerHTML = views[view] ? views[view]() : '<p>Ansicht nicht gefunden.</p>';
}

// ===== Sidebar Toggle =====
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
});
document.getElementById('mobileToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('mobile-open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('sidebar').classList.remove('mobile-open');
    navigate(link.dataset.view);
  });
});

// ===== Modal =====
const modal = {
  open(title, bodyHTML, onConfirm, confirmText = 'Speichern') {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHTML;
    document.getElementById('modalConfirmBtn').textContent = confirmText;
    document.getElementById('modalOverlay').classList.add('open');
    this._onConfirm = onConfirm;
  },
  close() { document.getElementById('modalOverlay').classList.remove('open'); },
};
document.getElementById('modalClose').addEventListener('click', () => modal.close());
document.getElementById('modalCancelBtn').addEventListener('click', () => modal.close());
document.getElementById('modalConfirmBtn').addEventListener('click', () => { if (modal._onConfirm) modal._onConfirm(); });
document.getElementById('modalOverlay').addEventListener('click', e => { if (e.target === document.getElementById('modalOverlay')) modal.close(); });

// ===== Helpers =====
function fmt(n) { return Number(n).toLocaleString('de-AT', { minimumFractionDigits: 0 }) + ' €'; }
function fmtDate(d) { if (!d) return '—'; const [y,m,day] = d.split('-'); return `${day}.${m}.${y}`; }
function initials(v, n) { return (v[0] + n[0]).toUpperCase(); }
function badge(text, cls) { return `<span class="badge-status ${cls}">${text}</span>`; }
function statusBadge(s) {
  const map = {
    aktiv: ['aktiv','Aktiv'], inaktiv: ['inaktiv','Inaktiv'],
    offen: ['offen','Offen'], bezahlt: ['bezahlt','Bezahlt'],
    ueberfaellig: ['ueberfaellig','Überfällig'],
    'in-arbeit': ['in-arbeit','In Arbeit'], erledigt: ['erledigt','Erledigt'],
    neu: ['neu','Neu'], leer: ['leer','Leer'],
  };
  const [cls, lbl] = map[s] || ['inaktiv', s];
  return badge(lbl, cls);
}

// ===== DASHBOARD =====
views.dashboard = () => {
  const totalMiete = DB.wohnungen.filter(w => w.status === 'aktiv').reduce((s, w) => s + w.miete, 0);
  const offeneZahlungen = DB.zahlungen.filter(z => z.status === 'offen' || z.status === 'ueberfaellig');
  const offenBetrag = offeneZahlungen.reduce((s, z) => s + z.betrag, 0);
  const leerWohnungen = DB.wohnungen.filter(w => w.status === 'leer').length;
  const offeneWartung = DB.wartung.filter(w => w.status !== 'erledigt').length;

  const belegung = Math.round((DB.wohnungen.filter(w => w.status === 'aktiv').length / DB.wohnungen.length) * 100);

  return `
  <div class="page-header">
    <div><div class="page-title">Guten Tag, Admin</div><div class="page-subtitle">Hier ist Ihre Übersicht für heute, ${new Date().toLocaleDateString('de-AT', {weekday:'long', day:'numeric', month:'long', year:'numeric'})}</div></div>
  </div>

  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-icon blue"><i class="fa-solid fa-city"></i></div>
      <div class="kpi-info">
        <div class="kpi-value">${DB.liegenschaften.length}</div>
        <div class="kpi-label">Liegenschaften</div>
        <div class="kpi-trend up"><i class="fa-solid fa-check"></i> Alle aktiv</div>
      </div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon green"><i class="fa-solid fa-door-open"></i></div>
      <div class="kpi-info">
        <div class="kpi-value">${DB.wohnungen.length}</div>
        <div class="kpi-label">Wohneinheiten</div>
        <div class="kpi-trend ${leerWohnungen > 0 ? 'down' : 'up'}">${leerWohnungen > 0 ? leerWohnungen + ' leer' : 'Vollvermietet'}</div>
      </div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon purple"><i class="fa-solid fa-users"></i></div>
      <div class="kpi-info">
        <div class="kpi-value">${DB.mieter.filter(m => m.status === 'aktiv').length}</div>
        <div class="kpi-label">Aktive Mieter</div>
        <div class="kpi-trend up"><i class="fa-solid fa-arrow-up"></i> ${DB.mieter.length} gesamt</div>
      </div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon green"><i class="fa-solid fa-euro-sign"></i></div>
      <div class="kpi-info">
        <div class="kpi-value">${fmt(totalMiete)}</div>
        <div class="kpi-label">Monatliche Miete</div>
        <div class="kpi-trend up">Soll-Einnahmen</div>
      </div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon ${offenBetrag > 0 ? 'red' : 'green'}"><i class="fa-solid fa-clock-rotate-left"></i></div>
      <div class="kpi-info">
        <div class="kpi-value">${fmt(offenBetrag)}</div>
        <div class="kpi-label">Offene Zahlungen</div>
        <div class="kpi-trend ${offeneZahlungen.length > 0 ? 'down' : 'up'}">${offeneZahlungen.length} ausstehend</div>
      </div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon ${offeneWartung > 0 ? 'orange' : 'green'}"><i class="fa-solid fa-wrench"></i></div>
      <div class="kpi-info">
        <div class="kpi-value">${offeneWartung}</div>
        <div class="kpi-label">Offene Wartungen</div>
        <div class="kpi-trend ${offeneWartung > 0 ? 'down' : 'up'}">${offeneWartung > 0 ? 'Bearbeitung nötig' : 'Alles erledigt'}</div>
      </div>
    </div>
  </div>

  <div class="grid-2" style="margin-bottom:16px">
    <div class="card">
      <div class="card-header"><span class="card-title">Belegung nach Liegenschaft</span></div>
      <div class="card-body">
        ${DB.liegenschaften.map(l => {
          const wohnungen = DB.wohnungen.filter(w => w.liegenschaftId === l.id);
          const belegt = wohnungen.filter(w => w.status === 'aktiv').length;
          const pct = wohnungen.length ? Math.round(belegt/wohnungen.length*100) : 0;
          return `
          <div style="margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="font-size:13px;font-weight:500">${l.name}</span>
              <span style="font-size:12px;color:var(--text-muted)">${belegt}/${wohnungen.length} · ${pct}%</span>
            </div>
            <div class="occupancy-bar"><div class="occupancy-fill" style="width:${pct}%"></div></div>
          </div>`;
        }).join('')}
        <div style="display:flex;justify-content:space-between;margin-top:16px;padding-top:12px;border-top:1px solid var(--border)">
          <span style="font-size:13px;font-weight:600">Gesamt</span>
          <span style="font-size:13px;font-weight:700;color:var(--primary)">${belegung}% belegt</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header"><span class="card-title">Letzte Aktivitäten</span></div>
      <div class="card-body">
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-dot green"></div>
            <div class="activity-text">Zahlung von <strong>Markus Huber</strong> eingegangen (950 €)</div>
            <div class="activity-time">Heute</div>
          </div>
          <div class="activity-item">
            <div class="activity-dot red"></div>
            <div class="activity-text">Neue Wartungsanfrage: <strong>Steckdose defekt</strong> – C01</div>
            <div class="activity-time">Heute</div>
          </div>
          <div class="activity-item">
            <div class="activity-dot orange"></div>
            <div class="activity-text">Zahlung von <strong>Andreas Wolf</strong> überfällig (820 €)</div>
            <div class="activity-time">Gestern</div>
          </div>
          <div class="activity-item">
            <div class="activity-dot blue"></div>
            <div class="activity-text">Wartungsanfrage <strong>Wasserhahn</strong> erledigt – B01</div>
            <div class="activity-time">10. Apr</div>
          </div>
          <div class="activity-item">
            <div class="activity-dot green"></div>
            <div class="activity-text">Zahlung von <strong>Maria Bauer</strong> eingegangen (890 €)</div>
            <div class="activity-time">3. Apr</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-title">Zahlungsstatus – April 2026</span>
      <button class="btn btn-secondary btn-sm" onclick="navigate('zahlungen')">Alle anzeigen</button>
    </div>
    <div class="table-wrapper card-body" style="padding:0">
      <table>
        <thead><tr><th>Mieter</th><th>Wohnung</th><th>Betrag</th><th>Fällig</th><th>Status</th></tr></thead>
        <tbody>
          ${DB.zahlungen.filter(z => z.faellig >= '2026-04-01').map(z => `
          <tr>
            <td>${DB.getMieterName(z.mieterId)}</td>
            <td>${DB.getWohnungNr(z.wohnungId)}</td>
            <td><strong>${fmt(z.betrag)}</strong></td>
            <td>${fmtDate(z.faellig)}</td>
            <td>${statusBadge(z.status)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
};

// ===== LIEGENSCHAFTEN =====
views.liegenschaften = () => `
  <div class="page-header">
    <div><div class="page-title">Liegenschaften</div><div class="page-subtitle">${DB.liegenschaften.length} Objekte verwaltet</div></div>
    <button class="btn btn-primary" onclick="openLiegenschaftForm()"><i class="fa-solid fa-plus"></i> Neue Liegenschaft</button>
  </div>
  <div class="grid-3">
    ${DB.liegenschaften.map(l => {
      const wohnungen = DB.wohnungen.filter(w => w.liegenschaftId === l.id);
      const belegt = wohnungen.filter(w => w.status === 'aktiv').length;
      const miete = wohnungen.filter(w => w.status === 'aktiv').reduce((s, w) => s + w.miete, 0);
      const pct = wohnungen.length ? Math.round(belegt/wohnungen.length*100) : 0;
      return `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">${l.name}</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${l.adresse}, ${l.plz} ${l.ort}</div>
          </div>
          ${statusBadge(l.status)}
        </div>
        <div class="card-body">
          <div class="detail-grid" style="margin-bottom:14px">
            <div class="detail-item"><div class="detail-label">Einheiten</div><div class="detail-value">${l.einheiten}</div></div>
            <div class="detail-item"><div class="detail-label">Baujahr</div><div class="detail-value">${l.baujahr}</div></div>
            <div class="detail-item"><div class="detail-label">Belegt</div><div class="detail-value">${belegt}/${wohnungen.length}</div></div>
            <div class="detail-item"><div class="detail-label">Ist-Miete</div><div class="detail-value">${fmt(miete)}/Mo</div></div>
          </div>
          <div style="margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
              <span>Belegung</span><span style="font-weight:600">${pct}%</span>
            </div>
            <div class="occupancy-bar"><div class="occupancy-fill" style="width:${pct}%"></div></div>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-secondary btn-sm" style="flex:1" onclick="navigate('wohnungen')"><i class="fa-solid fa-door-open"></i> Wohnungen</button>
            <button class="action-btn" onclick="editLiegenschaft(${l.id})" title="Bearbeiten"><i class="fa-solid fa-pen"></i></button>
          </div>
        </div>
      </div>`;
    }).join('')}
  </div>`;

function openLiegenschaftForm(id) {
  const l = id ? DB.getLiegenschaft(id) : {};
  modal.open(id ? 'Liegenschaft bearbeiten' : 'Neue Liegenschaft', `
    <div class="form-group"><label class="form-label">Name</label><input class="form-control" id="f-name" value="${l.name||''}" placeholder="z.B. Wohnanlage Bergstraße"></div>
    <div class="form-group"><label class="form-label">Adresse</label><input class="form-control" id="f-adresse" value="${l.adresse||''}" placeholder="Straße und Hausnummer"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">PLZ</label><input class="form-control" id="f-plz" value="${l.plz||''}" placeholder="6900"></div>
      <div class="form-group"><label class="form-label">Ort</label><input class="form-control" id="f-ort" value="${l.ort||''}" placeholder="Bregenz"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Baujahr</label><input class="form-control" id="f-baujahr" type="number" value="${l.baujahr||''}" placeholder="2000"></div>
      <div class="form-group"><label class="form-label">Einheiten</label><input class="form-control" id="f-einheiten" type="number" value="${l.einheiten||''}" placeholder="10"></div>
    </div>
  `, () => {
    const name = document.getElementById('f-name').value.trim();
    if (!name) return alert('Bitte Namen eingeben.');
    if (id) {
      Object.assign(l, { name, adresse: document.getElementById('f-adresse').value, plz: document.getElementById('f-plz').value, ort: document.getElementById('f-ort').value, baujahr: +document.getElementById('f-baujahr').value, einheiten: +document.getElementById('f-einheiten').value });
    } else {
      DB.liegenschaften.push({ id: Date.now(), name, adresse: document.getElementById('f-adresse').value, plz: document.getElementById('f-plz').value, ort: document.getElementById('f-ort').value, baujahr: +document.getElementById('f-baujahr').value, einheiten: +document.getElementById('f-einheiten').value, verwalter: 'Admin', status: 'aktiv' });
    }
    modal.close(); navigate('liegenschaften');
  });
}
function editLiegenschaft(id) { openLiegenschaftForm(id); }

// ===== WOHNUNGEN =====
views.wohnungen = () => {
  let filtered = [...DB.wohnungen];
  return `
  <div class="page-header">
    <div><div class="page-title">Wohnungen</div><div class="page-subtitle">${DB.wohnungen.length} Einheiten · ${DB.wohnungen.filter(w=>w.status==='leer').length} leer</div></div>
    <button class="btn btn-primary" onclick="openWohnungForm()"><i class="fa-solid fa-plus"></i> Neue Wohnung</button>
  </div>
  <div class="toolbar">
    <div class="search-box"><i class="fa-solid fa-magnifying-glass"></i><input id="w-search" type="text" placeholder="Wohnung suchen…" oninput="filterWohnungen()"></div>
    <select class="filter-select" id="w-filter-status" onchange="filterWohnungen()">
      <option value="">Alle Status</option><option value="aktiv">Vermietet</option><option value="leer">Leer</option>
    </select>
    <select class="filter-select" id="w-filter-obj" onchange="filterWohnungen()">
      <option value="">Alle Objekte</option>
      ${DB.liegenschaften.map(l => `<option value="${l.id}">${l.name}</option>`).join('')}
    </select>
  </div>
  <div class="card">
    <div class="table-wrapper">
      <table id="wohnungen-table">
        <thead><tr><th>Nr.</th><th>Liegenschaft</th><th>Typ</th><th>Fläche</th><th>Stockwerk</th><th>Miete</th><th>Mieter</th><th>Status</th><th>Aktionen</th></tr></thead>
        <tbody id="wohnungen-tbody">${renderWohnungenRows(DB.wohnungen)}</tbody>
      </table>
    </div>
  </div>`;
};

function renderWohnungenRows(list) {
  if (!list.length) return '<tr><td colspan="9"><div class="empty-state"><i class="fa-solid fa-door-open"></i><p>Keine Wohnungen gefunden.</p></div></td></tr>';
  return list.map(w => `
  <tr>
    <td><strong>${w.nr}</strong></td>
    <td>${DB.getLiegenschaftName(w.liegenschaftId)}</td>
    <td>${w.typ}</td>
    <td>${w.flaeche} m²</td>
    <td>${w.stockwerk}</td>
    <td>${fmt(w.miete)}</td>
    <td>${w.mieterId ? DB.getMieterName(w.mieterId) : '<span style="color:var(--text-muted)">—</span>'}</td>
    <td>${statusBadge(w.status)}</td>
    <td><div class="table-actions">
      <button class="action-btn" onclick="editWohnung(${w.id})" title="Bearbeiten"><i class="fa-solid fa-pen"></i></button>
    </div></td>
  </tr>`).join('');
}

function filterWohnungen() {
  const q = document.getElementById('w-search').value.toLowerCase();
  const st = document.getElementById('w-filter-status').value;
  const obj = document.getElementById('w-filter-obj').value;
  const filtered = DB.wohnungen.filter(w =>
    (!q || w.nr.toLowerCase().includes(q) || w.typ.toLowerCase().includes(q) || DB.getLiegenschaftName(w.liegenschaftId).toLowerCase().includes(q)) &&
    (!st || w.status === st) &&
    (!obj || w.liegenschaftId === +obj)
  );
  document.getElementById('wohnungen-tbody').innerHTML = renderWohnungenRows(filtered);
}

function openWohnungForm(id) {
  const w = id ? DB.getWohnung(id) : {};
  modal.open(id ? 'Wohnung bearbeiten' : 'Neue Wohnung', `
    <div class="form-row">
      <div class="form-group"><label class="form-label">Nr.</label><input class="form-control" id="f-nr" value="${w.nr||''}" placeholder="A01"></div>
      <div class="form-group"><label class="form-label">Typ</label>
        <select class="form-control" id="f-typ">
          ${['1-Zimmer','2-Zimmer','3-Zimmer','4-Zimmer','5-Zimmer+'].map(t=>`<option ${w.typ===t?'selected':''}>${t}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-group"><label class="form-label">Liegenschaft</label>
      <select class="form-control" id="f-lieid">
        ${DB.liegenschaften.map(l=>`<option value="${l.id}" ${w.liegenschaftId===l.id?'selected':''}>${l.name}</option>`).join('')}
      </select>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Fläche (m²)</label><input class="form-control" id="f-flaeche" type="number" value="${w.flaeche||''}"></div>
      <div class="form-group"><label class="form-label">Stockwerk</label><input class="form-control" id="f-stockwerk" value="${w.stockwerk||''}" placeholder="EG, 1. OG…"></div>
    </div>
    <div class="form-group"><label class="form-label">Miete (€/Monat)</label><input class="form-control" id="f-miete" type="number" value="${w.miete||''}"></div>
  `, () => {
    const nr = document.getElementById('f-nr').value.trim();
    if (!nr) return alert('Bitte Wohnungsnummer eingeben.');
    if (id) {
      Object.assign(w, { nr, typ: document.getElementById('f-typ').value, liegenschaftId: +document.getElementById('f-lieid').value, flaeche: +document.getElementById('f-flaeche').value, stockwerk: document.getElementById('f-stockwerk').value, miete: +document.getElementById('f-miete').value });
    } else {
      DB.wohnungen.push({ id: Date.now(), nr, typ: document.getElementById('f-typ').value, liegenschaftId: +document.getElementById('f-lieid').value, flaeche: +document.getElementById('f-flaeche').value, stockwerk: document.getElementById('f-stockwerk').value, miete: +document.getElementById('f-miete').value, status: 'leer', mieterId: null });
    }
    modal.close(); navigate('wohnungen');
  });
}
function editWohnung(id) { openWohnungForm(id); }

// ===== MIETER =====
views.mieter = () => `
  <div class="page-header">
    <div><div class="page-title">Mieter</div><div class="page-subtitle">${DB.mieter.length} Mieter registriert</div></div>
    <button class="btn btn-primary" onclick="openMieterForm()"><i class="fa-solid fa-plus"></i> Neuer Mieter</button>
  </div>
  <div class="toolbar">
    <div class="search-box"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Mieter suchen…" oninput="filterMieter(this.value)"></div>
  </div>
  <div class="card">
    <div class="table-wrapper">
      <table>
        <thead><tr><th>Name</th><th>Wohnung</th><th>E-Mail</th><th>Telefon</th><th>Einzug</th><th>Status</th><th>Aktionen</th></tr></thead>
        <tbody id="mieter-tbody">${renderMieterRows(DB.mieter)}</tbody>
      </table>
    </div>
  </div>`;

function renderMieterRows(list) {
  if (!list.length) return '<tr><td colspan="7"><div class="empty-state"><i class="fa-solid fa-users"></i><p>Keine Mieter gefunden.</p></div></td></tr>';
  return list.map(m => `
  <tr>
    <td><div style="display:flex;align-items:center;gap:10px"><div class="avatar">${initials(m.vorname, m.nachname)}</div><div><div style="font-weight:500">${m.vorname} ${m.nachname}</div><div style="font-size:11px;color:var(--text-muted)">${m.geburtsdatum ? 'geb. ' + fmtDate(m.geburtsdatum) : ''}</div></div></div></td>
    <td>${m.wohnungId ? DB.getWohnungNr(m.wohnungId) : '—'}</td>
    <td><a href="mailto:${m.email}" style="color:var(--primary)">${m.email}</a></td>
    <td>${m.telefon}</td>
    <td>${fmtDate(m.einzug)}</td>
    <td>${statusBadge(m.status)}</td>
    <td><div class="table-actions">
      <button class="action-btn" onclick="editMieter(${m.id})" title="Bearbeiten"><i class="fa-solid fa-pen"></i></button>
      <button class="action-btn danger" onclick="deleteMieter(${m.id})" title="Löschen"><i class="fa-solid fa-trash"></i></button>
    </div></td>
  </tr>`).join('');
}

function filterMieter(q) {
  q = q.toLowerCase();
  const filtered = DB.mieter.filter(m => `${m.vorname} ${m.nachname} ${m.email}`.toLowerCase().includes(q));
  document.getElementById('mieter-tbody').innerHTML = renderMieterRows(filtered);
}

function openMieterForm(id) {
  const m = id ? DB.getMieter(id) : {};
  modal.open(id ? 'Mieter bearbeiten' : 'Neuer Mieter', `
    <div class="form-row">
      <div class="form-group"><label class="form-label">Vorname</label><input class="form-control" id="f-vorname" value="${m.vorname||''}" placeholder="Max"></div>
      <div class="form-group"><label class="form-label">Nachname</label><input class="form-control" id="f-nachname" value="${m.nachname||''}" placeholder="Mustermann"></div>
    </div>
    <div class="form-group"><label class="form-label">E-Mail</label><input class="form-control" id="f-email" type="email" value="${m.email||''}" placeholder="max@email.at"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Telefon</label><input class="form-control" id="f-telefon" value="${m.telefon||''}" placeholder="+43 664…"></div>
      <div class="form-group"><label class="form-label">Geburtsdatum</label><input class="form-control" id="f-geb" type="date" value="${m.geburtsdatum||''}"></div>
    </div>
    <div class="form-group"><label class="form-label">Wohnung</label>
      <select class="form-control" id="f-wohnung">
        <option value="">— Keine —</option>
        ${DB.wohnungen.map(w=>`<option value="${w.id}" ${m.wohnungId===w.id?'selected':''}>${w.nr} – ${DB.getLiegenschaftName(w.liegenschaftId)}</option>`).join('')}
      </select>
    </div>
    <div class="form-group"><label class="form-label">Einzugsdatum</label><input class="form-control" id="f-einzug" type="date" value="${m.einzug||''}"></div>
  `, () => {
    const vorname = document.getElementById('f-vorname').value.trim();
    const nachname = document.getElementById('f-nachname').value.trim();
    if (!vorname || !nachname) return alert('Bitte Vor- und Nachname eingeben.');
    const wohnungId = +document.getElementById('f-wohnung').value || null;
    if (id) {
      Object.assign(m, { vorname, nachname, email: document.getElementById('f-email').value, telefon: document.getElementById('f-telefon').value, geburtsdatum: document.getElementById('f-geb').value, wohnungId, einzug: document.getElementById('f-einzug').value });
    } else {
      DB.mieter.push({ id: Date.now(), vorname, nachname, email: document.getElementById('f-email').value, telefon: document.getElementById('f-telefon').value, geburtsdatum: document.getElementById('f-geb').value, wohnungId, einzug: document.getElementById('f-einzug').value, status: 'aktiv' });
    }
    modal.close(); navigate('mieter');
  });
}
function editMieter(id) { openMieterForm(id); }
function deleteMieter(id) {
  if (!confirm('Mieter wirklich löschen?')) return;
  const idx = DB.mieter.findIndex(m => m.id === id);
  if (idx !== -1) DB.mieter.splice(idx, 1);
  navigate('mieter');
}

// ===== VERTRAEGE =====
views.vertraege = () => `
  <div class="page-header">
    <div><div class="page-title">Mietverträge</div><div class="page-subtitle">${DB.vertraege.length} Verträge aktiv</div></div>
    <button class="btn btn-primary" onclick="openVertragForm()"><i class="fa-solid fa-plus"></i> Neuer Vertrag</button>
  </div>
  <div class="card">
    <div class="table-wrapper">
      <table>
        <thead><tr><th>Mieter</th><th>Wohnung</th><th>Beginn</th><th>Ende</th><th>Miete</th><th>Kaution</th><th>Status</th><th>Aktionen</th></tr></thead>
        <tbody>
          ${DB.vertraege.map(v => `
          <tr>
            <td><div style="display:flex;align-items:center;gap:8px"><div class="avatar" style="width:28px;height:28px;font-size:11px">${(() => { const m = DB.getMieter(v.mieterId); return m ? initials(m.vorname, m.nachname) : '?'; })()}</div>${DB.getMieterName(v.mieterId)}</div></td>
            <td>${DB.getWohnungNr(v.wohnungId)}</td>
            <td>${fmtDate(v.beginn)}</td>
            <td>${v.ende ? fmtDate(v.ende) : '<span style="color:var(--success);font-size:12px">Unbefristet</span>'}</td>
            <td><strong>${fmt(v.miete)}</strong>/Mo</td>
            <td>${fmt(v.kaution)}</td>
            <td>${statusBadge(v.status)}</td>
            <td><div class="table-actions">
              <button class="action-btn" title="Ansehen" onclick="showVertragDetail(${v.id})"><i class="fa-solid fa-eye"></i></button>
              <button class="action-btn" title="Bearbeiten"><i class="fa-solid fa-pen"></i></button>
            </div></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;

function showVertragDetail(id) {
  const v = DB.vertraege.find(x => x.id === id);
  const m = DB.getMieter(v.mieterId);
  const w = DB.getWohnung(v.wohnungId);
  modal.open('Vertragsdetails', `
    <div class="detail-grid">
      <div class="detail-item"><div class="detail-label">Mieter</div><div class="detail-value">${m ? m.vorname + ' ' + m.nachname : '—'}</div></div>
      <div class="detail-item"><div class="detail-label">Wohnung</div><div class="detail-value">${w ? w.nr + ' – ' + DB.getLiegenschaftName(w.liegenschaftId) : '—'}</div></div>
      <div class="detail-item"><div class="detail-label">Vertragsbeginn</div><div class="detail-value">${fmtDate(v.beginn)}</div></div>
      <div class="detail-item"><div class="detail-label">Vertragsende</div><div class="detail-value">${v.ende ? fmtDate(v.ende) : 'Unbefristet'}</div></div>
      <div class="detail-item"><div class="detail-label">Monatliche Miete</div><div class="detail-value">${fmt(v.miete)}</div></div>
      <div class="detail-item"><div class="detail-label">Kaution</div><div class="detail-value">${fmt(v.kaution)}</div></div>
      <div class="detail-item"><div class="detail-label">Status</div><div class="detail-value">${statusBadge(v.status)}</div></div>
      <div class="detail-item"><div class="detail-label">Laufzeit</div><div class="detail-value">${Math.round((new Date() - new Date(v.beginn)) / (1000*60*60*24*30))} Monate</div></div>
    </div>`, null);
  document.getElementById('modalConfirmBtn').style.display = 'none';
}

function openVertragForm() {
  modal.open('Neuer Mietvertrag', `
    <div class="form-group"><label class="form-label">Mieter</label>
      <select class="form-control" id="f-mieter">${DB.mieter.map(m=>`<option value="${m.id}">${m.vorname} ${m.nachname}</option>`).join('')}</select>
    </div>
    <div class="form-group"><label class="form-label">Wohnung</label>
      <select class="form-control" id="f-wohnung">${DB.wohnungen.map(w=>`<option value="${w.id}">${w.nr} – ${DB.getLiegenschaftName(w.liegenschaftId)}</option>`).join('')}</select>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Beginn</label><input class="form-control" id="f-beginn" type="date" value="${new Date().toISOString().split('T')[0]}"></div>
      <div class="form-group"><label class="form-label">Ende (leer = unbefristet)</label><input class="form-control" id="f-ende" type="date"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Miete (€)</label><input class="form-control" id="f-miete" type="number" placeholder="900"></div>
      <div class="form-group"><label class="form-label">Kaution (€)</label><input class="form-control" id="f-kaution" type="number" placeholder="2700"></div>
    </div>
  `, () => {
    const miete = +document.getElementById('f-miete').value;
    if (!miete) return alert('Bitte Miete angeben.');
    DB.vertraege.push({ id: Date.now(), mieterId: +document.getElementById('f-mieter').value, wohnungId: +document.getElementById('f-wohnung').value, beginn: document.getElementById('f-beginn').value, ende: document.getElementById('f-ende').value || null, miete, kaution: +document.getElementById('f-kaution').value, status: 'aktiv' });
    modal.close(); navigate('vertraege');
  });
  document.getElementById('modalConfirmBtn').style.display = '';
}

// ===== ZAHLUNGEN =====
views.zahlungen = () => `
  <div class="page-header">
    <div><div class="page-title">Zahlungen</div>
    <div class="page-subtitle">
      ${DB.zahlungen.filter(z=>z.status==='bezahlt').length} bezahlt ·
      ${DB.zahlungen.filter(z=>z.status==='offen').length} offen ·
      ${DB.zahlungen.filter(z=>z.status==='ueberfaellig').length} überfällig
    </div></div>
    <button class="btn btn-primary" onclick="openZahlungForm()"><i class="fa-solid fa-plus"></i> Zahlung erfassen</button>
  </div>
  <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:20px">
    <div class="kpi-card">
      <div class="kpi-icon green"><i class="fa-solid fa-check"></i></div>
      <div class="kpi-info">
        <div class="kpi-value">${fmt(DB.zahlungen.filter(z=>z.status==='bezahlt').reduce((s,z)=>s+z.betrag,0))}</div>
        <div class="kpi-label">Eingegangen</div>
      </div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon orange"><i class="fa-solid fa-clock"></i></div>
      <div class="kpi-info">
        <div class="kpi-value">${fmt(DB.zahlungen.filter(z=>z.status==='offen').reduce((s,z)=>s+z.betrag,0))}</div>
        <div class="kpi-label">Ausstehend</div>
      </div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon red"><i class="fa-solid fa-triangle-exclamation"></i></div>
      <div class="kpi-info">
        <div class="kpi-value">${fmt(DB.zahlungen.filter(z=>z.status==='ueberfaellig').reduce((s,z)=>s+z.betrag,0))}</div>
        <div class="kpi-label">Überfällig</div>
      </div>
    </div>
  </div>
  <div class="toolbar">
    <div class="search-box"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Suchen…" oninput="filterZahlungen(this.value)"></div>
    <select class="filter-select" onchange="filterZahlungenStatus(this.value)">
      <option value="">Alle Status</option>
      <option value="bezahlt">Bezahlt</option>
      <option value="offen">Offen</option>
      <option value="ueberfaellig">Überfällig</option>
    </select>
  </div>
  <div class="card">
    <div class="table-wrapper">
      <table>
        <thead><tr><th>Beschreibung</th><th>Mieter</th><th>Wohnung</th><th>Betrag</th><th>Fällig</th><th>Bezahlt am</th><th>Status</th><th>Aktionen</th></tr></thead>
        <tbody id="zahlungen-tbody">${renderZahlungenRows(DB.zahlungen)}</tbody>
      </table>
    </div>
  </div>`;

function renderZahlungenRows(list) {
  if (!list.length) return '<tr><td colspan="8"><div class="empty-state"><i class="fa-solid fa-euro-sign"></i><p>Keine Zahlungen.</p></div></td></tr>';
  return list.map(z => `
  <tr>
    <td>${z.typ}</td>
    <td>${DB.getMieterName(z.mieterId)}</td>
    <td>${DB.getWohnungNr(z.wohnungId)}</td>
    <td><strong>${fmt(z.betrag)}</strong></td>
    <td>${fmtDate(z.faellig)}</td>
    <td>${fmtDate(z.bezahlt)}</td>
    <td>${statusBadge(z.status)}</td>
    <td><div class="table-actions">
      ${z.status !== 'bezahlt' ? `<button class="action-btn" title="Als bezahlt markieren" onclick="markBezahlt(${z.id})" style="color:var(--success)"><i class="fa-solid fa-check"></i></button>` : ''}
    </div></td>
  </tr>`).join('');
}

function filterZahlungen(q) {
  q = q.toLowerCase();
  const list = DB.zahlungen.filter(z => DB.getMieterName(z.mieterId).toLowerCase().includes(q) || z.typ.toLowerCase().includes(q));
  document.getElementById('zahlungen-tbody').innerHTML = renderZahlungenRows(list);
}
function filterZahlungenStatus(st) {
  const list = st ? DB.zahlungen.filter(z => z.status === st) : DB.zahlungen;
  document.getElementById('zahlungen-tbody').innerHTML = renderZahlungenRows(list);
}
function markBezahlt(id) {
  const z = DB.zahlungen.find(x => x.id === id);
  if (z) { z.status = 'bezahlt'; z.bezahlt = new Date().toISOString().split('T')[0]; }
  navigate('zahlungen');
}
function openZahlungForm() {
  modal.open('Zahlung erfassen', `
    <div class="form-group"><label class="form-label">Mieter</label>
      <select class="form-control" id="f-mieter">${DB.mieter.map(m=>`<option value="${m.id}">${m.vorname} ${m.nachname}</option>`).join('')}</select>
    </div>
    <div class="form-group"><label class="form-label">Wohnung</label>
      <select class="form-control" id="f-wohnung">${DB.wohnungen.map(w=>`<option value="${w.id}">${w.nr}</option>`).join('')}</select>
    </div>
    <div class="form-group"><label class="form-label">Bezeichnung</label><input class="form-control" id="f-typ" value="Miete " placeholder="Miete April 2026"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Betrag (€)</label><input class="form-control" id="f-betrag" type="number" placeholder="900"></div>
      <div class="form-group"><label class="form-label">Fällig am</label><input class="form-control" id="f-faellig" type="date" value="${new Date().toISOString().split('T')[0]}"></div>
    </div>
    <div class="form-group"><label class="form-label">Status</label>
      <select class="form-control" id="f-status">
        <option value="offen">Offen</option><option value="bezahlt">Bezahlt</option>
      </select>
    </div>
  `, () => {
    const betrag = +document.getElementById('f-betrag').value;
    if (!betrag) return alert('Bitte Betrag angeben.');
    DB.zahlungen.push({ id: Date.now(), mieterId: +document.getElementById('f-mieter').value, wohnungId: +document.getElementById('f-wohnung').value, betrag, faellig: document.getElementById('f-faellig').value, bezahlt: document.getElementById('f-status').value === 'bezahlt' ? new Date().toISOString().split('T')[0] : null, status: document.getElementById('f-status').value, typ: document.getElementById('f-typ').value });
    modal.close(); navigate('zahlungen');
  });
}

// ===== WARTUNG =====
views.wartung = () => `
  <div class="page-header">
    <div><div class="page-title">Wartungsanfragen</div><div class="page-subtitle">${DB.wartung.filter(w=>w.status!=='erledigt').length} offen · ${DB.wartung.filter(w=>w.status==='erledigt').length} erledigt</div></div>
    <button class="btn btn-primary" onclick="openWartungForm()"><i class="fa-solid fa-plus"></i> Neue Anfrage</button>
  </div>
  <div class="toolbar">
    <select class="filter-select" onchange="filterWartung(this.value)">
      <option value="">Alle Status</option>
      <option value="neu">Neu</option><option value="in-arbeit">In Arbeit</option><option value="erledigt">Erledigt</option>
    </select>
    <select class="filter-select" onchange="filterWartungPrio(this.value)">
      <option value="">Alle Prioritäten</option>
      <option value="hoch">Hoch</option><option value="mittel">Mittel</option><option value="niedrig">Niedrig</option>
    </select>
  </div>
  <div class="grid-3" id="wartung-grid">${renderWartungCards(DB.wartung)}</div>`;

function renderWartungCards(list) {
  if (!list.length) return '<div style="grid-column:1/-1"><div class="empty-state"><i class="fa-solid fa-wrench"></i><p>Keine Wartungsanfragen.</p></div></div>';
  const prioColor = { hoch: 'red', mittel: 'orange', niedrig: 'green' };
  const prioLabel = { hoch: 'Hoch', mittel: 'Mittel', niedrig: 'Niedrig' };
  return list.map(w => {
    const wohnung = DB.getWohnung(w.wohnungId);
    return `
    <div class="card">
      <div class="card-body">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:10px">
          <div>
            <div style="font-weight:600;margin-bottom:4px">${w.titel}</div>
            <div style="font-size:12px;color:var(--text-muted)">${wohnung ? wohnung.nr + ' – ' + DB.getLiegenschaftName(wohnung.liegenschaftId) : '—'}</div>
          </div>
          ${badge(prioLabel[w.prioritaet], 'kpi-icon ' + prioColor[w.prioritaet])}
        </div>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;line-height:1.5">${w.beschreibung}</p>
        <div style="display:flex;align-items:center;justify-content:space-between">
          ${statusBadge(w.status)}
          <span style="font-size:11px;color:var(--text-muted)">${fmtDate(w.erstellt)}</span>
        </div>
        ${w.status !== 'erledigt' ? `
        <div style="display:flex;gap:6px;margin-top:10px">
          ${w.status === 'neu' ? `<button class="btn btn-secondary btn-sm" style="flex:1" onclick="updateWartungStatus(${w.id},'in-arbeit')">In Arbeit</button>` : ''}
          <button class="btn btn-success btn-sm" style="flex:1" onclick="updateWartungStatus(${w.id},'erledigt')"><i class="fa-solid fa-check"></i> Erledigt</button>
        </div>` : ''}
      </div>
    </div>`;
  }).join('');
}

function filterWartung(status) {
  const list = status ? DB.wartung.filter(w => w.status === status) : DB.wartung;
  document.getElementById('wartung-grid').innerHTML = renderWartungCards(list);
}
function filterWartungPrio(prio) {
  const list = prio ? DB.wartung.filter(w => w.prioritaet === prio) : DB.wartung;
  document.getElementById('wartung-grid').innerHTML = renderWartungCards(list);
}
function updateWartungStatus(id, status) {
  const w = DB.wartung.find(x => x.id === id);
  if (w) { w.status = status; if (status === 'erledigt') w.abgeschlossen = new Date().toISOString().split('T')[0]; }
  navigate('wartung');
}
function openWartungForm() {
  modal.open('Neue Wartungsanfrage', `
    <div class="form-group"><label class="form-label">Titel</label><input class="form-control" id="f-titel" placeholder="Kurze Beschreibung des Problems"></div>
    <div class="form-group"><label class="form-label">Wohnung</label>
      <select class="form-control" id="f-wohnung">${DB.wohnungen.map(w=>`<option value="${w.id}">${w.nr} – ${DB.getLiegenschaftName(w.liegenschaftId)}</option>`).join('')}</select>
    </div>
    <div class="form-group"><label class="form-label">Beschreibung</label><textarea class="form-control" id="f-beschreibung" rows="3" placeholder="Detaillierte Beschreibung…"></textarea></div>
    <div class="form-group"><label class="form-label">Priorität</label>
      <select class="form-control" id="f-prio">
        <option value="niedrig">Niedrig</option><option value="mittel" selected>Mittel</option><option value="hoch">Hoch</option>
      </select>
    </div>
  `, () => {
    const titel = document.getElementById('f-titel').value.trim();
    if (!titel) return alert('Bitte Titel eingeben.');
    DB.wartung.unshift({ id: Date.now(), wohnungId: +document.getElementById('f-wohnung').value, titel, beschreibung: document.getElementById('f-beschreibung').value, prioritaet: document.getElementById('f-prio').value, status: 'neu', erstellt: new Date().toISOString().split('T')[0], abgeschlossen: null });
    modal.close(); navigate('wartung');
  });
}

// ===== DOKUMENTE =====
views.dokumente = () => `
  <div class="page-header">
    <div><div class="page-title">Dokumente</div><div class="page-subtitle">${DB.dokumente.length} Dateien</div></div>
    <button class="btn btn-primary"><i class="fa-solid fa-upload"></i> Hochladen</button>
  </div>
  <div class="toolbar">
    <div class="search-box"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Dokument suchen…"></div>
    <select class="filter-select">
      <option>Alle Kategorien</option><option>Verträge</option><option>Abrechnungen</option><option>Allgemein</option><option>Wartung</option>
    </select>
  </div>
  <div class="card">
    <div class="table-wrapper">
      <table>
        <thead><tr><th>Name</th><th>Typ</th><th>Kategorie</th><th>Größe</th><th>Erstellt</th><th>Aktionen</th></tr></thead>
        <tbody>
          ${DB.dokumente.map(d => `
          <tr>
            <td><div style="display:flex;align-items:center;gap:10px">
              <div style="width:34px;height:34px;background:#fee2e2;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#dc2626;font-size:14px">
                <i class="fa-solid fa-file-pdf"></i>
              </div>
              <span style="font-weight:500">${d.name}</span>
            </div></td>
            <td>${d.typ}</td>
            <td><span class="badge-status aktiv">${d.kategorie}</span></td>
            <td>${d.groesse}</td>
            <td>${fmtDate(d.erstellt)}</td>
            <td><div class="table-actions">
              <button class="action-btn" title="Herunterladen"><i class="fa-solid fa-download"></i></button>
              <button class="action-btn danger" title="Löschen"><i class="fa-solid fa-trash"></i></button>
            </div></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;

// ===== EINSTELLUNGEN =====
views.einstellungen = () => `
  <div class="page-header"><div class="page-title">Einstellungen</div></div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><span class="card-title">Profil</span></div>
      <div class="card-body">
        <div class="form-group"><label class="form-label">Name</label><input class="form-control" value="Admin"></div>
        <div class="form-group"><label class="form-label">E-Mail</label><input class="form-control" value="admin@hausverwaltung.at"></div>
        <div class="form-group"><label class="form-label">Telefon</label><input class="form-control" value="+43 5574 123456"></div>
        <button class="btn btn-primary">Speichern</button>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Firma</span></div>
      <div class="card-body">
        <div class="form-group"><label class="form-label">Firmenname</label><input class="form-control" value="FHV Hausverwaltung GmbH"></div>
        <div class="form-group"><label class="form-label">Adresse</label><input class="form-control" value="Hauptstraße 1, 6900 Bregenz"></div>
        <div class="form-group"><label class="form-label">UID-Nummer</label><input class="form-control" value="ATU12345678"></div>
        <button class="btn btn-primary">Speichern</button>
      </div>
    </div>
  </div>`;

// ===== Init =====
navigate('dashboard');
