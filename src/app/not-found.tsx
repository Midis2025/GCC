import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="This page could not be found."
        lead="The page you are looking for may have moved, or the address may be incorrect."
        actions={
          <>
            <Button href="/" size="lg" withArrow>
              Return home
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Contact GCC
            </Button>
          </>
        }
      />
      <Section spacing="sm" />
    </>
  );
}
