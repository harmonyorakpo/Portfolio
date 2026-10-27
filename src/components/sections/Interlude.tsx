import { site } from "../../config/site";
import Media from "../ui/Media";
import Reveal from "../ui/Reveal";

export default function Interlude() {
  return (
    <section data-theme="ink" aria-label="Interlude" className="relative h-svh min-h-140 overflow-hidden">
      <div className="absolute inset-0">
        <Media
          src={site.images.interlude}
          alt=""
          label="Full-bleed lifestyle or workspace photo"
          spec="21:9 · ≥ 2400×1030 · darker images read best"
          parallax
          className="h-full w-full"
          placeholderClassName="items-end pb-[16vh]"
          imgClassName="opacity-70"
        />
      </div>
      {site.images.interlude && (
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,11,12,0.35),rgba(11,11,12,0.85))]" />
      )}

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <Reveal
          as="blockquote"
          className="max-w-[18ch] text-[clamp(2.4rem,6.4vw,6.75rem)] font-medium leading-[0.95] tracking-[-0.045em] text-paper"
        >
          {site.interlude.quote} <span className="serif-italic font-normal text-signal">{site.interlude.emphasis}</span>
        </Reveal>
      </div>

    </section>
  );
}
