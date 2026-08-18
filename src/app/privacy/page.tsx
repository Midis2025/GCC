import { PendingPolicy } from "@/components/sections/PendingPolicy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <PendingPolicy
      eyebrow="Legal"
      title="Privacy Policy"
      scope="This page will set out how GCC collects, uses, stores and protects personal information submitted through this website or provided in the course of an engagement, together with the rights available to individuals and the contact route for exercising them."
    />
  );
}
