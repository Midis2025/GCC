import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ProseSection } from "@/components/sections/ProseSection";
import { Section } from "@/components/sections/Section";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  aboutCommunication,
  aboutHero,
  aboutHowWeWork,
  aboutPositioning,
  aboutPurpose,
  aboutRegion,
} from "@/data/about";
import { hasTeam, team } from "@/data/team";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  path: "/about",
  description:
    "GCC advises companies on investor relations, investor targeting and strategic communications across Gulf and international capital markets.",
});

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={aboutHero.eyebrow} title={aboutHero.title} lead={aboutHero.lead} />

      <ProseSection
        id="about-positioning"
        label={aboutPositioning.label}
        heading={aboutPositioning.heading}
        paragraphs={aboutPositioning.paragraphs}
      />

      <ProseSection
        id="about-purpose"
        label={aboutPurpose.label}
        heading={aboutPurpose.heading}
        paragraphs={aboutPurpose.paragraphs}
        tone="muted"
      />

      <ProseSection
        id="about-region"
        label={aboutRegion.label}
        heading={aboutRegion.heading}
        paragraphs={aboutRegion.paragraphs}
      />

      <ProseSection
        id="about-how-we-work"
        label={aboutHowWeWork.label}
        heading={aboutHowWeWork.heading}
        paragraphs={[aboutHowWeWork.intro]}
        tone="muted"
      >
        <DefinitionList items={aboutHowWeWork.modes} className="mt-10" />
      </ProseSection>

      <ProseSection
        id="about-communication"
        label={aboutCommunication.label}
        heading={aboutCommunication.heading}
        paragraphs={aboutCommunication.paragraphs}
      >
        <DefinitionList items={aboutCommunication.principles} className="mt-10" />
      </ProseSection>

      {/*
        Team section architecture.

        Rendered only when `data/team.ts` holds real people. No names, roles,
        photographs or biographies have been supplied and none may be invented,
        so while the array is empty this section does not exist in the markup -
        rather than showing placeholder cards or silhouettes.
      */}
      {hasTeam() && (
        <Section spacing="lg" tone="muted" aria-labelledby="about-team">
          <Reveal className="max-w-3xl">
            <SectionLabel>Team</SectionLabel>
            <Heading id="about-team" level={2} className="mt-7">
              The People Behind the Work
            </Heading>
          </Reveal>

          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <li key={member.name}>
                <Reveal delay={index * 80}>
                  <article className="border-t border-(--color-border) pt-6">
                    <h3 className="font-serif text-[1.375rem]">{member.name}</h3>
                    <p className="mt-1.5 text-label uppercase text-(--color-foreground-subtle)">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="mt-4 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                        {member.bio}
                      </p>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CTASection />
    </>
  );
}
