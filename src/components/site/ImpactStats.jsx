import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/site/Reveal";
import { stats } from "@/data/site";

function useCountUp(target, start) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame;
    const duration = 1800;
    const began = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - began) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target]);

  return value;
}

function Stat({ stat, start, index }) {
  const value = useCountUp(stat.value, start);
  return (
    <Reveal delay={index * 150} className="border-t border-black/12 pt-6">
      <div className="flex items-baseline gap-1">
        <span className="text-[clamp(3.4rem,7vw,6rem)] font-light leading-none tracking-[-0.04em] text-black tabular-nums">
          {value}
        </span>
        <span className="text-[clamp(1.4rem,2.4vw,2rem)] font-light text-black/70">{stat.suffix}</span>
      </div>
      <p className="mt-5 max-w-[22ch] text-[15px] leading-snug text-black">{stat.label}</p>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-black/50">{stat.text}</p>
    </Reveal>
  );
}

export default function ImpactStats() {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStart(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="news" ref={ref} className="shell py-20 md:py-28 lg:py-36">
      <Reveal>
        <p className="eyebrow">05 — Impact</p>
        <h2 className="display-xl mt-6 max-w-[14ch]">The Impact Behind The Innovation</h2>
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {stats.map((stat, index) => (
          <Stat key={stat.label} stat={stat} start={start} index={index} />
        ))}
      </div>
    </section>
  );
}