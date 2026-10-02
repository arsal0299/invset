import Lenis from "lenis";

/* ==========================================================
   Smooth scroll engine
   - Lenis for buttery desktop wheel scrolling
   - Native (zero-latency) touch scrolling on phones
   - ONE shared scroll ticker for every scroll-driven effect
   ========================================================== */

let lenis: Lenis | null = null;
type Sub = (y: number) => void;
const subs = new Set<Sub>();
let lastY = -1;
let raf = 0;

function emit(force = false) {
  const y = window.scrollY;
  if (!force && y === lastY) return;
  lastY = y;
  subs.forEach((f) => f(y));
}
function schedule() {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    emit();
  });
}

let bound = false;
function bind() {
  if (bound || typeof window === "undefined") return;
  bound = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener(
    "resize",
    () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        emit(true);
      });
    },
    { passive: true }
  );
}

/** Subscribe to scroll (called once per frame max). Returns unsubscribe. */
export function onScroll(cb: Sub) {
  bind();
  subs.add(cb);
  cb(window.scrollY);
  return () => {
    subs.delete(cb);
  };
}

export function initSmooth() {
  if (lenis || typeof window === "undefined") return lenis;
  bind();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return null;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false, // phones keep native momentum scrolling (no lag)
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
    autoRaf: true,
  });
  lenis.on("scroll", () => emit());
  return lenis;
}

export const getLenis = () => lenis;

export function lockScroll(on: boolean) {
  if (on) lenis?.stop();
  else lenis?.start();
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Smoothly scroll to a Y position or element */
export function smoothTo(target: number | HTMLElement, offset = 0, duration?: number) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const y = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
  const dest = Math.max(0, y + offset);
  const dist = Math.abs(dest - window.scrollY);
  const dur = duration ?? Math.min(1.6, Math.max(0.7, dist / 2600));
  if (lenis) {
    lenis.scrollTo(dest, { duration: reduced ? 0 : dur, easing: easeInOut, force: true, immediate: reduced });
    return;
  }
  if (reduced) return window.scrollTo(0, dest);
  const start = window.scrollY;
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / (dur * 1000));
    window.scrollTo(0, start + (dest - start) * easeInOut(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
