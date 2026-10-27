import type { RefObject } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "../lib/gsap";
import { applyTheme, type ThemeName } from "../lib/theme";

export function useScrollFx(scope: RefObject<HTMLElement | null>, initialTheme: ThemeName) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      applyTheme(initialTheme, true);
      document.querySelectorAll<HTMLElement>("[data-theme]").forEach((section) => {
        const theme = section.dataset.theme as ThemeName;
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => applyTheme(theme),
          onEnterBack: () => applyTheme(theme),
        });
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        gsap.set(reveals, { opacity: 0, y: 32 });
        ScrollTrigger.batch(reveals, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08, overwrite: true }),
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]", root).forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope },
  );
}
