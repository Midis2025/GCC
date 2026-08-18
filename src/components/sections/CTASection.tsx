import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { ctaContent } from "@/data/homepage";

/**
 * Final call to action.
 *
 * Full-width dark surface. Depth comes from a single soft radial wash and one
 * accent hairline rather than gradients or glass effects.
 */
export function CTASection() {
  return (
    <Section
      spacing="lg"
      tone="dark"
      className="relative isolate overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_50%_0%,#1a2836_0%,#0c141d_62%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.5),transparent)]"
      />

      <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Heading id="cta-heading" level={2} size="h1">
          {ctaContent.heading}
        </Heading>

        <p className="mt-7 max-w-[52ch] text-lead text-(--color-foreground-muted)">
          {ctaContent.supporting}
        </p>

        <div className="mt-11 flex w-full justify-center">
          <Button href={ctaContent.cta.href} size="lg" withArrow>
            {ctaContent.cta.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
