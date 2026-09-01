"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";

import { useLocale } from "@/components/layout/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { optionLabel } from "@/content/dictionary";
import { preferredTimeOptions } from "@/data/contact";
import { investorCategories, investorSectors } from "@/data/for-investors";
import { todayAsInputValue } from "@/lib/utils";

type Errors = Partial<Record<string, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface SubmitResult {
  ok: boolean;
  stored: boolean;
  optInStatus: string;
}

/**
 * Investor registration.
 *
 * ONE form, used in two places - the For Investors page and the investor side
 * of the Contact toggle. The brief is explicit that there must not be two
 * investor databases, and the surest way to avoid two databases is to have
 * only one form that can write to one.
 *
 * ---------------------------------------------------------------------------
 * The three things on this form that are compliance controls
 * ---------------------------------------------------------------------------
 * 1. Investor category is REQUIRED and has no "prefer not to say". It records
 *    the basis on which a registrant was classified, and briefings are directed
 *    at institutional and professional audiences. A record without it cannot be
 *    relied on. Selecting "Other" is a real answer with a consequence, stated
 *    on the form rather than hidden in the handler.
 *
 * 2. Consent is a separate, unticked checkbox with its own wording. It is not
 *    bundled into the submit action, there is no pre-selection, and the server
 *    rejects any submission without it rather than storing a false flag.
 *
 * 3. Double opt-in. A successful submission does not make someone a member; it
 *    sends them an email. The success state says exactly that, because telling
 *    someone they have joined a list they have not yet confirmed is the first
 *    step towards a list that cannot be evidenced.
 *
 * Validation here is a convenience. The server validates independently.
 */
