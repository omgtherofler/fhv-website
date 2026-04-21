import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { db as initialDb, getMieterName, getWohnungNr, getLiegenschaftName } from '../../lib/mockData';

// ─── Design Tokens ────────────────────────────────────────────
const C = {
  bg: '#f1f5f9', surface: '#ffffff', border: '#e2e8f0',
  text: '#0f172a', muted: '#64748b',
  primary: '#2563eb', primaryLight: '#dbeafe',
  success: '#16a34a', warning: '#d97706', danger: '#dc2626',
  sidebar: '#0f172a', sidebarActive: '#2563eb',
};

// ─── Helpers ──────────────────────────────────────────────────
const fmt = (n) => Number(n).toLocaleString('de-DE') + ' €';
const fmtDate = (d) => { if (!d) return '—'; const [y,m,day] = d.split('-'); return `${day}.${m}.${y}`; };
const initials = (v, n) => ((v||'?')[0] + (n||'?')[0]).toUpperCase();
const nextId = (arr) => Math.max(0, ...arr.map(x => x.id)) + 1;

// ─── Status Badge ─────────────────────────────────────────────
function StatusBadge({ s }) {
  const map = {
    aktiv: ['#dcfce7','#15803d','Aktiv'], leer: ['#ffedd5','#c2410c','Leer'],
    offen: ['#fef9c3','#a16207','Offen'], bezahlt: ['#dcfce7','#15803d','Bezahlt'],
    ueberfaellig: ['#fee2e2','#b91c1c','Überfällig'],
    'in-arbeit': ['#dbeafe','#1d4ed8','In Arbeit'],
    erledigt: ['#dcfce7','#15803d','Erledigt'], neu: ['#f3e8ff','#7e22ce','Neu'],
  };
  const [bg, color, label] = map[s] || ['#f1f5f9','#64748b', s];
  return <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:20, fontSize:12, fontWeight:500, background:bg, color }}>{label}</span>;
}

// ─── KPI Card ─────────────────────────────────────────────────
function KpiCard({ icon, value, label, color, sub }) {
  const cols = { blue:'#dbeafe:#2563eb', green:'#dcfce7:#16a34a', orange:'#ffedd5:#ea580c', red:'#fee2e2:#dc2626', purple:'#f3e8ff:#9333ea' };
  const [bg, fg] = (cols[color]||cols.blue).split(':');
  return (
    <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:20, display:'flex', alignItems:'center', gap:16, boxShadow:'0 1px 3px rgba(0,0,0,.06)' }}>
      <div style={{ width:48, height:48, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, background:bg, color:fg, flexShrink:0 }}>{icon}</div>
      <div>
        <div style={{ fontSize:24, fontWeight:700, lineHeight:1.1 }}>{value}</div>
        <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{label}</div>
        {sub && <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{sub}</div>}
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────
function Modal({ title, onClose, onSave, saveLabel = 'Speichern', children, danger }) {
  const ref = useRef();
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <div ref={ref} onClick={(e) => e.target === ref.current && onClose()}
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.45)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:C.surface, borderRadius:12, width:'100%', maxWidth:520, maxHeight:'90vh', overflow:'auto', boxShadow:'0 20px 60px rgba(0,0,0,.2)', animation:'modalIn .18s ease' }}>
        <style>{`@keyframes modalIn { from { opacity:0; transform:scale(.97) translateY(8px) } to { opacity:1; transform:none } }`}</style>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 22px', borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontWeight:600, fontSize:15 }}>{title}</div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', fontSize:20, color:C.muted, lineHeight:1, padding:'2px 6px' }}>×</button>
        </div>
        <div style={{ padding:22 }}>{children}</div>
        <div style={{ padding:'14px 22px', borderTop:`1px solid ${C.border}`, display:'flex', justifyContent:'flex-end', gap:10 }}>
          <button onClick={onClose} style={{ padding:'9px 18px', borderRadius:8, border:`1px solid ${C.border}`, background:C.surface, cursor:'pointer', fontSize:13.5, fontWeight:500 }}>Abbrechen</button>
          {onSave && (
            <button onClick={onSave} style={{ padding:'9px 18px', borderRadius:8, border:'none', background: danger ? C.danger : C.primary, color:'#fff', cursor:'pointer', fontSize:13.5, fontWeight:500 }}>
              {saveLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Form Helpers ─────────────────────────────────────────────
const F = {
  group: ({ label, children }) => (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:'block', fontSize:12, fontWeight:600, color:C.muted, marginBottom:5, textTransform:'uppercase', letterSpacing:'.4px' }}>{label}</label>
      {children}
    </div>
  ),
  input: (props) => <input {...props} style={{ width:'100%', padding:'9px 12px', border:`1px solid ${C.border}`, borderRadius:8, fontSize:13.5, outline:'none', boxSizing:'border-box', fontFamily:'inherit', ...props.style }} onFocus={e=>(e.target.style.borderColor=C.primary)} onBlur={e=>(e.target.style.borderColor=C.border)} />,
  select: (props) => <select {...props} style={{ width:'100%', padding:'9px 12px', border:`1px solid ${C.border}`, borderRadius:8, fontSize:13.5, outline:'none', boxSizing:'border-box', fontFamily:'inherit', background:'#fff', ...props.style }} />,
  row: ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>{children}</div>,
};

// ─── Action Buttons ───────────────────────────────────────────
const Btn = {
  primary: ({ onClick, children }) => (
    <button onClick={onClick} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'9px 16px', borderRadius:8, border:'none', background:C.primary, color:'#fff', cursor:'pointer', fontSize:13.5, fontWeight:500 }}>
      {children}
    </button>
  ),
  icon: ({ onClick, title, danger, children }) => (
    <button onClick={onClick} title={title} style={{ width:30, height:30, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, border:`1px solid ${C.border}`, background:'transparent', cursor:'pointer', color:C.muted, transition:'all .12s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = danger ? C.danger : C.primary; e.currentTarget.style.color = danger ? C.danger : C.primary; e.currentTarget.style.background = danger ? '#fee2e2' : C.primaryLight; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'transparent'; }}>
      {children}
    </button>
  ),
};

// ─── Table Shell ──────────────────────────────────────────────
function Table({ cols, children }) {
  return (
    <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, overflow:'hidden' }}>
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13.5 }}>
          <thead>
            <tr>{cols.map(c => <th key={c} style={{ padding:'10px 14px', textAlign:'left', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'.5px', color:C.muted, borderBottom:`1px solid ${C.border}`, whiteSpace:'nowrap' }}>{c}</th>)}</tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function Td({ children, bold }) {
  return <td style={{ padding:'11px 14px', borderBottom:`1px solid ${C.border}`, fontWeight: bold ? 600 : 400 }}>{children}</td>;
}

