import { Image } from "@/components/ui/image";
import { images } from "@/data/site";

const cards = [
  { src: images.brandDna, rot: "-8deg", z: 1, left: "-4%", top: "4%", width: "44%" },
  { src: images.styling, rot: "7deg", z: 2, left: "58%", top: "0%", width: "42%" },
  { src: images.campaigns, rot: "-2deg", z: 3, left: "25%", top: "14%", width: "50%" },
  { src: images.aiAvatar, rot: "5deg", z: 4, left: "2%", top: "56%", width: "40%" },
  { src: images.archive, rot: "-5deg", z: 2, left: "56%", top: "50%", width: "38%" },
];

export default function HeroCollage() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-[min(78vw,430px)] lg:w-[min(42vw,500px)]"
    >
      {cards.map((card, index) => (
        <figure
          key={card.src}
          className="collage-in absolute overflow-hidden bg-[#e6e6e6] shadow-[0_36px_70px_-38px_rgba(18,18,18,0.5)] ring-1 ring-black/5"
          style={{
            left: card.left,
            top: card.top,
            width: card.width,
            aspectRatio: "3 / 4",
            zIndex: card.z,
            "--rot": card.rot,
            animationDelay: `${index * 90}ms`,
          }}
        >
          <Image src={card.src} alt="" className="dither h-full w-full" fittingType="fill" />
          <span className="halftone-edge absolute inset-0" />
        </figure>
      ))}
    </div>
  );
}