import NextImage from "next/image";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import type { Photo } from "@/data/imagery";

export interface EditorialStatementProps {
  id: string;
  /** Small uppercase label above the statement. Optional by design. */
  label?: string;
  statement: string;
  /**
   * Background photograph. Omitted, the band is flat midnight and the
   * statement carries it alone - which is the right treatment when the line is
   * the last thing before the call to action.
   */
  photo?: Photo;
  /**
   * How far back the photograph sits.
   *
   * `normal` scrims it to architecture behind the statement. `faint` pushes it
   * almost into the ground, for a frame that is texture rather than subject -
   * a bright skyline at `normal` competes with the line in front of it, and a
   * detailed city read at that strength also brings its signage with it.
   */
  photoStrength?: "normal" | "faint";
  /** Tightens the band where it is a transition rather than a destination. */
  compact?: boolean;
}

/**
 * Editorial statement band.
 *
 * One line, set large, with air around it. Used twice on the about page and
 * nowhere else: once as the transition out of the regional section, once as
 * the closing thought before the call to action.
 *
 * It is deliberately NOT a quotation. There is no speaker, no attribution and
 * no quotation marks, because inventing a person to say it would be inventing
 * a person - and a line this size in quotes reads as a testimonial whether or
 * not a name is attached. It is the firm's own statement, set as a statement.
 *
 * The band is a `<section>` with an `aria-labelledby` pointing at the
 * statement itself, so it is a landmark with a real name rather than an
 * anonymous region. The statement is an H2, which keeps the page outline
 * intact - one H1 in the hero, an H2 per section.
 */
export function EditorialStatement({
  id,
  label,
  statement,
  photo,
  photoStrength = "normal",
  compact = false,
}: EditorialStatementProps) {
  return (
    <section
      aria-labelledby={id}
      className={
        "tokens-dark relative isolate overflow-hidden bg-(--midnight) " +
        (compact
          ? "py-[var(--space-section-md)]"
          : "py-[var(--space-section-lg)]")
      }
    >
      {photo ? (
        <>
          {/*
            The photograph drifts on a scroll-progress timeline. The wrapper is
            oversized by more than the drift so neither end of the travel
            brings an edge into frame.
          */}
          <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
            <div className="about-parallax absolute inset-x-0 -top-[9%] -bottom-[9%]">
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
          </div>

          {/*
            A heavy diagonal scrim. The statement sits on the left, so the wash
            is heaviest there and opens toward the right where nothing is
            written - the photograph stays architecture where it can be seen
            and becomes flat ground where it cannot.
          */}
          <div
            aria-hidden="true"
            className={
              photoStrength === "faint"
                ? "absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(12,20,29,0.985)_10%,rgba(12,20,29,0.95)_46%,rgba(12,20,29,0.88)_100%)] rtl:bg-[linear-gradient(260deg,rgba(12,20,29,0.985)_10%,rgba(12,20,29,0.95)_46%,rgba(12,20,29,0.88)_100%)]"
                : "absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(12,20,29,0.95)_10%,rgba(12,20,29,0.84)_46%,rgba(12,20,29,0.6)_100%)] rtl:bg-[linear-gradient(260deg,rgba(12,20,29,0.95)_10%,rgba(12,20,29,0.84)_46%,rgba(12,20,29,0.6)_100%)]"
            }
          />
          <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
        </>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[radial-gradient(80%_100%_at_18%_50%,#182636_0%,#0f1924_55%,#0c141d_100%)]"
          />
          <div
            aria-hidden="true"
            className="about-grid absolute inset-0 -z-10 [--about-grid-gap:6.5rem]"
          />
        </>
      )}

      {/* Hairlines top and bottom, so the band reads as a deliberate cut. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.42),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.24),transparent)]"
      />

      <Container className="relative z-10">
        {label && (
          <Reveal>
            <p className="flex items-center gap-3 text-label uppercase text-(--color-accent)">
              <span aria-hidden="true" className="h-px w-10 bg-(--color-accent)" />
              <span>{label}</span>
            </p>
          </Reveal>
        )}

        <Reveal delay={label ? 120 : 0} variant="mask">
          <Heading
            id={id}
            level={2}
            size="display"
            className={label ? "mt-7 max-w-[20ch]" : "max-w-[20ch]"}
          >
            {statement}
          </Heading>
        </Reveal>

        <Reveal delay={260} className="mt-9">
          <span
            aria-hidden="true"
            className="about-rule block h-px w-full max-w-[16rem] bg-[linear-gradient(90deg,var(--color-accent),transparent)]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
