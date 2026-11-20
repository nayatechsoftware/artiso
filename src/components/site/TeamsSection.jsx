import Reveal from "@/components/site/Reveal";
import { teams } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

export default function TeamsSection() {
  return (
    <section id="teams" className="shell py-20 md:py-28 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">01 — Teams</p>
            <h2 className="display-xl mt-6 max-w-[11ch]">For the teams shaping fashion</h2>
            <p className="mt-8 max-w-sm text-[17px] leading-relaxed text-black/55">
              One shared intelligence layer for the people who set the direction, draw the
              collection, build the product and bring it to market.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {teams.map((team, index) => (
            <Reveal key={team.name} delay={index * 100}>
              <div className="group flex items-start justify-between gap-6 border-t border-black/12 py-6 md:py-7">
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span className="eyebrow pt-1 tabular-nums">0{index + 1}</span>
                  <h3 className="text-xl font-light tracking-tight text-black md:text-2xl">
                    {team.name}
                  </h3>
                </div>
                <div className="flex items-start gap-4">
                  <p className="hidden max-w-[26ch] text-right text-sm leading-relaxed text-black/50 md:block">
                    {team.text}
                  </p>
                  <ArrowUpRight
                    className="mt-1 h-4 w-4 shrink-0 text-black/25 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                    strokeWidth={1.4}
                  />
                </div>
              </div>
              <p className="border-t border-black/0 pb-2 text-sm leading-relaxed text-black/50 md:hidden">
                {team.text}
              </p>
            </Reveal>
          ))}
          <div className="border-t border-black/12" />
        </div>
      </div>
    </section>
  );
}