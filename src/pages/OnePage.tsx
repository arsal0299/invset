import { useState, type CSSProperties, type FormEvent } from "react";
import { Link } from "../lib/router";
import { Reveal, SplitText, useMouseVars, Parallax } from "../lib/motion";
import { Button, Container, SectionTitle, Socials } from "../components/ui";
import { CTA, TiltCard, Testimonial } from "../components/sections";
import { SkillGroups, Stats, Timeline, ToolCloud } from "../components/blocks";
import ServiceIcon from "../components/ServiceIcon";
import { Calendar, Check, Clock, Download, Mail, Pin, Plus, UserIcon, ArrowUpRight } from "../components/Icons";
import { Flower, FloatingHearts, HeartFill, HeartLine, Sparkle } from "../components/Decor";
import { articles, profile, services } from "../data/content";
import { img } from "../data/images";
import { BigWord, Hero, Marquee, Projects, WhatIDo } from "./Home";
import { LabGrid } from "./Lab";
import { Clients, FAQ, Glance } from "../components/Glance";
import { ArticleCard } from "./Journal";

const d = (n: number) => ({ "--depth": n }) as CSSProperties;

/* ======================= ABOUT ======================= */
function Portrait() {
  const mx = useMouseVars<HTMLDivElement>();
  return (
    <div ref={mx} className="relative mx-auto w-full max-w-[440px]">
      <div className="mx-layer absolute inset-[6%] blob bg-[radial-gradient(circle_at_30%_30%,#FDEEF3,#F7B6C8)]" style={d(-10)} />
      <div className="mx-layer relative aspect-[4/5] overflow-hidden blob shadow-[var(--shadow-lift)]" style={d(6)}>
        <img src={img.aboutPortrait} alt={`Portrait of ${profile.name}`} loading="lazy" className="h-full w-full scale-105 object-cover" />
      </div>
      <div className="mx-layer absolute -left-4 top-[18%]" style={d(20)}>
        <div className="float glass rounded-2xl px-4 py-3 shadow-[var(--shadow-soft)]">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">Based in</p>
          <p className="display text-[18px]">Toba Tek Singh, PK ☀︎</p>
        </div>
      </div>
      <div className="mx-layer absolute -right-2 bottom-[16%]" style={d(-18)}>
        <div className="float-alt rotate-3 rounded-md bg-[#FFE3EC] px-4 py-3 shadow-[0_14px_30px_-12px_rgba(214,59,112,.45)]">
          <p className="hand text-[20px] leading-tight text-rose">coffee · code<br />create · repeat ♡</p>
        </div>
      </div>
      <div className="absolute right-6 top-2"><Sparkle size={20} className="twinkle text-rose" /></div>
      <div className="absolute bottom-2 left-10"><Flower size={30} className="spin-slow" /></div>
    </div>
  );
}

const philosophy = [
  { t: "Soft, not simple", d: "Calm palettes and gentle motion that make complex products feel approachable.", icon: "✿" },
  { t: "Purposeful motion", d: "Every animation answers a question — never decoration for its own sake.", icon: "↻" },
  { t: "Human first", d: "Real people, real problems. Research and empathy lead every decision.", icon: "♡" },
];
const interests = ["Full-stack development", "AI engineering", "Video editing", "Color grading", "Kinetic typography", "Social media growth", "Brand identity", "Graphic design"];

