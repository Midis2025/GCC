import { PendingPolicy } from "@/components/sections/PendingPolicy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <PendingPolicy
      eyebrow="Legal"
      title="Terms of Use"
      scope="This page will set out the terms governing use of this website, including permitted use, intellectual property, limitations of liability, and any notices required in connection with the services described."
    />
  );
}
