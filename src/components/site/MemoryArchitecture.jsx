import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/site/Reveal";
import MemoryStack from "@/components/site/MemoryStack";
import { layers } from "@/data/site";
import { cn } from "@/lib/utils";

export default function MemoryArchitecture() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = null;
    const update = () => {
      frame = null;
      const rect = el.getBoundingClientRect();
      const next = Math.min(
        Math.max((window.innerHeight - rect.top) / (window.innerHeight * 0.9), 0),
        1
      );
      const rounded = Math.round(next * 40) / 40;
      setProgress((prev) => (prev === rounded ? prev : rounded));
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="border-y border-black/10 bg-[#eeeeee] py-20 md:py-28 lg:py-32"
    >
      <div className="shell grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <MemoryStack
            layers={layers}
            active={active}
            onSelect={setActive}
            progress={progress}
          />
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow">04 — Architecture</p>
            <h2 className="display-xl mt-6 max-w-[13ch]">The Four Layer Memory Architecture</h2>
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-black/55">
              A unified intelligence layer that connects brand identity, workflows, and creation.
            </p>
          </Reveal>

          <div className="mt-10 border-t border-black/15">
            {layers.map((layer, index) => {
              const isActive = active === index;
              return (
                <div key={layer.title} className="border-b border-black/10">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    aria-expanded={isActive}
                    className="flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span className="eyebrow tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-[11px] uppercase tracking-[0.22em] transition-colors duration-300",
                        isActive ? "text-black" : "text-black/40"
                      )}
                    >
                      {layer.title}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-out",
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-sm pb-5 pl-9 text-[14px] leading-relaxed text-black/55">
                        {layer.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}