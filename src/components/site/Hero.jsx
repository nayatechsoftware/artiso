import HeroCollage from "@/components/site/HeroCollage";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#f4f4f4] pb-20 pt-28 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center lg:pl-[12%]">
        <HeroCollage />
      </div>

      <span className="pointer-events-none absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 [writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.32em] text-black/40 xl:block">
        Visual content AI-generated with ARTISO
      </span>

      <p className="fade-up pointer-events-none absolute bottom-8 right-5 z-20 max-w-[80%] text-right font-normal leading-[1.15] tracking-[-0.02em] text-[#121212] [font-size:clamp(28px,2.4vw,46px)] md:bottom-10 md:right-[20%]">
        Shaping the Future
        <br />
        of Fashion
      </p>
    </section>
  );
}