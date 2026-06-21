import { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import AboutPanel from "../components/AboutPanel";
import ServicesPanel from "../components/ServicesPanel";
import PortfolioPanel from "../components/PortfolioPanel";
import JournalPanel from "../components/JournalPanel";
import OutroPanel from "../components/OutroPanel";
import Process from "../components/Process";
import Contact from "../components/Contact";
import HorizontalGallery from "../components/HorizontalGallery";

export default function Home() {
  const instant = typeof window !== "undefined" && window.location.hash === "#now";
  const [loaderDone, setLoaderDone] = useState(instant);
  const [counter, setCounter] = useState(0);
  const [wipeOut, setWipeOut] = useState(false);
  const [pageVisible, setPageVisible] = useState(instant);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === "#now") {
      setCounter(100); setWipeOut(true); setPageVisible(true); setLoaderDone(true);
      return;
    }
    document.body.classList.add("loading");
    let start: number | null = null;
    const duration = 1200;
    const animateCounter = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setCounter(Math.round(eased * 100));
      if (p < 1) requestAnimationFrame(animateCounter);
      else
        setTimeout(() => {
          setWipeOut(true);
          setPageVisible(true);
          document.body.classList.remove("loading");
          setTimeout(() => setLoaderDone(true), 900);
        }, 200);
    };
    requestAnimationFrame(animateCounter);
  }, []);

  // scroll-reveal for elements that opt in
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<Element>(".reveal, .clip-reveal"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("will-reveal");
            e.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    requestAnimationFrame(() => {
      els.forEach((el) => {
        if (!el.classList.contains("revealed")) el.classList.add("will-reveal");
      });
    });
    return () => obs.disconnect();
  }, [loaderDone]);

  // overall page progress bar
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {!loaderDone && (
        <div
          className="page-loader"
          style={{
            opacity: wipeOut ? 0 : 1,
            transition: "opacity 0.3s ease 0.7s",
            pointerEvents: wipeOut ? "none" : "all",
          }}
        >
          <div className="loader-counter">{String(counter).padStart(2, "0")}</div>
          <div className="loader-label">Filip Hirt — Portfolio</div>
        </div>
      )}
      {!loaderDone && (
        <>
          <div className={`loader-wipe-top${wipeOut ? " wipe-out" : ""}`} />
          <div className={`loader-wipe-bottom${wipeOut ? " wipe-out" : ""}`} />
        </>
      )}

      <div style={{ opacity: pageVisible ? 1 : 0, transition: instant ? "none" : "opacity 0.4s ease 0.2s" }}>
        <div className="page-progress"><div ref={progressRef} className="page-progress-fill" /></div>

        <main>
          <Hero />
          <HorizontalGallery>
            <AboutPanel />
            <ServicesPanel />
            <PortfolioPanel />
            <JournalPanel />
            <section className="panel panel--chat" id="chatbot"><Process /></section>
            <section className="panel panel--contact" id="contact"><Contact /></section>
            <OutroPanel />
          </HorizontalGallery>
        </main>
      </div>
    </>
  );
}
