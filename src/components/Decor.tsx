import type { CSSProperties, SVGProps } from "react";

type D = SVGProps<SVGSVGElement> & { size?: number; delay?: number };
const s = (delay?: number) => ({ "--d": `${delay ?? 0}ms` }) as CSSProperties;

/** Hand-drawn outline heart (self-drawing when parent is .is-ready / .is-in) */
export const HeartLine = ({ size = 28, delay, className = "", ...p }: D) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden className={`draw ${className}`} {...p}>
    <path
      pathLength={1}
      style={s(delay)}
      d="M16 27.5C9 22.6 3.6 18 3.8 11.6 4 7.4 7.3 4.6 10.9 5c2.4.3 4 1.9 5.1 4 1.2-2.2 3-3.9 5.6-4.1 3.7-.3 6.6 2.6 6.6 6.5 0 6.6-6.1 11.3-12.2 16.1"
      stroke="#E94F83"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const HeartFill = ({ size = 16, className = "", ...p }: D) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={className} {...p}>
    <path d="M12 21s-8-5.3-8-11.2C4 6.6 6.4 4.5 9 4.5c1.4 0 2.4.6 3 1.6.6-1 1.6-1.6 3-1.6 2.6 0 5 2.1 5 5.3C20 15.7 12 21 12 21Z" fill="currentColor" />
  </svg>
);

/** 4-point sparkle */
export const Sparkle = ({ size = 18, className = "", ...p }: D) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={className} {...p}>
    <path d="M12 1.5c.6 5.2 2.3 8.4 10.5 10.5-8.2 2.1-9.9 5.3-10.5 10.5-.6-5.2-2.3-8.4-10.5-10.5C9.7 9.9 11.4 6.7 12 1.5Z" fill="currentColor" />
  </svg>
);

/** Curvy dashed arrow with arrowhead */
export const CurlyArrow = ({ size = 90, delay, className = "", ...p }: D) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden className={`draw ${className}`} {...p}>
    <path
      pathLength={1}
      style={s(delay)}
      d="M12 88c10-6 26-10 30-24 4-13-10-18-14-9-4 10 12 14 24 8 14-7 22-22 30-44"
      stroke="#E94F83"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="1"
    />
    <path pathLength={1} style={s((delay ?? 0) + 700)} d="M74 22l8-4 2 9" stroke="#E94F83" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Paper plane with dashed flight path */
export const PaperPlane = ({ size = 110, delay, className = "", ...p }: D) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 120 96" fill="none" aria-hidden className={`draw ${className}`} {...p}>
    <path pathLength={1} style={s(delay)} d="M8 90c8-14 22-22 34-14 10 7 2 18-6 12-9-7 6-26 30-38" stroke="#E94F83" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="0.03 0.03" />
    <path pathLength={1} style={s((delay ?? 0) + 500)} d="M72 42 112 8 86 56l-8-10-6-4Zm6 4 34-38M78 46l-2 12 10-2" stroke="#E94F83" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

/** Bow / ribbon */
export const Bow = ({ size = 34, delay, className = "", ...p }: D) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden className={`draw ${className}`} {...p}>
    <path pathLength={1} style={s(delay)} d="M20 18c-4-6-12-10-14-6s6 8 14 6Zm0 0c4-6 12-10 14-6s-6 8-14 6Zm0 0-6 16m6-16 6 16" stroke="#E94F83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Line-drawn potted plant */
export const PlantLine = ({ size = 70, delay, className = "", ...p }: D) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden className={`draw ${className}`} {...p}>
    <path pathLength={1} style={s(delay)} d="M40 62V22M40 40c-10-2-16-10-16-18 8 0 16 6 16 18Zm0-8c8-2 14-8 14-16-8 0-14 6-14 16Zm0 18c-8 0-14-4-16-10 8-2 14 2 16 10Zm0-4c7-1 12-5 13-11-7 0-12 4-13 11Z" stroke="#E94F83" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path pathLength={1} style={s((delay ?? 0) + 400)} d="M28 62h24l-3 14H31l-3-14Z" stroke="#E94F83" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

/** Book stack line drawing */
export const BooksLine = ({ size = 70, delay, className = "", ...p }: D) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 80 40" fill="none" aria-hidden className={`draw ${className}`} {...p}>
    <path pathLength={1} style={s(delay)} d="M6 34h62v5H6zM10 27h58v7H10zM4 20h60v7H4zM14 22h30M16 29h26" stroke="#E94F83" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

/** Brush-like underline swash */
export const Swash = ({ className = "", delay, ...p }: D) => (
  <svg viewBox="0 0 220 20" preserveAspectRatio="none" fill="none" aria-hidden className={`draw ${className}`} {...p}>
    <path pathLength={1} style={s(delay)} d="M3 14C50 6 120 4 216 9" stroke="#E94F83" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

/** Tiny flower */
export const Flower = ({ size = 26, className = "", ...p }: D) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className={className} {...p}>
    {[0, 72, 144, 216, 288].map((r) => (
      <ellipse key={r} cx="16" cy="8.5" rx="5" ry="7" fill="#F7B6C8" transform={`rotate(${r} 16 16)`} />
    ))}
    <circle cx="16" cy="16" r="4" fill="#E94F83" />
  </svg>
);

/** Soft floating hearts field */
export function FloatingHearts({ count = 6, className = "" }: { count?: number; className?: string }) {
  const items = Array.from({ length: count });
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {items.map((_, i) => (
        <span
          key={i}
          className="absolute text-blush"
          style={{
            left: `${(i * 37 + 11) % 95}%`,
            bottom: `${(i * 23) % 40}%`,
            animation: `heartRise ${7 + (i % 4)}s ease-in-out ${i * 1.3}s infinite`,
            ["--dx" as string]: `${(i % 2 ? 1 : -1) * (10 + i * 4)}px`,
            ["--rot" as string]: `${(i % 2 ? 1 : -1) * 20}deg`,
            opacity: 0,
          }}
        >
          <HeartFill size={10 + (i % 3) * 5} />
        </span>
      ))}
    </div>
  );
}
