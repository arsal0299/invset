import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useRouter } from "../lib/router";
import { Button, Container, Logo, socialsList } from "./ui";
import { ArrowUp, ArrowUpRight, Book, Briefcase, Download, HomeIcon, Layers, Mail, Moon, Phone, Sun, UserIcon, Whatsapp } from "./Icons";
import { HeartFill, Sparkle } from "./Decor";
import { credit, profile } from "../data/content";
import { isTouch, prefersReduced } from "../lib/motion";
import { lockScroll, onScroll, smoothTo } from "../lib/smooth";

export const NAV = [
  { label: "Home", id: "home", Icon: HomeIcon },
  { label: "About", id: "about", Icon: UserIcon },
  { label: "Work", id: "work", Icon: Briefcase },
  { label: "Services", id: "services", Icon: Layers },
  { label: "Journal", id: "journal", Icon: Book },
  { label: "Contact", id: "contact", Icon: Mail },
];
export const MORE = [
  { label: "Experience", to: "#experience" },
  { label: "Skills", to: "#skills" },
  { label: "At a glance", to: "#glance" },
  { label: "Creative Lab", to: "#lab" },
  { label: "FAQ", to: "#faq" },
  { label: "Resume / CV", to: "/resume" },
];
const DOCK = NAV.filter((n) => n.id !== "journal");

/* ---------- Live Pakistan clock ---------- */
export function usePKClock(withSeconds = false) {
  const fmt = () => {
    const d = new Date();
    const time = new Intl.DateTimeFormat("en-GB", { timeZone: profile.timezone, hour: "2-digit", minute: "2-digit", second: withSeconds ? "2-digit" : undefined, hour12: false }).format(d);
    const hour = Number(new Intl.DateTimeFormat("en-GB", { timeZone: profile.timezone, hour: "2-digit", hour12: false }).format(d));
    return { time, hour };
  };
  const [v, setV] = useState(fmt);
  useEffect(() => {
    const id = window.setInterval(() => setV(fmt()), withSeconds ? 1000 : 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withSeconds]);
  return v;
}

/* ---------- Scroll spy ---------- */
function useScrollSpy() {
  const { setActive } = useRouter();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    if (!els.length || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive((e.target as HTMLElement).dataset.nav || "home")),
      { rootMargin: "-42% 0px -52% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [setActive]);
}

/* ---------- Hamburger (pixel-perfect 3 lines) ---------- */
function Burger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={`burger2 lg:hidden ${open ? "is-open" : ""}`}
    >
      <span className="burger2-box" aria-hidden>
        <span className="burger2-line l1" />
        <span className="burger2-line l2" />
        <span className="burger2-line l3" />
      </span>
    </button>
  );
}