// ─── Search Bar ───────────────────────────────────────────────
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={{ position:'relative', width:260 }}>
      <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:C.muted, fontSize:14 }}>🔍</span>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder||'Suchen…'}
        style={{ width:'100%', padding:'9px 12px 9px 32px', border:`1px solid ${C.border}`, borderRadius:8, fontSize:13.5, outline:'none', fontFamily:'inherit', boxSizing:'border-box' }}
        onFocus={e=>(e.target.style.borderColor=C.primary)} onBlur={e=>(e.target.style.borderColor=C.border)} />
    </div>
  );
}

function PageHeader({ title, sub, onNew, newLabel }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
      <div>
        <div style={{ fontSize:22, fontWeight:700 }}>{title}</div>
        {sub && <div style={{ color:C.muted, fontSize:13, marginTop:2 }}>{sub}</div>}
      </div>
      {onNew && <Btn.primary onClick={onNew}>＋ {newLabel||'Neu'}</Btn.primary>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VIEWS
// ═══════════════════════════════════════════════════════════════

// ─── Dashboard ────────────────────────────────────────────────
function Dashboard({ data }) {
  const totalMiete = data.wohnungen.filter(w=>w.status==='aktiv').reduce((s,w)=>s+w.miete,0);
  const offene = data.zahlungen.filter(z=>z.status==='offen'||z.status==='ueberfaellig');
  const offenBetrag = offene.reduce((s,z)=>s+z.betrag,0);
  const leer = data.wohnungen.filter(w=>w.status==='leer').length;
  const belegung = Math.round(data.wohnungen.filter(w=>w.status==='aktiv').length/data.wohnungen.length*100);

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:22, fontWeight:700 }}>Dashboard</div>
        <div style={{ color:C.muted, fontSize:13, marginTop:2 }}>{new Date().toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:14, marginBottom:24 }}>
        <KpiCard icon="🏢" value={data.liegenschaften.length} label="Liegenschaften" color="blue" />
        <KpiCard icon="🚪" value={data.wohnungen.length} label="Wohneinheiten" color="green" sub={`${leer} leer`} />
        <KpiCard icon="👥" value={data.mieter.filter(m=>m.status==='aktiv').length} label="Aktive Mieter" color="purple" />
        <KpiCard icon="💶" value={fmt(totalMiete)} label="Soll-Miete/Mo" color="green" />
        <KpiCard icon="⏰" value={fmt(offenBetrag)} label="Offene Zahlungen" color={offenBetrag>0?'red':'green'} sub={`${offene.length} ausstehend`} />
        <KpiCard icon="🔧" value={data.wartung.filter(w=>w.status!=='erledigt').length} label="Offene Wartungen" color="orange" />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, overflow:'hidden' }}>
          <div style={{ padding:'14px 18px', borderBottom:`1px solid ${C.border}`, fontWeight:600, fontSize:14 }}>Belegung</div>
          <div style={{ padding:18 }}>
            {data.liegenschaften.map(l => {
              const ws = data.wohnungen.filter(w=>w.liegenschaftId===l.id);
              const belegt = ws.filter(w=>w.status==='aktiv').length;
              const pct = ws.length ? Math.round(belegt/ws.length*100) : 0;
              return (
                <div key={l.id} style={{ marginBottom:14 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4, fontSize:13 }}>
                    <span style={{ fontWeight:500 }}>{l.name}</span>
                    <span style={{ color:C.muted }}>{belegt}/{ws.length} · {pct}%</span>
                  </div>
                  <div style={{ height:6, background:C.border, borderRadius:3, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${pct}%`, background:C.primary, borderRadius:3 }} />
                  </div>
                </div>
              );
            })}
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:12, paddingTop:12, borderTop:`1px solid ${C.border}`, fontWeight:600, fontSize:13 }}>
              <span>Gesamt</span><span style={{ color:C.primary }}>{belegung}% belegt</span>
            </div>
          </div>
        </div>
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, overflow:'hidden' }}>
          <div style={{ padding:'14px 18px', borderBottom:`1px solid ${C.border}`, fontWeight:600, fontSize:14 }}>Letzte Zahlungen</div>
          <Table cols={['Mieter','Betrag','Status']}>
            {data.zahlungen.slice(0,5).map(z => (
              <tr key={z.id}>
                <Td>{getMieterName(z.mieterId)}</Td>
                <Td bold>{fmt(z.betrag)}</Td>
                <Td><StatusBadge s={z.status} /></Td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}

// ─── Liegenschaften ───────────────────────────────────────────
function Liegenschaften({ data, setData }) {
  const [modal, setModal] = useState(null); // null | { mode:'new'|'edit'|'delete', item? }
  const [form, setForm] = useState({});

  const open = (mode, item = {}) => {
    setForm(mode==='edit' ? { ...item } : { name:'', adresse:'', plz:'', ort:'Freiburg', baujahr:'', einheiten:'', status:'aktiv' });
    setModal({ mode, item });
  };
  const close = () => setModal(null);

  const save = () => {
    if (!form.name?.trim()) return alert('Name ist Pflichtfeld.');
    if (modal.mode === 'new') {
      setData(d => ({ ...d, liegenschaften: [...d.liegenschaften, { ...form, id: nextId(d.liegenschaften), einheiten: +form.einheiten, baujahr: +form.baujahr }] }));
    } else {
      setData(d => ({ ...d, liegenschaften: d.liegenschaften.map(l => l.id===form.id ? { ...form, einheiten:+form.einheiten, baujahr:+form.baujahr } : l) }));
    }
    close();
  };

  const del = () => {
    setData(d => ({ ...d, liegenschaften: d.liegenschaften.filter(l => l.id !== modal.item.id) }));
    close();
  };

  return (
    <div>
      <PageHeader title="Liegenschaften" sub={`${data.liegenschaften.length} Objekte`} onNew={() => open('new')} newLabel="Liegenschaft" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:14 }}>
        {data.liegenschaften.map(l => {
          const ws = data.wohnungen.filter(w=>w.liegenschaftId===l.id);
          const belegt = ws.filter(w=>w.status==='aktiv').length;
          const miete = ws.filter(w=>w.status==='aktiv').reduce((s,w)=>s+w.miete,0);
          const pct = ws.length ? Math.round(belegt/ws.length*100) : 0;
          return (
            <div key={l.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, overflow:'hidden' }}>
              <div style={{ padding:'14px 18px', borderBottom:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:14 }}>{l.name}</div>
                  <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{l.adresse}, {l.plz} {l.ort}</div>
                </div>
                <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                  <StatusBadge s={l.status} />
                  <Btn.icon onClick={() => open('edit', l)} title="Bearbeiten">✏️</Btn.icon>
                  <Btn.icon onClick={() => setModal({ mode:'delete', item:l })} title="Löschen" danger>🗑</Btn.icon>
                </div>
              </div>
              <div style={{ padding:18 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
                  {[['Einheiten',l.einheiten],['Baujahr',l.baujahr],['Belegt',`${belegt}/${ws.length}`],['Ist-Miete',fmt(miete)+'/Mo']].map(([k,v])=>(
                    <div key={k}><div style={{ fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.4px',color:C.muted,marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
                  ))}
                </div>
                <div style={{ fontSize:12, marginBottom:4, display:'flex', justifyContent:'space-between' }}><span>Belegung</span><span style={{ fontWeight:600 }}>{pct}%</span></div>
                <div style={{ height:6, background:C.border, borderRadius:3, overflow:'hidden' }}><div style={{ height:'100%', width:`${pct}%`, background:C.primary, borderRadius:3 }}/></div>
              </div>
            </div>
          );
        })}
      </div>

      {modal?.mode !== 'delete' && modal && (
        <Modal title={modal.mode==='new' ? 'Neue Liegenschaft' : 'Liegenschaft bearbeiten'} onClose={close} onSave={save}>
          <F.group label="Name"><F.input value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Wohnanlage Bergstraße" /></F.group>
          <F.group label="Adresse"><F.input value={form.adresse||''} onChange={e=>setForm({...form,adresse:e.target.value})} placeholder="Musterstraße 1" /></F.group>
          <F.row>
            <F.group label="PLZ"><F.input value={form.plz||''} onChange={e=>setForm({...form,plz:e.target.value})} placeholder="79098" /></F.group>
            <F.group label="Ort"><F.input value={form.ort||''} onChange={e=>setForm({...form,ort:e.target.value})} placeholder="Freiburg" /></F.group>
          </F.row>
          <F.row>
            <F.group label="Baujahr"><F.input type="number" value={form.baujahr||''} onChange={e=>setForm({...form,baujahr:e.target.value})} placeholder="2000" /></F.group>
            <F.group label="Einheiten"><F.input type="number" value={form.einheiten||''} onChange={e=>setForm({...form,einheiten:e.target.value})} placeholder="10" /></F.group>
          </F.row>
          <F.group label="Status">
            <F.select value={form.status||'aktiv'} onChange={e=>setForm({...form,status:e.target.value})}>
              <option value="aktiv">Aktiv</option><option value="inaktiv">Inaktiv</option>
            </F.select>
          </F.group>
        </Modal>
      )}
      {modal?.mode === 'delete' && (
        <Modal title="Liegenschaft löschen?" onClose={close} onSave={del} saveLabel="Löschen" danger>
          <p style={{ color:C.muted, fontSize:14 }}>Soll <strong>{modal.item.name}</strong> wirklich gelöscht werden? Diese Aktion kann nicht rückgängig gemacht werden.</p>
        </Modal>
      )}
    </div>
  );
}

// ─── Wohnungen ────────────────────────────────────────────────
function Wohnungen({ data, setData }) {
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const open = (mode, item={}) => {
    setForm(mode==='edit' ? { ...item } : { nr:'', typ:'2-Zimmer', liegenschaftId: data.liegenschaften[0]?.id||'', flaeche:'', stockwerk:'EG', miete:'', status:'leer', mieterId:null });
    setModal({ mode, item });
  };
  const close = () => setModal(null);

  const save = () => {
    if (!form.nr?.trim()) return alert('Wohnungsnummer ist Pflichtfeld.');
    const entry = { ...form, liegenschaftId:+form.liegenschaftId, flaeche:+form.flaeche, miete:+form.miete, mieterId:form.mieterId ? +form.mieterId : null };
    if (modal.mode==='new') setData(d => ({ ...d, wohnungen: [...d.wohnungen, { ...entry, id:nextId(d.wohnungen) }] }));
    else setData(d => ({ ...d, wohnungen: d.wohnungen.map(w => w.id===form.id ? entry : w) }));
    close();
  };

  const del = () => {
    setData(d => ({ ...d, wohnungen: d.wohnungen.filter(w => w.id!==modal.item.id) }));
    close();
  };

  const filtered = data.wohnungen.filter(w => !q || w.nr.toLowerCase().includes(q.toLowerCase()) || getLiegenschaftName(w.liegenschaftId).toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader title="Wohnungen" sub={`${data.wohnungen.length} Einheiten · ${data.wohnungen.filter(w=>w.status==='leer').length} leer`} onNew={() => open('new')} newLabel="Wohnung" />
      <div style={{ marginBottom:14 }}><SearchBar value={q} onChange={setQ} placeholder="Nr. oder Objekt…" /></div>
      <Table cols={['Nr.','Objekt','Typ','Fläche','Stockwerk','Miete','Mieter','Status','']}>
        {filtered.map(w => (
          <tr key={w.id}>
            <Td bold>{w.nr}</Td>
            <Td>{getLiegenschaftName(w.liegenschaftId)}</Td>
            <Td>{w.typ}</Td>
            <Td>{w.flaeche} m²</Td>
            <Td>{w.stockwerk}</Td>
            <Td bold>{fmt(w.miete)}</Td>
            <Td>{w.mieterId ? getMieterName(w.mieterId) : <span style={{ color:C.muted }}>—</span>}</Td>
            <Td><StatusBadge s={w.status} /></Td>
            <td style={{ padding:'8px 14px', borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:'flex', gap:6 }}>
                <Btn.icon onClick={() => open('edit',w)} title="Bearbeiten">✏️</Btn.icon>
                <Btn.icon onClick={() => setModal({ mode:'delete', item:w })} title="Löschen" danger>🗑</Btn.icon>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {modal?.mode !== 'delete' && modal && (
        <Modal title={modal.mode==='new' ? 'Neue Wohnung' : 'Wohnung bearbeiten'} onClose={close} onSave={save}>
          <F.row>
            <F.group label="Nr."><F.input value={form.nr||''} onChange={e=>setForm({...form,nr:e.target.value})} placeholder="A01" /></F.group>
            <F.group label="Typ">
              <F.select value={form.typ||'2-Zimmer'} onChange={e=>setForm({...form,typ:e.target.value})}>
                {['1-Zimmer','2-Zimmer','3-Zimmer','4-Zimmer','5-Zimmer+'].map(t=><option key={t}>{t}</option>)}
              </F.select>
            </F.group>
          </F.row>
          <F.group label="Liegenschaft">
            <F.select value={form.liegenschaftId||''} onChange={e=>setForm({...form,liegenschaftId:e.target.value})}>
              {data.liegenschaften.map(l=><option key={l.id} value={l.id}>{l.name}</option>)}
            </F.select>
          </F.group>
          <F.row>
            <F.group label="Fläche (m²)"><F.input type="number" value={form.flaeche||''} onChange={e=>setForm({...form,flaeche:e.target.value})} placeholder="65" /></F.group>
            <F.group label="Stockwerk"><F.input value={form.stockwerk||''} onChange={e=>setForm({...form,stockwerk:e.target.value})} placeholder="EG, 1. OG…" /></F.group>
          </F.row>
          <F.row>
            <F.group label="Miete (€/Mo)"><F.input type="number" value={form.miete||''} onChange={e=>setForm({...form,miete:e.target.value})} placeholder="800" /></F.group>
            <F.group label="Status">
              <F.select value={form.status||'leer'} onChange={e=>setForm({...form,status:e.target.value})}>
                <option value="aktiv">Vermietet</option><option value="leer">Leer</option>
              </F.select>
            </F.group>
          </F.row>
          <F.group label="Mieter (optional)">
            <F.select value={form.mieterId||''} onChange={e=>setForm({...form,mieterId:e.target.value||null})}>
              <option value="">— Kein Mieter —</option>
              {data.mieter.map(m=><option key={m.id} value={m.id}>{m.vorname} {m.nachname}</option>)}
            </F.select>
          </F.group>
        </Modal>
      )}
      {modal?.mode==='delete' && (
        <Modal title="Wohnung löschen?" onClose={close} onSave={del} saveLabel="Löschen" danger>
          <p style={{ color:C.muted, fontSize:14 }}>Wohnung <strong>{modal.item.nr}</strong> wirklich löschen?</p>
        </Modal>
      )}
    </div>
  );
}

// ─── Mieter ───────────────────────────────────────────────────
function Mieter({ data, setData }) {
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const open = (mode, item={}) => {
    setForm(mode==='edit' ? { ...item } : { vorname:'', nachname:'', email:'', telefon:'', geburtsdatum:'', wohnungId:'', einzug:'', status:'aktiv' });
    setModal({ mode, item });
  };
  const close = () => setModal(null);

  const save = () => {
    if (!form.vorname?.trim() || !form.nachname?.trim()) return alert('Vor- und Nachname sind Pflichtfelder.');
    const entry = { ...form, wohnungId: form.wohnungId ? +form.wohnungId : null };
    if (modal.mode==='new') setData(d => ({ ...d, mieter: [...d.mieter, { ...entry, id:nextId(d.mieter) }] }));
    else setData(d => ({ ...d, mieter: d.mieter.map(m => m.id===form.id ? entry : m) }));
    close();
  };

  const del = () => {
    setData(d => ({ ...d, mieter: d.mieter.filter(m => m.id!==modal.item.id) }));
    close();
  };

  const filtered = data.mieter.filter(m => !q || `${m.vorname} ${m.nachname} ${m.email}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader title="Mieter" sub={`${data.mieter.length} Personen`} onNew={() => open('new')} newLabel="Mieter" />
      <div style={{ marginBottom:14 }}><SearchBar value={q} onChange={setQ} placeholder="Name oder E-Mail…" /></div>
      <Table cols={['Name','Wohnung','E-Mail','Telefon','Einzug','Status','']}>
        {filtered.map(m => (
          <tr key={m.id}>
            <Td>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:32,height:32,borderRadius:'50%',background:'#dbeafe',color:C.primary,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,flexShrink:0 }}>{initials(m.vorname,m.nachname)}</div>
                <span style={{ fontWeight:500 }}>{m.vorname} {m.nachname}</span>
              </div>
            </Td>
            <Td>{m.wohnungId ? getWohnungNr(m.wohnungId) : '—'}</Td>
            <Td><a href={`mailto:${m.email}`} style={{ color:C.primary, textDecoration:'none' }}>{m.email}</a></Td>
            <Td>{m.telefon}</Td>
            <Td>{fmtDate(m.einzug)}</Td>
            <Td><StatusBadge s={m.status} /></Td>
            <td style={{ padding:'8px 14px', borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:'flex', gap:6 }}>
                <Btn.icon onClick={() => open('edit',m)} title="Bearbeiten">✏️</Btn.icon>
                <Btn.icon onClick={() => setModal({ mode:'delete', item:m })} title="Löschen" danger>🗑</Btn.icon>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {modal?.mode !== 'delete' && modal && (
        <Modal title={modal.mode==='new' ? 'Neuer Mieter' : 'Mieter bearbeiten'} onClose={close} onSave={save}>
          <F.row>
            <F.group label="Vorname"><F.input value={form.vorname||''} onChange={e=>setForm({...form,vorname:e.target.value})} placeholder="Max" /></F.group>
            <F.group label="Nachname"><F.input value={form.nachname||''} onChange={e=>setForm({...form,nachname:e.target.value})} placeholder="Mustermann" /></F.group>
          </F.row>
          <F.group label="E-Mail"><F.input type="email" value={form.email||''} onChange={e=>setForm({...form,email:e.target.value})} placeholder="max@example.de" /></F.group>
          <F.row>
            <F.group label="Telefon"><F.input value={form.telefon||''} onChange={e=>setForm({...form,telefon:e.target.value})} placeholder="+49 176…" /></F.group>
            <F.group label="Geburtsdatum"><F.input type="date" value={form.geburtsdatum||''} onChange={e=>setForm({...form,geburtsdatum:e.target.value})} /></F.group>
          </F.row>
          <F.row>
            <F.group label="Wohnung">
              <F.select value={form.wohnungId||''} onChange={e=>setForm({...form,wohnungId:e.target.value})}>
                <option value="">— Keine —</option>
                {data.wohnungen.map(w=><option key={w.id} value={w.id}>{w.nr} – {getLiegenschaftName(w.liegenschaftId)}</option>)}
              </F.select>
            </F.group>
            <F.group label="Einzug"><F.input type="date" value={form.einzug||''} onChange={e=>setForm({...form,einzug:e.target.value})} /></F.group>
          </F.row>
          <F.group label="Status">
            <F.select value={form.status||'aktiv'} onChange={e=>setForm({...form,status:e.target.value})}>
              <option value="aktiv">Aktiv</option><option value="inaktiv">Inaktiv</option>
            </F.select>
          </F.group>
        </Modal>
      )}
      {modal?.mode==='delete' && (
        <Modal title="Mieter löschen?" onClose={close} onSave={del} saveLabel="Löschen" danger>
          <p style={{ color:C.muted, fontSize:14 }}>Mieter <strong>{modal.item.vorname} {modal.item.nachname}</strong> wirklich löschen?</p>
        </Modal>
      )}
    </div>
  );
}

// ─── Zahlungen ────────────────────────────────────────────────
function Zahlungen({ data, setData }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [filter, setFilter] = useState('');

  const open = (mode, item={}) => {
    setForm(mode==='edit' ? { ...item } : { mieterId:'', wohnungId:'', betrag:'', faellig:'', bezahlt:'', status:'offen', typ:`Miete ${new Date().toLocaleString('de-DE',{month:'long',year:'numeric'})}` });
    setModal({ mode, item });
  };
  const close = () => setModal(null);

  const save = () => {
    if (!form.betrag) return alert('Betrag ist Pflichtfeld.');
    const entry = { ...form, betrag:+form.betrag, mieterId:+form.mieterId, wohnungId:+form.wohnungId, bezahlt:form.bezahlt||null };
    if (modal.mode==='new') setData(d => ({ ...d, zahlungen: [...d.zahlungen, { ...entry, id:nextId(d.zahlungen) }] }));
    else setData(d => ({ ...d, zahlungen: d.zahlungen.map(z => z.id===form.id ? entry : z) }));
    close();
  };

  const markBezahlt = (id) => {
    setData(d => ({ ...d, zahlungen: d.zahlungen.map(z => z.id===id ? { ...z, status:'bezahlt', bezahlt:new Date().toISOString().split('T')[0] } : z) }));
  };

  const del = () => {
    setData(d => ({ ...d, zahlungen: d.zahlungen.filter(z => z.id!==modal.item.id) }));
    close();
  };

  const bezahlt = data.zahlungen.filter(z=>z.status==='bezahlt').reduce((s,z)=>s+z.betrag,0);
  const offen = data.zahlungen.filter(z=>z.status==='offen').reduce((s,z)=>s+z.betrag,0);
  const ue = data.zahlungen.filter(z=>z.status==='ueberfaellig').reduce((s,z)=>s+z.betrag,0);
  const filtered = data.zahlungen.filter(z => !filter || z.status===filter);

  return (
    <div>
      <PageHeader title="Zahlungen" onNew={() => open('new')} newLabel="Zahlung" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:20 }}>
        <KpiCard icon="✅" value={fmt(bezahlt)} label="Eingegangen" color="green" />
        <KpiCard icon="🕐" value={fmt(offen)} label="Ausstehend" color="orange" />
        <KpiCard icon="⚠️" value={fmt(ue)} label="Überfällig" color="red" />
      </div>
      <div style={{ marginBottom:14, display:'flex', gap:8 }}>
        {[['','Alle'],['bezahlt','Bezahlt'],['offen','Offen'],['ueberfaellig','Überfällig']].map(([val,label]) => (
          <button key={val} onClick={() => setFilter(val)}
            style={{ padding:'7px 14px', borderRadius:8, border:`1px solid ${filter===val ? C.primary : C.border}`, background:filter===val ? C.primaryLight : C.surface, color:filter===val ? C.primary : C.text, cursor:'pointer', fontSize:13, fontWeight:filter===val ? 600 : 400 }}>
            {label}
          </button>
        ))}
      </div>
      <Table cols={['Beschreibung','Mieter','Wohnung','Betrag','Fällig','Bezahlt am','Status','']}>
        {filtered.map(z => (
          <tr key={z.id}>
            <Td>{z.typ}</Td>
            <Td>{getMieterName(z.mieterId)}</Td>
            <Td>{getWohnungNr(z.wohnungId)}</Td>
            <Td bold>{fmt(z.betrag)}</Td>
            <Td>{fmtDate(z.faellig)}</Td>
            <Td>{fmtDate(z.bezahlt)}</Td>
            <Td><StatusBadge s={z.status} /></Td>
            <td style={{ padding:'8px 14px', borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:'flex', gap:6 }}>
                {z.status!=='bezahlt' && (
                  <button onClick={() => markBezahlt(z.id)} style={{ padding:'4px 10px', background:'#dcfce7', color:'#15803d', border:'none', borderRadius:6, fontSize:12, cursor:'pointer', fontWeight:600 }}>✓</button>
                )}
                <Btn.icon onClick={() => open('edit',z)} title="Bearbeiten">✏️</Btn.icon>
                <Btn.icon onClick={() => setModal({ mode:'delete', item:z })} title="Löschen" danger>🗑</Btn.icon>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {modal?.mode !== 'delete' && modal && (
        <Modal title={modal.mode==='new' ? 'Zahlung erfassen' : 'Zahlung bearbeiten'} onClose={close} onSave={save}>
          <F.group label="Beschreibung"><F.input value={form.typ||''} onChange={e=>setForm({...form,typ:e.target.value})} placeholder="Miete April 2026" /></F.group>
          <F.row>
            <F.group label="Mieter">
              <F.select value={form.mieterId||''} onChange={e=>setForm({...form,mieterId:e.target.value})}>
                <option value="">— Wählen —</option>
                {data.mieter.map(m=><option key={m.id} value={m.id}>{m.vorname} {m.nachname}</option>)}
              </F.select>
            </F.group>
            <F.group label="Wohnung">
              <F.select value={form.wohnungId||''} onChange={e=>setForm({...form,wohnungId:e.target.value})}>
                <option value="">— Wählen —</option>
                {data.wohnungen.map(w=><option key={w.id} value={w.id}>{w.nr}</option>)}
              </F.select>
            </F.group>
          </F.row>
          <F.row>
            <F.group label="Betrag (€)"><F.input type="number" value={form.betrag||''} onChange={e=>setForm({...form,betrag:e.target.value})} placeholder="900" /></F.group>
            <F.group label="Fällig am"><F.input type="date" value={form.faellig||''} onChange={e=>setForm({...form,faellig:e.target.value})} /></F.group>
          </F.row>
          <F.row>
            <F.group label="Status">
              <F.select value={form.status||'offen'} onChange={e=>setForm({...form,status:e.target.value})}>
                <option value="offen">Offen</option><option value="bezahlt">Bezahlt</option><option value="ueberfaellig">Überfällig</option>
              </F.select>
            </F.group>
            <F.group label="Bezahlt am"><F.input type="date" value={form.bezahlt||''} onChange={e=>setForm({...form,bezahlt:e.target.value})} /></F.group>
          </F.row>
        </Modal>
      )}
      {modal?.mode==='delete' && (
        <Modal title="Zahlung löschen?" onClose={close} onSave={del} saveLabel="Löschen" danger>
          <p style={{ color:C.muted, fontSize:14 }}>Eintrag <strong>{modal.item.typ}</strong> wirklich löschen?</p>
        </Modal>
      )}
    </div>
  );
}

// ─── Wartung ──────────────────────────────────────────────────
function Wartung({ data, setData }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [filter, setFilter] = useState('');

  const open = (mode, item={}) => {
    setForm(mode==='edit' ? { ...item } : { wohnungId:'', titel:'', beschreibung:'', prioritaet:'mittel', status:'neu', erstellt:new Date().toISOString().split('T')[0] });
    setModal({ mode, item });
  };
  const close = () => setModal(null);

  const save = () => {
    if (!form.titel?.trim()) return alert('Titel ist Pflichtfeld.');
    const entry = { ...form, wohnungId:+form.wohnungId };
    if (modal.mode==='new') setData(d => ({ ...d, wartung: [...d.wartung, { ...entry, id:nextId(d.wartung) }] }));
    else setData(d => ({ ...d, wartung: d.wartung.map(w => w.id===form.id ? entry : w) }));
    close();
  };

  const del = () => {
    setData(d => ({ ...d, wartung: d.wartung.filter(w => w.id!==modal.item.id) }));
    close();
  };

  const updateStatus = (id, status) => setData(d => ({ ...d, wartung: d.wartung.map(w => w.id===id ? { ...w, status } : w) }));

  const prioStyle = { hoch:['#fee2e2','#dc2626'], mittel:['#ffedd5','#ea580c'], niedrig:['#dcfce7','#16a34a'] };
  const filtered = data.wartung.filter(w => !filter || w.status===filter);

  return (
    <div>
      <PageHeader title="Wartungsanfragen" sub={`${data.wartung.filter(w=>w.status!=='erledigt').length} offen`} onNew={() => open('new')} newLabel="Anfrage" />
      <div style={{ marginBottom:14, display:'flex', gap:8 }}>
        {[['','Alle'],['neu','Neu'],['in-arbeit','In Arbeit'],['erledigt','Erledigt']].map(([val,label]) => (
          <button key={val} onClick={() => setFilter(val)}
            style={{ padding:'7px 14px', borderRadius:8, border:`1px solid ${filter===val ? C.primary : C.border}`, background:filter===val ? C.primaryLight : C.surface, color:filter===val ? C.primary : C.text, cursor:'pointer', fontSize:13, fontWeight:filter===val ? 600 : 400 }}>
            {label}
          </button>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:14 }}>
        {filtered.map(w => {
          const [prioBg, prioFg] = prioStyle[w.prioritaet]||prioStyle.mittel;
          return (
            <div key={w.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:18 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                <div style={{ fontWeight:600, fontSize:14, flex:1, marginRight:8 }}>{w.titel}</div>
                <div style={{ display:'flex', gap:5, flexShrink:0 }}>
                  <Btn.icon onClick={() => open('edit',w)} title="Bearbeiten">✏️</Btn.icon>
                  <Btn.icon onClick={() => setModal({ mode:'delete', item:w })} title="Löschen" danger>🗑</Btn.icon>
                </div>
              </div>
              <div style={{ display:'flex', gap:6, alignItems:'center', marginBottom:8 }}>
                <span style={{ fontSize:11, padding:'3px 8px', borderRadius:12, background:prioBg, color:prioFg, fontWeight:500 }}>{w.prioritaet}</span>
                <span style={{ fontSize:12, color:C.muted }}>{getWohnungNr(w.wohnungId)} · {fmtDate(w.erstellt)}</span>
              </div>
              <p style={{ fontSize:13, color:'#3a3a3a', lineHeight:1.5, margin:'0 0 12px' }}>{w.beschreibung}</p>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <StatusBadge s={w.status} />
                {w.status!=='erledigt' && (
                  <div style={{ display:'flex', gap:6 }}>
                    {w.status==='neu' && <button onClick={() => updateStatus(w.id,'in-arbeit')} style={{ padding:'5px 10px', fontSize:12, border:`1px solid ${C.border}`, borderRadius:6, cursor:'pointer', background:'white' }}>In Arbeit</button>}
                    <button onClick={() => updateStatus(w.id,'erledigt')} style={{ padding:'5px 10px', fontSize:12, background:'#dcfce7', color:'#15803d', border:'none', borderRadius:6, cursor:'pointer', fontWeight:600 }}>✓ Erledigt</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {modal?.mode !== 'delete' && modal && (
        <Modal title={modal.mode==='new' ? 'Neue Wartungsanfrage' : 'Anfrage bearbeiten'} onClose={close} onSave={save}>
          <F.group label="Titel"><F.input value={form.titel||''} onChange={e=>setForm({...form,titel:e.target.value})} placeholder="Kurze Beschreibung" /></F.group>
          <F.group label="Wohnung">
            <F.select value={form.wohnungId||''} onChange={e=>setForm({...form,wohnungId:e.target.value})}>
              <option value="">— Wählen —</option>
              {data.wohnungen.map(w=><option key={w.id} value={w.id}>{w.nr} – {getLiegenschaftName(w.liegenschaftId)}</option>)}
            </F.select>
          </F.group>
          <F.group label="Beschreibung">
            <textarea value={form.beschreibung||''} onChange={e=>setForm({...form,beschreibung:e.target.value})} rows={3} placeholder="Detaillierte Beschreibung…"
              style={{ width:'100%', padding:'9px 12px', border:`1px solid ${C.border}`, borderRadius:8, fontSize:13.5, outline:'none', boxSizing:'border-box', fontFamily:'inherit', resize:'vertical' }} />
          </F.group>
          <F.row>
            <F.group label="Priorität">
              <F.select value={form.prioritaet||'mittel'} onChange={e=>setForm({...form,prioritaet:e.target.value})}>
                <option value="niedrig">Niedrig</option><option value="mittel">Mittel</option><option value="hoch">Hoch</option>
              </F.select>
            </F.group>
            <F.group label="Status">
              <F.select value={form.status||'neu'} onChange={e=>setForm({...form,status:e.target.value})}>
                <option value="neu">Neu</option><option value="in-arbeit">In Arbeit</option><option value="erledigt">Erledigt</option>
              </F.select>
            </F.group>
          </F.row>
          <F.group label="Erstellt am"><F.input type="date" value={form.erstellt||''} onChange={e=>setForm({...form,erstellt:e.target.value})} /></F.group>
        </Modal>
      )}
      {modal?.mode==='delete' && (
        <Modal title="Anfrage löschen?" onClose={close} onSave={del} saveLabel="Löschen" danger>
          <p style={{ color:C.muted, fontSize:14 }}>Anfrage <strong>{modal.item.titel}</strong> wirklich löschen?</p>
        </Modal>
      )}
    </div>
  );
}

// ─── Nav items ────────────────────────────────────────────────
const NAV = [
  { id:'dashboard',      icon:'📊', label:'Dashboard' },
  { id:'liegenschaften', icon:'🏢', label:'Liegenschaften' },
  { id:'wohnungen',      icon:'🚪', label:'Wohnungen' },
  { id:'mieter',         icon:'👥', label:'Mieter' },
  { id:'zahlungen',      icon:'💶', label:'Zahlungen' },
  { id:'wartung',        icon:'🔧', label:'Wartung' },
];

// ─── Page ─────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [view, setView] = useState('dashboard');
  const [data, setData] = useState(() => JSON.parse(JSON.stringify(initialDb)));
  const [collapsed, setCollapsed] = useState(false);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const views = {
    dashboard:      <Dashboard data={data} />,
    liegenschaften: <Liegenschaften data={data} setData={setData} />,
    wohnungen:      <Wohnungen data={data} setData={setData} />,
    mieter:         <Mieter data={data} setData={setData} />,
    zahlungen:      <Zahlungen data={data} setData={setData} />,
    wartung:        <Wartung data={data} setData={setData} />,
  };

  return (
    <>
      <Head><title>Admin – FHV Hausverwaltung</title></Head>
      <div style={{ display:'flex', minHeight:'100vh', background:C.bg, color:C.text, fontSize:14 }}>

        {/* Sidebar */}
        <aside style={{ width:collapsed?64:220, flexShrink:0, background:C.sidebar, display:'flex', flexDirection:'column', transition:'width .2s', overflow:'hidden', position:'sticky', top:0, height:'100vh' }}>
          <div style={{ padding:'16px 12px', borderBottom:'1px solid #1e293b', display:'flex', alignItems:'center', justifyContent:'space-between', minHeight:58 }}>
            {!collapsed && <span style={{ color:'#f1f5f9', fontWeight:700, fontSize:15, whiteSpace:'nowrap', overflow:'hidden' }}>FHV Admin</span>}
            <button onClick={() => setCollapsed(!collapsed)} style={{ background:'none', border:'none', color:'#94a3b8', cursor:'pointer', fontSize:18, padding:'4px 6px', marginLeft:collapsed?'auto':0, flexShrink:0 }}>☰</button>
          </div>
          <nav style={{ flex:1, padding:'8px 0', overflowY:'auto' }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setView(n.id)}
                style={{ display:'flex', alignItems:'center', gap:10, width:'calc(100% - 16px)', margin:'2px 8px', padding:'10px 12px', borderRadius:8, border:'none', cursor:'pointer', transition:'all .15s', whiteSpace:'nowrap', background:view===n.id?C.sidebarActive:'transparent', color:view===n.id?'#fff':'#94a3b8', textAlign:'left', fontSize:13.5 }}>
                <span style={{ fontSize:16, flexShrink:0 }}>{n.icon}</span>
                {!collapsed && <span>{n.label}</span>}
              </button>
            ))}
          </nav>
          <div style={{ padding:'10px 8px', borderTop:'1px solid #1e293b' }}>
            <button onClick={() => router.push('/')}
              style={{ display:'flex', alignItems:'center', gap:10, width:'100%', padding:'9px 12px', borderRadius:8, border:'none', cursor:'pointer', background:'transparent', color:'#94a3b8', fontSize:13, whiteSpace:'nowrap', marginBottom:4 }}>
              <span style={{ fontSize:16 }}>🌐</span>{!collapsed && 'Website'}
            </button>
            <button onClick={logout}
              style={{ display:'flex', alignItems:'center', gap:10, width:'100%', padding:'9px 12px', borderRadius:8, border:'none', cursor:'pointer', background:'transparent', color:'#94a3b8', fontSize:13, whiteSpace:'nowrap' }}>
              <span style={{ fontSize:16 }}>🚪</span>{!collapsed && 'Abmelden'}
            </button>
          </div>
        </aside>

        {/* Content */}
        <main style={{ flex:1, padding:28, overflowY:'auto', minWidth:0 }}>
          {views[view]}
        </main>
      </div>
    </>
  );
}
