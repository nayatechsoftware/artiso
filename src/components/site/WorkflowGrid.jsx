import Reveal from "@/components/site/Reveal";
import { workflow } from "@/data/site";

export default function WorkflowGrid() {
  return (
    <section className="shell py-20 md:py-28 lg:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">04 — Connected</p>
          <h2 className="display-xl mt-6 max-w-[16ch]">Your entire workflow, connected</h2>
        </div>
        <p className="max-w-sm text-[16px] leading-relaxed text-black/55">
          Eight capabilities that share one memory, so a decision made in design is already
          understood by the tech pack and the campaign.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 border-l border-t border-black/12 sm:grid-cols-2 lg:grid-cols-4">
        {workflow.map((feature, index) => (
          <Reveal key={feature.title} delay={(index % 4) * 70}>
            <div className="group flex h-full min-h-[220px] flex-col justify-between border-b border-r border-black/12 p-6 transition-colors duration-500 hover:bg-white md:p-7">
              <span className="eyebrow tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <div className="mt-10">
                <h3 className="text-lg font-normal tracking-tight text-black">{feature.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-black/50">{feature.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}