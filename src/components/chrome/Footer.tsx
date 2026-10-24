import { useRef } from "react";
import { useApp } from "../../app/context";
import { site } from "../../config/site";
import { useClock } from "../../hooks/useClock";
import { gsap, MOTION_OK, SplitText, useGSAP } from "../../lib/gsap";

export default function Footer() {
  const { scrollTo } = useApp();
  const { time } = useClock(site.timeZone);
  const root = useRef<HTMLElement>(null);
  const word = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        SplitText.create(word.current, {
          type: "chars",
          mask: "chars",
          tag: "span",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 105,
              stagger: 0.05,
              ease: "none",
              scrollTrigger: { trigger: root.current, start: "top 90%", end: "bottom bottom", scrub: 0.8 },
            }),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <footer ref={root} data-theme="ink" className="overflow-hidden px-5 md:px-12">
      <p
        ref={word}
        aria-hidden="true"
        className="select-none whitespace-nowrap text-center text-[19vw] font-semibold uppercase leading-[0.74] tracking-[-0.07em]"
      >
        {site.name.first}
      </p>

      <div data-footer-bar className="flex flex-wrap items-center justify-between gap-4 border-t border-fg/10 py-6 font-mono text-[10px] uppercase tracking-[0.16em] text-fg/65">
        <span>
          © {new Date().getFullYear()} {site.name.first} {site.name.last}
        </span>
        <span className="tabular-nums">
          {site.location} {time}
        </span>
        <button type="button" onClick={() => scrollTo(0)} className="transition-colors hover:text-fg">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
