import { useEffect, useState, type CSSProperties } from "react";
import { img } from "../data/images";
import { Link, useRouter } from "../lib/router";
import { Reveal, SplitText, useMouseVars, useParallax, useScrollX } from "../lib/motion";
import { Button, Container, MiniTitle, Socials } from "../components/ui";
import { ArrowRight, ArrowUpRight, Download } from "../components/Icons";
import { BooksLine, Bow, CurlyArrow, FloatingHearts, HeartFill, HeartLine, PaperPlane, PlantLine, Sparkle, Swash } from "../components/Decor";
import ServiceIcon from "../components/ServiceIcon";
import { Carousel, ProjectCard } from "../components/sections";
import { categories, profile, projects, services } from "../data/content";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const depth = (n: number) => ({ "--depth": n }) as CSSProperties;

function HeroWord({ w, delay, className = "" }: { w: string; delay: number; className?: string }) {
  return (
    <span className="hero-word">
      <span style={d(delay)} className={className}>{w}</span>
    </span>
  );
}

function Succulent() {
  return (
    <svg viewBox="0 0 120 140" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="leaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7FBF8E" /><stop offset="1" stopColor="#3F8A5A" /></linearGradient>
        <linearGradient id="pot" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFF4F7" /><stop offset="1" stopColor="#F7C3D3" /></linearGradient>
      </defs>
      {[-50, -30, -12, 8, 28, 48].map((r, i) => (
        <path key={i} d="M60 78c-6-18-6-40 0-62 6 22 6 44 0 62Z" fill="url(#leaf)" transform={`rotate(${r} 60 80)`} opacity={0.92} />
      ))}
      <path d="M26 80h68c0 26-12 50-34 50S26 106 26 80Z" fill="url(#pot)" />
      <ellipse cx="60" cy="80" rx="34" ry="6" fill="#F4B3C7" />
      <ellipse cx="46" cy="96" rx="5" ry="10" fill="#fff" opacity=".45" />
    </svg>
  );
}

/* typewriter that cycles through words */
function Typer({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const t = window.setTimeout(
      () => {
        if (!del) {
          const n = w.slice(0, txt.length + 1);
          setTxt(n);
          if (n === w) setDel(true);
        } else {
          const n = w.slice(0, txt.length - 1);
          setTxt(n);
          if (!n) {
            setDel(false);
            setI((v) => v + 1);
          }
        }
      },
      !del && txt === w ? 1500 : del ? 45 : 85
    );
    return () => clearTimeout(t);
  }, [txt, del, i, words]);
  return (
    <span className="text-rose">
      {txt}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-rose" style={{ animation: "blink 1s steps(1) infinite" }} />
    </span>
  );
}

/* rotating circular text badge */
function CircleBadge({ className = "" }: { className?: string }) {
  const text = "full-stack developer • ai engineer • video creator • open for work • ";
  return (
    <div className={`relative grid h-[108px] w-[108px] place-items-center ${className}`}>
      <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <path id="circ" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
        </defs>
        <text fontSize="8.6" fontWeight="700" letterSpacing="2.2" fill="#E94F83" style={{ textTransform: "uppercase", fontFamily: "DM Sans" }}>
          <textPath href="#circ">{text.toUpperCase()}</textPath>
        </text>
      </svg>
      <span className="grid h-12 w-12 place-items-center rounded-full bg-[linear-gradient(180deg,#FF8FB6,#E94F83)] text-white shadow-[0_10px_24px_-8px_rgba(233,79,131,.9)]">
        <HeartFill size={18} className="pulse-soft" />
      </span>
    </div>
  );
}

