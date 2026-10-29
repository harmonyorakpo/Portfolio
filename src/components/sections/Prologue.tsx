import { site } from "../../config/site";
import Label from "../ui/Label";
import ScrubWords from "../ui/ScrubWords";

export default function Prologue() {
  return (
    <section id="about" data-theme="ink" aria-labelledby="about-title" className="px-5 py-32 md:px-12 md:py-48">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <Label n="01">About</Label>
          <h2 id="about-title" className="sr-only">
            About {site.name.first}
          </h2>
        </div>

        <div className="md:col-span-9">
          <ScrubWords className="text-[clamp(1.6rem,3.1vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.03em]">
            {site.prologue.detail}
          </ScrubWords>
        </div>
      </div>
    </section>
  );
}
