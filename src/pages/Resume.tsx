import type { CSSProperties } from "react";
import { Reveal } from "../lib/motion";
import { Button, Container } from "../components/ui";
import { Download, Mail, Phone, Pin, Printer } from "../components/Icons";
import { HeartFill, Sparkle } from "../components/Decor";
import { experience, profile, services, skills, tools } from "../data/content";
import { img } from "../data/images";

export default function Resume() {
  return (
    <>
      <div className="no-print">
        <Container className="max-w-[1000px] pb-10 pt-8 sm:pt-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h1 className="display text-[clamp(40px,6vw,72px)] leading-none">
                <span className="hero-word"><span style={{ "--d": "150ms" } as CSSProperties}>The&nbsp;</span></span>
                <span className="hero-word"><span style={{ "--d": "220ms" } as CSSProperties} className="italic text-rose">short&nbsp;</span></span>
                <span className="hero-word"><span style={{ "--d": "290ms" } as CSSProperties}>version.</span></span>
              </h1>
              <p className="enter mt-4 max-w-md text-[16px] text-muted" style={{ "--d": "400ms" } as CSSProperties}>Everything on one page — print it, save it as a PDF, or share it with your team.</p>
            </div>
            <div className="enter flex flex-wrap gap-3" style={{ "--d": "500ms" } as CSSProperties}>
              <Button onClick={() => window.print()} icon={<Download size={16} />}>Download PDF</Button>
              <Button onClick={() => window.print()} variant="outline" icon={<Printer size={16} />}>Print</Button>
            </div>
          </div>
        </Container>
      </div>
      <section className="pb-20">
        <Container className="max-w-[1000px]">
          <Reveal variant="up" className="print-sheet card relative overflow-hidden !rounded-[32px] !bg-white p-7 sm:p-12">
            <div className="grid-paper pointer-events-none absolute inset-0 opacity-40" />
            <Sparkle size={18} className="absolute right-8 top-8 text-rose" />
            <div className="relative">
              <header className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-center gap-5">
                  <img src={img.aboutAvatar} alt="" className="h-20 w-20 rounded-full object-cover ring-4 ring-petal" />
                  <div>
                    <h2 className="display text-[40px] leading-none sm:text-[48px]">{profile.name}</h2>
                    <p className="mt-2 text-[15px] font-semibold text-rose">{profile.role}</p>
                  </div>
                </div>
                <ul className="space-y-1.5 text-[14px] text-muted">
                  <li className="flex items-center gap-2"><Mail size={14} className="text-rose" />{profile.email}</li>
                  <li className="flex items-center gap-2"><Phone size={14} className="text-rose" />{profile.phone}</li>
                  <li className="flex items-center gap-2"><Pin size={14} className="text-rose" />{profile.location}</li>
                </ul>
              </header>

              <div className="grid gap-10 pt-8 md:grid-cols-[1.6fr_1fr]">
                <div className="space-y-8">
                  <div>
                    <h3 className="eyebrow mb-3">Profile</h3>
                    <p className="text-[15.5px] leading-relaxed text-ink/80">{profile.bio}</p>
                  </div>
                  <div>
                    <h3 className="eyebrow mb-4">Experience</h3>
                    <div className="space-y-6">
                      {experience.map((e) => (
                        <div key={e.role} className="relative border-l-2 border-petal pl-5">
                          <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-rose ring-4 ring-white" />
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <p className="text-[16px] font-bold">{e.role}</p>
                            <p className="text-[12.5px] font-semibold text-rose">{e.period}</p>
                          </div>
                          <p className="text-[14px] font-medium text-muted">{e.company}</p>
                          <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink/75">{e.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <aside className="space-y-8">
                  <div>
                    <h3 className="eyebrow mb-4">Skills</h3>
                    <div className="space-y-4">
                      {skills.flatMap((g) => g.items.slice(0, 2)).map((s) => (
                        <div key={s.name}>
                          <div className="mb-1 flex justify-between text-[13.5px]"><span>{s.name}</span><span className="text-muted">{s.level}%</span></div>
                          <div className="h-1.5 rounded-full bg-petal"><div className="h-full rounded-full bg-[linear-gradient(90deg,#F7B6C8,#E94F83)]" style={{ width: `${s.level}%` }} /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="eyebrow mb-3">Services</h3>
                    <ul className="space-y-1.5 text-[14px]">
                      {services.slice(0, 6).map((s) => (
                        <li key={s.id} className="flex items-center gap-2"><HeartFill size={10} className="text-rose" />{s.title}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="eyebrow mb-3">Tools</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {tools.slice(0, 12).map((t) => <span key={t} className="rounded-full bg-petal px-2.5 py-1 text-[12px] font-medium">{t}</span>)}
                    </div>
                  </div>
                  <div>
                    <h3 className="eyebrow mb-3">Languages</h3>
                    <p className="text-[14px] text-ink/80">English · Urdu · Sindhi · Punjabi</p>
                  </div>
                </aside>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
