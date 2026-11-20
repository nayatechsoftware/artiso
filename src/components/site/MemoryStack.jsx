import { cn } from "@/lib/utils";

const COOL =
  "linear-gradient(135deg, rgba(209,223,236,0.92) 0%, rgba(170,193,215,0.74) 52%, rgba(131,160,190,0.62) 100%)";
const WARM =
  "linear-gradient(135deg, rgba(236,225,210,0.94) 0%, rgba(216,199,176,0.8) 52%, rgba(194,172,146,0.66) 100%)";

export default function MemoryStack({ layers, active, onSelect, progress }) {
  const gap = 26 + progress * 86;
  const last = layers.length - 1;

  return (
    <div
      className="relative mx-auto w-full max-w-[520px]"
      style={{
        "--d": "clamp(150px, 38vw, 230px)",
        "--g": `${gap}px`,
        height: "calc(var(--d) * 0.792 + var(--g) * 3)",
      }}
    >
      {layers.map((layer, index) => {
        const isActive = active === index;
        return (
          <div
            key={layer.title}
            className="absolute inset-x-0"
            style={{
              top: index === 0 ? 0 : `calc(${index} * var(--g))`,
              height: "calc(var(--d) * 0.792)",
              zIndex: last - index,
            }}
          >
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 transition-opacity duration-500"
              style={{
                width: "var(--d)",
                height: "var(--d)",
                transform: "translate(-50%, -50%) scaleY(0.56) rotate(45deg)",
                opacity: isActive ? 1 : 0.84,
              }}
            >
              <div
                className="absolute inset-0 rounded-[26%] border border-white/70 backdrop-blur-[5px]"
                style={{
                  background: index === last ? WARM : COOL,
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -22px 34px -24px rgba(255,255,255,0.6), 0 46px 72px -54px rgba(28,46,72,0.7)",
                }}
              />
              <div className="absolute inset-0 rounded-[26%] bg-gradient-to-br from-white/45 via-transparent to-black/[0.04]" />
            </div>

            <button
              type="button"
              onClick={() => onSelect(index)}
              onMouseEnter={() => onSelect(index)}
              aria-pressed={isActive}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span
                className={cn(
                  "whitespace-nowrap text-[9px] uppercase tracking-[0.26em] transition-colors duration-500 sm:text-[10px]",
                  isActive ? "text-black" : "text-black/45"
                )}
              >
                {layer.title}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}