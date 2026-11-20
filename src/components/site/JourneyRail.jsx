import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";
import { journey } from "@/data/site";

export default function JourneyRail() {
  const railRef = useRef(null);

  const scrollBy = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.round(rail.clientWidth * 0.6), behavior: "smooth" });
  };

  return (
    <section id="solutions" className="py-20 md:py-28 lg:py-32">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow">02 — The Journey</p>
            <h2 className="display-xl mt-6 max-w-[18ch]">Your end-to-end fashion journey, on ARTISO</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll journey backwards"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition-colors hover:bg-black hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll journey forwards"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition-colors hover:bg-black hover:text-white"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
            </button>
          </div>
        </Reveal>
      </div>

      <div
        ref={railRef}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:gap-6 md:px-8 lg:px-12"
      >
        {journey.map((item, index) => (
          <article
            key={item.title}
            className="group w-[76vw] shrink-0 snap-start sm:w-[44vw] lg:w-[27vw] xl:w-[21vw]"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5">
              <Image
                src={item.image}
                alt={item.title}
                className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                fittingType="fill"
              />
              <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.2em] text-white/80">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-4 flex items-baseline justify-between gap-3 border-t border-black/12 pt-3 text-[15px] font-normal tracking-tight text-black">
              {item.title}
              <span className="text-black/25 transition-colors group-hover:text-black">→</span>
            </h3>
          </article>
        ))}
        <div className="w-1 shrink-0" />
      </div>
    </section>
  );
}