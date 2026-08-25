"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { CompanyForm } from "@/components/sections/CompanyForm";
import { InvestorForm } from "@/components/sections/InvestorForm";
import { cn } from "@/lib/utils";

type Audience = "company" | "investor";

const OPTIONS: Array<{ value: Audience; label: string }> = [
  { value: "company", label: "I represent a company" },
  { value: "investor", label: "I am an investor" },
];

/**
 * The Contact toggle.
 *
 * Two audiences, two forms, one page. Which one is showing is a genuine choice
 * a visitor makes, so it is a radio group rather than a pair of tabs - the two
 * options are mutually exclusive answers to a question the legend asks, and
 * arrow keys move between them the way they do in any other radio group.
 *
 * ---------------------------------------------------------------------------
 * The deep link
 * ---------------------------------------------------------------------------
 * Service pages route here as `/contact?enquiry=company`, which pre-selects the
 * issuer form. That is the brief's "pre-selected if technically possible", and
 * it is: a reader who has just finished the roadshows page is a company, and
 * making them re-answer a question they have effectively already answered is
 * friction for nothing.
 *
 * `?enquiry=investor` works the same way, so the investor path can be linked
 * directly from anywhere.
 *
 * The parameter is read once on mount rather than watched. A visitor who
 * switches the toggle by hand has overridden the link, and re-applying it on
 * every render would fight them.
 *
 * ---------------------------------------------------------------------------
 * One investor form, not two
 * ---------------------------------------------------------------------------
 * The investor side renders exactly the same `InvestorForm` as the For
 * Investors page, posting the same payload to the same endpoint. The brief is
 * explicit that there must not be two investor databases, and the surest
 * guarantee of that is that there is only one form.
 */
export function ContactRouter() {
  const params = useSearchParams();
  const requested = params.get("enquiry");

  /*
   * Read in the initialiser, not in an effect.
   *
   * A `useState` initialiser runs on the first render only, which is exactly
   * the semantics wanted here: the link decides the starting audience, and a
   * visitor who then moves the toggle has overridden it. Doing this in an
   * effect would set state during mount and trigger a second render for no
   * reason, and would also mean the first paint showed the wrong form.
   */
  const [audience, setAudience] = useState<Audience>(() =>
    requested === "investor" || requested === "company" ? requested : "company",
  );

  return (
    <div>
      <fieldset>
        <legend className="text-label uppercase text-(--color-foreground-subtle)">
          Who is enquiring
        </legend>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {OPTIONS.map((option) => {
            const active = audience === option.value;

            return (
              <label
                key={option.value}
                className={cn(
                  "relative flex cursor-pointer items-center gap-3.5 border px-5 py-4 transition-colors duration-500",
                  active
                    ? "border-(--color-accent) bg-[color-mix(in_srgb,var(--color-accent)_7%,transparent)]"
                    : "border-(--color-border) hover:border-(--color-accent)/50",
                )}
              >
                <input
                  type="radio"
                  name="audience"
                  value={option.value}
                  checked={active}
                  onChange={() => setAudience(option.value)}
                  className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />

                {/* Drawn indicator, square like every other control on the site. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-3 w-3 shrink-0 border transition-colors duration-300",
                    active
                      ? "border-(--color-accent) bg-(--color-accent)"
                      : "border-(--color-border)",
                    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--color-ring)",
                  )}
                />

                <span
                  className={cn(
                    "text-[0.9375rem] transition-colors duration-300",
                    active ? "text-(--color-foreground)" : "text-(--color-foreground-muted)",
                  )}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-10 border-t border-(--color-border) pt-9">
        {audience === "company" ? (
          <CompanyForm source="/contact" />
        ) : (
          <InvestorForm source="/contact" />
        )}
      </div>
    </div>
  );
}
