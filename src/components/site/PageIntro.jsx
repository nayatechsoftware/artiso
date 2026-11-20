import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { setIntroPlaying, shouldPlayIntro } from "@/lib/introState";

export default function PageIntro() {
  const [state, setState] = useState("idle");

  useEffect(() => {
    if (!shouldPlayIntro()) {
      setState("done");
      return undefined;
    }

    setIntroPlaying(true);
    setState("playing");
    document.body.style.overflow = "hidden";

    const leave = setTimeout(() => {
      setIntroPlaying(false);
      setState("leaving");
    }, 1500);
    const finish = setTimeout(() => {
      setState("done");
      document.body.style.overflow = "";
    }, 2200);

    return () => {
      clearTimeout(leave);
      clearTimeout(finish);
      document.body.style.overflow = "";
    };
  }, []);

  if (state === "done" || state === "idle") return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[90] flex items-center justify-center bg-[#f4f4f4] transition-opacity duration-700 ease-out",
        state === "leaving" && "pointer-events-none opacity-0"
      )}
    >
      <span className="wordmark intro-word text-[clamp(3.4rem,15vw,14rem)] text-[#121212]">
        ARTISO
      </span>
    </div>
  );
}