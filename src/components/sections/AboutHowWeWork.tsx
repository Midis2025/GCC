import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { aboutClients } from "@/data/about";
import { commercialModel } from "@/data/site";

/**
 * How we work, and who we work with.
 *
 * The commercial position stated plainly, next to the three sectors. Both
 * belong on About: a reader who wants to know what kind of firm this is is
 * asking two questions - how are you paid, and who is this for.
 *
 * COMPLIANCE: the three exclusions come from `commercialModel` in
 * `data/site.ts` and are the same three statements the What We Do page makes.
 * They are compensation statements, not marketing lines, and they are stated
 * once from a single source so the two pages can never disagree.
 */
export function AboutHowWeWork() {
  return (
    <Section spacing="lg" tone="muted" aria-labelledby="about-how-we-work">
      <div className="grid gap-x-20 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* How we work. */}
        <div>
          <Reveal>
            <SectionLabel>How We Work</SectionLabel>
            <Heading
              id="about-how-we-work"
              level={2}
              size="h2"
              className="mt-5 max-w-[14ch]"
            >
              Fixed Fees, Defined Scope, Written Reporting
            </Heading>
          </Reveal>

          <Reveal delay={120} className="mt-8">
            <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
              {commercialModel.basis} Every engagement is agreed in advance against what will be
              prepared, convened, produced and reported, and reported on in writing while it runs.
            </p>
          </Reveal>

          <Reveal delay={180} className="mt-10">
            <p className="text-label uppercase text-(--color-foreground-subtle)">
              What we are not paid for
            </p>
            <ul className="mt-5 flex flex-col">
              {commercialModel.exclusions.map((item, index) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-t border-(--color-border) py-4 text-[1.0625rem]"
                >
                  <span
                    aria-hidden="true"
                    className="num font-display-sm text-[0.625rem] tracking-[0.14em] text-(--color-accent)"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Who we work with. */}
        <div>
          <Reveal delay={100}>
            <SectionLabel>{aboutClients.label}</SectionLabel>
            <Heading level={2} size="h2" className="mt-5 max-w-[16ch]">
              {aboutClients.heading}
            </Heading>
          </Reveal>

          <Reveal delay={160} className="mt-8 flex flex-col gap-5">
            {aboutClients.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <dl className="mt-10 flex flex-col">
            {aboutClients.sectors.map((sector, index) => (
              <Reveal key={sector.term} delay={220 + index * 80}>
                <div className="border-t border-(--color-border) py-5">
                  <dt className="text-[1.0625rem] font-medium">{sector.term}</dt>
                  <dd className="mt-2 max-w-[48ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {sector.description}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
