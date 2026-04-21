// Architectural abstract shapes — rooflines, arches, contour maps.
// Pure SVG, themable via currentColor.

function ArchMark({ size = 80, color = 'currentColor', strokeWidth = 1.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d="M10 70 L10 36 Q10 10 40 10 Q70 10 70 36 L70 70" />
      <path d="M20 70 L20 42 Q20 20 40 20 Q60 20 60 42 L60 70" opacity="0.55" />
      <path d="M30 70 L30 48 Q30 30 40 30 Q50 30 50 48 L50 70" opacity="0.3" />
    </svg>
  );
}

// Freiburg Altstadt skyline — Münster spire anchors center, flanked by
// historic Bürgerhäuser with gables, chimneys, and the Schwabentor gate.
// Line-drawn, architectural, not AI-slop. Long-format (wide).
function SpireMark({ size = 120, color = 'currentColor', strokeWidth = 1.2 }) {
  // size controls height; width scales by 3.2 for panoramic skyline.
  const w = Math.round(size * 3.2);
  return (
    <svg width={w} height={size} viewBox="0 0 640 200" fill="none" stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="square" strokeLinejoin="miter" style={{ display: 'block' }}>

      {/* ───── Far left: gabled Bürgerhäuser cluster ───── */}
      <g opacity="0.55">
        {/* house 1 — tall stepped gable */}
        <path d="M10 200 L10 120 L30 120 L30 112 L40 112 L40 104 L50 104 L50 96 L60 96 L60 104 L70 104 L70 112 L80 112 L80 120 L100 120 L100 200" />
        <path d="M20 140 L20 160 M20 170 L20 200" opacity="0.6" />
        <rect x="18" y="140" width="10" height="14" />
        <rect x="40" y="140" width="10" height="14" />
        <rect x="62" y="140" width="10" height="14" />
        <rect x="18" y="170" width="10" height="14" />
        <rect x="40" y="170" width="10" height="14" />
        <rect x="62" y="170" width="10" height="14" />
        {/* chimney */}
        <path d="M72 96 L72 84 L78 84 L78 96" />
      </g>

      {/* house 2 — pitched roof */}
      <g opacity="0.7">
        <path d="M100 200 L100 130 L140 100 L180 130 L180 200" />
        <rect x="114" y="140" width="12" height="16" />
        <rect x="134" y="140" width="12" height="16" />
        <rect x="154" y="140" width="12" height="16" />
        <rect x="114" y="166" width="12" height="16" />
        <rect x="134" y="166" width="12" height="16" />
        <rect x="154" y="166" width="12" height="16" />
        {/* dormer */}
        <path d="M128 118 L128 110 L140 104 L152 110 L152 118" opacity="0.8" />
        <rect x="134" y="112" width="12" height="6" />
      </g>

      {/* ───── Center: Münster spire (the landmark) ───── */}
      <g>
        {/* openwork cross at top */}
        <path d="M320 6 L320 18 M314 12 L326 12" />
        {/* lantern tip */}
        <path d="M318 18 L322 18 L322 26 L318 26 Z" />
        {/* filigree spire — octagonal openwork */}
        <path d="M310 26 L330 26 L330 44 L310 44 Z" />
        <path d="M313 26 L313 44 M317 26 L317 44 M323 26 L323 44 M327 26 L327 44" opacity="0.5" />
        <path d="M310 32 L330 32 M310 38 L330 38" opacity="0.5" />
        {/* spire cone */}
        <path d="M304 44 L336 44 L340 64 L300 64 Z" />
        <path d="M308 44 L308 64 M314 44 L314 64 M320 44 L320 64 M326 44 L326 64 M332 44 L332 64" opacity="0.45" />
        <path d="M302 54 L338 54" opacity="0.4" />
        {/* octagonal bell tower */}
        <path d="M296 64 L344 64 L344 108 L296 108 Z" />
        <path d="M306 64 L306 108 M320 64 L320 108 M334 64 L334 108" opacity="0.4" />
        {/* pointed arch windows */}
        <path d="M300 82 Q300 74 304 74 Q308 74 308 82 L308 98 L300 98 Z" opacity="0.6" />
        <path d="M314 82 Q314 74 320 74 Q326 74 326 82 L326 98 L314 98 Z" opacity="0.6" />
        <path d="M332 82 Q332 74 336 74 Q340 74 340 82 L340 98 L332 98 Z" opacity="0.6" />
        {/* square tower base */}
        <path d="M288 108 L352 108 L352 148 L288 148 Z" />
        {/* clock */}
        <circle cx="320" cy="126" r="7" />
        <path d="M320 122 L320 126 L323 128" opacity="0.7" />
        {/* nave with buttresses */}
        <path d="M260 148 L380 148 L380 200" />
        <path d="M260 148 L260 200" />
        {/* flying buttress notches */}
        <path d="M268 148 L268 164 L272 164 L272 158 L276 158 L276 200" opacity="0.5" />
        <path d="M372 148 L372 164 L368 164 L368 158 L364 158 L364 200" opacity="0.5" />
        {/* rose window */}
        <circle cx="320" cy="168" r="8" opacity="0.6" />
        <path d="M320 160 L320 176 M312 168 L328 168 M314 162 L326 174 M326 162 L314 174" opacity="0.4" />
        {/* side chapels — pointed arches */}
        <path d="M288 180 Q288 172 294 172 Q300 172 300 180 L300 200" opacity="0.5" />
        <path d="M340 180 Q340 172 346 172 Q352 172 352 180 L352 200" opacity="0.5" />
      </g>

      {/* ───── Right: Schwabentor gate tower ───── */}
      <g opacity="0.7">
        {/* roof peak */}
        <path d="M430 200 L430 130 L445 115 L475 115 L490 130 L490 200" />
        {/* roof highlight */}
        <path d="M445 115 L460 100 L475 115" />
        {/* crenellations hint */}
        <path d="M434 130 L434 126 L440 126 L440 130 M446 130 L446 126 L452 126 L452 130 M458 130 L458 126 L464 126 L464 130 M470 130 L470 126 L476 126 L476 130 M482 130 L482 126 L488 126 L488 130" opacity="0.5" />
        {/* gate archway */}
        <path d="M448 200 L448 172 Q448 160 460 160 Q472 160 472 172 L472 200" />
        {/* windows */}
        <rect x="438" y="140" width="8" height="10" />
        <rect x="474" y="140" width="8" height="10" />
        {/* clock face */}
        <circle cx="460" cy="146" r="5" opacity="0.7" />
      </g>

      {/* ───── Far right: row of gabled houses ───── */}
      <g opacity="0.55">
        <path d="M490 200 L490 150 L510 130 L530 150 L530 200" />
        <path d="M530 200 L530 160 L545 148 L560 160 L560 200" />
        <path d="M560 200 L560 155 L580 138 L600 155 L600 200" />
        <path d="M600 200 L600 165 L615 152 L630 165 L630 200" />
        {/* scattered windows */}
        <rect x="500" y="165" width="7" height="10" /><rect x="513" y="165" width="7" height="10" />
        <rect x="500" y="182" width="7" height="10" /><rect x="513" y="182" width="7" height="10" />
        <rect x="538" y="172" width="7" height="9" /><rect x="549" y="172" width="7" height="9" />
        <rect x="568" y="170" width="8" height="10" /><rect x="583" y="170" width="8" height="10" />
        <rect x="568" y="186" width="8" height="10" /><rect x="583" y="186" width="8" height="10" />
        <rect x="606" y="175" width="7" height="9" /><rect x="617" y="175" width="7" height="9" />
        {/* chimneys */}
        <path d="M520 130 L520 118 L526 118 L526 130" />
        <path d="M608 155 L608 144 L614 144 L614 155" />
      </g>

      {/* ground line */}
      <path d="M0 200 L640 200" opacity="0.35" />
    </svg>
  );
}

