import { useEffect, useState } from "react";
import { isIntroPlaying, onIntroChange, shouldPlayIntro } from "@/lib/introState";

export default function useIntroGate() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    shouldPlayIntro();
    if (!isIntroPlaying()) {
      setReady(true);
      return undefined;
    }
    return onIntroChange((playing) => {
      if (!playing) setReady(true);
    });
  }, []);

  return ready;
}