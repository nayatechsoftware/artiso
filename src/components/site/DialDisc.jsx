const CX = 380;
const CY = 470;
const DISC_R = 220;
const TICKS = 60;

export default function DialDisc() {
  const ticks = [];

  for (let index = 0; index <= TICKS; index += 1) {
    const deg = 180 + (index * 180) / TICKS;
    const rad = (deg * Math.PI) / 180;
    const major = index % 5 === 0;
    const inner = DISC_R + 12;
    const outer = inner + (major ? 24 : 14);

    ticks.push({
      key: index,
      major,
      x1: CX + inner * Math.cos(rad),
      y1: CY + inner * Math.sin(rad),
      x2: CX + outer * Math.cos(rad),
      y2: CY + outer * Math.sin(rad),
    });
  }

  return (
    <svg
      viewBox="0 0 760 520"
      width="760"
      height="520"
      className="absolute inset-0"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="dial-disc" cx="50%" cy="100%" r="100%">
          <stop offset="0%" stopColor="#e8ecef" />
          <stop offset="100%" stopColor="#dfe5ea" />
        </radialGradient>
        <filter id="dial-feather" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <path
        d={`M ${CX - DISC_R} ${CY} A ${DISC_R} ${DISC_R} 0 0 1 ${CX + DISC_R} ${CY} Z`}
        fill="url(#dial-disc)"
        filter="url(#dial-feather)"
      />

      {ticks.map((tick) => (
        <line
          key={tick.key}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke={tick.major ? "#222222" : "rgba(34,34,34,0.28)"}
          strokeWidth="1.5"
        />
      ))}

      <line
        x1={CX}
        y1={CY - DISC_R - 8}
        x2={CX}
        y2={CY - DISC_R - 48}
        stroke="#222222"
        strokeWidth="1.5"
      />
    </svg>
  );
}