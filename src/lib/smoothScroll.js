// Lightweight inertia scrolling: wheel input feeds a target position, and a
// rAF loop eases the window towards it with a Lenis-like lerp of 0.1.
const LERP = 0.1;

let targetY = 0;
let currentY = 0;
let rafId = null;
let enabled = false;

function maxScroll() {
  return Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
}

function clamp(value) {
  return Math.max(0, Math.min(value, maxScroll()));
}

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function frame() {
  const diff = targetY - currentY;
  if (Math.abs(diff) < 0.4) {
    currentY = targetY;
    window.scrollTo(0, currentY);
    rafId = null;
    return;
  }
  currentY += diff * LERP;
  window.scrollTo(0, currentY);
  rafId = requestAnimationFrame(frame);
}

function run() {
  if (rafId === null) rafId = requestAnimationFrame(frame);
}

export function scrollToY(y) {
  const next = clamp(y);
  if (!enabled || prefersReduced()) {
    window.scrollTo({ top: next, behavior: "smooth" });
    return;
  }
  targetY = next;
  currentY = window.scrollY;
  run();
}

export function scrollToId(id, offset = 0) {
  const el = document.getElementById(id);
  if (!el) return false;
  scrollToY(el.getBoundingClientRect().top + window.scrollY - offset);
  return true;
}

export function initSmoothScroll() {
  if (prefersReduced() || isCoarsePointer()) return () => {};

  enabled = true;
  targetY = currentY = window.scrollY;

  const onWheel = (event) => {
    if (event.ctrlKey || event.defaultPrevented) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    if (event.target instanceof Element && event.target.closest("[data-native-scroll]")) return;
    event.preventDefault();
    targetY = clamp(targetY + event.deltaY);
    run();
  };

  const sync = () => {
    if (rafId === null) {
      targetY = currentY = window.scrollY;
    }
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);

  return () => {
    enabled = false;
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("scroll", sync);
    window.removeEventListener("resize", sync);
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
  };
}