export function Hero() {
  const { go } = useRouter();
  const scene = useMouseVars<HTMLElement>();
  const visual = useParallax<HTMLDivElement>(-0.08);
  return (
    <section ref={scene} id="home" data-nav="home" className="is-in relative overflow-hidden pt-24 sm:pt-32 lg:min-h-[100svh] lg:pt-28" aria-label="Introduction">
      {/* background washes */}
      <div className="enter enter-fade pointer-events-none absolute inset-0" style={d(0)}>
        <div className="absolute -right-[10%] -top-[10%] h-[90%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(247,182,200,.55),rgba(252,232,238,.3)_60%,transparent)]" />
        <div className="absolute bottom-0 right-0 h-[60%] w-[55%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(250,210,222,.6),transparent_70%)]" />
      </div>

      {/* floating deco */}
      <div className="mx-layer pointer-events-none absolute left-[3%] top-[22%] hidden md:block" style={depth(10)}>
        <Sparkle size={16} className="twinkle text-blush" />
      </div>
      <div className="mx-layer pointer-events-none absolute left-[38%] top-[20%] hidden lg:block" style={depth(-14)}>
        <HeartLine size={30} delay={900} />
      </div>
      <div className="mx-layer pointer-events-none absolute left-[36%] top-[15%] hidden lg:block" style={depth(-8)}>
        <HeartFill size={12} className="float text-blush enter enter-pop" style={d(1200)} />
      </div>
      <div className="mx-layer pointer-events-none absolute right-[30%] top-[13%] hidden lg:block" style={depth(12)}>
        <Sparkle size={20} className="twinkle text-white drop-shadow-[0_0_6px_rgba(233,79,131,.6)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.12fr] lg:gap-4">
          {/* LEFT */}
          <div className="relative z-10 pt-4 lg:pb-24">
            <div className="flex items-center gap-3">
              <span className="pill enter" style={d(200)}>
                <HeartFill size={12} className="text-rose" /> Hey, I'm {profile.first}
              </span>
              <Bow size={32} delay={600} className="enter enter-fade" style={d(500)} />
            </div>

            <h1 className="display mt-6 text-[clamp(44px,6.4vw,76px)] leading-[1.02] sm:mt-7">
              <span className="block">
                <HeroWord w="Turning" delay={350} />{" "}
                <HeroWord w="ideas" delay={420} />{" "}
                <HeroWord w="into" delay={490} />
              </span>
              <span className="relative inline-block">
                <HeroWord w="beautiful" delay={720} className="italic text-rose" />
                <HeroWord w="," delay={760} />
                <Swash className="absolute -bottom-1 left-0 h-3 w-[92%]" delay={1300} />
              </span>
              <span className="block">
                <HeroWord w="digital" delay={600} />{" "}
                <HeroWord w="experiences" delay={670} />
              </span>
            </h1>

            <p className="enter mt-6 max-w-md text-[16.5px] leading-relaxed text-muted sm:text-[17px]" style={d(950)}>
              {profile.intro}
            </p>
            <p className="enter hand mt-2 text-[22px] text-ink/70" style={d(1020)}>
              currently crafting → <Typer words={["dreamy websites", "AI assistants", "design systems", "online stores", "tiny delights ♡"]} />
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="enter enter-scale" style={d(1100)}>
                <Button to="/work">View My Work</Button>
              </div>
              <div className="enter enter-scale" style={d(1180)}>
                <Button to="/resume" variant="outline" icon={<Download size={16} />}>
                  Download CV
                </Button>
              </div>
            </div>

            <p className="enter mt-10 text-[12px] font-bold tracking-[0.16em] uppercase" style={d(1250)}>
              Find me on
            </p>
            <Socials className="mt-4" enter baseDelay={1300} />

            <div className="enter mt-8 grid max-w-md grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-white/60 py-3" style={d(1500)}>
              {[
                ["6+", "Years"],
                ["80+", "Projects"],
                ["🇵🇰", "Toba Tek Singh"],
              ].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="display text-[24px] leading-none text-rose sm:text-[28px]">{v}</p>
                  <p className="mt-1 text-[11px] font-semibold tracking-[0.12em] text-muted uppercase">{l}</p>
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute -right-2 top-[44%] hidden sm:block lg:-right-10">
              <PaperPlane size={96} delay={1500} />
            </div>
            <div className="pointer-events-none absolute bottom-16 left-[58%] hidden opacity-80 lg:block">
              <CurlyArrow size={78} delay={1800} className="rotate-[8deg]" />
            </div>
          </div>

          {/* RIGHT — layered visual */}
          <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
            <div ref={visual}>
              <div className="enter enter-3d relative aspect-[1/0.96]" style={d(450)}>
                {/* back circle */}
                {/* orbit ring with travelling heart */}
                <div className="mx-layer absolute inset-[-1%_-3%_-3%_5%]" style={depth(-4)} aria-hidden>
                  <div className="orbit h-full w-full rounded-full border border-dashed border-rose/25">
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-rose drop-shadow-[0_0_6px_rgba(233,79,131,.6)]"><HeartFill size={14} /></span>
                    <span className="absolute bottom-[8%] left-[6%] h-2.5 w-2.5 rounded-full bg-blush" />
                    <span className="absolute right-[4%] top-[30%] h-2 w-2 rounded-full bg-rose/60" />
                  </div>
                </div>
                <div className="mx-layer absolute inset-[4%_2%_2%_10%]" style={depth(-8)}>
                  <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_40%_35%,#FDEEF3,#F9D3DF_70%,#F6C2D2)] shadow-[inset_0_-30px_60px_rgba(233,79,131,.12)]" />
                </div>
                {/* character */}
                <div className="mx-layer absolute inset-0" style={depth(6)}>
                  <img
                    src={img.heroGirl}
                    alt={`${profile.name}, full-stack developer, AI engineer and digital creator`}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover"
                    style={{
                      WebkitMaskImage: "radial-gradient(ellipse 58% 60% at 52% 50%, #000 62%, transparent 100%)",
                      maskImage: "radial-gradient(ellipse 58% 60% at 52% 50%, #000 62%, transparent 100%)",
                    }}
                  />
                </div>
                {/* neon speech bubble */}
                <div className="mx-layer absolute right-[1%] top-[2%] w-[27%] sm:right-[2%]" style={depth(18)}>
                  <div className="pulse-soft" style={{ animation: "softPulse 3.6s ease-in-out infinite, neonFlicker 8s linear infinite" }}>
                    <div className="relative aspect-[160/226] text-center">
                      <svg viewBox="0 0 160 226" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                        <path
                          d="M32 6h96a26 26 0 0 1 26 26v138a26 26 0 0 1-26 26H78l-30 24 6-24H32A26 26 0 0 1 6 170V32A26 26 0 0 1 32 6Z"
                          fill="rgba(236,96,145,.26)"
                          stroke="#FFE6EF"
                          strokeWidth="4"
                          strokeLinejoin="round"
                          style={{ filter: "drop-shadow(0 0 2px #fff) drop-shadow(0 0 7px #FF7FAE) drop-shadow(0 0 16px #FF4F8B)" }}
                        />
                      </svg>
                      <div className="absolute inset-x-0 top-[9%] bottom-[16%] flex flex-col items-center justify-center">
                      <p className="script neon-text text-[clamp(15px,2.1vw,26px)] leading-[1.15]">
                        plan
                        <br />
                        code
                        <br />
                        create
                        <br />
                        repeat
                      </p>
                      <svg viewBox="0 0 24 24" className="mx-auto mt-1 h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="#FFE6EF" strokeWidth="1.8" style={{ filter: "drop-shadow(0 0 6px #FF6FA0)" }} aria-hidden>
                        <path d="M12 20s-7-4.6-7-9.8C5 7.4 7 5.6 9.3 5.6c1.2 0 2.1.5 2.7 1.4.6-.9 1.5-1.4 2.7-1.4C17 5.6 19 7.4 19 10.2 19 15.4 12 20 12 20Z" />
                      </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* books stack */}
                <div className="mx-layer absolute bottom-[4%] right-[-2%] w-[30%] sm:right-0" style={depth(14)}>
                  <div className="relative">
                    <div className="absolute -top-[88%] right-[14%] w-[62%]">
                      <div className="float-slow"><Succulent /></div>
                    </div>
                    {[
                      { t: "DESIGN", c: "bg-[#F8C9D7]", r: "-rotate-1" },
                      { t: "THE STARTUP WAY", c: "bg-[#F4B3C7]", r: "rotate-1" },
                      { t: "BUILDING IN PUBLIC", c: "bg-[#F9D6E1]", r: "-rotate-[0.5deg]" },
                    ].map((b) => (
                      <div key={b.t} className={`${b.c} ${b.r} mb-0.5 rounded-[5px] px-2 py-[7px] text-center text-[clamp(6.5px,0.95vw,10px)] font-semibold tracking-[0.12em] text-ink/75 shadow-[0_6px_14px_-8px_rgba(214,59,112,.6)]`}>
                        {b.t}
                      </div>
                    ))}
                  </div>
                </div>
                {/* glass status card */}
                <div className="mx-layer absolute bottom-[14%] left-[-2%] hidden sm:block" style={depth(22)}>
                  <div className="float-alt glass rounded-2xl px-4 py-3 shadow-[var(--shadow-soft)]">
                    <p className="flex items-center gap-2 text-[12px] font-semibold">
                      <span className="relative flex h-2 w-2"><span className="absolute inset-0 rounded-full bg-emerald-400" style={{ animation: "ping 1.8s ease-out infinite" }} /><span className="relative h-2 w-2 rounded-full bg-emerald-400" /></span>
                      Open to new projects
                    </p>
                    <p className="hand mt-0.5 text-[17px] text-rose">build · create · inspire ♡</p>
                  </div>
                </div>
                {/* small sticker hearts */}
                <div className="mx-layer absolute left-[14%] top-[16%]" style={depth(-20)}>
                  <HeartFill size={18} className="float text-rose/70" />
                </div>
                <div className="mx-layer absolute left-[4%] top-[42%]" style={depth(26)}>
                  <Sparkle size={14} className="twinkle text-rose" />
                </div>
                {/* rotating badge */}
                <div className="mx-layer absolute left-[2%] top-[4%] hidden md:block" style={depth(-16)}>
                  <div className="enter enter-pop" style={d(1600)}>
                    <CircleBadge />
                  </div>
                </div>
                <FloatingHearts count={5} className="opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* scroll indicator */}
      <button
        onClick={() => go("#work")}
        className="enter absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10.5px] font-bold tracking-[0.2em] text-muted uppercase xl:flex"
        style={d(1900)}
        aria-label="Scroll to projects"
      >
        <span className="relative h-10 w-6 rounded-full border-2 border-rose/40">
          <span className="absolute left-1/2 top-1.5 h-2 w-1 -translate-x-1/2 rounded-full bg-rose" style={{ animation: "scrollDot 1.8s var(--ease) infinite" }} />
        </span>
        scroll
      </button>
    </section>
  );
}

