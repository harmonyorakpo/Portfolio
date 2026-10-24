import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lenis from "lenis";
import { AppContext, type AppContextValue } from "./context";
import { cn } from "../lib/cn";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";
import { startTelemetry } from "../lib/telemetry";

export default function AppProviders({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [ready, setReady] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [routeLabel, setRouteLabel] = useState("");
  const curtainRef = useRef<HTMLDivElement>(null);
  const curtainLabelRef = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);

  useEffect(() => {
    startTelemetry();
    if (prefersReducedMotion()) return;

    const instance = new Lenis({ autoRaf: false, duration: 1.15, smoothWheel: true });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (!ready || paletteOpen) lenis.stop();
    else lenis.start();
  }, [lenis, ready, paletteOpen]);

  useEffect(() => {
    if (location.hash) return;
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname, location.hash, lenis]);

  // Announce route changes to assistive tech and move focus to the main landmark,
  // since an SPA navigation doesn't reload the document the way browsers normally cue.
  // Skip the first paint so we don't steal focus or interrupt the preloader on load.
  const firstRoute = useRef(true);
  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    const id = requestAnimationFrame(() => {
      setRouteLabel(document.title);
      document.getElementById("main")?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target?.closest("input, textarea, [contenteditable='true']");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollTo = useCallback<AppContextValue["scrollTo"]>(
    (target, opts = {}) => {
      const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
      if (el == null) return;
      const top = typeof el === "number" ? el : el.getBoundingClientRect().top + window.scrollY + (opts.offset ?? 0);
      if (lenis) {
        // Route changes swap the page height; without resize Lenis clamps to the previous page's limit.
        lenis.resize();
        lenis.scrollTo(top, {
          immediate: opts.immediate,
          duration: 1.6,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          force: true,
        });
      } else {
        window.scrollTo({ top, behavior: opts.immediate || prefersReducedMotion() ? "auto" : "smooth" });
      }
    },
    [lenis],
  );

  const go = useCallback<AppContextValue["go"]>(
    (to, label = "") => {
      const url = new URL(to, window.location.origin);
      if (url.pathname === location.pathname) {
        if (url.hash) scrollTo(url.hash);
        else scrollTo(0);
        return;
      }
      const curtain = curtainRef.current;
      if (busy.current) return;
      if (!curtain || prefersReducedMotion()) {
        navigate(to);
        return;
      }
      busy.current = true;
      if (curtainLabelRef.current) curtainLabelRef.current.textContent = label;
      gsap
        .timeline({ onComplete: () => void (busy.current = false) })
        .set(curtain, { display: "flex", clipPath: "inset(100% 0% 0% 0%)" })
        .to(curtain, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "expo.inOut" })
        .from(curtain.children, { yPercent: 40, opacity: 0, duration: 0.6, stagger: 0.06 }, "-=0.35")
        .add(() => navigate(to))
        .to(curtain, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.85, ease: "expo.inOut" }, "+=0.2")
        .set(curtain, { display: "none" });
    },
    [location.pathname, navigate, scrollTo],
  );

  const notify = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
    setToastVisible(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToastVisible(false), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  const value = useMemo<AppContextValue>(
    () => ({ ready, setReady, lenis, scrollTo, go, paletteOpen, setPaletteOpen, notify }),
    [ready, lenis, scrollTo, go, paletteOpen, notify],
  );

  return (
    <AppContext.Provider value={value}>
      {children}

      <div aria-live="polite" role="status" className="sr-only">
        {routeLabel}
      </div>

      <div
        ref={curtainRef}
        aria-hidden="true"
        className="fixed inset-0 z-105 hidden flex-col items-center justify-center gap-4 bg-signal text-ink"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Loading</span>
        <span ref={curtainLabelRef} className="serif-italic px-6 text-center text-[clamp(2.5rem,7vw,6rem)] leading-none" />
      </div>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-96 flex justify-center">
        <div
          className={cn(
            "flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-mono text-xs text-paper shadow-2xl ring-1 ring-white/10 transition-[opacity,translate,scale] duration-500 ease-out-expo",
            toastVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0",
          )}
        >
          <span className="size-1.5 rounded-full bg-signal" />
          {toast?.message}
        </div>
      </div>
    </AppContext.Provider>
  );
}
