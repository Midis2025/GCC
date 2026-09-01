import { LegalPageLayout } from "@/components/sections/LegalPageLayout";
import { pick } from "@/content";
import { cookieNoticeAr } from "@/content/ar/legal";
import { cookieNotice as pageEn } from "@/data/legal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: pageEn.title,
  path: "/cookies",
  description: pageEn.lead,
});

/**
 * Cookie Notice.
 *
 * Structure only while counsel-approved wording is outstanding - see the
 * header of `data/legal.ts` for why nothing here is drafted.
 */
export default async function Page() {
  /*
    The document itself, in the language of the request. The layout around it
    is shared and reads its own copy - see `LegalPageLayout`.
  */
  const page = await pick({ en: pageEn, ar: cookieNoticeAr });

  return <LegalPageLayout page={page} />;
}
