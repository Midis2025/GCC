import type { Locale } from "@/lib/i18n";

/**
 * ============================================================================
 * THE SHARED DICTIONARY
 * ============================================================================
 * The chrome, and only the chrome: navigation, the footer, both forms, their
 * validation and success states, the cookie banner, buttons and the
 * accessibility labels that are not visible copy.
 *
 * PAGE COPY IS NOT HERE. It stays in the content modules, where a Server
 * Component reads it directly - see `src/content/index.ts`. The split is not
 * arbitrary: this object is serialised into the RSC payload for every page so
 * that Client Components can read it through `LocaleProvider`, and page copy
 * crossing that boundary would put the entire site's text into every response.
 *
 * ----------------------------------------------------------------------------
 * THE ENGLISH SIDE IS A MOVE, NOT A REWRITE
 * ----------------------------------------------------------------------------
 * Every English string below is lifted VERBATIM from where it already lived -
 * `data/navigation.ts`, `CookieConsent`, `CompanyForm`, `InvestorForm`,
 * `SkipLink`. Same words, same punctuation, same capitalisation. If a string
 * here differs from what the site said before, that is a bug and not an
 * improvement: this is a localisation change and the approved English copy is
 * not in scope for editing.
 *
 * ----------------------------------------------------------------------------
 * THE ARABIC SIDE
 * ----------------------------------------------------------------------------
 * Modern Standard Arabic, in the formal institutional register Gulf financial
 * and professional-services audiences expect - the register of a regulator
 * circular or a bank's investor communications, not conversational Arabic.
 *
 * Four rules hold throughout:
 *
 *   1. The legal entity stays "Gulf Connect Consultancy FZCO" in Latin script.
 *      It is a registered name; translating it invents an entity that does not
 *      exist on any licence.
 *   2. Western numerals throughout, matching Gulf corporate convention and the
 *      English site. Eastern Arabic numerals would be a change of house style,
 *      not a translation.
 *   3. Email addresses, URLs, tickers and listing venues are never translated.
 *   4. Compliance wording preserves the MEANING of the English exactly. Where
 *      the Arabic could be read as narrowing or widening a legal statement, the
 *      English is kept alongside it - see `legalReviewRequired` below.
 */

/**
 * Strings whose Arabic still needs a qualified reader before publication.
 *
 * Everything reachable from here is a legal or compliance statement: the
 * standing disclosure, the consent wording, the client disclosure. The Arabic
 * provided is a faithful rendering, but "faithful" is a judgement a translator
 * with the relevant standing has to make rather than one this file can assert
 * about itself.
 *
 * The Arabic edition is now PUBLISHED, so these strings are live and this
 * review is outstanding rather than pending. If any of it is judged wrong, the
 * fix is to correct the string - or to withdraw Arabic in one deploy with
 * `NEXT_PUBLIC_AR_ENABLED=false` - not to leave it standing.
 */
export const legalReviewRequired = [
  "footer.disclosure",
  "forms.investor.consentLabel",
  "forms.investor.consentNote",
  "forms.company.consentLabel",
  "insight.clientDisclosure",
] as const;

export interface Dictionary {
  meta: {
    /** The language's own name, for the toggle. */
    languageName: string;
    /** What the toggle announces to a screen reader. */
    switchLabel: string;
    switchTo: string;
  };

  nav: {
    /**
     * The logo`s accessible name.
     *
     * A template: `{wordmark}` is replaced with `siteConfig.wordmark`, which
     * is the name set in the artwork and is never translated. Only the word
     * around it changes, so a screen reader in either language announces the
     * same mark and the correct destination.
     */
    homeLink: string;
    primary: string;
    mobile: string;
    siteMenu: string;
    /**
     * The visible heading at the top of the open mobile panel.
     *
     * Distinct from `siteMenu`, which is the panel`s accessible name: one is
     * read, the other is announced, and they are not the same words in Arabic.
     */
    menuHeading: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
    items: {
      whatWeDo: string;
      forInvestors: string;
      insight: string;
      about: string;
      contact: string;
    };
    services: {
      investorRoadshows: string;
      gulfProgramme: string;
      mediaArabic: string;
      advisory: string;
    };
    cta: string;
    secondaryCta: string;
    exploreCapabilities: string;
  };

  footer: {
    groups: { whatWeDo: string; company: string; forInvestors: string };
    /**
     * The one line under the wordmark.
     *
     * Chrome rather than page copy: it renders in the footer of every route.
     * The English is `siteConfig.shortDescription` moved here verbatim, so it
     * can have an Arabic sibling. The value in `data/site.ts` stays where it
     * is and keeps feeding metadata and structured data, which are a separate
     * concern from what a reader sees.
     */
    description: string;
    /** Heading over the market list. Used in the footer and on Contact. */
    markets: string;
    joinTheList: string;
    email: string;
    telephone: string;
    office: string;
    international: string;
    contact: string;
    /** The city the firm is in. A place name, so it is translated. */
    locality: string;
    /**
     * The standing disclosure, on every page.
     *
     * Chrome rather than page copy because it appears in the footer of every
     * route and again at the foot of every Insight item. AWAITING LEGAL
     * REVIEW - see `legalReviewRequired`.
     */
    disclosure: string;
    legal: {
      privacy: string;
      disclaimer: string;
      terms: string;
      cookies: string;
    };
    rights: string;
  };

