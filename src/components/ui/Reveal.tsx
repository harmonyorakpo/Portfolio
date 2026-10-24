import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "../../lib/gsap";

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  by?: "lines" | "chars";
  stagger?: number;
  delay?: number;
  start?: string;
}

export default function Reveal({
  as: Tag = "div",
  children,
  className,
  id,
  by = "lines",
  stagger,
  delay = 0,
  start = "top 86%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      SplitText.create(el, {
        type: by === "chars" ? "words,chars" : "lines",
        mask: by === "chars" ? "words" : "lines",
        tag: "span",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(by === "chars" ? self.chars : self.lines, {
            yPercent: 118,
            rotate: by === "lines" ? 2 : 0,
            duration: by === "chars" ? 1.1 : 1.25,
            stagger: stagger ?? (by === "chars" ? 0.022 : 0.09),
            delay,
            scrollTrigger: { trigger: el, start, once: true },
          });
        },
      });
    });
    return () => mm.revert();
  });

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
