import { useEffect, useState } from "react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

export default function CrossfadeImage({ src, alt, className }) {
  const [slots, setSlots] = useState({ a: src, b: null, active: "a" });

  useEffect(() => {
    setSlots((prev) => {
      const currentSrc = prev.active === "a" ? prev.a : prev.b;
      if (src === currentSrc) return prev;
      return prev.active === "a"
        ? { ...prev, b: src, active: "b" }
        : { ...prev, a: src, active: "a" };
    });
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden bg-black/5", className)}>
      {["a", "b"].map((slot) => (
        <div
          key={slot}
          className={cn(
            "absolute inset-0 transition-opacity [transition-duration:600ms] ease-out",
            slots.active === slot ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={slots.active === slot ? undefined : "true"}
        >
          {slots[slot] && (
            <Image
              key={slots[slot]}
              src={slots[slot]}
              alt={alt}
              fittingType="fill"
              className="h-full w-full animate-[imgIn_600ms_ease-out_both]"
            />
          )}
        </div>
      ))}
    </div>
  );
}