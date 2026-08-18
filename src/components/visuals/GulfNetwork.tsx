import { gulfMarkets } from "@/data/homepage";

/**
 * Abstract Gulf market orientation diagram.
 *
 * Deliberately NOT a glowing world map. Six GCC market nodes sit on an arc
 * around a central hub, with a single dashed connection out to international
 * capital. Geometry is schematic, not geographic - it communicates market
 * orientation only, and the caption in `GulfOutreach` states that it implies
 * no offices, registrations or investor relationships.
 *
 * Decorative, so the SVG is hidden from assistive technology; the same market
 * names are rendered as real text in the list beside it.
 */

interface NodePosition {
  x: number;
  y: number;
  /** Label placement relative to the node, to keep text off the connectors. */
  place: "above" | "below";
}

const HUB = { x: 232, y: 200 };
const INTERNATIONAL = { x: 512, y: 200 };

/**
 * Positions on a 620x400 canvas. Not to geographic scale.
 * Labels are placed so no text box overlaps the hub ring or another label.
 */
const positions: Record<string, NodePosition> = {
  BH: { x: 232, y: 78, place: "above" },
  KW: { x: 143, y: 118, place: "above" },
  SA: { x: 108, y: 210, place: "above" },
  OM: { x: 145, y: 296, place: "below" },
  AE: { x: 322, y: 268, place: "below" },
  QA: { x: 322, y: 132, place: "above" },
};

const LABEL_OFFSET = 22;

export function GulfNetwork() {
  const nodes = gulfMarkets.map((market) => ({
    code: market.code,
    label: market.label,
    ...(positions[market.code] ?? { ...HUB, place: "above" as const }),
  }));

  return (
    <svg
      viewBox="0 0 620 400"
      className="h-auto w-full"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="gcc-link" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b8945f" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#b8945f" stopOpacity="0.14" />
        </linearGradient>
      </defs>

      {/* Hub-to-market connectors */}
      <g stroke="url(#gcc-link)" strokeWidth="1">
        {nodes.map((node) => (
          <line key={`link-${node.code}`} x1={HUB.x} y1={HUB.y} x2={node.x} y2={node.y} />
        ))}
      </g>

      {/* Outbound international connector, dashed so it reads as distinct */}
      <line
        x1={HUB.x}
        y1={HUB.y}
        x2={INTERNATIONAL.x}
        y2={INTERNATIONAL.y}
        stroke="#b8945f"
        strokeOpacity="0.4"
        strokeWidth="1"
        strokeDasharray="3 6"
      />

      {/* Market nodes */}
      {nodes.map((node) => (
        <g key={node.code}>
          <circle cx={node.x} cy={node.y} r="3.5" fill="#b8945f" />
          <circle
            cx={node.x}
            cy={node.y}
            r="11"
            fill="none"
            stroke="#b8945f"
            strokeOpacity="0.28"
          />
          <text
            x={node.x}
            y={node.place === "above" ? node.y - LABEL_OFFSET : node.y + LABEL_OFFSET + 6}
            textAnchor="middle"
            className="fill-current text-[11px] uppercase"
            style={{ letterSpacing: "0.14em" }}
            opacity="0.7"
          >
            {node.label}
          </text>
        </g>
      ))}

      {/* International capital endpoint - label split so it stays in frame */}
      <g>
        <circle
          cx={INTERNATIONAL.x}
          cy={INTERNATIONAL.y}
          r="5"
          fill="none"
          stroke="#b8945f"
          strokeWidth="1"
        />
        <text
          x={INTERNATIONAL.x}
          y={INTERNATIONAL.y - 34}
          textAnchor="middle"
          className="fill-current text-[11px] uppercase"
          style={{ letterSpacing: "0.14em" }}
          opacity="0.7"
        >
          <tspan x={INTERNATIONAL.x} dy="0">
            International
          </tspan>
          <tspan x={INTERNATIONAL.x} dy="15">
            Capital
          </tspan>
        </text>
      </g>

      {/* Hub */}
      <circle cx={HUB.x} cy={HUB.y} r="6" fill="#b8945f" />
      <circle cx={HUB.x} cy={HUB.y} r="18" fill="none" stroke="#b8945f" strokeOpacity="0.35" />
      <circle cx={HUB.x} cy={HUB.y} r="34" fill="none" stroke="#b8945f" strokeOpacity="0.14" />
    </svg>
  );
}
