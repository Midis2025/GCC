import NextImage from "next/image";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { photos } from "@/data/imagery";

/**
 * The Riyadh moment.
 *
 * The photograph was previously a 21:9 frame inside the approach section,
 * where it was a picture next to some text. Here it is the full width of the
 * viewport and roughly two thirds of its height, with the page's other content
 * stopping either side of it - the one place on this route where an image is
 * the subject rather than a setting.
 *
 * Almost nothing is written over it, deliberately. A single line in the lower
 * left, and the rest of the frame left alone: the brief for this section was
 * large negative space, and a full-bleed photograph earns its scale by being
 * looked at rather than by carrying a paragraph.
 *
 * ---------------------------------------------------------------------------
 * Content integrity
 * ---------------------------------------------------------------------------
 * This is Riyadh, and Riyadh is named repeatedly in the copy on this page - but
 * the photograph shows a city, not the firm. Its `alt` describes the
 * photograph. The line set over it names the city and nothing else: no
 * office, no presence, no claim about work done there. See
 * `public/images/CREDITS.md`.
 */
export function AboutRiyadh() {
  const photo = photos.regionStreet;

  return (
    <section
      className="tokens-dark relative isolate flex min-h-[max(22rem,62svh)] flex-col justify-end overflow-hidden bg-(--midnight) py-[clamp(2.5rem,5vw,4rem)]"
      aria-label="Riyadh"
    >
      {/*
        Parallax. The wrapper is oversized by more than the drift distance, so
        neither end of the travel exposes an edge, and the drift itself runs on
        a scroll-progress timeline rather than a scroll listener.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        <div className="about-parallax absolute inset-x-0 -top-[10%] -bottom-[10%]">
          <NextImage
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            style={{ objectPosition: photo.position }}
            className="photo-grade object-cover"
          />
        </div>
      </div>

      {/*
        Two scrims rather than one. The vertical wash holds the line along the
        bottom edge; the wide vignette pulls the corners down so the frame sits
        inside the page instead of glowing out of it.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(12,20,29,0.92)_0%,rgba(12,20,29,0.45)_38%,rgba(12,20,29,0.18)_72%,rgba(12,20,29,0.3)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(110%_90%_at_50%_50%,transparent_38%,rgba(12,20,29,0.55)_100%)]"
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.32),transparent)]"
      />

      <Container className="relative z-10">
        <Reveal>
          <p className="flex items-center gap-3.5 text-label uppercase text-(--color-accent)">
            <span aria-hidden="true" className="h-px w-10 bg-(--color-accent)" />
            <span>Riyadh</span>
          </p>
        </Reveal>

        <Reveal delay={140}>
          {/*
            One line. It restates the section above it - Gulf markets have
            their own reporting rhythms and conventions - and asserts nothing
            about the firm's presence in the city in the photograph.
          */}
          <p className="mt-5 max-w-[26ch] font-display text-[1.5rem] leading-snug text-balance sm:text-[1.875rem]">
            Six markets, read separately.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
