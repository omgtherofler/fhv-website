import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { theme as T, type as TY } from '../lib/tokens';
import { content as C } from '../lib/content';

// ─── SVG Shapes ───────────────────────────────────────────────

function ArchMark({ size = 80, color = 'currentColor', strokeWidth = 1.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M10 70 L10 36 Q10 10 40 10 Q70 10 70 36 L70 70" />
      <path d="M20 70 L20 42 Q20 20 40 20 Q60 20 60 42 L60 70" opacity="0.55" />
      <path d="M30 70 L30 48 Q30 30 40 30 Q50 30 50 48 L50 70" opacity="0.3" />
    </svg>
  );
}

function SpireMark({ size = 120, color = 'currentColor', strokeWidth = 1.2 }) {
  const w = Math.round(size * 3.2);
  return (
    <svg width={w} height={size} viewBox="0 0 640 200" fill="none" stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="square" strokeLinejoin="miter" style={{ display: 'block' }}>
      <g opacity="0.55">
        <path d="M10 200 L10 120 L30 120 L30 112 L40 112 L40 104 L50 104 L50 96 L60 96 L60 104 L70 104 L70 112 L80 112 L80 120 L100 120 L100 200" />
        <rect x="18" y="140" width="10" height="14" /><rect x="40" y="140" width="10" height="14" /><rect x="62" y="140" width="10" height="14" />
        <rect x="18" y="170" width="10" height="14" /><rect x="40" y="170" width="10" height="14" /><rect x="62" y="170" width="10" height="14" />
        <path d="M72 96 L72 84 L78 84 L78 96" />
      </g>
      <g opacity="0.7">
        <path d="M100 200 L100 130 L140 100 L180 130 L180 200" />
        <rect x="114" y="140" width="12" height="16" /><rect x="134" y="140" width="12" height="16" /><rect x="154" y="140" width="12" height="16" />
        <rect x="114" y="166" width="12" height="16" /><rect x="134" y="166" width="12" height="16" /><rect x="154" y="166" width="12" height="16" />
        <path d="M128 118 L128 110 L140 104 L152 110 L152 118" opacity="0.8" />
        <rect x="134" y="112" width="12" height="6" />
      </g>
      <g>
        <path d="M320 6 L320 18 M314 12 L326 12" />
        <path d="M318 18 L322 18 L322 26 L318 26 Z" />
        <path d="M310 26 L330 26 L330 44 L310 44 Z" />
        <path d="M313 26 L313 44 M317 26 L317 44 M323 26 L323 44 M327 26 L327 44" opacity="0.5" />
        <path d="M310 32 L330 32 M310 38 L330 38" opacity="0.5" />
        <path d="M304 44 L336 44 L340 64 L300 64 Z" />
        <path d="M308 44 L308 64 M314 44 L314 64 M320 44 L320 64 M326 44 L326 64 M332 44 L332 64" opacity="0.45" />
        <path d="M302 54 L338 54" opacity="0.4" />
        <path d="M296 64 L344 64 L344 108 L296 108 Z" />
        <path d="M306 64 L306 108 M320 64 L320 108 M334 64 L334 108" opacity="0.4" />
        <path d="M300 82 Q300 74 304 74 Q308 74 308 82 L308 98 L300 98 Z" opacity="0.6" />
        <path d="M314 82 Q314 74 320 74 Q326 74 326 82 L326 98 L314 98 Z" opacity="0.6" />
        <path d="M332 82 Q332 74 336 74 Q340 74 340 82 L340 98 L332 98 Z" opacity="0.6" />
        <path d="M288 108 L352 108 L352 148 L288 148 Z" />
        <circle cx="320" cy="126" r="7" />
        <path d="M320 122 L320 126 L323 128" opacity="0.7" />
        <path d="M260 148 L380 148 L380 200" /><path d="M260 148 L260 200" />
        <path d="M268 148 L268 164 L272 164 L272 158 L276 158 L276 200" opacity="0.5" />
        <path d="M372 148 L372 164 L368 164 L368 158 L364 158 L364 200" opacity="0.5" />
        <circle cx="320" cy="168" r="8" opacity="0.6" />
        <path d="M320 160 L320 176 M312 168 L328 168 M314 162 L326 174 M326 162 L314 174" opacity="0.4" />
        <path d="M288 180 Q288 172 294 172 Q300 172 300 180 L300 200" opacity="0.5" />
        <path d="M340 180 Q340 172 346 172 Q352 172 352 180 L352 200" opacity="0.5" />
      </g>
      <g opacity="0.7">
        <path d="M430 200 L430 130 L445 115 L475 115 L490 130 L490 200" />
        <path d="M445 115 L460 100 L475 115" />
        <path d="M434 130 L434 126 L440 126 L440 130 M446 130 L446 126 L452 126 L452 130 M458 130 L458 126 L464 126 L464 130 M470 130 L470 126 L476 126 L476 130 M482 130 L482 126 L488 126 L488 130" opacity="0.5" />
        <path d="M448 200 L448 172 Q448 160 460 160 Q472 160 472 172 L472 200" />
        <rect x="438" y="140" width="8" height="10" /><rect x="474" y="140" width="8" height="10" />
        <circle cx="460" cy="146" r="5" opacity="0.7" />
      </g>
      <g opacity="0.55">
        <path d="M490 200 L490 150 L510 130 L530 150 L530 200" />
        <path d="M530 200 L530 160 L545 148 L560 160 L560 200" />
        <path d="M560 200 L560 155 L580 138 L600 155 L600 200" />
        <path d="M600 200 L600 165 L615 152 L630 165 L630 200" />
        <rect x="500" y="165" width="7" height="10" /><rect x="513" y="165" width="7" height="10" />
        <rect x="500" y="182" width="7" height="10" /><rect x="513" y="182" width="7" height="10" />
        <rect x="538" y="172" width="7" height="9" /><rect x="549" y="172" width="7" height="9" />
        <rect x="568" y="170" width="8" height="10" /><rect x="583" y="170" width="8" height="10" />
        <rect x="568" y="186" width="8" height="10" /><rect x="583" y="186" width="8" height="10" />
        <rect x="606" y="175" width="7" height="9" /><rect x="617" y="175" width="7" height="9" />
        <path d="M520 130 L520 118 L526 118 L526 130" />
        <path d="M608 155 L608 144 L614 144 L614 155" />
      </g>
      <path d="M0 200 L640 200" opacity="0.35" />
    </svg>
  );
}

