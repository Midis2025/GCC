export type * from "./navigation";
export type * from "./forms";

/** Standard responsive image payload used across sections. */
export interface ImageAsset {
  src: string;
  /** Empty string marks the image as decorative. */
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

/** Per-page SEO overrides. */
export interface SeoOverrides {
  title?: string;
  description?: string;
  /** Route-relative path, e.g. "/about", used to build the canonical URL. */
  path?: string;
  image?: string;
  noIndex?: boolean;
}
