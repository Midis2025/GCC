/**
 * ============================================================================
 * CENTRAL BUSINESS CONFIGURATION
 * ============================================================================
 * Every real-world business fact lives here and nowhere else.
 *
 * Fields marked TODO have NOT been supplied by the client. They are empty on
 * purpose - components check for them and skip rendering rather than showing
 * placeholder text, so nothing unverified ever reaches the page.
 *
 * DO NOT populate these with invented values.
 */
export const siteConfig = {
  name: "GCC",
  /** TODO: confirm the registered legal entity name. */
  legalName: "",
  /** Used as the <title> suffix and in the footer wordmark. */
  shortDescription:
    "Investor relations, investor outreach and strategic communications for Gulf capital markets.",
  description:
    "GCC advises companies on investor relations, investor targeting and strategic communications across Gulf and international capital markets.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** TODO: awaiting Open Graph image (1200x630) under /public. */
  ogImage: "",
  locale: "en",
} as const;

/**
 * Contact details. All TODO - awaiting client confirmation.
 * The footer and contact page render only the fields that are non-empty.
 */
export interface ContactConfig {
  email: string;
  phone: string;
  address: string;
  locality: string;
  linkedin: string;
}

export const contactConfig: ContactConfig = {
  /** TODO */
  email: "",
  /** TODO */
  phone: "",
  /** TODO: office address. Do not infer a location from market coverage. */
  address: "",
  /** TODO: city/country line, e.g. shown under the footer wordmark. */
  locality: "",
  /** TODO: full LinkedIn company URL. */
  linkedin: "",
};

/**
 * Regulatory / disclaimer wording.
 * TODO: must be supplied and approved by the client. Never draft financial
 * services disclaimers on their behalf - the footer omits this block while empty.
 */
export interface ComplianceConfig {
  disclaimer: string;
  regulatoryStatement: string;
}

export const complianceConfig: ComplianceConfig = {
  disclaimer: "",
  regulatoryStatement: "",
};

/**
 * Art direction slots for photography.
 *
 * No stock imagery has been supplied, so these are empty and the affected
 * sections fall back to an authored typographic/geometric treatment. Drop a
 * path under /public here (e.g. "/images/hero.jpg") and the section switches
 * to the photographic treatment with no code change.
 *
 * Direction: Gulf financial architecture (DIFC, Abu Dhabi, Riyadh business
 * districts), architectural geometry or executive environments. Dark,
 * atmospheric, typography-led. No handshakes, dunes or tourist landmarks.
 */
export interface ImageSlot {
  src: string;
  alt: string;
}

export const imageConfig: Record<"hero" | "intro" | "outreach", ImageSlot> = {
  hero: { src: "", alt: "" },
  intro: { src: "", alt: "" },
  outreach: { src: "", alt: "" },
};

export type SiteConfig = typeof siteConfig;
