import { useState } from "react";
import Reveal from "@/components/site/Reveal";
import { layers } from "@/data/site";
import { cn } from "@/lib/utils";

export default function MemoryArchitecture() {
  const [active, setActive] = useState(3);

  return (
    <section id="about" className="border-y border-black/10 bg-[#eeeeee] py-20 md:py-28 lg:py-36">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">05 — Architecture</p>
            <h2 className="display-xl mt-6 max-w-[13ch]">The Four Layer Memory Architecture</h2>
            <p className="mt-8 max-w-sm text-[17px] leading-relaxed text-black/55">
              A unified intelligence layer that connects brand identity, workflows, and creation.
            </p>
            <div className="mt-10 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-black" />
              <span className="eyebrow">One memory, four layers</span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {layers.map((layer, index) => (
            <Reveal key={layer.title} delay={index * 80}>
              <button
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={cn(
                  "group block w-full border-t border-black/15 py-6 text-left transition-all duration-500 md:py-7",
                  active === index ? "pl-0" : "pl-0 opacity-70"
                )}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-baseline gap-5 md:gap-8">
                    <span className="eyebrow tabular-nums">0{index + 1}</span>
                    <div>
                      <h3
                        className={cn(
                          "text-xl font-light tracking-tight transition-colors md:text-2xl",
                          active === index ? "text-black" : "text-black/60"
                        )}
                      >
                        {layer.title}
                      </h3>
                      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-black/50">
                        {layer.text}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "mt-2 hidden h-2 w-2 shrink-0 rounded-full transition-all duration-500 md:block",
                      active === index ? "scale-100 bg-black" : "scale-0 bg-black"
                    )}
                  />
                </div>
              </button>
            </Reveal>
          ))}
          <div className="border-t border-black/15" />
        </div>
      </div>
    </section>
  );
}