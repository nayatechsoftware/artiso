import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Image } from "@/components/ui/image";
import { article } from "@/data/article";

export const Route = createFileRoute("/_site/news/$slug")({
  loader: ({ params }) => {
    if (params.slug !== article.slug) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "News"} — ARTISO` },
      { name: "description", content: loaderData?.lead ?? "" },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const story = Route.useLoaderData();

  return (
    <article className="pb-24 pt-[104px] md:pb-32 md:pt-[136px]">
      <div className="shell">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-black/55 transition-colors hover:text-black"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Back to news
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">{story.date}</p>
            <h1 className="display-xl mt-6 max-w-[26ch]">{story.title}</h1>
            <p className="mt-8 max-w-[62ch] text-[18px] leading-relaxed text-black/60">
              {story.lead}
            </p>
          </div>
          <div className="lg:col-span-4">
            <div className="aspect-[3/4] w-full overflow-hidden bg-black/5">
              <Image
                src={story.image}
                alt="The ARTISO team in a white studio, gathered around a white table beside a dress form"
                className="h-full w-full"
                fittingType="fill"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-black/12 pt-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {story.blocks.map((block, index) =>
              block.type === "quote" ? (
                <blockquote
                  key={index}
                  className="my-8 border-l border-black/20 pl-6 text-[17px] leading-relaxed text-black/70"
                >
                  <strong className="block text-[13px] uppercase tracking-[0.14em] text-black">
                    {block.bold}
                  </strong>
                  <span className="mt-3 block">{block.text}</span>
                </blockquote>
              ) : (
                <p key={index} className="mt-5 text-[16px] leading-[1.75] text-black/65">
                  {block.bold && <strong className="font-medium text-black">{block.bold} </strong>}
                  {block.text}
                </p>
              )
            )}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">In the press</p>
              <ul className="mt-5 space-y-2.5">
                {story.press.map((item) => (
                  <li key={item.label} className="text-[14px] leading-relaxed text-black/55">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-black/20 underline-offset-2 transition-colors hover:text-black"
                      >
                        {item.label}
                      </a>
                    ) : (
                      item.label
                    )}
                    {item.note ? `, ${item.note}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-16 border-t border-black/12 pt-12">
          <div className="grid gap-10 md:grid-cols-2">
            {story.abouts.map((about) => (
              <div key={about.title}>
                <h2 className="text-lg font-light tracking-tight text-black">{about.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-black/55">
                  {about.text}
                  {about.title === "About ARTISO" && (
                    <>
                      {" "}
                      <a
                        href="https://www.artiso.org/"
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-black/20 underline-offset-2 hover:text-black"
                      >
                        www.artiso.org
                      </a>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-black/12 pt-6">
            <p className="eyebrow">Media contacts</p>
            <a
              href="mailto:press@artiso.org"
              className="mt-3 inline-block text-xl font-light tracking-tight text-black underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black"
            >
              press@artiso.org
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}