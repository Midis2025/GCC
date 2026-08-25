import { LegalPageLayout } from "@/components/sections/LegalPageLayout";
import { termsOfUse } from "@/data/legal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: termsOfUse.title,
  path: "/terms",
  description: termsOfUse.lead,
});

/**
 * Terms of Use.
 *
 * Structure only while counsel-approved wording is outstanding - see the
 * header of `data/legal.ts` for why nothing here is drafted.
 */
export default function Page() {
  return <LegalPageLayout page={termsOfUse} />;
}
