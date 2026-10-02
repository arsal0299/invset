import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Flower, Sparkle, CurlyArrow } from "./Decor";
import { profile } from "../data/content";
import { img } from "../data/images";

const CRITICAL = [img.heroGirl, img.aboutPortrait];
const MIN_TIME = 2600;
const MAX_TIME = 5000; // hard guarantee: site always reveals

function preload(src: string) {
  return new Promise<void>((res) => {
    const img = new Image();
    img.onload = img.onerror = () => res();
    img.src = src;
    if (img.complete) res();
  });
}

export default function Loader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const target = useRef(0);
  const shown = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const total = CRITICAL.length + 1;
    let loaded = 0;
    const bump = () => {
      loaded++;
      target.current = loaded / total;
    };
    CRITICAL.forEach((src) => preload(src).then(bump));
    (document.fonts?.ready ?? Promise.resolve()).then(bump);
    const safety = window.setTimeout(() => (target.current = 1), MAX_TIME - 800);

    let finished = false;
    const timers: number[] = [];
    const finish = () => {
      if (finished) return;
      finished = true;
      clearInterval(iv);
      setPct(1);
      // reveal the page *underneath* first, then lift the loader → no blank flash
      onReveal();
      timers.push(window.setTimeout(() => setLeaving(true), 120));
      timers.push(window.setTimeout(onDone, 1450));
    };
    // setInterval (not rAF) so it also works in background tabs / iframes
    const iv = window.setInterval(() => {
      const now = performance.now();
      const t = Math.min(1, (now - start) / (reduced ? 300 : MIN_TIME));
      const goal = Math.min(target.current, t);
      shown.current += (goal - shown.current) * 0.12;
      if (goal === 1 && 1 - shown.current < 0.01) shown.current = 1;
      setPct(shown.current);
      if (shown.current >= 1 || now - start > MAX_TIME) finish();
    }, 30);
    const hard = window.setTimeout(finish, MAX_TIME + 200);
    return () => {
      clearInterval(iv);
      clearTimeout(safety);
      clearTimeout(hard);
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const particles = Array.from({ length: 14 });

  return (
    <>
      <div className={`loader-sheet ${leaving ? "is-leaving" : ""}`} aria-hidden />
      <div className={`loader grain ${leaving ? "is-leaving" : ""}`} role="status" aria-live="polite" aria-label="Loading portfolio">
        {/* particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {particles.map((_, i) => (
            <span
              key={i}
              className="loader-particle"
              style={
                {
                  left: `${10 + ((i * 53) % 80)}%`,
                  top: `${30 + ((i * 29) % 45)}%`,
                  width: `${4 + (i % 4) * 3}px`,
                  height: `${4 + (i % 4) * 3}px`,
                  "--d": `${(i % 7) * 0.35 + 0.3}s`,
                  "--dx": `${(i % 2 ? 1 : -1) * (10 + (i % 5) * 8)}px`,
                  background: i % 3 === 0 ? "#E94F83" : "#F7B6C8",
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="relative flex flex-col items-center px-6 text-center">
          {/* decor */}
          <div className="absolute -left-16 -top-6 enter enter-pop sm:-left-24" style={{ animation: "enterPop .8s var(--ease-bounce) 1.3s both" }}>
            <Flower size={30} className="spin-slow" />
          </div>
          <div className="absolute -right-14 top-2 sm:-right-24" style={{ animation: "enterPop .8s var(--ease-bounce) 1.5s both" }}>
            <Sparkle size={18} className="twinkle text-rose" />
          </div>
          <div className="absolute -right-20 bottom-10 opacity-70 sm:-right-32" style={{ animation: "enterFade 1s ease 1.6s both" }}>
            <CurlyArrow size={70} className="is-in rotate-[160deg]" delay={1600} />
          </div>

          {/* heart */}
          <svg width="64" height="60" viewBox="0 0 32 30" className="loader-heart mb-3" aria-hidden>
            <path
              className="fill"
              d="M16 27C9 22.3 3.6 17.8 3.8 11.6 4 7.4 7.3 4.6 10.9 5c2.4.3 4 1.9 5.1 4 1.2-2.2 3-3.9 5.6-4.1 3.7-.3 6.6 2.6 6.6 6.5 0 6.4-6.1 11-12.2 15.6Z"
              fill="#FCE8EE"
              style={{ strokeDasharray: "none", strokeDashoffset: 0 }}
            />
            <path
              pathLength={1}
              d="M16 27C9 22.3 3.6 17.8 3.8 11.6 4 7.4 7.3 4.6 10.9 5c2.4.3 4 1.9 5.1 4 1.2-2.2 3-3.9 5.6-4.1 3.7-.3 6.6 2.6 6.6 6.5 0 6.4-6.1 11-12.2 15.6"
              fill="none"
              stroke="#E94F83"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>

          <div className="loader-logo script text-[64px] leading-none text-rose sm:text-[84px]">{profile.logo}.</div>

          {/* progress */}
          <div className="mt-8 h-[2px] w-56 overflow-hidden rounded-full bg-petal sm:w-72">
            <div
              className="h-full origin-left rounded-full"
              style={{ transform: `scaleX(${pct})`, background: "linear-gradient(90deg,#F7B6C8,#E94F83)" }}
            />
          </div>
          <div className="mt-4 flex w-56 items-center justify-between text-[11px] font-semibold tracking-[0.18em] text-muted uppercase sm:w-72" style={{ animation: "enterFade 1s ease 1.2s both" }}>
            <span className="hand text-[17px] font-medium tracking-normal normal-case text-ink/70">Creating something beautiful…</span>
            <span className="tabular-nums text-rose">{Math.round(pct * 100)}%</span>
          </div>
        </div>
      </div>
    </>
  );
}
