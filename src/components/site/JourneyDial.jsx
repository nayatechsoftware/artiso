import { useEffect, useRef, useState } from "react";
import { Archive, Camera, Dna, FileText, Images, LayoutGrid, PenTool, Shapes } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { workflow } from "@/data/site";
import { cn } from "@/lib/utils";

const ICONS = [Dna, Archive, Images, LayoutGrid, PenTool, Shapes, FileText, Camera];
const RADIUS = 430;
const SPREAD = 20;
const DIAL_W = 980;
const DIAL_H = 620;

export default function JourneyDial() {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let frame = null;
    const update = () => {
      frame = null;
      const rect = wrap.getBoundingClientRect();
      const span = wrap.offsetHeight - window.innerHeight;
      const progress = span > 0 ? Math.min(Math.max(-rect.top / span, 0), 1) : 0;
      const next = Math.round(progress * (workflow.length - 1));
      setActive((prev) => (prev === next ? prev : next));
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

  const current = workflow[active];

  return (
    <>
      <section id="solutions" ref={wrapRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <div className="shell shrink-0 pt-20 md:pt-24">
            <Reveal>
              <p className="eyebrow">02 — The Journey</p>
              <h2 className="display-xl mt-5 max-w-[18ch]">
                Your end-to-end fashion journey, on ARTISO
              </h2>
            </Reveal>
          </div>

          <div className="relative min-h-0 flex-1">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative origin-center scale-[0.4] sm:scale-[0.54] md:scale-[0.7] lg:scale-[0.82] xl:scale-[0.92]"
                style={{ width: DIAL_W, height: DIAL_H }}
              >
                <svg
                  viewBox="0 0 760 380"
                  className="absolute bottom-0 left-1/2 h-[380px] w-[760px] -translate-x-1/2"
                  aria-hidden="true"
                >
                  <path
                    d="M 0 380 A 380 380 0 0 1 760 380"
                    fill="none"
                    stroke="rgba(18,18,18,0.28)"
                    strokeWidth="1.4"
                    strokeDasharray="1 11"
                  />
                </svg>

                <div className="absolute bottom-0 left-1/2 h-[300px] w-[620px] -translate-x-1/2 rounded-t-full border border-white/70 bg-[#c9d6df]/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_40px_80px_-60px_rgba(18,18,18,0.6)] backdrop-blur-xl" />
                <div className="absolute bottom-0 left-1/2 h-[300px] w-[620px] -translate-x-1/2 rounded-t-full bg-gradient-to-t from-white/25 to-transparent" />

                <div className="absolute bottom-[74px] left-1/2 z-10 w-[340px] -translate-x-1/2 text-center">
                  <p className="eyebrow tabular-nums">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(workflow.length).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-display text-[26px] leading-tight text-black">
                    {current.title}
                  </p>
                  <p className="mx-auto mt-3 max-w-[280px] text-[12px] leading-relaxed text-black/55">
                    {current.text}
                  </p>
                </div>

                {workflow.map((item, index) => {
                  const delta = index - active;
                  const rad = (delta * SPREAD * Math.PI) / 180;
                  const dx = RADIUS * Math.sin(rad);
                  const dy = -RADIUS * Math.cos(rad);
                  const isActive = delta === 0;
                  const Icon = ICONS[index];
                  return (
                    <div
                      key={item.title}
                      className="absolute z-10 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        left: DIAL_W / 2,
                        top: DIAL_H,
                        transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(${
                          isActive ? 1 : 0.9
                        })`,
                      }}
                    >
                      <div
                        className="flex flex-col items-center gap-2 text-center transition-opacity duration-500"
                        style={{ opacity: isActive ? 1 : 0.3 }}
                      >
                        <span
                          className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500",
                            isActive
                              ? "border-black/25 bg-white/85 text-black"
                              : "border-black/10 bg-white/45 text-black/55"
                          )}
                        >
                          <Icon className="h-4 w-4" strokeWidth={1.3} />
                        </span>
                        <span
                          className={cn(
                            "whitespace-nowrap text-[10px] uppercase tracking-[0.18em] transition-colors duration-500",
                            isActive ? "text-black" : "text-black/45"
                          )}
                        >
                          {item.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="shell relative pb-20 md:pb-28 lg:pb-32">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
          {workflow.map((item, index) => (
            <Reveal key={item.title} delay={index * 100} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden border border-white/70 bg-white/45 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_28px_50px_-30px_rgba(18,18,18,0.45)]">
                <div className="aspect-[4/5] w-full overflow-hidden bg-black/5">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform [transition-duration:700ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <span className="eyebrow tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-6">
                    <h3 className="text-[13px] font-normal leading-snug tracking-tight text-black">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-black/50">{item.text}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}