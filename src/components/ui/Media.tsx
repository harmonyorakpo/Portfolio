import { useState } from "react";
import { cn } from "../../lib/cn";

interface MediaProps {
  src?: string;
  alt: string;
  label: string;
  spec: string;
  className?: string;
  imgClassName?: string;
  placeholderClassName?: string;
  parallax?: boolean;
  eager?: boolean;
  fit?: "cover" | "contain";
}

function ImagePlaceholder({ label, spec, className }: { label: string; spec: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={cn(
        "hatch relative flex h-full w-full items-center justify-center border border-dashed border-current/25 bg-current/3 text-fg/65",
        className,
      )}
    >
      {["left-2 top-2", "right-2 top-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
        <span key={pos} aria-hidden="true" className={cn("absolute font-mono text-[10px] leading-none", pos)}>
          +
        </span>
      ))}
      <div className="px-4 text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] md:text-[11px]">
        <div>Image placeholder</div>
        <div className="text-fg/80">{label}</div>
        <div>{spec}</div>
      </div>
    </div>
  );
}

export default function Media({ src, alt, label, spec, className, imgClassName, placeholderClassName, parallax, eager, fit = "cover" }: MediaProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={parallax ? "absolute inset-x-0 top-[-8%] h-[116%]" : "h-full w-full"}
        data-parallax={parallax || undefined}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onError={() => setFailed(true)}
            className={cn("h-full w-full", fit === "contain" ? "object-contain" : "object-cover", imgClassName)}
          />
        ) : (
          <ImagePlaceholder label={label} spec={spec} className={placeholderClassName} />
        )}
      </div>
    </div>
  );
}
