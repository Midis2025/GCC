/**
 * ============================================================================
 * LEGAL PAGES
 * ============================================================================
 * STRUCTURE ONLY. None of this is counsel-approved, and none of it may be
 * presented as though it were.
 *
 * The brief lists "Privacy Policy, Disclaimer, Terms and Cookie Notice,
 * drafted with counsel alongside the regulatory opinion" as outstanding from
 * the client. So each page below sets out the sections a document of that kind
 * needs, states plainly at the top that final wording is pending, and says
 * nothing that could be relied on in the meantime.
 *
 * Two things were explicitly ruled out and neither is done here:
 *
 *   1. Drafting the policies. Writing a privacy policy for a business built on
 *      a marketing database, in a UAE regime, is legal work. A plausible-
 *      sounding draft is worse than an obvious placeholder, because a
 *      placeholder gets replaced and a draft gets shipped.
 *
 *   2. Copying the predecessor documents. The brief is explicit that the old
 *      privacy policy predates both GDPR and the UAE regime, and that the old
 *      disclaimer was written for a US securities newsletter. Neither is a
 *      starting point.
 *
 * What IS safe to state, and is stated, is the firm's own commercial position:
 * fixed fees, no solicitation, disclosure
 * of client relationships. Those are facts about the business rather than
 * legal advice, and they already appear verbatim in the standing disclosure.
 */

export interface LegalSection {
  heading: string;
  /** What the finished section will cover. Not the wording itself. */
  scope: string;
}

export interface LegalPage {
  slug: string;
  title: string;
  eyebrow: string;
  lead: string;
  sections: LegalSection[];
}

/** Shown at the top of every legal page while wording is outstanding. */
export const pendingCounselNotice = {
  label: "Status",
  heading: "Pending final counsel-approved copy",
  body: "This page sets out the structure of a document that is being prepared with legal counsel alongside the regulatory opinion. The sections below describe what the finished document will cover. Nothing on this page is final, and nothing on it should be relied upon.",
} as const;

/**
 * The two standing lines around the section list.
 *
 * MOVED, NOT REWRITTEN, from `LegalPageLayout`. `publishedBy` is a template:
 * `{entity}` is replaced with `siteConfig.legalName` where one exists and with
 * `siteConfig.name` where it does not - which is the case today. The name
 * is Latin script in both editions and is never translated.
 */
export const legalPageChrome = {
  contentsHeading: "What this document will cover",
  publishedBy:
    "This page is published by {entity}. Final wording will replace the structure above once it has been approved.",
} as const;

export const privacyPolicy: LegalPage = {
  slug: "privacy",
  title: "Privacy Policy",
  eyebrow: "Legal",
  lead: "How Gulf Connect collects, uses, stores and protects personal information submitted through this website.",
  sections: [
    {
      heading: "Who we are and how to contact us",
      scope:
      /*
        FOR LEGAL REVIEW. This scope line named a registered entity, and
        there is not one: no company has been incorporated under the Gulf
        Connect name. A privacy notice has to identify a controller, and a
        brand is not a legal person, so the finished document cannot simply
        drop the words - it needs counsel to say who the controller is.

        The line now describes the question rather than presuming the
        answer. Do not fill it in with an invented entity.
      */
        "Who is responsible for personal information submitted through this site, and the address for privacy enquiries and requests. The controlling party is to be confirmed with counsel.",
    },
    {
      heading: "What we collect",
      scope:
        "The fields captured by the company enquiry form and the investor registration form, what is collected automatically, and what is not collected at all.",
    },
    {
      heading: "Why we collect it, and on what basis",
      scope:
        "The purpose of each category of processing and the lawful basis relied on for it, including consent for marketing communications and the record kept of when and how it was given.",
    },
    {
      heading: "Investor list and briefing invitations",
      scope:
        "How the investor category recorded at registration is used, what double opt-in means in practice, and how invitations are targeted.",
    },
    {
      heading: "Who we share it with",
      scope:
        "The processors used to run the site, the CRM and outbound email, and the position on international transfers.",
    },
    {
      heading: "How long we keep it",
      scope: "Retention periods by category, and what happens to a record after unsubscribe.",
    },
    {
      heading: "Your rights",
      scope:
        "Access, correction, deletion, objection and withdrawal of consent, and how each request is made and handled.",
    },
    {
      heading: "Unsubscribing",
      scope:
        "One-click unsubscribe in every marketing message, the period within which it is honoured, and permanent suppression thereafter.",
    },
    {
      heading: "Security",
      scope: "The measures applied to stored personal data and to the systems holding it.",
    },
    {
      heading: "Changes to this policy",
      scope: "How changes are notified and where previous versions are available.",
    },
  ],
};

