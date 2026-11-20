import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "artiso:consent";
const OPEN_EVENT = "artiso:open-cookie-settings";

function readChoice() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function sendConsent(choice) {
  window.dataLayer = window.dataLayer || [];
  const gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };
  gtag("consent", "update", {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: choice.ads ? "granted" : "denied",
    ad_user_data: choice.ads ? "granted" : "denied",
    ad_personalization: choice.ads ? "granted" : "denied",
  });
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [ads, setAds] = useState(true);

  useEffect(() => {
    const saved = readChoice();
    if (saved) {
      sendConsent(saved);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reopen = () => {
      const saved = readChoice();
      setAnalytics(saved ? Boolean(saved.analytics) : true);
      setAds(saved ? Boolean(saved.ads) : true);
      setSettings(true);
      setLeaving(false);
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const save = (choice) => {
    const value = { ...choice, timestamp: Date.now() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // storage blocked: the choice still applies for this page view
    }
    sendConsent(value);
    setLeaving(true);
    setTimeout(() => {
      setVisible(false);
      setLeaving(false);
    }, 500);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className={cn(
        "fixed bottom-4 left-4 z-[9999] w-[min(420px,calc(100vw-2rem))] border border-black/10 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(18,18,18,0.45)] transition-all duration-500 ease-out",
        visible && !leaving
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      )}
    >
      <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-black">
        Cookies
      </p>
      <p className="mt-3 text-[13px] leading-relaxed text-black/60">
        We use cookies to understand how the site is used and to improve it. You can accept all,
        decline the optional ones, or choose below.
      </p>

      {settings && (
        <div className="mt-4 space-y-2 border-y border-black/10 py-4">
          <label className="flex items-center justify-between gap-4 text-[13px] text-black/70">
            <span>Analytics</span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
              className="h-4 w-4 accent-black"
            />
          </label>
          <label className="flex items-center justify-between gap-4 text-[13px] text-black/70">
            <span>Advertising</span>
            <input
              type="checkbox"
              checked={ads}
              onChange={(event) => setAds(event.target.checked)}
              className="h-4 w-4 accent-black"
            />
          </label>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => save({ analytics: false, ads: false })}
          className="rounded-full border border-black/25 px-5 py-2.5 text-[10px] uppercase tracking-[0.16em] text-black transition-colors hover:border-black hover:bg-black hover:text-white"
        >
          Decline all
        </button>
        <button
          type="button"
          onClick={() => save({ analytics: true, ads: true })}
          className="rounded-full bg-[#121212] px-5 py-2.5 text-[10px] uppercase tracking-[0.16em] text-white transition-colors hover:bg-black/80"
        >
          Accept all
        </button>
        {settings ? (
          <button
            type="button"
            onClick={() => save({ analytics, ads })}
            className="text-[11px] text-black/60 underline underline-offset-4 transition-colors hover:text-black"
          >
            Save preferences
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setSettings(true)}
            className="text-[11px] text-black/60 underline underline-offset-4 transition-colors hover:text-black"
          >
            Settings
          </button>
        )}
      </div>
    </div>
  );
}