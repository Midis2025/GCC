import { Logo } from "@/components/layout/Logo";
import { NavLink } from "@/components/layout/NavLink";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/content";
import { footerNav, legalNav, socialLinks } from "@/data/navigation";
import { localiseNavGroups, localiseNavItems } from "@/lib/nav-i18n";
import { contactConfig, siteConfig } from "@/data/site";
import { gulfMarkets } from "@/data/homepage";

/**
 * Institutional footer.
 *
 * Every contact and compliance value is read from the central config and each
 * block is conditional, so unsupplied details are omitted entirely rather than
 * rendering an empty row or placeholder text.
 *
 * Structurally it closes the page rather than repeating it: an oversized
 * wordmark and the market line sit above the link columns, and a fine rule
 * field carries the same drawn language as the heroes. It never carries a call
 * to action, because `CTASection` already precedes it on every route.
 */
export async function Footer() {
  const t = await getDictionary();
  const groups = localiseNavGroups(footerNav, t);
  const legal = localiseNavItems(legalNav, t);
  const year = new Date().getFullYear();
  const hasContactDetails = Boolean(
    contactConfig.email || contactConfig.phone || contactConfig.address,
  );

  return (
    <footer className="surface-dark relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="rule-field absolute inset-y-0 end-0 -z-10 w-[40%] opacity-70 [--rule-gap:6.5rem]"
      />

      <Container className="pb-10 pt-[var(--space-section-md)]">
        {/* Identity band. */}
        <div className="flex flex-col gap-8 border-b border-(--color-border) pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-lg">
            <Logo size="lg" />
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
              {siteConfig.shortDescription}
            </p>
          </div>

          <div className="lg:text-end">
            <p className="text-label uppercase text-(--color-foreground-subtle)">
              Markets
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
              {gulfMarkets.map((market) => (
                <li key={market.code} className="text-[0.9375rem] text-(--color-foreground-muted)">
                  {market.label}
                </li>
              ))}
              <li className="text-[0.9375rem] text-(--color-accent)">{t.footer.international}</li>
            </ul>

            {contactConfig.locality && (
              <p className="mt-5 text-label uppercase text-(--color-foreground-subtle)">
                {contactConfig.locality}
              </p>
            )}
          </div>
        </div>

        {/* Link columns. */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-12 sm:grid-cols-3 lg:grid-cols-4">
          {groups.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <h2 className="text-label uppercase text-(--color-foreground-subtle)">
                {group.label}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={`${group.label}-${item.href}-${item.label}`}>
                    <NavLink item={item} className="py-1 text-[0.9375rem]" />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {hasContactDetails && (
            <div>
              <h2 className="text-label uppercase text-(--color-foreground-subtle)">
                {t.footer.contact}
              </h2>
              <ul className="mt-5 flex flex-col gap-3 text-[0.9375rem] text-(--color-foreground-muted)">
                {contactConfig.email && (
                  <li>
                    <a
                      href={`mailto:${contactConfig.email}`}
                      className="link-underline inline-block py-1 hover:text-(--color-foreground)"
                    >
                      {contactConfig.email}
                    </a>
                  </li>
                )}
                {contactConfig.phone && (
                  <li>
                    <a
                      href={`tel:${contactConfig.phone.replace(/\s+/g, "")}`}
                      className="link-underline inline-block py-1 hover:text-(--color-foreground)"
                    >
                      {contactConfig.phone}
                    </a>
                  </li>
                )}
                {contactConfig.address && (
                  <li>
                    <address className="not-italic">{contactConfig.address}</address>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/*
          STANDING DISCLOSURE - every page, no exceptions.

          Client-approved wording, reproduced verbatim from `data/site.ts`. It
          is not conditional and it is not collapsible: the brief requires it on
          every page and it is the line that keeps the site on the right side of
          an unlicensed-activity question.

          Set at 15px on the muted foreground - the same size as the contact
          details above it, not the 9px this kind of paragraph usually gets. The
          brief says so explicitly, and a disclosure nobody can read is not a
          disclosure. The measure is capped so it sets as readable paragraphs
          rather than one full-bleed line.
        */}
        <div className="mt-16 border-t border-(--color-border) pt-8">
          {/*
            74ch, down from 92. The cap was only ever guarding against a
            full-bleed line: 92ch at this size still runs past the width where
            the eye reliably finds the start of the next line, and this is the
            paragraph a reader is least motivated to fight for. It was also the
            widest measure on the site - every other body column sits between
            46ch and 62ch - so the disclosure was the one block that did not
            match the page it closes.
          */}
          <p className="max-w-[74ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
            {t.footer.disclosure}
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-(--color-border) pt-8 sm:flex-row-reverse sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {legal.map((item) => (
              <NavLink key={item.href} item={item} className="py-1 text-sm" />
            ))}

            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="-ms-3 inline-flex h-11 w-11 items-center justify-center text-(--color-foreground-muted) transition-colors hover:text-(--color-foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
              >
                <LinkedInGlyph />
              </a>
            ))}
          </div>

          <p className="text-sm text-(--color-foreground-subtle)">
            &copy; {year} {siteConfig.legalName || siteConfig.name}. {t.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function LinkedInGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.65h.05a4.17 4.17 0 0 1 3.75-2.06c4 0 4.75 2.63 4.75 6.06V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4V9Z" />
    </svg>
  );
}
