import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { industriesApproach } from "@/data/industries";

/**
 * How it applies.
 *
 * A split statement: the heading holds the left against an enormous ghosted
 * "NOT A TEMPLATE", the paragraphs sit right. It replaces the shared
 * `StatementBand` on this route only - that component is still used elsewhere
 * and is untouched.
 *
 * The ghost is the section's argument in two words. The heading says sector
 * knowledge is not the same as a sector template; setting the negative of that
 * at 12rem behind it, at four per cent, is the visual form of the same
 * sentence. It is `aria-hidden` and it is a fragment of the heading above it,
 * so nothing is said here that the heading does not already say.
 *
 * Sized so the two words fit the column at every width. An earlier pass ran a
 * single long word off the right edge, which reads as a rendering fault rather
 * than as depth - a word broken mid-stroke by nothing looks like a mistake,
 * however faint it is.
 */
export function IndustriesApproach() {
  return (
    <Section
      spacing="lg"
      tone="dark"
      aria-labelledby="industries-approach"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(85%_80%_at_18%_10%,#1a2836_0%,#0f1924_54%,#0c141d_100%)]"
      />
      <div
        aria-hidden="true"
        className="about-grid absolute inset-0 -z-10 [--about-grid-gap:6.5rem]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.42),transparent)]"
      />

      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-24">
        <div className="relative isolate">
          {/*
            The ghost. Two lines, so neither runs past the column.

            Dropped below `sm`. At phone widths it sits directly behind the
            eyebrow rather than behind the headline, and background typography
            crowding a 11px label does not read as depth - it reads as a smudge
            under text that is hard enough to read already.
          */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 -start-1 -z-10 hidden select-none font-display leading-[0.86] tracking-tight text-(--color-foreground)/[0.04] text-[clamp(3rem,7vw,6rem)] sm:block"
          >
            Not a
            <br />
            template.
          </span>

          <Reveal>
            <SectionLabel>{industriesApproach.label}</SectionLabel>
            <Heading
              id="industries-approach"
              level={2}
              size="display"
              className="mt-5 max-w-[15ch]"
            >
              {industriesApproach.heading}
            </Heading>
          </Reveal>

          <Reveal delay={200} className="mt-10">
            <span
              aria-hidden="true"
              className="about-rule block h-px w-full max-w-[15rem] bg-[linear-gradient(90deg,var(--color-accent),transparent)]"
            />
          </Reveal>
        </div>

        <Reveal delay={140} className="flex flex-col gap-6 lg:pt-3">
          {industriesApproach.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
