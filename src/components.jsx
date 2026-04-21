// Shared UI pieces — nav, footer, price calculator, service cards,
// testimonials, stats, CTA. Accepts `theme` + `type` from the parent.

// ───────────── Nav ─────────────
function FhvNav({ theme, variant = 'a' }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const root = document.querySelector(`[data-fhv-root="${variant}"]`);
    if (!root) return;
    const onScroll = () => setScrolled(root.scrollTop > 20);
    root.addEventListener('scroll', onScroll);
    return () => root.removeEventListener('scroll', onScroll);
  }, [variant]);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      padding: scrolled ? '14px 48px' : '22px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? `${theme.bg}ee` : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? `1px solid ${theme.rule}` : '1px solid transparent',
      transition: 'all .3s ease',
    }}>
      <a href="#" style={{ textDecoration: 'none', color: theme.ink, display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>FHV</span>
        <span style={{ fontSize: 12, color: theme.muted, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Freiburger Hausverwaltung
        </span>
      </a>
      <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {FHV_CONTENT.nav.map((item) => (
          <a key={item.href} href={item.href}
            style={{ fontSize: 14, color: theme.inkSoft, textDecoration: 'none', transition: 'color .15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = theme.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme.inkSoft)}>
            {item.label}
          </a>
        ))}
        <a href="#kontakt" style={{
          fontSize: 14, padding: '10px 18px',
          background: theme.primary, color: theme.bg,
          textDecoration: 'none', borderRadius: 2,
          transition: 'opacity .15s',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
          Termin
        </a>
      </nav>
    </header>
  );
}

// ───────────── Stats row ─────────────
function FhvStats({ theme, type }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      borderTop: `1px solid ${theme.rule}`, borderBottom: `1px solid ${theme.rule}`,
    }}>
      {FHV_CONTENT.stats.map((s, i) => (
        <div key={i} style={{
          padding: '28px 32px',
          borderRight: i < 3 ? `1px solid ${theme.rule}` : 'none',
        }}>
          <div style={{
            fontFamily: type.display, fontSize: 44, fontWeight: type.displayWeight,
            letterSpacing: type.displayTracking, color: theme.primary, lineHeight: 1,
          }}>{s.n}</div>
          <div style={{ fontSize: 13, color: theme.muted, marginTop: 10, letterSpacing: '0.02em' }}>
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}

// ───────────── Service card ─────────────
function ServiceCard({ service, theme, type, expanded, onHover }) {
  const [hovered, setHovered] = React.useState(false);
  const active = hovered || expanded;
  return (
    <div
      onMouseEnter={() => { setHovered(true); onHover && onHover(service.id); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '36px 32px 32px',
        background: active ? theme.surface : 'transparent',
        border: `1px solid ${active ? theme.primary : theme.rule}`,
        transition: 'all .35s cubic-bezier(.2,.7,.3,1)',
        cursor: 'pointer',
        overflow: 'hidden',
      }}>
      {/* sliding accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: theme.primary,
        transform: active ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform .5s cubic-bezier(.2,.7,.3,1)',
      }} />
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontFamily: type.mono, fontSize: 11, color: theme.muted, letterSpacing: '0.1em' }}>
          {service.num} / 03
        </span>
        <div style={{
          opacity: active ? 1 : 0.3,
          transform: active ? 'translateX(0)' : 'translateX(-6px)',
          transition: 'all .35s',
          color: theme.primary,
        }}>
          <ArchMark size={36} color={theme.primary} strokeWidth={1.2} />
        </div>
      </div>
      <h3 style={{
        fontFamily: type.display, fontSize: 30, fontWeight: type.displayWeight,
        letterSpacing: type.displayTracking, color: theme.ink, margin: '0 0 14px',
      }}>{service.title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: theme.inkSoft, margin: '0 0 24px' }}>
        {service.lede}
      </p>
      <div style={{
        maxHeight: active ? 420 : 0,
        opacity: active ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height .5s cubic-bezier(.2,.7,.3,1), opacity .3s',
      }}>
        {service.groups.map((g, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 11, color: theme.muted, letterSpacing: '0.14em',
              textTransform: 'uppercase', marginBottom: 6, fontWeight: 600,
            }}>{g.label}</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {g.items.map((it, j) => (
                <li key={j} style={{
                  fontSize: 14, lineHeight: 1.6, color: theme.inkSoft,
                  paddingLeft: 14, position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute', left: 0, top: 10, width: 6, height: 1,
                    background: theme.accent,
                  }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: active ? 8 : 0,
        paddingTop: 18,
        borderTop: `1px solid ${theme.rule}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <span style={{ fontFamily: type.mono, fontSize: 11, color: theme.muted, letterSpacing: '0.08em' }}>
          {service.price.from ? 'AB' : 'PREIS'}
        </span>
        <span style={{ fontSize: 15, color: theme.ink, fontWeight: 500 }}>
          {service.price.from ? (
            <>
              <span style={{ fontFamily: type.display, fontSize: 22, fontWeight: type.displayWeight }}>
                {service.price.from} €
              </span>
              <span style={{ color: theme.muted, fontSize: 13 }}> / Einheit · Monat</span>
            </>
          ) : service.price.unit}
        </span>
      </div>
    </div>
  );
}

// ───────────── Price calculator ─────────────
function PriceCalculator({ theme, type }) {
  const [units, setUnits] = React.useState(12);
  const [mode, setMode] = React.useState('miet');
  const rate = mode === 'miet' ? 30 : 25;
  const monthly = units * rate;
  const yearly = monthly * 12;

  return (
    <div style={{
      border: `1px solid ${theme.rule}`, background: theme.surface,
      padding: '40px 44px',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: type.mono, fontSize: 11, color: theme.muted, letterSpacing: '0.14em' }}>
            RICHTWERT — UNVERBINDLICH
          </div>
          <h3 style={{
            fontFamily: type.display, fontSize: 28, fontWeight: type.displayWeight,
            letterSpacing: type.displayTracking, margin: '6px 0 0', color: theme.ink,
          }}>
            Preis schätzen
          </h3>
        </div>
        <div style={{ display: 'flex', border: `1px solid ${theme.rule}` }}>
          {[{ k: 'miet', l: 'Mietverwaltung' }, { k: 'weg', l: 'WEG-Verwaltung' }].map((b) => (
            <button key={b.k} onClick={() => setMode(b.k)}
              style={{
                padding: '10px 18px', fontSize: 13,
                background: mode === b.k ? theme.primary : 'transparent',
                color: mode === b.k ? theme.bg : theme.inkSoft,
                border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all .15s',
              }}>{b.l}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 48, alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: 13, color: theme.muted, letterSpacing: '0.02em', display: 'block', marginBottom: 14 }}>
            Wie viele Einheiten?
          </label>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18 }}>
            <span style={{
              fontFamily: type.display, fontSize: 64, fontWeight: type.displayWeight,
              letterSpacing: type.displayTracking, color: theme.primary, lineHeight: 1,
            }}>{units}</span>
            <span style={{ color: theme.muted, fontSize: 15 }}>
              {units === 1 ? 'Einheit' : 'Einheiten'}
            </span>
          </div>
          <input type="range" min="1" max="80" value={units}
            onChange={(e) => setUnits(+e.target.value)}
            style={{ width: '100%', accentColor: theme.primary, cursor: 'pointer' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: type.mono, fontSize: 11, color: theme.muted, marginTop: 6 }}>
            <span>1</span><span>20</span><span>40</span><span>60</span><span>80</span>
          </div>
        </div>

        <div style={{
          background: theme.bg, padding: '24px 28px',
          border: `1px solid ${theme.rule}`,
        }}>
          <div style={{ fontSize: 12, color: theme.muted, letterSpacing: '0.12em', marginBottom: 8 }}>
            PRO MONAT
          </div>
          <div style={{
            fontFamily: type.display, fontSize: 40, fontWeight: type.displayWeight,
            letterSpacing: type.displayTracking, color: theme.ink, lineHeight: 1,
          }}>
            {monthly.toLocaleString('de-DE')} €
          </div>
          <div style={{ height: 1, background: theme.rule, margin: '18px 0' }} />
          <div style={{ fontSize: 12, color: theme.muted, letterSpacing: '0.12em', marginBottom: 6 }}>
            PRO JAHR
          </div>
          <div style={{ fontSize: 20, color: theme.inkSoft, fontFamily: type.display, fontWeight: type.displayWeight }}>
            ≈ {yearly.toLocaleString('de-DE')} €
          </div>
          <div style={{ marginTop: 18, fontSize: 12, color: theme.muted, lineHeight: 1.5 }}>
            Richtpreis {rate} € / Einheit · Monat. Individuelles Angebot nach Objektbesichtigung.
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────── Testimonials ─────────────
function Testimonials({ theme, type }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
      {FHV_CONTENT.testimonials.map((t, i) => (
        <figure key={i} style={{
          margin: 0, padding: '32px 28px',
          background: theme.surface, border: `1px solid ${theme.rule}`,
          display: 'flex', flexDirection: 'column',
        }}>
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none" style={{ marginBottom: 18 }}>
            <path d="M0 20V10Q0 2 8 0V4Q4 5 4 10H8V20H0ZM14 20V10Q14 2 22 0V4Q18 5 18 10H22V20H14Z"
              fill={theme.accent} />
          </svg>
          <blockquote style={{
            margin: 0, fontFamily: type.display, fontSize: 19,
            lineHeight: 1.5, color: theme.ink, flex: 1,
            fontWeight: 400, letterSpacing: type.displayTracking,
          }}>
            „{t.quote}"
          </blockquote>
          <figcaption style={{
            marginTop: 22, paddingTop: 16, borderTop: `1px solid ${theme.rule}`,
            fontSize: 13, color: theme.inkSoft,
          }}>
            <div style={{ fontWeight: 600 }}>{t.author}</div>
            <div style={{ color: theme.muted, marginTop: 2 }}>{t.role}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

// ───────────── Team ─────────────
function TeamRow({ theme, type }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
      {FHV_CONTENT.team.map((p, i) => (
        <div key={i}>
          {/* portrait placeholder — striped SVG */}
          <div style={{
            aspectRatio: '3 / 4', background: theme.primarySoft,
            position: 'relative', overflow: 'hidden',
            marginBottom: 18, border: `1px solid ${theme.rule}`,
          }}>
            <svg viewBox="0 0 120 160" width="100%" height="100%" style={{ display: 'block' }}>
              <defs>
                <pattern id={`stripe-${i}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="6" stroke={theme.primary} strokeWidth="0.8" opacity="0.25" />
                </pattern>
              </defs>
              <rect width="120" height="160" fill={`url(#stripe-${i})`} />
              {/* abstract figure */}
              <circle cx="60" cy="62" r="18" fill={theme.primary} opacity="0.4" />
              <path d="M24 160 Q24 110 60 104 Q96 110 96 160 Z" fill={theme.primary} opacity="0.4" />
              <text x="8" y="152" fontSize="9" fontFamily="ui-monospace, monospace" fill={theme.muted}>
                PORTRAIT
              </text>
            </svg>
          </div>
          <div style={{ fontSize: 11, color: theme.muted, letterSpacing: '0.14em', marginBottom: 4 }}>
            {p.role.toUpperCase()}
          </div>
          <h4 style={{
            fontFamily: type.display, fontSize: 22, fontWeight: type.displayWeight,
            letterSpacing: type.displayTracking, color: theme.ink, margin: '0 0 8px',
          }}>{p.name}</h4>
          <p style={{ fontSize: 14, color: theme.inkSoft, lineHeight: 1.55, margin: 0 }}>{p.bio}</p>
        </div>
      ))}
    </div>
  );
}

// ───────────── Why us ─────────────
function WhyUs({ theme, type }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }}>
      {FHV_CONTENT.why.map((w, i) => (
        <div key={i} style={{
          padding: '32px 36px 32px 0',
          borderBottom: i < 2 ? `1px solid ${theme.rule}` : 'none',
          paddingLeft: i % 2 === 1 ? 36 : 0,
          borderLeft: i % 2 === 1 ? `1px solid ${theme.rule}` : 'none',
        }}>
          <div style={{
            fontFamily: 'inherit', fontSize: 12, color: theme.primary,
            letterSpacing: '0.14em', marginBottom: 12, fontWeight: 600,
          }}>
            {String(i + 1).padStart(2, '0')}
          </div>
          <h4 style={{
            fontFamily: type.display, fontSize: 24, fontWeight: type.displayWeight,
            letterSpacing: type.displayTracking, color: theme.ink, margin: '0 0 10px',
          }}>{w.title}</h4>
          <p style={{ fontSize: 15, color: theme.inkSoft, lineHeight: 1.6, margin: 0 }}>{w.body}</p>
        </div>
      ))}
    </div>
  );
}

// ───────────── CTA + Contact ─────────────
function ContactBlock({ theme, type }) {
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', topic: 'weg', msg: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const c = FHV_CONTENT.contactAddress;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
      <div>
        <div style={{ fontFamily: type.mono, fontSize: 11, color: theme.muted, letterSpacing: '0.16em', marginBottom: 16 }}>
          KONTAKT
        </div>
        <h2 style={{
          fontFamily: type.display, fontSize: 56, fontWeight: type.displayWeight,
          letterSpacing: type.displayTracking, color: theme.ink, margin: '0 0 24px', lineHeight: 1.05,
        }}>
          Lernen wir uns<br/>kennen.
        </h2>
        <p style={{ fontSize: 17, color: theme.inkSoft, lineHeight: 1.55, maxWidth: 420, marginBottom: 32 }}>
          Ein erstes, unverbindliches Gespräch zeigt am schnellsten, ob wir zueinander passen. Wir kommen gern zu Ihrem Objekt.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { l: 'BÜRO', v: `${c.line1}\n${c.line2}` },
            { l: 'TELEFON', v: c.phone },
            { l: 'E-MAIL', v: c.email },
            { l: 'ÖFFNUNGSZEITEN', v: c.hours },
          ].map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'start', paddingTop: 14, borderTop: `1px solid ${theme.rule}` }}>
              <span style={{ fontFamily: type.mono, fontSize: 11, color: theme.muted, letterSpacing: '0.12em' }}>
                {r.l}
              </span>
              <span style={{ fontSize: 15, color: theme.ink, whiteSpace: 'pre-line', lineHeight: 1.5 }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        style={{ background: theme.surface, border: `1px solid ${theme.rule}`, padding: 36 }}>
        {submitted ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <div style={{ fontFamily: type.display, fontSize: 28, color: theme.ink, marginBottom: 12, letterSpacing: type.displayTracking }}>
              Vielen Dank.
            </div>
            <div style={{ fontSize: 15, color: theme.inkSoft }}>
              Wir melden uns innerhalb von 24 Stunden.
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: type.mono, fontSize: 11, color: theme.muted, letterSpacing: '0.14em', marginBottom: 20 }}>
              TERMIN ANFRAGEN
            </div>
            <FormField label="Name" value={form.name} theme={theme} type={type}
              onChange={(v) => setForm({ ...form, name: v })} required />
            <FormField label="E-Mail" value={form.email} theme={theme} type={type}
              onChange={(v) => setForm({ ...form, email: v })} inputType="email" required />
            <FormField label="Telefon (optional)" value={form.phone} theme={theme} type={type}
              onChange={(v) => setForm({ ...form, phone: v })} />

            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, color: theme.muted, letterSpacing: '0.14em', display: 'block', marginBottom: 8 }}>
                THEMA
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[{ k: 'weg', l: 'WEG' }, { k: 'miet', l: 'Miete' }, { k: 'buch', l: 'Buchhaltung' }, { k: 'andere', l: 'Anderes' }].map((o) => (
                  <button type="button" key={o.k} onClick={() => setForm({ ...form, topic: o.k })}
                    style={{
                      padding: '8px 14px', fontSize: 13, cursor: 'pointer',
                      border: `1px solid ${form.topic === o.k ? theme.primary : theme.rule}`,
                      background: form.topic === o.k ? theme.primary : 'transparent',
                      color: form.topic === o.k ? theme.bg : theme.inkSoft,
                      fontFamily: 'inherit',
                    }}>{o.l}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, color: theme.muted, letterSpacing: '0.14em', display: 'block', marginBottom: 8 }}>
                NACHRICHT
              </label>
              <textarea value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })}
                rows={4}
                placeholder="Anzahl Einheiten, aktuelle Verwaltung, Wunschtermin…"
                style={{
                  width: '100%', padding: 12, fontSize: 14, color: theme.ink,
                  background: theme.bg, border: `1px solid ${theme.rule}`,
                  fontFamily: 'inherit', resize: 'vertical', outline: 'none',
                  boxSizing: 'border-box',
                }} />
            </div>

            <button type="submit" style={{
              width: '100%', padding: '16px', fontSize: 15,
              background: theme.primary, color: theme.bg,
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              letterSpacing: '0.02em', fontWeight: 500,
              transition: 'opacity .15s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
              Termin anfragen →
            </button>
            <div style={{ fontSize: 12, color: theme.muted, marginTop: 12, textAlign: 'center' }}>
              Antwort innerhalb 24 Stunden · DSGVO-konform
            </div>
          </>
        )}
      </form>
    </div>
  );
}

