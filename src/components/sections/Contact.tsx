import { Copy } from "lucide-react";
import { useApp } from "../../app/context";
import { site } from "../../config/site";
import { getEmail, mailtoHref } from "../../lib/email";
import Label from "../ui/Label";
import Reveal from "../ui/Reveal";

export default function Contact() {
  const { notify } = useApp();
  const socials = site.socials.filter((s) => s.href);

  const copy = () => {
    const email = getEmail();
    navigator.clipboard?.writeText(email).then(
      () => notify("Email copied to clipboard"),
      () => notify(email),
    );
  };

  return (
    <section id="contact" data-theme="ink" aria-labelledby="contact-title" className="px-5 pb-20 pt-32 md:px-12 md:pb-28 md:pt-44">
      <Label n="06" className="mb-8">
        Contact
      </Label>

      <Reveal as="h2" id="contact-title" by="chars" className="text-[clamp(3.4rem,10vw,11.5rem)] font-medium leading-[0.86] tracking-[-0.06em]">
        Let&apos;s build
        <br />
        something <span className="serif-italic font-normal text-signal">great.</span>
      </Reveal>

      <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-24">
        <a
          href={mailtoHref()}
          className="text-[clamp(1.4rem,3.2vw,3rem)] font-medium leading-none tracking-[-0.035em] underline decoration-fg/25 decoration-1 underline-offset-[0.2em] transition-colors hover:decoration-signal"
        >
          {getEmail()}
        </a>
        <button
          type="button"
          onClick={copy}
          data-cursor="Copy"
          aria-label="Copy email address"
          className="grid size-10 place-items-center rounded-full border border-fg/20 text-fg/70 transition-colors hover:border-fg hover:text-fg"
        >
          <Copy className="size-4" aria-hidden="true" />
        </button>
      </div>

      <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-sm uppercase text-fg/60">
        <li>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-fg">
            {site.phone}
          </a>
        </li>
        <li>
          <a href={site.cv.href} download={site.cv.filename} className="transition-colors hover:text-fg">
            Download CV
          </a>
        </li>
        {socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
