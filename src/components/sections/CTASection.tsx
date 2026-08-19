import NextImage from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { backdrops } from "@/data/imagery";
import { ctaContent } from "@/data/homepage";

/**
 * Final call to action.
 *
 * The last full-bleed photographic moment on every page, and the counterpart
 * to the hero: where the hero anchors its type to the left over a wide frame,
 * this centres a single oversized statement. A heavy scrim plus grain keeps it
 * firmly in the palette rather than letting the photograph take over.
 *
 * A secondary action sits beside the primary one so the section offers a route
 * for visitors not yet ready to make contact.
 */
export function CTASection() {
  const photo = backdrops.cta;

  return (
    <section
      className="tokens-dark relative isolate overflow-hidden bg-(--midnight) py-[var(--space-section-lg)]"
      aria-labelledby="cta-heading"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <NextImage
          src={photo.src}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          style={{ objectPosition: photo.position }}
          className="photo-grade object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_100%_at_50%_50%,rgba(12,20,29,0.86)_0%,rgba(12,20,29,0.95)_58%,#0c141d_100%)]"
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.5),transparent)]"
      />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal variant="mask">
            <Heading id="cta-heading" level={2} size="display">
              {ctaContent.heading}
            </Heading>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-8 max-w-[52ch] text-lead text-(--color-foreground-muted)">
              {ctaContent.supporting}
            </p>
          </Reveal>

          <Reveal
            delay={260}
            className="mt-11 flex w-full flex-col items-center gap-3 xs:flex-row xs:flex-wrap xs:justify-center xs:gap-4"
          >
            <Button href={ctaContent.cta.href} size="lg" withArrow>
              {ctaContent.cta.label}
            </Button>
            <Button href="/services" size="lg" variant="outline">
              Explore Our Capabilities
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
