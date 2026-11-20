import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { brandLogos, pressLogos } from "@/data/site";
import { cn } from "@/lib/utils";

const PER_PAGE = 5;

const pages = [];
for (let index = 0; index < brandLogos.length; index += PER_PAGE) {
  pages.push(brandLogos.slice(index, index + PER_PAGE));
}

export default function TrustedBy() {
  const [page, setPage] = useState(0);
  const total = pages.length;

  const go = (step) => setPage((current) => (current + step + total) % total);

  return (
    <section className="bg-[#edebe9] py-16 md:py-20">
      <div className="mx-auto w-full max-w-[800px] px-5 md:px-0">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#222]/45">Trusted by</p>

        <div className="relative mt-9 h-10">
          {pages.map((logos, pageIndex) => (
            <div
              key={pageIndex}
              aria-hidden={pageIndex !== page}
              className={cn(
                "absolute inset-0 grid grid-cols-5 items-center transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                pageIndex === page
                  ? "translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-3 opacity-0"
              )}
            >
              {logos.map((src) => (
                <div key={src} className="flex items-center justify-center">
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-auto max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-9 border-t border-[#cfcfcf]" />

        <div className="mt-3 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous logos"
            className="text-[#222] transition-opacity duration-200 ease-out hover:opacity-45"
          >
            <ArrowLeft className="h-6 w-6" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next logos"
            className="text-[#222] transition-opacity duration-200 ease-out hover:opacity-45"
          >
            <ArrowRight className="h-6 w-6" strokeWidth={1.25} />
          </button>
        </div>

        <p className="mt-16 text-center text-[11px] uppercase tracking-[0.22em] text-[#222]/45">
          Featured in
        </p>

        <div className="mt-9 flex items-center justify-center gap-x-10">
          {pressLogos.slice(0, 5).map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-[22px] w-auto max-w-[130px] object-contain"
            />
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-x-10">
          {pressLogos.slice(5).map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-[22px] w-auto max-w-[130px] object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}