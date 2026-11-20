import { useEffect, useRef, useState } from "react";

const W = 460;
const H = 125;
const OFFSET = 26;

const FILLS = [
  { id: "mem-0", from: "#dce4ec", fromOpacity: 0.7, to: "#dce4ec", toOpacity: 0.55 },
  { id: "mem-1", from: "#bed2eb", fromOpacity: 0.7, to: "#bed2eb", toOpacity: 0.58 },
  { id: "mem-2", from: "#9bbbe6", fromOpacity: 0.8, to: "#c6d3e8", toOpacity: 0.85 },
  { id: "mem-3", from: "#d9cdbd", fromOpacity: 1, to: "#e4e2df", toOpacity: 1 },
];

function unit(from, to) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  return [dx / len, dy / len];
}

function roundedDiamond(w, h, r) {
  const points = [
    [w / 2, 0],
    [w, h / 2],
    [w / 2, h],
    [0, h / 2],
  ];
  let path = "";

  points.forEach((point, index) => {
    const prev = points[(index + 3) % 4];
    const next = points[(index + 1) % 4];
    const back = unit(point, prev);
    const forward = unit(point, next);
    const start = [point[0] + back[0] * r, point[1] + back[1] * r];
    const end = [point[0] + forward[0] * r, point[1] + forward[1] * r];

    path += `${index === 0 ? "M" : "L"} ${start[0].toFixed(2)} ${start[1].toFixed(2)} `;
    path += `Q ${point[0]} ${point[1]} ${end[0].toFixed(2)} ${end[1].toFixed(2)} `;
  });

  return `${path}Z`;
}

const DIAMOND = roundedDiamond(W, H, 16);
const CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

export default function MemoryStack({ layers }) {
  const ref = useRef(null);
  const [spread, setSpread] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSpread(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSpread(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ height: H + OFFSET * (layers.length - 1) }}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          {FILLS.map((fill) => (
            <linearGradient key={fill.id} id={fill.id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={fill.from} stopOpacity={fill.fromOpacity} />
              <stop offset="100%" stopColor={fill.to} stopOpacity={fill.toOpacity} />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {layers.map((layer, index) => {
        const lineLength = 130 + index * 12;
        const mid = H / 2;

        return (
          <div
            key={layer.title}
            className="absolute inset-x-0 top-0"
            style={{
              height: H,
              zIndex: layers.length - index,
              transform: `translateY(${spread ? index * OFFSET : 0}px)`,
              transition: "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div
              className="absolute left-0 top-0"
              style={{
                width: W,
                height: H,
                clipPath: CLIP,
                WebkitClipPath: CLIP,
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              <svg width={W} height={H} className="block overflow-visible">
                <path
                  d={DIAMOND}
                  fill={`url(#${FILLS[index].id})`}
                  stroke="#9a9a9a"
                  strokeWidth="1"
                />
              </svg>
            </div>

            <span
              className="absolute h-px bg-[#444]"
              style={{ left: W, top: mid, width: lineLength }}
            />
            <span
              className="absolute h-[5px] w-[5px] rounded-full bg-[#444]"
              style={{ left: W + lineLength - 2.5, top: mid - 2.5 }}
            />
            <span
              className="absolute whitespace-nowrap text-[11px] uppercase tracking-[0.06em] text-[#444]"
              style={{ left: W + lineLength + 10, top: mid - 7 }}
            >
              {layer.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}