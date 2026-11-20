import { heroPhotos } from "@/data/site";

const layout = [
  { rot: "-7deg", z: 1, left: "-2%", top: "2%", width: "40%" },
  { rot: "6deg", z: 2, left: "60%", top: "5%", width: "38%" },
  { rot: "-2deg", z: 3, left: "26%", top: "11%", width: "47%" },
  { rot: "5deg", z: 4, left: "3%", top: "52%", width: "36%" },
  { rot: "-5deg", z: 2, left: "58%", top: "48%", width: "34%" },
];

export default function HeroCollage() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-[min(78vw,430px)] lg:w-[min(42vw,520px)]"
    >
      {heroPhotos.map((src, index) => {
        const card = layout[index];
        return (
          <figure
            key={src}
            className="collage-in absolute overflow-hidden bg-[#e6e6e6] shadow-[0_36px_70px_-38px_rgba(18,18,18,0.5)]"
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
            <img
              src={src}
              alt=""
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <span className="halftone-edge pointer-events-none absolute inset-0" />
          </figure>
        );
      })}
    </div>
  );
}