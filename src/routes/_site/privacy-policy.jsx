import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";

export const Route = createFileRoute("/_site/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ARTISO" },
      { name: "description", content: "How ARTISO collects, uses and protects your personal data." },
    ],
  }),
  component: PrivacyPolicyContent,
});