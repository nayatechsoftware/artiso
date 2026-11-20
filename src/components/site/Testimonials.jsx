import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { testimonials } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const go = (step) => setIndex((current) => (current + step + total) % total);

  return (
    <section className="shell py-20 md:py-28 lg:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">07 — Voices</p>
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

      <Reveal className="mt-12 overflow-hidden border-t border-black/12">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((entry) => (
            <figure key={entry.name} className="w-full shrink-0 px-0 pt-10 md:pt-14">
              <blockquote className="max-w-4xl text-[clamp(1.35rem,2.6vw,2.1rem)] font-light leading-[1.35] tracking-[-0.02em] text-black">
                “{entry.quote}”
              </blockquote>
              <figcaption className="mt-10 flex flex-col gap-1 border-t border-black/12 pt-5 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="text-[15px] text-black">{entry.name}</span>
                <span className="text-sm text-black/50">{entry.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

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