function About() {
  return (
    <section id="about" data-nav="about" className="relative py-20 sm:py-28">
      <BigWord text="about" />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal variant="scale"><Portrait /></Reveal>
          <div>
            <Reveal variant="fade" className="mb-4 flex items-center gap-2">
              <span className="eyebrow">About me</span>
              <HeartLine size={14} delay={250} />
            </Reveal>
            <SplitText as="h2" text={"Developer who creates,\ncreator who ships."} highlight={["creates", "ships"]} highlightClass="italic text-rose" className="display text-[clamp(38px,5.4vw,66px)]" />
            <Reveal delay={200} className="mt-6 space-y-4 text-[16.5px] leading-relaxed text-muted">
              <p>{profile.bio}</p>
              <p>
                My work sits where code, AI and visual storytelling meet: modular middleware and client hubs on the technical side, social media growth and brand identity on the creative side. I care about clean architecture, honest communication and shipping work that performs as well as it looks.
              </p>
              <p className="hand text-[26px] text-rose">— {profile.first} ♡</p>
            </Reveal>
            <Reveal delay={300} className="mt-6 flex flex-wrap gap-2">
              {interests.map((t, i) => (
                <span key={t} className="chip-pop inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-[13px] font-medium" style={{ "--i": i } as CSSProperties}>
                  <HeartFill size={9} className="text-rose" /> {t}
                </span>
              ))}
            </Reveal>
            <Reveal delay={400} className="mt-8 flex flex-wrap gap-3">
              <Button to="#contact">Work with me</Button>
              <Button to="/resume" variant="outline" icon={<Download size={16} />}>View resume</Button>
            </Reveal>
          </div>
        </div>

        <div className="mt-20"><Stats /></div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {philosophy.map((p, i) => (
            <Reveal key={p.t} delay={i * 120}>
              <TiltCard className="card spot h-full p-7 sm:p-8">
                <span className="tilt-inner grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(180deg,#FF9DBE,#E94F83)] text-2xl text-white shadow-[0_12px_24px_-10px_rgba(233,79,131,.8)]">{p.icon}</span>
                <h3 className="display mt-6 text-[28px]">{p.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.d}</p>
                <span className="absolute right-6 top-6 text-[13px] font-bold text-blush">0{i + 1}</span>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" data-nav="about" className="py-16 sm:py-24">
      <Container>
        <SectionTitle eyebrow="My journey" title={"A few chapters\nso far"} highlight={["chapters"]} align="center" className="mb-14">
          From design school to building products used by hundreds of thousands of people.
        </SectionTitle>
        <Timeline />
      </Container>
    </section>
  );
}

const stack = [
  { icon: "code" as const, t: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Vite"] },
  { icon: "pen" as const, t: "Design", items: ["Figma", "Framer", "Spline", "Illustrator", "Rive"] },
  { icon: "bot" as const, t: "AI & Automation", items: ["OpenAI", "LangChain", "n8n", "Make", "Zapier"] },
  { icon: "spark" as const, t: "Creative code", items: ["GSAP", "Three.js", "Canvas", "GLSL", "Lottie"] },
  { icon: "bag" as const, t: "Commerce & CMS", items: ["Shopify", "Sanity", "Contentful", "Stripe", "Webflow"] },
  { icon: "bolt" as const, t: "Infra & perf", items: ["Vercel", "Supabase", "Node", "Cloudflare", "Lighthouse"] },
];

function Skills() {
  return (
    <section id="skills" data-nav="about" className="py-16 sm:py-24">
      <Container>
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-2">
          <SectionTitle eyebrow="Skills & technology" title={"A toolkit for\nbeautiful things"} highlight={["beautiful"]} />
          <Reveal className="text-[16.5px] leading-relaxed text-muted lg:pb-3">
            A blend of design sensibility, engineering rigour and a growing love for automation — always learning, always refining.
          </Reveal>
        </div>
        <SkillGroups />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 110}>
              <TiltCard className="card spot group h-full p-7">
                <div className="tilt-inner transition-transform duration-700 group-hover:-rotate-6" style={{ transitionTimingFunction: "var(--ease-bounce)" }}>
                  <ServiceIcon name={s.icon} size={54} />
                </div>
                <h3 className="display mt-5 text-[26px]">{s.t}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((it, k) => (
                    <span key={it} className="rounded-full bg-petal px-3 py-1 text-[13px] font-medium text-ink/80 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:shadow-sm" style={{ transitionDelay: `${k * 40}ms` }}>{it}</span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="eyebrow mb-5 mt-14">Tools I love</Reveal>
        <ToolCloud />
      </Container>
    </section>
  );
}

/* ======================= SERVICES ======================= */
const steps = [
  { t: "Say hello", d: "A relaxed 30-minute call to understand your goals, audience and timeline." },
  { t: "Shape the plan", d: "A clear proposal with scope, milestones and a fixed price — no surprises." },
  { t: "Design & build", d: "Weekly check-ins, shared Figma files and live previews as we go." },
  { t: "Launch & care", d: "A smooth launch, handover docs and 30 days of post-launch support." },
];

function Services() {
  const [open, setOpen] = useState<string | null>(services[0].id);
  return (
    <section id="services" data-nav="services" className="relative py-20 sm:py-28">
      <BigWord text="services" />
      <Container className="relative">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-2">
          <SectionTitle eyebrow="Services" title={"Everything you need\nto shine online"} highlight={["shine"]} />
          <Reveal className="text-[16.5px] leading-relaxed text-muted lg:pb-3">
            From the first sketch to the final deploy — thoughtful design, clean engineering and a little automation magic. Tap a service to see what's inside.
          </Reveal>
        </div>
        <div className="space-y-4">
          {services.map((s, i) => {
            const isOpen = open === s.id;
            return (
              <Reveal key={s.id} delay={i * 60}>
                <div className={`card spot overflow-hidden transition-all duration-700 ${isOpen ? "!bg-white shadow-[var(--shadow-lift)]" : "hover:-translate-y-1"}`}>
                  <button onClick={() => setOpen(isOpen ? null : s.id)} aria-expanded={isOpen} className="group flex w-full items-center gap-4 p-5 text-left sm:gap-6 sm:p-7">
                    <span className="hidden text-[13px] font-bold text-rose sm:block">{s.no}</span>
                    <span className={`shrink-0 transition-transform duration-700 ${isOpen ? "-rotate-6 scale-110" : "group-hover:-translate-y-1"}`} style={{ transitionTimingFunction: "var(--ease-bounce)" }}>
                      <ServiceIcon name={s.icon} size={52} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="display block text-[23px] sm:text-[32px]">{s.title}</span>
                      <span className="mt-1 block text-[14px] text-muted">{s.short}</span>
                    </span>
                    <span className="hidden text-[14px] font-semibold text-rose md:block">{s.price}</span>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-all duration-500 ${isOpen ? "rotate-45 bg-rose text-white" : "bg-petal text-rose"}`}>
                      <Plus size={18} />
                    </span>
                  </button>
                  <div className={`acc ${isOpen ? "is-open" : ""}`}>
                    <div>
                      <div className="grid gap-8 border-t border-line p-5 sm:p-7 lg:grid-cols-[1.2fr_1fr_1fr]">
                        <div>
                          <p className="text-[16px] leading-relaxed text-ink/80">{s.description}</p>
                          <div className="mt-6 flex flex-wrap items-center gap-4">
                            <Button to="#contact" size="sm">Book this service</Button>
                            <span className="text-[14px] font-semibold text-rose md:hidden">{s.price}</span>
                          </div>
                        </div>
                        <div>
                          <p className="eyebrow mb-4">What's included</p>
                          <ul className="space-y-2.5">
                            {s.features.map((f, fi) => (
                              <li key={f} className="flex items-center gap-3 text-[15px]" style={{ transition: `all .6s var(--ease) ${fi * 80 + 200}ms`, opacity: isOpen ? 1 : 0, transform: isOpen ? "none" : "translateY(10px)" }}>
                                <span className="grid h-6 w-6 place-items-center rounded-full bg-petal text-rose"><Check size={13} /></span>
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="eyebrow mb-4">Process</p>
                          <ol className="relative space-y-3 border-l border-dashed border-blush pl-5">
                            {s.process.map((p, pi) => (
                              <li key={p} className="relative text-[15px]" style={{ transition: `all .6s var(--ease) ${pi * 80 + 300}ms`, opacity: isOpen ? 1 : 0, transform: isOpen ? "none" : "translateX(-10px)" }}>
                                <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-rose ring-4 ring-white" />
                                <span className="mr-2 text-[12px] font-bold text-rose">0{pi + 1}</span>
                                {p}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-[52px] hidden h-px bg-[repeating-linear-gradient(90deg,#F7B6C8_0_6px,transparent_6px_12px)] lg:block" />
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 120}>
              <TiltCard className="card spot h-full p-7">
                <span className="tilt-inner display block text-[56px] leading-none text-blush">0{i + 1}</span>
                <h3 className="display mt-4 text-[26px]">{s.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.d}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ======================= LAB ======================= */
function LabSection() {
  return (
    <section id="lab" data-nav="services" className="relative py-16 sm:py-24">
      <Container>
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-2">
          <SectionTitle eyebrow="Creative lab" title={"A playground for\nsoft experiments"} highlight={["soft", "experiments"]} />
          <Reveal className="text-[16.5px] leading-relaxed text-muted lg:pb-3">
            Tiny interactive studies in motion, generative art and micro-interactions. Poke, drag, click — everything here wants to be touched.
          </Reveal>
        </div>
        <LabGrid />
      </Container>
    </section>
  );
}

/* ======================= JOURNAL ======================= */
function JournalSection() {
  const featured = articles.find((a) => a.featured)!;
  const rest = articles.filter((a) => !a.featured);
  const [all, setAll] = useState(false);
  const list = all ? rest : rest.slice(0, 3);
  return (
    <section id="journal" data-nav="journal" className="relative py-20 sm:py-28">
      <BigWord text="journal" />
      <Container className="relative">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-2">
          <SectionTitle eyebrow="Journal" title={"Notes on design,\ncode & softness"} highlight={["softness"]} />
          <Reveal className="text-[16.5px] leading-relaxed text-muted lg:pb-3">Essays, case notes and tiny lessons from the studio — written slowly, with a cup of chai.</Reveal>
        </div>
        <Reveal variant="mask">
          <Link to={`/journal/${featured.slug}`} className="spot group grid overflow-hidden rounded-[32px] border border-line bg-white lg:grid-cols-[1.3fr_1fr]" data-cursor="hover">
            <div className="relative overflow-hidden">
              <img src={featured.image} alt="" loading="lazy" className="aspect-[16/10] h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" style={{ transitionTimingFunction: "var(--ease)" }} />
              <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-bold tracking-[0.12em] text-rose uppercase backdrop-blur"><HeartFill size={11} /> Featured</span>
            </div>
            <div className="relative flex flex-col justify-center p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-muted"><span className="tag">{featured.category}</span>{featured.date} · {featured.read} read</div>
              <h3 className="display mt-4 text-[clamp(30px,3.4vw,44px)] leading-[1.08] transition-colors group-hover:text-rose">{featured.title}</h3>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">{featured.excerpt}</p>
              <span className="mt-7 inline-flex items-center gap-3 text-[14px] font-semibold text-rose">Read article <span className="round-arrow"><ArrowUpRight size={16} /></span></span>
            </div>
          </Link>
        </Reveal>
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => (
            <div key={a.slug} className="filter-item is-enter" style={{ "--d": `${(i % 3) * 90}ms` } as CSSProperties}>
              <ArticleCard a={a} i={i} />
            </div>
          ))}
        </div>
        {rest.length > 3 && (
          <div className="mt-12 text-center">
            <Button variant="outline" onClick={() => setAll((v) => !v)} icon={<Plus size={16} className={`transition-transform duration-500 ${all ? "rotate-45" : ""}`} />}>
              {all ? "Show less" : `Show all ${rest.length} articles`}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ======================= CONTACT ======================= */
const types = ["Website", "UI/UX", "E-Commerce", "AI Automation", "Something else"];
const budgets = ["< $2k", "$2k – $5k", "$5k – $10k", "$10k+"];

function Field({ id, label, type = "text", textarea = false }: { id: string; label: string; type?: string; textarea?: boolean }) {
  const cls =
    "peer w-full rounded-2xl border border-line bg-white/80 px-5 pb-3 pt-6 text-[15.5px] outline-none transition-all duration-300 placeholder:text-transparent focus:border-rose focus:bg-white focus:shadow-[0_0_0_4px_rgba(233,79,131,.12)]";
  return (
    <div className="relative">
      {textarea ? <textarea id={id} name={id} rows={5} placeholder={label} required className={`${cls} resize-none`} /> : <input id={id} name={id} type={type} placeholder={label} required className={cls} />}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-2.5 text-[11.5px] font-semibold tracking-[0.08em] text-rose uppercase transition-all duration-300 peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:text-muted peer-focus:top-2.5 peer-focus:text-[11.5px] peer-focus:font-semibold peer-focus:tracking-[0.08em] peer-focus:uppercase peer-focus:text-rose"
      >
        {label}
      </label>
    </div>
  );
}

function Chips({ items, value, onChange, label }: { items: string[]; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <fieldset>
      <legend className="eyebrow mb-3">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {items.map((t) => (
          <button type="button" key={t} onClick={() => onChange(t)} aria-pressed={value === t} className={`rounded-full border px-4 py-2 text-[14px] font-medium transition-all duration-300 ${value === t ? "border-rose bg-rose text-white shadow-[0_8px_18px_-8px_rgba(233,79,131,.8)]" : "border-line bg-white/70 hover:border-blush hover:text-rose"}`}>
            {t}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Contact() {
  const [type, setType] = useState(types[0]);
  const [budget, setBudget] = useState(budgets[1]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1200);
  };
  const info = [
    { Icon: Mail, k: "Email", v: profile.email, href: `mailto:${profile.email}` },
    { Icon: Pin, k: "Location", v: profile.location },
    { Icon: UserIcon, k: "Availability", v: profile.availability },
    { Icon: Clock, k: "Response time", v: "Within 24 hours" },
    { Icon: Calendar, k: "Freelance status", v: profile.status },
  ];
  return (
    <div id="contact" data-nav="contact" className="relative">
      <CTA />
      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
            <div className="space-y-4">
              {info.map(({ Icon, k, v, href }, i) => (
                <Reveal key={k} variant="left" delay={i * 80}>
                  <div className="card spot group flex items-center gap-4 p-5 transition-transform duration-500 hover:-translate-y-1">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-petal text-rose transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-rose group-hover:text-white"><Icon size={19} /></span>
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold tracking-[0.12em] text-muted uppercase">{k}</p>
                      {href ? <a href={href} className="link-u break-all text-[16px] font-semibold">{v}</a> : <p className="text-[16px] font-semibold">{v}</p>}
                    </div>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={450} className="card relative overflow-hidden p-6">
                <FloatingHearts count={4} />
                <p className="eyebrow mb-4">Find me on</p>
                <Socials />
              </Reveal>
            </div>

            <Reveal variant="blur" className="card relative overflow-hidden p-6 sm:p-10">
              {sent ? (
                <div className="relative grid min-h-[520px] place-items-center text-center">
                  <FloatingHearts count={10} />
                  <div>
                    <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-rose text-white shadow-[0_16px_40px_-12px_rgba(233,79,131,.9)]" style={{ animation: "enterPop .8s var(--ease-bounce) both" }}>
                      <Check size={34} />
                    </div>
                    <h2 className="display mt-6 text-[40px]">Message <span className="italic text-rose">sent!</span></h2>
                    <p className="mx-auto mt-3 max-w-sm text-muted">Thank you for reaching out. I'll be in touch within 24 hours ♡</p>
                    <div className="mt-8"><Button variant="outline" onClick={() => setSent(false)} icon={false}>Send another</Button></div>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-6">
                  <h2 className="display text-[32px] sm:text-[38px]">Start a <span className="script text-rose">conversation</span></h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="name" label="Your name" />
                    <Field id="email" label="Email address" type="email" />
                  </div>
                  <Field id="company" label="Company / brand" />
                  <Chips label="Project type" items={types} value={type} onChange={setType} />
                  <Chips label="Budget" items={budgets} value={budget} onChange={setBudget} />
                  <Field id="message" label="Tell me about your project" textarea />
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="flex items-center gap-2 text-[13px] text-muted"><HeartFill size={12} className="text-rose" /> Your details stay private.</p>
                    <Button type="submit" icon={sending ? <span className="block h-4 w-4 rounded-full border-2 border-white/40 border-t-white" style={{ animation: "spinSlow .8s linear infinite" }} /> : undefined}>
                      {sending ? "Sending…" : "Send message"}
                    </Button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}

/* ======================= Divider ======================= */
function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <Parallax speed={-0.04} className="pointer-events-none relative h-16 overflow-hidden sm:h-24">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={`absolute inset-0 h-full w-[200%] ${flip ? "scale-y-[-1]" : ""}`} style={{ animation: "waveSlide 18s linear infinite" }} aria-hidden>
        <path d="M0 60 C 180 10 360 110 540 60 S 900 10 1080 60 S 1260 110 1440 60 L1440 120 L0 120Z" fill="rgba(252,232,238,.55)" />
        <path d="M0 80 C 200 40 380 120 560 80 S 920 40 1100 80 S 1280 120 1440 80 L1440 120 L0 120Z" fill="rgba(247,182,200,.22)" />
      </svg>
    </Parallax>
  );
}

export default function OnePage() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <Clients />
      <Projects />
      <Marquee />
      <About />
      <Glance />
      <Experience />
      <Wave />
      <Skills />
      <Services />
      <FAQ />
      <LabSection />
      <Wave flip />
      <JournalSection />
      <Contact />
    </>
  );
}
