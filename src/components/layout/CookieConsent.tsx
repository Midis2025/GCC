"use client";

import { useEffect, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const STORAGE_KEY = "gc-cookie-consent";

type Consent = "accepted" | "rejected";

/**
 * ============================================================================
 * COOKIE CONSENT
 * ============================================================================
 * Non-essential cookies are OFF until someone turns them on. Not "off until
 * the banner is dismissed" - off until an explicit Accept.
 *
 * That distinction is the whole point of the component:
 *
 *   - There is no close button, and dismissing by clicking away is not
 *     possible. The two ways out are Accept and Reject, which are equally
 *     prominent and equally easy to reach.
 *   - Reject is a real choice that is recorded, not a deferral. It stores a
 *     decision, so the banner does not reappear on the next page to wear the
 *     visitor down.
 *   - Nothing analytics-related loads before a stored `accepted`. There is no
 *     script waiting in the page for permission; the loading happens in
 *     `enableAnalytics()` and that function is only ever called after consent.
 *
 * The stored value is a single string in localStorage. No cookie is set to
 * record the cookie preference - localStorage is not a cookie, and using one
 * here would mean setting the very thing consent is being asked about.
 *
 * ----------------------------------------------------------------------------
 * WIRING ANALYTICS
 * ----------------------------------------------------------------------------
 * No analytics provider is configured. When one is chosen, put the loader in
 * `enableAnalytics()` below and nothing else changes: consent gating, the
 * banner, the stored preference and the ability to change it later are all
 * already in place.
 */

/**
 * Called only after consent has been given.
 *
 * Deliberately empty. Adding a provider here is the entire integration - and
 * because it is the only call site, there is no second path by which a tag
 * could reach the page unconsented.
 */
function enableAnalytics(): void {
  /*
   * IMPLEMENTATION NOTE: inject the provider's script here.
   *
   * Do not add it to `layout.tsx` with a consent check inside the script -
   * that loads the third party before consent, which is the thing being
   * consented to.
   */
}

function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    /*
     * Private mode, blocked storage, or an embedded context. Treat an
     * unreadable store as "no decision" and show the banner: failing towards
     * asking is correct, failing towards assuming consent is not.
     */
    return null;
  }
}

/*
 * The stored preference read as an external store rather than copied into
 * state by an effect.
 *
 * localStorage IS an external system, which makes `useSyncExternalStore` the
 * right tool: the server snapshot is "unknown" so nothing renders during
 * prerender, the client snapshot is whatever is stored, and a decision
 * notifies subscribers so the banner disappears immediately.
 *
 * The alternative - reading in an effect and calling setState - renders the
 * banner once for every visitor who already decided, then removes it on the
 * next commit. That is a visible flash on every page load, and it is what the
 * "no setState in an effect" rule exists to prevent.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function getSnapshot(): Consent | null {
  return readConsent();
}

/** Pre-hydration. Renders nothing, because the server cannot know the choice. */
function getServerSnapshot(): "unknown" {
  return "unknown";
}

export function CookieConsent() {
  const decision = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /*
   * Enabling analytics for a visitor who accepted on an earlier visit. This
   * effect sets no state - it only tells an external system about a decision
   * that was already made.
   */
  useEffect(() => {
    if (decision === "accepted") enableAnalytics();
  }, [decision]);

  function decide(next: Consent) {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* If it cannot be stored the choice still applies to this page view. */
    }
    for (const listener of listeners) listener();
    if (next === "accepted") enableAnalytics();
  }

  if (decision !== null) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-heading"
      className="tokens-dark fixed inset-x-0 bottom-0 z-50 border-t border-(--color-border) bg-(--midnight)/97 backdrop-blur-xl"
    >
      <Container className="py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-[68ch]">
            <h2
              id="cookie-consent-heading"
              className="text-label uppercase text-(--color-accent)"
            >
              Cookies
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
              We use a small number of cookies that are necessary for this site to work. We would
              also like to measure how the site is used, but only if you agree. Analytics stay off
              unless you accept.{" "}
              <a href="/cookies" className="link-underline text-(--color-foreground)">
                Cookie Notice
              </a>
            </p>
          </div>

          {/*
            Equal weight, deliberately. Reject is not a smaller, greyer, harder
            control than Accept - a choice presented unevenly is not a choice.
          */}
          <div className="flex shrink-0 flex-col gap-3 xs:flex-row">
            <Button onClick={() => decide("accepted")} size="sm">
              Accept
            </Button>
            <Button onClick={() => decide("rejected")} size="sm" variant="outline">
              Reject non-essential
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
