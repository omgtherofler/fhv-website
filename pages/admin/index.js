import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { db, getMieterName, getWohnungNr, getLiegenschaftName } from '../../lib/mockData';

// ─── Tokens ───────────────────────────────────────────────────
const C = {
  bg: '#f1f5f9', surface: '#ffffff', border: '#e2e8f0',
  text: '#0f172a', muted: '#64748b',
  primary: '#2563eb', primaryLight: '#dbeafe',
  success: '#16a34a', warning: '#d97706', danger: '#dc2626',
  sidebar: '#0f172a', sidebarHover: '#1e293b',
};

// ─── Helpers ──────────────────────────────────────────────────
const fmt = (n) => Number(n).toLocaleString('de-DE', { minimumFractionDigits: 0 }) + ' €';
const fmtDate = (d) => { if (!d) return '—'; const [y, m, day] = d.split('-'); return `${day}.${m}.${y}`; };
const initials = (v, n) => (v[0] + n[0]).toUpperCase();

function StatusBadge({ s }) {
  const map = {
    aktiv:        ['#dcfce7','#15803d','Aktiv'],
    leer:         ['#ffedd5','#c2410c','Leer'],
    offen:        ['#fef9c3','#a16207','Offen'],
    bezahlt:      ['#dcfce7','#15803d','Bezahlt'],
    ueberfaellig: ['#fee2e2','#b91c1c','Überfällig'],
    'in-arbeit':  ['#dbeafe','#1d4ed8','In Arbeit'],
    erledigt:     ['#dcfce7','#15803d','Erledigt'],
    neu:          ['#f3e8ff','#7e22ce','Neu'],
  };
  const [bg, color, label] = map[s] || ['#f1f5f9','#64748b', s];
  return <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:20, fontSize:12, fontWeight:500, background:bg, color }}>{label}</span>;
}

function KpiCard({ icon, value, label, color, sub }) {
  const cols = { blue:'#dbeafe:#2563eb', green:'#dcfce7:#16a34a', orange:'#ffedd5:#ea580c', red:'#fee2e2:#dc2626', purple:'#f3e8ff:#9333ea' };
  const [bg, fg] = (cols[color] || cols.blue).split(':');
  return (
    <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:20, display:'flex', alignItems:'center', gap:16, boxShadow:'0 1px 3px rgba(0,0,0,.06)' }}>
      <div style={{ width:48, height:48, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, background:bg, color:fg, flexShrink:0 }}>{icon}</div>
      <div>
        <div style={{ fontSize:26, fontWeight:700, lineHeight:1.1 }}>{value}</div>
        <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{label}</div>
        {sub && <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>{sub}</div>}
      </div>
    </div>
  );
}

// ─── Views ────────────────────────────────────────────────────

