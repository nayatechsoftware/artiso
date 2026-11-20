import { createFileRoute } from "@tanstack/react-router";
import CookiePolicyContent from "@/components/legal/CookiePolicyContent";

export const Route = createFileRoute("/_site/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — ARTISO" },
      {
        name: "description",
        content: "Which cookies and similar technologies www.artiso.ai uses, why, and how to choose.",
      },
    ],
  }),
  component: CookiePolicyContent,
});