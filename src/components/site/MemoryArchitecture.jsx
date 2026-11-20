import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/site/Reveal";
import { layers } from "@/data/site";
import { cn } from "@/lib/utils";

export default function MemoryArchitecture() {
  const stackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setExploded(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="border-y border-black/10 bg-[#eeeeee] py-20 md:py-28 lg:py-36">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">04 — Architecture</p>
            <h2 className="display-xl mt-6 max-w-[13ch]">The Four Layer Memory Architecture</h2>
            <p className="mt-8 max-w-sm text-[17px] leading-relaxed text-black/55">
              A unified intelligence layer that connects brand identity, workflows, and creation.
            </p>
          </Reveal>
          <div className="mt-10 max-w-sm border-t border-black/15 pt-6">
            <p className="eyebrow">{layers[active].title}</p>
            <p key={active} className="fade-up mt-3 text-[15px] leading-relaxed text-black/60">
              {layers[active].text}
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div
            ref={stackRef}
            className={cn(
              "relative mx-auto h-[286px] w-full max-w-[460px] sm:h-[336px] lg:h-[400px]",
              exploded
                ? "[--gap:58px] sm:[--gap:70px] lg:[--gap:86px]"
                : "[--gap:24px] sm:[--gap:28px] lg:[--gap:32px]"
            )}
          >
            {layers.map((layer, index) => {
              const isActive = active === index;
              return (
                <div
                  key={layer.title}
                  className="group absolute inset-x-0 top-0"
                  style={{
                    transform: "translateY(calc(var(--i) * var(--gap)))",
                    "--i": index,
                    opacity: exploded ? 1 : 0,
                    transition:
                      "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease-out",
                    transitionDelay: `${index * 150}ms`,
                  }}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <div className="relative mx-auto h-[70px] w-full max-w-[440px] transition-transform duration-300 ease-out group-hover:-translate-y-3 sm:h-[86px] lg:h-[104px]">
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[3px] [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
                    <svg
                      viewBox="0 0 440 104"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full"
                      aria-hidden="true"
                    >
                      <polygon
                        points="220,1 439,52 220,103 1,52"
                        fill="none"
                        stroke={isActive ? "rgba(18,18,18,0.5)" : "rgba(18,18,18,0.2)"}
                        strokeWidth="1"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span
                        className={cn(
                          "text-[9px] uppercase tracking-[0.24em] transition-colors duration-500 sm:text-[10px]",
                          isActive ? "text-black" : "text-black/45 group-hover:text-black"
                        )}
                      >
                        {layer.title}
                      </span>
                    </button>
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