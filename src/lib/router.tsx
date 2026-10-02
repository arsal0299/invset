import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";

import { smoothTo } from "./smooth";

/* ==========================================================
   Single-page navigation
   - "/about", "#about"      → smooth scroll to section
   - "/work/:slug"           → open project in overlay panel
   - "/journal/:slug"        → open article in overlay panel
   - "/resume"               → open resume in overlay panel
   ========================================================== */

export type Overlay = { kind: "project" | "article" | "resume"; slug?: string } | null;

const ALIAS: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/experience": "experience",
  "/skills": "skills",
  "/work": "work",
  "/case-studies": "work",
  "/services": "services",
  "/lab": "lab",
  "/journal": "journal",
  "/contact": "contact",
};

export function parseTarget(to: string): { section?: string; overlay?: Overlay } {
  if (to.startsWith("#/")) to = to.slice(1);
  if (to.startsWith("#")) return { section: to.slice(1) || "home" };
  if (to.startsWith("/work/")) return { overlay: { kind: "project", slug: to.slice(6) } };
  if (to.startsWith("/journal/")) return { overlay: { kind: "article", slug: to.slice(9) } };
  if (to === "/resume") return { overlay: { kind: "resume" } };
  return { section: ALIAS[to] ?? "home" };
}

const overlayHash = (o: NonNullable<Overlay>) =>
  o.kind === "resume" ? "#/resume" : `#/${o.kind === "project" ? "work" : "journal"}/${o.slug}`;

/* ---------- premium eased scroll (Lenis-powered) ---------- */
export function scrollToSection(id: string) {
  const el = id === "home" ? null : document.getElementById(id);
  const navH = window.innerWidth < 1024 ? 70 : 84;
  if (!el) return smoothTo(0);
  smoothTo(el, -navH);
}

type Ctx = {
  active: string;
  setActive: (s: string) => void;
  overlay: Overlay;
  go: (to: string) => void;
  close: () => void;
};
const RouterCtx = createContext<Ctx>({ active: "home", setActive: () => {}, overlay: null, go: () => {}, close: () => {} });

export function RouterProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("home");
  const [overlay, setOverlay] = useState<Overlay>(null);
  const overlayRef = useRef<Overlay>(null);
  overlayRef.current = overlay;

  // Browser back button closes overlay
  useEffect(() => {
    const onPop = () => {
      const t = parseTarget(window.location.hash || "#home");
      setOverlay(t.overlay ?? null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const close = useCallback(() => {
    if (!overlayRef.current) return;
    if (window.history.state?.overlay) window.history.back();
    else {
      setOverlay(null);
      window.history.replaceState(null, "", "#" + active);
    }
  }, [active]);

  const go = useCallback(
    (to: string) => {
      const t = parseTarget(to);
      if (t.overlay) {
        const hash = overlayHash(t.overlay);
        if (overlayRef.current) window.history.replaceState({ overlay: true }, "", hash);
        else window.history.pushState({ overlay: true }, "", hash);
        setOverlay(t.overlay);
        return;
      }
      const section = t.section!;
      if (overlayRef.current) {
        if (window.history.state?.overlay) window.history.back();
        setOverlay(null);
        window.setTimeout(() => scrollToSection(section), 520);
      } else scrollToSection(section);
      window.setTimeout(
        () => window.history.replaceState(null, "", section === "home" ? window.location.pathname + window.location.search : "#" + section),
        50
      );
    },
    []
  );

  return <RouterCtx.Provider value={{ active, setActive, overlay, go, close }}>{children}</RouterCtx.Provider>;
}

export const useRouter = () => useContext(RouterCtx);

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; ref?: Ref<HTMLAnchorElement> };
export function Link({ to, onClick, children, ref, ...rest }: LinkProps) {
  const { go } = useRouter();
  const t = parseTarget(to);
  const href = t.overlay ? overlayHash(t.overlay) : `#${t.section}`;
  return (
    <a
      ref={ref}
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        go(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
