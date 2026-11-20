import { useEffect, useState } from "react";
import { Image } from "@/components/ui/image";
import { images } from "@/data/site";
import { cn } from "@/lib/utils";
import useIntroGate from "@/hooks/useIntroGate";

const cards = [
  {
    src: images.brandDna,
    rot: "-4deg",
    className: "left-[4%] top-[26%] h-[34%] w-[24%] md:left-[6%] md:h-[40%] md:w-[22%]",
  },
  {
    src: images.campaigns,
    rot: "3deg",
    className: "left-[20%] top-[42%] h-[32%] w-[23%] md:left-[22%] md:h-[38%] md:w-[21%]",
  },
  {
    src: images.aiAvatar,
    rot: "-2deg",
    className: "left-[36%] top-[24%] h-[36%] w-[25%] md:left-[38%] md:h-[42%] md:w-[23%]",
  },
];

export default function HeroCollage() {
  const ready = useIntroGate();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!ready) return undefined;
    const timer = setTimeout(() => setLeaving(true), 1600);
    return () => clearTimeout(timer);
  }, [ready]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-10 transition-opacity duration-700 ease-out",
        leaving && "opacity-0"
      )}
    >
      {cards.map((card, index) => (
        <figure
          key={card.src}
          className={cn(
            "absolute overflow-hidden bg-[#e6e6e6] shadow-[0_34px_70px_-34px_rgba(18,18,18,0.55)]",
            ready ? "collage-in" : "opacity-0",
            card.className
          )}
          style={{ "--rot": card.rot, animationDelay: `${index * 100}ms` }}
        >
          <Image src={card.src} alt="" className="dither h-full w-full" fittingType="fill" />
          <span className="halftone absolute inset-0" />
        </figure>
      ))}
    </div>
  );
}