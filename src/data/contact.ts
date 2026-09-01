import type { SelectOption } from "@/types";

/**
 * Contact form configuration.
 *
 * `deliveryConfigured` is false until an email provider or form endpoint is
 * connected. While false the form validates and shows its success state for
 * review purposes, and displays a clearly-worded notice that submissions are
 * not yet delivered - so no visitor is misled into thinking a message was sent.
 */
export const contactFormConfig = {
  deliveryConfigured: false,
  /** TODO: set once a provider is chosen and instructed. */
  endpoint: "",
} as const;

/**
 * Area of interest - the four current service lines, plus a general option.
 *
 * These are the names in `data/service-lines.ts` and the values are the page
 * slugs, so an enquiry routes to something that exists. The previous list named
 * Investor Relations, Media Relations and Digital Communications: services the
 * restructure replaced, on pages that now redirect elsewhere.
 *
 * That mattered more here than anywhere else on the site. This field is written
 * into the CRM record, so a stale option is not just a wrong label on a form -
 * it is a wrong value stored against a real enquiry, and every one of those has
 * to be reinterpreted by hand later.
 */
export const areaOfInterestOptions: SelectOption[] = [
  { label: "Investor Roadshows", value: "investor-roadshows" },
  { label: "The Gulf Programme", value: "gulf-programme" },
  { label: "Media & Arabic Communications", value: "media-arabic-communications" },
  { label: "Advisory", value: "advisory" },
  { label: "General Enquiry", value: "general" },
];

/**
 * Preferred meeting times offered on the company enquiry form.
 *
 * A fixed list of whole hours rather than a free time field. Nothing behind
 * these is checked, held or reserved - an enquiry says which hour would suit
 * and a person replies to arrange it - so the list is deliberately shaped like
 * a preference and not like a calendar.
 *
 * Value and label are the same string. It is what the visitor picked, what the
 * notification email reads, and what is stored against the record, so there is
 * no mapping to keep in step and nothing that can be stored as a code whose
 * meaning has to be looked up later.
 *
 * Stated as Gulf Standard Time because `contactConfig.locality` is Dubai. That
 * is the only claim here: no working hours are asserted beyond the fact that
 * these are the hours the form offers.
 */
export const preferredTimeOptions: SelectOption[] = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
].map((time) => ({ label: time, value: time }));

/** Country / market options. Factual place names only. */
export const marketOptions: SelectOption[] = [
  { label: "United Arab Emirates", value: "ae" },
  { label: "Saudi Arabia", value: "sa" },
  { label: "Qatar", value: "qa" },
  { label: "Kuwait", value: "kw" },
  { label: "Bahrain", value: "bh" },
  { label: "Oman", value: "om" },
  { label: "Other international market", value: "intl" },
];

export const contactContent = {
  eyebrow: "Contact",
  /**
   * Label on the enquiry panel itself. A UI affordance rather than copy - it
   * names the object the visitor is looking at, the way `SectionLabel` names a
   * section, and claims nothing.
   */
  formLabel: "Enquiry",
  title: "Start a Conversation",
  lead: "For companies considering an investor relations programme, an outreach mandate or a review of how they are currently understood by the market.",
  introHeading: "Before you write",
  introParagraphs: [
    "It helps to know where a company is starting from: whether it is listed, preparing to list or privately held, which markets matter most, and what prompted the enquiry.",
    "Enquiries are reviewed directly. If a request falls outside what we do, we will say so rather than take a meeting for its own sake.",
  ],

  /*
    MOVED, NOT REWRITTEN. The four strings below were written inline in the
    page and are reproduced here word for word so that they can be translated.
  */

  /** The heading over the enquiry band's left column. */
  introTitle: "Tell us where the company stands today.",

  /**
   * AWAITING CLIENT INFORMATION.
   *
   * Shown in place of an email row and a telephone row while neither has been
   * supplied - see the TODOs on `contactConfig` in `data/site.ts`. Setting
   * either one there replaces this block with the real rows and nothing else
   * changes.
   */
  pendingDetails: {
    label: "Email and telephone",
    body: "Please use the enquiry form. A direct address and number will be published here once confirmed.",
  },

  /** Heading over the five area-of-interest tags. */
  areasHeading: "Areas of interest",
} as const;
