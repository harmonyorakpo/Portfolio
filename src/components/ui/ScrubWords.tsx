import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "../../lib/gsap";

export default function ScrubWords({
  as: Tag = "p",
  children,
  className,
  start = "top 80%",
  end = "bottom 55%",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const chips = el.querySelectorAll("[data-chip]");
      SplitText.create(el, {
        type: "words",
        tag: "span",
        autoSplit: true,
        onSplit(self) {
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start, end, scrub: 0.6 } });
          tl.fromTo(self.words, { opacity: 0.13 }, { opacity: 1, stagger: 0.1, ease: "none", duration: 1 }, 0);
          if (chips.length) {
            tl.fromTo(
              chips,
              { scale: 0.3, opacity: 0, rotate: -12 },
              { scale: 1, opacity: 1, rotate: 0, stagger: 0.6, ease: "back.out(2)", duration: 0.8 },
              0.1,
            );
          }
          return tl;
        },
      });
    });
    return () => mm.revert();
  });

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
