import { createFileRoute, Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";
import RoleList from "@/components/careers/RoleList";
import ValuesGrid from "@/components/careers/ValuesGrid";
import HiringProcess from "@/components/careers/HiringProcess";
import { careersClosing, careersImages, careersIntro } from "@/data/careers";

export const Route = createFileRoute("/_site/careers")({
  head: () => ({
    meta: [
      { title: "Careers — ARTISO" },
      {
        name: "description",
        content:
          "Join our team, we’re hiring. Open roles in engineering, AI, go-to-market and freelance at ARTISO in Barcelona.",
      },
    ],
  }),
  component: Careers,
});

function Careers() {
  return (
    <>
      <section className="pt-[112px] md:pt-[150px]">
        <div className="shell">
          <h1 className="display-xl">Careers</h1>
          <p className="display-lg mt-4 max-w-[20ch] text-black/60">Join our team, we’re hiring</p>
        </div>
      </section>

      <section className="shell pt-12 md:pt-16">
        <Reveal>
          <div className="aspect-[4/5] w-full overflow-hidden bg-black/5 sm:aspect-[3/2]">
            <Image
              src={careersImages.studio}
              alt="A white studio: a dress form, a mood board of ARTISO prints and flats, a desk with a lamp, a laptop and an ARTISO mug"
              className="h-full w-full"
              fittingType="fill"
            />
          </div>
        </Reveal>
      </section>

      <section className="shell py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="max-w-[42ch] text-[clamp(1.2rem,2vw,1.7rem)] font-light leading-[1.35] tracking-tight text-black">
              {careersIntro[0]}
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[16px] leading-relaxed text-black/55">{careersIntro[1]}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#open-roles" className="pill">
                Explore open roles
                <span className="text-[11px] opacity-70">6</span>
              </a>
              <Link
                to="/about-us"
                hash="founders"
                className="inline-flex items-center rounded-full border border-black/20 px-6 py-4 text-[11px] uppercase tracking-[0.16em] text-black transition-colors hover:bg-black hover:text-white"
              >
                Meet the founders
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="open-roles" className="shell scroll-mt-24 pb-20 md:pb-28">
        <Reveal>
          <h2 className="display-lg">Open roles</h2>
        </Reveal>
        <div className="mt-10">
          <RoleList />
        </div>
        <p className="mt-10 text-[15px] leading-relaxed text-black/55">
          Do not see your role here? Write to us:{" "}
          <a
            href="mailto:careers@artiso.ai"
            className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:decoration-black"
          >
            careers@artiso.ai
          </a>
        </p>
      </section>

      <section className="border-y border-black/10 bg-[#eeeeee] py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">What we stand for</p>
            <h2 className="display-lg mt-5">Our values</h2>
          </Reveal>
          <div className="mt-12">
            <ValuesGrid />
          </div>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <Reveal>
          <h2 className="display-lg">Our hiring process</h2>
        </Reveal>
        <div className="mt-10">
          <HiringProcess />
        </div>
      </section>

      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-8 border-t border-black/12 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {careersClosing.map((paragraph, index) => (
              <p
                key={index}
                className={`max-w-[64ch] text-[15px] leading-relaxed ${
                  index === 0 ? "text-[17px] text-black/70" : "mt-5 text-black/55"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Link
              to="/privacy-policy"
              hash="10-job-applicants"
              className="text-[12px] uppercase tracking-[0.16em] text-black underline decoration-black/25 underline-offset-4 transition-colors hover:decoration-black"
            >
              How we handle applications
            </Link>
          </div>
        </div>

        <Reveal i={1}>
          <div className="mt-14 aspect-[4/5] w-full overflow-hidden bg-black/5 sm:aspect-[3/2]">
            <Image
              src={careersImages.team}
              alt="The ARTISO team in a white studio, gathered around a desk beside a dress form"
              className="h-full w-full"
              fittingType="fill"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}