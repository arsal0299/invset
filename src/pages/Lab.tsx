import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Reveal, isTouch, prefersReduced } from "../lib/motion";
import { Container } from "../components/ui";
import { CTA, PageHero } from "../components/sections";
import { HeartFill, Sparkle } from "../components/Decor";

function Exp({ no, title, hint, children, className = "" }: { no: string; title: string; hint: string; children: ReactNode; className?: string }) {
  return (
    <Reveal variant="scale" className={`card group relative flex flex-col overflow-hidden !rounded-[30px] ${className}`}>
      <div className="relative flex-1 overflow-hidden">{children}</div>
      <div className="flex items-center justify-between gap-3 border-t border-line bg-white/70 px-5 py-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.16em] text-rose uppercase">Exp {no}</p>
          <p className="display text-[20px] leading-tight">{title}</p>
        </div>
        <p className="hand text-right text-[17px] text-muted">{hint}</p>
      </div>
    </Reveal>
  );
}

/* 01 — generative petals canvas */
function PetalField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const N = isTouch() ? 60 : 140;
    const mouse = { x: -999, y: -999 };
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; s: number; hue: number };
    let ps: P[] = [];
    const resize = () => {
      const r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = (x = Math.random() * w, y = Math.random() * h): P => ({ x, y, vx: 0, vy: 0, r: 2 + Math.random() * 5, a: Math.random() * Math.PI * 2, s: 0.3 + Math.random() * 0.7, hue: Math.random() });
    resize();
    ps = Array.from({ length: N }, () => spawn());
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        const ang = Math.sin(p.x * 0.006 + t * 0.0003) * 2 + Math.cos(p.y * 0.005 - t * 0.0002) * 2;
        p.vx += Math.cos(ang) * 0.03 * p.s;
        p.vy += Math.sin(ang) * 0.03 * p.s + 0.004;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 12000) { const f = (12000 - d2) / 12000; p.vx += (dx / Math.sqrt(d2 + 1)) * f * 0.9; p.vy += (dy / Math.sqrt(d2 + 1)) * f * 0.9; }
        p.vx *= 0.95; p.vy *= 0.95;
        p.x += p.vx; p.y += p.vy; p.a += 0.01 + p.vx * 0.02;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        ctx.fillStyle = p.hue > 0.7 ? "rgba(233,79,131,.75)" : p.hue > 0.35 ? "rgba(247,182,200,.85)" : "rgba(252,210,224,.9)";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r * 1.6, p.r, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };
    if (!prefersReduced()) raf = requestAnimationFrame(draw); else draw(0);
    const move = (e: PointerEvent) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const leave = () => { mouse.x = mouse.y = -999; };
    const click = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      for (let i = 0; i < 16; i++) { const p = spawn(e.clientX - r.left, e.clientY - r.top); const a = (i / 16) * Math.PI * 2; p.vx = Math.cos(a) * 5; p.vy = Math.sin(a) * 5; ps.push(p); }
      if (ps.length > N + 120) ps.splice(0, 16);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerleave", leave);
    c.addEventListener("pointerdown", click);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <div className="relative h-[340px] bg-[radial-gradient(circle_at_50%_40%,#FFF6F9,#FCE3EB)] sm:h-[420px]">
      <canvas ref={ref} className="absolute inset-0 h-full w-full touch-none" />
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <p className="script text-[64px] text-rose/90 drop-shadow-[0_4px_20px_rgba(255,255,255,.9)] sm:text-[88px]">bloom</p>
      </div>
    </div>
  );
}

