import { NextResponse } from "next/server";

import { suppressContact } from "@/lib/crm";
import { verifyToken } from "@/lib/optin";

/**
 * ============================================================================
 * ONE-CLICK UNSUBSCRIBE (RFC 8058)
 * ============================================================================
 * The endpoint a mail client hits for `List-Unsubscribe-Post`.
 *
 * Gmail and Outlook show their own "unsubscribe" control beside the sender
 * name when a message carries both headers:
 *
 *   List-Unsubscribe: <https://…/api/unsubscribe?token=…>, <mailto:…>
 *   List-Unsubscribe-Post: List-Unsubscribe=One-Click
 *
 * The client POSTs here with `List-Unsubscribe=One-Click` in the body and never
 * loads a page, so this route returns a bare 200 and renders nothing. The
 * human-visible link in the message footer points at `/unsubscribe` instead.
 * Both call `suppressContact`, so there is one implementation.
 *
 * RFC 8058 requires the POST to act WITHOUT any further confirmation, which is
 * why there is no interstitial here and none on the page either.
 *
 * GET is not implemented. A one-click endpoint that acts on GET gets fired by
 * every link-scanning security appliance that inspects the message, and
 * unsubscribes people who never clicked anything.
 */

export const runtime = "nodejs";

export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? undefined;
  const verified = verifyToken("unsubscribe", token);

  if (!verified.ok) {
    return NextResponse.json({ ok: false, reason: verified.reason }, { status: 400 });
  }

  try {
    const result = await suppressContact(verified.email);

    if (!result.updated) {
      /*
       * Logged rather than swallowed. A one-click unsubscribe that fails
       * silently is a compliance failure, and the recipient sees only their
       * own mail client's confirmation - so this line is the only trace.
       */
      console.warn("[unsubscribe] suppression not recorded", { reason: result.reason });
      return NextResponse.json({ ok: false, reason: result.reason }, { status: 503 });
    }
  } catch (error) {
    console.warn("[unsubscribe] suppression failed", {
      reason: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
