import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function NewsCard({ item }) {
  const internal = item.href.startsWith("/");
  const cta = item.kind === "story" ? "Read the story" : item.outlet ? `Read on ${item.outlet}` : "Read";

  const content = (
    <>
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5">
        <Image
          src={item.image}
          alt=""
          className="h-full w-full transition-transform [transition-duration:600ms] ease-out group-hover:scale-105"
          fittingType="fill"
        />
      </div>
      <div className="mt-4 border-t border-black/12 pt-3">
        <h3 className="text-[15px] font-normal leading-snug tracking-tight text-black">
          <span className="link-underline inline-block">{item.title}</span>
        </h3>
        {item.summary && (
          <p className="mt-2 text-[13px] leading-relaxed text-black/50">{item.summary}</p>
        )}
        <p className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-black/35 transition-colors duration-300 group-hover:text-black/70">
          <span className="link-underline inline-block">{cta}</span>
          <ArrowRight
            className="h-3 w-3 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
            strokeWidth={1.4}
          />
        </p>
        <p className="mt-2 text-[11px] tracking-[0.02em] text-black/45">
          {item.outlet ? `${item.outlet} · ${item.date}` : item.date}
        </p>
      </div>
    </>
  );

  if (internal) {
    return (
      <Link to={item.href} className="group block">
        {content}
      </Link>
    );
  }

  return (
    <a href={item.href} target="_blank" rel="noreferrer" className="group block">
      {content}
    </a>
  );
}