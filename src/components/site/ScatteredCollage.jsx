import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { collagePhotos, heroFeature } from "@/data/site";

const COLS = 13;
const ROWS = 9;

function mulberry32(seed) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Deterministic scatter so the server and client render the same tiles.
function buildTiles() {
  const random = mulberry32(20261120);
  const tiles = [];

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      let keep = 0.92;
      if (col === 0) keep = 0.3;
      else if (col === 1) keep = 0.6;
      else if (col >= COLS - 2) keep = 0.74;
      if (random() > keep) continue;

      const large = random() < 0.12;
      const width = Math.round(large ? 100 + random() * 30 : 55 + random() * 40);
      const cutout = !large && random() < 0.14;
      const height = cutout ? width : Math.round(width * 1.3333);

      tiles.push({
        key: `${row}-${col}`,
        src: collagePhotos[Math.floor(random() * collagePhotos.length)],
        left: ((col + 0.5) / COLS) * 100,
        top: ((row + 0.5) / ROWS) * 100,
        dx: (random() - 0.5) * 30 - width / 2,
        dy: (random() - 0.5) * 34 - height / 2,
        width,
        height,
        cutout,
        speed: 0.9 + random() * 0.25,
      });
    }
  }

  return tiles;
}

const tiles = buildTiles();

export default function ScatteredCollage() {
  const layerRef = useRef(null);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = null;
    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        el.style.setProperty("--sy", String(window.scrollY));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="collage-fade pointer-events-none absolute inset-y-0 left-[6%] right-[4%] z-0 overflow-hidden lg:left-[18%] lg:right-[6%]"
    >
      {tiles.map((tile, index) => (
        <div
          key={tile.key}
          className={cn("absolute will-change-transform", index % 2 === 1 && "hidden sm:block")}
          style={{
            left: `calc(${tile.left}% + ${tile.dx}px)`,
            top: `calc(${tile.top}% + ${tile.dy}px)`,
            width: `min(${tile.width}px, 22vw)`,
            height: `min(${tile.height}px, 29vw)`,
            "--p": (tile.speed - 1).toFixed(3),
            transform: "translate3d(0, calc(var(--sy, 0) * var(--p) * 1px), 0)",
          }}
        >
          <div
            className={cn(
              "tile-in h-full w-full overflow-hidden",
              tile.cutout && "bg-[#ebe9e6]"
            )}
            style={{ animationDelay: `${Math.min(index, 64) * 15}ms` }}
          >
            <img
              src={tile.src}
              alt=""
              loading={index < 16 ? "eager" : "lazy"}
              decoding="async"
              className={cn(
                "h-full w-full",
                tile.cutout ? "object-contain p-1.5" : "object-cover"
              )}
            />
          </div>
        </div>
      ))}

      <div className="absolute left-[34%] top-[calc(80svh-290px)] hidden md:block">
        <div className="relative h-[290px] w-[250px]">
          <img
            src={heroFeature.back}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute left-0 top-0 h-[200px] w-[140px] object-cover"
          />
          <img
            src={heroFeature.front}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute left-[60px] top-[20px] h-[270px] w-[190px] object-cover"
          />
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {heroFeature.colours.map((colour) => (
            <span
              key={colour}
              className="h-2.5 w-2.5"
              style={{ backgroundColor: colour }}
            />
          ))}
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-black/50">
          {heroFeature.caption}
        </p>
      </div>
    </div>
  );
}