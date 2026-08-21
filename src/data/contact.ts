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

export const areaOfInterestOptions: SelectOption[] = [
  { label: "Investor Relations", value: "investor-relations" },
  { label: "Investor Outreach", value: "investor-outreach" },
  { label: "Media Relations", value: "media-relations" },
  { label: "Digital Communications", value: "digital-communications" },
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
