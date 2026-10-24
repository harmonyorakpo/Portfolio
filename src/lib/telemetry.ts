import { useSyncExternalStore } from "react";

export interface Telemetry {
  fps: number;
  lcp: number | null;
  cls: number;
}

let state: Telemetry = { fps: 0, lcp: null, cls: 0 };
const listeners = new Set<() => void>();
let started = false;

function emit(patch: Partial<Telemetry>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

function observe(type: string, cb: (entries: PerformanceEntry[]) => void) {
  try {
    new PerformanceObserver((list) => cb(list.getEntries())).observe({ type, buffered: true });
  } catch {
    /* entry type unsupported in this browser */
  }
}

export function startTelemetry() {
  if (started || typeof window === "undefined") return;
  started = true;

  let frames = 0;
  let since = performance.now();
  const loop = (t: number) => {
    frames++;
    if (t - since >= 500) {
      emit({ fps: Math.round((frames * 1000) / (t - since)) });
      frames = 0;
      since = t;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  observe("largest-contentful-paint", (entries) => {
    const e = entries[entries.length - 1];
    if (e) emit({ lcp: e.startTime });
  });
  observe("layout-shift", (entries) => {
    let add = 0;
    for (const e of entries as LayoutShiftEntry[]) if (!e.hadRecentInput) add += e.value;
    if (add) emit({ cls: state.cls + add });
  });
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

export function useTelemetry() {
  return useSyncExternalStore(subscribe, () => state, () => state);
}