function Dashboard({ data }) {
  const totalMiete = data.wohnungen.filter(w => w.status==='aktiv').reduce((s,w)=>s+w.miete,0);
  const offeneZahlungen = data.zahlungen.filter(z => z.status==='offen'||z.status==='ueberfaellig');
  const offenBetrag = offeneZahlungen.reduce((s,z)=>s+z.betrag,0);
  const leer = data.wohnungen.filter(w=>w.status==='leer').length;
  const offeneWartung = data.wartung.filter(w=>w.status!=='erledigt').length;
  const belegung = Math.round(data.wohnungen.filter(w=>w.status==='aktiv').length/data.wohnungen.length*100);

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:22, fontWeight:700 }}>Dashboard</div>
        <div style={{ color:C.muted, fontSize:13, marginTop:2 }}>Übersicht · {new Date().toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginBottom:24 }}>
        <KpiCard icon="🏢" value={data.liegenschaften.length} label="Liegenschaften" color="blue" />
        <KpiCard icon="🚪" value={data.wohnungen.length} label="Wohneinheiten" color="green" sub={leer > 0 ? `${leer} leer` : 'Vollvermietet'} />
        <KpiCard icon="👥" value={data.mieter.filter(m=>m.status==='aktiv').length} label="Aktive Mieter" color="purple" />
        <KpiCard icon="💶" value={fmt(totalMiete)} label="Monatliche Soll-Miete" color="green" />
        <KpiCard icon="⏰" value={fmt(offenBetrag)} label="Offene Zahlungen" color={offenBetrag>0?'red':'green'} sub={`${offeneZahlungen.length} ausstehend`} />
        <KpiCard icon="🔧" value={offeneWartung} label="Offene Wartungen" color={offeneWartung>0?'orange':'green'} />
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
          <div style={{ padding:'14px 18px', borderBottom:`1px solid ${C.border}`, fontWeight:600, fontSize:14 }}>Zahlungsstatus April 2026</div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead><tr>{['Mieter','Wohnung','Betrag','Status'].map(h=><th key={h} style={{ padding:'8px 14px', textAlign:'left', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'.5px', color:C.muted, borderBottom:`1px solid ${C.border}` }}>{h}</th>)}</tr></thead>
              <tbody>
                {data.zahlungen.filter(z=>z.faellig>='2026-04-01').map(z=>(
                  <tr key={z.id} style={{ borderBottom:`1px solid ${C.border}` }}>
                    <td style={{ padding:'10px 14px' }}>{getMieterName(z.mieterId)}</td>
                    <td style={{ padding:'10px 14px' }}>{getWohnungNr(z.wohnungId)}</td>
                    <td style={{ padding:'10px 14px', fontWeight:600 }}>{fmt(z.betrag)}</td>
                    <td style={{ padding:'10px 14px' }}><StatusBadge s={z.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Liegenschaften({ data }) {
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <div><div style={{ fontSize:22,fontWeight:700 }}>Liegenschaften</div><div style={{ color:C.muted,fontSize:13,marginTop:2 }}>{data.liegenschaften.length} Objekte</div></div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:16 }}>
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
                <StatusBadge s={l.status} />
              </div>
              <div style={{ padding:18 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
                  {[['Einheiten',l.einheiten],['Baujahr',l.baujahr],['Belegt',`${belegt}/${ws.length}`],['Ist-Miete',fmt(miete)+'/Mo']].map(([label,val])=>(
                    <div key={label}><div style={{ fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.5px',color:C.muted,marginBottom:2 }}>{label}</div><div style={{ fontSize:14 }}>{val}</div></div>
                  ))}
                </div>
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4 }}><span>Belegung</span><span style={{ fontWeight:600 }}>{pct}%</span></div>
                  <div style={{ height:6, background:C.border, borderRadius:3, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${pct}%`, background:C.primary, borderRadius:3 }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TableView({ title, subtitle, columns, rows }) {
  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:22,fontWeight:700 }}>{title}</div>
        {subtitle && <div style={{ color:C.muted,fontSize:13,marginTop:2 }}>{subtitle}</div>}
      </div>
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13.5 }}>
            <thead>
              <tr>{columns.map(c=><th key={c} style={{ padding:'10px 14px', textAlign:'left', fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.5px',color:C.muted,borderBottom:`1px solid ${C.border}`,whiteSpace:'nowrap' }}>{c}</th>)}</tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Wohnungen({ data }) {
  const [q, setQ] = useState('');
  const filtered = data.wohnungen.filter(w =>
    !q || w.nr.toLowerCase().includes(q) || getLiegenschaftName(w.liegenschaftId).toLowerCase().includes(q)
  );
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div><div style={{ fontSize:22,fontWeight:700 }}>Wohnungen</div><div style={{ color:C.muted,fontSize:13,marginTop:2 }}>{data.wohnungen.length} Einheiten · {data.wohnungen.filter(w=>w.status==='leer').length} leer</div></div>
      </div>
      <div style={{ marginBottom:14 }}>
        <input placeholder="Suchen…" value={q} onChange={e=>setQ(e.target.value.toLowerCase())}
          style={{ padding:'9px 14px', border:`1px solid ${C.border}`, borderRadius:8, fontSize:13.5, width:260, outline:'none' }} />
      </div>
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13.5 }}>
            <thead><tr>{['Nr.','Objekt','Typ','Fläche','Stockwerk','Miete','Mieter','Status'].map(h=><th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.5px',color:C.muted,borderBottom:`1px solid ${C.border}` }}>{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map(w=>(
                <tr key={w.id} style={{ borderBottom:`1px solid ${C.border}` }}>
                  <td style={{ padding:'11px 14px',fontWeight:600 }}>{w.nr}</td>
                  <td style={{ padding:'11px 14px' }}>{getLiegenschaftName(w.liegenschaftId)}</td>
                  <td style={{ padding:'11px 14px' }}>{w.typ}</td>
                  <td style={{ padding:'11px 14px' }}>{w.flaeche} m²</td>
                  <td style={{ padding:'11px 14px' }}>{w.stockwerk}</td>
                  <td style={{ padding:'11px 14px',fontWeight:600 }}>{fmt(w.miete)}</td>
                  <td style={{ padding:'11px 14px' }}>{w.mieterId ? getMieterName(w.mieterId) : <span style={{ color:C.muted }}>—</span>}</td>
                  <td style={{ padding:'11px 14px' }}><StatusBadge s={w.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Mieter({ data }) {
  const [q, setQ] = useState('');
  const filtered = data.mieter.filter(m => !q || `${m.vorname} ${m.nachname} ${m.email}`.toLowerCase().includes(q));
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div><div style={{ fontSize:22,fontWeight:700 }}>Mieter</div><div style={{ color:C.muted,fontSize:13,marginTop:2 }}>{data.mieter.length} Personen</div></div>
      </div>
      <div style={{ marginBottom:14 }}>
        <input placeholder="Name oder E-Mail…" value={q} onChange={e=>setQ(e.target.value.toLowerCase())}
          style={{ padding:'9px 14px', border:`1px solid ${C.border}`, borderRadius:8, fontSize:13.5, width:280, outline:'none' }} />
      </div>
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13.5 }}>
            <thead><tr>{['Name','Wohnung','E-Mail','Telefon','Einzug','Status'].map(h=><th key={h} style={{ padding:'10px 14px',textAlign:'left',fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.5px',color:C.muted,borderBottom:`1px solid ${C.border}` }}>{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map(m=>(
                <tr key={m.id} style={{ borderBottom:`1px solid ${C.border}` }}>
                  <td style={{ padding:'11px 14px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:34,height:34,borderRadius:'50%',background:'#dbeafe',color:'#2563eb',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,flexShrink:0 }}>{initials(m.vorname,m.nachname)}</div>
                      <span style={{ fontWeight:500 }}>{m.vorname} {m.nachname}</span>
                    </div>
                  </td>
                  <td style={{ padding:'11px 14px' }}>{m.wohnungId ? getWohnungNr(m.wohnungId) : '—'}</td>
                  <td style={{ padding:'11px 14px' }}><a href={`mailto:${m.email}`} style={{ color:C.primary }}>{m.email}</a></td>
                  <td style={{ padding:'11px 14px' }}>{m.telefon}</td>
                  <td style={{ padding:'11px 14px' }}>{fmtDate(m.einzug)}</td>
                  <td style={{ padding:'11px 14px' }}><StatusBadge s={m.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Zahlungen({ data, setData }) {
  const markBezahlt = (id) => {
    setData(prev => ({
      ...prev,
      zahlungen: prev.zahlungen.map(z => z.id===id ? { ...z, status:'bezahlt', bezahlt:new Date().toISOString().split('T')[0] } : z),
    }));
  };
  const bezahlt = data.zahlungen.filter(z=>z.status==='bezahlt').reduce((s,z)=>s+z.betrag,0);
  const offen = data.zahlungen.filter(z=>z.status==='offen').reduce((s,z)=>s+z.betrag,0);
  const ue = data.zahlungen.filter(z=>z.status==='ueberfaellig').reduce((s,z)=>s+z.betrag,0);

  return (
    <div>
      <div style={{ marginBottom:20 }}><div style={{ fontSize:22,fontWeight:700 }}>Zahlungen</div></div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:20 }}>
        <KpiCard icon="✅" value={fmt(bezahlt)} label="Eingegangen" color="green" />
        <KpiCard icon="🕐" value={fmt(offen)} label="Ausstehend" color="orange" />
        <KpiCard icon="⚠️" value={fmt(ue)} label="Überfällig" color="red" />
      </div>
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13.5 }}>
            <thead><tr>{['Beschreibung','Mieter','Wohnung','Betrag','Fällig','Bezahlt','Status',''].map(h=><th key={h} style={{ padding:'10px 14px',textAlign:'left',fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.5px',color:C.muted,borderBottom:`1px solid ${C.border}` }}>{h}</th>)}</tr></thead>
            <tbody>
              {data.zahlungen.map(z=>(
                <tr key={z.id} style={{ borderBottom:`1px solid ${C.border}` }}>
                  <td style={{ padding:'11px 14px' }}>{z.typ}</td>
                  <td style={{ padding:'11px 14px' }}>{getMieterName(z.mieterId)}</td>
                  <td style={{ padding:'11px 14px' }}>{getWohnungNr(z.wohnungId)}</td>
                  <td style={{ padding:'11px 14px',fontWeight:600 }}>{fmt(z.betrag)}</td>
                  <td style={{ padding:'11px 14px' }}>{fmtDate(z.faellig)}</td>
                  <td style={{ padding:'11px 14px' }}>{fmtDate(z.bezahlt)}</td>
                  <td style={{ padding:'11px 14px' }}><StatusBadge s={z.status} /></td>
                  <td style={{ padding:'11px 14px' }}>
                    {z.status!=='bezahlt' && (
                      <button onClick={()=>markBezahlt(z.id)} style={{ padding:'5px 12px', background:'#dcfce7', color:'#15803d', border:'none', borderRadius:6, fontSize:12, cursor:'pointer', fontWeight:600 }}>
                        ✓ Bezahlt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Wartung({ data, setData }) {
  const updateStatus = (id, status) => {
    setData(prev => ({
      ...prev,
      wartung: prev.wartung.map(w => w.id===id ? { ...w, status } : w),
    }));
  };
  const prioColors = { hoch:['#fee2e2','#dc2626'], mittel:['#ffedd5','#ea580c'], niedrig:['#dcfce7','#16a34a'] };

  return (
    <div>
      <div style={{ marginBottom:20 }}><div style={{ fontSize:22,fontWeight:700 }}>Wartungsanfragen</div><div style={{ color:C.muted,fontSize:13,marginTop:2 }}>{data.wartung.filter(w=>w.status!=='erledigt').length} offen</div></div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:14 }}>
        {data.wartung.map(w => {
          const [prioBg, prioFg] = prioColors[w.prioritaet] || prioColors.mittel;
          return (
            <div key={w.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:18 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                <div style={{ fontWeight:600, fontSize:14 }}>{w.titel}</div>
                <span style={{ fontSize:11, padding:'3px 8px', borderRadius:12, background:prioBg, color:prioFg, flexShrink:0, marginLeft:8 }}>{w.prioritaet}</span>
              </div>
              <div style={{ fontSize:12,color:C.muted,marginBottom:8 }}>{getWohnungNr(w.wohnungId)} · {fmtDate(w.erstellt)}</div>
              <p style={{ fontSize:13, color:'#3a3a3a', lineHeight:1.5, margin:'0 0 12px' }}>{w.beschreibung}</p>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <StatusBadge s={w.status} />
                {w.status!=='erledigt' && (
                  <div style={{ display:'flex', gap:6 }}>
                    {w.status==='neu' && <button onClick={()=>updateStatus(w.id,'in-arbeit')} style={{ padding:'5px 10px',fontSize:12,border:`1px solid ${C.border}`,borderRadius:6,cursor:'pointer',background:'white' }}>In Arbeit</button>}
                    <button onClick={()=>updateStatus(w.id,'erledigt')} style={{ padding:'5px 10px',fontSize:12,background:'#dcfce7',color:'#15803d',border:'none',borderRadius:6,cursor:'pointer',fontWeight:600 }}>✓ Erledigt</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────
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
  const [data, setData] = useState({ ...db });
  const [collapsed, setCollapsed] = useState(false);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const views = { dashboard: <Dashboard data={data} />, liegenschaften: <Liegenschaften data={data} />, wohnungen: <Wohnungen data={data} />, mieter: <Mieter data={data} />, zahlungen: <Zahlungen data={data} setData={setData} />, wartung: <Wartung data={data} setData={setData} /> };

  return (
    <>
      <Head><title>Admin – FHV Hausverwaltung</title></Head>
      <div style={{ display:'flex', minHeight:'100vh', background:C.bg, color:C.text, fontSize:14 }}>

        {/* Sidebar */}
        <aside style={{ width:collapsed?68:220, flexShrink:0, background:C.sidebar, display:'flex', flexDirection:'column', transition:'width .2s', overflow:'hidden', position:'sticky', top:0, height:'100vh' }}>
          <div style={{ padding:'18px 14px', borderBottom:'1px solid #1e293b', display:'flex', alignItems:'center', justifyContent:'space-between', minHeight:60 }}>
            {!collapsed && <span style={{ color:'#f1f5f9', fontWeight:700, fontSize:15, whiteSpace:'nowrap' }}>FHV Admin</span>}
            <button onClick={()=>setCollapsed(!collapsed)} style={{ background:'none', border:'none', color:'#94a3b8', cursor:'pointer', fontSize:18, padding:4, marginLeft: collapsed?'auto':0 }}>☰</button>
          </div>
          <nav style={{ flex:1, padding:'10px 0', overflowY:'auto' }}>
            {NAV.map(n => (
              <button key={n.id} onClick={()=>setView(n.id)}
                style={{ display:'flex', alignItems:'center', gap:10, width:'calc(100% - 16px)', margin:'2px 8px', padding:'10px 12px', borderRadius:8, border:'none', cursor:'pointer', transition:'all .15s', whiteSpace:'nowrap',
                  background:view===n.id?'#2563eb':'transparent', color:view===n.id?'#fff':'#94a3b8', textAlign:'left', fontSize:13.5 }}>
                <span style={{ fontSize:16, flexShrink:0 }}>{n.icon}</span>
                {!collapsed && <span>{n.label}</span>}
              </button>
            ))}
          </nav>
          <div style={{ padding:'12px 8px', borderTop:'1px solid #1e293b' }}>
            <button onClick={()=>router.push('/')}
              style={{ display:'flex', alignItems:'center', gap:10, width:'100%', padding:'9px 12px', borderRadius:8, border:'none', cursor:'pointer', background:'transparent', color:'#94a3b8', fontSize:13, whiteSpace:'nowrap', marginBottom:6 }}>
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
