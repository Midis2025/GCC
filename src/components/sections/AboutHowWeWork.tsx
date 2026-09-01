import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pick } from "@/content";
import { aboutClientsAr, aboutCommercialAr, commercialModelAr } from "@/content/ar/about";
import { aboutClients as aboutClientsEn, aboutCommercial as aboutCommercialEn } from "@/data/about";
import { commercialModel as commercialModelEn } from "@/data/site";

/**
 * How we work, and who we work with.
 *
 * The commercial position stated plainly, next to the sectors. Both
 * belong on About: a reader who wants to know what kind of firm this is is
 * asking two questions - how are you paid, and who is this for.
 *
 * COMPLIANCE: the exclusions come from `commercialModel` in `data/site.ts`
 * and are the same statements the What We Do page makes. They are compensation
 * statements, not marketing lines, and they are stated once from a single
 * source so the two pages can never disagree.
 */
export async function AboutHowWeWork() {
  const aboutClients = await pick({ en: aboutClientsEn, ar: aboutClientsAr });
  const aboutCommercial = await pick({ en: aboutCommercialEn, ar: aboutCommercialAr });
  const commercialModel = await pick({ en: commercialModelEn, ar: commercialModelAr });

  return (
    <Section spacing="lg" tone="muted" aria-labelledby="about-how-we-work">
      <div className="grid gap-x-20 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* How we work. */}
        <div>
          <Reveal>
            <SectionLabel>{aboutCommercial.label}</SectionLabel>
            <Heading
              id="about-how-we-work"
              level={2}
              size="h2"
              className="mt-5 max-w-[14ch]"
            >
              {aboutCommercial.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120} className="mt-8">
            <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
              {commercialModel.basis} {aboutCommercial.detail}
            </p>
          </Reveal>

          <Reveal delay={180} className="mt-10">
            <p className="text-label uppercase text-(--color-foreground-subtle)">
              {aboutCommercial.exclusionsLabel}
            </p>
            <ul className="mt-5 flex flex-col">
              {commercialModel.exclusions.map((item) => (
                <li
                  key={item}
                  className="border-t border-(--color-border) py-4 text-[1.0625rem]"
                >
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
