import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useApp } from "../app/context";
import { projects } from "../data/projects.data";
import { getProject, nextProject, parseTitle } from "../lib/projects";
import { gsap, MOTION_OK, SplitText, useGSAP } from "../lib/gsap";
import { useScrollFx } from "../hooks/useScrollFx";
import Label from "../components/ui/Label";
import Media from "../components/ui/Media";
import ScrubWords from "../components/ui/ScrubWords";
import TransitionLink from "../components/ui/TransitionLink";
import NotFound from "./NotFound";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = getProject(id);
  return project ? <CaseStudy key={project.id} id={project.id} /> : <NotFound />;
}

function CaseStudy({ id }: { id: string }) {
  const project = getProject(id)!;
  const { name, lead, last, tag } = parseTitle(project.title);
  const next = nextProject(project.id);
  const nextTitle = parseTitle(next.title);
  const { ready } = useApp();
  const root = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);

  useScrollFx(root, "ink");

  useEffect(() => {
    const prevTitle = document.title;
    const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = desc?.content;
    document.title = `${name} — ${parseTitle(project.title).tag ?? "Case study"} · Harmony Orakpoyovwuru`;
    if (desc && project.about) desc.content = project.about;
    return () => {
      document.title = prevTitle;
      if (desc && prevDesc != null) desc.content = prevDesc;
    };
  }, [name, project.title, project.about]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-cs-title]", { type: "words,chars", mask: "words", tag: "span" });
        intro.current = gsap
          .timeline({ paused: true, delay: 0.35 })
          .from(split.chars, { yPercent: 115, duration: 1.2, stagger: 0.018 }, 0)
          .from("[data-cs-fade]", { opacity: 0, y: 16, duration: 1, stagger: 0.06 }, 0.3)
          .fromTo(
            "[data-cs-hero]",
            { clipPath: "inset(18% 8% 0% 8% round 30px)" },
            { clipPath: "inset(0% 0% 0% 0% round 30px)", duration: 1.6, ease: "expo.inOut" },
            0.15,
          );
        return () => {
          intro.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    if (ready) intro.current?.play();
  }, [ready]);

  const meta = [
    ["Role", project.roles?.join(", ") ?? "—"],
    ["Stack", project.technicalStack?.slice(0, 3).join(", ") ?? "—"],
    ["Engagement", tag ?? "Full-time"],
    ["Index", `${project.id} / ${String(projects.length).padStart(2, "0")}`],
  ];
  return (
    <article ref={root} data-theme="ink" className="px-5 pb-10 pt-8 md:px-10 md:pt-12">
      <div data-cs-fade className="mb-14 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-fg/60 md:mb-20">
        <TransitionLink to="/#work" label="Selected work" className="group flex items-center gap-2 transition-colors hover:text-fg">
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" /> All work
        </TransitionLink>
        <span>Case study</span>
      </div>

      <header>
        <Label className="mb-6">{tag ? `${tag} project` : "Product"}</Label>
        <h1 data-cs-title className="max-w-[14ch] text-[clamp(3rem,9.5vw,10rem)] font-medium leading-[0.88] tracking-[-0.055em]">
          {lead} <span className="serif-italic font-normal">{last}</span>
        </h1>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-fg/15 pt-6 md:mt-20 md:grid-cols-4">
          {meta.map(([k, v]) => (
            <div key={k} data-cs-fade>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/65">{k}</dt>
              <dd className="mt-2 text-sm leading-snug text-fg md:text-base">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div data-cs-hero className="mt-14 overflow-hidden rounded-[22px] md:mt-20 md:rounded-[30px]">
        <Media
          src={project.image}
          alt={`${name} interface`}
          label={`${name} — hero screenshot`}
          spec="16:9 · ≥ 2400×1350"
          eager
          fit="contain"
          className="surface-ink aspect-4/3 w-full md:aspect-video"
          imgClassName="p-3 md:p-10"
        />
      </div>

      <section aria-labelledby="overview" className="mt-28 grid gap-8 md:mt-40 md:grid-cols-12">
        <div className="md:col-span-3">
          <Label>
            <span id="overview">Overview</span>
          </Label>
        </div>
        <ScrubWords className="text-[clamp(1.5rem,2.9vw,2.9rem)] font-[450] leading-[1.15] tracking-tight md:col-span-9">
          {project.about}
        </ScrubWords>
      </section>

      {project.responsibilities && (
        <section aria-labelledby="did" className="mt-28 grid gap-8 md:mt-40 md:grid-cols-12">
          <div className="md:col-span-3">
            <Label>
              <span id="did">What I did</span>
            </Label>
          </div>
          <ol className="md:col-span-9">
            {project.responsibilities.map((r, i) => (
              <li key={r} data-reveal className="grid grid-cols-12 gap-4 border-t border-fg/15 py-6 md:py-7">
                <span className="col-span-2 font-mono text-xs text-fg/65 md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="col-span-10 text-base leading-relaxed text-fg/85 md:col-span-11 md:text-lg">{r}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section aria-label="Screens" className="mt-28 grid gap-3 md:mt-40 md:grid-cols-2">
          {project.gallery.map((src, i) => (
            <div key={i} data-reveal className={i % 2 === 1 ? "md:mt-24" : ""}>
              <Media
                src={src}
                alt={`${name} screen ${i + 1}`}
                label={`${name} — additional screen ${String(i + 1).padStart(2, "0")}`}
                spec="4:3 · ≥ 1600×1200"
                parallax
                className="surface-ink aspect-4/3 w-full overflow-hidden rounded-[18px]"
              />
            </div>
          ))}
        </section>
      )}

      {project.technicalStack && (
        <section aria-labelledby="sheet" className="mt-28 grid gap-8 md:mt-40 md:grid-cols-12">
          <div className="md:col-span-3">
            <Label>
              <span id="sheet">Technical sheet</span>
            </Label>
          </div>
          <p data-reveal className="text-[clamp(1.4rem,2.4vw,2.2rem)] font-medium leading-snug tracking-[-0.03em] md:col-span-9">
            {project.technicalStack.join(" · ")}
          </p>
        </section>
      )}

      {project.url && (
        <div className="mt-24 flex justify-center md:mt-32">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-full bg-signal py-3 pl-7 pr-3 text-lg font-medium text-ink"
          >
            Visit the live product
            <span className="grid size-11 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-out-expo group-hover:rotate-45">
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      )}

      <TransitionLink
        to={`/projects/${next.id}`}
        label={nextTitle.name}
        data-cursor="Next"
        className="group relative mt-32 block overflow-hidden border-y border-fg/15 py-14 md:mt-44 md:py-20"
      >
        <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
        <span className="relative flex items-center justify-between gap-6 transition-colors duration-500 group-hover:text-ink">
          <span>
            <span className="block font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">Next case study — {next.id}</span>
            <span className="mt-4 block text-[clamp(2.2rem,6.5vw,6.5rem)] font-medium leading-[0.9] tracking-tighter">
              {nextTitle.lead} <span className="serif-italic font-normal">{nextTitle.last}</span>
            </span>
          </span>
          <ArrowRight
            className="size-10 shrink-0 transition-transform duration-700 ease-out-expo group-hover:translate-x-2 md:size-16"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </span>
      </TransitionLink>
    </article>
  );
}
