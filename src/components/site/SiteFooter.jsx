import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Solutions", to: "/", hash: "platform" },
  { label: "About Us", to: "/about-us" },
  { label: "News", to: "/news" },
  { label: "Careers", to: "/careers" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/artiso-ai", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/artiso.ai", Icon: Instagram },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Cookie Policy", to: "/cookie-policy" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#f4f4f4]">
      <div className="shell pt-16 md:pt-24">
        <div className="flex flex-col gap-10 border-b border-black/12 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">General enquiries</p>
            <a
              href="mailto:hello@artiso.ai"
              className="mt-3 inline-block text-[clamp(1.4rem,3vw,2.4rem)] font-light tracking-tight text-black underline decoration-black/15 underline-offset-[6px] transition-colors hover:decoration-black"
            >
              hello@artiso.ai
            </a>
          </div>
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                className="text-[12px] uppercase tracking-[0.18em] text-black/60 transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black/70 transition-colors hover:border-black hover:bg-black hover:text-white"
              >
                <Icon className="h-4 w-4" strokeWidth={1.4} />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs text-black/45">
            {legalLinks.map((link) => (
              <Link key={link.label} to={link.to} className="transition-colors hover:text-black">
                {link.label}
              </Link>
            ))}
            <span>© {new Date().getFullYear()} ARTISO. All rights reserved.</span>
          </div>
        </div>

        <div className="overflow-hidden pb-4 pt-8">
          <span className="wordmark block w-full text-[clamp(2.6rem,12.4vw,11.5rem)] leading-[1.18] text-black">
            ARTISO
          </span>
        </div>
      </div>
    </footer>
  );
}