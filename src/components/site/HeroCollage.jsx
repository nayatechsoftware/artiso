import { useEffect, useRef } from "react";

const SRC =
  "https://cdn.sanity.io/images/mvgv7zsh/production/fb281f262d693f604c121d8a0962208c69803752-1600x1426.webp?w=2400&fit=max&auto=format";

const CAPTIONS = [
  "Pleated sheer dress",
  "Charcoal coat avenue",
  "Wool turtleneck",
  "Leather bag",
  "Bias-cut slip",
  "Raw denim study",
];

const seeded = (seed) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function HeroCollage() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const captionRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const scene = document.createElement("canvas");
    const sctx = scene.getContext("2d");
    const px = document.createElement("canvas");
    const pctx = px.getContext("2d");
    const buf = document.createElement("canvas");
    const bctx = buf.getContext("2d");
    buf.width = 200;
    buf.height = 260;

    // dot masks that grow from nothing to a solid fill (halftone reveal)
    const dots = Array.from({ length: 9 }, (_, i) => {
      const c = document.createElement("canvas");
      c.width = 6;
      c.height = 6;
      const g = c.getContext("2d");
      g.fillStyle = "#fff";
      g.beginPath();
      g.arc(3, 3, 4.5 * (i / 8), 0, Math.PI * 2);
      g.fill();
      return bctx.createPattern(c, "repeat");
    });

    const img = new Image();
    let W = 0;
    let H = 0;
    let travel = 1;
    let tiles = [];
    let centre = { x: 0, y: 0, w: 0, h: 0, p: 0 };
    let hovered = null;
    let dissolve = 0;
    let start = 0;
    let raf = null;
    let dirty = true;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      scene.width = canvas.width;
      scene.height = canvas.height;
      travel = Math.max(1, wrap.offsetTop + H * 0.85);

      const rnd = seeded(7331);
      const cell = Math.max(48, W / 8);
      const cols = Math.ceil(W / cell) + 1;
      const rows = Math.ceil(H / cell) + 1;
      const cx = W * 0.5;
      const cy = H * 0.52;
      const cw = W * 0.68;
      const ch = cw * (1426 / 1600);
      centre = { x: cx - cw / 2, y: cy - ch / 2, w: cw, h: ch, p: 0 };

      tiles = [];
      let n = 0;
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const x = c * cell + (rnd() - 0.5) * cell * 0.65;
          const y = r * cell + (rnd() - 0.5) * cell * 0.65;
          const w = 40 + rnd() * 50;
          const h = w * 1.34;
          const overCentre =
            x + w > centre.x &&
            x < centre.x + centre.w &&
            y + h > centre.y &&
            y < centre.y + centre.h;
          if (overCentre && rnd() < 0.8) continue;
          const cropW = 180 + rnd() * 380;
          const cropH = cropW * 1.34;
          tiles.push({
            x,
            y,
            w,
            h,
            sx: rnd() * Math.max(1, 1600 - cropW),
            sy: rnd() * Math.max(1, 1426 - cropH),
            sw: Math.min(cropW, 1600),
            sh: Math.min(cropH, 1426),
            caption: CAPTIONS[n % CAPTIONS.length],
            delay: 60 + (Math.hypot(x - cx, y - cy) / Math.max(W, H)) * 520 + rnd() * 90,
            p: 0,
            scale: 1,
          });
          n += 1;
        }
      }
    };

    const paint = (tile, now) => {
      const p = clamp01((now - start - tile.delay) / 520);
      tile.p = p;
      const cx = tile.x + tile.w / 2;
      const cy = tile.y + tile.h / 2;
      sctx.save();
      sctx.translate(cx, cy);
      sctx.scale(tile.scale, tile.scale);
      sctx.translate(-cx, -cy);

      if (p >= 1) {
        sctx.drawImage(img, tile.sx, tile.sy, tile.sw, tile.sh, tile.x, tile.y, tile.w, tile.h);
      } else {
        const tw = Math.max(1, Math.ceil(tile.w));
        const th = Math.max(1, Math.ceil(tile.h));
        bctx.setTransform(1, 0, 0, 1, 0, 0);
        bctx.clearRect(0, 0, buf.width, buf.height);
        bctx.drawImage(img, tile.sx, tile.sy, tile.sw, tile.sh, 0, 0, tw, th);
        bctx.globalCompositeOperation = "destination-in";
        bctx.fillStyle = dots[Math.round(p * 8)];
        bctx.fillRect(0, 0, tw, th);
        bctx.globalCompositeOperation = "source-over";
        sctx.drawImage(buf, 0, 0, tw, th, tile.x, tile.y, tile.w, tile.h);
      }
      sctx.restore();
    };

    const drawScene = (now) => {
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.clearRect(0, 0, W, H);

      const cp = clamp01((now - start - 40) / 720);
      centre.p = cp;
      sctx.globalAlpha = 0.5 + cp * 0.5;
      sctx.drawImage(img, centre.x, centre.y, centre.w, centre.h);
      sctx.globalAlpha = 1;

      tiles.forEach((tile) => {
        if (tile !== hovered) paint(tile, now);
      });
      if (hovered) paint(hovered, now);
    };

    const composite = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (dissolve < 0.02) {
        ctx.drawImage(scene, 0, 0);
        return;
      }

      const block = 6 + dissolve * 26;
      const pw = Math.max(2, Math.round(W / block));
      const ph = Math.max(2, Math.round(H / block));
      if (px.width !== pw) px.width = pw;
      if (px.height !== ph) px.height = ph;
      pctx.clearRect(0, 0, pw, ph);
      pctx.drawImage(scene, 0, 0, pw, ph);

      ctx.imageSmoothingEnabled = false;
      ctx.filter = "grayscale(1) contrast(1.2)";
      ctx.globalAlpha = clamp01(1 - dissolve * 1.1);
      ctx.drawImage(px, 0, 0, canvas.width, canvas.height);
      ctx.filter = "none";
      ctx.globalAlpha = 1;
      ctx.imageSmoothingEnabled = true;
    };

    const frame = () => {
      raf = null;
      const now = performance.now();
      let moving = false;

      tiles.forEach((tile) => {
        const target = hovered === tile ? 2.5 : 1;
        if (Math.abs(target - tile.scale) > 0.002) {
          tile.scale += (target - tile.scale) * 0.18;
          moving = true;
        } else {
          tile.scale = target;
        }
        if (tile.p < 1) moving = true;
      });
      if (centre.p < 1) moving = true;

      const scrollY = window.scrollY || 0;
      const next = clamp01(scrollY / travel);
      if (Math.abs(next - dissolve) > 0.002) moving = true;
      dissolve = next;

      drawScene(now);
      composite();
      canvas.style.transform = `translate3d(0, ${Math.round(scrollY * 0.12)}px, 0)`;

      if (moving || dirty) {
        dirty = false;
        raf = requestAnimationFrame(frame);
      }
    };

    const kick = () => {
      if (raf === null) raf = requestAnimationFrame(frame);
    };

    const hitTest = (x, y) => {
      for (let i = tiles.length - 1; i >= 0; i -= 1) {
        const t = tiles[i];
        if (x >= t.x && x <= t.x + t.w && y >= t.y && y <= t.y + t.h) return t;
      }
      return null;
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const hit = hitTest(x, y);
      hovered = hit;
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        cursor.classList.toggle("is-on", Boolean(hit));
      }
      if (hit && captionRef.current) captionRef.current.textContent = hit.caption;
      dirty = true;
      kick();
    };

    const onLeave = () => {
      hovered = null;
      if (cursorRef.current) cursorRef.current.classList.remove("is-on");
      dirty = true;
      kick();
    };

    const onScroll = () => {
      dirty = true;
      kick();
    };

    const onResize = () => {
      build();
      dirty = true;
      kick();
    };

    img.onload = () => {
      build();
      start = performance.now();
      canvas.classList.add("is-ready");
      dirty = true;
      kick();
    };
    img.src = SRC;

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      img.onload = null;
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero-collage" ref={wrapRef}>
      <canvas ref={canvasRef} role="img" aria-label="A paper collage of fashion photographs" />
      <div className="collage-cursor" ref={cursorRef} aria-hidden="true">
        <span className="collage-cross" />
        <span className="collage-caption" ref={captionRef} />
      </div>
    </div>
  );
}