import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import Wordmark from "@/components/site/Wordmark";
import HeroCollage from "@/components/site/HeroCollage";

const LINKS = [
  { label: "Solutions", to: "/", hash: "platform" },
  { label: "About us", to: "/about-us" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/", hash: "contact" },
];

const PIN_TOP = 72;

export default function Hero() {
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const cueRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const nav = navRef.current;
    if (!hero || !nav) return undefined;

    const supportsScrollTimeline =
      typeof CSS !== "undefined" && CSS.supports && CSS.supports("animation-timeline: scroll()");

    let frame = null;
    const update = () => {
      frame = null;
      const heroRect = hero.getBoundingClientRect();
      const pinned = nav.hasAttribute("data-pinned");

      if (!pinned) {
        nav.style.setProperty("--pin-left", `${Math.round(nav.getBoundingClientRect().left)}px`);
      }

      const stage = nav.parentElement;
      const navTopInHero =
        stage.getBoundingClientRect().top - heroRect.top + nav.offsetTop;

      if (window.innerWidth >= 1024) {
        if (heroRect.top + navTopInHero < PIN_TOP) nav.setAttribute("data-pinned", "");
        else nav.removeAttribute("data-pinned");

        if (heroRect.bottom < window.innerHeight * 0.25) nav.setAttribute("data-away", "");
        else nav.removeAttribute("data-away");
      } else {
        nav.removeAttribute("data-pinned");
        nav.removeAttribute("data-away");
      }

      const cue = cueRef.current;
      if (cue && !supportsScrollTimeline) {
        const fade = Math.max(0, 1 - window.scrollY / 80);
        cue.style.opacity = String(fade);
        cue.style.visibility = fade === 0 ? "hidden" : "visible";
      }
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <Link to="/" className="hero-mark" aria-label="ARTISO">
          <Wordmark />
        </Link>

        <nav className="hero-nav" ref={navRef} aria-label="Primary">
          <ul>
            {LINKS.map((link, index) => (
              <li key={link.label} className="nav-line" style={{ "--line": index }}>
                <Link to={link.to} hash={link.hash} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/book-demo"
            className="pill nav-line hero-nav-cta"
            style={{ "--line": LINKS.length }}
          >
            Book Your Demo
          </Link>
        </nav>

        <HeroCollage />

        <div className="hero-foot">
          <div className="hero-cue" ref={cueRef}>
            <span className="cue-label">Scroll</span>
            <span className="cue-track" aria-hidden="true">
              <span className="cue-run" />
            </span>
          </div>
          <div className="hero-title">
            <h1 id="hero-title">Shaping the Future of Fashion</h1>
          </div>
        </div>
      </div>

      <span className="hero-credit">
        <span className="credit-line" aria-hidden="true" />
        <span className="credit-text">Visual content AI-generated with ARTISO</span>
      </span>
    </section>
  );
}