import { useState } from "react";
import { newsFilters, newsItems } from "@/data/news";
import NewsCard from "@/components/news/NewsCard";
import { cn } from "@/lib/utils";

export default function NewsGrid() {
  const [active, setActive] = useState("all");
  const items = active === "all" ? newsItems : newsItems.filter((item) => item.kind === active);

  return (
    <div>
      <div className="no-scrollbar flex items-center gap-7 overflow-x-auto border-b border-black/12 pb-4">
        {newsFilters.map((filter) => {
          const count =
            filter.key === "all"
              ? newsItems.length
              : newsItems.filter((item) => item.kind === filter.key).length;
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActive(filter.key)}
              className={cn(
                "relative shrink-0 pb-1 text-[12px] uppercase tracking-[0.18em] transition-colors",
                active === filter.key ? "text-black" : "text-black/40 hover:text-black/70"
              )}
            >
              {filter.label}
              <span className="ml-2 text-[10px] text-black/30">{count}</span>
              <span
                className={cn(
                  "absolute inset-x-0 -bottom-[17px] h-px bg-black transition-opacity duration-300",
                  active === filter.key ? "opacity-100" : "opacity-0"
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <NewsCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}