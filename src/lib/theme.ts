import { gsap, prefersReducedMotion } from "./gsap";

export type ThemeName = "paper" | "ink" | "signal";

export const themes: Record<ThemeName, { bg: string; fg: string }> = {
  paper: { bg: "#ece9e3", fg: "#0b0b0c" },
  ink: { bg: "#0b0b0c", fg: "#ece9e3" },
  signal: { bg: "#ff715b", fg: "#0b0b0c" },
};

let current: ThemeName | null = null;

// Writes go through style.setProperty (not gsap.set) so a reverting GSAP context can't silently undo them.
export function applyTheme(name: ThemeName, immediate = false) {
  const root = document.documentElement;
  const { bg, fg } = themes[name];
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", bg);

  if (immediate || prefersReducedMotion()) {
    gsap.killTweensOf(root);
    root.style.setProperty("--bg", bg);
    root.style.setProperty("--fg", fg);
    current = name;
    return;
  }
  if (name === current) return;
  current = name;
  gsap.to(root, { "--bg": bg, "--fg": fg, duration: 0.9, ease: "power2.out", overwrite: true });
}
