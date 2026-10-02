import { useEffect, useState } from "react";
import { RouterProvider, parseTarget, scrollToSection, useRouter } from "./lib/router";
import { bindSpotlight } from "./lib/motion";
import { initSmooth, lockScroll } from "./lib/smooth";
import Loader from "./components/Loader";
import OverlayHost from "./components/Overlay";
import { AmbientOrbs, Cursor, FloatingTop, Footer, Nav, ScrollProgress } from "./components/Layout";
import OnePage from "./pages/OnePage";

/** Handles deep links like #about or #/work/slug once the site is revealed */
function DeepLink({ ready }: { ready: boolean }) {
  const { go } = useRouter();
  useEffect(() => {
    if (!ready) return;
    const h = window.location.hash;
    if (!h || h === "#" || h === "#home") return;
    const t = parseTarget(h);
    const id = window.setTimeout(() => {
      if (t.overlay) go(h.slice(1));
      else if (t.section) scrollToSection(t.section);
    }, 700);
    return () => clearTimeout(id);
  }, [ready, go]);
  return null;
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    bindSpotlight();
    initSmooth();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-loading", loading);
    lockScroll(loading);
  }, [loading]);

  return (
    <RouterProvider>
      <div className={`page-bg grain relative min-h-screen ${ready ? "is-ready" : ""}`}>
        <AmbientOrbs />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <ScrollProgress />
        <Nav />
        <main id="main" className="relative z-[2]">
          <OnePage />
        </main>
        <div className="relative z-[2]">
          <Footer />
        </div>
        <FloatingTop />
        <OverlayHost />
        <Cursor />
        <DeepLink ready={ready} />
      </div>
      {loading && <Loader onReveal={() => setReady(true)} onDone={() => setLoading(false)} />}
    </RouterProvider>
  );
}
