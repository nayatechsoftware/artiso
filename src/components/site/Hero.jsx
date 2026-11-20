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

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center px-5 md:bottom-12">
        <p className="fade-up text-center text-[13px] font-light tracking-[-0.01em] text-[#121212] md:ml-[26%] md:text-[15px]">
          Shaping the Future of Fashion
        </p>
      </div>
    </section>
  );
}