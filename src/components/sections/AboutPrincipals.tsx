import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Figure } from "@/components/ui/Figure";
import { pick } from "@/content";
import { principalPhotos } from "@/data/imagery";
import { cn } from "@/lib/utils";
import { aboutPrincipalsAr } from "@/content/ar/about";
import { aboutPrincipals as aboutPrincipalsEn } from "@/data/about";

/**
 * The principals.
 *
 * Editorial entries rather than profile cards.
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
 *
 * ---------------------------------------------------------------------------
 * WHY THE HEADING AND THE PROFILE SIT SIDE BY SIDE
 * ---------------------------------------------------------------------------
 * They used to be stacked: the heading and its statement across the top, then
 * the profile beneath them capped at 46rem. That left 356px of empty canvas
 * down the right of a 1920 display and ran the section to 540px at 1440 for
 * one photograph and three sentences - which is what made it read as
 * unfinished rather than as spacious.
 *
 * The two are now one row. The section is shorter, the width is used, and the
 * heading and the person it introduces are read together rather than one after
 * the other.
 */
export async function AboutPrincipals() {
  const aboutPrincipals = await pick({ en: aboutPrincipalsEn, ar: aboutPrincipalsAr });

  return (
    <Section spacing="lg" aria-labelledby="about-principals">
      <div
        className={cn(
          "grid gap-y-10",
          "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]",
          "lg:gap-x-[clamp(2.5rem,5vw,6rem)]",
        )}
      >
        {/*
          One rule, the full width of the content, and it is ordered rather
          than placed.

          On a wide display it spans both columns as the first row, so the
          heading and the profile below it start against a single line that
          runs the whole measure - the grid's own width, not a fragment of it.
          Stacked, `order` puts it back between the introduction and the
          profile, which is where it belongs when they are one above the other.
        */}
        <span
          aria-hidden="true"
          className="order-2 block h-px w-full bg-(--color-border) lg:order-1 lg:col-span-2"
        />

        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionLabel>{aboutPrincipals.label}</SectionLabel>
            <Heading id="about-principals" level={2} size="display" className="mt-5 max-w-[12ch]">
              {aboutPrincipals.heading}
            </Heading>
            {/*
              The statement sits under the heading it belongs to rather than
              across the page from it. At 46ch it used to set as a single line
              stranded in the right column; here it is the third line of the
              same block.
            */}
            <p className="mt-6 max-w-[32ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
              {aboutPrincipals.intro}
            </p>
          </Reveal>
        </div>

        <ul
          className={cn(
            "order-3 grid gap-x-16 gap-y-12",
            aboutPrincipals.people.length > 1 && "sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2",
          )}
        >
          {aboutPrincipals.people.map((person, index) => (
            <li key={person.name}>
              <Reveal delay={index * 110}>
                {/*
                  Photograph and biography as one unit: the portrait to the
                  side from `sm` up, above it on a phone where there is no side
                  to put it on.

                  A portrait where there is one, and a typographic monogram
                  where there is not. The monogram was never a placeholder
                  graphic - it is what this section shows when no approved
                  photograph exists, because a grey silhouette asserts
                  something about a person's appearance and a set of initials
                  does not. It stays for exactly that case.

                  The frame carries the image's own 555x819 rather than a ratio
                  from the set: a portrait cropped to 3:4 loses about a tenth of
                  its height, and on a head-and-shoulders shot that comes off
                  the top of the head. `ratio="auto"` plus the aspect written
                  out means nothing is cropped at all.

                  Sizes are per breakpoint because the portrait is doing a
                  different job at each. 10.5rem is 168px wide and 248px tall,
                  inside the range this section was specified at; 11.5rem on a
                  phone, where it stands on its own above the name rather than
                  beside it and can afford to be wider than it is on a laptop.

                  A hairline border, not a card. The photograph is a dark
                  rectangle on a cream ground and the rule settles it there
                  without turning it into a panel.

                  `aria-hidden` on the monogram, `alt=""` on the portrait: the
                  name is the heading directly beside either one, and
                  announcing initials or a description before it is noise.
                */}
                <div className="grid gap-y-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-x-8">
                  {principalPhotos[person.name as keyof typeof principalPhotos] ? (
                    <Figure
                      photo={principalPhotos[person.name as keyof typeof principalPhotos]}
                      ratio="auto"
                      className="aspect-[555/819] w-[11.5rem] shrink-0 border border-(--color-border) sm:w-[9rem] lg:w-[10.5rem]"
                      sizes="(min-width: 1024px) 168px, (min-width: 640px) 144px, 184px"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="num font-display leading-none text-(--color-accent)/30 text-[clamp(2.25rem,4vw,3.25rem)]"
                    >
                      {person.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                  )}

                  <div className="min-w-0">
                    {/*
                      Capped to the biography’s own measure, not the column’s.

                      `justify-between` pushes the city label to the end of
                      whatever box it is in. Uncapped that is the full text
                      column, which put the label past the end of the longest
                      line of copy - most visibly in Arabic, where the shorter
                      translation left it stranded against the column edge with
                      nothing under it. At 44ch it lands on the same vertical as
                      the biography beneath it in both editions.
                    */}
                    <div className="flex max-w-[44ch] items-baseline justify-between gap-6">
                      <h3 className="font-display text-h3 tracking-tight">{person.name}</h3>
                      <span className="shrink-0 text-label uppercase text-(--color-accent)">
                        {person.location}
                      </span>
                    </div>

                    <p className="mt-4 max-w-[44ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                      {person.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
