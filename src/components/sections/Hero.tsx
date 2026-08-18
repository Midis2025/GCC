import { HeroBackdrop } from "@/components/visuals/HeroBackdrop";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Image } from "@/components/ui/Image";
import { heroContent } from "@/data/homepage";
import { imageConfig } from "@/data/site";

/**
 * Homepage hero.
 *
 * Dark and typography-led. When client photography is supplied via
 * `imageConfig.hero` it replaces the authored backdrop automatically; until
 * then the drawn architectural treatment carries the section, which avoids
 * placeholder stock imagery entirely.
 *
 * The reveal is a CSS animation on mount (not scroll-triggered) so the hero
 * never waits on an observer for above-the-fold content.
 */
export function Hero() {
  const heroImage = imageConfig.hero;

  return (
    <section className="surface-dark relative isolate flex min-h-[max(38rem,88svh)] items-end overflow-hidden">
      {heroImage.src ? (
        <>
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            wrapperClassName="absolute inset-0 aspect-auto"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(100deg,#0c141d_15%,rgba(12,20,29,0.85)_50%,rgba(12,20,29,0.45)_100%)]"
          />
        </>
      ) : (
        <HeroBackdrop />
      )}

      <Container className="relative z-10 pb-[clamp(3.5rem,8vw,7rem)] pt-[calc(var(--header-h)+clamp(4rem,12vw,9rem))]">
        <div className="max-w-[54rem]">
          <p className="reveal text-label font-medium uppercase text-(--color-accent)" data-visible="true">
            {heroContent.eyebrow}
          </p>

          <Heading
            level={1}
            size="display"
            className="reveal mt-7 max-w-[20ch]"
            data-visible="true"
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            {heroContent.headline}
          </Heading>

          <p
            className="reveal mt-8 max-w-[58ch] text-lead text-(--color-foreground-muted)"
            data-visible="true"
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
          >
            {heroContent.supporting}
          </p>

          <div
            className="reveal mt-11 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4"
            data-visible="true"
            style={{ "--reveal-delay": "360ms" } as React.CSSProperties}
          >
            <Button href={heroContent.primaryCta.href} size="lg" withArrow>
              {heroContent.primaryCta.label}
            </Button>
            <Button href={heroContent.secondaryCta.href} size="lg" variant="outline">
              {heroContent.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
