import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import base44 from "@base44/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

// Vercel-only config. `npm run build` and `vite dev` keep using vite.config.js, which is the
// Cloudflare setup Base44's platform build expects. This file is selected by `npm run build:vercel`.

const NOT_PREBUNDLED = new Set([
  "react",
  "react-dom",
  "@base44/vite-plugin",
  "@tanstack/react-start",
  "@tanstack/react-router",
  "@tanstack/react-router-ssr-query",
  "tailwindcss-animate",
  "nitro",
]);
const { dependencies } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const SDK_TRANSPORTS = ["partysocket", "socket.io-client"];
const PREBUNDLE = [...Object.keys(dependencies).filter((name) => !NOT_PREBUNDLED.has(name)), ...SDK_TRANSPORTS];
const BROWSER_PREBUNDLE = [
  "@tanstack/react-router", "@tanstack/react-router/ssr/client", "@tanstack/router-core", "@tanstack/router-core/isServer",
  "@tanstack/router-core/ssr/client",
  "@tanstack/router-core/scroll-restoration-script", "@tanstack/history", "@tanstack/start-fn-stubs",
  "seroval", "seroval-plugins/web", "cookie-es",
];

// `cloudflare:workers` only exists inside workerd. Alias it here so the Base44 error reporter
// still loads on Vercel. The default Cloudflare build does not use this file.
const CLOUDFLARE_WORKERS_SHIM = fileURLToPath(new URL("./vite/cloudflare-workers-shim.js", import.meta.url));

function cloudflareWorkersShim() {
  return {
    name: "cloudflare-workers-shim",
    enforce: "pre",
    resolveId(id) {
      if (id === "cloudflare:workers") return CLOUDFLARE_WORKERS_SHIM;
    },
  };
}

export default defineConfig({
  optimizeDeps: { include: [...PREBUNDLE, ...BROWSER_PREBUNDLE] },
  resolve: { alias: { "cloudflare:workers": CLOUDFLARE_WORKERS_SHIM } },
  environments: {
    ssr: {
      optimizeDeps: { include: PREBUNDLE },
      build: { sourcemap: true, rolldownOptions: { output: { sourcemapExcludeSources: true } } },
    },
  },
  plugins: [
    base44({
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true,
    }),
    cloudflareWorkersShim(),
    tanstackStart({ srcDirectory: "src" }),
    nitro({
      preset: "vercel",
      alias: { "cloudflare:workers": CLOUDFLARE_WORKERS_SHIM },
    }),
    react(),
  ],
});
