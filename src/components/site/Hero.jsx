import { useRef, useState } from "react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images } from "@/data/site";

const FILM = "https://media.base44.com/videos/public/6b0044b979df404f044d4352/80a5bb630_Hero_Film.mp4";
const PORTRAIT =
  "https://media.base44.com/images/public/6b0044b979df404f044d4352/18b3a0a41_generated_020d9e5f.png";

export default function Hero() {
  const videoRef = useRef(null);
  const [sound, setSound] = useState(false);

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
    <section id="top" className="relative w-full overflow-hidden bg-[#f4f4f4]">
      <div className="relative h-[56svh] w-full overflow-hidden bg-[#e6e6e6] md:h-[62svh] lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-[58%]">
        <video
          ref={videoRef}
          poster={images.hero}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="ARTISO film: a model in a sculptural coat walking through a concrete gallery"
          className="hero-media-anim h-full w-full object-cover"
        >
          <source src={FILM} type="video/mp4" />
        </video>

        <div
          className="dot-grid pointer-events-none absolute left-0 top-0 hidden h-28 w-28 opacity-[0.16] lg:block"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        <div
          className="fade-up absolute bottom-24 right-5 h-[150px] w-[124px] overflow-hidden shadow-[0_18px_40px_rgba(18,18,18,0.28)] md:h-[210px] md:w-[176px] lg:bottom-28 lg:right-8"
          style={{ animationDelay: "420ms" }}
        >
          <Image
            src={PORTRAIT}
            alt="ARTISO editorial portrait of a model in a black turtleneck and structured coat"
            className="h-full w-full"
            fittingType="fill"
          />
        </div>

        <button
          type="button"
          onClick={toggleSound}
          aria-label={sound ? "Mute the ARTISO film" : "Unmute the ARTISO film"}
          aria-pressed={sound}
          className="pill pill-light absolute bottom-5 left-4 gap-2 px-4 py-2.5 text-[10px] md:bottom-6 md:left-6"
        >
          {sound ? <Volume2 className="h-3.5 w-3.5" strokeWidth={1.5} /> : <VolumeX className="h-3.5 w-3.5" strokeWidth={1.5} />}
          {sound ? "Sound on" : "Sound off"}
        </button>

        <a
          href="#teams"
          aria-label="Scroll to the next section"
          className="absolute bottom-5 right-4 flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.28em] text-white/80 md:bottom-6 md:right-6"
        >
          Scroll
          <span className="cue-line block h-8 w-px origin-top bg-white/70" />
        </a>
      </div>

      <div className="relative z-10 flex flex-col justify-end px-5 pb-16 pt-12 md:px-8 md:pb-20 lg:ml-[58%] lg:min-h-[100svh] lg:px-12 lg:pb-16 lg:pt-40 xl:px-16">
        <div className="lg:ml-auto lg:max-w-[34rem] lg:text-right">
          <p className="fade-up eyebrow" style={{ animationDelay: "80ms" }}>
            Agentic Operating System for Fashion Creatives
          </p>
          <h1
            className="fade-up mt-5 text-[clamp(2.5rem,4.6vw,4.4rem)] font-light leading-[0.98] tracking-[-0.035em] text-[#121212]"
            style={{ animationDelay: "160ms" }}
          >
            Shaping the Future of Fashion
          </h1>
          <p
            className="fade-up mt-6 max-w-md text-[17px] leading-relaxed text-black/60 lg:ml-auto"
            style={{ animationDelay: "260ms" }}
          >
            The AI Operating System that connects the way fashion teams think, create and bring
            ideas to life.
          </p>
          <div
            className="fade-up mt-9 flex flex-wrap items-center gap-4 lg:justify-end"
            style={{ animationDelay: "360ms" }}
          >
            <a href="#contact" className="pill">
              Book Your Demo
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
            </a>
            <a
              href="#solutions"
              className="text-[11px] uppercase tracking-[0.18em] text-black/50 underline decoration-black/20 underline-offset-4 transition-colors hover:text-black hover:decoration-black"
            >
              Explore the platform
            </a>
          </div>
        </div>
      </div>

      <span className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.32em] text-black/35 xl:block">
        Visual content AI-generated with ARTISO
      </span>
    </section>
  );
}