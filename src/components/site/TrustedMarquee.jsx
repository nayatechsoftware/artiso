import { brandLogos, pressLogos } from "@/data/site";

function LogoRow({ logos }) {
  const track = [...logos, ...logos];

  return (
    <div className="relative mt-8 overflow-hidden">
      <div className="marquee-track flex w-max items-center">
        {track.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-6 w-auto max-w-[150px] shrink-0 object-contain pr-10 md:h-8 md:pr-16"
          />
        ))}
      </div>
    </div>
  );
}

export default function TrustedMarquee() {
  return (
    <section className="border-t border-black/10 py-14 md:py-16">
      <div className="shell">
        <p className="eyebrow">Trusted by</p>
      </div>
      <LogoRow logos={brandLogos} />

      <div className="shell mt-12">
        <p className="eyebrow">Featured in</p>
      </div>
      <LogoRow logos={pressLogos} />
    </section>
  );
}