import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { brands } from "@/data/site";
import { cn } from "@/lib/utils";

const MARKS = {
  tight:
    "font-heading text-[clamp(1.35rem,2.2vw,1.85rem)] font-semibold uppercase tracking-[0.26em]",
  serif: "font-display text-[clamp(1.4rem,2.4vw,2rem)] font-normal tracking-[0.02em]",
  wide:
    "font-heading text-[clamp(0.95rem,1.6vw,1.25rem)] font-medium uppercase tracking-[0.34em]",
};

function BrandMark({ brand }) {
  return (
    <span className="flex flex-col items-center gap-2 text-black/40 transition-colors duration-300 hover:text-black/70">
      <span className={MARKS[brand.style]}>{brand.name}</span>
      {brand.note ? (
        <span className="text-[8px] uppercase tracking-[0.32em] text-black/35">{brand.note}</span>
      ) : null}
    </span>
  );
}

export default function TrustedMarquee() {
  const trackRef = useRef(null);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setOverflowing(track.scrollWidth > track.clientWidth + 4);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const nudge = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="border-t border-black/10 py-14 md:py-16">
      <Reveal className="shell">
        <p className="eyebrow">Trusted by</p>
      </Reveal>

      <div
        ref={trackRef}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory items-center gap-12 overflow-x-auto px-5 md:justify-between md:gap-6 md:px-12"
      >
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex shrink-0 snap-start items-center justify-center md:flex-1"
          >
            <BrandMark brand={brand} />
          </div>
        ))}
      </div>

      <div className="shell mt-10 flex items-center justify-end gap-2 border-t border-black/15 pt-4">
        <button
          type="button"
          onClick={() => nudge(-1)}
          disabled={!overflowing}
          aria-label="Previous brand"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/70 transition-colors duration-300 hover:bg-black hover:text-white",
            !overflowing && "cursor-default opacity-30 hover:bg-transparent hover:text-black/70"
          )}
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.4} />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          disabled={!overflowing}
          aria-label="Next brand"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/70 transition-colors duration-300 hover:bg-black hover:text-white",
            !overflowing && "cursor-default opacity-30 hover:bg-transparent hover:text-black/70"
          )}
        >
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
        </button>
      </div>
    </section>
  );
}