import { useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import CrossfadeImage from "@/components/site/CrossfadeImage";
import { solutionTabs } from "@/data/site";
import { cn } from "@/lib/utils";

export default function SolutionTabs() {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeItems, setActiveItems] = useState(() =>
    Object.fromEntries(solutionTabs.map((group) => [group.id, 0]))
  );

  const toggle = (index) => setOpenIndex((current) => (current === index ? -1 : index));
  const select = (groupId, itemIndex) =>
    setActiveItems((current) => ({ ...current, [groupId]: itemIndex }));

  return (
    <section id="platform" className="scroll-mt-24 py-20 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[800px] px-5 md:px-0">
        <h2 className="text-[26px] font-light leading-tight text-[#222] md:text-[32px]">
          From the first idea to everything that follows
        </h2>

        <div className="mt-10">
          {solutionTabs.map((group, index) => {
            const open = openIndex === index;
            const activeIndex = activeItems[group.id] ?? 0;
            const current = group.items[activeIndex];

            return (
              <div key={group.id} className="border-t border-[#222] last:border-b">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-[4px] text-left"
                >
                  <span className="text-[26px] font-normal leading-none text-[#222]">
                    {group.label}
                  </span>
                  {open ? (
                    <ArrowDown className="h-[18px] w-[18px] shrink-0 text-[#222]" strokeWidth={1.5} />
                  ) : (
                    <ArrowRight className="h-[18px] w-[18px] shrink-0 text-[#222]" strokeWidth={1.5} />
                  )}
                </button>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pb-10 pt-3 md:grid-cols-[323px_326px_1fr] md:gap-x-[13px] md:gap-y-0">
                      <ul className="flex flex-col items-start gap-2 pt-1">
                        {group.items.map((item, itemIndex) => (
                          <li key={item.title}>
                            <button
                              type="button"
                              onClick={() => select(group.id, itemIndex)}
                              className={cn(
                                "text-[15px] leading-snug transition-colors duration-300",
                                itemIndex === activeIndex
                                  ? "text-[#4a5a6a] underline decoration-[#4a5a6a]/60 underline-offset-4"
                                  : "text-[#777] hover:text-[#222]"
                              )}
                            >
                              {item.title}
                            </button>
                          </li>
                        ))}
                      </ul>

                      <CrossfadeImage
                        src={current.image}
                        alt={current.title}
                        duration={400}
                        className="h-[436px] w-[326px]"
                      />

                      <div className="pt-1">
                        <h3 className="text-[14px] text-[#222]">{current.title}</h3>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-[#666]">
                          {current.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}