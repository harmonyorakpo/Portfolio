import { useRef } from "react";
import { useScrollFx } from "../hooks/useScrollFx";
import { useApp } from "../app/context";
import TransitionLink from "../components/ui/TransitionLink";

export default function NotFound() {
  const root = useRef<HTMLElement>(null);
  const { setPaletteOpen } = useApp();
  useScrollFx(root, "ink");

  return (
    <section ref={root} data-theme="ink" className="flex min-h-svh flex-col justify-between px-5 pb-10 pt-10 md:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg/65">( Error — route not found )</p>

      <div>
        <h1 className="text-[clamp(7rem,32vw,30rem)] font-extralight leading-[0.78] tracking-[-0.08em]">
          4<span className="serif-italic font-normal text-signal">0</span>4
        </h1>
        <p className="mt-8 max-w-[30ch] text-[clamp(1.5rem,3vw,2.6rem)] leading-tight tracking-[-0.03em]">
          This route doesn&apos;t exist — <span className="serif-italic">yet.</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em]">
        <TransitionLink to="/" label="Home" className="rounded-full bg-signal px-5 py-3 text-ink">
          Take me home
        </TransitionLink>
        <button type="button" onClick={() => setPaletteOpen(true)} className="rounded-full border border-fg/25 px-5 py-3 text-fg/80 hover:text-fg">
          Or press ⌘K
        </button>
      </div>
    </section>
  );
}
