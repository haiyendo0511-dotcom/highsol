import type { BlogDiagram as BlogDiagramType } from "@/content/blog";

export function BlogDiagram({ diagram }: { diagram: BlogDiagramType }) {
  return (
    <figure className="blog-diagram">
      <div className="blog-diagram-frame">
        {diagram.type === "center-vs-cantilever" && <CenterVsCantileverDiagram />}
        {diagram.type === "pool-deck-layout" && <PoolDeckLayoutDiagram />}
        {diagram.type === "oem-workflow" && <OemWorkflowDiagram />}
      </div>
      <figcaption className="blog-diagram-caption">{diagram.caption}</figcaption>
    </figure>
  );
}

function CenterVsCantileverDiagram() {
  return (
    <svg
      viewBox="0 0 800 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="diagram-svg"
      role="img"
      aria-label="Illustrative schematic comparing central mast placement and offset cantilever envelopes"
    >
      <rect width="800" height="340" rx="4" fill="var(--surface)" />
      <line x1="400" y1="20" x2="400" y2="320" stroke="var(--line)" strokeDasharray="4 4" />

      {/* LEFT: Center-Pole Elevation */}
      <g transform="translate(40, 20)">
        <text x="160" y="24" textAnchor="middle" fill="var(--marine)" fontSize="12" fontWeight="700" letterSpacing="0.08em">
          CENTER-POLE MAST PLACEMENT
        </text>

        {/* Canopy triangle */}
        <polygon
          points="160,56 40,136 280,136"
          fill="color-mix(in srgb, var(--marine) 12%, transparent)"
          stroke="var(--marine)"
          strokeWidth="1.75"
        />

        {/* Shaded ground footprint */}
        <rect
          x="50"
          y="226"
          width="220"
          height="38"
          rx="3"
          fill="color-mix(in srgb, var(--sand) 22%, transparent)"
          stroke="var(--sand)"
          strokeWidth="1.25"
          strokeDasharray="3 3"
        />
        <text x="160" y="250" textAnchor="middle" fill="var(--ink)" fontSize="11" fontWeight="600">
          Shaded Floor Area (Central Mast)
        </text>

        {/* Center Mast */}
        <line x1="160" y1="56" x2="160" y2="276" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" />

        {/* Base */}
        <rect x="120" y="272" width="80" height="9" rx="2" fill="var(--ink)" />
        <text x="160" y="300" textAnchor="middle" fill="var(--muted)" fontSize="11">
          Central Base
        </text>

        {/* Furniture indications */}
        <rect x="70" y="190" width="60" height="28" rx="2" fill="var(--paper-soft)" stroke="var(--line)" />
        <rect x="190" y="190" width="60" height="28" rx="2" fill="var(--paper-soft)" stroke="var(--line)" />
        <text x="100" y="208" textAnchor="middle" fill="var(--muted)" fontSize="10">Lounger A</text>
        <text x="220" y="208" textAnchor="middle" fill="var(--muted)" fontSize="10">Lounger B</text>
      </g>

      {/* RIGHT: Cantilever Elevation */}
      <g transform="translate(440, 20)">
        <text x="160" y="24" textAnchor="middle" fill="var(--marine)" fontSize="12" fontWeight="700" letterSpacing="0.08em">
          CANTILEVER MAST PLACEMENT
        </text>

        {/* Offset Mast and Boom Arm */}
        <line x1="40" y1="276" x2="40" y2="50" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M40,50 Q60,40 100,40 L190,40" fill="none" stroke="var(--ink)" strokeWidth="3" />
        <line x1="190" y1="40" x2="190" y2="56" stroke="var(--ink)" strokeWidth="2" />

        {/* Suspended Canopy */}
        <polygon
          points="190,56 80,136 300,136"
          fill="color-mix(in srgb, var(--marine) 12%, transparent)"
          stroke="var(--marine)"
          strokeWidth="1.75"
        />

        {/* Shaded ground footprint */}
        <rect
          x="80"
          y="226"
          width="220"
          height="38"
          rx="3"
          fill="color-mix(in srgb, var(--marine) 16%, transparent)"
          stroke="var(--marine)"
          strokeWidth="1.25"
        />
        <text x="190" y="250" textAnchor="middle" fill="var(--marine-strong)" fontSize="11" fontWeight="600">
          Open Floor Area Beneath Canopy
        </text>

        {/* Offset Base */}
        <rect x="15" y="270" width="60" height="12" rx="2" fill="var(--ink)" />
        <text x="45" y="300" textAnchor="middle" fill="var(--muted)" fontSize="11">
          Offset Base
        </text>

        {/* Modular Seating */}
        <rect x="100" y="190" width="180" height="28" rx="2" fill="var(--paper-soft)" stroke="var(--line)" />
        <text x="190" y="208" textAnchor="middle" fill="var(--muted)" fontSize="10">
          Lounge Seating Area
        </text>
      </g>
    </svg>
  );
}

