import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/projects.data";
import { parseTitle, stackOf } from "../../lib/projects";
import { gsap, hasFinePointer, MOTION_OK, prefersReducedMotion, useGSAP } from "../../lib/gsap";
import Label from "../ui/Label";
import Reveal from "../ui/Reveal";
import Media from "../ui/Media";
import TransitionLink from "../ui/TransitionLink";

export default function Archive() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [withPreview] = useState(() => hasFinePointer() && !prefersReducedMotion());

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = preview.current;
        const host = list.current;
        if (!el || !host) return;
        gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
        const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
        const rTo = gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3.out" });
        let lastX = 0;
        const move = (e: PointerEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
          rTo(gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.6));
          lastX = e.clientX;
        };
        const enter = (e: PointerEvent) => {
          lastX = e.clientX;
          gsap.set(el, { x: e.clientX, y: e.clientY });
          gsap.to(el, { scale: 1, opacity: 1, duration: 0.6, ease: "expo.out", overwrite: "auto" });
        };
        // overwrite: a quick in-and-out would otherwise let the longer enter tween finish last and strand the card on screen.
        const leave = () => {
          rTo(0);
          gsap.to(el, { scale: 0, opacity: 0, duration: 0.5, ease: "expo.out", overwrite: "auto" });
        };
        host.addEventListener("pointermove", move);
        host.addEventListener("pointerenter", enter);
        host.addEventListener("pointerleave", leave);
        return () => {
          host.removeEventListener("pointermove", move);
          host.removeEventListener("pointerenter", enter);
          host.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="archive"
      data-theme="paper"
      aria-labelledby="archive-title"
      className="relative px-5 py-28 md:px-12 md:py-40"
    >
      <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <Label n="03" className="mb-6">
            Archive
          </Label>
          <Reveal as="h2" id="archive-title" className="text-[clamp(3rem,8.5vw,8.5rem)] font-medium leading-[0.88] tracking-tighter">
            Every project, <span className="serif-italic font-normal">indexed.</span>
          </Reveal>
        </div>
        <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg/65">
          ( {String(projects.length).padStart(2, "0")} entries )
        </p>
      </div>

      <div
        aria-hidden="true"
        className="relative hidden grid-cols-12 gap-4 border-b border-fg/20 pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-fg/65 md:grid"
      >
        <span className="col-span-1">No.</span>
        <span className="col-span-5">Project</span>
        <span className="col-span-4">Stack</span>
        <span className="col-span-2 text-right">Role</span>
      </div>

      <ol ref={list} className="group/list relative">
        {projects.map((p) => {
          const { name, tag } = parseTitle(p.title);
          return (
            <li key={p.id} data-reveal onPointerEnter={() => setHovered(p.id)}>
              <TransitionLink
                to={`/projects/${p.id}`}
                label={name}
                data-cursor="View"
                className="group/row relative grid grid-cols-12 items-center gap-4 overflow-hidden border-b border-fg/15 py-6 transition-opacity duration-500 group-hover/list:opacity-35 hover:opacity-100! focus-visible:opacity-100! md:py-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-fg transition-transform duration-600 ease-out-expo group-hover/row:scale-y-100"
                />
                <span className="relative col-span-2 font-mono text-xs text-fg/65 transition-colors duration-500 group-hover/row:text-bg/60 md:col-span-1 md:pl-3">
                  {p.id}
                </span>
                <span className="relative col-span-9 flex items-baseline gap-3 text-[clamp(1.5rem,3vw,3rem)] font-medium leading-none tracking-[-0.035em] transition-[color,translate] duration-500 ease-out-expo group-hover/row:translate-x-3 group-hover/row:text-bg md:col-span-5">
                  {name}
                  {tag && <span className="serif-italic text-[0.55em] font-normal opacity-60">{tag.toLowerCase()}</span>}
                </span>
                <span className="relative col-span-4 hidden font-mono text-[11px] uppercase tracking-widest text-fg/65 transition-colors duration-500 group-hover/row:text-bg/70 md:block">
                  {stackOf(p).slice(0, 4).join(" · ")}
                </span>
                <span className="relative col-span-1 flex items-center justify-end gap-4 text-sm text-fg/70 transition-colors duration-500 group-hover/row:text-bg md:col-span-2 md:pr-3">
                  <span className="hidden lg:inline">{p.roles?.[0]}</span>
                  <ArrowUpRight
                    className="size-5 shrink-0 transition-transform duration-500 ease-out-expo group-hover/row:rotate-45"
                    aria-hidden="true"
                  />
                </span>
              </TransitionLink>
            </li>
          );
        })}
      </ol>

      {withPreview && (
        <div
          ref={preview}
          aria-hidden="true"
          // The last hovered image stays mounted so the card scales out whole; with nothing in it the empty card's ring draws as a stray line.
          className={`pointer-events-none fixed left-0 top-0 z-50 w-[min(340px,28vw)] overflow-hidden rounded-xl bg-bg opacity-0 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] ring-1 ring-fg/10 ${hovered ? "" : "invisible"}`}
        >
          {projects.map((p) => (
            <div key={p.id} className={hovered === p.id ? "block" : "hidden"}>
              <Media src={p.image} alt="" label={parseTitle(p.title).name} spec="14:9 · ≥ 1717×1104" className="aspect-14/9 w-full" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
