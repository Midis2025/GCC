"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { areaOfInterestOptions, preferredTimeOptions } from "@/data/contact";
import { todayAsInputValue } from "@/lib/utils";

type Errors = Partial<Record<string, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface SubmitResult {
  ok: boolean;
  stored: boolean;
}

/**
 * Company enquiry.
 *
 * The issuer side of the Contact toggle. Captures what is needed to understand
 * who is asking - company, listing venue, ticker, sector - before the message
 * itself, because a listed company's enquiry is answerable only once those are
 * known.
 *
 * Consent is a separate unticked checkbox here too. A company enquiry is
 * correspondence rather than a marketing list, so it does not go through double
 * opt-in, but the record still carries an explicit lawful basis with its own
 * wording and its own timestamp.
 *
 * Like the investor form, this reports honestly: if the CRM is not configured
 * the success state says the enquiry was not stored rather than thanking the
 * sender for something that went nowhere.
 */
export function CompanyForm({ source }: { source: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /*
    The floor on the date field, written onto the element rather than rendered.

    This page is statically prerendered, so anything computed during render is
    computed at BUILD time - a `min` rendered that way would freeze on the day
    the site was deployed and go stale the next morning. It cannot come from
    the server at request time either: the browser and the server are routinely
    in different timezones and occasionally on different dates.

    So it is set from the visitor's own clock when the field mounts. That makes
    it an affordance and not a control, which is the right division anyway -
    `validate` below is what actually refuses a date that has passed.
  */
  const boundToToday = useCallback((node: HTMLInputElement | null) => {
    if (node) node.min = todayAsInputValue();
  }, []);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const value = (key: string) => String(data.get(key) ?? "").trim();

    if (!value("companyName")) next.companyName = "Please enter your company name.";
    /*
     * Sector is required.
     *
     * It is the field that decides whether an enquiry is answerable at all -
     * the firm covers three sectors - so an enquiry that does not say which
     * one it concerns has to be chased before it can be read. Left as free
     * text rather than a select on purpose: a company that sits between two
     * of the three should be able to say so in its own words.
     */
    if (!value("sector")) next.sector = "Please tell us which sector you operate in.";
    if (!value("name")) next.name = "Please enter your full name.";

    const email = value("email");
    if (!email) next.email = "Please enter your work email address.";
    else if (!EMAIL_PATTERN.test(email)) next.email = "Please enter a valid email address.";

    const preferredDate = value("preferredDate");
    if (!preferredDate) next.preferredDate = "Please choose a preferred date.";
    else if (preferredDate < todayAsInputValue()) {
      // Both sides are `YYYY-MM-DD`, which compares correctly as a string.
      next.preferredDate = "Please choose a date that has not already passed.";
    }

    if (!value("preferredTime")) next.preferredTime = "Please choose a preferred time.";

    const message = value("message");
    if (!message) next.message = "Please tell us briefly what you are looking for.";
    else if (message.length < 20) next.message = "Please add a little more detail.";

    if (data.get("consent") !== "on") {
      next.consent = "Please confirm you agree to be contacted.";
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
          type: "company-enquiry",
          source,
          companyName: data.get("companyName"),
          listingVenue: data.get("listingVenue"),
          ticker: data.get("ticker"),
          sector: data.get("sector"),
          name: data.get("name"),
          role: data.get("role"),
          email: data.get("email"),
          phone: data.get("phone"),
          country: data.get("country"),
          areaOfInterest: data.get("areaOfInterest"),
          preferredDate: data.get("preferredDate"),
          preferredTime: data.get("preferredTime"),
          message: data.get("message"),
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
          setFailure(payload.error ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setResult(payload);
    } catch {
      setFailure("We could not reach the server. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (result) {
    return (
      <div role="status">
        <span aria-hidden="true" className="block h-px w-12 bg-(--color-accent)" />
        <h3 className="mt-6 font-display text-h3">Thank you for your enquiry.</h3>
        <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
          We have your details and a member of the team will read your enquiry.
        </p>

        {!result.stored && (
          <p className="mt-6 border-l-2 border-(--color-accent)/50 pl-4 text-sm leading-relaxed text-(--color-foreground-subtle)">
            Note for review: the CRM is not yet connected, so this enquiry was not stored. This
            state exists so the completed journey can be assessed.
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
            Send another enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
      <div className="flex items-center gap-3.5 border-b border-(--color-border) pb-5">
        <span aria-hidden="true" className="h-px w-8 shrink-0 bg-(--color-accent)" />
        <span className="text-label uppercase text-(--color-accent)">Company Enquiry</span>
      </div>

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <FormField label="Company name" error={errors.companyName} required>
          <Input name="companyName" autoComplete="organization" />
        </FormField>

        <FormField label="Listing venue" description="Optional">
          <Input name="listingVenue" placeholder="e.g. LSE, ASX, TSX-V" />
        </FormField>

        <FormField label="Ticker" description="Optional">
          <Input name="ticker" />
        </FormField>

        <FormField label="Sector" error={errors.sector} required>
          <Input name="sector" />
        </FormField>

        <FormField label="Your name" error={errors.name} required>
          <Input name="name" autoComplete="name" />
        </FormField>

        <FormField label="Role" description="Optional">
          <Input name="role" autoComplete="organization-title" />
        </FormField>

        <FormField label="Work email" error={errors.email} required>
          <Input name="email" type="email" inputMode="email" autoComplete="email" />
        </FormField>

        <FormField label="Phone" description="Optional">
          <Input name="phone" type="tel" inputMode="tel" autoComplete="tel" />
        </FormField>

        <FormField label="Country" description="Optional">
          <Input name="country" autoComplete="country-name" />
        </FormField>

        {/*
          Area of interest.

          The four service lines plus a general option, read from
          `areaOfInterestOptions` - the same list the left rail of the Contact
          page renders as tags and the same values the service pages deep-link
          with. One source, so an enquiry can only ever be routed to a service
          that exists.

          Optional, and a select rather than free text: this is the field the
          record is routed by, and a routing value written by hand is a value
          somebody has to interpret later.

          It takes the cell Country used to share with nothing. Country was
          full-width and is now half, which is what lets the two sit as a pair
          and keeps the grid on even rows.
        */}
        <FormField label="Area of interest" description="Optional">
          <Select
            name="areaOfInterest"
            options={areaOfInterestOptions}
            placeholder="Choose an area…"
          />
        </FormField>

        {/*
          When a conversation would suit.

          Two more cells in the grid the form already uses, so they sit side by
          side from `sm` up and stack below it without a layout of their own.

          A preference, not a booking: nothing is checked against a calendar and
          nothing is held. The wording says "preferred" for that reason, and the
          reply arranges the meeting.
        */}
        {/*
          `type="date"` rather than a calendar of our own: it brings the
          desktop popover, the iOS and Android wheels, the visitor's own locale
          format and keyboard entry, none of which a hand-built one would get
          right for the price of a field that says which day suits. The ref is
          what puts today's floor on it - see `boundToToday` above.
        */}
        <FormField label="Preferred date" error={errors.preferredDate} required>
          <Input name="preferredDate" type="date" ref={boundToToday} />
        </FormField>

        <FormField
          label="Preferred time"
          error={errors.preferredTime}
          description="Gulf Standard Time"
          required
        >
          <Select
            name="preferredTime"
            options={preferredTimeOptions}
            placeholder="Choose a time…"
          />
        </FormField>
      </div>

      <FormField
        label="Enquiry"
        error={errors.message}
        description="A short outline of your situation and what you are looking for."
        required
      >
        <Textarea name="message" rows={5} />
      </FormField>

      <div className="border-t border-(--color-border) pt-7">
        <Checkbox
          name="consent"
          label="I agree to Gulf Connect Consultancy FZCO contacting me about this enquiry."
          error={errors.consent}
        />
      </div>

      {failure && (
        <p
          role="alert"
          className="border-l-2 border-(--color-danger) pl-4 text-sm text-(--color-danger)"
        >
          {failure}
        </p>
      )}

      <div className="mt-1 border-t border-(--color-border) pt-7">
        <Button type="submit" size="lg" withArrow disabled={pending}>
          {pending ? "Submitting…" : "Submit Enquiry"}
        </Button>
      </div>
    </form>
  );
}
