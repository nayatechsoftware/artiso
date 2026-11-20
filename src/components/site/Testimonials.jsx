import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { testimonials } from "@/data/site";
import { cn } from "@/lib/utils";

const AUTOPLAY = 7000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef(null);
  const total = testimonials.length;

  const go = (step) => setIndex((current) => (current + step + total) % total);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((current) => (current + 1) % total), AUTOPLAY);
    return () => clearInterval(id);
  }, [paused, total]);

  const onPointerDown = (event) => {
    dragStart.current = event.clientX;
  };

  const onPointerUp = (event) => {
    if (dragStart.current === null) return;
    const delta = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) > 40) go(delta > 0 ? -1 : 1);
  };

  return (
    <section className="shell py-20 md:py-28 lg:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">06 — Voices</p>
          <h2 className="display-xl mt-6 max-w-[14ch]">Experiences That Matter</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition-colors hover:bg-black hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.4} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition-colors hover:bg-black hover:text-white"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
          </button>
        </div>
      </Reveal>

      <div
        className="mt-12 cursor-grab border-t border-black/12 active:cursor-grabbing"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (dragStart.current = null)}
        style={{ touchAction: "pan-y" }}
      >
        <div className="grid">
          {testimonials.map((entry, i) => {
            const isActive = i === index;
            return (
              <figure
                key={entry.name}
                aria-hidden={!isActive}
                className={cn(
                  "col-start-1 row-start-1 pt-10 transition-all [transition-duration:600ms] ease-out md:pt-14",
                  isActive
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-2 opacity-0"
                )}
              >
                <Quote className="h-8 w-8 text-black/25" strokeWidth={1.2} />
                <blockquote className="mt-6 max-w-4xl font-display text-[clamp(1.3rem,2.4vw,2rem)] leading-[1.4] text-black">
                  “{entry.quote}”
                </blockquote>
                <figcaption className="mt-10 flex flex-col gap-1 border-t border-black/12 pt-5 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-[15px] text-black">{entry.name}</span>
                  <span className="text-sm text-black/50">{entry.role}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2">
        {testimonials.map((entry, dotIndex) => (
          <button
            key={entry.name}
            type="button"
            onClick={() => setIndex(dotIndex)}
            aria-label={`Show testimonial from ${entry.name}`}
            className={cn(
              "h-[3px] transition-all duration-500",
              dotIndex === index ? "w-10 bg-black" : "w-5 bg-black/20 hover:bg-black/40"
            )}
          />
        ))}
      </div>
    </section>
  );
}