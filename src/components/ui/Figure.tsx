import NextImage from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import type { Photo } from "@/data/imagery";

const ratios = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  tall: "aspect-[4/5]",
  wide: "aspect-[16/10]",
  cinema: "aspect-[21/9]",
  panel: "aspect-[5/6]",
  auto: "",
} as const;

/**
 * Overlay strength.
 *
 * The scrims are built from the midnight token rather than neutral black, so a
 * photograph darkens *into* the palette instead of going muddy. `heavy` is
 * calibrated to hold body copy at AA over a bright frame; `veil` only knocks
 * back a photograph sitting next to text, not under it.
 */
const overlays = {
  none: "",
  veil: "bg-[linear-gradient(to_top,rgba(12,20,29,0.44)_0%,rgba(12,20,29,0.08)_55%,transparent_100%)]",
  /*
   * Sized for the brightest photograph in the set, not the average one. The
   * segment panels reuse one scrim across frames ranging from a night skyline
   * to a near-white facade, and a scrim tuned to the dark frames leaves the
   * label on the pale ones sitting at roughly 3:1.
   */
  soft: "bg-[linear-gradient(to_top,rgba(12,20,29,0.9)_0%,rgba(12,20,29,0.62)_32%,rgba(12,20,29,0.24)_66%,rgba(12,20,29,0.12)_100%)]",
  heavy:
    "bg-[linear-gradient(to_top,rgba(12,20,29,0.94)_0%,rgba(12,20,29,0.72)_38%,rgba(12,20,29,0.5)_72%,rgba(12,20,29,0.42)_100%)]",
  /** For split layouts where type sits to one side rather than underneath. */
  side: "bg-[linear-gradient(100deg,rgba(12,20,29,0.95)_8%,rgba(12,20,29,0.72)_44%,rgba(12,20,29,0.28)_100%)]",
} as const;

export type FigureRatio = keyof typeof ratios;
export type FigureOverlay = keyof typeof overlays;

export interface FigureProps {
  photo: Photo;
  ratio?: FigureRatio;
  overlay?: FigureOverlay;
  /** Enables the hover zoom. Pair with `group` on an ancestor link. */
  zoom?: boolean;
  /** Adds the film-grain treatment. Reserve for large dark frames. */
  grain?: boolean;
  /**
   * The sitewide photographic grade. On by default - turn it off only for an
   * image that must be reproduced faithfully, such as a supplied logo or a
   * portrait where skin tone matters.
   */
  grade?: boolean;
  /**
   * How the image fills the frame.
   *
   * `cover` is the default and is right for every photograph on the site: the
   * frame is a window onto a larger picture, and `position` decides what the
   * window holds.
   *
   * `contain` is for a CUTOUT - a subject on a transparent ground, which has
   * no edges to spare. Cropping one is not a crop, it is an amputation: the
   * top of a tower or the base it stands on simply goes. Contain fits the
   * whole silhouette inside the frame and lets the panel show around it, which
   * is what the transparency is for.
   *
   * A contained frame also drops `position`, which has nothing left to decide
   * once the whole image is visible.
   */
  fit?: "cover" | "contain";
  /** LCP hero only. Emits a <link rel=preload> rather than lazy-loading. */
  preload?: boolean;
  /**
   * Encoder quality. Omitted, Next uses its default of 75.
   *
   * Only values in `images.qualities` in next.config.ts exist - anything else
   * is silently clamped to the nearest one, with no warning at build or at
   * request time. The list is currently `[75, 90]`.
   *
   * Reach for 90 on a frame whose subject is fine repeating detail (a facade
   * grid, a run of windows) held at small size, where q75 smears the pattern
   * into mush. It is not a general upgrade: on the dark, soft-focus frames
   * that make up most of the library it buys nothing and costs bytes.
   */
  quality?: number;
  /** Responsive hint. Always pass a real one for anything below full width. */
  sizes?: string;
  className?: string;
  /** Applied to the <img> itself, e.g. a duotone or contrast treatment. */
  imageClassName?: string;
}

/**
 * The single photographic frame used across the site.
 *
 * Centralising the crop, scrim, grain and hover-zoom here is what stops
 * photography drifting into six slightly different treatments across the
 * pages. Sections choose a ratio and an overlay strength; nothing else.
 *
 * The scrim is a sibling of the image rather than a parent background, so it
 * composites above the photograph but below any content the caller stacks on
 * top with `relative z-10`.
 */
export function Figure({
  photo,
  ratio = "wide",
  overlay = "none",
  zoom = false,
  grain = false,
  grade = true,
  fit = "cover",
  preload = false,
  quality = 90,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
  imageClassName,
}: FigureProps) {
  /*
    A cutout decides two things for itself, wherever it is used.

    `contain`, because cropping a subject with no spare edges is an amputation
    rather than a crop - the spire off a tower, or the base out from under it.

    And no scrim, because a scrim is a gradient over the whole frame: on a
    photograph it darkens the picture, but on a cutout it darkens the panel
    AROUND the subject too, drawing exactly the rectangle the transparency
    exists to avoid.

    Read off the asset rather than the call site so neither rule can be
    forgotten at one of several call sites. `fit` still overrides upward, for a
    photograph that wants containing for its own reasons.
  */
  const contain = fit === "contain" || photo.cutout === true;
  const scrim = photo.cutout ? "none" : overlay;

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        /*
          A PHOTOGRAPH gets the midnight ground: it fills the frame, and the
          colour is what the frame shows while the image is still loading.

          A CUTOUT must not. Its whole point is that the section shows through
          the transparency, and a background here is the rectangle that makes a
          floating landmark look like a picture pasted into a box. There is
          nothing to paint behind it and nothing to load onto - the section is
          already there.
        */
        !photo.cutout && "bg-(--midnight)",
        ratios[ratio],
        zoom && "media-frame",
        grain && "grain",
        className,
      )}
    >
      {/*
        The crop is set through custom properties rather than `objectPosition`
        directly, so a photograph can carry a different crop on a phone. The
        `.object-pos` rule in globals.css reads `--obj-pos-sm` below 640px and
        `--obj-pos` above it; a photo with no `positionMobile` resolves both to
        the same value and behaves exactly as it did before.
      */}
      <NextImage
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={preload || undefined}
        quality={quality}
        style={
          {
            ...(!contain && photo.position && {
              "--obj-pos": photo.position,
              "--obj-pos-sm": photo.positionMobile ?? photo.position,
            }),
            /*
              `scale` rather than `transform`, so this composes with the hover
              zoom in `.media-frame img` instead of replacing it.
            */
            ...(photo.cutout && photo.cutoutScale ? { scale: String(photo.cutoutScale) } : {}),
            ...(photo.grade?.saturate !== undefined && { "--grade-sat": photo.grade.saturate }),
            ...(photo.grade?.contrast !== undefined && { "--grade-con": photo.grade.contrast }),
            ...(photo.grade?.brightness !== undefined && { "--grade-bri": photo.grade.brightness }),
          } as CSSProperties
        }
        className={cn(
          contain ? "object-contain" : "object-cover",
          /* A contained image shows in full; there is no crop left to place. */
          !contain && photo.position && "object-pos",
          grade && "photo-grade",
          imageClassName,
        )}
      />

      {scrim !== "none" && (
        <div aria-hidden="true" className={cn("absolute inset-0", overlays[scrim])} />
      )}
    </div>
  );
}
