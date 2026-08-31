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
  /**
   * The language this page is being rendered in.
   *
   * Decides the canonical, the `hreflang` set and the Open Graph locale.
   * Defaults to English so any caller that has not been localised yet keeps
   * producing exactly the metadata it produced before.
   */
  locale?: import("@/lib/i18n").Locale;
}
