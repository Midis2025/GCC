import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { continuity } from "@/data/home-depth";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * MARKET PRESENCE IS BUILT THROUGH CONTINUITY
 * ============================================================================
 * One visit set against a running programme, as a split.
 *
 * ---------------------------------------------------------------------------
 * COMPLIANCE, and it governs the whole design
 * ---------------------------------------------------------------------------
 * This compares two SHAPES OF WORK. It does not compare two sets of results.
 * Nothing here says a programme performs better, produces more meetings, or
 * leads anywhere a visit does not - it says a programme contains more work,
 * which is a fact about scope.
 *
 * That is why the second column is set brighter but NOT labelled better, why
 * neither column carries a tick, a cross or a score, and why the items are
 * nouns describing activity rather than benefits. A comparison table with a
 * winning column would be a performance claim by layout, whatever the words
 * said. Do not add one.
 *
 * The visual asymmetry does the work instead: the visit column is quiet and
 * the programme column is lit and taller, because one genuinely contains more
 * than the other. The reader draws the conclusion; the page does not state it.
 */
export function ContinuityCompare() {
  return (
    <Section spacing="lg" aria-labelledby="home-continuity">
      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-24">
        <Reveal>
          <SectionLabel>{continuity.label}</SectionLabel>
          <Heading id="home-continuity" level={2} size="display" className="mt-5 max-w-[15ch]">
            {continuity.heading}
          </Heading>
        </Reveal>

        <Reveal delay={140}>
          <p className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
            {continuity.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-[var(--space-heading)] grid gap-x-0 gap-y-10 sm:grid-cols-2">
        {continuity.columns.map((column, index) => {
          const isProgramme = column.key === "programme";

          return (
            <Reveal key={column.key} delay={index * 160}>
              <div
                className={cn(
                  "relative h-full",
                  /*
                    A single vertical rule between the two, drawn by the second
                    column rather than as a separate element - so it cannot
                    fall out of alignment with the columns it divides, and it
                    disappears with them when they stack.
                  */
                  isProgramme
                    ? "sm:border-s sm:border-(--color-border) sm:ps-10 lg:ps-14"
                    : "sm:pe-10 lg:pe-14",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-px w-full",
                    isProgramme ? "bg-(--color-accent)" : "bg-(--color-border)",
                  )}
                />

                <p
                  className={cn(
                    "mt-7 text-label uppercase",
                    isProgramme
                      ? "text-(--color-accent)"
                      : "text-(--color-foreground-subtle)",
                  )}
                >
                  {column.label}
                </p>

                <h3
                  className={cn(
                    "mt-5 max-w-[16ch] font-display leading-snug text-balance",
                    isProgramme ? "text-h2" : "text-h3 text-(--color-foreground-muted)",
                  )}
                >
                  {column.term}
                </h3>

                <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  {column.description}
                </p>

                <ul className="mt-9 flex flex-col gap-3.5">
                  {column.items.map((entry) => (
                    <li
                      key={entry}
                      className={cn(
                        "flex items-start gap-3.5 text-[0.9375rem] leading-relaxed",
                        isProgramme
                          ? "text-(--color-foreground)"
                          : "text-(--color-foreground-muted)",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-2.5 h-px w-3.5 shrink-0",
                          isProgramme
                            ? "bg-(--color-accent)"
                            : "bg-(--color-foreground-subtle)",
                        )}
                      />
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