function RegionalMap() {
  const places = [
    { id: 'freiburg', name: 'Freiburg', x: 180, y: 240, main: true },
    { id: 'emmendingen', name: 'Emmendingen', x: 200, y: 160 },
    { id: 'kaiserstuhl', name: 'Kaiserstuhl', x: 80, y: 200 },
    { id: 'markgraeflerland', name: 'Markgräflerland', x: 150, y: 340 },
    { id: 'schwarzwald', name: 'Schwarzwald', x: 310, y: 220 },
    { id: 'titisee', name: 'Titisee', x: 340, y: 290 },
  ];
  return (
    <svg viewBox="0 0 440 420" width="100%" height="100%">
      <path d="M60 40 Q50 140 70 220 Q90 310 50 400" fill="none" stroke={T.accent} strokeWidth="2" opacity="0.4" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${240 + i * 8} ${100 + i * 6} Q${340 - i * 4} ${180 + i * 8} ${300 + i * 6} ${360 - i * 10}`}
          fill="none" stroke={T.ink} strokeWidth="0.8" opacity={0.08 + i * 0.04} />
      ))}
      <g opacity="0.35">
        <circle cx="80" cy="200" r="30" fill="none" stroke={T.warm} strokeWidth="1" />
        <circle cx="90" cy="210" r="20" fill="none" stroke={T.warm} strokeWidth="1" />
        <circle cx="70" cy="195" r="14" fill="none" stroke={T.warm} strokeWidth="1" />
      </g>
      {places.map((p) => (
        <g key={p.id}>
          <circle cx={p.x} cy={p.y} r={p.main ? 7 : 3.5}
            fill={p.main ? T.primary : 'transparent'}
            stroke={T.primary} strokeWidth={p.main ? 2 : 1.2} />
          {p.main && (
            <circle cx={p.x} cy={p.y} r="14" fill="none" stroke={T.primary} strokeWidth="1" opacity="0.35">
              <animate attributeName="r" values="10;20;10" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
          )}
          <text x={p.x + (p.main ? 14 : 8)} y={p.y + 4}
            fontSize={p.main ? 14 : 11} fontWeight={p.main ? 600 : 400}
            fill={T.ink} fontFamily={TY.body} letterSpacing="0.01em">
            {p.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── Nav ───────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? '14px 48px' : '22px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? `${T.bg}ee` : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? `1px solid ${T.rule}` : '1px solid transparent',
      transition: 'all .3s ease',
    }}>
      <a href="#" style={{ textDecoration: 'none', color: T.ink, display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontFamily: TY.display, fontSize: 22, fontWeight: TY.displayWeight, letterSpacing: TY.displayTracking }}>FHV</span>
        <span style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Freiburger Hausverwaltung
        </span>
      </a>

      {/* Desktop nav */}
      <nav style={{ display: 'flex', gap: 28, alignItems: 'center', '@media (max-width: 768px)': { display: 'none' } }}
        className="desktop-nav">
        {C.nav.map((item) => (
          <a key={item.href} href={item.href}
            style={{ fontFamily: TY.body, fontSize: 14, color: T.inkSoft, textDecoration: 'none', transition: 'color .15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.inkSoft)}>
            {item.label}
          </a>
        ))}
        <a href="#kontakt" style={{
          fontFamily: TY.body, fontSize: 14, padding: '10px 18px',
          background: T.primary, color: T.bg,
          textDecoration: 'none', transition: 'opacity .15s',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
          Termin
        </a>
      </nav>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: T.ink }}
        className="mobile-menu-btn">
        <svg width="22" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {menuOpen ? (
            <><path d="M2 2L20 14M2 14L20 2"/></>
          ) : (
            <><path d="M0 2h22M0 8h22M0 14h22"/></>
          )}
        </svg>
      </button>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: T.bg, zIndex: 100,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 32,
        }}>
          <button onClick={() => setMenuOpen(false)}
            style={{ position: 'absolute', top: 22, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: T.ink }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 2L20 20M2 20L20 2"/>
            </svg>
          </button>
          {C.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: TY.display, fontSize: 32, fontWeight: TY.displayWeight, color: T.ink, textDecoration: 'none', letterSpacing: TY.displayTracking }}>
              {item.label}
            </a>
          ))}
          <a href="#kontakt" onClick={() => setMenuOpen(false)}
            style={{ marginTop: 16, fontFamily: TY.body, fontSize: 16, padding: '16px 36px', background: T.primary, color: T.bg, textDecoration: 'none' }}>
            Termin vereinbaren →
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────

function Hero() {
  const h = C.hero;
  return (
    <section style={{
      position: 'relative',
      padding: 'clamp(120px, 15vw, 180px) 48px clamp(180px, 22vw, 280px)',
      overflow: 'hidden',
      minHeight: '85vh',
      display: 'flex', alignItems: 'flex-start',
    }}>
      {/* Freiburg skyline */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        color: T.primary, opacity: 0.15, pointerEvents: 'none',
        display: 'flex', justifyContent: 'center',
      }}>
        <SpireMark size={340} color="currentColor" strokeWidth={1.2} />
      </div>
      {/* Fade overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(180deg, ${T.bg} 10%, ${T.bg}00 55%, ${T.bg}aa 100%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: 1100, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 48, color: T.primary }}>
          <span style={{ width: 40, height: 1, background: T.primary, flexShrink: 0 }} />
          <span style={{ fontFamily: TY.mono, fontSize: 12, letterSpacing: '0.16em' }}>
            {h.kicker.toUpperCase()}
          </span>
        </div>

        <h1 style={{
          fontFamily: TY.display,
          fontSize: 'clamp(52px, 9vw, 120px)',
          fontWeight: TY.displayWeight,
          letterSpacing: TY.displayTracking,
          lineHeight: 0.95,
          color: T.ink,
          margin: '0 0 40px',
        }}>
          <span style={{ display: 'block' }}>{h.headline[0]}</span>
          <em style={{ display: 'block', fontStyle: 'italic', color: T.primary }}>{h.headline[1]}</em>
        </h1>

        <p style={{ fontFamily: TY.body, fontSize: 20, lineHeight: 1.6, color: T.inkSoft, margin: '0 0 40px', maxWidth: 560 }}>
          {h.lede}
        </p>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={h.primary.href} style={{
            fontFamily: TY.body, padding: '18px 32px', fontSize: 15,
            background: T.primary, color: T.bg,
            textDecoration: 'none', letterSpacing: '0.02em', fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 10,
            transition: 'opacity .15s',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
            {h.primary.label} <span>→</span>
          </a>
          <a href={h.secondary.href} style={{
            fontFamily: TY.body, padding: '18px 0', fontSize: 15,
            color: T.ink, textDecoration: 'none', letterSpacing: '0.02em', fontWeight: 500,
            borderBottom: `1px solid ${T.ink}`,
          }}>
            {h.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────

function Stats() {
  return (
    <section style={{ borderTop: `1px solid ${T.rule}`, borderBottom: `1px solid ${T.rule}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {C.stats.map((s, i) => (
            <div key={i} style={{
              padding: '28px 32px',
              borderRight: i < 3 ? `1px solid ${T.rule}` : 'none',
            }}>
              <div style={{
                fontFamily: TY.display, fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: TY.displayWeight, letterSpacing: TY.displayTracking,
                color: T.primary, lineHeight: 1,
              }}>{s.n}</div>
              <div style={{ fontFamily: TY.body, fontSize: 13, color: T.muted, marginTop: 10, letterSpacing: '0.02em' }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section Header ───────────────────────────────────────────

function SectionHeader({ eyebrow, title, lede }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: lede ? '1.1fr 1fr' : '1fr',
      gap: 64, alignItems: 'end',
    }}>
      <div>
        <div style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.16em', marginBottom: 16 }}>
          {eyebrow.toUpperCase()}
        </div>
        <h2 style={{
          fontFamily: TY.display,
          fontSize: 'clamp(40px, 5.5vw, 72px)',
          fontWeight: TY.displayWeight,
          letterSpacing: TY.displayTracking,
          lineHeight: 1.02, color: T.ink, margin: 0,
        }}>{title}</h2>
      </div>
      {lede && (
        <p style={{ fontFamily: TY.body, fontSize: 17, lineHeight: 1.55, color: T.inkSoft, margin: 0, maxWidth: 440, paddingBottom: 8 }}>
          {lede}
        </p>
      )}
    </div>
  );
}

// ─── Services ─────────────────────────────────────────────────

function ServiceCard({ service, expanded, onHover }) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || expanded;

  return (
    <div
      onMouseEnter={() => { setHovered(true); onHover(service.id); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', padding: '36px 32px 32px',
        background: active ? T.surface : 'transparent',
        border: `1px solid ${active ? T.primary : T.rule}`,
        transition: 'all .35s cubic-bezier(.2,.7,.3,1)',
        cursor: 'default', overflow: 'hidden',
      }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: T.primary,
        transform: active ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform .5s cubic-bezier(.2,.7,.3,1)',
      }} />
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.1em' }}>
          {service.num} / 03
        </span>
        <div style={{
          opacity: active ? 1 : 0.3,
          transform: active ? 'translateX(0)' : 'translateX(-6px)',
          transition: 'all .35s', color: T.primary,
        }}>
          <ArchMark size={36} color={T.primary} strokeWidth={1.2} />
        </div>
      </div>
      <h3 style={{
        fontFamily: TY.display, fontSize: 30, fontWeight: TY.displayWeight,
        letterSpacing: TY.displayTracking, color: T.ink, margin: '0 0 14px',
      }}>{service.title}</h3>
      <p style={{ fontFamily: TY.body, fontSize: 15, lineHeight: 1.55, color: T.inkSoft, margin: '0 0 24px' }}>
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
            <div style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>
              {g.label}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {g.items.map((it, j) => (
                <li key={j} style={{ fontFamily: TY.body, fontSize: 14, lineHeight: 1.6, color: T.inkSoft, paddingLeft: 14, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 10, width: 6, height: 1, background: T.accent }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, paddingTop: 18, borderTop: `1px solid ${T.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.08em' }}>
          {service.price.from ? 'AB' : 'PREIS'}
        </span>
        <span style={{ fontFamily: TY.body, fontSize: 15, color: T.ink, fontWeight: 500 }}>
          {service.price.from ? (
            <>
              <span style={{ fontFamily: TY.display, fontSize: 22, fontWeight: TY.displayWeight }}>{service.price.from} €</span>
              <span style={{ color: T.muted, fontSize: 13 }}> / Einheit · Monat</span>
            </>
          ) : service.price.unit}
        </span>
      </div>
    </div>
  );
}

function Services() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="leistungen" style={{ padding: 'clamp(64px, 10vw, 120px) 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Leistungen"
          title={<>Drei Säulen,<br /><em style={{ color: T.primary, fontStyle: 'italic' }}>ein Anspruch.</em></>}
          lede="Wir decken die klassischen Aufgaben der Hausverwaltung ab — und liefern dabei die Präzision und Transparenz, die Ihnen eine moderne Verwaltung schuldet."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 64 }}>
          {C.services.map((s, i) => (
            <div key={s.id} style={{ marginLeft: i > 0 ? -1 : 0 }}>
              <ServiceCard service={s} expanded={hovered === s.id || (hovered === null && i === 0)} onHover={setHovered} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Region ───────────────────────────────────────────────────

function Region() {
  return (
    <section id="region" style={{ padding: '0 48px clamp(64px, 10vw, 120px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          background: T.surface, border: `1px solid ${T.rule}`,
          padding: 'clamp(32px, 5vw, 64px)',
          display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56, alignItems: 'center',
        }}>
          <div>
            <div style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.16em', marginBottom: 16 }}>
              UNSERE REGION
            </div>
            <h2 style={{
              fontFamily: TY.display, fontSize: 'clamp(36px, 4.5vw, 56px)',
              fontWeight: TY.displayWeight, letterSpacing: TY.displayTracking,
              lineHeight: 1.05, color: T.ink, margin: '0 0 24px',
            }}>
              Ihr Partner<br />
              <em style={{ color: T.primary, fontStyle: 'italic' }}>im Breisgau.</em>
            </h2>
            <p style={{ fontFamily: TY.body, fontSize: 17, lineHeight: 1.55, color: T.inkSoft, margin: '0 0 28px', maxWidth: 440 }}>
              Wir verwalten Objekte im gesamten Breisgau — vom Kaiserstuhl bis in den Hochschwarzwald. Kurze Wege, persönliche Besichtigungen und Handwerker, die wir seit Jahren kennen.
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {['Freiburg', 'Emmendingen', 'Kaiserstuhl', 'Markgräflerland', 'Schwarzwald'].map((p) => (
                <span key={p} style={{ fontFamily: TY.body, fontSize: 13, color: T.inkSoft, paddingLeft: 12, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 9, width: 4, height: 4, background: T.accent, borderRadius: '50%' }} />
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div style={{ height: 440 }}><RegionalMap /></div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Us + Team ────────────────────────────────────────────

function WhyUs() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }}>
      {C.why.map((w, i) => (
        <div key={i} style={{
          padding: '32px 36px 32px 0',
          borderBottom: i < 2 ? `1px solid ${T.rule}` : 'none',
          paddingLeft: i % 2 === 1 ? 36 : 0,
          borderLeft: i % 2 === 1 ? `1px solid ${T.rule}` : 'none',
        }}>
          <div style={{ fontFamily: TY.mono, fontSize: 12, color: T.primary, letterSpacing: '0.14em', marginBottom: 12, fontWeight: 600 }}>
            {String(i + 1).padStart(2, '0')}
          </div>
          <h4 style={{
            fontFamily: TY.display, fontSize: 24, fontWeight: TY.displayWeight,
            letterSpacing: TY.displayTracking, color: T.ink, margin: '0 0 10px',
          }}>{w.title}</h4>
          <p style={{ fontFamily: TY.body, fontSize: 15, color: T.inkSoft, lineHeight: 1.6, margin: 0 }}>{w.body}</p>
        </div>
      ))}
    </div>
  );
}

function TeamMember({ person, index }) {
  return (
    <div>
      <div style={{
        aspectRatio: '3 / 4', background: T.primarySoft,
        position: 'relative', overflow: 'hidden',
        marginBottom: 18, border: `1px solid ${T.rule}`,
      }}>
        <svg viewBox="0 0 120 160" width="100%" height="100%" style={{ display: 'block' }}>
          <defs>
            <pattern id={`stripe-${index}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke={T.primary} strokeWidth="0.8" opacity="0.25" />
            </pattern>
          </defs>
          <rect width="120" height="160" fill={`url(#stripe-${index})`} />
          <circle cx="60" cy="62" r="18" fill={T.primary} opacity="0.4" />
          <path d="M24 160 Q24 110 60 104 Q96 110 96 160 Z" fill={T.primary} opacity="0.4" />
          <text x="8" y="152" fontSize="9" fontFamily="ui-monospace, monospace" fill={T.muted}>PORTRAIT</text>
        </svg>
      </div>
      <div style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.14em', marginBottom: 4 }}>
        {person.role.toUpperCase()}
      </div>
      <h4 style={{
        fontFamily: TY.display, fontSize: 22, fontWeight: TY.displayWeight,
        letterSpacing: TY.displayTracking, color: T.ink, margin: '0 0 8px',
      }}>{person.name}</h4>
      <p style={{ fontFamily: TY.body, fontSize: 14, color: T.inkSoft, lineHeight: 1.55, margin: 0 }}>{person.bio}</p>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="ueber-uns" style={{
      padding: 'clamp(64px, 10vw, 120px) 48px',
      background: T.surface,
      borderTop: `1px solid ${T.rule}`,
      borderBottom: `1px solid ${T.rule}`,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 120 }}>
            <div style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.16em', marginBottom: 16 }}>WARUM FHV</div>
            <h2 style={{
              fontFamily: TY.display, fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: TY.displayWeight, letterSpacing: TY.displayTracking,
              lineHeight: 1.02, color: T.ink, margin: '0 0 24px',
            }}>
              Klein genug für persönlich.<br />
              <em style={{ color: T.primary, fontStyle: 'italic' }}>Groß genug für verlässlich.</em>
            </h2>
            <p style={{ fontFamily: TY.body, fontSize: 16, lineHeight: 1.6, color: T.inkSoft, margin: 0, maxWidth: 360 }}>
              Seit 2018 betreuen wir Objekte im Breisgau. Inhabergeführt, zertifiziert und auf eine langfristige Zusammenarbeit ausgelegt.
            </p>
          </div>
          <WhyUs />
        </div>
        <div style={{ marginTop: 96 }}>
          <div style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.16em', marginBottom: 24 }}>DAS TEAM</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {C.team.map((p, i) => <TeamMember key={i} person={p} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Price Calculator ─────────────────────────────────────────

function PriceCalculator() {
  const [units, setUnits] = useState(12);
  const [mode, setMode] = useState('miet');
  const rate = mode === 'miet' ? 30 : 25;
  const monthly = units * rate;
  const yearly = monthly * 12;

  return (
    <section id="preise" style={{ padding: 'clamp(64px, 10vw, 120px) 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Preise"
          title={<>Faire Preise,<br /><em style={{ color: T.primary, fontStyle: 'italic' }}>ohne Kleingedrucktes.</em></>}
          lede="Eine monatliche Pauschale pro Einheit — alles andere wird transparent abgerechnet. Schätzen Sie Ihren Richtpreis in Sekunden."
        />
        <div style={{ marginTop: 56, border: `1px solid ${T.rule}`, background: T.surface, padding: 'clamp(24px, 4vw, 44px)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.14em' }}>RICHTWERT — UNVERBINDLICH</div>
              <h3 style={{ fontFamily: TY.display, fontSize: 28, fontWeight: TY.displayWeight, letterSpacing: TY.displayTracking, margin: '6px 0 0', color: T.ink }}>
                Preis schätzen
              </h3>
            </div>
            <div style={{ display: 'flex', border: `1px solid ${T.rule}` }}>
              {[{ k: 'miet', l: 'Mietverwaltung' }, { k: 'weg', l: 'WEG-Verwaltung' }].map((b) => (
                <button key={b.k} onClick={() => setMode(b.k)}
                  style={{
                    padding: '10px 18px', fontSize: 13, cursor: 'pointer',
                    background: mode === b.k ? T.primary : 'transparent',
                    color: mode === b.k ? T.bg : T.inkSoft,
                    border: 'none', fontFamily: TY.body, transition: 'all .15s',
                  }}>{b.l}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 48, alignItems: 'center' }}>
            <div>
              <label style={{ fontFamily: TY.body, fontSize: 13, color: T.muted, letterSpacing: '0.02em', display: 'block', marginBottom: 14 }}>
                Wie viele Einheiten?
              </label>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18 }}>
                <span style={{
                  fontFamily: TY.display, fontSize: 64, fontWeight: TY.displayWeight,
                  letterSpacing: TY.displayTracking, color: T.primary, lineHeight: 1,
                }}>{units}</span>
                <span style={{ fontFamily: TY.body, color: T.muted, fontSize: 15 }}>
                  {units === 1 ? 'Einheit' : 'Einheiten'}
                </span>
              </div>
              <input type="range" min="1" max="80" value={units}
                onChange={(e) => setUnits(+e.target.value)}
                style={{ width: '100%', accentColor: T.primary, cursor: 'pointer', background: T.rule }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: TY.mono, fontSize: 11, color: T.muted, marginTop: 6 }}>
                <span>1</span><span>20</span><span>40</span><span>60</span><span>80</span>
              </div>
            </div>
            <div style={{ background: T.bg, padding: '24px 28px', border: `1px solid ${T.rule}` }}>
              <div style={{ fontFamily: TY.mono, fontSize: 12, color: T.muted, letterSpacing: '0.12em', marginBottom: 8 }}>PRO MONAT</div>
              <div style={{ fontFamily: TY.display, fontSize: 40, fontWeight: TY.displayWeight, letterSpacing: TY.displayTracking, color: T.ink, lineHeight: 1 }}>
                {monthly.toLocaleString('de-DE')} €
              </div>
              <div style={{ height: 1, background: T.rule, margin: '18px 0' }} />
              <div style={{ fontFamily: TY.mono, fontSize: 12, color: T.muted, letterSpacing: '0.12em', marginBottom: 6 }}>PRO JAHR</div>
              <div style={{ fontFamily: TY.display, fontSize: 20, color: T.inkSoft, fontWeight: TY.displayWeight }}>
                ≈ {yearly.toLocaleString('de-DE')} €
              </div>
              <div style={{ marginTop: 18, fontFamily: TY.body, fontSize: 12, color: T.muted, lineHeight: 1.5 }}>
                Richtpreis {rate} € / Einheit · Monat. Individuelles Angebot nach Objektbesichtigung.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────

function Testimonials() {
  return (
    <section id="stimmen" style={{
      padding: 'clamp(64px, 10vw, 120px) 48px',
      background: T.surface,
      borderTop: `1px solid ${T.rule}`,
      borderBottom: `1px solid ${T.rule}`,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Stimmen"
          title={<>Was Eigentümer<br /><em style={{ color: T.primary, fontStyle: 'italic' }}>über uns sagen.</em></>}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 56 }}>
          {C.testimonials.map((t, i) => (
            <figure key={i} style={{
              margin: 0, padding: '32px 28px',
              background: T.bg, border: `1px solid ${T.rule}`,
              display: 'flex', flexDirection: 'column',
            }}>
              <svg width="26" height="20" viewBox="0 0 26 20" fill="none" style={{ marginBottom: 18 }}>
                <path d="M0 20V10Q0 2 8 0V4Q4 5 4 10H8V20H0ZM14 20V10Q14 2 22 0V4Q18 5 18 10H22V20H14Z" fill={T.accent} />
              </svg>
              <blockquote style={{
                margin: 0, fontFamily: TY.display, fontSize: 19,
                lineHeight: 1.5, color: T.ink, flex: 1,
                fontWeight: 400, letterSpacing: TY.displayTracking,
              }}>
                „{t.quote}"
              </blockquote>
              <figcaption style={{ marginTop: 22, paddingTop: 16, borderTop: `1px solid ${T.rule}`, fontSize: 13, fontFamily: TY.body, color: T.inkSoft }}>
                <div style={{ fontWeight: 600 }}>{t.author}</div>
                <div style={{ color: T.muted, marginTop: 2 }}>{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────

function FormField({ label, value, onChange, inputType = 'text', required }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.14em', display: 'block', marginBottom: 6 }}>
        {label.toUpperCase()}{required && ' *'}
      </label>
      <input type={inputType} value={value} required={required}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', padding: '12px 0', fontFamily: TY.body, fontSize: 15, color: T.ink,
          background: 'transparent', border: 'none', borderBottom: `1px solid ${T.rule}`,
          outline: 'none', boxSizing: 'border-box', transition: 'border-color .15s',
        }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = T.primary)}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = T.rule)} />
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: 'weg', msg: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const a = C.contact;

  return (
    <section id="kontakt" style={{ padding: 'clamp(64px, 10vw, 120px) 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div>
            <div style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.16em', marginBottom: 16 }}>KONTAKT</div>
            <h2 style={{
              fontFamily: TY.display, fontSize: 'clamp(40px, 5vw, 60px)',
              fontWeight: TY.displayWeight, letterSpacing: TY.displayTracking,
              color: T.ink, margin: '0 0 24px', lineHeight: 1.05,
            }}>
              Lernen wir uns<br />kennen.
            </h2>
            <p style={{ fontFamily: TY.body, fontSize: 17, color: T.inkSoft, lineHeight: 1.55, maxWidth: 420, marginBottom: 32 }}>
              Ein erstes, unverbindliches Gespräch zeigt am schnellsten, ob wir zueinander passen. Wir kommen gern zu Ihrem Objekt.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { l: 'BÜRO', v: `${a.line1}\n${a.line2}` },
                { l: 'TELEFON', v: a.phone },
                { l: 'E-MAIL', v: a.email },
                { l: 'ÖFFNUNGSZEITEN', v: a.hours },
              ].map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'start', paddingTop: 14, borderTop: `1px solid ${T.rule}` }}>
                  <span style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.12em' }}>{r.l}</span>
                  <span style={{ fontFamily: TY.body, fontSize: 15, color: T.ink, whiteSpace: 'pre-line', lineHeight: 1.5 }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={async (e) => {
          e.preventDefault(); setSending(true); setSendError('');
          try {
            const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, topic: form.topic, message: form.msg }) });
            if (res.ok) { setSubmitted(true); } else { const d = await res.json(); setSendError(d.error || 'Fehler beim Senden.'); }
          } catch { setSendError('Verbindungsfehler. Bitte versuchen Sie es erneut.'); }
          setSending(false);
        }}
            style={{ background: T.surface, border: `1px solid ${T.rule}`, padding: 36 }}>
            {submitted ? (
              <div style={{ padding: '40px 0', textAlign: 'center' }}>
                <div style={{ fontFamily: TY.display, fontSize: 28, color: T.ink, marginBottom: 12, letterSpacing: TY.displayTracking }}>
                  Vielen Dank.
                </div>
                <div style={{ fontFamily: TY.body, fontSize: 15, color: T.inkSoft }}>
                  Wir melden uns innerhalb von 24 Stunden.
                </div>
              </div>
            ) : (
              <>
                <div style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.14em', marginBottom: 20 }}>TERMIN ANFRAGEN</div>
                <FormField label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <FormField label="E-Mail" value={form.email} onChange={(v) => setForm({ ...form, email: v })} inputType="email" required />
                <FormField label="Telefon (optional)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.14em', display: 'block', marginBottom: 8 }}>THEMA</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[{ k: 'weg', l: 'WEG' }, { k: 'miet', l: 'Miete' }, { k: 'buch', l: 'Buchhaltung' }, { k: 'andere', l: 'Anderes' }].map((o) => (
                      <button type="button" key={o.k} onClick={() => setForm({ ...form, topic: o.k })}
                        style={{
                          padding: '8px 14px', fontFamily: TY.body, fontSize: 13, cursor: 'pointer',
                          border: `1px solid ${form.topic === o.k ? T.primary : T.rule}`,
                          background: form.topic === o.k ? T.primary : 'transparent',
                          color: form.topic === o.k ? T.bg : T.inkSoft,
                        }}>{o.l}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.14em', display: 'block', marginBottom: 8 }}>NACHRICHT</label>
                  <textarea value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    rows={4} placeholder="Anzahl Einheiten, aktuelle Verwaltung, Wunschtermin…"
                    style={{
                      width: '100%', padding: 12, fontFamily: TY.body, fontSize: 14, color: T.ink,
                      background: T.bg, border: `1px solid ${T.rule}`, resize: 'vertical', outline: 'none', boxSizing: 'border-box',
                    }} />
                </div>
                <button type="submit" style={{
                  width: '100%', padding: '16px', fontFamily: TY.body, fontSize: 15,
                  background: T.primary, color: T.bg,
                  border: 'none', cursor: 'pointer', letterSpacing: '0.02em', fontWeight: 500,
                  transition: 'opacity .15s',
                }}
                  onMouseEnter={(e) => !sending && (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = sending ? '0.7' : '1')}
                  disabled={sending}>
                  {sending ? 'Wird gesendet…' : 'Termin anfragen →'}
                </button>
                {sendError && <div style={{ marginTop: 10, padding: '10px 14px', background: '#fee2e2', color: '#b91c1c', fontFamily: TY.body, fontSize: 13 }}>{sendError}</div>}
                <div style={{ fontFamily: TY.body, fontSize: 12, color: T.muted, marginTop: 12, textAlign: 'center' }}>
                  Antwort innerhalb 24 Stunden · DSGVO-konform
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────

function Footer() {
  const a = C.contact;
  return (
    <footer style={{ borderTop: `1px solid ${T.rule}`, background: T.surface, padding: '56px 48px 36px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
              <span style={{ fontFamily: TY.display, fontSize: 26, fontWeight: TY.displayWeight, letterSpacing: TY.displayTracking, color: T.ink }}>FHV</span>
              <span style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Freiburger Hausverwaltung</span>
            </div>
            <p style={{ fontFamily: TY.body, fontSize: 14, color: T.inkSoft, lineHeight: 1.6, maxWidth: 320, margin: '0 0 24px' }}>
              Moderne Hausverwaltung im Breisgau. Persönlich erreichbar, digital organisiert, regional verwurzelt.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {C.certs.map((c) => (
                <span key={c} style={{ fontFamily: TY.mono, fontSize: 11, padding: '6px 10px', border: `1px solid ${T.rule}`, color: T.muted, letterSpacing: '0.04em' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          {[
            { h: 'Leistungen', items: ['Mietverwaltung', 'WEG-Verwaltung', 'Buchhaltung'] },
            { h: 'Unternehmen', items: ['Über uns', 'Team', 'Karriere', 'Impressum'] },
            { h: 'Kontakt', items: [a.line1, a.line2, a.phone, a.email] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontFamily: TY.mono, fontSize: 11, color: T.muted, letterSpacing: '0.14em', marginBottom: 14 }}>
                {col.h.toUpperCase()}
              </div>
              {col.items.map((it, j) => (
                <div key={j} style={{ fontFamily: TY.body, fontSize: 14, color: T.inkSoft, marginBottom: 8 }}>{it}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${T.rule}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: TY.body, fontSize: 12, color: T.muted }}>
          <span style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span>© 2026 FHV Freiburger Hausverwaltung OHG</span>
            <a href="/admin" style={{ color: T.muted, textDecoration: 'none', opacity: 0.6 }}>Admin</a>
          </span>
          <span style={{ display: 'flex', gap: 20 }}>
            {['Datenschutz', 'Impressum', 'AGB'].map((l) => (
              <a key={l} href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Head>
        <title>FHV – Freiburger Hausverwaltung</title>
        <meta name="description" content="Moderne Hausverwaltung im Breisgau. Mietverwaltung, WEG-Verwaltung und Buchhaltung — persönlich erreichbar, digital organisiert." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ background: T.bg, color: T.ink, fontFamily: TY.body, fontSize: 16, lineHeight: 1.5 }}>
        <Nav />
        <main>
          <Hero />
          <Stats />
          <Services />
          <Region />
          <AboutSection />
          <PriceCalculator />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          section > div > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="grid-template-columns: 1fr 1.1fr"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="grid-template-columns: 1fr 280px"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          section > div > div[style*="grid-template-columns: 2fr 1fr 1fr 1fr"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
          header { padding-left: 20px !important; padding-right: 20px !important; }
          footer { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </>
  );
}
