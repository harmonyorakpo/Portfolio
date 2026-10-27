import { createContext, useContext } from "react";
import type Lenis from "lenis";

export interface AppContextValue {
  ready: boolean;
  setReady: (v: boolean) => void;
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, opts?: { immediate?: boolean; offset?: number }) => void;
  go: (to: string, label?: string) => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  notify: (message: string) => void;
}

export const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProviders>");
  return ctx;
}
