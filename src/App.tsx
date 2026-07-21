import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import Lenis from "lenis";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Price from "@/pages/Price";
import Privacy from "@/pages/Privacy";
import Cursor from "@/components/Cursor";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/zurnal/:slug" component={Article} />
      <Route path="/cena" component={Price} />
      <Route path="/soukromi" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

/** Resets scroll to the top on every route change, so a page left scrolled
 * to the bottom doesn't hand that position to the next page. Skipped when
 * the new URL carries a hash (e.g. "/#contact") — those are deliberate
 * deep links and jump to their target on their own. */
function ScrollManager() {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [location]);
  return null;
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
        <ScrollManager />
        <Router />
      </WouterRouter>
    </>
  );
}

export default App;
