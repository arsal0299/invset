import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "../lib/router";
import { Reveal, SplitText, useParallax } from "../lib/motion";
import { Button, Container } from "../components/ui";
import { TiltCard } from "../components/sections";
import { Stats } from "../components/blocks";
import { ArrowLeft, ArrowUpRight, Check } from "../components/Icons";
import { HeartFill, Sparkle } from "../components/Decor";
import { projects } from "../data/content";
import NotFound from "./NotFound";

export default function ProjectDetail({ slug }: { slug: string }) {
  const idx = projects.findIndex((p) => p.slug === slug);
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const par = useParallax<HTMLDivElement>(-0.12);
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    blocks.current.forEach((b) => b && obs.observe(b));
    return () => obs.disconnect();
  }, [slug]);

  if (!p) return <NotFound />;

  const story = [
    { k: "Overview", v: p.overview },
    { k: "The challenge", v: p.challenge },
    { k: "The solution", v: p.solution },
  ];
  const gallery = [p.image, projects[(idx + 2) % projects.length].image, projects[(idx + 3) % projects.length].image];

  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-8 sm:pt-12">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(247,182,200,.55),transparent)]" />
        <Container className="relative">
          <Link to="/work" className="enter group inline-flex items-center gap-2 text-[14px] font-semibold text-muted hover:text-rose" style={{ "--d": "100ms" } as CSSProperties}>
            <ArrowLeft size={16} className="transition-transform duration-500 group-hover:-translate-x-1" /> All work
          </Link>
          <div className="enter mt-6 flex flex-wrap items-center gap-3" style={{ "--d": "200ms" } as CSSProperties}>
            <span className="tag">{p.category}</span>
            <span className="tag !bg-white !text-ink ring-1 ring-line">{p.badge}</span>
            <span className="text-[13px] text-muted">Case study · {p.no}</span>
          </div>
          <h1 className="display mt-5 max-w-4xl text-[clamp(46px,8vw,104px)] leading-[0.98]">
            {p.title.split(" ").map((w, i) => (
              <span key={i} className="hero-word">
                <span style={{ "--d": `${300 + i * 90}ms` } as CSSProperties} className={i === p.title.split(" ").length - 1 ? "italic text-rose" : ""}>
                  {w}&nbsp;
                </span>
              </span>
            ))}
          </h1>
          <p className="enter mt-6 max-w-2xl text-[18px] leading-relaxed text-muted" style={{ "--d": "650ms" } as CSSProperties}>{p.summary}</p>
          <dl className="enter mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4" style={{ "--d": "800ms" } as CSSProperties}>
            {[
              ["Client", p.client],
              ["Role", p.role],
              ["Timeline", p.duration],
              ["Year", p.year],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-2 text-[16px] font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="enter enter-scale relative overflow-hidden rounded-[32px] shadow-[var(--shadow-lift)]" style={{ "--d": "900ms" } as CSSProperties}>
            <div ref={par} className="-my-16">
              <img src={p.image} alt={`${p.title} hero visual`} className="aspect-[16/9] w-full scale-110 object-cover" />
            </div>
            <div className="absolute bottom-5 left-5 glass rounded-2xl px-4 py-3 sm:bottom-8 sm:left-8">
              <p className="flex items-center gap-2 text-[13px] font-semibold"><HeartFill size={12} className="text-rose" /> {p.results[0].value} {p.results[0].label.toLowerCase()}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* sticky storytelling */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-20">
            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-4">
                {story.map((s, i) => (
                  <div key={s.k} className={`flex items-center gap-4 transition-all duration-500 ${active === i ? "text-ink" : "text-ink/30"}`}>
                    <span className={`h-px transition-all duration-700 ${active === i ? "w-14 bg-rose" : "w-6 bg-current"}`} />
                    <span className="text-[14px] font-semibold tracking-[0.12em] uppercase">{s.k}</span>
                  </div>
                ))}
              </div>
            </aside>
            <div className="space-y-24 sm:space-y-32">
              {story.map((s, i) => (
                <div key={s.k} data-i={i} ref={(el) => { blocks.current[i] = el; }}>
                  <Reveal variant="fade" className="eyebrow mb-4">0{i + 1} — {s.k}</Reveal>
                  <SplitText as="p" text={s.v} className="display text-[clamp(26px,3.2vw,40px)] leading-[1.25]" stagger={18} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* process */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="mb-10 flex items-center gap-3"><h2 className="display text-[clamp(32px,4vw,48px)]">The <span className="italic text-rose">process</span></h2><Sparkle size={16} className="twinkle text-rose" /></Reveal>
          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-[38px] hidden h-px bg-[repeating-linear-gradient(90deg,#F7B6C8_0_6px,transparent_6px_12px)] lg:block" />
            {p.process.map((st, i) => (
              <Reveal key={st.title} delay={i * 120}>
                <TiltCard className="card h-full p-6">
                  <span className="tilt-inner relative grid h-12 w-12 place-items-center rounded-full bg-rose text-[14px] font-bold text-white shadow-[0_10px_20px_-8px_rgba(233,79,131,.8)]">0{i + 1}</span>
                  <h3 className="display mt-5 text-[24px]">{st.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{st.text}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* tech + results */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <p className="eyebrow mb-5">Technologies</p>
              <div className="flex flex-wrap gap-2.5">
                {p.tech.map((t) => (
                  <span key={t} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[14px] font-medium">
                    <Check size={14} className="text-rose" /> {t}
                  </span>
                ))}
              </div>
            </Reveal>
            <div>
              <Reveal className="eyebrow mb-5">Results</Reveal>
              <div className="grid gap-4 sm:grid-cols-3">
                {p.results.map((r, i) => (
                  <Reveal key={r.label} delay={i * 100} className="card p-6 text-center">
                    <p className="display text-[40px] text-rose">{r.value}</p>
                    <p className="mt-1 text-[13px] font-semibold tracking-[0.1em] text-muted uppercase">{r.label}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* gallery */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal variant="mask" className="overflow-hidden rounded-[28px] md:row-span-2">
              <img src={gallery[0]} alt="" loading="lazy" className="h-full min-h-[320px] w-full object-cover transition-transform duration-[1.4s] hover:scale-105" />
            </Reveal>
            <Reveal variant="mask" delay={150} className="overflow-hidden rounded-[28px]">
              <img src={gallery[1]} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-[1.4s] hover:scale-105" />
            </Reveal>
            <Reveal variant="mask" delay={300} className="overflow-hidden rounded-[28px]">
              <img src={gallery[2]} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-[1.4s] hover:scale-105" />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container><Stats items={[{ value: "4", label: "Sprints" }, { value: "36", label: "Screens" }, { value: "120", label: "Components" }, { value: "12", label: "User tests" }]} /></Container>
      </section>

      {/* next project */}
      <section className="py-16">
        <Container>
          <Reveal>
            <Link to={`/work/${next.slug}`} className="proj-card group relative block overflow-hidden rounded-[32px] bg-ink text-white" data-cursor="hover">
              <img src={next.image} alt="" loading="lazy" className="proj-img absolute inset-0 h-full w-full object-cover opacity-45" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,23,26,.85),rgba(233,79,131,.35))]" />
              <div className="relative flex flex-col gap-6 p-8 sm:flex-row sm:items-end sm:justify-between sm:p-14">
                <div>
                  <p className="eyebrow !text-blush">Next project</p>
                  <p className="display mt-3 text-[clamp(38px,6vw,76px)]">{next.title}</p>
                  <p className="mt-2 text-white/70">{next.summary}</p>
                </div>
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-rose transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110">
                  <ArrowUpRight size={24} />
                </span>
              </div>
            </Link>
          </Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/work" variant="outline">Back to all work</Button>
            <Button to="/contact">Start a similar project</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
