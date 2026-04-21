// Full homepage prototype — composes hero + all sections.
// Accepts `variant` ('a' or 'b'), `theme`, `type`.

function HomepagePrototype({ variant, theme, type }) {
  const [hoveredService, setHoveredService] = React.useState(null);

  return (
    <div data-fhv-root={variant}
      data-screen-label={variant === 'a' ? 'Variant A — Editorial' : 'Variant B — Regional'}
      style={{
        height: '100%', width: '100%', overflow: 'auto',
        background: theme.bg, color: theme.ink,
        fontFamily: type.body, fontSize: 16, lineHeight: 1.5,
        fontFeatureSettings: '"ss01","ss02","kern"',
      }}>
      <FhvNav theme={theme} variant={variant} />

      {variant === 'a' ? <HeroA theme={theme} type={type} /> : <HeroB theme={theme} type={type} />}

      {/* Stats — shown only on Variant B (A uses skyline hero) */}
      {variant === 'b' && (
        <section style={{ padding: '0 48px' }}>
          <FhvStats theme={theme} type={type} />
        </section>
      )}

      {/* Services */}
      <section id="leistungen" style={{ padding: '120px 48px' }}>
        <SectionHeader theme={theme} type={type}
          eyebrow="Leistungen"
          title={<>Drei Säulen,<br/><em style={{ color: theme.primary, fontStyle: 'italic' }}>ein Anspruch.</em></>}
          lede="Wir decken die klassischen Aufgaben der Hausverwaltung ab — und liefern dabei die Präzision und Transparenz, die Ihnen eine moderne Verwaltung schuldet." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 64 }}>
          {FHV_CONTENT.services.map((s, i) => (
            <div key={s.id} style={{
              borderRight: i < 2 ? 'none' : undefined,
              marginLeft: i > 0 ? -1 : 0,
            }}>
              <ServiceCard service={s} theme={theme} type={type}
                expanded={hoveredService === s.id || (hoveredService === null && i === 0)}
                onHover={setHoveredService} />
            </div>
          ))}
        </div>
      </section>

      {/* Region — only on A (B already has map in hero) */}
      {variant === 'a' && (
        <section id="region" style={{ padding: '0 48px 120px' }}>
          <div style={{
            background: theme.surface, border: `1px solid ${theme.rule}`,
            padding: '64px 64px', display: 'grid',
            gridTemplateColumns: '1fr 1.1fr', gap: 56, alignItems: 'center',
          }}>
            <div>
              <div style={{ fontFamily: type.mono, fontSize: 11, color: theme.muted, letterSpacing: '0.16em', marginBottom: 16 }}>
                UNSERE REGION
              </div>
              <h2 style={{
                fontFamily: type.display, fontSize: 52, fontWeight: type.displayWeight,
                letterSpacing: type.displayTracking, lineHeight: 1.05, color: theme.ink,
                margin: '0 0 24px',
              }}>
                Ihr Partner<br/><em style={{ color: theme.primary, fontStyle: 'italic' }}>im Breisgau.</em>
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: theme.inkSoft, margin: '0 0 28px', maxWidth: 440 }}>
                Wir verwalten Objekte im gesamten Breisgau — vom Kaiserstuhl bis in den Hochschwarzwald. Kurze Wege, persönliche Besichtigungen und Handwerker, die wir seit Jahren kennen.
              </p>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Freiburg', 'Emmendingen', 'Kaiserstuhl', 'Markgräflerland', 'Schwarzwald'].map((p) => (
                  <span key={p} style={{
                    fontSize: 13, color: theme.inkSoft,
                    paddingLeft: 12, position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, top: 9, width: 4, height: 4,
                      background: theme.accent, borderRadius: '50%',
                    }} />
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ height: 440 }}>
              <RegionalMap theme={theme} />
            </div>
          </div>
        </section>
      )}

      {/* Region for B — hills landscape strip with places */}
      {variant === 'b' && (
        <section id="region" style={{ padding: '120px 48px' }}>
          <SectionHeader theme={theme} type={type}
            eyebrow="Region"
            title={<>Vom Kaiserstuhl bis<br/><em style={{ color: theme.primary, fontStyle: 'italic' }}>in den Schwarzwald.</em></>}
            lede="Wir betreuen Objekte im gesamten Breisgau und angrenzenden Schwarzwald. Persönlich vor Ort — in maximal 45 Minuten." />
          <div style={{
            marginTop: 56, padding: '48px 56px',
            border: `1px solid ${theme.rule}`,
            background: `linear-gradient(180deg, ${theme.surface} 0%, ${theme.bg} 100%)`,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 24, position: 'relative', zIndex: 1,
            }}>
              {[
                { t: 'Freiburg', n: '52 Objekte', hl: true },
                { t: 'Emmendingen', n: '14 Objekte' },
                { t: 'Kaiserstuhl', n: '9 Objekte' },
                { t: 'Markgräflerland', n: '11 Objekte' },
                { t: 'Hochschwarzwald', n: '6 Objekte' },
              ].map((p) => (
                <div key={p.t} style={{
                  padding: '20px 20px',
                  background: p.hl ? theme.primary : 'transparent',
                  border: `1px solid ${p.hl ? theme.primary : theme.rule}`,
                  color: p.hl ? theme.bg : theme.ink,
                }}>
                  <div style={{
                    fontFamily: type.display, fontSize: 20,
                    fontWeight: type.displayWeight, letterSpacing: type.displayTracking,
                    marginBottom: 4,
                  }}>{p.t}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>{p.n}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 48, color: theme.primary, opacity: 0.5 }}>
              <HillsMark width={1100} height={90} color={theme.primary} />
            </div>
          </div>
        </section>
      )}

      {/* Why us */}
      <section id="ueber-uns" style={{ padding: '120px 48px', background: variant === 'a' ? theme.surface : 'transparent', borderTop: `1px solid ${theme.rule}`, borderBottom: `1px solid ${theme.rule}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 120 }}>
            <div style={{ fontFamily: type.mono, fontSize: 11, color: theme.muted, letterSpacing: '0.16em', marginBottom: 16 }}>
              WARUM FHV
            </div>
            <h2 style={{
              fontFamily: type.display, fontSize: 56, fontWeight: type.displayWeight,
              letterSpacing: type.displayTracking, lineHeight: 1.02, color: theme.ink,
              margin: '0 0 24px',
            }}>
              Klein genug für<br/>persönlich.<br/>
              <em style={{ color: theme.primary, fontStyle: 'italic' }}>Groß genug für<br/>verlässlich.</em>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: theme.inkSoft, margin: 0, maxWidth: 360 }}>
              Seit 2018 betreuen wir Objekte im Breisgau. Inhabergeführt, zertifiziert und auf eine langfristige Zusammenarbeit ausgelegt.
            </p>
          </div>
          <WhyUs theme={theme} type={type} />
        </div>

        <div style={{ marginTop: 96 }}>
          <div style={{ fontFamily: type.mono, fontSize: 11, color: theme.muted, letterSpacing: '0.16em', marginBottom: 24 }}>
            DAS TEAM
          </div>
          <TeamRow theme={theme} type={type} />
        </div>
      </section>

      {/* Price calculator */}
      <section id="preise" style={{ padding: '120px 48px' }}>
        <SectionHeader theme={theme} type={type}
          eyebrow="Preise"
          title={<>Faire Preise,<br/><em style={{ color: theme.primary, fontStyle: 'italic' }}>ohne Kleingedrucktes.</em></>}
          lede="Eine monatliche Pauschale pro Einheit — alles andere wird transparent abgerechnet. Schätzen Sie Ihren Richtpreis in Sekunden." />
        <div style={{ marginTop: 56 }}>
          <PriceCalculator theme={theme} type={type} />
        </div>
      </section>

      {/* Testimonials */}
      <section id="stimmen" style={{ padding: '120px 48px', background: theme.surface, borderTop: `1px solid ${theme.rule}`, borderBottom: `1px solid ${theme.rule}` }}>
        <SectionHeader theme={theme} type={type}
          eyebrow="Stimmen"
          title={<>Was Eigentümer<br/><em style={{ color: theme.primary, fontStyle: 'italic' }}>über uns sagen.</em></>} />
        <div style={{ marginTop: 56 }}>
          <Testimonials theme={theme} type={type} />
        </div>
      </section>

      {/* Contact */}
      <section id="kontakt" style={{ padding: '120px 48px' }}>
        <ContactBlock theme={theme} type={type} />
      </section>

      <FhvFooter theme={theme} type={type} />
    </div>
  );
}

function SectionHeader({ eyebrow, title, lede, theme, type }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: lede ? '1.1fr 1fr' : '1fr', gap: 64, alignItems: 'end' }}>
      <div>
        <div style={{ fontFamily: type.mono, fontSize: 11, color: theme.muted, letterSpacing: '0.16em', marginBottom: 16 }}>
          {eyebrow.toUpperCase()}
        </div>
        <h2 style={{
          fontFamily: type.display, fontSize: 'clamp(48px, 5.5vw, 72px)',
          fontWeight: type.displayWeight, letterSpacing: type.displayTracking,
          lineHeight: 1.02, color: theme.ink, margin: 0,
        }}>{title}</h2>
      </div>
      {lede && (
        <p style={{ fontSize: 17, lineHeight: 1.55, color: theme.inkSoft, margin: 0, maxWidth: 440, paddingBottom: 8 }}>
          {lede}
        </p>
      )}
    </div>
  );
}

window.HomepagePrototype = HomepagePrototype;
