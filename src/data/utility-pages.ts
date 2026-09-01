/**
 * ============================================================================
 * UTILITY PAGES
 * ============================================================================
 * Copy for the three routes a visitor reaches without choosing to: the 404,
 * the opt-in confirmation and the unsubscribe result.
 *
 * MOVED, NOT REWRITTEN. Every string below was written inline in
 * `not-found.tsx`, `confirm/page.tsx` and `unsubscribe/page.tsx` and is
 * reproduced here word for word, so that each can have an Arabic sibling in
 * `content/ar/utility-pages.ts`.
 *
 * ---------------------------------------------------------------------------
 * CONTENT INTEGRITY. Two rules, both carried over from the pages themselves.
 *
 * 1. THE STATES ARE HONEST. `confirm` and `unsubscribe` each have a failure
 *    branch that says plainly that the system did not record what the visitor
 *    asked for, and tells them to make contact rather than assume it worked.
 *    Neither may be softened into a thank-you: telling somebody they are on a
 *    list they are not on, or off one they are still on, is the single most
 *    damaging thing either route can do.
 *
 * 2. THE `reviewNote` STRINGS ARE FOR THE BUILD REVIEW, not for a visitor in
 *    normal operation. They name the environment variable that has not been
 *    set. They are copy all the same, because a reviewer reads them.
 */

/** 404. */
export const notFoundContent = {
  eyebrow: "404",
  title: "This page could not be found.",
  lead: "The page you are looking for may have moved, or the address may be incorrect.",
  home: "Return home",
  contact: "Contact Gulf Connect",
  /** Heading over the route list. */
  goTo: "Go to",
} as const;

/**
 * Double opt-in confirmation.
 *
 * COMPLIANCE: `confirmed.lead` states what a confirmed registrant will
 * receive. It is a description of the mailing, not a promise about briefings -
 * "invitations to briefings for which your sector interests are relevant" is
 * the same qualification `briefingProcess` step 05 makes.
 */
export const confirmContent = {
  eyebrow: "Registration",
  actionInvestors: "For Investors",
  actionContact: "Contact Gulf Connect",
  /** The accessible name of the review-note band. */
  statusLabel: "Status",

  failed: {
    title: "This link could not be confirmed.",
    expired:
      "Confirmation links are valid for fourteen days. This one has passed that, so please register again and confirm from the new email.",
    unconfigured:
      "The confirmation system is not yet connected on this deployment, so this link cannot be checked.",
    unconfiguredNote:
      "Note for review: set OPTIN_SECRET in the deployment environment. Until it is set, no confirmation link can be signed or verified.",
    invalid:
      "The link may have been altered or truncated in your email client. Please try opening it again from the original message, or register once more.",
  },

  confirmed: {
    title: "Your registration is confirmed.",
    lead: "Thank you. You will receive invitations to briefings for which your sector interests are relevant, The Gulf Brief, quarterly Sector Notes and access to the interview library. You can unsubscribe from any message we send.",
  },

  notRecorded: {
    title: "We could not complete your confirmation.",
    lead: "Your link is valid, but the registration system did not record the confirmation. Please contact us so it can be completed by hand rather than assuming you are on the list.",
    /** `{reason}` is replaced with the reason the CRM returned. */
    note: "Note for review: {reason}",
    fallbackReason: "the CRM did not record the confirmation.",
  },
} as const;

/** Unsubscribe. */
export const unsubscribeContent = {
  eyebrow: "Email",
  actionContact: "Contact Gulf Connect",
  actionPrivacy: "Privacy Policy",
  statusLabel: "Status",

  failed: {
    title: "We could not action this unsubscribe link.",
    lead: "The link may have been altered or truncated in your email client. Please contact us and we will remove you from the list by hand — you do not need a working link to be unsubscribed.",
    unconfiguredNote:
      "Note for review: set OPTIN_SECRET in the deployment environment. Until it is set, no unsubscribe link can be signed or verified.",
  },

  done: {
    title: "You have been unsubscribed.",
    lead: "Your address has been suppressed permanently. You will receive no further briefing invitations or written content from Gulf Connect.",
  },

  notRecorded: {
    title: "We could not record your unsubscribe.",
    lead: "Please contact us so it can be actioned by hand. We would rather you heard that plainly than be told you were removed from a list that still holds your address.",
    note: "Note for review: {reason}",
    fallbackReason: "the CRM did not record the suppression.",
  },
} as const;
