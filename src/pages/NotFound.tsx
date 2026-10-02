import { useState, type CSSProperties } from "react";
import { useMouseVars } from "../lib/motion";
import { Button, Container } from "../components/ui";
import { CurlyArrow, FloatingHearts, HeartFill, PaperPlane, Sparkle } from "../components/Decor";

export default function NotFound() {
  const mx = useMouseVars<HTMLElement>();
  const [bursts, setBursts] = useState<number[]>([]);
  const burst = () => {
    const id = Date.now();
    setBursts((b) => [...b, id]);
    window.setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1100);
  };
  return (
    <section ref={mx} className="is-in relative grid min-h-[100svh] place-items-center overflow-hidden pb-16 pt-32">
      <FloatingHearts count={10} />
      <div className="mx-layer absolute left-[12%] top-[26%]" style={{ "--depth": 24 } as CSSProperties}><Sparkle size={22} className="twinkle text-blush" /></div>
      <div className="mx-layer absolute right-[14%] top-[30%] hidden sm:block" style={{ "--depth": -20 } as CSSProperties}><PaperPlane size={120} delay={600} /></div>
      <div className="mx-layer absolute bottom-[18%] left-[16%] hidden sm:block" style={{ "--depth": 16 } as CSSProperties}><CurlyArrow size={90} delay={900} /></div>
      <Container className="relative text-center">
        <p className="pill enter mx-auto" style={{ "--d": "100ms" } as CSSProperties}><HeartFill size={12} className="text-rose" /> Error 404</p>
        <h1 className="display mt-6 flex items-center justify-center text-[clamp(120px,24vw,280px)] leading-none" aria-label="404">
          <span className="hero-word"><span style={{ "--d": "250ms" } as CSSProperties}>4</span></span>
          <button onClick={burst} aria-label="Click the heart" className="enter enter-pop relative mx-2 text-rose" style={{ "--d": "500ms" } as CSSProperties} data-cursor="hover">
            <HeartFill size={0} className="pulse-soft h-[0.78em] w-[0.78em] drop-shadow-[0_20px_40px_rgba(233,79,131,.45)]" />
            {bursts.map((id) =>
              Array.from({ length: 12 }).map((_, i) => {
                const a = (i / 12) * Math.PI * 2;
                return (
                  <span key={`${id}-${i}`} className="pointer-events-none absolute left-1/2 top-1/2 text-rose" style={{ "--x": `${Math.cos(a) * 160}px`, "--y": `${Math.sin(a) * 160}px`, "--r": `${i * 30}deg`, animation: "burst 1s var(--ease) forwards" } as CSSProperties}>
                    <HeartFill size={18 + (i % 3) * 6} />
                  </span>
                );
              })
            )}
          </button>
          <span className="hero-word"><span style={{ "--d": "350ms" } as CSSProperties}>4</span></span>
        </h1>
        <h2 className="display enter mt-2 text-[clamp(28px,4vw,44px)]" style={{ "--d": "700ms" } as CSSProperties}>
          This page flew <span className="script text-rose">away</span>
        </h2>
        <p className="enter mx-auto mt-4 max-w-md text-[16.5px] text-muted" style={{ "--d": "800ms" } as CSSProperties}>
          It might have been moved, renamed or simply wandered off to find a better coffee. Tap the heart while you're here ♡
        </p>
        <div className="enter mt-8 flex flex-wrap justify-center gap-3" style={{ "--d": "950ms" } as CSSProperties}>
          <Button to="/">Take me home</Button>
          <Button to="/work" variant="outline">See my work</Button>
        </div>
      </Container>
    </section>
  );
}
