import { useEffect, useRef, useState } from "react";
import { useRouter, type Overlay } from "../lib/router";
import ProjectDetail from "../pages/ProjectDetail";
import ArticlePage from "../pages/Article";
import Resume from "../pages/Resume";
import { Plus } from "./Icons";
import { HeartFill } from "./Decor";
import { lockScroll } from "../lib/smooth";

export default function OverlayHost() {
  const { overlay, close } = useRouter();
  const [shown, setShown] = useState<Overlay>(null);
  const [state, setState] = useState<"open" | "closing">("open");
  const panel = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlay) {
      setShown(overlay);
      setState("open");
      document.body.classList.add("has-overlay");
      lockScroll(true);
      panel.current?.scrollTo({ top: 0 });
      return;
    }
    if (!shown) return;
    setState("closing");
    const t = window.setTimeout(() => {
      setShown(null);
      document.body.classList.remove("has-overlay");
      lockScroll(false);
    }, 650);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlay]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  // in-panel reading progress
  useEffect(() => {
    const p = panel.current;
    if (!p) return;
    const on = () => {
      const h = p.scrollHeight - p.clientHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? p.scrollTop / h : 0})`;
    };
    p.addEventListener("scroll", on, { passive: true });
    return () => p.removeEventListener("scroll", on);
  }, [shown]);

  if (!shown) return null;
  const key = `${shown.kind}-${shown.slug ?? ""}`;
  const label = shown.kind === "project" ? "Case study" : shown.kind === "article" ? "Journal" : "Resume";

  return (
    <div className={`overlay-root ${state === "closing" ? "is-closing" : ""}`} role="dialog" aria-modal="true" aria-label={label}>
      <div className="overlay-backdrop" onClick={close} />
      <div ref={panel} className="overlay-panel no-scrollbar" data-lenis-prevent>
        <div className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-cream/80 px-4 py-3 backdrop-blur-xl sm:px-8">
          <div ref={bar} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[linear-gradient(90deg,#F7B6C8,#E94F83)]" style={{ transform: "scaleX(0)" }} />
          <span className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] text-rose uppercase">
            <HeartFill size={11} /> {label}
          </span>
          <span className="hidden text-[12px] text-muted sm:block">Press Esc to close</span>
          <button
            onClick={close}
            aria-label="Close"
            className="group grid h-11 w-11 place-items-center rounded-full bg-rose text-white shadow-[0_10px_24px_-8px_rgba(233,79,131,.8)] transition-transform duration-500 hover:scale-110"
          >
            <Plus size={20} className="rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]" />
          </button>
        </div>
        <div key={key} className="page-enter is-ready">
          {shown.kind === "project" && <ProjectDetail slug={shown.slug!} />}
          {shown.kind === "article" && <ArticlePage slug={shown.slug!} />}
          {shown.kind === "resume" && <Resume />}
        </div>
      </div>
    </div>
  );
}
