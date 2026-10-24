import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useApp } from "../../app/context";
import { site } from "../../config/site";
import { gsap, hasFinePointer, MOTION_OK, SplitText, useGSAP } from "../../lib/gsap";
import Media from "../ui/Media";

const MIN_W = 500;
const MAX_W = 760;
const display = "text-[clamp(1.75rem,8.2vw,10.5rem)] font-medium uppercase leading-[0.86] tracking-[-0.045em]";

export default function Hero() {
  const { ready, scrollTo } = useApp();
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLSpanElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const chars = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(title.current, { type: "chars", mask: "chars", tag: "span" });
        chars.current = split.chars as HTMLElement[];

        intro.current = gsap
          .timeline({ paused: true })
          .from(split.chars, { yPercent: 115, duration: 1.3, stagger: 0.03 }, 0)
          .from("[data-hero-mask] > *", { yPercent: 115, duration: 1.3, stagger: 0.08 }, 0.25)
          .fromTo(
            "[data-hero-clip]",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
            0.05,
          )
          .from("[data-hero-clip] img", { scale: 1.35, duration: 2, ease: "expo.out" }, 0.35)
          .from("[data-hero-fade]", { opacity: 0, duration: 1.2, stagger: 0.08 }, 0.8);

        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-title]", { yPercent: -18, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-portrait]", { y: -100, ease: "none", scrollTrigger: st });

        return () => {
          chars.current = [];
          intro.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    if (!ready || !intro.current) return;
    const tl = intro.current;
    tl.play();

    if (!hasFinePointer()) return;
    const weights = chars.current.map(() => MIN_W);
    let px = -9999;
    let py = -9999;
    let raf = 0;
    let running = false;

    const frame = () => {
      let settled = true;
      const radius = Math.max(220, window.innerWidth * 0.22);
      chars.current.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const k = Math.max(0, 1 - Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2)) / radius);
        const target = MIN_W + (MAX_W - MIN_W) * k * k;
        weights[i] += (target - weights[i]) * 0.14;
        if (Math.abs(target - weights[i]) > 0.5) settled = false;
        c.style.fontWeight = String(Math.round(weights[i]));
      });
      if (settled) running = false;
      else raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      if (tl.progress() < 0.6) return;
      px = e.clientX;
      py = e.clientY;
      kick();
    };
    const onLeave = () => {
      px = py = -9999;
      kick();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [ready]);

  return (
    <section
      ref={root}
      id="top"
      data-theme="paper"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-5 pb-8 pt-8 md:px-12 md:pb-12 md:pt-12"
    >
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div data-hero-title className="min-w-0">
          <h1 id="hero-title" className={display}>
            <span className="sr-only">
              {site.name.first} {site.name.last},{" "}
            </span>
            <span ref={title} className="block select-none">
              Frontend
              <br />
              Engineer
            </span>
          </h1>
          <p data-hero-fade className="mt-5 flex items-center gap-3 text-sm uppercase md:text-base">
            <span aria-hidden="true" className="h-px w-5 bg-fg" />
            {site.hero.kicker}
          </p>
          <button
            type="button"
            data-hero-fade
            onClick={() => scrollTo("#contact")}
            className="group mt-10 inline-flex items-center gap-4 rounded-sm bg-fg py-2.5 pl-5 pr-2.5 text-xs uppercase tracking-[0.16em] text-bg transition-colors duration-300 hover:bg-signal hover:text-ink md:mt-12"
          >
            Get in touch
            <span className="grid size-7 place-items-center border border-current/30">
              <ArrowRight className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </button>
        </div>

        <figure data-hero-portrait className="w-[48vw] max-w-[240px] shrink-0 self-end sm:w-[clamp(160px,19vw,360px)] sm:max-w-none sm:self-auto">
          <div data-hero-clip className="aspect-3/4 overflow-hidden bg-fg/5">
            <Media
              src={site.images.portrait}
              alt={`Portrait of ${site.name.first} ${site.name.last}`}
              label="Portrait"
              spec="3:4 · ≥ 1200×1600"
              className="h-full w-full"
              eager
            />
          </div>
        </figure>
      </div>

      <div className="mt-14 flex items-end justify-between gap-6">
        <button
          type="button"
          data-hero-fade
          onClick={() => scrollTo("#about")}
          className="group hidden flex-col items-center gap-1.5 text-xs uppercase sm:flex"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="size-6 transition-transform duration-500 ease-out-expo group-hover:translate-y-1" strokeWidth={1.5} aria-hidden="true" />
          Scroll
        </button>

        <div className="ml-auto text-right" aria-hidden="true">
          <p data-hero-fade className="mb-3 flex items-center justify-end gap-3 text-sm uppercase md:text-base">
            <span className="h-px w-5 bg-fg" />
            Based in {site.location}
          </p>
          <p data-hero-mask className={`overflow-hidden ${display}`}>
            <span className="block">{site.name.first}</span>
          </p>
          <p data-hero-mask className={`overflow-hidden ${display}`}>
            <span className="block">{site.name.last}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
