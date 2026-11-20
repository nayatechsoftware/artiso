// Native smooth scrolling only — no wheel hijacking, no inertia.
export function scrollToY(y) {
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

export function scrollToId(id, offset = 0) {
  const el = document.getElementById(id);
  if (!el) return false;
  scrollToY(el.getBoundingClientRect().top + window.scrollY - offset);
  return true;
}