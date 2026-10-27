import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export default function Label({ n, children, className }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-[11px] uppercase tracking-[0.18em] text-fg/65", className)}>
      ( {n && <>{n} — </>}
      {children} )
    </p>
  );
}
