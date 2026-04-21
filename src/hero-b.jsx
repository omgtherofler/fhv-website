// Variation B — Regional / split layout. Left: hero copy. Right: regional
// map card. Under: hills mark as full-width divider.

function HeroB({ theme, type }) {
  const h = FHV_CONTENT.heroB;
  return (
    <section style={{ position: 'relative', padding: '48px 48px 0' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1.15fr 1fr',
        gap: 56, alignItems: 'stretch',
        minHeight: 560,
      }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 0' }}>
          <div style={{
            display: 'inline-flex', alignSelf: 'flex-start',
            alignItems: 'center', gap: 10,
            padding: '6px 12px', border: `1px solid ${theme.rule}`,
            background: theme.surface, marginBottom: 32,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: theme.accent }} />
            <span style={{ fontFamily: type.mono, fontSize: 11, color: theme.inkSoft, letterSpacing: '0.14em' }}>
              {h.kicker.toUpperCase()}
            </span>
          </div>

          <h1 style={{
            fontFamily: type.display, fontSize: 'clamp(56px, 7.5vw, 104px)',
            fontWeight: type.displayWeight, letterSpacing: type.displayTracking,
            lineHeight: 0.98, color: theme.ink, margin: '0 0 32px',
          }}>
            <span style={{ display: 'block' }}>{h.headline[0]}</span>
            <span style={{ display: 'block', color: theme.primary, fontStyle: 'italic' }}>
              {h.headline[1]}
            </span>
          </h1>

          <p style={{
            fontSize: 18, lineHeight: 1.55, color: theme.inkSoft,
            margin: '0 0 40px', maxWidth: 480,
          }}>{h.lede}</p>

          <div style={{ display: 'flex', gap: 14 }}>
            <a href={h.primary.href} style={{
              padding: '16px 26px', fontSize: 15,
              background: theme.primary, color: theme.bg, textDecoration: 'none',
              letterSpacing: '0.01em', transition: 'opacity .15s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
              {h.primary.label} →
            </a>
            <a href={h.secondary.href} style={{
              padding: '16px 26px', fontSize: 15,
              color: theme.ink, textDecoration: 'none',
              borderBottom: `1px solid ${theme.ink}`, letterSpacing: '0.01em',
            }}>
              {h.secondary.label}
            </a>
          </div>
        </div>

        {/* Right — map card */}
        <div style={{
          background: theme.surface, border: `1px solid ${theme.rule}`,
          padding: 28, display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
            <div style={{ fontFamily: type.mono, fontSize: 11, color: theme.muted, letterSpacing: '0.14em' }}>
              UNSER WIRKUNGSKREIS
            </div>
            <div style={{ fontSize: 13, color: theme.inkSoft }}>Breisgau · Schwarzwald</div>
          </div>
          <div style={{ flex: 1, minHeight: 320 }}>
            <RegionalMap theme={theme} />
          </div>
          <div style={{
            marginTop: 16, paddingTop: 16,
            borderTop: `1px solid ${theme.rule}`,
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
          }}>
            {[
              { k: 'Objekte', v: '92' },
              { k: 'Städte', v: '14' },
              { k: 'Radius', v: '45 km' },
            ].map((s) => (
              <div key={s.k}>
                <div style={{
                  fontFamily: type.display, fontSize: 22,
                  fontWeight: type.displayWeight, color: theme.ink,
                  letterSpacing: type.displayTracking,
                }}>{s.v}</div>
                <div style={{ fontSize: 11, color: theme.muted, letterSpacing: '0.08em' }}>
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hills divider */}
      <div style={{
        marginTop: 48, paddingTop: 32,
        color: theme.primary, opacity: 0.6,
        display: 'flex', justifyContent: 'center',
      }}>
        <HillsMark width={1100} height={100} color={theme.primary} />
      </div>
    </section>
  );
}

window.HeroB = HeroB;
