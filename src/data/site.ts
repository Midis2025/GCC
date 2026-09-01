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
 * - "Gulf Connect" - EVERYWHERE. Page copy, navigation, buttons, meta
 *   descriptions, alt text, email, file names, legal pages, structured data.
 *   There is no second, longer, more formal form of the name to reach for.
 * - "GCC states" or "the Gulf" - the region, and only the region.
 *
 * THERE IS NO LEGAL ENTITY. Gulf Connect is a brand and a website; no company
 * has been incorporated under the name. Nothing on this site may describe it
 * as one - no FZCO, no LLC, no Ltd, no registration number, no free-zone
 * address - and no substitute entity may be invented to fill the gap that
 * leaves in legal copy. See `legalName` below.
 *
 * British English throughout, consistent with regional business media
 * conventions.
 */
export const siteConfig = {
  name: "Gulf Connect",
  /**
   * TODO: legal entity. NONE EXISTS.
   *
   * This previously read "Gulf Connect Consultancy FZCO". The client has
   * confirmed that no company has been incorporated under the Gulf Connect
   * name: it is a brand and a website presence, nothing more. Publishing an
   * entity that does not exist is a misrepresentation, so the field is empty
   * and every consumer falls back to `name`.
   *
   * Empty rather than deleted on purpose. The fallback is written once, here
   * and at each call site, so the day an entity IS registered this is a
   * one-line change rather than a hunt through the legal pages.
   *
   * DO NOT populate this with a guess, a placeholder or a name borrowed from
   * a related business.
   */
  legalName: "",
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
  /**
   * Writing direction, written onto <html>.
   *
   * `ltr` and staying that way: there is NO Arabic edition of this site and no
   * language switcher, and this field does not create one. It exists because
   * the direction was previously implicit, and an implicit direction is the
   * thing that has to be found and fixed in every component on the day an
   * Arabic edition is built.
   *
   * Declared here, read once in `app/layout.tsx`. A future Arabic route sets
   * it to `rtl` on its own layout and inherits everything else.
   *
   * HONEST NOTE for whoever builds that: the existing layout uses physical
   * Tailwind utilities in places - `ml-`, `pl-`, `border-l`, `text-left` - so
   * setting this to `rtl` will not mirror the site on its own. The work is a
   * pass converting those to the logical equivalents (`ms-`, `ps-`,
   * `border-s`, `text-start`), which is a mechanical change but not a free
   * one. Nothing NEW should add a physical utility where a logical one exists.
   */
  direction: "ltr",
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
  /**
   * Deliberately empty, and not a TODO.
   *
   * The client has directed that the public location stay generic: no
   * building, no office number, no street, no free-zone registration address.
   * `locality` carries everything the site is permitted to say. Filling this
   * in would break that instruction, not complete it.
   */
  address: "",
  /**
   * The only location the site publishes, in every language and every context.
   *
   * A flag emoji is appended for DISPLAY in page copy where the surrounding
   * style carries it - see `localityDisplay`. This plain form is what goes
   * into metadata, structured data, legal text, email and accessible names,
   * where an emoji is noise at best and unreadable at worst.
   */
  locality: "Dubai, UAE",
  /**
   * TODO: Gulf Connect's OWN LinkedIn company URL.
   *
   * Empty, and it stays empty until Gulf Connect's own account exists. Every
   * component that renders it checks first, so the footer and contact page
   * simply omit the link rather than showing a dead one.
   *
   * DO NOT fill this with a related business's profile, a personal profile, or
   * a search URL. A social link is a claim of identity; borrowing one asserts
   * a shared presence that does not exist.
   */
  linkedin: "",
};

/**
 * The location as it is SET IN PAGE COPY.
 *
 * Same string as `contactConfig.locality` with the flag appended, kept apart
 * from it so the emoji cannot leak into the places it does not belong -
 * `<title>`, meta descriptions, JSON-LD, legal paragraphs, alt text and
 * aria-labels all read `locality`, which has no emoji in it.
 */
export const localityDisplay = `${contactConfig.locality} \u{1F1E6}\u{1F1EA}`;

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
 *
 * ---------------------------------------------------------------------------
 * TWO CLIENT-DIRECTED EDITS - FLAGGED FOR LEGAL REVIEW
 * ---------------------------------------------------------------------------
 * 1. The entity was "Gulf Connect Consultancy FZCO". No such company exists,
 *    so the sentence now names the brand.
 * 2. The clause "or receive compensation linked to capital raised, share price
 *    or trading volume" has been removed on instruction to take stock and
 *    equity compensation language off the public site.
 *
 * Both make this paragraph say LESS than the version counsel approved. The
 * fixed-fee basis, the not-an-offer statement, the unlicensed statement and
 * the client-relationship disclosure all survive; the specific undertaking
 * about share-price-linked compensation does not. That undertaking is a
 * common expectation of an unlicensed communications firm operating around
 * listed companies, and dropping it is a narrowing of the site's compliance
 * position rather than a wording preference. It needs a lawyer's sign-off, not
 * a developer's.
 */
export const footerDisclosure =
  "Gulf Connect provides investor communications, events and media services for fixed professional fees. Nothing on this site is an offer, solicitation, recommendation or investment advice, and it should not be relied upon in making any investment decision. Gulf Connect is not licensed to conduct financial services activity in the UAE and does not solicit investment or hold client funds. Where content relates to a company that has engaged Gulf Connect, the commercial relationship is disclosed on that content.";

/**
 * The disclosure shown at the TOP of an Insight item whose subject has engaged
 * Gulf Connect.
 *
 * The brief requires it above the content, not below it: a disclosure a reader
 * meets after forming a view is not a disclosure. `{company}` is replaced with
 * the client name held on the item, and with "This company" where an item is
 * marked as client-involved without naming one - the disclosure is required
 * either way and must never be skipped for want of a name.
 *
 * The brand name is used throughout. There is no registered entity to name
 * instead - see the naming note at the top of this file.
 */
export const clientDisclosureTemplate =
  "{company} is a client of Gulf Connect and has paid Gulf Connect a fixed professional fee for communications services.";

/**
 * ----------------------------------------------------------------------------
 * COMMERCIAL MODEL
 * ----------------------------------------------------------------------------
 * Stated plainly wherever the service architecture is described, because the
 * brief treats it as a differentiator rather than a caveat.
 *
 * ---------------------------------------------------------------------------
 * CLIENT-DIRECTED EDIT - FLAGGED FOR LEGAL REVIEW
 * ---------------------------------------------------------------------------
 * Two exclusions have been removed on instruction to take stock, share-price
 * and equity compensation language off the public site:
 *
 *   "No compensation linked to capital raised"
 *   "No compensation linked to share price or trading volume"
 *
 * Both were negative statements - undertakings about what the firm does NOT
 * take - so removing them makes the site claim less, not more. Nothing has
 * been invented to replace them and no new compensation model is described.
 * The fixed-fee basis is unchanged and is now the whole of the statement.
 *
 * What survives is still load-bearing compliance copy. Do not soften it into
 * a marketing line, and do not restore the removed lines without the client.
 */
export const commercialModel = {
  basis: "Fixed professional fees for defined scopes of work.",
  exclusions: ["No success fees"],
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
