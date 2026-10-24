import { useEffect, useRef, useState } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "../../lib/gsap";

export default function Cursor() {
  const [enabled] = useState(() => hasFinePointer() && !prefersReducedMotion());
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current || !bubble.current) return;
    document.documentElement.classList.add("has-cursor");
    gsap.set(bubble.current, { scale: 0, x: -100, y: -100 });

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3.out" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3.out" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3.out" });
    const bx = gsap.quickTo(bubble.current, "x", { duration: 0.35, ease: "power3.out" });
    const by = gsap.quickTo(bubble.current, "y", { duration: 0.35, ease: "power3.out" });

    let mode: "default" | "hover" | "label" = "default";
    const setMode = (next: typeof mode, label = "") => {
      if (next === mode && next !== "label") return;
      mode = next;
      if (text.current) text.current.textContent = label;
      gsap.to(ring.current, { scale: next === "hover" ? 1.8 : next === "label" ? 0 : 1, duration: 0.4, ease: "expo.out" });
      gsap.to(dot.current, { scale: next === "default" ? 1 : 0, duration: 0.3 });
      gsap.to(bubble.current, { scale: next === "label" ? 1 : 0, duration: 0.45, ease: "expo.out" });
    };

    const onMove = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      bx(e.clientX);
      by(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled) return setMode("label", labelled.dataset.cursor ?? "");
      if (target.closest("a, button, [role='button'], [role='option'], input, label")) return setMode("hover");
      setMode("default");
    };
    const onLeave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 });
    const onDown = () => gsap.to(ring.current, { scale: mode === "hover" ? 1.4 : 0.7, duration: 0.2 });
    const onUp = () => gsap.to(ring.current, { scale: mode === "hover" ? 1.8 : mode === "label" ? 0 : 1, duration: 0.3 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-110">
      <div
        ref={ring}
        className="absolute left-0 top-0 -ml-4.5 -mt-4.5 size-9 rounded-full border border-white mix-blend-difference"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 -ml-0.75 -mt-0.75 size-1.5 rounded-full bg-white mix-blend-difference"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={bubble}
        className="absolute left-0 top-0 -ml-11 -mt-11 grid size-22 place-items-center rounded-full bg-signal font-mono text-[11px] uppercase tracking-[0.14em] text-ink"
      >
        <span ref={text} />
      </div>
    </div>
  );
}