export function WhatIDo() {
  const home = services.slice(0, 4);
  return (
    <section data-nav="home" className="relative z-10 -mt-4 pb-16 sm:pb-20 lg:-mt-16" aria-labelledby="what-title">
      <Container>
        <Reveal variant="blur" className="card relative overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_2.6fr] lg:gap-0">
            <div className="relative lg:pr-10">
              <div className="mb-4 flex items-center gap-2">
                <span className="eyebrow" id="what-title">What I do</span>
                <HeartLine size={14} delay={300} />
              </div>
              <h2 className="display relative inline-block text-[clamp(30px,3.2vw,38px)] leading-[1.2]">
                <SplitText
                  text={"I design, develop\nand automate\ndigital solutions\nthat make impact."}
                  highlight={["impact"]}
                  highlightClass="script text-[1.14em] text-rose"
                  stagger={55}
                />
                <HeartLine size={22} className="absolute -right-7 bottom-2" delay={1100} />
              </h2>
              <div className="mt-8 hidden items-end gap-1 lg:flex">
                <PlantLine size={62} delay={500} />
                <BooksLine size={64} delay={900} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {home.map((s, i) => (
                <Reveal key={s.id} delay={120 * i} className="relative lg:border-l lg:border-line">
                  <Link
                    to="#services"
                    className="svc-card spot group relative flex h-full items-start gap-5 overflow-hidden rounded-3xl border border-line bg-white/60 p-5 text-left sm:flex-col sm:items-center sm:text-center lg:mx-2 lg:border-transparent lg:bg-transparent lg:px-4 lg:py-6"
                    data-cursor="hover"
                  >
                    <span className="svc-deco absolute right-4 top-4"><Sparkle size={14} className="text-rose" /></span>
                    {[0, 1, 2].map((h) => (
                      <span key={h} className="svc-heart absolute bottom-16 text-rose" style={{ left: `${30 + h * 20}%`, "--d": `${h * 400}ms`, "--dx": `${(h - 1) * 18}px` } as CSSProperties}>
                        <HeartFill size={8 + h * 2} />
                      </span>
                    ))}
                    <div className="svc-icon shrink-0">
                      <ServiceIcon name={s.icon} size={64} />
                    </div>
                    <div>
                      <h3 className="flex items-center gap-2 text-[15.5px] font-bold sm:justify-center sm:mt-3">
                        {s.title}
                        <span className="h-1.5 w-1.5 rounded-full bg-rose transition-transform duration-500 group-hover:scale-150" />
                      </h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{s.short}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

type Cat = (typeof categories)[number];

export function Projects() {
  const [cat, setCat] = useState<Cat>("All");
  const [list, setList] = useState(projects);
  const [out, setOut] = useState(false);
  const [gen, setGen] = useState(0);
  const featured = projects.find((p) => p.featured)!;

  const change = (c: Cat) => {
    if (c === cat) return;
    setCat(c);
    setOut(true);
    window.setTimeout(() => {
      setList(c === "All" ? projects : projects.filter((p) => p.category === c));
      setGen((g) => g + 1);
      setOut(false);
    }, 360);
  };

  return (
    <section id="work" data-nav="work" className="relative scroll-mt-24 pb-16 sm:pb-20" aria-label="Projects">
      <BigWord text="work" />
      <Container className="relative">
        <MiniTitle
          action={
            <Link to="#case-studies" className="group inline-flex items-center gap-3 text-[14px] font-semibold text-rose">
              <span className="link-u hidden sm:inline">Featured case study</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-rose text-white transition-transform duration-500 group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </Link>
          }
        >
          My Projects
        </MiniTitle>

        {/* filter chips */}
        <Reveal className="no-scrollbar -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => change(c)}
              aria-pressed={cat === c}
              className={`relative whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-500 ${
                cat === c ? "border-rose bg-rose text-white shadow-[0_8px_20px_-8px_rgba(233,79,131,.8)]" : "border-line bg-white/70 text-ink/70 hover:-translate-y-0.5 hover:border-blush hover:text-rose"
              }`}
            >
              {c}
              <span className="ml-1.5 text-[10.5px] opacity-60">{c === "All" ? projects.length : projects.filter((p) => p.category === c).length}</span>
            </button>
          ))}
        </Reveal>

        <Reveal variant="right">
          <div key={gen}>
            {list.length === 0 ? (
              <p className="py-16 text-center text-muted">New projects blooming here soon ♡</p>
            ) : (
              <Carousel count={list.length}>
                {list.map((p, i) => (
                  <div
                    key={p.slug}
                    className={`filter-item w-[84%] shrink-0 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.34px)] ${out ? "is-out" : "is-enter"}`}
                    style={{ "--d": `${i * 70}ms` } as CSSProperties}
                  >
                    <ProjectCard p={p} />
                  </div>
                ))}
              </Carousel>
            )}
          </div>
        </Reveal>

        {/* featured case study */}
        <div id="case-studies" className="mt-14">
          <Reveal variant="mask">
            <Link to={`/work/${featured.slug}`} className="proj-card spot group relative block overflow-hidden rounded-[32px] border border-line bg-white" data-cursor="hover">
              <div className="grid lg:grid-cols-[1.35fr_1fr]">
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
                  <img src={featured.image} alt={featured.title} loading="lazy" className="proj-img absolute inset-0 h-full w-full object-cover" />
                  <div className="proj-overlay absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(233,79,131,.25))]" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-bold tracking-[0.12em] text-rose uppercase backdrop-blur">★ Featured case study</span>
                </div>
                <div className="relative flex flex-col justify-between gap-8 p-7 sm:p-10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="tag">{featured.category}</span>
                      <span className="text-[13px] text-muted">{featured.client} · {featured.year}</span>
                    </div>
                    <h3 className="display mt-4 text-[clamp(32px,3.6vw,48px)] leading-[1.05]">{featured.title}</h3>
                    <p className="mt-4 text-[15.5px] leading-relaxed text-muted">{featured.challenge}</p>
                  </div>
                  <div>
                    <div className="grid grid-cols-3 gap-3 border-t border-line pt-6">
                      {featured.results.map((r) => (
                        <div key={r.label}>
                          <p className="display text-[26px] text-rose sm:text-[30px]">{r.value}</p>
                          <p className="text-[12px] text-muted">{r.label}</p>
                        </div>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-3 text-[14px] font-semibold text-rose">
                      Read the full story <span className="round-arrow"><ArrowUpRight size={16} /></span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* giant outlined word drifting horizontally with scroll */
export function BigWord({ text, className = "" }: { text: string; className?: string }) {
  const ref = useScrollX<HTMLDivElement>(0.22);
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 -top-6 overflow-hidden ${className}`}>
      <div ref={ref} className="big-word whitespace-nowrap text-center">
        {text} · {text}
      </div>
    </div>
  );
}

export function Marquee() {
  const a = ["Web Development", "UI/UX Design", "AI Automation", "Creative Code", "E-Commerce", "Motion Design"];
  const b = ["pixel perfect", "made with love", "soft & calm", "fast by default", "accessible", "delightful"];
  const Row = ({ words, reverse, outline }: { words: string[]; reverse?: boolean; outline?: boolean }) => (
    <div className="marquee-row flex w-max" style={{ animation: `marquee ${reverse ? 46 : 38}s linear infinite ${reverse ? "reverse" : ""}` }}>
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center">
          {words.map((w) => (
            <span key={w + k} className="flex items-center gap-8 px-8">
              <span className={outline ? "script text-[30px] text-rose/80 sm:text-[38px]" : "display text-[28px] italic text-ink/80 sm:text-[36px]"}>{w}</span>
              {outline ? <HeartFill size={12} className="text-blush" /> : <Sparkle size={16} className="text-rose" />}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
  return (
    <div className="marquee relative -rotate-[1.2deg] overflow-hidden border-y border-line bg-white/60 py-4 backdrop-blur-sm" aria-hidden>
      <Row words={a} />
      <div className="mt-1"><Row words={b} reverse outline /></div>
    </div>
  );
}
