import { LegalPageLayout } from "@/components/sections/LegalPageLayout";
import { cookieNotice } from "@/data/legal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: cookieNotice.title,
  path: "/cookies",
  description: cookieNotice.lead,
});

/**
 * Cookie Notice.
 *
 * Structure only while counsel-approved wording is outstanding - see the
 * header of `data/legal.ts` for why nothing here is drafted.
 */
export default function Page() {
  return <LegalPageLayout page={cookieNotice} />;
}
