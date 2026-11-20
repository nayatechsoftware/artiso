import Reveal from "@/components/site/Reveal";
import MemoryStack from "@/components/site/MemoryStack";
import { layers } from "@/data/site";

export default function MemoryArchitecture() {
  return (
    <section id="about" className="border-y border-black/10 bg-[#edebe9] py-20 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[800px] px-5 md:px-0">
        <div className="grid gap-8 md:grid-cols-[59%_41%]">
          <Reveal>
            <h2 className="text-[30px] font-light leading-[1.05] text-[#222] md:text-[36px]">
              The Four Layer Memory Architecture
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[15px] leading-relaxed text-[#666]">
              A unified intelligence layer that connects brand identity, workflows, and creation.
            </p>
          </Reveal>
        </div>

        <div className="mt-16">
          <MemoryStack layers={layers} />
        </div>
      </div>
    </section>
  );
}