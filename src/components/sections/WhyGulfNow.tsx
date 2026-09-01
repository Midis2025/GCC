import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { whyGulfNow } from "@/data/home";

/**
 * Why the Gulf, why now.
 *
 * A prose block against a measured list of the sectors named in it. The
 * argument is structural rather than numerical: there is appetite on one side,
 * companies on the other, and no route between them.
 *
 * COMPLIANCE: no forecasts and no figures. "Gulf capital has appetite for hard
 * assets" is an observation about what regional investors look at; any
 * sentence that sized that appetite, or predicted where it goes next, would be
 * a market forecast this firm cannot publish.
 *
 * Design: the split used by the purpose section on About, in the light tone.
 */
export function WhyGulfNow() {
  return (
    <Section spacing="lg" tone="muted" aria-labelledby="home-why-gulf">
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-x-24">
        <div>
          <Reveal>
            <SectionLabel>{whyGulfNow.label}</SectionLabel>
            <Heading id="home-why-gulf" level={2} size="display" className="mt-5 max-w-[14ch]">
              {whyGulfNow.heading}
            </Heading>
          </Reveal>

          <Reveal delay={140} className="mt-9 flex flex-col gap-5">
            {whyGulfNow.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <div className="lg:pt-2">
          <Reveal delay={200}>
            <p className="text-label uppercase text-(--color-foreground-subtle)">
              Where the appetite sits
            </p>
          </Reveal>

          <ul className="mt-7 flex flex-col">
            {whyGulfNow.sectors.map((sector, index) => (
              <Reveal key={sector} delay={240 + index * 80}>
                <li className="border-t border-(--color-border) py-5">
                  <span className="font-display text-[1.1875rem] leading-snug">{sector}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
