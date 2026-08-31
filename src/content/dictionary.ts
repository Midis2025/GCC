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
 * about itself. `NEXT_PUBLIC_AR_ENABLED` stays off until they have.
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
    primary: string;
    mobile: string;
    siteMenu: string;
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

  forms: {
    optional: string;
    required: string;
    submitting: string;
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
    allInsights: string;
  };
}

export type DictionaryKey = keyof Dictionary;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/content/en/ui").then((m) => m.ui),
  ar: () => import("@/content/ar/ui").then((m) => m.ui),
};

/** Loads the shared dictionary for a language. */
export async function loadDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