export const disclaimer: LegalPage = {
  slug: "disclaimer",
  title: "Disclaimer",
  eyebrow: "Legal",
  lead: "The basis on which information is published on this website, and the limits of what it is.",
  sections: [
    {
      heading: "Nature of the information",
      scope:
        "That material on this site is general information about the services of Gulf Connect and commentary on sectors and markets, and is not directed at any individual's circumstances.",
    },
    {
      heading: "Not an offer or a recommendation",
      scope:
        "That nothing on this site is an offer, solicitation, recommendation or investment advice, and that it should not be relied upon in making any investment decision.",
    },
    {
      heading: "Regulatory position",
      scope:
        "That Gulf Connect is not licensed to conduct financial services activity in the UAE, does not solicit investment and does not hold client funds.",
    },
    /*
      FOR LEGAL REVIEW. This section previously undertook that no compensation
      is linked to capital raised, share price or trading volume. That clause
      has been removed on client instruction to take share-price and equity
      compensation language off the public site; the fixed-fee basis is what
      remains. The undertaking was a negative one, so the section now says
      less, not more - and a disclaimer that says less is a decision for
      counsel, not for a content edit.
    */
    {
      heading: "Compensation",
      scope:
        "That Gulf Connect is paid fixed professional fees for defined scopes of work.",
    },
    {
      heading: "Client relationships and disclosure",
      scope:
        "That where content relates to a company that has engaged Gulf Connect, the commercial relationship is disclosed on that content.",
    },
    {
      heading: "Third-party content and links",
      scope: "The position on material published by others and on links leaving this site.",
    },
    {
      heading: "Forward-looking statements",
      scope:
        "The treatment of any statement about the future made by a company featured in content published here.",
    },
    { heading: "Limitation of liability", scope: "The limits of liability for use of this site." },
  ],
};

export const termsOfUse: LegalPage = {
  slug: "terms",
  title: "Terms of Use",
  eyebrow: "Legal",
  lead: "The terms on which this website may be used.",
  sections: [
    { heading: "Acceptance", scope: "That use of the site constitutes acceptance of these terms." },
    {
      heading: "Permitted use",
      scope: "What visitors may do with material on the site, and what they may not.",
    },
    {
      heading: "Intellectual property",
      scope:
        "Ownership of the content, marks and materials published here, including content produced for clients.",
    },
    {
      heading: "Registration and accounts",
      scope:
        "The terms applying to investor registration, including accuracy of the details provided and the basis on which access to gated content is granted.",
    },
    {
      heading: "Availability",
      scope: "That the site is provided as it is, without a commitment to continuous availability.",
    },
    {
      heading: "Governing law and jurisdiction",
      scope: "The law governing these terms and the forum for any dispute.",
    },
    { heading: "Changes to these terms", scope: "How changes take effect." },
  ],
};

export const cookieNotice: LegalPage = {
  slug: "cookies",
  title: "Cookie Notice",
  eyebrow: "Legal",
  lead: "What this website stores on your device, and how to control it.",
  sections: [
    {
      heading: "Strictly necessary cookies",
      scope:
        "The small number of items required for the site to function, including the record of your own cookie preference. These are set without consent because the site cannot work without them.",
    },
    {
      heading: "Analytics",
      scope:
        "What would be measured, by whom, and for how long. Analytics are off until consent is given, and nothing analytics-related loads before then.",
    },
    {
      heading: "How to change your choice",
      scope:
        "How to accept, reject or revisit the decision at any time, and what happens to data already collected.",
    },
    {
      heading: "Cookies set by others",
      scope: "The position on embedded content and anything it may set.",
    },
  ],
};

export const legalPages: LegalPage[] = [privacyPolicy, disclaimer, termsOfUse, cookieNotice];
