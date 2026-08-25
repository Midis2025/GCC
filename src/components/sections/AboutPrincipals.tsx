import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { aboutPrincipals } from "@/data/about";

/**
 * The two principals.
 *
 * Two entries, set as an editorial pair rather than as profile cards. No
 * photographs - none have been supplied, and a silhouette or a set of initials
 * in a circle is worse than the name alone.
 *
 * CONTENT INTEGRITY: every word of both biographies comes from the client's
 * factual direction. Nothing here may be extended with awards, employers, deal
 * history or years of experience, and the register must stay at "two capable
 * people" rather than drifting towards a firm pretending to be larger. See the
 * note on `aboutPrincipals` in `data/about.ts`.
 *
 * This is deliberately NOT a Team page. The brief rules one out at launch: two
 * principals do not need a page of their own, and giving them one invites the
 * question of who else there is.
 */
export function AboutPrincipals() {
  return (
    <Section spacing="lg" aria-labelledby="about-principals">
      <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <Reveal>
          <SectionLabel>{aboutPrincipals.label}</SectionLabel>
          <Heading id="about-principals" level={2} size="display" className="mt-5 max-w-[14ch]">
            {aboutPrincipals.heading}
          </Heading>
        </Reveal>

        <Reveal delay={120}>
          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
            {aboutPrincipals.intro}
          </p>
        </Reveal>
      </div>

      <ul className="mt-[var(--space-heading)] grid gap-x-16 gap-y-12 lg:grid-cols-2">
        {aboutPrincipals.people.map((person, index) => (
          <li key={person.name}>
            <Reveal delay={index * 110}>
              <div className="border-t border-(--color-border) pt-8">
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="font-display text-h3 tracking-tight">{person.name}</h3>
                  <span className="shrink-0 text-label uppercase text-(--color-accent)">
                    {person.location}
                  </span>
                </div>

                <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                  {person.bio}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
