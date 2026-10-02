import { useMemo, useRef, useState, type CSSProperties } from "react";
import { Reveal, useInView } from "../lib/motion";
import { Container, SectionTitle, Button } from "./ui";
import { TiltCard } from "./sections";
import { usePKClock } from "./Layout";
import { Moon, Music, Plus, Sun, Pin } from "./Icons";
import { HeartFill, Sparkle } from "./Decor";
import { profile } from "../data/content";

/* ---------------- Bento cards ---------------- */
function ClockCard() {
  const { time, hour } = usePKClock(true);
  const day = hour >= 6 && hour < 18;
  const [hh, mm, ss] = time.split(":");
  return (
    <div
      className={`relative h-full overflow-hidden rounded-[28px] p-6 text-white transition-colors duration-1000 sm:p-7 ${
        day ? "bg-[linear-gradient(160deg,#FF9DBE,#E94F83_70%)]" : "bg-[linear-gradient(160deg,#3B2140,#6B2A55_60%,#E94F83)]"
      }`}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20" />
      <div className="absolute -right-2 top-6 float">{day ? <Sun size={56} className="text-white/90" /> : <Moon size={52} className="text-white/90" />}</div>
      {!day && [12, 30, 55, 70].map((l, i) => <span key={i} className="twinkle absolute h-1 w-1 rounded-full bg-white" style={{ left: `${l}%`, top: `${15 + (i % 2) * 20}%`, animationDelay: `${i * 0.6}s` }} />)}
      <p className="relative text-[11px] font-bold tracking-[0.18em] text-white/80 uppercase">Local time · {profile.city}</p>
      <p className="relative mt-3 font-mono text-[46px] font-semibold leading-none tabular-nums sm:text-[52px]">
        {hh}
        <span className="animate-pulse">:</span>
        {mm}
        <span className="ml-1 text-[20px] text-white/70">{ss}</span>
      </p>
      <p className="relative mt-3 text-[14px] text-white/85">
        {day ? "I'm probably designing right now ☕" : "Sleeping or sketching ideas 🌙"}
      </p>
      <p className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[12px] font-semibold backdrop-blur-sm">🇵🇰 PKT · GMT+5</p>
    </div>
  );
}

function AvailabilityCard() {
  const total = 3, taken = 1;
  return (
    <div className="card spot flex h-full flex-col justify-between p-6 sm:p-7">
      <div>
        <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-rose uppercase">
          <span className="status-dot" /> Availability
        </p>
        <p className="display mt-3 text-[30px] leading-[1.05]">
          {total - taken} of {total} spots
          <br />
          <span className="italic text-rose">open this month</span>
        </p>
      </div>
      <div>
        <div className="mt-5 flex gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={`h-2.5 flex-1 rounded-full ${i < taken ? "bg-rose" : "slot-empty"}`} />
          ))}
        </div>
        <div className="mt-5"><Button to="#contact" size="sm">Book a spot</Button></div>
      </div>
    </div>
  );
}

