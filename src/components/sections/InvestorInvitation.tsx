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
