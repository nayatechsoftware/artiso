import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/site/Reveal";
import { stats } from "@/data/site";

const CARD_BG = ["#9aafbb", "#e2e2e2", "#d6d4d1"];

function useCountUp(target, start) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return undefined;
    }
    let frame;
    const duration = 1600;
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

function StatCard({ stat, start, index }) {
  const value = useCountUp(stat.value, start);

  return (
    <Reveal i={index} className="h-full">
      <article
        className="flex h-full min-h-[320px] flex-col p-[26px]"
        style={{ backgroundColor: CARD_BG[index % CARD_BG.length] }}
      >
        <p className="text-[64px] font-light leading-none tabular-nums text-[#222]">
          {value}
          {stat.suffix}
        </p>
        <p className="mt-3 text-[12px] leading-snug text-[#333]">{stat.label}</p>
        <div className="mt-auto pt-10">
          <h3 className="text-[22px] font-normal leading-tight text-[#222]">{stat.title}</h3>
          <p className="mt-3 text-[13px] leading-relaxed text-[#333]">{stat.text}</p>
        </div>
      </article>
    </Reveal>
  );
}

export default function ImpactStats() {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStart(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="news" ref={ref} className="py-20 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[800px] px-5 md:px-0">
        <h2 className="text-center text-[30px] font-light leading-tight text-[#222] md:text-[36px]">
          The Impact Behind The Innovation
        </h2>

        <div className="mt-12 grid gap-[10px] md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} start={start} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}