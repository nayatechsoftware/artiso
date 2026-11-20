import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/site/PageHero";
import BookDemoForm from "@/components/forms/BookDemoForm";

const demoImage =
  "https://cdn.sanity.io/images/mvgv7zsh/production/579a695c5da8813c6415b3ef1e0a6a4fa58504cf-960x1280.jpg?w=1000&fit=max&auto=format";

export const Route = createFileRoute("/_site/book-demo")({
  head: () => ({
    meta: [
      { title: "Book Your Demo — ARTISO" },
      {
        name: "description",
        content:
          "Book a personalized ARTISO demo: where industry expertise, creativity and technology unite.",
      },
    ],
  }),
  component: BookDemo,
});

function BookDemo() {
  return (
    <>
      <PageHero title="Where industry expertise, creativity and technology unite." />
      <BookDemoForm image={demoImage} />
    </>
  );
}