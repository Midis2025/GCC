import { LegalPageLayout } from "@/components/sections/LegalPageLayout";
import { disclaimer } from "@/data/legal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: disclaimer.title,
  path: "/disclaimer",
  description: disclaimer.lead,
});

/**
 * Disclaimer.
 *
 * Structure only while counsel-approved wording is outstanding - see the
 * header of `data/legal.ts` for why nothing here is drafted.
 */
export default function Page() {
  return <LegalPageLayout page={disclaimer} />;
}