export function InvestorForm({
  source,
  meetingPreference = false,
}: {
  source: string;
  /**
   * Adds the preferred date and time pair.
   *
   * Opt-in, and off by default, because this is ONE component rendered in two
   * places. On the Contact page it is an enquiry and asking when to meet is the
   * point of the page; on For Investors it is a registration for a mailing
   * list, and making someone pick a meeting slot to receive The Gulf Brief
   * would be a different form with a different purpose.
   */
  meetingPreference?: boolean;
}) {
  /*
    Every visible string on this form comes from the shared dictionary.

    The form is a Client Component, so it reads the language through
    `LocaleProvider` rather than through `pick`. Nothing that is SUBMITTED
    passes through here: the option values still come from the data modules and
    are identical in both editions - see `forms.options` in
    `content/dictionary.ts`.
  */
  const { locale, t } = useLocale();
  const f = t.forms.investor;
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /*
    The floor on the date field, written onto the element rather than rendered.

    Both pages that carry this form are statically prerendered, so a `min`
    computed during render would be the BUILD date and stale the next morning.
    It cannot come from the server at request time either - the browser and the
    server are routinely in different timezones. So it is set from the
    visitor's own clock on mount, which makes it an affordance; `validate`
    below is what actually refuses a date that has passed.
  */
  const boundToToday = useCallback((node: HTMLInputElement | null) => {
    if (node) node.min = todayAsInputValue();
  }, []);

  function validate(data: FormData): Errors {
    const e = t.forms.errors;
    const next: Errors = {};
    const value = (key: string) => String(data.get(key) ?? "").trim();

    if (!value("name")) next.name = e.name;
    if (!value("firm")) next.firm = e.firm;
    if (!value("role")) next.role = e.role;

    const email = value("email");
    if (!email) next.email = e.email;
    else if (!EMAIL_PATTERN.test(email)) next.email = e.emailInvalid;

    if (!value("country")) next.country = e.country;
    if (!value("investorCategory")) {
      next.investorCategory = e.investorCategory;
    }

    // Only where the pair is shown. Validating a field that is not on the form
    // would make it unsubmittable and give nothing to focus.
    if (meetingPreference) {
      const preferredDate = value("preferredDate");
      if (!preferredDate) next.preferredDate = e.preferredDate;
      else if (preferredDate < todayAsInputValue()) {
        // Both sides are `YYYY-MM-DD`, which compares correctly as a string.
        next.preferredDate = e.preferredDatePast;
      }

      if (!value("preferredTime")) next.preferredTime = e.preferredTime;
    }

    if (data.get("consent") !== "on") {
      next.consent = e.consent;
    }

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailure(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    setPending(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "investor-registration",
          source,
          name: data.get("name"),
          firm: data.get("firm"),
          role: data.get("role"),
          email: data.get("email"),
          country: data.get("country"),
          investorCategory: data.get("investorCategory"),
          /*
            The language the form is being filled in, so the route can answer
            in it. Used for validation wording only - it is not stored and it
            changes nothing about the record. See `api/submit`.
          */
          locale,
          // Read from this form's own FormData, so the two forms on the
          // Contact page can never see each other's answers.
          preferredDate: data.get("preferredDate"),
          preferredTime: data.get("preferredTime"),
          sectorsOfInterest: data.getAll("sectorsOfInterest"),
          consent: data.get("consent") === "on",
        }),
      });

      const payload = (await response.json()) as SubmitResult & {
        errors?: Errors;
        error?: string;
      };

      if (!response.ok) {
        if (payload.errors) {
          setErrors(payload.errors);
          const first = Object.keys(payload.errors)[0];
          form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        } else {
          setFailure(payload.error ?? t.forms.errors.generic);
        }
        return;
      }

      setResult(payload);
    } catch {
      setFailure(t.forms.errors.unreachable);
    } finally {
      setPending(false);
    }
  }

  if (result) {
    /*
     * The honest success state.
     *
     * Two separate facts, and the wording changes with both: whether the record
     * was actually stored, and whether the person still has to confirm. Neither
     * is glossed. A "thank you for registering" over a record that was never
     * written would be the single most damaging thing this form could do.
     */
    return (
      <div role="status">
        <span aria-hidden="true" className="block h-px w-12 bg-(--color-accent)" />
        <h3 className="mt-6 font-display text-h3">
          {result.stored ? f.almostThere : f.received}
        </h3>

        <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
          {result.optInStatus === "pending" ? f.pendingBody : f.confirmedBody}
        </p>

        {!result.stored && (
          <p className="mt-6 border-s-2 border-(--color-accent)/50 ps-4 text-sm leading-relaxed text-(--color-foreground-subtle)">
            {f.notStored}
          </p>
        )}

        <div className="mt-8">
          <Button
            variant="outline"
            onClick={() => {
              setResult(null);
              setErrors({});
              formRef.current?.reset();
            }}
          >
            {f.registerAnother}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
      <div className="flex items-center gap-3.5 border-b border-(--color-border) pb-5">
        <span aria-hidden="true" className="h-px w-8 shrink-0 bg-(--color-accent)" />
        <span className="text-label uppercase text-(--color-accent)">{f.badge}</span>
      </div>

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <FormField label={f.fullName} error={errors.name} required>
          <Input name="name" autoComplete="name" />
        </FormField>

        <FormField label={f.firm} error={errors.firm} required>
          <Input name="firm" autoComplete="organization" />
        </FormField>

        <FormField label={f.role} error={errors.role} required>
          <Input name="role" autoComplete="organization-title" />
        </FormField>

        <FormField label={f.workEmail} error={errors.email} required>
          <Input name="email" type="email" inputMode="email" autoComplete="email" />
        </FormField>

        <FormField label={f.country} error={errors.country} required>
          <Input name="country" autoComplete="country-name" />
        </FormField>

        {/*
          COMPLIANCE CONTROL. Required, and with no "prefer not to say" option
          by design - see the note in `data/for-investors.ts`.
        */}
        <FormField
          label={f.category}
          error={errors.investorCategory}
          description={f.categoryHelp}
          required
        >
          <Select
            name="investorCategory"
            /*
              BACKEND VALUES UNCHANGED. `value` is what is submitted and what
              the CRM stores; only the label is looked up by language. A
              missing key falls back to the English label held beside the
              value in `data/for-investors.ts`.
            */
            options={investorCategories.map((option) => ({
              value: option.value,
              label: optionLabel(t.forms.options.investorCategory, option.value, option.label),
            }))}
            placeholder={f.categoryPlaceholder}
          />
        </FormField>

        {/*
          When a conversation would suit.

          Two more cells in the grid this form already uses, so they sit side
          by side from `sm` up and stack below it without a layout of their
          own, and they take the same controls - and therefore the same height,
          border, focus treatment and label styling - as every field above.

          A preference, not a booking: nothing is checked against a calendar
          and nothing is held.
        */}
        {meetingPreference && (
          <>
            {/*
              `type="date"` rather than a calendar of our own: it brings the
              desktop popover, the iOS and Android wheels, the visitor's own
              locale format and keyboard entry. The ref puts today's floor on
              it - see `boundToToday` above.
            */}
            <FormField label={t.forms.company.preferredDate} error={errors.preferredDate} required>
              <Input name="preferredDate" type="date" ref={boundToToday} />
            </FormField>

            <FormField
              label={t.forms.company.preferredTime}
              error={errors.preferredTime}
              description={t.forms.company.timezone}
              required
            >
              <Select
                name="preferredTime"
                options={preferredTimeOptions.map((option) => ({
                  value: option.value,
                  label: optionLabel(t.forms.options.preferredTime, option.value, option.label),
                }))}
                placeholder={t.forms.company.timePlaceholder}
              />
            </FormField>
          </>
        )}
      </div>

      <fieldset>
        <legend className="text-[0.9375rem] font-medium">{f.sectorsLegend}</legend>
        <p className="mt-1.5 text-sm text-(--color-foreground-subtle)">{f.sectorsHelp}</p>

        <div className="mt-5 flex flex-col gap-1">
          {/*
            The VALUE is the English sector string in both editions - it is
            what `api/submit` validates against and what the CRM stores. Only
            the label a registrant reads is looked up by language.
          */}
          {investorSectors.map((sector) => (
            <Checkbox
              key={sector}
              name="sectorsOfInterest"
              value={sector}
              label={optionLabel(t.forms.options.investorSector, sector, sector)}
            />
          ))}
        </div>
      </fieldset>

      {/*
        CONSENT. Separate control, own wording, unticked. Never bundle this
        into the submit action and never pre-select it.
      */}
      <div className="border-t border-(--color-border) pt-7">
        <Checkbox
          name="consent"
          label={f.consentLabel}
          description={f.consentNote}
          error={errors.consent}
        />
      </div>

      {failure && (
        <p role="alert" className="border-s-2 border-(--color-danger) ps-4 text-sm text-(--color-danger)">
          {failure}
        </p>
      )}

      <div className="mt-1 border-t border-(--color-border) pt-7">
        <Button type="submit" size="lg" withArrow disabled={pending}>
          {pending ? t.forms.submitting : f.submit}
        </Button>
      </div>
    </form>
  );
}
