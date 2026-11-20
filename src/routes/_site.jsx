import { useEffect } from "react";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const target = document.getElementById(location.hash);
    if (!target) return;
    const frame = requestAnimationFrame(() =>
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    );
    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#121212]">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}