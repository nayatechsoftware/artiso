import Reveal from "@/components/site/Reveal";

export default function IntroStatement() {
  return (
    <section className="shell py-[clamp(48px,6vw,96px)]">
      <Reveal className="mx-auto max-w-[17em] text-center">
        <p className="text-[20px] font-medium leading-[1.35] tracking-[-0.015em] text-[#121212]">
          The AI Operating System that connects the way fashion teams think, create and bring
          ideas to life
        </p>
      </Reveal>
    </section>
  );
}