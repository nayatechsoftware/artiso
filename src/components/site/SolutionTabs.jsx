import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import CrossfadeImage from "@/components/site/CrossfadeImage";
import { solutionTabs } from "@/data/site";
import { cn } from "@/lib/utils";

export default function SolutionTabs() {
  const [openIndex, setOpenIndex] = useState(0);
  const [active, setActive] = useState(solutionTabs[0].items[0]);

  const toggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
      return;
    }
    setOpenIndex(index);
    setActive(solutionTabs[index].items[0]);
  };

  return (
    <section id="platform" className="shell scroll-mt-24 py-20 md:py-28 lg:py-32">
      <Reveal>
        <p className="eyebrow">03 — Capabilities</p>
        <h2 className="display-xl mt-6 max-w-[20ch]">From the first idea to everything that follows</h2>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="group/groups lg:col-span-6">
          {solutionTabs.map((group, index) => {
            const open = openIndex === index;
            return (
              <div key={group.id} className="border-t border-black/12 last:border-b">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left transition-opacity duration-300 group-hover/groups:opacity-50 hover:!opacity-100"
                >
                  <span className="flex items-baseline gap-4 md:gap-6">
                    <span className="eyebrow tabular-nums">0{index + 1}</span>
                    <span
                      className={cn(
                        "text-lg font-light tracking-tight transition-colors duration-300 md:text-xl",
                        open ? "text-black" : "text-black/70"
                      )}
                    >
                      {group.label}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-black/50 transition-transform duration-500 ease-out",
                      open && "rotate-180 text-black"
                    )}
                    strokeWidth={1.3}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <ul className="pb-6 pl-9 md:pl-12">
                      {group.items.map((item) => {
                        const isActive = active.title === item.title;
                        return (
                          <li key={item.title}>
                            <button
                              type="button"
                              onClick={() => setActive(item)}
                              className={cn(
                                "flex w-full items-center justify-between gap-4 py-2 text-left text-[13px] transition-colors duration-300 md:text-sm",
                                isActive ? "text-black" : "text-black/45 hover:text-black/80"
                              )}
                            >
                              <span className="relative inline-block">
                                {item.title}
                                <span
                                  className={cn(
                                    "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-black transition-transform duration-300 ease-out",
                                    isActive ? "scale-x-100" : "scale-x-0"
                                  )}
                                />
                              </span>
                              <span
                                className={cn(
                                  "text-[8px] transition-opacity duration-300",
                                  isActive ? "opacity-100" : "opacity-0"
                                )}
                              >
                                ●
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-6">
          <CrossfadeImage
            src={active.image}
            alt={active.title}
            className="aspect-[4/5] w-full"
          />
          <div className="mt-6 border-t border-black/12 pt-5">
            <h3 className="text-2xl font-light tracking-tight text-black md:text-3xl">
              {active.title}
            </h3>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-black/60">{active.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}