function PoolDeckLayoutDiagram() {
  return (
    <svg
      viewBox="0 0 800 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="diagram-svg"
      role="img"
      aria-label="Illustrative deck zoning plan indicating pool water edge, lounger shade modules, and circulation walkways"
    >
      <rect width="800" height="340" rx="4" fill="var(--surface)" />

      {/* ZONE 1: Pool Water */}
      <rect x="20" y="20" width="160" height="300" rx="3" fill="color-mix(in srgb, var(--marine) 18%, transparent)" stroke="var(--marine)" strokeWidth="1.25" />
      <text x="100" y="160" textAnchor="middle" fill="var(--marine-strong)" fontSize="12" fontWeight="700" letterSpacing="0.06em">
        POOL BASIN
      </text>
      <text x="100" y="180" textAnchor="middle" fill="var(--muted)" fontSize="11">
        Water Edge
      </text>

      {/* ZONE 2: Deck Perimeter Buffer */}
      <rect x="180" y="20" width="90" height="300" fill="color-mix(in srgb, var(--sand) 16%, transparent)" stroke="var(--sand)" strokeWidth="1" strokeDasharray="3 3" />
      <g transform="translate(225, 170) rotate(-90)">
        <text x="0" y="0" textAnchor="middle" fill="var(--ink)" fontSize="11" fontWeight="600">
          Poolside Walking Perimeter
        </text>
      </g>

      {/* ZONE 3: Lounger & Shade Tier */}
      <rect x="270" y="20" width="320" height="300" rx="3" fill="var(--paper-soft)" stroke="var(--line)" />
      <text x="430" y="44" textAnchor="middle" fill="var(--marine)" fontSize="12" fontWeight="700" letterSpacing="0.06em">
        SHADE &amp; LOUNGER MODULE
      </text>

      {/* Lounger pair 1 */}
      <rect x="290" y="65" width="110" height="55" rx="2" fill="var(--surface)" stroke="var(--line)" />
      <rect x="290" y="130" width="110" height="55" rx="2" fill="var(--surface)" stroke="var(--line)" />
      <text x="345" y="98" textAnchor="middle" fill="var(--muted)" fontSize="10">Lounger A</text>
      <text x="345" y="163" textAnchor="middle" fill="var(--muted)" fontSize="10">Lounger B</text>

      {/* Canopy Footprint Overlay */}
      <circle cx="360" cy="125" r="80" fill="color-mix(in srgb, var(--marine) 14%, transparent)" stroke="var(--marine)" strokeWidth="1.25" strokeDasharray="4 4" />
      <circle cx="360" cy="125" r="5" fill="var(--marine-strong)" />
      <text x="360" y="112" textAnchor="middle" fill="var(--marine-strong)" fontSize="9" fontWeight="700">MAST</text>

      {/* Lounger pair 2 */}
      <rect x="290" y="205" width="110" height="50" rx="2" fill="var(--surface)" stroke="var(--line)" />
      <rect x="290" y="265" width="110" height="50" rx="2" fill="var(--surface)" stroke="var(--line)" />

      {/* Afternoon Solar Displacement */}
      <path d="M475,85 Q495,130 460,190" fill="none" stroke="var(--sand)" strokeWidth="2" />
      <text x="505" y="135" textAnchor="middle" fill="var(--ink)" fontSize="10" fontWeight="600">
        Solar Shift
      </text>
      <text x="505" y="150" textAnchor="middle" fill="var(--muted)" fontSize="9">
        Afternoon Movement
      </text>

      {/* ZONE 4: Circulation Corridor */}
      <rect x="590" y="20" width="190" height="300" rx="3" fill="color-mix(in srgb, var(--line) 25%, transparent)" stroke="var(--line)" />
      <text x="685" y="150" textAnchor="middle" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="0.05em">
        CIRCULATION ROUTE
      </text>
      <text x="685" y="172" textAnchor="middle" fill="var(--marine)" fontSize="11" fontWeight="600">
        Walking &amp; Service Path
      </text>
    </svg>
  );
}

function OemWorkflowDiagram() {
  return (
    <svg
      viewBox="0 0 800 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="diagram-svg"
      role="img"
      aria-label="Illustrative flowchart showing the four phases of OEM and private-label parasol preparation"
    >
      <rect width="800" height="230" rx="4" fill="var(--surface)" />

      {[
        { step: "PHASE 01", title: "Project Scope", sub: "Quantities, assortment, destination context", x: 20 },
        { step: "PHASE 02", title: "Specification", sub: "Frame finish, canopy textile, hardware notes", x: 215 },
        { step: "PHASE 03", title: "Sample Review", sub: "Prototype review, operational checks", x: 410 },
        { step: "PHASE 04", title: "Handoff & Packing", sub: "Inspection checkpoints, packaging, dispatch", x: 605 },
      ].map((item, idx) => (
        <g key={item.step} transform={`translate(${item.x}, 30)`}>
          <rect width="175" height="160" rx="4" fill="var(--paper-soft)" stroke="var(--line)" strokeWidth="1" />
          <rect x="0" y="0" width="175" height="30" rx="3" fill="var(--marine-strong)" />
          <text x="87" y="20" textAnchor="middle" fill="var(--surface)" fontSize="11" fontWeight="700" letterSpacing="0.08em">
            {item.step}
          </text>
          <text x="87" y="62" textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="700">
            {item.title}
          </text>
          <line x1="25" y1="78" x2="150" y2="78" stroke="var(--line)" strokeWidth="1" />
          <foreignObject x="15" y="88" width="145" height="60">
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                lineHeight: "1.45",
                color: "var(--muted)",
                textAlign: "center",
              }}
            >
              {item.sub}
            </p>
          </foreignObject>

          {idx < 3 && (
            <path
              d="M180,80 L190,80"
              stroke="var(--marine)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </g>
      ))}
    </svg>
  );
}
