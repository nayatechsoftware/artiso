import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import Wordmark from "@/components/site/Wordmark";
import HeroCollage from "@/components/site/HeroCollage";

const LINKS = [
  { label: "Solutions", to: "/", hash: "platform" },
  { label: "About Us", to: "/about-us" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/", hash: "contact" },
];

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

      if (window.scrollY > window.innerHeight * 0.35) nav.setAttribute("data-away", "");
      else nav.removeAttribute("data-away");

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

        <span className="hero-credit">
          <span className="credit-text">Visual content AI-generated with</span>
          <Wordmark className="credit-mark" />
        </span>
      </div>

      <div className="hero-copy">
        <p className="hero-lead">
          The AI Operating System that connects the way fashion teams think, create and bring
          ideas to life
        </p>
        <Link to="/book-demo" className="pill">
          Book Your Demo
        </Link>
      </div>
    </section>
  );
}