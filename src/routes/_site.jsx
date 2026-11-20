import { useEffect } from "react";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageIntro from "@/components/site/PageIntro";
import CookieBanner from "@/components/site/CookieBanner";
import BackToTop from "@/components/site/BackToTop";
import { scrollToId } from "@/lib/smoothScroll";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace(/^#/, "");
    const frame = requestAnimationFrame(() => scrollToId(id, 84));
    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const onClick = (event) => {
      const anchor =
        event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (!anchor) return;
      const id = anchor.getAttribute("href").slice(1);
      if (id && scrollToId(id, 84)) event.preventDefault();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#121212]">
      <SiteHeader />
      <main>
        <div key={location.pathname} className="route-fade">
          <Outlet />
        </div>
      </main>
      <SiteFooter />
      <BackToTop />
      <CookieBanner />
      <PageIntro />
    </div>
  );
}