import { useEffect, useRef, useState } from "react";
import { Archive, Camera, Dna, FileText, Images, LayoutGrid, PenTool, Shapes } from "lucide-react";
import DialDisc from "@/components/site/DialDisc";
import { workflow } from "@/data/site";

const ICONS = [Dna, Archive, Images, LayoutGrid, PenTool, Shapes, FileText, Camera];
const STAGE_W = 760;
const STAGE_H = 520;
const CX = 380;
const CY = 470;
const RADIUS = 360;
const STEP = 19;

export default function JourneyDial() {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

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

  return (
    <section id="solutions" ref={wrapRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="shrink-0 px-5 pt-16 text-center md:pt-20">
          <h2 className="text-[26px] font-light leading-[1.12] text-[#222] md:text-[40px]">
            Your end-to-end fashion journey,
            <br className="hidden md:block" /> on ARTISO
          </h2>
        </div>

        <div className="relative min-h-0 flex-1">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative scale-[0.6] sm:scale-[0.78] md:scale-100"
              style={{ width: STAGE_W, height: STAGE_H }}
            >
              <DialDisc />

              {workflow.map((item, index) => {
                const delta = index - active;
                const distance = Math.abs(delta);
                const angle = Math.max(-2.5, Math.min(2.5, delta)) * STEP;
                const rad = (angle * Math.PI) / 180;
                const x = CX + RADIUS * Math.sin(rad);
                const y = CY - RADIUS * Math.cos(rad);
                const isActive = distance === 0;
                const size = isActive ? 75 : distance === 1 ? 45 : 40;
                const opacity = isActive ? 1 : distance === 1 ? 0.35 : distance === 2 ? 0.15 : 0;
                const Icon = ICONS[index];

                return (
                  <div
                    key={item.title}
                    className="absolute left-0 top-0 flex flex-col items-center transition-[transform,opacity] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                      opacity,
                      zIndex: 10 - distance,
                    }}
                  >
                    <span
                      key={`${item.title}-${isActive}`}
                      className={
                        isActive
                          ? "flex items-center justify-center border border-[#222] bg-[#f4f4f4] animate-[cardPop_500ms_cubic-bezier(0.22,1,0.36,1)_both]"
                          : "flex items-center justify-center border border-[#222] bg-[#f4f4f4]"
                      }
                      style={{ width: size, height: size, borderRadius: 6 }}
                    >
                      <Icon
                        className="text-[#222]"
                        style={{ width: size * 0.44, height: size * 0.44 }}
                        strokeWidth={1.5}
                      />
                    </span>
                    <span
                      className="mt-2 whitespace-nowrap uppercase text-[#222]"
                      style={{
                        fontSize: isActive ? 11 : 7,
                        letterSpacing: "0.12em",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}