import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useApp } from "../../app/context";
import { cn } from "../../lib/cn";

export default function BackToTop() {
  const { ready, scrollTo } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // Written straight to the DOM so the ring tracks every frame without re-rendering.
      ring.current?.style.setProperty("stroke-dashoffset", String(1 - progress));
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // The footer bar carries its own "Back to top" link, so step aside once that row is on screen.
  useEffect(() => {
    const bar = document.querySelector("[data-footer-bar]");
    if (!bar) return;
    const io = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting));
    io.observe(bar);
    return () => io.disconnect();
  }, []);

  const visible = ready && scrolled && !footerInView;

  const onClick = () => {
    scrollTo(0);
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      inert={!visible}
      className={cn(
        "group fixed bottom-5 right-5 z-90 grid size-12 place-items-center rounded-full bg-bg/20 text-fg backdrop-blur-sm transition-[opacity,translate,background-color,color] duration-500 ease-out-expo hover:bg-fg hover:text-bg md:bottom-8 md:right-8 md:size-13",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <svg viewBox="0 0 52 52" aria-hidden="true" className="absolute inset-0 size-full -rotate-90 text-fg">
        <circle cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-20" />
        <circle
          ref={ring}
          cx="26"
          cy="26"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
        />
      </svg>
      <ArrowUp className="relative size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" aria-hidden="true" />
    </button>
  );
}
