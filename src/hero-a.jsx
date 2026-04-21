// Variation A — Editorial / type-led. Big serif headline, arch shapes,
// mono kickers, single column hero with asymmetric offset.

function HeroA({ theme, type }) {
  const h = FHV_CONTENT.heroA;
  return (
    <section style={{
      position: 'relative',
      padding: '80px 48px 260px',
      overflow: 'hidden',
      minHeight: 780,
    }}>
      {/* Freiburg Altstadt skyline — anchored to baseline */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        color: theme.primary, opacity: 0.18, pointerEvents: 'none',
        display: 'flex', justifyContent: 'center',
      }}>
        <SpireMark size={340} color="currentColor" strokeWidth={1.2} />
      </div>
      {/* Soft fade over skyline so hero copy stays dominant */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
        background: `linear-gradient(180deg, ${theme.bg} 10%, ${theme.bg}00 55%, ${theme.bg}aa 100%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: 1100 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          marginBottom: 48, color: theme.primary,
        }}>
          <span style={{ width: 40, height: 1, background: theme.primary }} />
          <span style={{ fontFamily: type.mono, fontSize: 12, letterSpacing: '0.16em' }}>
            {h.kicker.toUpperCase()}
          </span>
        </div>

        <h1 style={{
          fontFamily: type.display, fontSize: 'clamp(64px, 9vw, 128px)',
          fontWeight: type.displayWeight, letterSpacing: type.displayTracking,
          lineHeight: 0.95, color: theme.ink, margin: '0 0 40px',
        }}>
          <span style={{ display: 'block' }}>{h.headline[0]}</span>
          <span style={{ display: 'block', fontStyle: 'italic', color: theme.primary }}>
            {h.headline[1]}
          </span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40, maxWidth: 900 }}>
          <p style={{
            fontSize: 20, lineHeight: 1.6, color: theme.inkSoft,
            margin: 0, maxWidth: 560,
          }}>{h.lede}</p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href={h.primary.href} style={{
              padding: '20px 36px', fontSize: 15,
              background: theme.primary, color: theme.bg,
              textDecoration: 'none', letterSpacing: '0.02em',
              transition: 'opacity .15s', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: 12,
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
              {h.primary.label}
              <span style={{ fontSize: 18 }}>→</span>
            </a>
            <a href={h.secondary.href} style={{
              padding: '20px 4px', fontSize: 15,
              background: 'transparent', color: theme.ink,
              textDecoration: 'none', letterSpacing: '0.02em',
              borderBottom: `1px solid ${theme.ink}`,
              fontWeight: 500,
            }}>
              {h.secondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

window.HeroA = HeroA;
