import { useState } from "react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";
import { solutionTabs } from "@/data/site";
import { cn } from "@/lib/utils";

export default function SolutionTabs() {
  const [tabIndex, setTabIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const tab = solutionTabs[tabIndex];
  const item = tab.items[itemIndex] ?? tab.items[0];

  const selectTab = (index) => {
    setTabIndex(index);
    setItemIndex(0);
  };

  return (
    <section id="platform" className="shell scroll-mt-24 py-20 md:py-28 lg:py-32">
      <Reveal>
        <p className="eyebrow">03 — Capabilities</p>
        <h2 className="display-xl mt-6 max-w-[20ch]">From the first idea to everything that follows</h2>
      </Reveal>

      <div className="no-scrollbar mt-12 flex gap-8 overflow-x-auto border-b border-black/12">
        {solutionTabs.map((entry, index) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => selectTab(index)}
            className={cn(
              "relative shrink-0 pb-4 text-[13px] uppercase tracking-[0.16em] transition-colors",
              index === tabIndex ? "text-black" : "text-black/40 hover:text-black/70"
            )}
          >
            {entry.label}
            <span
              className={cn(
                "absolute inset-x-0 -bottom-px h-px bg-black transition-opacity duration-300",
                index === tabIndex ? "opacity-100" : "opacity-0"
              )}
            />
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="order-2 lg:order-1 lg:col-span-4">
          <ul>
            {tab.items.map((entry, index) => (
              <li key={entry.title}>
                <button
                  type="button"
                  onClick={() => setItemIndex(index)}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 border-t border-black/12 py-4 text-left text-[15px] transition-colors md:text-base",
                    index === itemIndex ? "text-black" : "text-black/45 hover:text-black/80"
                  )}
                >
                  {entry.title}
                  <span
                    className={cn(
                      "text-xs transition-opacity",
                      index === itemIndex ? "opacity-100" : "opacity-0"
                    )}
                  >
                    ●
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-8">
          <div className="grid gap-6 sm:grid-cols-[1.15fr_1fr] sm:items-end">
            <div key={item.image} className="fade-up relative aspect-[4/5] w-full overflow-hidden bg-black/5">
              <Image src={item.image} alt={item.title} className="h-full w-full" fittingType="fill" />
            </div>
            <div key={item.title} className="fade-up pb-2">
              <h3 className="text-2xl font-light tracking-tight text-black md:text-3xl">{item.title}</h3>
              <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-black/60">{item.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}