/* 02 — 3D cube following pointer */
function Cube() {
  const box = useRef<HTMLDivElement>(null);
  const cube = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const b = box.current!, c = cube.current!;
    let tx = -20, ty = 35, x = tx, y = ty, raf = 0, auto = true;
    const move = (e: PointerEvent) => { auto = false; const r = b.getBoundingClientRect(); ty = ((e.clientX - r.left) / r.width - 0.5) * 180; tx = -((e.clientY - r.top) / r.height - 0.5) * 180; };
    const leave = () => (auto = true);
    let visible = false;
    const loop = () => {
      if (!visible) { raf = 0; return; }
      if (auto) ty += 0.3;
      x += (tx - x) * 0.08; y += (ty - y) * 0.08;
      c.style.transform = `rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !prefersReduced()) raf = requestAnimationFrame(loop);
    });
    io.observe(b);
    b.addEventListener("pointermove", move);
    b.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
  const faces = [
    { t: "rotateY(0deg)", l: "code" },
    { t: "rotateY(90deg)", l: "design" },
    { t: "rotateY(180deg)", l: "create" },
    { t: "rotateY(-90deg)", l: "repeat" },
    { t: "rotateX(90deg)", l: "♡" },
    { t: "rotateX(-90deg)", l: "✦" },
  ];
  return (
    <div ref={box} className="grid h-[300px] place-items-center bg-[linear-gradient(160deg,#FFF6F9,#FBDDE7)]" style={{ perspective: "900px" }}>
      <div ref={cube} className="relative h-32 w-32" style={{ transformStyle: "preserve-3d" }}>
        {faces.map((f) => (
          <div
            key={f.l}
            className="absolute inset-0 grid place-items-center rounded-2xl border border-white/80 text-[22px] backdrop-blur-sm"
            style={{ transform: `${f.t} translateZ(64px)`, background: "linear-gradient(135deg,rgba(255,255,255,.65),rgba(247,182,200,.55))", boxShadow: "inset 0 0 30px rgba(233,79,131,.25)" }}
          >
            <span className="script text-rose">{f.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 03 — dot matrix cursor field */
function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0, h = 0, raf = 0, mx = -999, my = -999, sx = mx, sy = my, visible = true;
    const resize = () => { const r = c.getBoundingClientRect(); w = r.width; h = r.height; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      sx += (mx - sx) * 0.15; sy += (my - sy) * 0.15;
      ctx.clearRect(0, 0, w, h);
      const gap = 22;
      for (let x = gap / 2; x < w; x += gap) for (let y = gap / 2; y < h; y += gap) {
        const d = Math.hypot(x - sx, y - sy);
        const f = Math.max(0, 1 - d / 120);
        const wave = mx < -500 ? (Math.sin(x * 0.04 + y * 0.03 + t * 0.002) + 1) * 0.25 : 0;
        const r = 1.4 + f * 5 + wave * 2;
        ctx.fillStyle = f > 0.05 ? `rgba(233,79,131,${0.35 + f * 0.65})` : `rgba(247,182,200,${0.5 + wave})`;
        ctx.beginPath(); ctx.arc(x - (x - sx) * f * 0.15, y - (y - sy) * f * 0.15, r, 0, Math.PI * 2); ctx.fill();
      }
    };
    raf = requestAnimationFrame(loop);
    const move = (e: PointerEvent) => { const r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const leave = () => { mx = my = -999; };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerleave", leave);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="h-[300px] w-full touch-none bg-white/60" />;
}

/* 04 — morphing blob */
function Blob() {
  return (
    <div className="relative grid h-[300px] place-items-center overflow-hidden bg-[#FFF6F9]">
      <div className="blob h-48 w-48 transition-transform duration-700 group-hover:scale-110" style={{ background: "linear-gradient(120deg,#FFB3CB,#E94F83,#F7B6C8,#FFD6E3)", backgroundSize: "300% 300%", animation: "blob 8s ease-in-out infinite, gradientMove 6s ease infinite", boxShadow: "0 30px 60px -20px rgba(233,79,131,.6), inset 0 -20px 40px rgba(255,255,255,.35)" }} />
      <div className="blob absolute h-24 w-24 translate-x-20 -translate-y-16 opacity-60 blur-md" style={{ background: "#F7B6C8", animationDelay: "-3s" }} />
      <span className="absolute script text-[34px] text-white drop-shadow">soft</span>
    </div>
  );
}

/* 05 — kinetic type */
function Kinetic() {
  const word = "delightful";
  return (
    <div className="grid h-[300px] place-items-center bg-[linear-gradient(160deg,#FCE8EE,#fff)] px-4">
      <p className="display flex select-none text-[clamp(40px,7vw,64px)] italic" aria-label={word}>
        {word.split("").map((ch, i) => (
          <span key={i} aria-hidden className="inline-block cursor-default transition-all duration-500 hover:-translate-y-4 hover:rotate-[-10deg] hover:scale-125 hover:text-rose" style={{ transitionTimingFunction: "var(--ease-bounce)" }}>
            {ch}
          </span>
        ))}
      </p>
    </div>
  );
}

/* 06 — like button */
function Like() {
  const [n, setN] = useState(248);
  const [liked, setLiked] = useState(false);
  const [bursts, setBursts] = useState<number[]>([]);
  const click = () => {
    setLiked((l) => !l);
    setN((v) => (liked ? v - 1 : v + 1));
    if (!liked) {
      const id = Date.now();
      setBursts((b) => [...b, id]);
      window.setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 900);
    }
  };
  return (
    <div className="grid h-[300px] place-items-center bg-[radial-gradient(circle,#fff,#FCE8EE)]">
      <div className="text-center">
        <button onClick={click} aria-pressed={liked} aria-label="Like" className={`relative grid h-24 w-24 place-items-center rounded-full transition-all duration-500 ${liked ? "scale-110 bg-rose text-white shadow-[0_20px_40px_-12px_rgba(233,79,131,.9)]" : "bg-white text-blush shadow-[var(--shadow-soft)] hover:scale-105"}`} style={{ transitionTimingFunction: "var(--ease-bounce)" }}>
          <HeartFill size={40} />
          {bursts.map((id) => Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <span key={`${id}${i}`} className="pointer-events-none absolute left-1/2 top-1/2 text-rose" style={{ "--x": `${Math.cos(a) * 80}px`, "--y": `${Math.sin(a) * 80}px`, "--r": `${i * 36}deg`, animation: "burst .9s var(--ease) forwards" } as CSSProperties}><HeartFill size={12 + (i % 3) * 4} /></span>;
          }))}
        </button>
        <p className="mt-5 display text-[28px] tabular-nums">{n}</p>
      </div>
    </div>
  );
}

/* 07 — mood slider */
function Mood() {
  const [v, setV] = useState(60);
  const hue = 330 + (v - 50) * 0.4;
  const moods = ["calm", "cozy", "dreamy", "playful", "bold"];
  return (
    <div className="flex h-[300px] flex-col items-center justify-center gap-6 px-8 transition-colors duration-500" style={{ background: `linear-gradient(160deg, hsl(${hue} 100% 97%), hsl(${hue} ${50 + v / 2}% ${88 - v / 5}%))` }}>
      <div className="grid h-24 w-24 place-items-center rounded-full transition-all duration-500" style={{ background: `hsl(${hue} ${60 + v / 3}% ${75 - v / 4}%)`, boxShadow: `0 0 ${v / 2}px hsl(${hue} 90% 70%)`, transform: `scale(${0.8 + v / 250})` }}>
        <Sparkle size={30} className="text-white" />
      </div>
      <p className="script text-[36px] text-ink/80">{moods[Math.min(4, Math.floor(v / 20.01))]}</p>
      <label className="w-full max-w-[260px]">
        <span className="sr-only">Mood</span>
        <input type="range" min={0} max={100} value={v} onChange={(e) => setV(+e.target.value)} className="w-full accent-[#E94F83]" />
      </label>
    </div>
  );
}

export function LabGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <Exp no="01" title="Petal field" hint="move · click to bloom" className="md:col-span-2"><PetalField /></Exp>
      <Exp no="02" title="Glass cube" hint="hover to rotate"><div className="h-full min-h-[300px] sm:min-h-[420px] [&>div]:h-full"><Cube /></div></Exp>
      <Exp no="03" title="Dot matrix" hint="trace with cursor"><DotField /></Exp>
      <Exp no="04" title="Morphing blob" hint="just watch ♡"><Blob /></Exp>
      <Exp no="05" title="Kinetic type" hint="hover each letter"><Kinetic /></Exp>
      <Exp no="06" title="Heart button" hint="tap it"><Like /></Exp>
      <Exp no="07" title="Mood slider" hint="drag to change" className="md:col-span-2"><Mood /></Exp>
    </div>
  );
}

export default function Lab() {
  return (
    <>
      <PageHero
        eyebrow="Creative lab"
        title={"A playground for\nsoft experiments."}
        highlight={["soft", "experiments"]}
        text="Tiny interactive studies in motion, generative art and micro-interactions. Poke, drag, click — everything here wants to be touched."
      />
      <section className="pb-20">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <Exp no="01" title="Petal field" hint="move · click to bloom" className="lg:col-span-2"><PetalField /></Exp>
            <Exp no="02" title="Glass cube" hint="hover to rotate"><div className="h-full min-h-[300px] sm:min-h-[420px] [&>div]:h-full"><Cube /></div></Exp>
            <Exp no="03" title="Dot matrix" hint="trace with cursor"><DotField /></Exp>
            <Exp no="04" title="Morphing blob" hint="just watch ♡"><Blob /></Exp>
            <Exp no="05" title="Kinetic type" hint="hover each letter"><Kinetic /></Exp>
            <Exp no="06" title="Heart button" hint="tap it"><Like /></Exp>
            <Exp no="07" title="Mood slider" hint="drag to change" className="lg:col-span-2"><Mood /></Exp>
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
