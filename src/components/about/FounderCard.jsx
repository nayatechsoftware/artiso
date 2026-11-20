import { Linkedin } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function FounderCard({ founder }) {
  return (
    <article>
      <div className="aspect-[2/3] w-full overflow-hidden bg-black/5">
        <Image
          src={founder.image}
          alt={`${founder.name}, ${founder.role} of ARTISO`}
          className="h-full w-full"
          fittingType="fill"
        />
      </div>
      <h3 className="mt-6 text-xl font-light tracking-tight text-black md:text-2xl">{founder.name}</h3>
      <p className="eyebrow mt-2">{founder.role}</p>
      <p className="mt-5 text-[14px] leading-relaxed text-black/55">{founder.bio}</p>
      <a
        href={founder.linkedin}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-black/55 transition-colors hover:text-black"
      >
        <Linkedin className="h-3.5 w-3.5" strokeWidth={1.5} />
        LinkedIn
      </a>
    </article>
  );
}