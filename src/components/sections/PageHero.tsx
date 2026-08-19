import type { ReactNode } from "react";
import NextImage from "next/image";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { HeroBackdrop } from "@/components/visuals/HeroBackdrop";
import { cn } from "@/lib/utils";
import type { Photo } from "@/data/imagery";

/**
 * Hero treatments.
 *
 * - `minimal` typographic only, on a drawn rule field. The quietest opening.
 * - `split`   oversized type beside a tall photograph. Editorial.
 * - `feature` full-bleed photography behind the type. The loudest opening.
 *
 * All three keep a dark top band. That is a hard constraint, not a stylistic
 * one: the header renders transparent over the top of the page and carries
 * `.surface-dark` while it does, so a light hero would leave the wordmark and
 * navigation unreadable until the first scroll. Variety comes from
 * composition, imagery and rhythm rather than from inverting the surface.
 */
export type PageHeroVariant = "minimal" | "split" | "feature";

export interface PageHeroProps {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  /** Supporting paragraph. Kept to a controlled measure. */
  lead?: string;
  /** Buttons or links rendered under the lead. */
  actions?: ReactNode;
  /** Editorial index, e.g. "02", shown on service detail pages. */
  index?: string;
  variant?: PageHeroVariant;
  /** Required by `split` and `feature`; ignored by `minimal`. */
  photo?: Photo;
  /** Rendered under the main column, e.g. a contents list or key figures. */
  children?: ReactNode;
  className?: string;
}

/**
 * Shared interior-page hero.
 *
 * Pads for the fixed header itself, which is why interior pages need no top
 * spacing of their own. Renders the page's single H1.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  index,
  variant = "minimal",
  photo,
  children,
  className,
}: PageHeroProps) {
  const isFeature = variant === "feature" && Boolean(photo);
  const isSplit = variant === "split" && Boolean(photo);

  return (
    <section
      className={cn(
        "tokens-dark relative isolate overflow-hidden bg-(--midnight)",
        "pb-[clamp(3.5rem,7vw,6rem)] pt-[calc(var(--header-h)+clamp(4rem,10vw,8rem))]",
        className,
      )}
    >
      {isFeature ? (
        <>
          <div aria-hidden="true" className="absolute inset-0 -z-20">
            <NextImage
              src={photo!.src}
              alt=""
              fill
              preload
              sizes="100vw"
              placeholder="blur"
              style={{ objectPosition: photo!.position }}
              className="photo-grade object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(102deg,rgba(12,20,29,0.96)_8%,rgba(12,20,29,0.86)_45%,rgba(12,20,29,0.6)_100%)]"
          />
          <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
        </>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[radial-gradient(110%_130%_at_78%_0%,#1b2937_0%,#111c27_48%,#0c141d_100%)]"
          />
          {/* The drawn geometry stands in for photography on minimal openings. */}
          <HeroBackdrop variant="overlay" className="opacity-40" />
        </>
      )}

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.35),transparent)]"
      />

      <Container className="relative z-10">
        <div
          className={cn(
            isSplit && "grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center",
          )}
        >
          <div className={cn(!isSplit && "max-w-[52rem]")}>
            <p className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-label font-medium uppercase text-(--color-accent)">
              {index && <span className="font-serif normal-case">{index}</span>}
              <span aria-hidden="true" className="h-px w-10 bg-(--color-accent)" />
              <span>{eyebrow}</span>
            </p>

            <Heading
              level={1}
              size={isSplit || isFeature ? "display" : "h1"}
              className={cn("mt-8", isSplit ? "max-w-[14ch]" : "max-w-[18ch]")}
            >
              {title}
            </Heading>

            {lead && (
              <p className="mt-8 max-w-[56ch] text-lead text-(--color-foreground-muted)">{lead}</p>
            )}

            {actions && (
              <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4">
                {actions}
              </div>
            )}
          </div>

          {isSplit && (
            <div className="relative lg:-mr-12 xl:-mr-16">
              <div className="media-frame relative aspect-[4/5] overflow-hidden">
                <NextImage
                  src={photo!.src}
                  alt={photo!.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  placeholder="blur"
                  style={{ objectPosition: photo!.position }}
                  className="photo-grade object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,20,29,0.5),transparent_55%)]"
                />
              </div>
            </div>
          )}
        </div>

        {children && <div className="mt-14">{children}</div>}
      </Container>
    </section>
  );
}
