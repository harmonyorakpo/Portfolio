import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Copy, CornerDownLeft, Download, FolderOpen, Hash, Mail, Search } from "lucide-react";
import { useApp } from "../../app/context";
import { site } from "../../config/site";
import { getEmail, mailtoHref } from "../../lib/email";
import { projects } from "../../data/projects.data";
import { parseTitle } from "../../lib/projects";
import { cn } from "../../lib/cn";

interface Item {
  id: string;
  group: "Navigate" | "Projects" | "Actions" | "Elsewhere";
  label: string;
  hint?: string;
  icon: ReactNode;
  keywords?: string;
  run: () => void;
}

const sections = [
  ["top", "Home"],
  ["about", "About"],
  ["work", "Selected work"],
  ["archive", "Project archive"],
  ["capabilities", "Capabilities"],
  ["lab", "Under the hood — live metrics"],
  ["contact", "Contact"],
] as const;

export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen, go, notify } = useApp();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const close = () => setPaletteOpen(false);

  const items = useMemo<Item[]>(() => {
    const icon = "size-4 shrink-0";
    const nav: Item[] = sections.map(([id, label]) => ({
      id: `nav-${id}`,
      group: "Navigate",
      label,
      icon: <Hash className={icon} aria-hidden="true" />,
      run: () => go(id === "top" ? "/" : `/#${id}`, label),
    }));
    const work: Item[] = projects.map((p) => {
      const { name, tag } = parseTitle(p.title);
      return {
        id: `project-${p.id}`,
        group: "Projects",
        label: name,
        hint: p.id,
        keywords: `${p.description} ${tag ?? ""}`,
        icon: <FolderOpen className={icon} aria-hidden="true" />,
        run: () => go(`/projects/${p.id}`, name),
      };
    });
    const actions: Item[] = [
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: getEmail(),
        icon: <Copy className={icon} aria-hidden="true" />,
        run: () => {
          const email = getEmail();
          navigator.clipboard?.writeText(email).then(
            () => notify("Email copied to clipboard"),
            () => notify(email),
          );
        },
      },
      {
        id: "email",
        group: "Actions",
        label: "Send an email",
        icon: <Mail className={icon} aria-hidden="true" />,
        run: () => void (window.location.href = mailtoHref()),
      },
      {
        id: "cv",
        group: "Actions",
        label: "Download CV",
        hint: "PDF",
        keywords: "resume résumé",
        icon: <Download className={icon} aria-hidden="true" />,
        run: () => {
          const a = document.createElement("a");
          a.href = site.cv.href;
          a.download = site.cv.filename;
          a.click();
        },
      },
    ];
    const elsewhere: Item[] = site.socials
      .filter((s) => s.href)
      .map((s) => ({
        id: `social-${s.label}`,
        group: "Elsewhere",
        label: s.label,
        icon: <ArrowUpRight className={icon} aria-hidden="true" />,
        run: () => void window.open(s.href, "_blank", "noopener,noreferrer"),
      }));
    return [...nav, ...work, ...actions, ...elsewhere];
  }, [go, notify]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.keywords ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (paletteOpen) {
      restoreFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      restoreFocus.current?.focus?.();
    }
  }, [paletteOpen]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const runItem = (item: Item | undefined) => {
    if (!item) return;
    close();
    requestAnimationFrame(item.run);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runItem(filtered[index]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  let lastGroup = "";

  if (!paletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-95 flex animate-[fade-in_0.2s_ease-out] items-start justify-center bg-ink/50 px-4 pt-[14vh] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-xl animate-[palette-in_0.45s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-2xl bg-ink-2 text-paper shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-white/8 px-4">
          <Search className="size-4 text-paper/60" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={filtered[index] ? `palette-${filtered[index].id}` : undefined}
            placeholder="Search projects, sections, actions…"
            className="h-14 w-full bg-transparent text-[15px] text-paper outline-none placeholder:text-paper/60"
          />
          <kbd className="rounded-md bg-white/8 px-1.5 py-0.5 font-mono text-[10px] text-paper/60">ESC</kbd>
        </div>

        <ul ref={listRef} id="palette-list" role="listbox" data-lenis-prevent className="max-h-[min(60vh,440px)] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-10 text-center font-mono text-xs text-paper/60">No results for “{query}”</li>
          )}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            return (
              <li key={item.id} role="presentation">
                {header && (
                  <div className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">{header}</div>
                )}
                <div
                  id={`palette-${item.id}`}
                  role="option"
                  aria-selected={i === index}
                  data-index={i}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => runItem(item)}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    i === index ? "bg-white/8 text-paper" : "text-paper/70",
                  )}
                >
                  <span className={cn(i === index ? "text-signal" : "text-paper/60")}>{item.icon}</span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.hint && <span className="truncate font-mono text-[11px] text-paper/60">{item.hint}</span>}
                  {i === index && <ArrowRight className="size-3.5 text-paper/60" aria-hidden="true" />}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/60">
          <span className="flex items-center gap-3">
            <span>↑↓ navigate</span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="size-3" aria-hidden="true" /> select
            </span>
          </span>
          <span>{filtered.length} results</span>
        </div>
      </div>
    </div>
  );
}
