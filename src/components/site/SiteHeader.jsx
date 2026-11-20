import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Solutions", to: "/", hash: "platform" },
  { label: "About Us", to: "/about-us" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/", hash: "contact" },
];

const mobileLinks = [...links, { label: "Careers", to: "/careers" }];

export default function SiteHeader() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = isHome ? Math.max(window.innerHeight * 0.5, 120) : 20;
      setCompact(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const expanded = isHome && !compact;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        {/* Expanded lockup: large serif wordmark, stacked nav and frosted pill */}
        <div
          className={cn(
            "shell origin-top-left transition-all duration-500 ease-out",
            expanded ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
          )}
          aria-hidden={!expanded}
        >
          <div className="relative pt-6 md:pt-8">
            <Link to="/" hash="top" aria-label="ARTISO home" className="wordmark block text-[clamp(2.9rem,8.4vw,6.4rem)]">
              ARTISO
            </Link>

            <nav className="mt-7 hidden flex-col gap-3 lg:flex">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  hash={link.hash}
                  className="link-underline w-fit text-[11px] uppercase tracking-[0.24em] text-black/60 transition-colors duration-300 hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link to="/book-demo" className="pill pill-frost mt-7 hidden w-fit lg:inline-flex">
              Book Your Demo
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="absolute right-0 top-7 flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-black transition-colors duration-300 hover:bg-black hover:text-white lg:hidden"
            >
              <Menu className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Compact bar it shrinks into */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 border-b transition-all duration-500 ease-out",
            expanded
              ? "pointer-events-none -translate-y-2 border-transparent bg-transparent opacity-0"
              : "pointer-events-auto translate-y-0 border-black/10 bg-[#f4f4f4]/90 opacity-100 backdrop-blur-md"
          )}
        >
          <div className="shell grid h-[64px] grid-cols-[1fr_auto_1fr] items-center gap-4 md:h-[72px]">
            <Link
              to="/"
              hash="top"
              aria-label="ARTISO home"
              className="wordmark justify-self-start text-[1.35rem] md:text-[1.55rem]"
            >
              ARTISO
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  hash={link.hash}
                  className="link-underline text-[11px] uppercase tracking-[0.2em] text-black/65 transition-colors duration-300 hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-self-end gap-3">
              <Link to="/book-demo" className="pill hidden !px-6 !py-3 !text-[10px] lg:inline-flex">
                Book Your Demo
              </Link>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black transition-colors duration-300 hover:bg-black hover:text-white lg:hidden"
              >
                <Menu className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[70] flex flex-col bg-[#f4f4f4] px-5 pb-8 pt-6 transition-opacity [transition-duration:400ms] ease-out lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            hash="top"
            onClick={() => setOpen(false)}
            className="wordmark text-[1.6rem]"
          >
            ARTISO
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="mt-14 flex flex-col">
          {mobileLinks.map((link, index) => (
            <Link
              key={link.label}
              to={link.to}
              hash={link.hash}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + index * 80}ms` : "0ms" }}
              className={cn(
                "border-t border-black/12 py-5 text-2xl font-light tracking-tight text-black transition-all duration-500 ease-out",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/book-demo" onClick={() => setOpen(false)} className="pill mt-auto w-full">
          Book Your Demo
        </Link>
      </div>
    </>
  );
}