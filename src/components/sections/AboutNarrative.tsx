import type { CSSProperties } from "react";

import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { aboutCommunication } from "@/data/about";

const CANVAS = { w: 620, h: 400 };
const CENTRE = { x: 138, y: 200 };
const ENDPOINT_X = 418;
const ENDPOINT_Y = [86, 200, 314];

const delay = (ms: number) => ({ "--net-delay": `${ms}ms` }) as CSSProperties;

/**
 * The one-narrative diagram.
 *
 * A centre and three lines. It is drawn rather than illustrated: no boxes, no
 * arrowheads, no rounded process blocks - a flowchart would say "here is a
 * workflow", and the point being made is the opposite one, that three
 * expressions are the same account of a business rather than three steps in a
 * pipeline.
 *
 * Motion reuses the site's existing `.net-link` / `.net-node` mechanism, the
 * same one behind the Gulf orientation diagram: each connector draws itself
 * outward from the centre and the endpoints fade in behind it, sequenced by
 * index and keyed off `data-visible` on the enclosing `Reveal`. That is what
 * keeps this a server component - no animation library, no client JavaScript,
 * and `prefers-reduced-motion` already handled where those rules live.
 *
 * Dash lengths are computed from real geometry so the middle connector, which
 * is shorter than the two diagonals, still draws at the same apparent speed.
 *
 * Decorative: the SVG is hidden from assistive technology and the same three
 * channel names are rendered as real text in the list beneath it.
 */
function NarrativeDiagram() {
  const channels = aboutCommunication.narrative.channels;

  return (
    <svg
      viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`}
      className="h-auto w-full"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/*
          `userSpaceOnUse`, and it is not a stylistic preference.

          A gradient in the default objectBoundingBox units is resolved against
          each stroked element's own box - and the middle connector is exactly
          horizontal, so its box is zero pixels high. A degenerate box makes
          the gradient undefined, the paint resolves to nothing, and that line
          simply did not render: two of three connectors drew and the one
          pointing at Media was invisible.

          Given real coordinates the gradient is one field across the whole
          canvas, which every line samples the same way regardless of its
          angle - and the fade from centre to endpoint now reads consistently
          across all three rather than restarting on each.
        */}
        <linearGradient
          id="about-narrative-link"
          gradientUnits="userSpaceOnUse"
          x1={CENTRE.x}
          y1={CENTRE.y}
          x2={ENDPOINT_X}
          y2={CENTRE.y}
        >
          <stop offset="0%" stopColor="#b8945f" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#b8945f" stopOpacity="0.16" />
        </linearGradient>
      </defs>

      {/* Connectors, centre outward. */}
      <g stroke="url(#about-narrative-link)" strokeWidth="1">
        {ENDPOINT_Y.map((y, index) => (
          <line
            key={`link-${index}`}
            className="net-link"
            x1={CENTRE.x}
            y1={CENTRE.y}
            x2={ENDPOINT_X}
            y2={y}
            style={
              {
                ...delay(260 + index * 120),
                "--dash-length": Math.hypot(ENDPOINT_X - CENTRE.x, y - CENTRE.y),
              } as CSSProperties
            }
          />
        ))}
      </g>

      {/* Endpoints: the three expressions. */}
      {channels.map((channel, index) => {
        const y = ENDPOINT_Y[index];

        return (
          <g key={channel.term} className="net-node" style={delay(520 + index * 120)}>
            <circle cx={ENDPOINT_X} cy={y} r="3.25" fill="#b8945f" />
            <circle
              cx={ENDPOINT_X}
              cy={y}
              r="10"
              fill="none"
              stroke="#b8945f"
              strokeOpacity="0.3"
            />
            <text
              x={ENDPOINT_X + 26}
              y={y - 4}
              className="fill-current text-[15px]"
              opacity="0.92"
            >
              {channel.term}
            </text>
            <text
              x={ENDPOINT_X + 26}
              y={y + 17}
              className="fill-current text-[11.5px]"
              opacity="0.5"
            >
              {channel.of}
            </text>
          </g>
        );
      })}

      {/* The centre. */}
      <g className="net-node" style={delay(120)}>
        <circle cx={CENTRE.x} cy={CENTRE.y} r="5.5" fill="#b8945f" />
        <circle
          cx={CENTRE.x}
          cy={CENTRE.y}
          r="17"
          fill="none"
          stroke="#b8945f"
          strokeOpacity="0.38"
        />
        <circle
          cx={CENTRE.x}
          cy={CENTRE.y}
          r="33"
          fill="none"
          stroke="#b8945f"
          strokeOpacity="0.15"
        />
        <text
          x={CENTRE.x}
          y={CENTRE.y - 56}
          textAnchor="middle"
          className="fill-current text-[15px] uppercase"
          style={{ letterSpacing: "0.14em" }}
          opacity="0.82"
        >
          <tspan x={CENTRE.x} dy="0">
            Corporate
          </tspan>
          <tspan x={CENTRE.x} dy="19">
            Narrative
          </tspan>
        </text>
      </g>
    </svg>
  );
}

/**
 * Approach.
 *
 * The copy explains that investor relations, media and digital communication
 * are run from one narrative; the diagram beside it shows the shape of that
 * claim. Both are needed - the paragraphs carry the argument, the diagram
 * carries the structure, and neither repeats the other.
 *
 * The three channel names appear twice by design: once as SVG text inside the
 * decorative diagram, and once as a real list underneath it. The list is what
 * assistive technology reads, and it is also the fallback if the diagram is
 * ever too small to label legibly.
 */
export function AboutNarrative() {
  const { centre, channels } = aboutCommunication.narrative;

  return (
    <Section spacing="lg" aria-labelledby="about-communication">
      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-x-20">
        <div>
          <Reveal>
            <SectionLabel>{aboutCommunication.label}</SectionLabel>
            <Heading id="about-communication" level={2} size="h2" className="mt-5 max-w-[13ch]">
              {aboutCommunication.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120} className="mt-8 flex flex-col gap-5">
            {aboutCommunication.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal delay={160} className="surface-dark relative isolate overflow-hidden p-6 sm:p-9">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_28%_50%,#182636_0%,#101b27_58%,#0c141d_100%)]"
          />

          <NarrativeDiagram />

          {/*
            The accessible counterpart to the diagram, and the reason the SVG
            can be hidden outright. Reads as a caption; carries the content.
          */}
          <dl className="mt-8 border-t border-(--color-border) pt-6">
            <dt className="text-label uppercase text-(--color-accent)">{centre}</dt>
            <dd className="mt-3 text-sm leading-relaxed text-(--color-foreground-subtle)">
              Expressed as{" "}
              {channels.map((channel, index) => (
                <span key={channel.term}>
                  <span className="text-(--color-foreground-muted)">{channel.term}</span>
                  {index < channels.length - 2 ? ", " : null}
                  {index === channels.length - 2 ? " and " : null}
                </span>
              ))}
              .
            </dd>
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
