import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CollabFlow from "../components/CollabFlow";
import WhyMe from "../components/WhyMe";
import AboutPanel from "../components/AboutPanel";
import ServicesPanel from "../components/ServicesPanel";
import PortfolioPanel from "../components/PortfolioPanel";
import JournalPanel from "../components/JournalPanel";
import OutroPanel from "../components/OutroPanel";
import Contact from "../components/Contact";
import HorizontalGallery from "../components/HorizontalGallery";
import Footer from "../components/Footer";
import { useSeo } from "../lib/seo";

const SITE_URL = "https://filiphirt.cz";

export default function Home() {
  // resets title/meta when navigating back here client-side (e.g. from a
  // journal article or /cena, which set their own via useSeo)
  useSeo({
    title: "Tvorba webů na zakázku Cheb | Filip Hirt — webdesignér & vývojář",
    description:
      "Tvorba webů na zakázku v Chebu a po celé ČR. Filip Hirt — webdesignér a vývojář. Stavím weby od nuly: precizní řemeslo, teplý vizuál a chytré funkce, které pracují za vás. Restaurace, e-shopy, firemní weby i řešení s AI.",
    canonical: `${SITE_URL}/`,
    ogType: "website",
    ogTitle: "Tvorba webů na zakázku Cheb | Filip Hirt — webdesignér & vývojář",
    ogDescription: "Weby stavěné jako řemeslo. Teplý design, čistý kód a funkce, které mají smysl. Cheb & celá ČR.",
    ogUrl: `${SITE_URL}/`,
    ogImage: `${SITE_URL}/opengraph.jpg`,
    twitterTitle: "Tvorba webů na zakázku Cheb | Filip Hirt",
    twitterDescription: "Weby stavěné jako řemeslo. Teplý design, čistý kód a funkce, které mají smysl.",
    twitterImage: `${SITE_URL}/opengraph.jpg`,
  });

  // skip the intro loader on #now and on return visits within the session
  // (e.g. coming back from a journal article)
  const instant =
    typeof window !== "undefined" &&
    (window.location.hash === "#now" || sessionStorage.getItem("fh-intro-seen") === "1");
  const [loaderDone, setLoaderDone] = useState(instant);
  const [counter, setCounter] = useState(0);
  const [wipeOut, setWipeOut] = useState(false);
  const [pageVisible, setPageVisible] = useState(instant);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (instant) {
      setCounter(100); setWipeOut(true); setPageVisible(true); setLoaderDone(true);
      sessionStorage.setItem("fh-intro-seen", "1");
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
          sessionStorage.setItem("fh-intro-seen", "1");
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
      <Navbar />
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
          <CollabFlow />
          <WhyMe />
          <HorizontalGallery>
            <AboutPanel />
            <ServicesPanel />
            <PortfolioPanel />
            <JournalPanel />
            <section className="panel panel--contact" id="contact" data-nav-theme="light"><Contact /></section>
            <OutroPanel />
          </HorizontalGallery>
        </main>
        <Footer />
      </div>
    </>
  );
}
