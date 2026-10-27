import { useEffect, useRef, useState } from "react";
import { useApp } from "../../app/context";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { site } from "../../config/site";

const SEEN_KEY = "ho:booted";

function seenBefore() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function waitForImage(src: string) {
  return new Promise<void>((resolve) => {
    if (!src) return resolve();
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });
}

export default function Preloader() {
  const { setReady } = useApp();
  const [done, setDone] = useState(() => prefersReducedMotion());
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (done) {
      setReady(true);
      return;
    }
    const el = root.current;
    if (!el) return;

    const state = { p: 0 };
    const render = () => {
      if (counter.current) counter.current.textContent = String(Math.round(state.p)).padStart(3, "0");
    };
    const assets = Promise.race([
      Promise.all([document.fonts?.ready, waitForImage(site.images.portrait)]),
      new Promise((r) => setTimeout(r, 3500)),
    ]);

    let cancelled = false;
    const fill = gsap.to(state, { p: 88, duration: seenBefore() ? 0.35 : 1, ease: "power2.inOut", onUpdate: render });
    fill.then(() =>
      assets.then(() => {
        if (cancelled) return;
        gsap
          .timeline({
            onComplete: () => {
              try {
                sessionStorage.setItem(SEEN_KEY, "1");
              } catch {
                /* storage unavailable */
              }
              setDone(true);
            },
          })
          .to(state, { p: 100, duration: 0.35, ease: "power2.out", onUpdate: render })
          .to(el.querySelectorAll("[data-exit]"), { yPercent: -110, duration: 0.6, ease: "expo.in" }, "+=0.1")
          .add(() => setReady(true), "-=0.2")
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "-=0.3");
      }),
    );

    return () => {
      cancelled = true;
      fill.kill();
    };
  }, [done, setReady]);

  if (done) return null;

  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-100 flex items-end justify-between bg-ink p-5 text-paper md:p-12"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <span className="overflow-hidden text-sm uppercase">
        <span data-exit className="block">
          {site.name.first} {site.name.last}
        </span>
      </span>
      <span className="overflow-hidden">
        <span
          ref={counter}
          data-exit
          className="block text-[clamp(7rem,30vw,18rem)] font-extralight leading-[0.8] tracking-[-0.06em] tabular-nums"
        >
          000
        </span>
      </span>
    </div>
  );
}
