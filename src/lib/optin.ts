import { createHmac, timingSafeEqual } from "node:crypto";

import { absoluteUrl } from "@/lib/seo";

/**
 * ============================================================================
 * OPT-IN AND UNSUBSCRIBE LINKS
 * ============================================================================
 * The two links that carry an identity in a URL: the double opt-in
 * confirmation and the one-click unsubscribe.
 *
 * ----------------------------------------------------------------------------
 * WHY THE LINK IS SIGNED AND NOT JUST AN EMAIL IN A QUERY STRING
 * ----------------------------------------------------------------------------
 * `/confirm?email=someone@example.com` would let anyone confirm anyone. That is
 * not a theoretical problem: the entire value of double opt-in is that it
 * evidences that the person who owns the address asked to be on the list, and a
 * link that can be constructed by hand evidences nothing at all. The same
 * applies in reverse to unsubscribe, where a guessable link lets a stranger
 * remove somebody else from the list.
 *
 * So the address travels inside a payload that is signed with a server-only
 * secret. The payload is readable - it is not encryption and does not need to
 * be - but it cannot be altered without invalidating the signature.
 *
 * ----------------------------------------------------------------------------
 * CONFIGURATION
 * ----------------------------------------------------------------------------
 * One server-only variable, `OPTIN_SECRET`. Any long random string; generate it
 * with `openssl rand -hex 32`. It must NOT be prefixed `NEXT_PUBLIC_`.
 *
 * Until it is set, `isOptInConfigured()` is false and `createToken` returns
 * undefined. Callers degrade rather than inventing an unsigned link: the
 * confirmation email is only sent once mail is configured, and the pages that
 * consume these tokens say plainly that the journey is not yet wired up.
 *
 * Changing the secret invalidates every link already sent. That is the correct
 * trade for a compromised secret and a reason not to rotate it casually.
 */

/** How long a confirmation link stays valid. Fourteen days, in milliseconds. */
const CONFIRM_TTL_MS = 14 * 24 * 60 * 60 * 1000;

/**
 * What the token authorises.
 *
 * Part of the signed payload, so a confirmation link cannot be replayed
 * against the unsubscribe route or the other way round.
 */
export type TokenPurpose = "confirm" | "unsubscribe";

interface TokenPayload {
  purpose: TokenPurpose;
  email: string;
  /** Milliseconds since the epoch, at issue. */
  issuedAt: number;
}

export function isOptInConfigured(): boolean {
  return Boolean(process.env.OPTIN_SECRET);
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64url(input: string): Buffer {
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function sign(body: string, secret: string): string {
  return base64url(createHmac("sha256", secret).update(body).digest());
}

/**
 * Builds a signed token for an address.
 *
 * Returns undefined when no secret is configured, so a caller cannot
 * accidentally produce an unsigned link that would then have to be honoured.
 */
export function createToken(purpose: TokenPurpose, email: string): string | undefined {
  const secret = process.env.OPTIN_SECRET;
  if (!secret) return undefined;

  const payload: TokenPayload = {
    purpose,
    email: email.trim().toLowerCase(),
    issuedAt: Date.now(),
  };

  const body = base64url(JSON.stringify(payload));
  return `${body}.${sign(body, secret)}`;
}

export type TokenResult =
  | { ok: true; email: string }
  | { ok: false; reason: "unconfigured" | "invalid" | "expired" };

/**
 * Verifies a token and returns the address it was issued for.
 *
 * Four ways this fails, and they are deliberately distinguished so the pages
 * can say something useful rather than "invalid link":
 *
 *   unconfigured  no secret on this deployment - nothing was ever signable
 *   invalid       malformed, tampered with, or issued for another purpose
 *   expired       a confirmation link older than the TTL
 *
 * The signature comparison is `timingSafeEqual`, and the lengths are checked
 * first because it throws on a length mismatch.
 */
export function verifyToken(purpose: TokenPurpose, token: string | undefined): TokenResult {
  const secret = process.env.OPTIN_SECRET;
  if (!secret) return { ok: false, reason: "unconfigured" };
  if (!token) return { ok: false, reason: "invalid" };

  const [body, signature] = token.split(".");
  if (!body || !signature) return { ok: false, reason: "invalid" };

  const expected = sign(body, secret);
  const given = Buffer.from(signature);
  const wanted = Buffer.from(expected);
  if (given.length !== wanted.length || !timingSafeEqual(given, wanted)) {
    return { ok: false, reason: "invalid" };
  }

  let payload: TokenPayload;
  try {
    payload = JSON.parse(fromBase64url(body).toString("utf8")) as TokenPayload;
  } catch {
    return { ok: false, reason: "invalid" };
  }

  if (payload.purpose !== purpose || typeof payload.email !== "string" || !payload.email) {
    return { ok: false, reason: "invalid" };
  }

  /*
   * Only confirmation links expire.
   *
   * An unsubscribe link has to work in an email somebody kept for three years,
   * because the alternative is a recipient who wants out and cannot get out -
   * which is the failure the rule exists to prevent.
   */
  if (purpose === "confirm" && Date.now() - payload.issuedAt > CONFIRM_TTL_MS) {
    return { ok: false, reason: "expired" };
  }

  return { ok: true, email: payload.email };
}

/** The link that completes a double opt-in. Undefined when unconfigured. */
export function confirmationUrl(email: string): string | undefined {
  const token = createToken("confirm", email);
  return token ? absoluteUrl(`/confirm?token=${encodeURIComponent(token)}`) : undefined;
}

/**
 * The visible unsubscribe link for a marketing message.
 *
 * The `List-Unsubscribe` header version of the same thing points at
 * `/api/unsubscribe`, which takes the identical token by POST so a mail client
 * can action it without the recipient opening a page.
 */
export function unsubscribeUrl(email: string): string | undefined {
  const token = createToken("unsubscribe", email);
  return token ? absoluteUrl(`/unsubscribe?token=${encodeURIComponent(token)}`) : undefined;
}
