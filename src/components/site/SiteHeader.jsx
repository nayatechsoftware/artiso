import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Solutions", to: "/", hash: "platform" },
  { label: "About Us", to: "/about-us" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/", hash: "contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "border-b border-black/10 bg-[#f4f4f4]/85 backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <div className="shell flex h-[70px] items-center justify-between gap-6 md:h-[88px]">
        <Link to="/" hash="top" className="wordmark text-[clamp(1.45rem,2.3vw,2.1rem)]" aria-label="ARTISO home">
          ARTISO
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              hash={link.hash}
              className="text-[12px] uppercase tracking-[0.18em] text-black/65 transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/book-demo" className="pill hidden lg:inline-flex">
          Book Your Demo
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:bg-black hover:text-white lg:hidden"
        >
          <Menu className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-[#f4f4f4] px-5 pb-8 pt-6 transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex items-center justify-between">
          <Link to="/" hash="top" onClick={() => setOpen(false)} className="wordmark text-[1.6rem]">
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
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              hash={link.hash}
              onClick={() => setOpen(false)}
              className="border-t border-black/12 py-5 text-2xl font-light tracking-tight text-black"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/careers"
            onClick={() => setOpen(false)}
            className="border-t border-black/12 py-5 text-2xl font-light tracking-tight text-black"
          >
            Careers
          </Link>
        </nav>

        <Link to="/book-demo" onClick={() => setOpen(false)} className="pill mt-auto w-full">
          Book Your Demo
        </Link>
      </div>
    </header>
  );
}