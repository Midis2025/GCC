import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Photo } from "@/data/imagery";

export interface MediaBandProps {
  photo: Photo;
  /** Short line set over the image, bottom-left. Optional. */
  caption?: string;
  /** Runs the image to the viewport edges instead of the content column. */
  bleed?: boolean;
  className?: string;
}

/**
 * Full-width cinematic image strip.
 *
 * Used as a palate cleanser between two text-heavy sections - a wide, quiet
 * frame that resets the eye without introducing another block of copy. It
 * reveals as a left-to-right wipe rather than a fade, which is the only
 * treatment on the site that moves horizontally.
 */
export function MediaBand({ photo, caption, bleed = true, className }: MediaBandProps) {
  const figure = (
    <Reveal variant="media" className="relative">
      <Figure
        photo={photo}
        ratio="cinema"
        overlay={caption ? "soft" : "veil"}
        grain
        sizes="100vw"
      />

      {caption && (
        <Container className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-8 sm:pb-10">
          <p className="max-w-[34ch] font-display text-[1.25rem] leading-snug text-[#f4f1eb] text-balance sm:text-[1.5rem]">
            {caption}
          </p>
        </Container>
      )}
    </Reveal>
  );

  return (
    <section aria-hidden={!caption} className={cn("relative", className)}>
      {bleed ? figure : <Container width="wide">{figure}</Container>}
    </section>
  );
}
