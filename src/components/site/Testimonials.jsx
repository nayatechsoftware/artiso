import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const single = total < 2;

  const go = (step) => setIndex((current) => (current + step + total) % total);

  return (
    <section className="bg-[#f4f4f4] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[800px] px-5 md:px-0">
        <h2 className="text-[30px] font-light leading-tight text-[#222] md:text-[36px]">
          Experiences That Matter
        </h2>

        <div className="mt-10 md:pl-[197px]">
          <span aria-hidden="true" className="block font-serif text-[96px] leading-[0.62] text-[#6b6358]">
            “
          </span>

          <div className="relative mt-6 min-h-[200px]">
            {testimonials.map((entry, entryIndex) => {
              const isActive = entryIndex === index;
              return (
                <figure
                  key={entry.name}
                  aria-hidden={!isActive}
                  className={cn(
                    "transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                      ? "relative opacity-100"
                      : "pointer-events-none absolute inset-0 opacity-0"
                  )}
                >
                  <blockquote
                    className="max-w-[420px] font-serif text-[26px] font-normal leading-[1.35] text-[#5c5850]"
                    style={{ textIndent: "-10px" }}
                  >
                    “{entry.quote}”
                  </blockquote>
                  <figcaption className="mt-7">
                    <p className="text-[15px] text-[#222]">{entry.name}</p>
                    <p className="mt-1 text-[14px] text-[#777]">{entry.role}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {!single && (
            <div className="mt-14 flex gap-3 md:ml-[463px]">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="text-[#222] transition-opacity duration-200 ease-out hover:opacity-45"
              >
                <ArrowLeft className="h-[22px] w-[22px]" strokeWidth={1.25} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="text-[#222] transition-opacity duration-200 ease-out hover:opacity-45"
              >
                <ArrowRight className="h-[22px] w-[22px]" strokeWidth={1.25} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}