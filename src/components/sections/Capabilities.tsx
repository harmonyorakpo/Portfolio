import { capabilities } from "../../data/capabilities";
import Label from "../ui/Label";
import Reveal from "../ui/Reveal";

export default function Capabilities() {
  return (
    <section id="capabilities" data-theme="paper" aria-labelledby="capabilities-title" className="px-5 pb-28 pt-12 md:px-12 md:pb-40 md:pt-20">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <Label n="04" className="mb-6">
              Capabilities
            </Label>
            <Reveal as="h2" id="capabilities-title" className="text-[clamp(3rem,6.5vw,6.5rem)] font-medium leading-[0.9] tracking-tighter">
              What I <span className="serif-italic font-normal">bring</span>
            </Reveal>
          </div>
        </div>

        <ol className="md:col-span-8">
          {capabilities.map((cap, i) => (
            <li key={cap.title} data-reveal className="grid gap-3 border-t border-fg/15 py-9 md:grid-cols-12 md:gap-6 md:py-11">
              <span className="font-mono text-xs text-fg/65 md:col-span-1 md:pt-2">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[clamp(1.9rem,3vw,3rem)] font-medium leading-none tracking-[-0.04em] md:col-span-5">
                {cap.title} <span className="serif-italic font-normal">{cap.emphasis}</span>
              </h3>
              <div className="md:col-span-6">
                <p className="max-w-[44ch] text-base leading-relaxed text-fg/65">{cap.summary}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-fg/65">{cap.tools.join(" · ")}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
