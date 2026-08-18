import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GulfNetwork } from "@/components/visuals/GulfNetwork";
import { gulfMarkets, outreachContent } from "@/data/homepage";

/**
 * Gulf investor outreach feature - the strongest section on the page.
 *
 * Dark surface for contrast against the neutral canvas above and below. The
 * market diagram is decorative; the same market names are also rendered as
 * text so the information is available without the graphic, and the caption
 * states explicitly that the diagram implies no offices or relationships.
 */
export function GulfOutreach() {
  return (
    <Section spacing="lg" tone="dark" aria-labelledby="outreach-heading">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
        <Reveal>
          <SectionLabel>{outreachContent.label}</SectionLabel>
          <Heading id="outreach-heading" level={2} className="mt-7 max-w-[18ch]">
            {outreachContent.heading}
          </Heading>

          <div className="mt-8 flex max-w-[56ch] flex-col gap-5">
            {outreachContent.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {outreachContent.categories.map((category) => (
              <li
                key={category}
                className="flex items-center gap-3 border-b border-(--color-border) pb-3 text-[0.9375rem] text-(--color-foreground)"
              >
                <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-(--color-accent)" />
                {category}
              </li>
            ))}
          </ul>

          <div className="mt-11">
            <Button href={outreachContent.cta.href} size="lg" withArrow>
              {outreachContent.cta.label}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={140} className="lg:pl-6">
          <GulfNetwork />

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {gulfMarkets.map((market) => (
              <li key={market.code} className="text-label uppercase text-(--color-foreground-subtle)">
                {market.label}
              </li>
            ))}
            <li className="text-label uppercase text-(--color-foreground-subtle)">
              International Capital
            </li>
          </ul>

          <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
            {outreachContent.disclaimer}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