const PLACES = [
  { x: 64, y: 44, label: "Toba Tek Singh", home: true },
  { x: 47, y: 30, label: "London" },
  { x: 22, y: 36, label: "New York" },
  { x: 60, y: 46, label: "Dubai" },
  { x: 58, y: 48, label: "Riyadh" },
  { x: 51, y: 29, label: "Berlin" },
  { x: 84, y: 66, label: "Sydney" },
  { x: 17, y: 30, label: "Toronto" },
];
function MapCard() {
  const home = PLACES[0];
  return (
    <div className="card spot relative h-full overflow-hidden p-6 sm:p-7">
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-rose uppercase"><Pin size={13} /> Based in Pakistan</p>
          <p className="display mt-2 text-[28px] leading-[1.1] sm:text-[32px]">Working with clients <span className="italic text-rose">worldwide</span></p>
        </div>
        <p className="text-[22px] tracking-[3px]">🇵🇰🇦🇪🇬🇧🇺🇸🇸🇦🇩🇪</p>
      </div>
      <div className="relative mt-4 aspect-[2.1/1] w-full">
        <div className="map-dots absolute inset-0" />
        <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          {PLACES.slice(1).map((p, i) => {
            const mx = (home.x + p.x) / 2;
            const my = Math.min(home.y, p.y) - 14;
            return (
              <path
                key={p.label}
                d={`M${home.x} ${home.y} Q ${mx} ${my} ${p.x} ${p.y}`}
                fill="none"
                stroke="#E94F83"
                strokeWidth=".35"
                strokeDasharray="1.2 1.2"
                className="map-arc"
                style={{ animationDelay: `${i * 0.35}s` }}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        {PLACES.map((p) => (
          <span key={p.label} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${(p.y / 60) * 100}%` }}>
            {p.home ? (
              <span className="relative grid h-4 w-4 place-items-center">
                <span className="absolute inset-0 rounded-full bg-rose" style={{ animation: "ping 1.8s ease-out infinite" }} />
                <span className="relative h-3 w-3 rounded-full border-2 border-white bg-rose shadow-[0_0_10px_rgba(233,79,131,.8)]" />
                <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-white">Toba Tek Singh 🇵🇰</span>
              </span>
            ) : (
              <span className="block h-2 w-2 rounded-full bg-blush ring-2 ring-white" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function rand(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}
function HeatmapCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useInView(ref, () => setOn(true));
  const cells = useMemo(() => Array.from({ length: 7 * 32 }, (_, i) => {
    const r = rand(i + 3);
    return r > 0.86 ? 4 : r > 0.66 ? 3 : r > 0.42 ? 2 : r > 0.22 ? 1 : 0;
  }), []);
  const shades = ["#F9E3EA", "#F7C3D3", "#F29AB8", "#EC6D98", "#E94F83"];
  return (
    <div ref={ref} className="card spot h-full overflow-hidden p-6 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-[0.18em] text-rose uppercase">Shipping streak</p>
          <p className="display mt-2 text-[28px] leading-none sm:text-[32px]">1,284 <span className="text-[18px] italic text-muted">contributions this year</span></p>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-muted">
          less {shades.map((c) => <span key={c} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: c }} />)} more
        </div>
      </div>
      <div className="mt-5 flex justify-end overflow-hidden" dir="rtl">
        <div className="grid grid-flow-col grid-rows-7 gap-[3px]" dir="ltr">
          {cells.map((v, i) => (
            <span
              key={i}
              className="h-[11px] w-[11px] rounded-[3px] transition-[transform,opacity] duration-500"
              style={{ background: shades[v], opacity: on ? 1 : 0, transform: on ? "none" : "scale(.3)", transitionDelay: `${Math.floor(i / 7) * 22}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NowPlaying() {
  return (
    <div className="card spot flex h-full flex-col justify-between gap-5 p-6">
      <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-rose uppercase"><Music size={13} /> On repeat</p>
      <div className="flex items-center gap-4">
        <div className="vinyl relative grid h-14 w-14 shrink-0 place-items-center rounded-full">
          <span className="h-4 w-4 rounded-full bg-rose ring-2 ring-white" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-bold">Pasoori</p>
          <p className="truncate text-[13px] text-muted">Coke Studio Pakistan</p>
        </div>
      </div>
      <div className="flex h-7 items-end gap-[3px]" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="eq-bar w-full rounded-full bg-[linear-gradient(180deg,#F7B6C8,#E94F83)]" style={{ animationDelay: `${(i * 137) % 900}ms`, animationDuration: `${700 + ((i * 97) % 600)}ms` }} />
        ))}
      </div>
    </div>
  );
}

function LearningCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useInView(ref, () => setOn(true));
  const pct = 68;
  return (
    <div ref={ref} className="card spot flex h-full flex-col justify-between gap-4 p-6">
      <p className="text-[11px] font-bold tracking-[0.18em] text-rose uppercase">Currently learning</p>
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90" aria-hidden>
            <circle cx="20" cy="20" r="16" fill="none" stroke="#FCE8EE" strokeWidth="4" />
            <circle cx="20" cy="20" r="16" fill="none" stroke="#E94F83" strokeWidth="4" strokeLinecap="round" pathLength={100} strokeDasharray="100" strokeDashoffset={on ? 100 - pct : 100} style={{ transition: "stroke-dashoffset 1.8s var(--ease)" }} />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-[13px] font-bold">{pct}%</span>
        </div>
        <div>
          <p className="text-[15px] font-bold">WebGPU & Shaders</p>
          <p className="text-[13px] text-muted">for dreamier 3D ✨</p>
        </div>
      </div>
    </div>
  );
}

function QuoteCard() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] bg-ink p-6 text-white sm:p-7">
      <Sparkle size={20} className="twinkle absolute right-6 top-6 text-blush" />
      <span className="display text-[70px] leading-[0.5] text-rose">“</span>
      <p className="display mt-2 text-[24px] leading-[1.25] sm:text-[26px]">
        Every project, <span className="script text-[1.15em] text-blush">made with heart</span> — from Toba Tek Singh to the world.
      </p>
      <p className="mt-4 flex items-center gap-2 text-[13px] text-white/60"><HeartFill size={12} className="text-rose" /> my little studio motto</p>
    </div>
  );
}

export function Glance() {
  return (
    <section id="glance" data-nav="about" className="relative py-16 sm:py-24">
      <Container>
        <div className="mb-10 grid items-end gap-6 lg:mb-12 lg:grid-cols-2">
          <SectionTitle eyebrow="At a glance" title={"A little peek\ninto my world"} highlight={["peek"]} />
          <Reveal className="text-[16.5px] leading-relaxed text-muted lg:pb-3">Live from my desk in {profile.city} — what I'm doing, listening to and learning right now.</Reveal>
        </div>
        <div className="grid auto-rows-[minmax(0,auto)] grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          <Reveal variant="scale" className="col-span-2 sm:col-span-1 lg:col-span-1"><TiltCard className="h-full rounded-[28px]" max={6}><ClockCard /></TiltCard></Reveal>
          <Reveal variant="scale" delay={80} className="col-span-2 sm:col-span-1 lg:col-span-1"><AvailabilityCard /></Reveal>
          <Reveal variant="scale" delay={160} className="col-span-2 lg:row-span-2"><MapCard /></Reveal>
          <Reveal variant="scale" delay={120} className="col-span-2"><HeatmapCard /></Reveal>
          <Reveal variant="scale" delay={100} className="col-span-1"><NowPlaying /></Reveal>
          <Reveal variant="scale" delay={180} className="col-span-1"><LearningCard /></Reveal>
          <Reveal variant="scale" delay={240} className="col-span-2"><QuoteCard /></Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Trusted-by strip ---------------- */
const CLIENTS = ["TechNova", "Bloom Atelier", "Pulse Labs", "Nimbus HR", "Serene", "Lumière", "Studio Petal", "Kora", "Daraz-style", "Chai & Code"];
export function Clients() {
  return (
    <section className="relative pb-14 sm:pb-16" aria-label="Clients">
      <Container>
        <Reveal className="mb-6 flex items-center justify-center gap-3 text-center">
          <span className="h-px w-10 bg-line sm:w-20" />
          <p className="text-[12px] font-bold tracking-[0.18em] text-muted uppercase">Trusted by teams in 12+ countries</p>
          <span className="h-px w-10 bg-line sm:w-20" />
        </Reveal>
      </Container>
      <div className="fade-edges relative overflow-hidden">
        <div className="flex w-max" style={{ animation: "marquee 40s linear infinite" }}>
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4">
              {CLIENTS.map((c, i) => (
                <span key={c + k} className="client-chip">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-[linear-gradient(180deg,#FF9DBE,#E94F83)] text-[12px] font-bold text-white">{c[0]}</span>
                  <span className={i % 2 ? "display text-[19px] italic" : "text-[15px] font-bold tracking-tight"}>{c}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  { q: "Do you work with clients outside Pakistan?", a: "Yes! Most of my clients are in the UAE, UK, US and Europe. I work remotely and overlap at least 3–4 hours with most time zones." },
  { q: "How long does a typical project take?", a: "Most websites take 3–6 weeks. Product design and automation projects vary — you'll get a precise timeline after our first call." },
  { q: "How do payments work?", a: "50% upfront, 50% on launch. I accept bank transfer (PK), Payoneer, Wise and PayPal — invoices in USD, GBP, AED or PKR." },
  { q: "Will my website work well on mobile?", a: "Always. Every project is designed mobile-first, tested on real Android and iPhone devices, and optimised for slow 3G/4G networks." },
  { q: "Do you offer support after launch?", a: "Every project includes 30 days of free support, plus optional monthly care plans for updates, backups and improvements." },
];
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" data-nav="services" className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle eyebrow="FAQ" title={"Questions,\nanswered"} highlight={["answered"]}>
              Something else on your mind? Drop me a line — I usually reply within a few hours (PKT).
            </SectionTitle>
            <Reveal delay={300} className="mt-7"><Button to="#contact" variant="outline">Ask me anything</Button></Reveal>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const on = open === i;
              return (
                <Reveal key={f.q} delay={i * 70}>
                  <div className={`card spot overflow-hidden !rounded-[22px] transition-shadow duration-500 ${on ? "shadow-[var(--shadow-lift)]" : ""}`}>
                    <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-4 p-5 text-left text-[15.5px] font-semibold sm:p-6 sm:text-[16.5px]">
                      <span className="flex items-center gap-3">
                        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12px] font-bold transition-colors duration-500 ${on ? "bg-rose text-white" : "bg-petal text-rose"}`}>0{i + 1}</span>
                        {f.q}
                      </span>
                      <Plus size={18} className={`shrink-0 text-rose transition-transform duration-500 ${on ? "rotate-45" : ""}`} />
                    </button>
                    <div className={`acc ${on ? "is-open" : ""}`}>
                      <div>
                        <p className="px-5 pb-6 pl-[4.25rem] text-[15px] leading-relaxed text-muted sm:px-6 sm:pl-[4.5rem]" style={{ opacity: on ? 1 : 0, transition: "opacity .5s var(--ease) .1s" } as CSSProperties}>{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
