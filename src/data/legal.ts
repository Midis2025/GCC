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
 * fixed fees, no solicitation, no performance-linked compensation, disclosure
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

export const privacyPolicy: LegalPage = {
  slug: "privacy",
  title: "Privacy Policy",
  eyebrow: "Legal",
  lead: "How Gulf Connect Consultancy FZCO collects, uses, stores and protects personal information submitted through this website.",
  sections: [
    {
      heading: "Who we are and how to contact us",
      scope:
        "The identity of the controller, the registered entity, and the address for privacy enquiries and requests.",
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
        "That material on this site is general information about the services of Gulf Connect Consultancy FZCO and commentary on sectors and markets, and is not directed at any individual's circumstances.",
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
    {
      heading: "Compensation",
      scope:
        "That Gulf Connect is paid fixed professional fees for defined scopes of work, and receives no compensation linked to capital raised, share price or trading volume.",
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
