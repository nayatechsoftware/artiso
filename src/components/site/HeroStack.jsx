import { useEffect, useRef, useState } from "react";
import { Image } from "@/components/ui/image";

const PHOTOS = [
  "https://cdn.sanity.io/images/mvgv7zsh/production/0182d5c6b1137ed0196fd40c2807434851c94312-896x1200.webp",
  "https://cdn.sanity.io/images/mvgv7zsh/production/0225868809e58fac17799c816302a1c9d2846578-1085x1450.webp",
  "https://cdn.sanity.io/images/mvgv7zsh/production/04971e479501075a2e2d4ccfe2f4da72c15706ec-1200x1600.webp",
  "https://cdn.sanity.io/images/mvgv7zsh/production/214dc17a12dce2bbdd730f6a8ffe1362694aeb09-1000x1339.webp",
  "https://cdn.sanity.io/images/mvgv7zsh/production/25eebbd273dbefe1fa0eb2d4381968f1f1b37d45-1140x1600.webp",
];

const REST_ROTATION = [-6, 4, -2, 7];
const CYCLE_MS = 3000;
const OUT_MS = 900;

export default function HeroStack() {
  const stackRef = useRef(null);
  const [order, setOrder] = useState(PHOTOS.map((_, index) => index));
  const [leaving, setLeaving] = useState(null);
  const orderRef = useRef(order);

  orderRef.current = order;

  useEffect(() => {
    let cycle = null;
    let exit = null;

    const tick = () => {
      setLeaving(orderRef.current[0]);
      exit = window.setTimeout(() => {
        setOrder((current) => [...current.slice(1), current[0]]);
        setLeaving(null);
        cycle = window.setTimeout(tick, CYCLE_MS - OUT_MS);
      }, OUT_MS);
    };

    orderRef.current = order;
    cycle = window.setTimeout(tick, CYCLE_MS);
    return () => {
      window.clearTimeout(cycle);
      window.clearTimeout(exit);
    };
  }, [order]);

  useEffect(() => {
    const el = stackRef.current;
    if (!el) return undefined;

    let frame = null;
    const update = () => {
      frame = null;
      const y = window.scrollY;
      stackRef.current?.style.setProperty("--stack-shift", `${Math.min(y * 0.18, 240)}px`);
      stackRef.current?.style.setProperty("--stack-fade", String(Math.max(0, 1 - y / 620)));
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
    orderRef.current = order;
  }, [order]);

  useEffect(() => {
    let cycle = null;
    let exit = null;

    const tick = () => {
      setLeaving(orderRef.current[0]);
      exit = window.setTimeout(() => {
        setOrder((current) => [...current.slice(1), current[0]]);
        setLeaving(null);
        cycle = window.setTimeout(tick, CYCLE_MS - OUT_MS);
      }, OUT_MS);
    };

    cycle = window.setTimeout(tick, CYCLE_MS);
    return () => {
      window.clearTimeout(cycle);
      window.clearTimeout(exit);
    };
  }, []);

  useEffect(() => {
    const el = stackRef.current;
    if (!el) return undefined;

    let frame = null;
    const update = () => {
      frame = null;
      const y = window.scrollY;
      el.style.setProperty("--stack-shift", `${Math.min(y * 0.18, 240)}px`);
      el.style.setProperty("--stack-fade", String(Math.max(0, 1 - y / 620)));
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

  return (
    <div className="hero-stack" ref={stackRef} aria-hidden="true">
      <div className="hero-stack-deck">
        {PHOTOS.map((src, photoIndex) => {
          const depth = order.indexOf(photoIndex);
          const isLeaving = leaving === photoIndex;
          const rotation = isLeaving ? 8 : depth === 0 ? 0 : REST_ROTATION[(depth - 1) % REST_ROTATION.length];
          const offset = isLeaving ? 40 : depth * 8;
          const shift = isLeaving ? 0 : depth * 6;
          const scale = isLeaving ? 1 : Math.max(0.9, 1 - depth * 0.03);

          return (
            <div
              key={src}
              className="hero-stack-slot"
              style={{
                "--i": photoIndex,
                zIndex: isLeaving ? PHOTOS.length + 1 : PHOTOS.length - depth,
              }}
            >
              <Image
                src={src}
                alt=""
                fittingType="fill"
                className={`hero-stack-card${depth === 0 && !isLeaving ? " is-front" : ""}`}
                style={{
                  transform: `translate(${shift}px, ${offset}px) rotate(${rotation}deg)`,
                  scale: String(scale),
                  opacity: isLeaving ? 0 : 1,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}