function FormField({ label, value, onChange, theme, type, inputType = 'text', required }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 11, color: theme.muted, letterSpacing: '0.14em', display: 'block', marginBottom: 6 }}>
        {label.toUpperCase()}{required && ' *'}
      </label>
      <input type={inputType} value={value} required={required}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', padding: '12px 0', fontSize: 15, color: theme.ink,
          background: 'transparent', border: 'none',
          borderBottom: `1px solid ${theme.rule}`,
          fontFamily: 'inherit', outline: 'none',
          boxSizing: 'border-box', transition: 'border-color .15s',
        }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = theme.primary)}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = theme.rule)} />
    </div>
  );
}

// ───────────── Footer ─────────────
function FhvFooter({ theme, type }) {
  return (
    <footer style={{
      borderTop: `1px solid ${theme.rule}`, marginTop: 0,
      padding: '56px 48px 36px',
      background: theme.surface,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
            <span style={{
              fontFamily: type.display, fontSize: 26, fontWeight: type.displayWeight,
              letterSpacing: type.displayTracking, color: theme.ink,
            }}>FHV</span>
            <span style={{ fontSize: 12, color: theme.muted, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Freiburger Hausverwaltung
            </span>
          </div>
          <p style={{ fontSize: 14, color: theme.inkSoft, lineHeight: 1.6, maxWidth: 320, margin: 0 }}>
            Moderne Hausverwaltung im Breisgau. Persönlich erreichbar, digital organisiert, regional verwurzelt.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
            {FHV_CONTENT.certs.map((c) => (
              <span key={c} style={{
                fontSize: 11, padding: '6px 10px', border: `1px solid ${theme.rule}`,
                color: theme.muted, letterSpacing: '0.04em',
              }}>{c}</span>
            ))}
          </div>
        </div>
        {[
          { h: 'Leistungen', items: ['Mietverwaltung', 'WEG-Verwaltung', 'Buchhaltung'] },
          { h: 'Unternehmen', items: ['Über uns', 'Team', 'Karriere', 'Impressum'] },
          { h: 'Kontakt', items: [FHV_CONTENT.contactAddress.line1, FHV_CONTENT.contactAddress.line2, FHV_CONTENT.contactAddress.phone] },
        ].map((col, i) => (
          <div key={i}>
            <div style={{ fontFamily: type.mono, fontSize: 11, color: theme.muted, letterSpacing: '0.14em', marginBottom: 14 }}>
              {col.h.toUpperCase()}
            </div>
            {col.items.map((it, j) => (
              <div key={j} style={{ fontSize: 14, color: theme.inkSoft, marginBottom: 8 }}>{it}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        borderTop: `1px solid ${theme.rule}`, paddingTop: 24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 12, color: theme.muted,
      }}>
        <span>© 2026 FHV Freiburger Hausverwaltung OHG</span>
        <span style={{ display: 'flex', gap: 20 }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Datenschutz</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Impressum</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>AGB</a>
        </span>
      </div>
    </footer>
  );
}

Object.assign(window, {
  FhvNav, FhvStats, ServiceCard, PriceCalculator,
  Testimonials, TeamRow, WhyUs, ContactBlock, FhvFooter,
});