export function Nav() {
  const { active, go, overlay } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const ul = useRef<HTMLUListElement>(null);
  const [ind, setInd] = useState({ x: 0, w: 0, o: 0 });
  useScrollSpy();

  useEffect(() => {
    let last = window.scrollY;
    return onScroll((y) => {
      setScrolled(y > 24);
      if (Math.abs(y - last) > 8) {
        setHidden(y > last && y > 520);
        last = y;
      }
    });
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const a = ul.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
      if (a) setInd({ x: a.offsetLeft, w: a.offsetWidth, o: 1 });
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    lockScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const nav = (to: string) => {
    const wasOpen = open;
    setOpen(false);
    window.setTimeout(() => go(to), wasOpen ? 420 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,opacity] duration-700 ${hidden && !open ? "-translate-y-[120%]" : ""} ${overlay ? "pointer-events-none opacity-0" : ""}`}
        style={{ transitionTimingFunction: "var(--ease)" }}
      >
        <div className="enter enter-fade" style={{ "--d": "0ms" } as CSSProperties}>
          <div className={`transition-[padding] duration-700 ${scrolled || open ? "py-2 sm:py-2.5" : "py-3 sm:py-5"}`}>
            <Container className="!px-3 sm:!px-8 lg:!px-10">
              <nav
                className={`nav-shell flex items-center justify-between gap-3 rounded-[20px] transition-all duration-700 ${
                  scrolled || open ? "is-solid px-3 py-1.5 sm:px-5 sm:py-2" : "px-2 py-1 sm:px-0"
                }`}
                aria-label="Primary"
              >
                <div className="flex items-center gap-3">
                  <Logo />
                  <span className="status-pill hidden min-[380px]:inline-flex lg:hidden">
                    <span className="status-dot" /> Open to work
                  </span>
                </div>

                <ul ref={ul} className="relative hidden items-center gap-7 lg:flex xl:gap-10">
                  {NAV.map((n) => (
                    <li key={n.id}>
                      <a
                        href={`#${n.id}`}
                        data-id={n.id}
                        onClick={(e) => {
                          e.preventDefault();
                          nav(`#${n.id}`);
                        }}
                        className={`nav-link uppercase ${active === n.id ? "is-active" : ""}`}
                        aria-current={active === n.id ? "true" : undefined}
                      >
                        {n.label}
                      </a>
                    </li>
                  ))}
                  <span aria-hidden className="nav-ind pointer-events-none absolute -bottom-[3px] h-[2px] rounded-full bg-rose" style={{ transform: `translateX(${ind.x}px)`, width: ind.w, opacity: ind.o }} />
                  <span aria-hidden className="nav-ind pointer-events-none absolute -top-2" style={{ transform: `translateX(${ind.x + ind.w / 2 - 4}px)`, opacity: ind.o }}>
                    <HeartFill size={8} className="text-rose" />
                  </span>
                </ul>

                <div className="flex items-center gap-2">
                  <Button onClick={() => nav("#contact")} size="sm" className="hidden sm:inline-flex" icon={<ArrowUpRight size={16} />}>
                    Let's Connect
                  </Button>
                  <a href={`mailto:${profile.email}`} aria-label="Email me" className="grid h-11 w-11 place-items-center rounded-full bg-petal text-rose transition-transform duration-500 active:scale-90 sm:hidden">
                    <Mail size={18} />
                  </a>
                  <Burger open={open} onClick={() => setOpen((o) => !o)} />
                </div>
              </nav>
            </Container>
          </div>
        </div>
      </header>

      <MobileMenu open={open} active={active} nav={nav} />
      <BottomDock hidden={open || !!overlay} />
    </>
  );
}

