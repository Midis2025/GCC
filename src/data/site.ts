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

/**
 * ----------------------------------------------------------------------------
 * NAMING - read before writing any copy
 * ----------------------------------------------------------------------------
 * The company is "Gulf Connect". It is NEVER abbreviated to "GCC".
 *
 * In this region GCC means the Gulf Cooperation Council, and the collision is
 * not fixable in context: a sentence containing both the company and the
 * region reads as nonsense however it is punctuated. Where both appear, the
 * sentence gets rewritten.
 *
 * - "Gulf Connect Consultancy FZCO" - legal and formal use only. Footer
 *   disclosure, legal pages, structured data.
 * - "Gulf Connect" - everywhere else. Page copy, navigation, buttons, meta
 *   descriptions, alt text, email, file names.
 * - "GCC states" or "the Gulf" - the region, and only the region.
 *
 * British English throughout, consistent with regional business media
 * conventions.
 */
export const siteConfig = {
  name: "Gulf Connect",
  /** Legal entity, confirmed by the client. Formal and legal use only. */
  legalName: "Gulf Connect Consultancy FZCO",
  /**
   * The name set in the supplied logo artwork, read off `/images/logo.svg`.
   *
   * It exists so the logo's accessible name matches the words a sighted
   * visitor can see in it.
   */
  wordmark: "Gulf Connect Consultancy",
  /** Used as the <title> suffix and in the footer wordmark. */
  shortDescription:
    "Investor communications, events and media services for Gulf capital markets.",
  description:
    "Gulf Connect introduces international companies to Gulf investors and partners, convenes qualified investors for structured meetings, and places company stories with regional business media in English and Arabic.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Link-preview card, 1200x630, built from the supplied logo artwork and this
   * file's own `shortDescription` - see `/public/images/og-default.png`.
   *
   * Route-relative on purpose: `createMetadata` resolves it against
   * `metadataBase`, so it comes out absolute on every deployment without the
   * domain being written down twice.
   */
  ogImage: "/images/og-default.png",
  locale: "en-GB",
} as const;

/**
 * ----------------------------------------------------------------------------
 * LAUNCH STATE
 * ----------------------------------------------------------------------------
 * The site is `noindex` until the client approves launch.
 *
 * The brief is explicit about why: the content library launches near-empty,
 * and a discoverable site with one item in its Insight section actively
 * damages the business. Build completes, the site sits quietly, and indexing
 * is turned on only once six content pieces are published.
 *
 * Default is NOT live. Turning it on is a deliberate act: set
 * `NEXT_PUBLIC_SITE_LIVE=true` in the deployment environment. Nothing in the
 * code removes `noindex` automatically, and nothing should.
 */
export const siteIsLive = process.env.NEXT_PUBLIC_SITE_LIVE === "true";

/**
 * Contact details.
 *
 * `locality` is supplied by the brief. Email and phone are NOT - the brief
 * lists them as outstanding from the client. They stay empty, and every
 * component that renders them checks first, so the site shows a city and
 * nothing else rather than an invented address.
 */
export interface ContactConfig {
  email: string;
  phone: string;
  address: string;
  locality: string;
  linkedin: string;
}

export const contactConfig: ContactConfig = {
  /** TODO: single contact address, on a gulfconnectconsultancy.com domain. */
  email: "",
  /** TODO: single contact number. */
  phone: "",
  /** TODO: registered office address, if it is to be published at all. */
  address: "",
  /** Supplied: the brief states Dubai, UAE. */
  locality: "Dubai, UAE",
  /** TODO: full LinkedIn company URL. Presence begins at soft launch. */
  linkedin: "",
};

/**
 * ----------------------------------------------------------------------------
 * STANDING DISCLOSURE
 * ----------------------------------------------------------------------------
 * Client-approved wording, reproduced VERBATIM. Do not edit, shorten,
 * paraphrase or split it.
 *
 * It appears in the footer of every page and again at the foot of every
 * content item in the Insight library. The brief is explicit that it is not
 * small print to be hidden at 9px - it is set legibly, at body-adjacent size,
 * in the footer's normal muted foreground.
 *
 * If a future change makes this text inconvenient to lay out, the layout
 * changes. This does not.
 */
export const footerDisclosure =
  "Gulf Connect Consultancy FZCO provides investor communications, events and media services for fixed professional fees. Nothing on this site is an offer, solicitation, recommendation or investment advice, and it should not be relied upon in making any investment decision. Gulf Connect is not licensed to conduct financial services activity in the UAE and does not solicit investment, hold client funds or receive compensation linked to capital raised, share price or trading volume. Where content relates to a company that has engaged Gulf Connect, the commercial relationship is disclosed on that content.";

/**
 * The disclosure shown at the TOP of an Insight item whose subject has engaged
 * Gulf Connect.
 *
 * The brief requires it above the content, not below it: a disclosure a reader
 * meets after forming a view is not a disclosure. `{company}` is replaced with
 * the client name held on the item.
 */
export const clientDisclosureTemplate =
  "{company} is a client of Gulf Connect Consultancy and has paid Gulf Connect a fixed professional fee for communications services.";

/**
 * ----------------------------------------------------------------------------
 * COMMERCIAL MODEL
 * ----------------------------------------------------------------------------
 * Stated plainly wherever the service architecture is described, because the
 * brief treats it as a differentiator rather than a caveat.
 *
 * These are negative statements about compensation and they are load-bearing
 * compliance copy. Do not soften them into marketing lines.
 */
export const commercialModel = {
  basis: "Fixed professional fees for defined scopes of work.",
  exclusions: [
    "No success fees",
    "No compensation linked to capital raised",
    "No compensation linked to share price or trading volume",
  ],
} as const;

/**
 * Client photography overrides.
 *
 * The brief rules out stock photography of skylines, handshakes and generic
 * boardrooms for NEW pages: launch with typography and restrained colour
 * rather than with stock, and real images arrive from the November programme.
 * Existing sections keep the art direction they already ship with.
 *
 * These slots exist so a supplied photograph can take precedence without
 * touching `imagery.ts`: set `src` to a path under /public with accurate
 * `alt`, and that section switches to the client asset.
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
