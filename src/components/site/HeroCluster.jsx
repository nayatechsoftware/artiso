import { useEffect, useRef, useState } from "react";
import { Image } from "@/components/ui/image";

const PHOTOS = [
  "https://cdn.sanity.io/images/mvgv7zsh/production/0182d5c6b1137ed0196fd40c2807434851c94312-896x1200.webp",
  "https://cdn.sanity.io/images/mvgv7zsh/production/0225868809e58fac17799c816302a1c9d2846578-1085x1450.webp",
  "https://cdn.sanity.io/images/mvgv7zsh/production/04971e479501075a2e2d4ccfe2f4da72c15706ec-1200x1600.webp",
  "https://cdn.sanity.io/images/mvgv7zsh/production/214dc17a12dce2bbdd730f6a8ffe1362694aeb09-1000x1339.webp",
  "https://cdn.sanity.io/images/mvgv7zsh/production/25eebbd273dbefe1fa0eb2d4381968f1f1b37d45-1140x1600.webp",
  "https://cdn.sanity.io/images/mvgv7zsh/production/03640ac31f27b485a3d96f59bad59cbb0baf9548-900x1200.webp",
  "https://cdn.sanity.io/images/mvgv7zsh/production/068dcc3b3710642492a3bdaf7b731ac0db708938-896x1200.webp",
  "https://cdn.sanity.io/images/mvgv7zsh/production/218c1a0babc1068d6d8fdc5b0aa8415265b89095-960x1280.jpg",
  "https://cdn.sanity.io/images/mvgv7zsh/production/2bbbb51b987c2a17a36622b8baf0751d29cfcf93-805x1200.webp",
];

/* Slots live in a 420 x 640 coordinate box, all axis aligned. */
const SLOTS = [
  { x: 0, y: 0, w: 160, h: 220 },
  { x: 150, y: 30, w: 180, h: 110 },
  { x: 300, y: 60, w: 120, h: 200 },
  { x: 60, y: 190, w: 170, h: 210 },
  { x: 190, y: 150, w: 230, h: 200 },
  { x: 10, y: 430, w: 160, h: 60 },
  { x: 120, y: 300, w: 150, h: 260 },
  { x: 200, y: 250, w: 220, h: 380 },
];

const CARDS = [
  { photo: 0, z: 3, ghost: true, mode: "color" },
  { photo: 1, z: 5, ghost: false, mode: "color" },
  { photo: 2, z: 2, ghost: false, mode: "halftone" },
  { photo: 3, z: 6, ghost: true, mode: "color" },
  { photo: 4, z: 4, ghost: false, mode: "color" },
  { photo: 5, z: 7, ghost: true, mode: "color" },
  { photo: 6, z: 8, ghost: false, mode: "color" },
  { photo: 7, z: 1, ghost: false, mode: "halftone" },
];

const STEP_MS = 2500;

export default function HeroCluster() {
  const clusterRef = useRef(null);
  const stepRef = useRef(0);
  const [cards, setCards] = useState(() => CARDS.map((card, index) => ({ ...card, slot: index })));

  useEffect(() => {
    const el = clusterRef.current;
    if (!el) return undefined;

    let frame = null;
    const update = () => {
      frame = null;
      const y = window.scrollY;
      el.style.setProperty("--cluster-shift", `${-Math.min(y * 0.16, 180)}px`);
      el.style.setProperty("--cluster-fade", String(Math.max(0, 1 - y / 600)));
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      stepRef.current += 1;
      const step = stepRef.current;

      setCards((prev) => {
        const next = prev.map((card) => ({ ...card }));
        const colors = next.map((card, i) => i).filter((i) => next[i].mode === "color");
        const dots = next.map((card, i) => i).filter((i) => next[i].mode === "halftone");
        if (!colors.length || !dots.length) return prev;

        const toDots = colors[step % colors.length];
        const toColor = dots[step % dots.length];

        next[toDots].mode = "halftone";
        next[toColor].mode = "color";
        next[toColor].photo =
          (next[toColor].photo + 1 + (step % (PHOTOS.length - 1))) % PHOTOS.length;

        const partner = (toColor + 3) % next.length;
        const slot = next[toColor].slot;
        next[toColor].slot = next[partner].slot;
        next[partner].slot = slot;

        return next;
      });
    }, STEP_MS);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="hero-cluster" ref={clusterRef} aria-hidden="true">
      <div className="hero-cluster-deck">
        {cards.map((card, index) => {
          const slot = SLOTS[card.slot];
          const src = PHOTOS[card.photo];
          const isDots = card.mode === "halftone";

          return (
            <div
              key={index}
              className="hero-cluster-card"
              style={{
                "--x": slot.x,
                "--y": slot.y,
                "--w": slot.w,
                "--h": slot.h,
                "--i": index,
                "--color-o": isDots ? 0 : 1,
                "--dots-o": isDots ? 1 : 0,
                "--drift": `${9 + (index % 4) * 1.7}s`,
                "--drift-delay": `${index * 0.45}s`,
                zIndex: card.z,
              }}
            >
              <div className="hero-cluster-drift">
                {card.ghost && (
                  <span className="hero-cluster-peek">
                    <Image
                      src={src}
                      alt=""
                      fittingType="fill"
                      className="hero-cluster-dots"
                      style={{ "--dots-o": 1 }}
                    />
                  </span>
                )}
                <Image src={src} alt="" fittingType="fill" className="hero-cluster-img" />
                <Image src={src} alt="" fittingType="fill" className="hero-cluster-dots" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}