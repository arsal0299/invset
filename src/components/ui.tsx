import type { CSSProperties, ReactNode } from "react";
import { Link } from "../lib/router";
import { useMagnetic, SplitText, Reveal } from "../lib/motion";
import { ArrowRight, Facebook, Instagram, Tiktok } from "./Icons";
import { HeartLine, Sparkle } from "./Decor";
import { profile } from "../data/content";

type BtnProps = {
  to?: string;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "sm";
  icon?: ReactNode | false;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  download?: boolean;
};

export function Button({ to, href, variant = "primary", size = "md", icon, className = "", style, children, onClick, type = "button", download }: BtnProps) {
  const ref = useMagnetic<HTMLElement>(0.25);
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  const ripple = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const s = document.createElement("span");
    const size = Math.max(r.width, r.height) * 2.2;
    s.className = "ripple";
    s.style.width = s.style.height = `${size}px`;
    s.style.left = `${e.clientX - r.left}px`;
    s.style.top = `${e.clientY - r.top}px`;
    el.appendChild(s);
    window.setTimeout(() => s.remove(), 700);
  };
  const inner = (
    <>
      <span>{children}</span>
      {icon !== false && <span className="btn-arrow">{icon ?? <ArrowRight size={16} />}</span>}
    </>
  );
  if (to)
    return (
      <Link to={to} ref={ref as never} className={cls} style={style} data-cursor="hover" onClick={onClick} onPointerDown={ripple}>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a ref={ref as never} href={href} className={cls} style={style} data-cursor="hover" onClick={onClick} onPointerDown={ripple} download={download} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  return (
    <button ref={ref as never} type={type} className={cls} style={style} data-cursor="hover" onClick={onClick} onPointerDown={ripple}>
      {inner}
    </button>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group relative inline-flex items-start ${className}`} aria-label={`${profile.name} — home`}>
      <span className="script text-[30px] leading-none text-rose transition-transform duration-500 group-hover:-rotate-3 sm:text-[34px]">
        {profile.logo}.
      </span>
      <HeartLine size={16} delay={400} className="is-in -ml-0.5 -mt-1 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12" />
    </Link>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  highlight = [],
  align = "left",
  className = "",
  children,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string[];
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <Reveal variant="fade" className={`mb-4 flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}>
          <span className="eyebrow">{eyebrow}</span>
          <HeartLine size={14} delay={250} />
        </Reveal>
      )}
      <SplitText
        as="h2"
        text={title}
        highlight={highlight}
        highlightClass="text-rose italic"
        className="display text-balance text-[clamp(34px,5.4vw,64px)]"
      />
      {children && (
        <Reveal delay={200} className={`mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted ${align === "center" ? "mx-auto" : ""}`}>
          {children}
        </Reveal>
      )}
    </div>
  );
}

export function MiniTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <Reveal variant="left" className="flex items-center gap-3">
        <h2 className="text-[15px] font-bold tracking-[0.16em] uppercase sm:text-[17px]">{children}</h2>
        <Sparkle size={14} className="twinkle text-blush" />
      </Reveal>
      {action && <Reveal variant="right">{action}</Reveal>}
    </div>
  );
}

export const socialsList = [
  { key: "instagram", label: "Instagram", Icon: Instagram, href: profile.socials.instagram },
  { key: "tiktok", label: "TikTok", Icon: Tiktok, href: profile.socials.tiktok },
  { key: "facebook", label: "Facebook", Icon: Facebook, href: profile.socials.facebook },
];

export function Socials({ className = "", enter = false, baseDelay = 0 }: { className?: string; enter?: boolean; baseDelay?: number }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialsList.map(({ key, label, Icon, href }, i) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          data-cursor="hover"
          className={`icon-btn ${enter ? "enter enter-pop" : ""}`}
          style={{ "--d": `${baseDelay + i * 90}ms` } as CSSProperties}
        >
          <Icon size={17} />
        </a>
      ))}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}
