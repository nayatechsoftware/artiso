// Stand-in for the `cloudflare:workers` module during the Vercel production build.
// `vite dev` does not load this file: the Cloudflare plugin provides the real module.
// Pages still render the same way. `env` is process.env so error scrubbing can see
// secrets, and `waitUntil` keeps post-response work scheduled when the host provides it.

export const env = globalThis.process?.env ?? {};

export function waitUntil(promise) {
  const pending = Promise.resolve(promise);
  const schedule = globalThis.waitUntil;
  if (typeof schedule === "function") {
    schedule(pending);
    return;
  }
  pending.catch(() => {});
}
