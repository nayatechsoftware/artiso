import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/site/PageHero";
import NewsGrid from "@/components/news/NewsGrid";

export const Route = createFileRoute("/_site/news/")({
  head: () => ({
    meta: [
      { title: "Newsroom — ARTISO" },
      {
        name: "description",
        content:
          "Press, stories and events: what the fashion and technology press are writing about ARTISO.",
      },
    ],
  }),
  component: Newsroom,
});

function Newsroom() {
  return (
    <>
      <PageHero title="Newsroom" />
      <section className="shell pb-24 pt-12 md:pb-32 md:pt-16">
        <NewsGrid />
      </section>
    </>
  );
}