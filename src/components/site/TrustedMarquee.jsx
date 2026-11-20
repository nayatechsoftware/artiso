import Reveal from "@/components/site/Reveal";
import { brands } from "@/data/site";

export default function TrustedMarquee() {
  const row = [...brands, ...brands];

  return (
    <section className="border-y border-black/10 py-14 md:py-16">
      <Reveal className="shell">
        <p className="eyebrow text-center">Trusted by</p>
      </Reveal>
      <div className="relative mt-8 overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-16 pr-16 md:gap-24 md:pr-24">
          {row.map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="whitespace-nowrap text-[clamp(1.1rem,2vw,1.6rem)] font-medium uppercase tracking-[0.22em] text-black/35"
            >
              {brand}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f4f4f4] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f4f4f4] to-transparent md:w-28" />
      </div>
    </section>
  );
}