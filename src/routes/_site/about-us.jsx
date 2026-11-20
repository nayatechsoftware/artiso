import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import FounderCard from "@/components/about/FounderCard";
import { Image } from "@/components/ui/image";
import { aboutClosing, aboutImages, aboutIntro, founders } from "@/data/about";

export const Route = createFileRoute("/_site/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — ARTISO" },
      {
        name: "description",
        content:
          "We’re fashion experts with a strong foundation in technology. Meet Sarah Iglesias Hiller, Lucas Pastur Romay and Matthias Brenninkmeijer, the founders of ARTISO.",
      },
    ],
  }),
  component: AboutUs,
});

function AboutUs() {
  return (
    <>
      <PageHero title="About Us" intro={aboutIntro} />

      <section className="shell pt-14 md:pt-20">
        <Reveal>
          <div className="aspect-[4/5] w-full overflow-hidden bg-black/5 sm:aspect-[3/2]">
            <Image
              src={aboutImages.studio}
              alt="The ARTISO team at work in Barcelona"
              className="h-full w-full"
              fittingType="fill"
            />
          </div>
        </Reveal>
      </section>

      <section id="founders" className="shell scroll-mt-24 py-20 md:py-28 lg:py-32">
        <Reveal>
          <p className="eyebrow">The people behind ARTISO</p>
          <h2 className="display-xl mt-6 max-w-[16ch]">Meet the Founders</h2>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {founders.map((founder, index) => (
            <Reveal key={founder.name} i={index}>
              <FounderCard founder={founder} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#eeeeee] py-20 md:py-28 lg:py-32">
        <div className="shell">
          <Reveal>
            <p className="max-w-[46ch] text-[clamp(1.3rem,2.4vw,2rem)] font-light leading-[1.3] tracking-tight text-black">
              {aboutClosing}
            </p>
          </Reveal>
          <Reveal i={1}>
            <div className="mt-14 aspect-[4/5] w-full overflow-hidden bg-black/5 sm:aspect-[3/2]">
              <Image
                src={aboutImages.team}
                alt="The ARTISO team in a white studio, gathered around a desk beside a dress form"
                className="h-full w-full"
                fittingType="fill"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}