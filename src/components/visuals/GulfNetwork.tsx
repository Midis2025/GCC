import type { CSSProperties } from "react";

import { gulfMarkets } from "@/data/homepage";

/**
 * Abstract Gulf market orientation diagram.
 *
 * Deliberately NOT a glowing world map. Six Gulf market nodes sit on an arc
 * around a central hub, with a single dashed connection out to international
 * capital. Geometry is schematic, not geographic - it communicates market
 * orientation only, and the caption in `GulfOutreach` states that it implies
 * no offices, registrations or investor relationships.
 *
 * Motion: each connector draws itself from the hub outwards and the nodes fade
 * in behind it, sequenced by index. The animation is driven entirely by CSS in
 * globals.css and keys off `data-visible` on an enclosing <Reveal>, so this
 * stays a server component with no animation library and no client JavaScript.
 * Dash lengths are computed from real geometry so every link draws at the same
 * apparent speed regardless of how long it is.
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

/** Stagger step, in milliseconds, between successive connectors. */
const STEP = 90;

const delay = (ms: number) => ({ "--net-delay": `${ms}ms` }) as CSSProperties;

export function GulfNetwork() {
  const nodes = gulfMarkets.map((market) => {
    const position = positions[market.code] ?? { ...HUB, place: "above" as const };

    return {
      code: market.code,
      label: market.label,
      ...position,
      /** True length of the hub connector, so the dash animation is uniform. */
      length: Math.hypot(position.x - HUB.x, position.y - HUB.y),
    };
  });

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
        {nodes.map((node, index) => (
          <line
            key={`link-${node.code}`}
            className="net-link"
            x1={HUB.x}
            y1={HUB.y}
            x2={node.x}
            y2={node.y}
            style={{ ...delay(220 + index * STEP), "--dash-length": node.length } as CSSProperties}
          />
        ))}
      </g>

      {/*
        Outbound international connector. Dashed so it reads as distinct from
        the Gulf links, which is also why it fades in rather than drawing:
        the draw technique animates stroke-dashoffset, and a decorative
        dasharray cannot coexist with it on the same element.
      */}
      <line
        x1={HUB.x}
        y1={HUB.y}
        x2={INTERNATIONAL.x}
        y2={INTERNATIONAL.y}
        stroke="#b8945f"
        strokeOpacity="0.4"
        strokeWidth="1"
        strokeDasharray="3 6"
        className="net-node"
        style={delay(220 + nodes.length * STEP)}
      />

      {/* Market nodes */}
      {nodes.map((node, index) => (
        <g key={node.code} className="net-node" style={delay(420 + index * STEP)}>
          <circle cx={node.x} cy={node.y} r="3.5" fill="#b8945f" />
          <circle cx={node.x} cy={node.y} r="11" fill="none" stroke="#b8945f" strokeOpacity="0.28" />
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
      <g className="net-node" style={delay(420 + nodes.length * STEP)}>
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
      <g className="net-node" style={delay(120)}>
        <circle cx={HUB.x} cy={HUB.y} r="6" fill="#b8945f" />
        <circle cx={HUB.x} cy={HUB.y} r="18" fill="none" stroke="#b8945f" strokeOpacity="0.35" />
        <circle cx={HUB.x} cy={HUB.y} r="34" fill="none" stroke="#b8945f" strokeOpacity="0.14" />
      </g>
    </svg>
  );
}
