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
} as const;
