import type { Dictionary } from "@/content/dictionary";

/**
 * ENGLISH CHROME.
 *
 * Every string here is the one the site already shipped, moved rather than
 * rewritten. Sources: `data/navigation.ts`, `CookieConsent`, `CompanyForm`,
 * `InvestorForm`, `FormField`, `SkipLink`, `Footer`.
 *
 * Do not edit the wording. This is a localisation structure; the English copy
 * is approved and out of scope.
 */
export const ui: Dictionary = {
  meta: {
    languageName: "English",
    switchLabel: "Language",
    switchTo: "View this page in Arabic",
  },

  nav: {
    primary: "Primary",
    mobile: "Mobile",
    siteMenu: "Site menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to main content",
    items: {
      whatWeDo: "What We Do",
      forInvestors: "For Investors",
      insight: "Insight",
      about: "About",
      contact: "Contact",
    },
    services: {
      investorRoadshows: "Investor Roadshows",
      gulfProgramme: "The Gulf Programme",
      mediaArabic: "Media & Arabic Communications",
      advisory: "Advisory",
    },
    cta: "Enquire",
    secondaryCta: "Join the list",
  },

  footer: {
    groups: {
      whatWeDo: "What We Do",
      company: "Company",
      forInvestors: "For Investors",
    },
    joinTheList: "Join the list",
    email: "Email",
    telephone: "Telephone",
    office: "Office",
    international: "International",
    contact: "Contact",
    /* Verbatim from `footerDisclosure` in data/site.ts. Do not edit. */
    disclosure:
      "Gulf Connect Consultancy FZCO provides investor communications, events and media services for fixed professional fees. Nothing on this site is an offer, solicitation, recommendation or investment advice, and it should not be relied upon in making any investment decision. Gulf Connect is not licensed to conduct financial services activity in the UAE and does not solicit investment, hold client funds or receive compensation linked to capital raised, share price or trading volume. Where content relates to a company that has engaged Gulf Connect, the commercial relationship is disclosed on that content.",
    legal: {
      privacy: "Privacy Policy",
      disclaimer: "Disclaimer",
      terms: "Terms of Use",
      cookies: "Cookie Notice",
    },
    rights: "All rights reserved.",
  },

  cookies: {
    heading: "Cookies",
    body: "We use a small number of cookies that are necessary for this site to work. We would also like to measure how the site is used, but only if you agree. Analytics stay off unless you accept.",
    noticeLink: "Cookie Notice",
    accept: "Accept",
    reject: "Reject non-essential",
  },

  forms: {
    optional: "Optional",
    required: "(required)",
    submitting: "Submitting…",
    company: {
      badge: "Company Enquiry",
      companyName: "Company name",
      listingVenue: "Listing venue",
      listingVenuePlaceholder: "e.g. LSE, ASX, TSX-V",
      ticker: "Ticker",
      sector: "Sector",
      yourName: "Your name",
      role: "Role",
      workEmail: "Work email",
      phone: "Phone",
      country: "Country",
      areaOfInterest: "Area of interest",
      areaPlaceholder: "Choose an area…",
      preferredDate: "Preferred date",
      preferredTime: "Preferred time",
      timePlaceholder: "Choose a time…",
      timezone: "Gulf Standard Time",
      enquiry: "Enquiry",
      enquiryHelp: "A short outline of your situation and what you are looking for.",
      consentLabel:
        "I agree to Gulf Connect Consultancy FZCO contacting me about this enquiry.",
      submit: "Submit Enquiry",
      successHeading: "Thank you for your enquiry.",
      successBody: "We have your details and a member of the team will read your enquiry.",
      notStored:
        "Note for review: the CRM is not yet connected, so this enquiry was not stored. This state exists so the completed journey can be assessed.",
      sendAnother: "Send another enquiry",
    },
    investor: {
      badge: "Investor Registration",
      fullName: "Full name",
      firm: "Firm",
      role: "Role",
      workEmail: "Work email",
      country: "Country",
      category: "Investor category",
      categoryHelp: "Briefings are directed at institutional and professional audiences.",
      categoryPlaceholder: "Select a category",
      sectorsLegend: "Sectors of interest",
      sectorsHelp: "Optional. We use this to send only the invitations that are relevant to you.",
      consentLabel:
        "I agree to Gulf Connect Consultancy FZCO contacting me by email with briefing invitations and written content, and I understand I can unsubscribe at any time.",
      consentNote:
        "We will send a confirmation email. Your registration is complete once you confirm it from that email.",
      submit: "Register",
      almostThere: "Almost there.",
      received: "Registration received.",
      pendingBody:
        "We have sent you an email. Please confirm your address from that message and your registration is complete. You are not on the list until you do.",
      confirmedBody: "Thank you. We have received your details.",
      notStored:
        "Note for review: the CRM is not yet connected, so this registration was not stored. This state exists so the completed journey can be assessed. Configure the CRM before the site is used with real registrants.",
      registerAnother: "Register someone else",
    },
    errors: {
      companyName: "Please enter your company name.",
      sector: "Please tell us which sector you operate in.",
      name: "Please enter your full name.",
      firm: "Please enter your firm.",
      role: "Please enter your role.",
      email: "Please enter your work email address.",
      emailInvalid: "Please enter a valid email address.",
      country: "Please enter your country.",
      investorCategory: "Please select an investor category.",
      areaOfInterest: "Please choose an area of interest.",
      preferredDate: "Please choose a preferred date.",
      preferredDatePast: "Please choose a date that has not already passed.",
      preferredTime: "Please choose a preferred time.",
      message: "Please tell us briefly what you are looking for.",
      messageShort: "Please add a little more detail.",
      consent: "Please confirm you agree to be contacted.",
      generic: "Something went wrong. Please try again.",
      unreachable: "We could not reach the server. Please try again.",
    },
  },

  insight: {
    by: "By",
    disclosure: "Disclosure",
    clientDisclosure:
      "{company} is a client of Gulf Connect Consultancy FZCO and has paid Gulf Connect a fixed professional fee for communications services.",
    allInsights: "All insights",
  },
};
