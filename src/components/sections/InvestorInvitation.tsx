import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { investorInvitation } from "@/data/home";

/**
 * The investor invitation.
 *
 * One line and a button. It exists so that an investor who reaches the home
 * page - and everything above it on this page is addressed to companies - is
 * told plainly that there is something here for them, and given one control
 * that takes them to it.
 *
 * Deliberately not a form. The brief keeps registration on For Investors, and
 * a second registration surface on the home page would be a second place for
 * the same record to enter the system.
 *
 * COMPLIANCE: "convenes qualified Gulf investors for briefings with
 * international companies" is the compliant formulation. It describes meetings
 * being arranged, not investments being sought, and it must not be rewritten
 * into anything that implies the latter.
 */
export function InvestorInvitation() {
  return (
    <Section spacing="md" tone="muted" aria-labelledby="home-investor-invitation">
      <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
        <div>
          <Reveal>
            <SectionLabel>{investorInvitation.label}</SectionLabel>
          </Reveal>

          <Reveal delay={120}>
            <Heading
              id="home-investor-invitation"
              level={2}
              size="h2"
              className="mt-5 max-w-[22ch]"
            >
              {investorInvitation.statement}
            </Heading>
          </Reveal>

          {/*
            A gold rule that draws itself as the band arrives.

            This section was the plainest on the homepage - a label, one line
            and a button on a flat muted ground, with nothing to mark it as the
            turn toward the other audience. It sits between the Arabic gap and
            the call to action, both of which carry weight, and read as a gap
            between them rather than as a section.

            `.about-rule` is the site's existing expanding rule, already used to
            close the media page, and it keys off `data-visible` on the
            enclosing `Reveal` - so this introduces no new mechanism, no new
            timing and no new colour, and it inherits the reduced-motion
            handling that primitive already has.
          */}
          <Reveal delay={200} className="mt-9">
            <span
              aria-hidden="true"
              className="about-rule block h-px w-full max-w-[13rem] bg-[linear-gradient(90deg,var(--color-accent),transparent)]"
            />
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:justify-self-end">
          <Button href={investorInvitation.cta.href} size="lg" withArrow>
            {investorInvitation.cta.label}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
