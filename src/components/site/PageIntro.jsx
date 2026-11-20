import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { setIntroPlaying, shouldPlayIntro } from "@/lib/introState";

// Short, non-blocking wordmark reveal: it never locks scrolling and is gone in 1s.
export default function PageIntro() {
  const [state, setState] = useState("idle");

  useEffect(() => {
    if (!shouldPlayIntro()) {
      setState("done");
      return undefined;
    }

    setIntroPlaying(true);
    setState("playing");

    const leave = setTimeout(() => {
      setIntroPlaying(false);
      setState("leaving");
    }, 450);
    const finish = setTimeout(() => setState("done"), 1000);

    return () => {
      clearTimeout(leave);
      clearTimeout(finish);
      setIntroPlaying(false);
    };
  }, []);

  if (state === "done" || state === "idle") return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-[#f4f4f4] transition-opacity duration-500 ease-out",
        state === "leaving" && "opacity-0"
      )}
    >
      <span className="wordmark intro-word text-[clamp(3.4rem,15vw,14rem)] text-[#121212]">
        ARTISO
      </span>
    </div>
  );
}