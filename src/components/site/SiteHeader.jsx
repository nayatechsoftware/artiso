import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import Wordmark from "@/components/site/Wordmark";
import { cn } from "@/lib/utils";

const links = [
  { label: "Solutions", to: "/", hash: "platform" },
  { label: "About us", to: "/about-us" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/", hash: "contact" },
];

const mobileLinks = [...links, { label: "Careers", to: "/careers" }];

export default function SiteHeader() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [visible, setVisible] = useState(!isHome);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return undefined;
    }

    const onScroll = () => {
      const hero = document.getElementById("hero");
      setVisible(hero ? hero.getBoundingClientRect().bottom <= 60 : window.scrollY > 60);
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

  return (
    <>
      {!visible && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="fixed right-5 top-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-[#f4f4f4]/70 text-black backdrop-blur-[6px] lg:hidden"
        >
          <Menu className="h-4 w-4" strokeWidth={1.5} />
        </button>
      )}

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 h-[60px] border-b border-[#e0e0e0] bg-[#f4f4f4]/90 backdrop-blur-[12px] transition-all duration-300 ease-out",
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        )}
      >
        <div className="shell grid h-full grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Link to="/" hash="hero" aria-label="ARTISO home" className="justify-self-start text-[#121212]">
            <Wordmark className="w-[104px]" />
          </Link>

          <nav className="hidden items-center gap-[clamp(28px,3.9vw,64px)] lg:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                className="nav-link px-3 text-[15px] font-normal leading-none text-[#1a1a1a]/70 transition-colors duration-200 ease-out hover:text-[#121212]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-3">
            <Link to="/book-demo" className="pill hidden !px-6 !py-3 lg:inline-flex">
              Book Your Demo
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black transition-colors duration-200 hover:bg-black hover:text-white lg:hidden"
            >
              <Menu className="h-4 w-4" strokeWidth={1.5} />
            </button>
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
          <Link to="/" hash="hero" onClick={() => setOpen(false)} aria-label="ARTISO home">
            <Wordmark className="w-[92px]" />
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
                "border-t border-black/12 py-5 text-2xl font-normal tracking-[-0.005em] text-black transition-all duration-500 ease-out",
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