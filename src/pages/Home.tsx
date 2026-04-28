import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import WhyWorkWithMe from "../components/WhyWorkWithMe";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import AsciiBar from "../components/AsciiBar";
import GlitchMarquee from "../components/GlitchMarquee";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [counter, setCounter] = useState(0);
  const [wipeOut, setWipeOut] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add("loading");

    let start: number | null = null;
    const duration = 1200;

    const animateCounter = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      setCounter(Math.round(eased * 100));
      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      } else {
        setTimeout(() => {
          setWipeOut(true);
          setPageVisible(true);
          document.body.classList.remove("loading");
          setTimeout(() => setLoaderDone(true), 900);
        }, 200);
      }
    };

    requestAnimationFrame(animateCounter);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            const fills = entry.target.querySelectorAll<HTMLElement>(".skill-bar-fill");
            fills.forEach((fill) => fill.classList.add("animate"));
            const nums = entry.target.querySelectorAll<HTMLElement>(".section-number");
            nums.forEach((n) => n.classList.add("visible"));
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loaderDone]);

  useEffect(() => {
    const handleNavActive = () => {
      const sections = document.querySelectorAll("section[id]");
      const links = document.querySelectorAll<HTMLElement>(".nav-links a");
      let current = "";
      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (window.scrollY >= el.offsetTop - 120) {
          current = el.id;
        }
      });
      links.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", handleNavActive);
    return () => window.removeEventListener("scroll", handleNavActive);
  }, []);

  return (
    <>
      {!loaderDone && (
        <div className="page-loader" style={{ opacity: wipeOut ? 0 : 1, transition: "opacity 0.3s ease 0.7s", pointerEvents: wipeOut ? "none" : "all" }}>
          <div className="loader-counter">{String(counter).padStart(2, "0")}</div>
          <div className="loader-label">Loading Portfolio</div>
        </div>
      )}
      {!loaderDone && (
        <>
          <div className={`loader-wipe-top${wipeOut ? " wipe-out" : ""}`} />
          <div className={`loader-wipe-bottom${wipeOut ? " wipe-out" : ""}`} />
        </>
      )}

      <div style={{ opacity: pageVisible ? 1 : 0, transition: "opacity 0.4s ease 0.2s" }}>
        <AsciiBar />
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <GlitchMarquee />
          <Services />
          <Portfolio />
          <WhyWorkWithMe />
          <Process />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
