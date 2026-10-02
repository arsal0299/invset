import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal, useInView } from "../lib/motion";
import { onScroll } from "../lib/smooth";
import { achievements, experience, skills, tools } from "../data/content";
import { HeartFill, Sparkle } from "./Decor";

/* ---------- Timeline (line fills while scrolling) ---------- */
export function Timeline({ items = experience }: { items?: typeof experience }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = "";
    return onScroll(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -50 || r.top > vh + 50) return;
      const p = Math.min(1, Math.max(0, (vh * 0.65 - r.top) / r.height)).toFixed(3);
      if (p !== last) {
        el.style.setProperty("--p", p);
        last = p;
      }
    });
  }, []);
  return (
    <div ref={ref} className="relative">
      <div className="absolute bottom-0 left-[15px] top-0 w-px bg-line md:left-1/2" />
      <div className="tl-line absolute bottom-0 left-[15px] top-0 w-[2px] -translate-x-[0.5px] bg-[linear-gradient(180deg,#F7B6C8,#E94F83)] md:left-1/2" />
      <div className="space-y-10 md:space-y-14">
        {items.map((e, i) => {
          const right = i % 2 === 1;
          return (
            <div key={e.role} className="relative grid md:grid-cols-2 md:gap-16">
              <span className="absolute left-[15px] top-6 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-white ring-4 ring-cream shadow-[var(--shadow-soft)] md:left-1/2">
                <HeartFill size={13} className="text-rose" />
              </span>
              <Reveal
                variant={right ? "right" : "left"}
                className={`pl-12 md:pl-0 ${right ? "md:col-start-2" : "md:text-right"}`}
              >
                <div className="card group p-6 transition-transform duration-700 hover:-translate-y-1.5 sm:p-7">
                  <p className="eyebrow">{e.period}</p>
                  <h3 className="display mt-2 text-[26px]">{e.role}</h3>
                  <p className="mt-1 text-[14px] font-semibold text-ink/70">{e.company}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{e.text}</p>
                  <div className={`mt-4 flex flex-wrap gap-2 ${right ? "" : "md:justify-end"}`}>
                    {e.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Skill bars ---------- */
function Bar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useInView(ref, () => setOn(true));
  return (
    <div ref={ref}>
      <div className="mb-2 flex justify-between text-[14px]">
        <span className="font-medium">{name}</span>
        <span className="tabular-nums text-muted">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-petal">
        <div
          className="relative h-full overflow-hidden rounded-full bg-[linear-gradient(90deg,#F7B6C8,#E94F83)]"
          style={{ width: on ? `${level}%` : "0%", transition: `width 1.6s var(--ease) ${delay}ms` }}
        >
          <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" style={{ animation: "shimmer 2.4s ease-in-out infinite" }} />
        </div>
      </div>
    </div>
  );
}

export function SkillGroups({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-6 ${compact ? "" : "md:grid-cols-3"}`}>
      {skills.map((g, gi) => (
        <Reveal key={g.group} delay={gi * 120} className="card p-6 sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="display text-[26px]">{g.group}</h3>
            <Sparkle size={16} className="twinkle text-rose" />
          </div>
          <div className="space-y-5">
            {g.items.map((s, i) => (
              <Bar key={s.name} {...s} delay={i * 120} />
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function ToolCloud() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {tools.map((t, i) => (
        <Reveal key={t} variant="scale" delay={i * 35}>
          <span className="inline-flex cursor-default items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-[14px] font-medium transition-all duration-500 hover:-translate-y-1 hover:-rotate-2 hover:border-rose hover:bg-rose hover:text-white hover:shadow-[0_10px_24px_-10px_rgba(233,79,131,.8)]">
            <span className="h-1.5 w-1.5 rounded-full bg-rose/60" />
            {t}
          </span>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- Counting stats ---------- */
function Count({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const num = parseFloat(value);
  const suffix = value.replace(/[\d.]/g, "");
  const [n, setN] = useState(0);
  useInView(ref, () => {
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 1600);
      setN(Math.round(num * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
  return (
    <span ref={ref} className="tabular-nums">
      {isNaN(num) ? value : `${n}${suffix}`}
    </span>
  );
}

export function Stats({ items = achievements }: { items?: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((a, i) => (
        <Reveal key={a.label} delay={i * 90} className="card p-5 text-center sm:p-6">
          <p className="display text-[40px] text-rose sm:text-[48px]">
            <Count value={a.value} />
          </p>
          <p className="mt-1 text-[13px] font-semibold tracking-[0.1em] text-muted uppercase">{a.label}</p>
        </Reveal>
      ))}
    </div>
  );
}

export const dd = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
