import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects, parseTitle, stackOf } from "../../lib/projects";
import { gsap, MOTION_OK, useGSAP } from "../../lib/gsap";
import Label from "../ui/Label";
import Reveal from "../ui/Reveal";
import Media from "../ui/Media";
import TransitionLink from "../ui/TransitionLink";

export default function FeaturedWork() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const st = { trigger: next, start: "top bottom", end: "top 15%", scrub: true };
          gsap.to(card.querySelector("[data-card-inner]"), { scale: 0.92 + i * 0.015, ease: "none", scrollTrigger: st });
          gsap.to(card.querySelector("[data-card-shade]"), { opacity: 0.6, ease: "none", scrollTrigger: st });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" data-theme="ink" aria-labelledby="work-title" className="relative px-3 pb-24 md:px-6 md:pb-40">
      <div className="mb-16 px-2 md:mb-24 md:px-6">
        <Label n="02" className="mb-6">
          Selected work
        </Label>
        <Reveal as="h2" id="work-title" className="text-[clamp(3rem,8vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
          Things I&apos;ve <span className="serif-italic font-normal">shipped</span>
        </Reveal>
      </div>

      {featuredProjects.map((project, i) => {
        const { name, lead, last } = parseTitle(project.title);
        return (
          <article key={project.id} data-card data-cursor="Open" className="group sticky mb-6 md:mb-10" style={{ top: `calc(12vh + ${i * 18}px)` }}>
            <div data-card-inner className="surface-ink relative origin-top overflow-hidden rounded-2xl md:rounded-3xl">
              <div className="grid min-h-[min(76vh,720px)] gap-8 p-5 md:grid-cols-12 md:p-10 lg:p-12">
                <div className="flex flex-col justify-between gap-10 md:col-span-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg/65">{project.id}</p>

                  <div>
                    <h3 className="text-[clamp(2.2rem,4vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.045em]">
                      {lead} <span className="serif-italic font-normal">{last}</span>
                    </h3>
                    <p className="mt-5 line-clamp-3 max-w-[44ch] text-base leading-relaxed text-fg/65">{project.about}</p>
                    <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-fg/65">{stackOf(project).join(" · ")}</p>
                  </div>

                  <TransitionLink
                    to={`/projects/${project.id}`}
                    label={name}
                    className="inline-flex w-fit items-center gap-3 text-sm uppercase after:absolute after:inset-0 after:z-10 after:content-['']"
                  >
                    Case study
                    <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" aria-hidden="true" />
                    <span className="sr-only">: {project.title}</span>
                  </TransitionLink>
                </div>

                <div className="relative md:col-span-7">
                  <Media
                    src={project.image}
                    alt={`${name} interface`}
                    label={`${name} — hero shot`}
                    spec="16:10 · ≥ 2000×1250"
                    parallax
                    className="aspect-16/11 h-full w-full rounded-lg md:aspect-auto md:min-h-full md:rounded-xl"
                    imgClassName="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
                  />
                </div>
              </div>
              <div data-card-shade aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink opacity-0" />
            </div>
          </article>
        );
      })}
    </section>
  );
}
