import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const POSTER =
  "https://cdn.sanity.io/images/mvgv7zsh/production/15ab0bfe2680cefd0c16ced905cb7511e9b051c1-2560x1440.jpg";
const FILM =
  "https://www.artiso.ai/media/film/artiso-film.1080p.h264.68dd7c5b69.mp4";

export default function FilmSection() {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section id="video" className="film">
      <div className="film-frame" ref={frameRef}>
        <img className="film-poster" src={POSTER} alt="" aria-hidden="true" />
        <video
          ref={videoRef}
          className={ready ? "film-video is-ready" : "film-video"}
          src={FILM}
          poster={POSTER}
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div className="film-controls">
          <button
            type="button"
            className="film-ctl film-play"
            onClick={togglePlay}
            aria-label={playing ? "Pause film" : "Play film"}
          >
            {playing ? <Pause strokeWidth={1.5} /> : <Play strokeWidth={1.5} />}
          </button>
          <button
            type="button"
            className="film-ctl film-sound"
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
          >
            {muted ? <VolumeX strokeWidth={1.5} /> : <Volume2 strokeWidth={1.5} />}
            <span className="film-sound-label">Sound {muted ? "off" : "on"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}