  cookies: {
    heading: string;
    body: string;
    noticeLink: string;
    accept: string;
    reject: string;
  };

  /**
   * The standing denial under every map surface.
   *
   * Four sections across three pages draw a map, and every one of them carries
   * this line. It lives here rather than in four content modules so the four
   * cannot drift apart in either language.
   *
   * COMPLIANCE: a line on a map means cross-border company and market
   * connectivity and nothing else - not an office, a registration, a licence
   * or a relationship. Do not shorten it and do not make it conditional.
   */
  maps: {
    denial: string;
  };

  forms: {
    optional: string;
    required: string;
    submitting: string;
    /**
     * The Contact toggle.
     *
     * The keys are the routing identifiers `?enquiry=` carries and are never
     * translated; only the labels are.
     */
    audience: {
      legend: string;
      company: string;
      investor: string;
    };
    /**
     * ------------------------------------------------------------------------
     * SELECT AND CHECKBOX OPTIONS
     * ------------------------------------------------------------------------
     * A LABEL LOOKUP, KEYED BY THE VALUE THAT IS SUBMITTED.
     *
     * This is the one part of the dictionary where getting the split wrong has
     * consequences outside the page. Every option on this site is a pair: a
     * `value` that goes to `/api/submit` and on to the CRM, and a `label` that
     * a human reads. The values live in `data/contact.ts` and
     * `data/for-investors.ts` and are IDENTICAL in both editions - a
     * registration made in Arabic writes exactly the record an English one
     * writes. Only the labels below change with the language.
     *
     * So the keys here are backend identifiers and must never be translated:
     * `family-office`, `media-arabic-communications`, `ae`, `09:00 AM`. If a
     * key is ever missing, the call site falls back to the English label from
     * the data module rather than rendering an empty option.
     */
    options: {
      /** Keys: the four service-line slugs, plus `general`. */
      areaOfInterest: Record<string, string>;
      /** Keys: `ae`, `sa`, `qa`, `kw`, `bh`, `om`, `intl`. */
      market: Record<string, string>;
      /**
       * Keys: `institution`, `asset-manager`, `family-office`,
       * `private-bank-broker`, `qualified-private-investor`, `other`.
       *
       * COMPLIANCE: `other` is a real answer with a consequence - those
       * registrants receive general content only. Its label must stay a
       * neutral "other", never something that reads as a decline.
       */
      investorCategory: Record<string, string>;
      /** Keys: the three sector strings the checkboxes submit. */
      investorSector: Record<string, string>;
      /** Keys: the nine `hh:mm AM/PM` strings the select submits. */
      preferredTime: Record<string, string>;
    };
    company: {
      badge: string;
      companyName: string;
      listingVenue: string;
      listingVenuePlaceholder: string;
      ticker: string;
      sector: string;
      yourName: string;
      role: string;
      workEmail: string;
      phone: string;
      country: string;
      areaOfInterest: string;
      areaPlaceholder: string;
      preferredDate: string;
      preferredTime: string;
      timePlaceholder: string;
      timezone: string;
      enquiry: string;
      enquiryHelp: string;
      consentLabel: string;
      submit: string;
      successHeading: string;
      successBody: string;
      notStored: string;
      sendAnother: string;
    };
    investor: {
      badge: string;
      fullName: string;
      firm: string;
      role: string;
      workEmail: string;
      country: string;
      category: string;
      categoryHelp: string;
      categoryPlaceholder: string;
      sectorsLegend: string;
      sectorsHelp: string;
      consentLabel: string;
      consentNote: string;
      submit: string;
      almostThere: string;
      received: string;
      pendingBody: string;
      confirmedBody: string;
      notStored: string;
      registerAnother: string;
    };
    errors: {
      companyName: string;
      sector: string;
      name: string;
      firm: string;
      role: string;
      email: string;
      emailInvalid: string;
      country: string;
      investorCategory: string;
      areaOfInterest: string;
      preferredDate: string;
      preferredDatePast: string;
      preferredTime: string;
      message: string;
      messageShort: string;
      consent: string;
      generic: string;
      unreachable: string;
    };
  };

  sections: {
    /**
     * Standing labels written into components rather than into a content
     * module. Small enough that moving them into  would have been
     * ceremony, but they are still visible copy and still have to translate.
     */
    ourCapabilities: string;
    questionBehindTheWork: string;
    whereAppetiteSits: string;
    gulfMarketCoverage: string;
  };

  insight: {
    by: string;
    disclosure: string;
    clientDisclosure: string;
    /**
     * Stands in for a company name in the client disclosure.
     *
     * The flag on an item is what decides whether the line renders, never the
     * presence of a name - an item marked as client-involved but published
     * without one must still carry the disclosure. This is what it says when
     * the name is missing.
     */
    thisCompany: string;
    allInsights: string;
  };
}

export type DictionaryKey = keyof Dictionary;

/**
 * The label a reader sees for one option, given the value it submits.
 *
 * Falls back to the English label held beside the value in the data module
 * rather than rendering an empty option. That is the same narrow, deliberate
 * fallback `pick` uses: a missing translation should be visible as English,
 * never as a blank line in a select.
 */
export function optionLabel(
  labels: Record<string, string>,
  value: string,
  fallback: string,
): string {
  return labels[value] ?? fallback;
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/content/en/ui").then((m) => m.ui),
  ar: () => import("@/content/ar/ui").then((m) => m.ui),
};

/** Loads the shared dictionary for a language. */
export async function loadDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
