import { LegalPageLayout } from "@/components/sections/LegalPageLayout";
import { pick } from "@/content";
import { privacyPolicyAr } from "@/content/ar/legal";
import { privacyPolicy as pageEn } from "@/data/legal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: pageEn.title,
  path: "/privacy",
  description: pageEn.lead,
});

/**
 * Privacy Policy.
 *
 * Structure only while counsel-approved wording is outstanding - see the
 * header of `data/legal.ts` for why nothing here is drafted.
 */
export default async function Page() {
  /*
    The document itself, in the language of the request. The layout around it
    is shared and reads its own copy - see `LegalPageLayout`.
  */
  const page = await pick({ en: pageEn, ar: privacyPolicyAr });

  return <LegalPageLayout page={page} />;
}
