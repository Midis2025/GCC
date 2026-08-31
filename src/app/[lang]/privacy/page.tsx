import { LegalPageLayout } from "@/components/sections/LegalPageLayout";
import { privacyPolicy } from "@/data/legal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: privacyPolicy.title,
  path: "/privacy",
  description: privacyPolicy.lead,
});

/**
 * Privacy Policy.
 *
 * Structure only while counsel-approved wording is outstanding - see the
 * header of `data/legal.ts` for why nothing here is drafted.
 */
export default function Page() {
  return <LegalPageLayout page={privacyPolicy} />;
}
