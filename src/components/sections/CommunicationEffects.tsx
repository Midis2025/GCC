import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pick } from "@/content";
import { communicationEffectsAr, workBehindTheRoomAr } from "@/content/ar/about";
import {
  communicationEffects as communicationEffectsEn,
  workBehindTheRoom as workBehindTheRoomEn,
} from "@/data/about-depth";

/**
 * ============================================================================
 * WHAT GOOD COMMUNICATION DOES  /  A MEETING IS THE VISIBLE PART
 * ============================================================================
 * Two sections in one file because they are one argument in two halves - what
 * communication is for, then what producing it actually costs in work - and
 * separating them into two files would leave each half looking like a
 * fragment.
 *
 * They are composed differently on purpose. `CommunicationEffects` is a 2x2
 * field of oversized verbs on a dark ground; `WorkBehindTheRoom` is three
 * quiet columns on cream. Placed consecutively, the pair reads as a statement
 * followed by its accounting rather than as one section repeated at two sizes.
 *
 * ---------------------------------------------------------------------------
 * COMPLIANCE
 * ---------------------------------------------------------------------------
 * Every verb below describes a property of the COMMUNICATION, never an effect
 * Gulf Connect produces in a market. "Clarifies what the business is" is a
 * statement about clarity; "clarifies the market's view of your business"
 * would be a claim about third parties. Read `data/about-depth.ts` before
 * editing any of the four.
 */
export async function CommunicationEffects() {
  const communicationEffects = await pick({
    en: communicationEffectsEn,
    ar: communicationEffectsAr,
  });

  return (
    <Section
      spacing="lg"
      tone="dark"
      aria-labelledby="about-communication-effects"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(80%_72%_at_78%_10%,#1a2836_0%,#0f1924_54%,#0c141d_100%)]"
      />
      <div
        aria-hidden="true"
        className="about-grid absolute inset-0 -z-10 [--about-grid-gap:7.5rem]"
      />

      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-24">
        <Reveal>
          <SectionLabel>{communicationEffects.label}</SectionLabel>
          <Heading
            id="about-communication-effects"
            level={2}
            size="display"
            className="mt-5 max-w-[13ch]"
          >
            {communicationEffects.heading}
          </Heading>
        </Reveal>

        <Reveal delay={140}>
          <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
            {communicationEffects.intro}
          </p>
        </Reveal>
      </div>

      {/*
        A 2x2 field rather than a row of four. Four across at this type size
        gives each verb a column too narrow to set it in, and the site already
        has several four-across rows; a quartet reads as a field.
      */}
      <ul className="mt-[var(--space-heading)] grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:gap-x-20">
        {communicationEffects.effects.map((effect, index) => (
          <li key={effect.term} className="border-t border-white/12 pt-8">
            <Reveal delay={index * 110}>
              <h3 className="font-display text-h2 leading-none">{effect.term}</h3>
              <p className="mt-6 max-w-[42ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                {effect.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/**
 * The accounting: three columns of work either side of the visible part.
 *
 * Cream, quiet and deliberately unshowy - it follows a dark field of oversized
 * verbs, and the contrast is what makes the pair work. The middle column is
 * the shortest of the three, which is the section's argument made by layout.
 */
export async function WorkBehindTheRoom() {
  const workBehindTheRoom = await pick({ en: workBehindTheRoomEn, ar: workBehindTheRoomAr });

  return (
    <Section spacing="lg" aria-labelledby="about-work-behind">
      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-x-24">
        <Reveal>
          <SectionLabel>{workBehindTheRoom.label}</SectionLabel>
          <Heading id="about-work-behind" level={2} size="h2" className="mt-5 max-w-[15ch]">
            {workBehindTheRoom.heading}
          </Heading>
        </Reveal>

        <Reveal delay={140}>
          <p className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
            {workBehindTheRoom.intro}
          </p>
        </Reveal>
      </div>

      <ol className="mt-[var(--space-heading)] grid gap-x-12 gap-y-10 sm:grid-cols-3">
        {workBehindTheRoom.stages.map((stage, index) => (
          <li
            key={stage.key}
            className={
              /*
                The middle column is inset and ruled on both sides, so the
                three read as a passage through rather than as three equals.
              */
              index === 1
                ? "sm:border-x sm:border-(--color-border) sm:px-10"
                : undefined
            }
          >
            <Reveal delay={index * 120}>
              <span
                aria-hidden="true"
                className="block h-px w-10 bg-(--color-accent)"
              />
              <h3 className="mt-6 text-h4 font-medium tracking-tight">{stage.term}</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {stage.items.map((item) => (
                  <li
                    key={item}
                    className="text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
