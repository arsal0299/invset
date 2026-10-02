import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "../lib/router";
import { Reveal, useMouseVars, useParallax, useTilt } from "../lib/motion";
import { Button, Container, Socials } from "./ui";
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail, Pin, UserIcon } from "./Icons";
import { CurlyArrow, FloatingHearts, HeartFill, HeartLine, PaperPlane, Sparkle } from "./Decor";
import { profile, testimonials, type Project } from "../data/content";
import { img } from "../data/images";

/* ================= Project Card ================= */
export function ProjectCard({ p, className = "", large = false }: { p: Project; className?: string; large?: boolean }) {
  return (
    <Link
      to={`/work/${p.slug}`}
      className={`proj-card group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-white/90 ${className}`}
      data-cursor="hover"
      draggable={false}
    >
      <div className={`relative overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[16/10.5]"} bg-petal`}>
        <img src={p.image} alt={`${p.title} preview`} loading="lazy" decoding="async" draggable={false} className="proj-img h-full w-full object-cover" />
        <div className="proj-overlay absolute inset-0 bg-[linear-gradient(180deg,rgba(233,79,131,0)_30%,rgba(233,79,131,.35))]" />
        <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-rose text-[12px] font-bold text-white shadow-[0_6px_14px_-4px_rgba(233,79,131,.7)]">
          {p.no}
        </span>
        <span className="proj-view absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-[12.5px] font-semibold text-rose backdrop-blur">
          View case study <ArrowUpRight size={14} />
        </span>
      </div>
      <div className="flex flex-1 items-end justify-between gap-4 p-5 sm:p-6">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2.5">
            <h3 className={`${large ? "display text-[28px] sm:text-[34px]" : "text-[16.5px] font-bold"} leading-tight`}>{p.title}</h3>
            <span className="tag">{p.badge}</span>
          </div>
          <p className="text-[14px] leading-relaxed text-muted">{p.summary}</p>
        </div>
        <span className="round-arrow shrink-0">
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}

/* ================= Carousel (drag / wheel / swipe / arrows / dots / inertia) ================= */
export function Carousel({ children, count }: { children: ReactNode; count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(count);
  const moved = useRef(false);

  const itemW = () => {
    const el = ref.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 1;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    return first.offsetWidth + gap;
  };

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const w = itemW();
    const visible = Math.max(1, Math.round(el.clientWidth / w));
    setPages(Math.max(1, count - visible + 1));
    setActive(Math.round(el.scrollLeft / w));
  }, [count]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    // Vertical wheel keeps scrolling the page smoothly (Lenis);
    // horizontal trackpad swipes scroll the carousel natively.

    // mouse drag with inertia
    let down = false, startX = 0, startScroll = 0, lastX = 0, lastT = 0, v = 0, mraf = 0;
    const pd = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      cancelAnimationFrame(mraf);
      down = true;
      moved.current = false;
      startX = lastX = e.clientX;
      startScroll = el.scrollLeft;
      lastT = performance.now();
      v = 0;
    };
    const pm = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved.current && Math.abs(dx) > 5) {
        moved.current = true;
        el.classList.add("is-dragging");
      }
      if (!moved.current) return;
      el.scrollLeft = startScroll - dx;
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      v = 0.8 * ((e.clientX - lastX) / dt) + 0.2 * v;
      lastX = e.clientX;
      lastT = now;
    };
    const pu = () => {
      if (!down) return;
      down = false;
      if (!moved.current) return;
      let vel = v * 16;
      const glide = () => {
        vel *= 0.94;
        el.scrollLeft -= vel;
        if (Math.abs(vel) > 0.4) mraf = requestAnimationFrame(glide);
        else {
          const w = itemW();
          el.scrollTo({ left: Math.round(el.scrollLeft / w) * w, behavior: "smooth" });
          window.setTimeout(() => el.classList.remove("is-dragging"), 450);
        }
      };
      mraf = requestAnimationFrame(glide);
    };
    el.addEventListener("pointerdown", pd);
    window.addEventListener("pointermove", pm);
    window.addEventListener("pointerup", pu);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);

      el.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointermove", pm);
      window.removeEventListener("pointerup", pu);
      cancelAnimationFrame(mraf);
    };
  }, [measure]);

  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(pages - 1, i));
    el.scrollTo({ left: clamped * itemW(), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="carousel no-scrollbar -mx-5 flex scroll-pl-5 gap-5 overflow-x-auto px-5 pb-8 pt-2 sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:mx-0 lg:scroll-pl-0 lg:px-0"
        onClickCapture={(e) => {
          if (moved.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
      >
        {children}
      </div>
      <button
        onClick={() => go(active - 1)}
        aria-label="Previous"
        disabled={active === 0}
        className="absolute -left-5 top-[38%] hidden h-11 w-11 place-items-center rounded-full bg-rose text-white shadow-[0_10px_24px_-8px_rgba(233,79,131,.8)] transition-all duration-500 hover:scale-110 disabled:opacity-40 lg:grid xl:-left-7"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        onClick={() => go(active + 1)}
        aria-label="Next"
        disabled={active >= pages - 1}
        className="absolute -right-5 top-[38%] hidden h-11 w-11 place-items-center rounded-full bg-rose text-white shadow-[0_10px_24px_-8px_rgba(233,79,131,.8)] transition-all duration-500 hover:scale-110 disabled:opacity-40 lg:grid xl:-right-7"
      >
        <ArrowRight size={18} />
      </button>
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-7 bg-rose" : "w-2 bg-blush/70 hover:bg-blush"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ================= Testimonial ================= */
export function Testimonial() {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(false);
  const t = testimonials[i];
  useEffect(() => {
    const id = window.setInterval(() => change((i + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);
  const change = (n: number) => {
    setFade(true);
    window.setTimeout(() => {
      setI(n);
      setFade(false);
    }, 380);
  };
  return (
    <Reveal variant="clip" className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(100deg,#FCE3EB_0%,#FBDDE7_50%,#FDEAF0_100%)] px-6 py-10 sm:px-12 sm:py-12">
      <div className="dots absolute right-8 top-1/2 hidden h-16 w-20 -translate-y-1/2 opacity-60 md:block" />
      <div className="dots absolute -left-2 bottom-4 h-10 w-16 opacity-40" />
      <FloatingHearts count={4} className="opacity-60" />
      <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr_auto] md:gap-10">
        <span className="display select-none text-[110px] leading-[0.6] text-rose sm:text-[150px]" aria-hidden>
          “
        </span>
        <blockquote
          className="max-w-xl text-[16px] leading-[1.75] text-ink/85 transition-all duration-500 sm:text-[17px]"
          style={{ opacity: fade ? 0 : 1, transform: fade ? "translateY(8px)" : "none", filter: fade ? "blur(4px)" : "none" }}
        >
          {t.quote} <Sparkle size={14} className="inline text-rose" />
        </blockquote>
        <div className="flex items-center gap-5 transition-opacity duration-500" style={{ opacity: fade ? 0 : 1 }}>
          <div className="float relative">
            <div className="absolute -inset-2 rounded-full bg-white/60 blur-md" />
            <img src={t.avatar} alt={t.name} loading="lazy" className="relative h-20 w-20 rounded-full object-cover ring-4 ring-white sm:h-24 sm:w-24" />
            <HeartFill size={18} className="absolute -right-1 top-0 text-rose" />
          </div>
          <div>
            <p className="flex items-center gap-2 font-bold"><span className="h-px w-5 bg-ink" />{t.name}</p>
            <p className="mt-1 text-[13.5px] text-muted">{t.role}</p>
            <p className="text-[13.5px] text-muted">{t.company}</p>
            <div className="mt-3 flex gap-1.5">
              {testimonials.map((_, n) => (
                <button key={n} onClick={() => change(n)} aria-label={`Testimonial ${n + 1}`} className={`h-1.5 rounded-full transition-all duration-500 ${n === i ? "w-6 bg-rose" : "w-1.5 bg-rose/30"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ================= CTA ================= */
export function CTA() {
  const scene = useMouseVars<HTMLDivElement>();
  const par = useParallax<HTMLDivElement>(-0.06);
  return (
    <section className="py-16 sm:py-20" aria-labelledby="cta-title">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1.35fr] lg:gap-12">
          <div className="relative">
            <Reveal as="h2" id="cta-title" className="display text-[clamp(40px,5.6vw,64px)] leading-[1.02]">
              Let's create
              <br />
              something
              <br />
              <span className="script shine relative inline-block pr-2 text-[1.12em]">amazing</span>
              <br />
              together!
              <HeartLine size={30} className="ml-1 inline-block align-top" delay={700} />
            </Reveal>
            <div className="pointer-events-none absolute right-2 top-2 hidden sm:block lg:-right-8">
              <Reveal variant="fade" delay={400}><PaperPlane size={100} delay={600} /></Reveal>
            </div>
            <Reveal delay={200} className="mt-8">
              <Button to="/contact">Let's Connect</Button>
            </Reveal>
          </div>

          <div className="hidden h-44 w-px bg-line lg:block" />

          <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center lg:gap-10">
            <Reveal className="space-y-5 text-[14.5px]">
              {[
                { Icon: Mail, text: profile.email, href: `mailto:${profile.email}` },
                { Icon: Pin, text: profile.location },
                { Icon: UserIcon, text: profile.availability },
              ].map(({ Icon, text, href }) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-petal text-rose"><Icon size={17} /></span>
                  {href ? <a href={href} className="link-u">{text}</a> : <span className="max-w-[170px]">{text}</span>}
                </div>
              ))}
              <Socials className="pt-2" />
            </Reveal>

            <div ref={scene} className="relative">
              <Reveal variant="mask" className="relative overflow-hidden rounded-[28px] shadow-[var(--shadow-lift)]">
                <div ref={par} className="-my-8">
                  <img src={img.ctaDesk} alt="Muhammad Arslan portrait" loading="lazy" className="h-[300px] w-full scale-110 object-cover sm:h-[340px]" />
                </div>
                <FloatingHearts count={5} />
              </Reveal>
              <div className="mx-layer absolute -left-4 -top-6 sm:-left-8" style={{ "--depth": 18 } as CSSProperties}>
                <div className="float-alt rotate-[-6deg] rounded-md bg-[#FFE3EC] px-4 py-3 shadow-[0_14px_30px_-12px_rgba(214,59,112,.45)]">
                  <p className="hand text-[20px] leading-[1.05] text-rose">
                    focus
                    <br />
                    plan
                    <br />
                    execute
                    <br />
                    succeed <HeartFill size={11} className="inline" />
                  </p>
                </div>
              </div>
              <div className="mx-layer absolute -bottom-4 right-6" style={{ "--depth": -14 } as CSSProperties}>
                <div className="float rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-rose shadow-[var(--shadow-soft)]">
                  <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-400 align-middle" /> {profile.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ================= Inner page hero ================= */
export function PageHero({
  eyebrow,
  title,
  highlight = [],
  text,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  highlight?: string[];
  text?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const lines = title.split("\n");
  let k = 0;
  const mx = useMouseVars<HTMLDivElement>();
  return (
    <section ref={mx} className="is-in relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
      <div className="mx-layer pointer-events-none absolute right-[8%] top-28 hidden sm:block" style={{ "--depth": 16 } as CSSProperties}>
        <Sparkle size={22} className="twinkle text-blush" />
      </div>
      <div className="mx-layer pointer-events-none absolute left-[46%] top-40 hidden md:block" style={{ "--depth": -12 } as CSSProperties}>
        <HeartLine size={26} delay={900} />
      </div>
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(247,182,200,.55),transparent)]" />
      <Container className="relative">
        <div className={`grid items-end gap-10 ${aside ? "lg:grid-cols-[1.3fr_1fr]" : ""}`}>
          <div>
            <span className="pill enter" style={{ "--d": "100ms" } as CSSProperties}>
              <HeartFill size={12} className="text-rose" /> {eyebrow}
            </span>
            <h1 className="display mt-6 text-[clamp(42px,7vw,88px)] leading-[1]">
              {lines.map((line, li) => (
                <span key={li} className="block">
                  {line.split(" ").map((w, wi) => {
                    const clean = w.replace(/[.,!?]/g, "");
                    const hl = highlight.includes(clean);
                    return (
                      <span key={wi} className="hero-word">
                        <span style={{ "--d": `${250 + k++ * 70}ms` } as CSSProperties} className={hl ? "italic text-rose" : ""}>
                          {w}
                          {wi < line.split(" ").length - 1 ? "\u00A0" : ""}
                        </span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>
            {text && (
              <p className="enter mt-6 max-w-xl text-[17px] leading-relaxed text-muted" style={{ "--d": "700ms" } as CSSProperties}>
                {text}
              </p>
            )}
            {children && <div className="enter mt-8" style={{ "--d": "850ms" } as CSSProperties}>{children}</div>}
          </div>
          {aside && <div className="enter enter-3d" style={{ "--d": "500ms" } as CSSProperties}>{aside}</div>}
        </div>
      </Container>
    </section>
  );
}

/* ================= Tilt card wrapper ================= */
export function TiltCard({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useTilt<HTMLDivElement>(max);
  return (
    <div ref={ref} className={`tilt relative ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 [.tilt:hover>&]:opacity-100"
        style={{ background: "radial-gradient(300px circle at var(--px,50%) var(--py,50%), rgba(255,255,255,.55), transparent 60%)" }}
      />
      {children}
    </div>
  );
}

export { CurlyArrow };