/* ---------- Full-screen mobile menu ---------- */
function MobileMenu({ open, active, nav }: { open: boolean; active: string; nav: (to: string) => void }) {
  const { time, hour } = usePKClock(true);
  const day = hour >= 6 && hour < 18;
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const actions = [
    { label: "Email", Icon: Mail, href: `mailto:${profile.email}` },
    { label: "WhatsApp", Icon: Whatsapp, href: `https://wa.me/${profile.whatsapp}` },
    { label: "Call", Icon: Phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { label: "Resume", Icon: Download, to: "/resume" },
  ];
  return (
    <div className={`menu-panel fixed inset-0 z-[45] bg-cream lg:hidden ${open ? "is-open" : ""}`} aria-hidden={!open} data-lenis-prevent>
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,#F9C4D6,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,#FCE1EA,transparent_70%)]" />
      <div className="relative flex h-full flex-col overflow-y-auto overscroll-contain px-5 pb-8 pt-[88px] sm:px-8">
        {/* greeting + live clock */}
        <div className="menu-item flex items-center justify-between rounded-3xl border border-line bg-white/80 p-4" style={{ "--i": 0 } as CSSProperties}>
          <div>
            <p className="text-[12px] font-semibold tracking-[0.12em] text-muted uppercase">Assalam-o-Alaikum 👋</p>
            <p className="display mt-0.5 text-[19px]">{greet} from {profile.city}</p>
          </div>
          <div className="text-right">
            <p className="flex items-center justify-end gap-1.5 text-rose">{day ? <Sun size={15} /> : <Moon size={15} />}<span className="font-mono text-[17px] font-semibold tabular-nums">{time}</span></p>
            <p className="text-[11px] font-semibold text-muted">PKT · GMT+5</p>
          </div>
        </div>

        <ul className="mt-5 space-y-0.5">
          {NAV.map((n, i) => {
            const on = active === n.id;
            return (
              <li key={n.id} className="menu-item" style={{ "--i": i + 1 } as CSSProperties}>
                <a
                  href={`#${n.id}`}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => {
                    e.preventDefault();
                    nav(`#${n.id}`);
                  }}
                  className={`menu-link group flex items-center gap-4 rounded-2xl px-3 py-2.5 ${on ? "is-on" : ""}`}
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${on ? "bg-rose text-white shadow-[0_8px_18px_-6px_rgba(233,79,131,.8)]" : "bg-petal text-rose"}`}>
                    <n.Icon size={18} />
                  </span>
                  <span className={`display flex-1 text-[34px] leading-none sm:text-[40px] ${on ? "italic text-rose" : "text-ink"}`}>{n.label}</span>
                  <span className="text-[11px] font-bold text-rose/60">0{i + 1}</span>
                  <ArrowUpRight size={18} className="text-rose opacity-40 transition-all duration-500 group-active:translate-x-1 group-active:opacity-100" />
                </a>
              </li>
            );
          })}
        </ul>

        {/* quick actions */}
        <div className="menu-item mt-6 grid grid-cols-4 gap-2" style={{ "--i": 8 } as CSSProperties}>
          {actions.map(({ label, Icon, href, to }) => {
            const cls = "flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-white/80 py-3 text-[11.5px] font-semibold text-ink/80 transition-transform duration-300 active:scale-95";
            const inner = (
              <>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-petal text-rose"><Icon size={17} /></span>
                {label}
              </>
            );
            return to ? (
              <button key={label} tabIndex={open ? 0 : -1} className={cls} onClick={() => nav(to)}>{inner}</button>
            ) : (
              <a key={label} tabIndex={open ? 0 : -1} className={cls} href={href} target={href!.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>
            );
          })}
        </div>

        <div className="menu-item mt-5 flex flex-wrap gap-2" style={{ "--i": 9 } as CSSProperties}>
          {MORE.filter((m) => m.to !== "/resume").map((m) => (
            <button key={m.to} tabIndex={open ? 0 : -1} onClick={() => nav(m.to)} className="rounded-full border border-line bg-white px-3.5 py-2 text-[13px] font-medium active:bg-petal">
              {m.label}
            </button>
          ))}
        </div>

        <div className="menu-item mt-auto pt-8" style={{ "--i": 10 } as CSSProperties}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {socialsList.map(({ key, Icon, href, label }) => (
                <a key={key} href={href} aria-label={label} className="icon-btn !h-10 !w-10" tabIndex={open ? 0 : -1} target="_blank" rel="noreferrer">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <span className="status-pill"><span className="status-dot" /> Available</span>
          </div>
          <p className="mt-5 text-center text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            Dev by <span className="credit-name script text-[16px] normal-case tracking-normal">{credit.name}</span> <span className="normal-case tracking-normal">· @arslan0299</span> 🇵🇰
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- App-style bottom dock (mobile/tablet) ---------- */
function BottomDock({ hidden }: { hidden: boolean }) {
  const { active, go } = useRouter();
  const [show, setShow] = useState(false);
  useEffect(() => onScroll((y) => setShow(y > 160)), []);
  const idx = Math.max(0, DOCK.findIndex((n) => n.id === (active === "journal" ? "services" : active)));
  return (
    <nav
      aria-label="Quick navigation"
      className={`dock lg:hidden ${show && !hidden ? "is-shown" : ""}`}
      style={{ "--idx": idx, "--n": DOCK.length } as CSSProperties}
    >
      <span className="dock-pill" aria-hidden />
      {DOCK.map((n) => {
        const on = DOCK[idx].id === n.id;
        return (
          <button key={n.id} onClick={() => go(`#${n.id}`)} className={`dock-btn ${on ? "is-on" : ""}`} aria-label={n.label} aria-current={on ? "true" : undefined}>
            <n.Icon size={19} />
            <span className="dock-label">{n.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

/* smooth premium scroll-to-top */
export function smoothScrollTop() {
  smoothTo(0, 0, Math.min(1.8, 0.6 + window.scrollY / 6000));
}

export function Footer() {
  const { go } = useRouter();
  const { time } = usePKClock();
  return (
    <footer className="relative mt-10 overflow-hidden">
      <Container className="pb-10 pt-14">
        <div className="grid gap-10 border-t border-line pt-12 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
              Designing and building calm, beautiful digital experiences — with a little bit of magic. Made in Pakistan 🇵🇰
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5 text-[12.5px] font-semibold">
              <Sun size={14} className="text-rose" /> {profile.city} · <span className="font-mono tabular-nums">{time}</span> PKT
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="grid grid-cols-2 gap-2.5 text-[15px] sm:block sm:space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <Link to={`#${n.id}`} className="link-u">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">More</p>
            <ul className="grid grid-cols-2 gap-2.5 text-[15px] sm:block sm:space-y-2.5">
              {MORE.map((n) => (
                <li key={n.to}>
                  <button onClick={() => go(n.to)} className="link-u text-left">{n.label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Contact</p>
            <a href={`mailto:${profile.email}`} className="link-u break-all text-[15px]">{profile.email}</a>
            <p className="mt-2.5 text-[15px] text-muted">{profile.location}</p>
            <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-[14px] font-semibold text-rose">
              <Whatsapp size={16} /> WhatsApp me
            </a>
            <p className="mt-4 flex w-fit items-center gap-2 rounded-full bg-petal px-3 py-1.5 text-xs font-semibold text-rose">
              <span className="status-dot !bg-rose" />
              {profile.status}
            </p>
          </div>
        </div>
      </Container>

      <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
        <p className="script footer-word -mb-6 text-center text-[clamp(90px,22vw,300px)] leading-[0.9]">{profile.logo}.</p>
      </div>

      <div className="relative bg-[linear-gradient(90deg,#FCE3EB,#F9D2DF,#FCE3EB)]">
        <Container className="flex flex-col items-center justify-between gap-4 py-5 md:flex-row">
          <p className="flex items-center gap-2 text-center text-[13px] text-muted">
            <HeartFill size={13} className="text-rose" /> © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-8">
            {socialsList.map(({ key, label, href }) => (
              <a key={key} href={href} target="_blank" rel="noreferrer" className="link-u text-[13px] text-muted hover:text-rose">
                {label}
              </a>
            ))}
            <button
              onClick={smoothScrollTop}
              aria-label="Back to top"
              data-cursor="hover"
              className="group grid h-11 w-11 place-items-center rounded-full bg-white/80 text-rose shadow-[0_8px_20px_-8px_rgba(233,79,131,.5)] ring-1 ring-white transition-all duration-500 hover:-translate-y-1 hover:bg-rose hover:text-white"
            >
              <ArrowUp size={17} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </Container>
        <div className="border-t border-white/60 pb-[calc(84px+env(safe-area-inset-bottom))] lg:pb-0">
          <Container className="flex items-center justify-center py-3.5">
            <p className="credit group inline-flex flex-wrap items-center justify-center gap-2 text-[12.5px] font-semibold tracking-[0.14em] text-ink/70 uppercase">
              <Sparkle size={11} className="twinkle text-rose" />
              Dev by
              <span className="credit-name script text-[20px] font-semibold tracking-normal normal-case">{credit.name}</span>
              <span className="normal-case tracking-normal">· @arslan0299</span>
              <HeartFill size={12} className="text-rose transition-transform duration-500 group-hover:scale-125" />
            </p>
          </Container>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Floating back-to-top with progress ring ---------- */
export function FloatingTop() {
  const [show, setShow] = useState(false);
  const ring = useRef<SVGCircleElement>(null);
  useEffect(() => {
    let max = document.documentElement.scrollHeight - window.innerHeight;
    const onR = () => (max = document.documentElement.scrollHeight - window.innerHeight);
    window.addEventListener("resize", onR);
    const id = window.setInterval(onR, 2000);
    const un = onScroll((y) => {
      setShow(y > 900);
      if (ring.current) ring.current.style.strokeDashoffset = String(1 - (max > 0 ? Math.min(1, y / max) : 0));
    });
    return () => {
      un();
      clearInterval(id);
      window.removeEventListener("resize", onR);
    };
  }, []);
  return (
    <button
      onClick={smoothScrollTop}
      aria-label="Scroll to top"
      className={`fixed bottom-[calc(92px+env(safe-area-inset-bottom))] right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-rose shadow-[0_12px_30px_-10px_rgba(233,79,131,.6)] transition-all duration-700 hover:scale-110 sm:right-6 lg:bottom-7 lg:right-7 lg:h-12 lg:w-12 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
      style={{ transitionTimingFunction: "var(--ease)" }}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="none" stroke="#FCE8EE" strokeWidth="2.5" />
        <circle ref={ring} cx="24" cy="24" r="22" fill="none" stroke="#E94F83" strokeWidth="2.5" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
      </svg>
      <ArrowUp size={17} />
    </button>
  );
}

/* ---------- Cursor + sparkle trail + click heart burst ---------- */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const trailHost = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = prefersReduced();
    const touch = isTouch();
    const burst = (e: PointerEvent) => {
      if (reduced || !trailHost.current) return;
      const t = e.target as HTMLElement;
      if (t.closest("input,textarea,select,canvas")) return;
      const n = touch ? 5 : 7;
      for (let i = 0; i < n; i++) {
        const s = document.createElement("span");
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.5;
        const d = 28 + Math.random() * 26;
        s.className = "click-heart";
        s.style.left = `${e.clientX}px`;
        s.style.top = `${e.clientY}px`;
        s.style.setProperty("--x", `${Math.cos(a) * d}px`);
        s.style.setProperty("--y", `${Math.sin(a) * d}px`);
        s.style.setProperty("--r", `${Math.random() * 60 - 30}deg`);
        s.style.setProperty("--s", `${0.6 + Math.random() * 0.6}`);
        s.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M12 21s-8-5.3-8-11.2C4 6.6 6.4 4.5 9 4.5c1.4 0 2.4.6 3 1.6.6-1 1.6-1.6 3-1.6 2.6 0 5 2.1 5 5.3C20 15.7 12 21 12 21Z"/></svg>';
        trailHost.current.appendChild(s);
        window.setTimeout(() => s.remove(), 900);
      }
    };
    window.addEventListener("pointerdown", burst, { passive: true });
    if (touch || reduced) return () => window.removeEventListener("pointerdown", burst);

    let x = -100, y = -100, rx = x, ry = y, gx = x, gy = y, raf = 0, lastTrail = 0, idle = 0;
    const pool: HTMLSpanElement[] = [];
    for (let i = 0; i < 12; i++) {
      const s = document.createElement("span");
      s.className = "trail-dot";
      trailHost.current?.appendChild(s);
      pool.push(s);
    }
    let pi = 0;
    const loop = () => {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      gx += (x - gx) * 0.08;
      gy += (y - gy) * 0.08;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx.toFixed(1)}px,${ry.toFixed(1)}px,0)`;
      if (glow.current) glow.current.style.transform = `translate3d(${gx.toFixed(1)}px,${gy.toFixed(1)}px,0)`;
      // sleep when settled → zero idle CPU
      if (Math.abs(x - gx) + Math.abs(y - gy) < 0.5 && ++idle > 10) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      const dx = e.clientX - x, dy = e.clientY - y;
      x = e.clientX;
      y = e.clientY;
      idle = 0;
      if (!raf) raf = requestAnimationFrame(loop);
      const t = e.target as HTMLElement;
      ring.current?.classList.toggle("is-hover", !!t.closest?.("a,button,[data-cursor],input,textarea,select,label"));
      const now = performance.now();
      if (now - lastTrail > 40 && dx * dx + dy * dy > 30) {
        lastTrail = now;
        const s = pool[pi++ % pool.length];
        s.style.translate = `${x}px ${y}px`;
        s.classList.remove("on");
        void s.offsetWidth;
        s.classList.add("on");
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", burst);
      cancelAnimationFrame(raf);
      pool.forEach((p) => p.remove());
    };
  }, []);
  return (
    <>
      <div ref={glow} className="cursor-glow" aria-hidden />
      <div ref={trailHost} className="pointer-events-none fixed inset-0 z-[89]" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let max = 1;
    const measure = () => (max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    measure();
    window.addEventListener("resize", measure);
    const id = window.setInterval(measure, 2000);
    const un = onScroll((y) => {
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, y / max).toFixed(4)})`;
    });
    return () => {
      un();
      clearInterval(id);
      window.removeEventListener("resize", measure);
    };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2.5px]" aria-hidden>
      <div ref={bar} className="h-full origin-left bg-[linear-gradient(90deg,#F7B6C8,#E94F83)]" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

/* ---------- Ambient drifting orbs (GPU transforms only, no filters) ---------- */
export function AmbientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
    </div>
  );
}
