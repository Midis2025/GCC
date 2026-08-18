import { Logo } from "@/components/layout/Logo";
import { NavLink } from "@/components/layout/NavLink";
import { Container } from "@/components/ui/Container";
import { footerNav, legalNav, socialLinks } from "@/data/navigation";
import { complianceConfig, contactConfig, siteConfig } from "@/data/site";

/**
 * Institutional footer.
 *
 * Every contact and compliance value is read from the central config and each
 * block is conditional, so unsupplied details are omitted entirely rather than
 * rendering an empty row or placeholder text.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const hasContactDetails = Boolean(
    contactConfig.email || contactConfig.phone || contactConfig.address,
  );

  return (
    <footer className="surface-dark">
      <Container className="pb-10 pt-[var(--space-section-sm)]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)] lg:gap-16">
          <div className="max-w-sm">
            <Logo size="md" />
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
              {siteConfig.shortDescription}
            </p>
            {contactConfig.locality && (
              <p className="mt-4 text-label uppercase text-(--color-foreground-subtle)">
                {contactConfig.locality}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.label} aria-label={group.label}>
                <h2 className="text-label font-medium uppercase text-(--color-foreground-subtle)">
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
                <h2 className="text-label font-medium uppercase text-(--color-foreground-subtle)">
                  Contact
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
        </div>

        {/* Client-approved compliance wording only. Omitted while unsupplied. */}
        {(complianceConfig.disclaimer || complianceConfig.regulatoryStatement) && (
          <div className="mt-16 max-w-3xl border-t border-(--color-border) pt-8 text-sm leading-relaxed text-(--color-foreground-subtle)">
            {complianceConfig.disclaimer && <p>{complianceConfig.disclaimer}</p>}
            {complianceConfig.regulatoryStatement && (
              <p className="mt-3">{complianceConfig.regulatoryStatement}</p>
            )}
          </div>
        )}

        <div className="mt-16 flex flex-col gap-5 border-t border-(--color-border) pt-8 sm:flex-row-reverse sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {legalNav.map((item) => (
              <NavLink key={item.href} item={item} className="py-1 text-sm" />
            ))}

            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="inline-flex h-11 w-11 items-center justify-center -ml-3 text-(--color-foreground-muted) transition-colors hover:text-(--color-foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
              >
                <LinkedInGlyph />
              </a>
            ))}
          </div>

          <p className="text-sm text-(--color-foreground-subtle)">
            &copy; {year} {siteConfig.legalName || siteConfig.name}. All rights reserved.
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
