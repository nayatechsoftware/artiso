import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import HeroCollage from "@/components/site/HeroCollage";
import useIntroGate from "@/hooks/useIntroGate";
import { scrollToId } from "@/lib/smoothScroll";
import { images } from "@/data/site";
import { cn } from "@/lib/utils";

const FILM = "https://media.base44.com/videos/public/6b0044b979df404f044d4352/80a5bb630_Hero_Film.mp4";

export default function Hero() {
  const videoRef = useRef(null);
  const [sound, setSound] = useState(false);
  const ready = useIntroGate();

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !sound;
    video.muted = !next;
    if (next) {
      video.volume = 0.7;
      video.play().catch(() => {});
    }
    setSound(next);
  };

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-[#e6e6e6]"
    >
      <video
        ref={videoRef}
        poster={images.hero}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="ARTISO film: a model in a sculptural coat walking through a concrete gallery"
        className="hero-media-anim absolute inset-0 h-full w-full object-cover"
      >
        <source src={FILM} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-black/55 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
      <div
        className="dot-grid pointer-events-none absolute left-0 top-0 hidden h-28 w-28 opacity-[0.16] lg:block"
        aria-hidden="true"
      />

      <HeroCollage />

      <span className="pointer-events-none absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 [writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.32em] text-white/55 xl:block">
        Visual content AI-generated with ARTISO
      </span>

      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-end px-5 pb-28 text-right md:px-8 md:pb-24 lg:px-12 lg:pb-20">
        <p className={cn("eyebrow text-white/70", ready ? "hero-rise" : "opacity-0")}>
          Agentic Operating System for Fashion Creatives
        </p>
        <h1
          className={cn(
            "mt-5 max-w-[16ch] text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-[0.98] tracking-[-0.035em] text-white",
            ready ? "hero-rise" : "opacity-0"
          )}
          style={{ animationDelay: "100ms" }}
        >
          Shaping the Future of Fashion
        </h1>
        <p
          className={cn(
            "mt-6 max-w-md text-[16px] leading-relaxed text-white/70",
            ready ? "hero-rise" : "opacity-0"
          )}
          style={{ animationDelay: "200ms" }}
        >
          The AI Operating System that connects the way fashion teams think, create and bring
          ideas to life.
        </p>
        <div
          className={cn(
            "mt-9 flex flex-wrap items-center justify-end gap-4",
            ready ? "hero-rise" : "opacity-0"
          )}
          style={{ animationDelay: "300ms" }}
        >
          <Link to="/book-demo" className="pill">
            Book Your Demo
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
          </Link>
          <button
            type="button"
            onClick={() => scrollToId("platform", 84)}
            className="link-underline text-[11px] uppercase tracking-[0.18em] text-white/70 transition-colors duration-300 hover:text-white"
          >
            Explore the platform
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleSound}
        aria-label={sound ? "Mute the ARTISO film" : "Unmute the ARTISO film"}
        aria-pressed={sound}
        className="pill pill-light absolute bottom-6 left-4 z-20 gap-2 !px-4 !py-2.5 !text-[10px] md:left-6"
      >
        {sound ? (
          <Volume2 className="h-3.5 w-3.5" strokeWidth={1.5} />
        ) : (
          <VolumeX className="h-3.5 w-3.5" strokeWidth={1.5} />
        )}
        {sound ? "Sound on" : "Sound off"}
      </button>

      <button
        type="button"
        onClick={() => scrollToId("teams", 84)}
        aria-label="Scroll to the next section"
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/75 md:flex"
      >
        Scroll
        <span className="cue-line block h-10 w-px origin-top bg-white/70" />
      </button>
    </section>
  );
}