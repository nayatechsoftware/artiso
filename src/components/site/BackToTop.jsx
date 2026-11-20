import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { scrollToY } from "@/lib/smoothScroll";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => scrollToY(0)}
      aria-label="Back to top"
      className={cn(
        "group fixed bottom-6 right-4 z-40 flex flex-col items-center gap-3 transition-all duration-500 ease-out md:right-6",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <span className="[writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.3em] text-black/50 transition-colors group-hover:text-black">
        Top
      </span>
      <span className="h-10 w-px bg-black/25 transition-colors group-hover:bg-black" />
    </button>
  );
}