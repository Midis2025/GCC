import { Section } from "@/components/sections/Section";
import { ConnectedWorldMap, type MapNode } from "@/components/visuals/ConnectedWorldMap";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getDictionary } from "@/content";

export interface GlobalConnectionProps {
  id: string;
  label: string;
  heading: string;
  paragraphs: readonly string[];
  map: {
    nodes: readonly MapNode[];
    connections: readonly string[];
    captions?: readonly { term: string; detail: string }[];
  };
}

/**
 * ============================================================================
 * GLOBAL CONNECTION
 * ============================================================================
 * The editorial wrapper around `ConnectedWorldMap`: argument on the left, map
 * on the right, standing denial underneath.
 *
 * It exists so the map can appear on more than one page without the
 * surrounding markup being written out again each time - and, more usefully,
 * so the compliance line below the map cannot be forgotten on one of them. Any
 * page that renders the map renders that line, because they are the same
 * component.
 *
 * ---------------------------------------------------------------------------
 * COMPLIANCE
 * ---------------------------------------------------------------------------
 * `DENIAL` is standing text and is not optional, not collapsible and not a
 * footnote. A firm's name on a world map with lines running to four continents
 * is the single easiest image on this site to read as an office network, and
 * the line under it is what stops that reading. It says what the lines mean and
 * what they do not.
 *
 * Do not move it, do not shorten it, and do not put it behind an interaction.
 */
/**
 * The standing denial now lives in the chrome dictionary as `maps.denial`, so
 * that the four map surfaces on this site carry one sentence in two languages
 * rather than four copies of it in one. The English words are unchanged.
 */
export async function GlobalConnection({
  id,
  label,
  heading,
  paragraphs,
  map,
}: GlobalConnectionProps) {
  const t = await getDictionary();

  return (
    <Section
      spacing="lg"
      tone="dark"
      aria-labelledby={id}
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(72%_70%_at_60%_18%,#1a2836_0%,#0f1924_54%,#0c141d_100%)]"
      />

      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-x-20">
        <div>
          <Reveal>
            <span
              aria-hidden="true"
              className="about-rule mb-7 block h-px w-14 bg-[linear-gradient(90deg,var(--color-accent),transparent)]"
            />
            <SectionLabel>{label}</SectionLabel>
            <Heading id={id} level={2} size="display" className="mt-6 max-w-[14ch]">
              {heading}
            </Heading>
          </Reveal>

          <Reveal delay={140} className="mt-8 flex flex-col gap-5">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal delay={220}>
          <ConnectedWorldMap
            nodes={map.nodes}
            connections={map.connections}
            captions={map.captions}
          />
        </Reveal>
      </div>

      {/* COMPLIANCE. Standing text. See the note above. */}
      <Reveal delay={600}>
        <p className="mt-12 max-w-[76ch] border-t border-white/12 pt-8 text-sm leading-relaxed text-(--color-foreground-subtle)">
          {t.maps.denial}
        </p>
      </Reveal>
    </Section>
  );
}
