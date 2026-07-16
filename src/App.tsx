import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import Lenis from "lenis";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Cursor from "@/components/Cursor";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/zurnal/:slug" component={Article} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Smooth, weighted scrolling (cydstumpel-style). Respects reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Cursor />
      {/* Warm photographic field beneath the whole page (hero paints its own) */}
      <div className="page-canvas" aria-hidden="true" />
      <div className="noise-overlay" />
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </>
  );
}

export default App;
