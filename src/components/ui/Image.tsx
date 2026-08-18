import NextImage, { type ImageProps as NextImageProps } from "next/image";

import { cn } from "@/lib/utils";

const ratios = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
  auto: "",
} as const;

export interface ImageProps extends Omit<NextImageProps, "alt"> {
  /** Required. Pass "" for purely decorative images. */
  alt: string;
  ratio?: keyof typeof ratios;
  /** Fills its positioned parent instead of using intrinsic dimensions. */
  fill?: boolean;
  /** Class applied to the wrapper, not the <img>. */
  wrapperClassName?: string;
  rounded?: boolean;
}

/**
 * Thin wrapper over next/image that standardises aspect ratio, object-fit and
 * the `sizes` hint, so responsive images stay consistent across sections.
 */
export function Image({
  ratio = "auto",
  fill = false,
  className,
  wrapperClassName,
  rounded = false,
  sizes,
  ...props
}: ImageProps) {
  const defaultSizes = sizes ?? "(min-width: 1024px) 50vw, 100vw";

  if (!fill && ratio === "auto") {
    return (
      <NextImage
        className={cn("h-auto w-full", rounded && "rounded-lg", className)}
        sizes={defaultSizes}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        ratios[ratio],
        rounded && "rounded-lg",
        wrapperClassName,
      )}
    >
      <NextImage fill className={cn("object-cover", className)} sizes={defaultSizes} {...props} />
    </div>
  );
}
