import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { arabicGap } from "@/data/home";

/**
 * The Arabic gap.
 *
 * One statement, one paragraph, one link. It sits on the home page rather than
 * inside the media service page because it is the clearest differentiator the
 * firm has, and a differentiator three clicks in is not one.
 *
 * Kept deliberately short. The observation is a single sentence and it lands
 * harder for not being surrounded by supporting argument - the service page is
 * where the argument lives.
 *
 * Design: the dark statement band the site already uses between light
 * sections, set with the existing grid field behind it. No photography: the
 * brief rules out new stock, and a statement this size does not need a picture
 * underneath it.
 */
export function ArabicGap() {
  return (
    <Section
      spacing="lg"
      tone="dark"
      aria-labelledby="home-arabic-gap"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(85%_80%_at_22%_12%,#1a2836_0%,#0f1924_54%,#0c141d_100%)]"
      />
      <div
        aria-hidden="true"
        className="about-grid absolute inset-0 -z-10 [--about-grid-gap:6.5rem]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.42),transparent)]"
      />

      <Reveal>
        <SectionLabel>{arabicGap.label}</SectionLabel>
      </Reveal>

      <Reveal delay={120} variant="mask">
        <Heading id="home-arabic-gap" level={2} size="display" className="mt-7 max-w-[20ch]">
          {arabicGap.statement}
        </Heading>
      </Reveal>

      <div className="mt-10 grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <Reveal delay={200}>
          <p className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
            {arabicGap.paragraph}
          </p>
        </Reveal>

        <Reveal delay={260} className="lg:justify-self-end">
          <Button href={arabicGap.cta.href} variant="outline" withArrow>
            {arabicGap.cta.label}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
