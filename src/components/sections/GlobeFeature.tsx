import NextImage from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlobeExperience } from "@/components/visuals/GlobeExperience";
import { backdrops } from "@/data/imagery";

export interface GlobeFeatureProps {
  id: string;
  label: string;
  heading: string;
  paragraphs: readonly string[];
  /** The short list set against the globe. Named things, never counts. */
  categories: readonly string[];
  /** The heading above that list. */
  categoriesLabel?: string;
  /** Optional. Omitted where the section is an argument rather than an offer. */
  cta?: { label: string; href: string };
}

/**
 * Globe feature - the strongest section on the page.
 *
 * Full-bleed photography rather than a flat dark band, which is what
 * distinguishes it from the capability section above and the approach timeline
 * below. The image is fixed behind a heavy scrim; the diagram sits on glass
 * over it and draws itself in as the section enters view.
 *
 * `tokens-dark` rather than `surface-dark`: identical token inversion for
 * every child, but no painted background, so the photograph shows through.
 *
 * Content integrity: the diagram is decorative, the same market names are
 * rendered as real text beside it, and the caption states explicitly that it
 * implies no offices, registrations or investor relationships.
 */
export function GlobeFeature({
  id,
  label,
  heading,
  paragraphs,
  categories,
  categoriesLabel,
  cta,
}: GlobeFeatureProps) {
  const photo = backdrops.outreach;

  return (
    <section
      className="tokens-dark relative isolate overflow-hidden bg-(--midnight) py-[var(--space-section-lg)]"
      aria-labelledby={id}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <NextImage
          src={photo.src}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          style={{ objectPosition: photo.position }}
          className="photo-grade object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(102deg,rgba(12,20,29,0.97)_10%,rgba(12,20,29,0.88)_46%,rgba(12,20,29,0.62)_100%)]"
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      {/* Hairline top and bottom edges, so the band reads as a deliberate cut. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.45),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.28),transparent)]"
      />

      <Container className="relative z-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-20">
          <div>
            <Reveal>
              <SectionLabel>{label}</SectionLabel>
              <Heading id={id} level={2} size="display" className="mt-5 max-w-[14ch]">
                {heading}
              </Heading>
            </Reveal>

            <Reveal delay={120} className="mt-8 flex max-w-[56ch] flex-col gap-5">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            {categoriesLabel && (
              <Reveal delay={180} className="mt-11">
                <p className="text-label uppercase text-(--color-foreground-subtle)">
                  {categoriesLabel}
                </p>
              </Reveal>
            )}

            <ul
              className={categoriesLabel ? "mt-6 grid gap-x-8 sm:grid-cols-2" : "mt-11 grid gap-x-8 sm:grid-cols-2"}
            >
              {categories.map((category, index) => (
                <li key={category}>
                  <Reveal
                    delay={200 + index * 60}
                    className="flex items-center gap-3 border-b border-white/12 py-3.5 text-[0.9375rem]"
                  >
                    <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-(--color-accent)" />
                    {category}
                  </Reveal>
                </li>
              ))}
            </ul>

            {/*
              Optional, and omitted where this band is making an argument
              rather than asking for something. A section that closes on a
              control implies the reader is being routed somewhere; "here is a
              gap in the market" is not that section.
            */}
            {cta && (
              <Reveal delay={260} className="mt-11">
                <Button href={cta.href} size="lg" withArrow>
                  {cta.label}
                </Button>
              </Reveal>
            )}
          </div>

          {/*
            The globe sits directly on the photograph rather than on a glass
            plate. It carries its own atmosphere and its own floating panel, and
            boxing that inside a second surface flattened both - the plate is
            what the diagram it replaced needed, not what this needs.

            Market names, the information panel and the integrity caption all
            live inside `GlobeExperience` as real text, so the section reads
            identically with the canvas chunk missing.
          */}
          <Reveal delay={160}>
            <GlobeExperience />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