// Rolling hills — Kaiserstuhl / Breisgau vineyards as stacked arcs.
function HillsMark({ width = 400, height = 140, color = 'currentColor' }) {
  return (
    <svg width={width} height={height} viewBox="0 0 400 140" fill="none" stroke={color} strokeWidth="1.2">
      <path d="M0 110 Q60 70 120 90 T240 80 T400 100" opacity="0.25" />
      <path d="M0 120 Q80 85 160 100 T320 92 T400 110" opacity="0.4" />
      <path d="M0 130 Q100 105 200 118 T400 122" opacity="0.7" />
      {/* vineyard rows */}
      <g opacity="0.35">
        {Array.from({ length: 14 }).map((_, i) => (
          <path key={i} d={`M${i * 30} 128 L${i * 30 + 8} 136`} />
        ))}
      </g>
    </svg>
  );
}

// Contour lines — topographic reference to Schwarzwald.
function ContourMark({ width = 300, height = 300, color = 'currentColor' }) {
  return (
    <svg width={width} height={height} viewBox="0 0 300 300" fill="none" stroke={color} strokeWidth="0.8">
      {[140, 120, 100, 80, 60, 45, 30].map((r, i) => (
        <ellipse key={i} cx="150" cy="150" rx={r * 1.2} ry={r} opacity={0.15 + i * 0.08} transform={`rotate(${-12 + i * 2} 150 150)`} />
      ))}
    </svg>
  );
}

// Simple regional map — abstract Breisgau with Freiburg marker.
function RegionalMap({ theme, active = 'freiburg' }) {
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
      {/* Rhine river */}
      <path d="M60 40 Q50 140 70 220 Q90 310 50 400" fill="none" stroke={theme.accent} strokeWidth="2" opacity="0.4" />
      {/* Schwarzwald contour */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i}
          d={`M${240 + i * 8} ${100 + i * 6} Q${340 - i * 4} ${180 + i * 8} ${300 + i * 6} ${360 - i * 10}`}
          fill="none" stroke={theme.ink} strokeWidth="0.8" opacity={0.08 + i * 0.04} />
      ))}
      {/* Kaiserstuhl cluster */}
      <g opacity="0.35">
        <circle cx="80" cy="200" r="30" fill="none" stroke={theme.warm} strokeWidth="1" />
        <circle cx="90" cy="210" r="20" fill="none" stroke={theme.warm} strokeWidth="1" />
        <circle cx="70" cy="195" r="14" fill="none" stroke={theme.warm} strokeWidth="1" />
      </g>
      {/* places */}
      {places.map((p) => (
        <g key={p.id}>
          <circle cx={p.x} cy={p.y} r={p.main ? 7 : 3.5}
            fill={p.id === active ? theme.primary : 'transparent'}
            stroke={theme.primary} strokeWidth={p.main ? 2 : 1.2} />
          {p.id === active && p.main && (
            <circle cx={p.x} cy={p.y} r="14" fill="none" stroke={theme.primary} strokeWidth="1" opacity="0.35">
              <animate attributeName="r" values="10;20;10" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
          )}
          <text x={p.x + (p.main ? 14 : 8)} y={p.y + 4}
            fontSize={p.main ? 14 : 11} fontWeight={p.main ? 600 : 400}
            fill={theme.ink} fontFamily="inherit" letterSpacing="0.01em">
            {p.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

Object.assign(window, { ArchMark, SpireMark, HillsMark, ContourMark, RegionalMap });
