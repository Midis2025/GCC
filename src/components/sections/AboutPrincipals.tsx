import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pick } from "@/content";
import { cn } from "@/lib/utils";
import { aboutPrincipalsAr } from "@/content/ar/about";
import { aboutPrincipals as aboutPrincipalsEn } from "@/data/about";

/**
 * The principals.
 *
 * Editorial entries rather than profile cards. No photographs - none have been
 * supplied, and a silhouette or a set of initials in a circle is worse than the
 * name alone.
 *
 * CONTENT INTEGRITY: every word of every biography comes from the client's
 * factual direction. Nothing here may be extended with awards, employers, deal
 * history or years of experience, and the register must stay at "capable
 * people" rather than drifting towards a firm pretending to be larger. See the
 * note on `aboutPrincipals` in `data/about.ts`.
 *
 * This is deliberately NOT a Team page. The brief rules one out at launch: a
 * principal does not need a page of their own, and giving them one invites the
 * question of who else there is.
 */
export async function AboutPrincipals() {
  const aboutPrincipals = await pick({ en: aboutPrincipalsEn, ar: aboutPrincipalsAr });

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

      {/*
        The second column appears only when there is something to put in it.

        This list is content-driven and currently holds ONE entry. A hard
        `lg:grid-cols-2` left that entry in a half-width column with an empty
        half beside it, which reads as a missing person rather than as a
        deliberate layout. Below the breakpoint nothing changes either way.

        `max-w` on the single-entry case stops the biography running to a
        90-character measure on a wide display now that no second column is
        holding it in.
      */}
      <ul
        className={cn(
          "mt-[var(--space-heading)] grid gap-x-16 gap-y-12",
          aboutPrincipals.people.length > 1 ? "lg:grid-cols-2" : "max-w-[46rem]",
        )}
      >
        {aboutPrincipals.people.map((person, index) => (
          <li key={person.name}>
            <Reveal delay={index * 110}>
              {/*
                A typographic monogram stands where a portrait would.

                No approved photographs of any principal exist and none may
                be generated, so the alternative to a picture is not a grey
                placeholder silhouette - it is type. The initials are set at
                display scale in the accent at low strength, which gives each
                biography a visual anchor of the right weight without asserting
                anything about a person's appearance.

                `aria-hidden`: the name is the heading directly beside it, and
                announcing the initials before the name is noise.

                Replace with a real portrait by dropping a `photo` onto the
                person record and swapping this span for a `Figure` - the
                surrounding grid already reserves the column for it.
              */}
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 border-t border-(--color-border) pt-8 sm:gap-x-8">
                <span
                  aria-hidden="true"
                  className="num font-display leading-none text-(--color-accent)/30 text-[clamp(2.25rem,4vw,3.25rem)]"
                >
                  {person.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>

                <div className="min-w-0">
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
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
