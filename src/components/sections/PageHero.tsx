import type { CSSProperties, ReactNode } from "react";
import NextImage from "next/image";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import type { Photo } from "@/data/imagery";

/**
 * Hero treatments.
 *
 * - `feature` full-bleed photography behind the type. The default.
 * - `split`   type beside a photograph holding the right half. Editorial.
 *
 * Both are image-led: every route on the site now opens on a photograph, and
 * each one uses a different frame. There is no typographic-only variant any
 * more - a page title on a flat gradient was the weakest opening on the site.
 *
 * Both keep a dark top band. That is a hard constraint, not a stylistic one:
 * the header renders transparent over the top of the page and carries
 * `.surface-dark` while it does, so a light hero would leave the wordmark and
 * navigation unreadable until the first scroll.
 */
export type PageHeroVariant = "feature" | "split";

export interface PageHeroProps {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  /** Supporting paragraph. Kept to a controlled measure. */
  lead?: string;
  /** Buttons or links rendered under the lead. */
  actions?: ReactNode;
  variant?: PageHeroVariant;
  photo: Photo;
  /** Rendered under the main column, e.g. a contents list or key figures. */
  children?: ReactNode;
  /**
   * Trims the hero for pages whose content should start almost immediately -
   * the utility routes, where a full-height opening would be posturing.
   */
  compact?: boolean;
  className?: string;
}

const at = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/**
 * Shared interior-page hero.
 *
 * Height is viewport-driven but bounded: ~58svh on phones, ~68svh on desktop,
 * with a rem floor so a short title still produces a proper band and a cap so
 * it never fills the screen the way the homepage hero does. An interior page
 * has to show there is something below the fold.
 *
 * Motion runs on mount rather than on scroll, for the same reason as the
 * homepage hero: above-the-fold content must not wait on an observer.
 *
 * Pads for the fixed header itself, which is why interior pages need no top
 * spacing of their own. Renders the page's single H1.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  variant = "feature",
  photo,
  children,
  compact = false,
  className,
}: PageHeroProps) {
  const isSplit = variant === "split";

  return (
    <section
      className={cn(
        "tokens-dark relative isolate flex flex-col justify-end overflow-hidden bg-(--midnight)",
        "pb-[clamp(2.5rem,4.5vw,3.75rem)] pt-[calc(var(--header-h)+clamp(3rem,7vw,5rem))]",
        compact
          ? "min-h-[max(19rem,40svh)]"
          : "min-h-[max(24rem,56svh)] lg:min-h-[max(27rem,66svh)]",
        className,
      )}
    >
      {/*
        Photography. `split` shows the frame in the right half on large screens
        and full-bleed below that, where there is no half to fill. Both are
        rendered rather than swapped, so the correct one is available without
        a client-side breakpoint check.
      */}
      {isSplit && (
        <div aria-hidden="true" className="absolute inset-y-0 end-0 -z-20 hidden w-[54%] lg:block">
          <NextImage
            src={photo.src}
            alt=""
            fill
            preload
            sizes="54vw"
            placeholder="blur"
            style={{ objectPosition: photo.position }}
            className="hero-settle photo-grade object-cover"
          />
        </div>
      )}

      <div
        aria-hidden="true"
        className={cn("absolute inset-0 -z-20", isSplit && "lg:hidden")}
      >
        <NextImage
          src={photo.src}
          alt=""
          fill
          preload={!isSplit}
          sizes="100vw"
          placeholder="blur"
          style={{ objectPosition: photo.position }}
          className="hero-settle photo-grade object-cover"
        />
      </div>

      {/*
        Scrim. The diagonal anchors the type column, the vertical protects the
        lead and actions along the bottom edge. The split variant carries a
        harder left edge so the type sits on flat midnight and the photograph
        feathers in beside it.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10",
          isSplit
            ? "bg-[linear-gradient(100deg,#0c141d_18%,rgba(12,20,29,0.88)_48%,rgba(12,20,29,0.6)_100%)] rtl:bg-[linear-gradient(260deg,#0c141d_18%,rgba(12,20,29,0.88)_48%,rgba(12,20,29,0.6)_100%)] lg:bg-[linear-gradient(96deg,#0c141d_40%,rgba(12,20,29,0.82)_56%,rgba(12,20,29,0.3)_100%)] lg:rtl:bg-[linear-gradient(264deg,#0c141d_40%,rgba(12,20,29,0.82)_56%,rgba(12,20,29,0.3)_100%)]"
            : "bg-[linear-gradient(100deg,#0c141d_8%,rgba(12,20,29,0.9)_40%,rgba(12,20,29,0.62)_76%,rgba(12,20,29,0.5)_100%)] rtl:bg-[linear-gradient(260deg,#0c141d_8%,rgba(12,20,29,0.9)_40%,rgba(12,20,29,0.62)_76%,rgba(12,20,29,0.5)_100%)]",
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(12,20,29,0.85)_0%,rgba(12,20,29,0.24)_46%,transparent_82%)]"
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.4),transparent)]"
      />

      <Container className="relative z-10">
        <div className="max-w-[46rem]">
          <p
            className="reveal flex flex-wrap items-center gap-x-3.5 gap-y-2 text-label uppercase text-(--color-accent)"
            data-visible="true"
          >
            {/*
              The service pages passed an editorial index here - "01" through
              "04" - and it is gone with the 01/02/03 format. The rule that
              followed it stays: it is the eyebrow's own mark on every page
              that uses this hero, not a separator between two things.
            */}
            <span aria-hidden="true" className="h-px w-10 bg-(--color-accent)" />
            <span>{eyebrow}</span>
          </p>

          <Heading
            level={1}
            size="display"
            className="reveal mt-6 max-w-[17ch]"
            data-visible="true"
            data-variant="mask"
            style={at(120)}
          >
            {title}
          </Heading>

          {lead && (
            <p
              className="reveal mt-6 max-w-[54ch] text-lead text-(--color-foreground-muted)"
              data-visible="true"
              style={at(260)}
            >
              {lead}
            </p>
          )}

          {actions && (
            <div
              className="reveal mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4"
              data-visible="true"
              style={at(380)}
            >
              {actions}
            </div>
          )}
        </div>

        {children && (
          <div className="reveal mt-10" data-visible="true" style={at(460)}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
