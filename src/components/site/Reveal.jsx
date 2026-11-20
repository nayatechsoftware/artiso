import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function Reveal({ children, className, delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reveal = () => setShown(true);

    // Never leave content hidden if the observer is unavailable or throws.
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return undefined;
    }

    let observer;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
    } catch {
      reveal();
      return undefined;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) reveal();

    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", shown && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}