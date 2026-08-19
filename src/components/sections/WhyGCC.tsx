import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { whyContent } from "@/data/homepage";
import { cn } from "@/lib/utils";

/**
 * Differentiation pillars.
 *
 * A sticky statement holds the left column while four plates stack down the
 * right, each offset from its neighbour so the column reads as floating rather
 * than as a list of equal boxes. An oversized ghosted numeral sits behind each
 * title - the same numeral treatment used on the timeline and the capability
 * rows, at a different weight, which is what ties the page together while
 * keeping the sections visually distinct.
 *
 * No figures appear anywhere in this section by design - no investor counts,
 * transaction values or years of experience, since none have been supplied and
 * none would be verifiable.
 */
export function WhyGCC() {
  return (
    <Section
      spacing="lg"
      tone="dark"
      aria-labelledby="why-heading"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(85%_75%_at_18%_12%,#1a2836_0%,#0f1924_52%,#0c141d_100%)]"
      />
      <div
        aria-hidden="true"
        className="rule-field absolute inset-y-0 right-0 -z-10 w-[45%] [--rule-gap:6rem]"
      />

      <div className="grid gap-x-20 gap-y-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+4rem)]">
            <SectionLabel>{whyContent.label}</SectionLabel>
            <Heading id="why-heading" level={2} size="display" className="mt-7 max-w-[12ch]">
              {whyContent.heading}
            </Heading>
            <p className="mt-8 max-w-[40ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
              Four things shape how every engagement is run, whatever its scope.
            </p>
          </Reveal>
        </div>

        <ul className="flex flex-col gap-5">
          {whyContent.pillars.map((pillar, index) => (
            <li key={pillar.title}>
              <Reveal
                delay={index * 90}
                className={cn(
                  "relative isolate overflow-hidden border border-white/12 bg-white/[0.035] p-7 backdrop-blur-sm sm:p-9",
                  "transition-colors duration-500 hover:border-(--color-accent)/45 hover:bg-white/[0.06]",
                  /* Alternating inset, so the stack steps rather than aligns. */
                  index % 2 === 1 && "lg:ml-14",
                )}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-5 -z-10 font-serif text-[7rem] leading-none text-white/[0.045]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="font-serif text-sm text-(--color-accent)">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-h4 font-medium tracking-tight">{pillar.title}</h3>
                <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  {pillar.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
