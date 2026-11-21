import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import base44 from "@base44/vite-plugin";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

// Every runtime dependency is bundled at startup, for the browser and the SSR worker: one first imported
// mid-session makes Vite re-bundle, and a page rendered meanwhile on the server loads a second React.
// Not listed: React itself, the TanStack Start/Router framework (its plugin bundles it) and build-time plugins.
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
// The SDK's realtime transports: not direct dependencies, but app code importing one would otherwise be a new one.
const SDK_TRANSPORTS = ["partysocket", "socket.io-client"];
const PREBUNDLE = [...Object.keys(dependencies).filter((name) => !NOT_PREBUNDLED.has(name)), ...SDK_TRANSPORTS];
// In dev the browser otherwise fetches the router as ~100 separate files after the load event, delaying hydration
// by seconds behind the preview proxy. Browser only, and every browser entry point of the router, so one copy loads
// (templates/tests/tanstack-dev-router checks it).
const BROWSER_PREBUNDLE = [
  "@tanstack/react-router", "@tanstack/react-router/ssr/client", "@tanstack/router-core", "@tanstack/router-core/isServer",
  "@tanstack/router-core/ssr/client",
  "@tanstack/router-core/scroll-restoration-script", "@tanstack/history", "@tanstack/start-fn-stubs",
  "seroval", "seroval-plugins/web", "cookie-es",
];

// `cloudflare:workers` only exists inside workerd. The production bundle aliases it here so the
// Base44 error reporter still loads on Vercel. Dev keeps the real module from the Cloudflare plugin.
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

export default defineConfig(({ command, isPreview }) => {
  // `vite dev` stays on the Workers runtime Base44 local dev and the editor use.
  // Production builds and `vite preview` write and serve Vercel's Build Output API.
  const useCloudflare = command === "serve" && !isPreview;
  const useVercel = command === "build" || isPreview;

  return {
    optimizeDeps: { include: [...PREBUNDLE, ...BROWSER_PREBUNDLE] },
    resolve: useVercel ? { alias: { "cloudflare:workers": CLOUDFLARE_WORKERS_SHIM } } : undefined,
    environments: {
      ssr: {
        optimizeDeps: { include: PREBUNDLE },
        // Source maps for the server build only, never served: they let Base44 point an error's stack at the app's own
        // files. Without the sources, so the app's code isn't copied into them. The browser build gets none.
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
      useCloudflare
        ? cloudflare({ viteEnvironment: { name: "ssr" }, inspectorPort: false })
        : cloudflareWorkersShim(),
      tanstackStart({ srcDirectory: "src" }),
      useVercel
        ? nitro({
            preset: "vercel",
            alias: { "cloudflare:workers": CLOUDFLARE_WORKERS_SHIM },
          })
        : null,
      react(),
    ].filter(Boolean),
  };
});
