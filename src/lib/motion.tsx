import { onScroll } from "./smooth";
import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";

/* ---------------- Shared IntersectionObserver ---------------- */
let io: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();
function getIO() {
  if (io || typeof window === "undefined") return io;
  if (!("IntersectionObserver" in window)) return null;
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          callbacks.get(e.target)?.();
          io!.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  return io;
}

export function useInView<T extends Element>(ref: RefObject<T | null>, onIn?: () => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getIO();
    if (!obs) {
      // Fail-safe: never leave content hidden
      el.classList.add("is-in");
      onIn?.();
      return;
    }
    if (onIn) callbacks.set(el, onIn);
    obs.observe(el);
    return () => obs.unobserve(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

export const isTouch = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;
export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Reveal ---------------- */
type RevealProps = {
  as?: ElementType;
  variant?: "up" | "down" | "left" | "right" | "scale" | "blur" | "clip" | "mask" | "fade";
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
};
export function Reveal({ as = "div", variant = "up", delay = 0, className, style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useInView(ref);
  return createElement(
    as,
    { ref, "data-reveal": variant, className, style: { ...style, "--d": `${delay}ms` } as CSSProperties, ...rest },
    children
  );
}

/* ---------------- Split text (word by word) ---------------- */
export function SplitText({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 45,
  highlight = [],
  highlightClass = "text-rose",
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  highlight?: string[];
  highlightClass?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useInView(ref);
  const lines = text.split("\n");
  let i = 0;
  return createElement(
    as,
    { ref, className, "aria-label": text.replace(/\n/g, " ") },
    lines.map((line, li) => (
      <span key={li} className="block" aria-hidden>
        {line.split(" ").map((w, wi) => {
          const d = delay + i++ * stagger;
          const clean = w.replace(/[.,!?]/g, "");
          return (
            <span key={wi} className="split-word">
              <span style={{ "--d": `${d}ms` } as CSSProperties} className={highlight.includes(clean) ? highlightClass : undefined}>
                {w}
              </span>
              {wi < line.split(" ").length - 1 ? "\u00A0" : ""}
            </span>
          );
        })}
      </span>
    ))
  );
}

/* ---------------- Magnetic ---------------- */
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch() || prefersReduced()) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0) scale(1.03)`;
        el.style.setProperty("--gx", `${e.clientX - r.left}px`);
        el.style.setProperty("--gy", `${e.clientY - r.top}px`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}

/* ---------------- Tilt ---------------- */
export function useTilt<T extends HTMLElement>(max = 8) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch() || prefersReduced()) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateY(-4px)`;
        el.style.setProperty("--px", `${(px + 0.5) * 100}%`);
        el.style.setProperty("--py", `${(py + 0.5) * 100}%`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);
  return ref;
}

/* ---------------- Mouse parallax vars (--mx / --my in -1..1) ---------------- */
export function useMouseVars<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch() || prefersReduced()) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        el.style.setProperty("--mx", x.toFixed(3));
        el.style.setProperty("--my", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

/* ---------------- Scroll-driven transforms (ONE batched loop) ----------------
   Reads all layout first, then writes all transforms → no layout thrash.
   Measures the (untransformed) parent so the effect never feeds back on itself. */
type PItem = { axis: "x" | "y"; speed: number; last: string; visible: boolean };
const pItems = new Map<HTMLElement, PItem>();
let pUnsub: (() => void) | null = null;
let pIO: IntersectionObserver | null = null;
function pTick() {
  const vh = window.innerHeight;
  const reads: [HTMLElement, PItem, number][] = [];
  pItems.forEach((it, el) => {
    if (!it.visible) return;
    const host = el.parentElement ?? el;
    const r = host.getBoundingClientRect();
    reads.push([el, it, (r.top + r.height / 2 - vh / 2) * it.speed]);
  });
  for (const [el, it, v] of reads) {
    const t = it.axis === "y" ? `translate3d(0,${v.toFixed(1)}px,0)` : `translate3d(${v.toFixed(1)}px,0,0)`;
    if (t !== it.last) {
      el.style.transform = t;
      it.last = t;
    }
  }
}
function pRegister(el: HTMLElement, axis: "x" | "y", speed: number) {
  if (!pIO && "IntersectionObserver" in window) {
    pIO = new IntersectionObserver(
      (es) => es.forEach((e) => {
        const it = pItems.get(e.target as HTMLElement);
        if (it) it.visible = e.isIntersecting;
      }),
      { rootMargin: "25% 0px 25% 0px" }
    );
  }
  pItems.set(el, { axis, speed, last: "", visible: !pIO });
  pIO?.observe(el);
  if (!pUnsub) pUnsub = onScroll(pTick);
  else pTick();
  return () => {
    pItems.delete(el);
    pIO?.unobserve(el);
    el.style.transform = "";
    if (!pItems.size && pUnsub) {
      pUnsub();
      pUnsub = null;
    }
  };
}

export function useParallax<T extends HTMLElement>(speed = -0.1) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    return pRegister(el, "y", isTouch() ? speed * 0.5 : speed);
  }, [speed]);
  return ref;
}

/* ---------------- Horizontal scroll drift (big background words) ---------------- */
export function useScrollX<T extends HTMLElement>(speed = 0.25) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    return pRegister(el, "x", isTouch() ? speed * 0.6 : speed);
  }, [speed]);
  return ref;
}

/* ---------------- Global card spotlight (.spot) — one listener ---------------- */
let spotBound = false;
export function bindSpotlight() {
  if (spotBound || typeof window === "undefined" || isTouch()) return;
  spotBound = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      const t = (e.target as HTMLElement)?.closest?.(".spot") as HTMLElement | null;
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--sx", `${e.clientX - r.left}px`);
      t.style.setProperty("--sy", `${e.clientY - r.top}px`);
    },
    { passive: true }
  );
}

export function Parallax({ speed = -0.1, className, children }: { speed?: number; className?: string; children: ReactNode }) {
  const ref = useParallax<HTMLDivElement>(speed);
  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
