import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { proposition } from "@/data/home";

/**
 * Convene, Place, Produce.
 *
 * Three columns on a light surface, built from the indexed-column treatment
 * the site already uses - a bronze index, a rule, a term and a paragraph. No
 * cards, no icons, no new pattern.
 *
 * Each entry is a verb describing work performed. That is not a stylistic
 * choice: the difference between "convene qualified investors for structured
 * meetings" and "connect you with investors who will invest" is the difference
 * between describing a service and promising an outcome, and only one of those
 * is a thing an unlicensed firm may say.
 */
export function Proposition() {
  return (
    <Section spacing="lg" aria-labelledby="home-proposition">
      <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <Reveal>
          <SectionLabel>{proposition.label}</SectionLabel>
          <Heading id="home-proposition" level={2} size="display" className="mt-5 max-w-[14ch]">
            {proposition.heading}
          </Heading>
        </Reveal>
      </div>

      <ul className="mt-[var(--space-heading)] grid gap-x-14 gap-y-12 lg:grid-cols-3">
        {proposition.items.map((item, index) => (
          <li key={item.term}>
            <Reveal delay={index * 100}>
              <div className="border-t border-(--color-border) pt-7">
                <span
                  aria-hidden="true"
                  className="num font-display-sm text-[0.6875rem] tracking-[0.14em] text-(--color-accent)"
                >
                  {item.number}
                </span>

                <h3 className="mt-5 text-h3 font-medium tracking-tight">{item.term}</h3>

                <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  {item.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
