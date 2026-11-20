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
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      if (W < 40 || H < 40) return false;

      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      scene.width = canvas.width;
      scene.height = canvas.height;
      travel = Math.max(1, wrap.offsetTop + H * 0.85);

      const rnd = seeded(4177);
      const cx = W * 0.4;
      const cy = H * 0.42;
      const cw = W * 0.22;
      const ch = cw * (1426 / 1600);
      centre = { x: cx - cw / 2, y: cy - ch / 2, w: cw, h: ch, p: 0 };

      const count = Math.max(80, Math.round((W * H) / 3600));
      const rx = Math.max(cx, W - cx);
      const ry = Math.max(cy, H - cy);
      const golden = Math.PI * (3 - Math.sqrt(5));
      const sizeScale = Math.max(0.62, Math.min(1, W / 900));

      tiles = [];
      for (let i = 0; i < count; i += 1) {
        const t = Math.sqrt((i + 0.6) / count);
        const a = i * golden + 0.7;
        const w = (40 + rnd() * 50) * sizeScale;
        const h = w * 1.34;
        const x = cx + Math.cos(a) * rx * t - w / 2 + (rnd() - 0.5) * 26;
        const y = cy + Math.sin(a) * ry * t - h / 2 + (rnd() - 0.5) * 26;
        if (x + w < -70 || x > W + 70 || y + h < -90 || y > H + 90) continue;

        const cropW = 180 + rnd() * 420;
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
          paper: rnd() < 0.12,
          caption: CAPTIONS[i % CAPTIONS.length],
          delay: 40 + t * 560 + rnd() * 90,
          p: 0,
          scale: 1,
        });
      }
      return true;
    };

    const tileArt = (g, tile, w, h) => {
      if (tile.paper) {
        g.fillStyle = "#eceae6";
        g.fillRect(0, 0, w, h);
        const inset = w * 0.09;
        g.drawImage(img, tile.sx, tile.sy, tile.sw, tile.sh, inset, inset, w - inset * 2, h - inset * 2);
      } else {
        g.drawImage(img, tile.sx, tile.sy, tile.sw, tile.sh, 0, 0, w, h);
      }
    };

    const paint = (tile, now) => {
      const p = clamp01((now - start - tile.delay) / 340);
      tile.p = p;
      const tx = tile.x + tile.w / 2;
      const ty = tile.y + tile.h / 2;

      sctx.save();
      sctx.translate(tx, ty);
      sctx.scale(tile.scale, tile.scale);
      sctx.translate(-tx, -ty);

      sctx.fillStyle = "rgba(244,244,244,0.96)";
      sctx.fillRect(tile.x - 1, tile.y - 1, tile.w + 2, tile.h + 2);

      if (p >= 1) {
        sctx.save();
        sctx.translate(tile.x, tile.y);
        tileArt(sctx, tile, tile.w, tile.h);
        sctx.restore();
      } else {
        const tw = Math.max(1, Math.round(tile.w));
        const th = Math.max(1, Math.round(tile.h));
        bctx.setTransform(1, 0, 0, 1, 0, 0);
        bctx.clearRect(0, 0, buf.width, buf.height);
        tileArt(bctx, tile, tw, th);
        bctx.globalCompositeOperation = "destination-in";
        bctx.fillStyle = dots[Math.round(p * 8)];
        bctx.fillRect(0, 0, tw, th);
        bctx.globalCompositeOperation = "source-over";
        sctx.drawImage(buf, 0, 0, tw, th, tile.x, tile.y, tw, th);
      }
      sctx.restore();
    };

    const drawScene = (now) => {
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.clearRect(0, 0, W, H);

      const cp = clamp01((now - start - 40) / 720);
      centre.p = cp;
      sctx.globalAlpha = 0.45 + cp * 0.55;
      sctx.fillStyle = "rgba(244,244,244,0.96)";
      sctx.fillRect(centre.x - 1, centre.y - 1, centre.w + 2, centre.h + 2);
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
      const elapsed = now - start;

      let moving = elapsed < 2400;

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

      if (moving || dirty) {
        dirty = false;
        raf = requestAnimationFrame(frame);
      }

      drawScene(now);
      composite();
      canvas.style.transform = `translate3d(0, ${Math.round(scrollY * 0.12)}px, 0)`;
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

    let tries = 0;
    let stopped = false;
    const boot = () => {
      if (stopped) return;
      if (!build()) {
        tries += 1;
        if (tries < 30) window.setTimeout(boot, 120);
        return;
      }
      start = performance.now();
      dissolve = clamp01((window.scrollY || 0) / travel);
      canvas.classList.add("is-ready");
      dirty = true;
      frame();
    };

    img.onload = boot;
    img.src = SRC;
    if (img.complete && img.naturalWidth) boot();

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      stopped = true;
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