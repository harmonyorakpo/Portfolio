import { useTelemetry } from "../../lib/telemetry";
import Label from "../ui/Label";
import Reveal from "../ui/Reveal";

export default function UnderTheHood() {
  const t = useTelemetry();
  const metrics = [
    { k: "Largest Contentful Paint", v: t.lcp ? (t.lcp / 1000).toFixed(2) : "—", unit: "s" },
    { k: "Cumulative Layout Shift", v: t.cls.toFixed(3), unit: "" },
    { k: "Frame rate", v: t.fps ? String(t.fps) : "—", unit: "fps" },
  ];

  return (
    <section id="lab" data-theme="ink" aria-labelledby="lab-title" className="px-5 py-32 md:px-12 md:py-44">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Label n="05" className="mb-6">
            Under the hood
          </Label>
          <Reveal as="h2" id="lab-title" className="text-[clamp(2.6rem,5vw,5rem)] font-medium leading-[0.92] tracking-tighter">
            This page, <span className="serif-italic font-normal">measured live.</span>
          </Reveal>
          <p data-reveal className="mt-6 max-w-[34ch] text-base leading-relaxed text-fg/65">
            Real numbers from your browser, right now — not a screenshot.
          </p>
        </div>

        <dl className="grid self-end sm:grid-cols-3 md:col-span-8">
          {metrics.map((m, i) => (
            <div key={m.k} data-reveal className={`border-t border-fg/15 py-7 sm:pr-6 ${i > 0 ? "sm:border-l sm:pl-6" : ""}`}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg/65">{m.k}</dt>
              <dd className="mt-5 text-[clamp(3.5rem,6vw,6rem)] font-extralight leading-none tracking-[-0.05em] tabular-nums">
                {m.v}
                {m.unit && <span className="ml-1.5 font-mono text-xs tracking-normal text-fg/65">{m.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
