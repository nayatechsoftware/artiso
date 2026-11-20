import { values } from "@/data/careers";
import Reveal from "@/components/site/Reveal";

export default function ValuesGrid() {
  return (
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {values.map((value, index) => (
        <Reveal key={value.title} delay={index * 50}>
          <article className="border-t border-black/12 pt-5">
            <span className="eyebrow tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-xl font-light tracking-tight text-black">{value.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-black/55">{value.text}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}