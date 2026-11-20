import { hiringProcess } from "@/data/careers";

export default function HiringProcess() {
  return (
    <ol className="grid gap-8 md:grid-cols-3">
      {hiringProcess.map((step, index) => (
        <li key={step.title} className="border-t border-black/12 pt-5">
          <span className="eyebrow tabular-nums">{index + 1}</span>
          <h3 className="mt-4 text-xl font-light tracking-tight text-black">{step.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-black/55">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}