import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { brands } from "@/data/site";

const SPEED = 40;

export default function TrustedMarquee() {
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(42);
  const [step, setStep] = useState(220);
  const [nudge, setNudge] = useState(0);
  const row = [...brands, ...brands];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const half = track.scrollWidth / 2;
      if (!half) return;
      setDuration(half / SPEED);
      setStep(half / brands.length);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="border-y border-black/10 py-14 md:py-16">
      <Reveal className="shell">
        <p className="eyebrow text-center">Trusted by</p>
      </Reveal>

      <div className="relative mt-8 overflow-hidden">
        <div
          className="transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${nudge}px)` }}
        >
          <div
            ref={trackRef}
            className="marquee-track flex w-max items-center gap-16 pr-16 md:gap-24 md:pr-24"
            style={{ animationDuration: `${duration}s` }}
          >
            {row.map((brand, index) => (
              <span
                key={`${brand}-${index}`}
                className="whitespace-nowrap text-[clamp(1.1rem,2vw,1.6rem)] font-medium uppercase tracking-[0.22em] text-black/30 grayscale"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f4f4f4] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f4f4f4] to-transparent md:w-28" />
      </div>

      <div className="shell mt-6 flex items-center justify-end gap-2 border-t border-black/12 pt-4">
        <button
          type="button"
          onClick={() => setNudge((value) => value + step)}
          aria-label="Previous brand"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/70 transition-colors duration-300 hover:bg-black hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.4} />
        </button>
        <button
          type="button"
          onClick={() => setNudge((value) => value - step)}
          aria-label="Next brand"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/70 transition-colors duration-300 hover:bg-black hover:text-white"
        >
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
        </button>
      </div>
    </section>
  );
}