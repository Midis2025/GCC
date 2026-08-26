"use client";

import { useState } from "react";

import { WORLD, project } from "@/data/world-map";
import { cn } from "@/lib/utils";

export interface MapNode {
  id: string;
  lon: number;
  lat: number;
  label: string;
  /**
   * `hub` is the Gulf Connect marker and there is at most one.
   * `regional` are the Gulf markets. `origin` are international points.
   */
  kind: "hub" | "regional" | "origin";
  /** One short line shown when the node is hovered, focused or tapped. */
  detail?: string;
  /** Which side the label sits on. Set where the default would run off-frame. */
  side?: "left" | "right";
  /**
   * Vertical nudge for the label, in viewBox units.
   *
   * Needed where two nodes are close enough that their labels overlap. Riyadh
   * and Abu Dhabi are 8 degrees of longitude and half a degree of latitude
   * apart, which at this scale puts their labels on top of each other.
   */
  labelDy?: number;
  /** Hidden below `sm`, for nodes that would collide on a phone. */
  compact?: boolean;
}

export interface ConnectedWorldMapProps {
  /** Node ids to connect to the hub, in draw order. */
  connections: readonly string[];
  nodes: readonly MapNode[];
  /** Short captions set around the frame. Kept to a few words each. */
  captions?: readonly { term: string; detail: string }[];
  className?: string;
}

/**
 * ============================================================================
 * CONNECTED WORLD MAP
 * ============================================================================
 * Real geography rather than an abstract node graph.
 *
 * It replaces a four-line cross diagram that said nothing about where any of
 * this happens: an X with a circle in the middle reads as a generic technology
 * network, and the one thing this business needs a picture to say is that it
 * sits between international companies and the Gulf.
 *
 * The land outline is public-domain Natural Earth data baked into
 * `data/world-map.ts` as a single path - no map library, no runtime request,
 * crisp at any size. Nodes are placed by real longitude and latitude through
 * `project()`, so Dubai is where Dubai is.
 *
 * ---------------------------------------------------------------------------
 * What the connections mean, and what they must not
 * ---------------------------------------------------------------------------
 * A line from London to the UAE represents CROSS-BORDER COMPANY AND MARKET
 * CONNECTIVITY. It does not represent an office, a registration, a licence or
 * a relationship, and no caption may be written that implies one - the section
 * using this component carries that denial in standing text.
 *
 * The origins are deliberately broad ("Europe", "North America") or are named
 * financial centres that any international issuer would recognise. They are
 * not a client map.
 *
 * ---------------------------------------------------------------------------
 * Interaction
 * ---------------------------------------------------------------------------
 * Pointer, keyboard and touch all drive the same state. Each node is a real
 * `<button>` inside a list beside the map rather than a hit target on the SVG:
 * the SVG is `aria-hidden` throughout, so a screen reader gets a list of named
 * places instead of duplicated geometry, and a 4px circle never has to be
 * tapped on a phone. Same arrangement as `MarketMap`, for the same reasons.
 */
