"use client";

import Link from "next/link";
import type { ComponentPropsWithRef } from "react";

import { useLocalePath } from "@/components/layout/LocaleProvider";
import { isExternalHref } from "@/lib/utils";

export interface LocaleLinkProps extends Omit<ComponentPropsWithRef<typeof Link>, "href"> {
  /** An UNPREFIXED route, e.g. `/about` or `/for-investors#register`. */
  href: string;
}

/**
 * An internal link that stays in the current language.
 *
 * ---------------------------------------------------------------------------
 * Why this exists as a component rather than a hook call at each site
 * ---------------------------------------------------------------------------
 * Reading the locale on the client needs a hook, and a hook cannot be called
 * from a Server Component. Most of this site's links are written in Server
 * Components - the CTA bands, the service navigation, the insight cards - so
 * `useLocalePath()` cannot be used where they are declared.
 *
 * A Server Component can, however, RENDER a Client Component. So the hook lives
 * in here, and `Button` and the server-rendered links use this in place of
 * `next/link` without becoming client components themselves.
 *
 * ---------------------------------------------------------------------------
 * What it does not touch
 * ---------------------------------------------------------------------------
 * External URLs and bare fragments pass through unchanged. A fragment is a
 * position on the page already being read, so prefixing one would turn an
 * in-page jump into a navigation - and in Arabic, a navigation to the wrong
 * language.
 *
 * A path WITH a fragment - `/for-investors#register` - is prefixed on the path
 * and keeps its fragment, which is what makes the "Join the list" links work
 * in both languages.
 */
export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const localise = useLocalePath();

  const resolved =
    href.startsWith("#") || isExternalHref(href) ? href : localise(href);

  return <Link href={resolved} {...props} />;
}
