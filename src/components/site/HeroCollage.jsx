import { collagePhotos } from "@/data/site";

// Layered portrait tiles with a dotted halftone offset behind each photo.
const TILES = [
  { photo: 0, left: "2%", top: "0%", width: "46%", height: "38%", z: 3 },
  { photo: 7, left: "52%", top: "5%", width: "46%", height: "31%", z: 2 },
  { photo: 14, left: "18%", top: "33%", width: "50%", height: "38%", z: 4 },
  { photo: 21, left: "0%", top: "70%", width: "44%", height: "30%", z: 5 },
  { photo: 29, left: "56%", top: "58%", width: "42%", height: "42%", z: 6 },
];

const PATTERNS = [
  { left: "-2%", top: "-3%", width: "50%", height: "26%" },
  { left: "58%", top: "36%", width: "40%", height: "22%" },
];

export default function HeroCollage() {
  return (
    <div
      className="hero-collage"
      role="img"
      aria-label="A collage of fashion photographs and pattern drawings"
    >
      {PATTERNS.map((style, index) => (
        <span key={`p-${index}`} className="collage-pattern" style={style} aria-hidden="true" />
      ))}

      {TILES.map((tile, index) => (
        <figure
          key={`t-${index}`}
          className="collage-tile tile"
          style={{
            left: tile.left,
            top: tile.top,
            width: tile.width,
            height: tile.height,
            "--z": tile.z,
            "--i": index,
          }}
        >
          <span className="collage-dots" aria-hidden="true" />
          <img src={collagePhotos[tile.photo]} alt="" loading={index === 0 ? "eager" : "lazy"} />
        </figure>
      ))}
    </div>
  );
}