export function ConnectedWorldMap({
  connections,
  nodes,
  captions,
  className,
}: ConnectedWorldMapProps) {
  const [active, setActive] = useState<string | null>(null);

  const hub = nodes.find((n) => n.kind === "hub");
  const byId = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox={`0 0 ${WORLD.width} ${WORLD.height}`}
        className="h-auto w-full"
        role="presentation"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id="worldmap-halo">
            <stop offset="0%" stopColor="#b8945f" stopOpacity="0.34" />
            <stop offset="55%" stopColor="#b8945f" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#b8945f" stopOpacity="0" />
          </radialGradient>

          {/*
            Fades the frame at top and bottom. It softens the crop into the
            section rather than ending on a hard edge, and it absorbs the thin
            remnant of Arctic coastline sitting on the very top line.
          */}
          <linearGradient id="worldmap-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="9%" stopColor="#fff" stopOpacity="1" />
            <stop offset="90%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
          <mask id="worldmap-mask">
            <rect width={WORLD.width} height={WORLD.height} fill="url(#worldmap-fade)" />
          </mask>
        </defs>

        <g mask="url(#worldmap-mask)">
          {/* Graticule. Every 30 degrees, at the edge of visibility. */}
          <g stroke="#f4f1eb" strokeOpacity="0.045" strokeWidth="1">
            {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lon) => {
              const [x] = project(lon, 0);
              return <line key={`m${lon}`} x1={x} y1={0} x2={x} y2={WORLD.height} />;
            })}
            {[60, 30, 0, -30].map((lat) => {
              const [, y] = project(0, lat);
              return <line key={`p${lat}`} x1={0} y1={y} x2={WORLD.width} y2={y} />;
            })}
          </g>

          {/* Landmasses. */}
          <path
            className="worldmap-land"
            d={WORLD.d}
            fill="#f4f1eb"
            fillOpacity="0.11"
            stroke="#f4f1eb"
            strokeOpacity="0.2"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />

          {/* The halo under the hub. */}
          {hub && (
            <circle
              className="worldmap-halo"
              cx={project(hub.lon, hub.lat)[0]}
              cy={project(hub.lon, hub.lat)[1]}
              r="88"
              fill="url(#worldmap-halo)"
            />
          )}

          {/* Connections, as shallow arcs from each origin into the hub. */}
          {hub &&
            connections.map((id, index) => {
              const node = byId.get(id);
              if (!node) return null;
              const [x1, y1] = project(node.lon, node.lat);
              const [x2, y2] = project(hub.lon, hub.lat);

              /*
                Control point lifted perpendicular to the chord, scaled by its
                length, so a short regional hop curves gently and a transatlantic
                line curves more - the arcs read as one family rather than as
                arbitrary bends.
              */
              const dx = x2 - x1;
              const dy = y2 - y1;
              const len = Math.hypot(dx, dy);
              const lift = Math.min(len * 0.22, 96);
              const cx = (x1 + x2) / 2 + (dy / (len || 1)) * lift * 0.35;
              const cy = (y1 + y2) / 2 - lift;

              const isDim = active !== null && active !== id;
              const isOn = active === id;

              return (
                <path
                  key={id}
                  className={cn(
                    "worldmap-link",
                    isOn && "worldmap-link-on",
                    isDim && "worldmap-link-dim",
                  )}
                  style={
                    {
                      "--link-length": Math.round(len * 1.25),
                      "--link-delay": `${index * 150}ms`,
                    } as React.CSSProperties
                  }
                  d={`M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`}
                  fill="none"
                  stroke="#b8945f"
                  strokeWidth={isOn ? 1.5 : 1}
                  strokeLinecap="round"
                />
              );
            })}

          {/* Nodes. */}
          {nodes.map((node, index) => {
            const [x, y] = project(node.lon, node.lat);
            const isHub = node.kind === "hub";
            const isOn = active === node.id;
            const isDim = active !== null && !isOn && !isHub;

            return (
              <g
                key={node.id}
                className={cn(
                  "worldmap-node",
                  isDim && "worldmap-node-dim",
                  node.compact && "worldmap-node-compact",
                )}
                style={{ "--node-delay": `${index * 90}ms` } as React.CSSProperties}
              >
                {isHub && (
                  <circle
                    className="worldmap-ring"
                    cx={x}
                    cy={y}
                    r="13"
                    fill="none"
                    stroke="#b8945f"
                    strokeOpacity="0.55"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isHub ? 5 : isOn ? 4.2 : 3.2}
                  fill={node.kind === "origin" && !isOn ? "#f4f1eb" : "#b8945f"}
                  fillOpacity={node.kind === "origin" && !isOn ? 0.72 : 1}
                />
              </g>
            );
          })}

          {/* Labels. */}
          {nodes.map((node, index) => {
            const [x, y] = project(node.lon, node.lat);
            const right = node.side !== "left";
            const isHub = node.kind === "hub";
            const isDim = active !== null && active !== node.id && !isHub;

            return (
              <text
                key={`label-${node.id}`}
                className={cn(
                  "worldmap-label num font-display-sm",
                  isDim && "worldmap-label-dim",
                  node.compact && "worldmap-node-compact",
                )}
                style={{ "--node-delay": `${index * 90 + 120}ms` } as React.CSSProperties}
                x={right ? x + (isHub ? 17 : 9) : x - (isHub ? 17 : 9)}
                y={y + 3.5 + (node.labelDy ?? 0)}
                textAnchor={right ? "start" : "end"}
                fill="#f4f1eb"
                fillOpacity={isHub ? 0.96 : 0.74}
                fontSize={isHub ? 13 : 11}
                letterSpacing="1.4"
              >
                {node.label.toUpperCase()}
              </text>
            );
          })}
        </g>
      </svg>

      {/*
        The controls. Real buttons, and the only way the map is operated.
        Ordered hub first, then regional, then international - which is the
        order the section argues in.
      */}
      <ul className="mt-8 flex flex-wrap gap-x-2.5 gap-y-2.5">
        {nodes.map((node) => (
          <li key={`btn-${node.id}`}>
            <button
              type="button"
              aria-pressed={active === node.id}
              onClick={() => setActive(active === node.id ? null : node.id)}
              onMouseEnter={() => setActive(node.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(node.id)}
              onBlur={() => setActive(null)}
              data-active={active === node.id ? "true" : "false"}
              className="about-market group relative block px-3.5 py-2 text-[0.875rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring)"
            >
              <span
                aria-hidden="true"
                className="about-market-frame absolute inset-0 border border-(--color-border)"
              />
              <span className="relative">{node.label}</span>
            </button>
          </li>
        ))}
      </ul>

      {/*
        The detail line for the active node.

        Rendered in a fixed-height block so selecting a node never reflows the
        section below it - a caption that appears and disappears while the
        pointer moves along a row of buttons would shunt the page each time.
      */}
      <p
        aria-live="polite"
        className="mt-5 min-h-[1.5rem] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)"
      >
        {active ? byId.get(active)?.detail : ""}
      </p>

      {captions && captions.length > 0 && (
        <dl className="mt-9 grid gap-x-10 gap-y-6 border-t border-(--color-border) pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {captions.map((caption) => (
            <div key={caption.term}>
              <dt className="text-label uppercase text-(--color-accent)">{caption.term}</dt>
              <dd className="mt-2 max-w-[34ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                {caption.detail}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
