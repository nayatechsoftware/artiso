import ScatteredCollage from "@/components/site/ScatteredCollage";

export default function Hero() {
  return (
    <section id="top" className="relative h-[130svh] w-full overflow-hidden bg-[#f4f4f4]">
      <ScatteredCollage />

      <div className="pointer-events-none absolute left-5 top-[92svh] z-20 hidden -translate-y-full flex-col items-center gap-3 md:flex lg:left-[9vw]">
        <span className="cue-line h-10 w-px bg-black/30" />
        <span className="[writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.32em] text-black/45">
          Scroll
        </span>
      </div>

      <span className="pointer-events-none absolute right-3 top-[88svh] z-20 hidden -translate-y-full rotate-180 [writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.32em] text-black/40 xl:block">
        Visual content AI-generated with ARTISO
      </span>

      <p className="pointer-events-none absolute right-5 top-[92svh] z-20 -translate-y-full text-right text-[26px] font-normal leading-[1.15] tracking-[-0.02em] text-[#121212] md:right-[35%] md:text-[32px]">
        Shaping the Future
        <br />
        of Fashion
      </p>
    </section>
  );
}