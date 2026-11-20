// Decides once per session whether the load intro plays, and lets the hero
// wait for it before its own entrance animations start.
let decided = false;
let playing = false;
const listeners = new Set();

export function shouldPlayIntro() {
  if (!decided) {
    decided = true;
    try {
      playing = sessionStorage.getItem("artiso:intro") !== "1";
    } catch {
      playing = true;
    }
    if (playing) {
      try {
        sessionStorage.setItem("artiso:intro", "1");
      } catch {
        // storage blocked: the intro simply replays
      }
    }
  }
  return playing;
}

export function isIntroPlaying() {
  return playing;
}

export function setIntroPlaying(value) {
  playing = value;
  listeners.forEach((listener) => listener(value));
}

export function onIntroChange(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}