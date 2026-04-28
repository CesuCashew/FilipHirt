import { useEffect, useRef, useState } from "react";

const WORDS = [
  "REACT",
  "AI",
  "SEO",
  "UX/UI",
  "RESTAURACE",
  "E-COMMERCE",
  "PERFORMANCE",
  "MOTION",
  "BRAND",
  "FIGMA",
  "TYPESCRIPT",
  "ANALYTICS",
];

const CHARS = "!<>-_\\/[]{}—=+*^?#§$%&@";

function scrambleWord(word: string): string {
  return word
    .split("")
    .map((c) => (c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
    .join("");
}

export default function GlitchMarquee() {
  const [glitchIndex, setGlitchIndex] = useState<number>(-1);
  const [glitchedWord, setGlitchedWord] = useState<string>("");
  const intervalRef = useRef<number | null>(null);
  const scrambleFrameRef = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      const idx = Math.floor(Math.random() * WORDS.length);
      setGlitchIndex(idx);
      const target = WORDS[idx];
      let frame = 0;
      const max = 14;
      const animate = () => {
        if (frame < max) {
          setGlitchedWord(scrambleWord(target));
          frame++;
          scrambleFrameRef.current = window.setTimeout(animate, 36);
        } else {
          setGlitchedWord("");
          setGlitchIndex(-1);
        }
      };
      animate();
    };
    intervalRef.current = window.setInterval(tick, 2200);
    tick();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (scrambleFrameRef.current) window.clearTimeout(scrambleFrameRef.current);
    };
  }, []);

  // Render the words twice for seamless marquee
  const Row = ({ aria = false }: { aria?: boolean }) => (
    <div className="glitch-marquee-row" aria-hidden={aria}>
      {WORDS.map((w, i) => (
        <span key={i} className="glitch-marquee-item">
          <span className="glitch-marquee-word">
            {glitchIndex === i && glitchedWord ? glitchedWord : w}
          </span>
          <span className="glitch-marquee-sep">●</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="glitch-marquee">
      <div className="glitch-marquee-track">
        <Row />
        <Row aria />
      </div>
    </div>
  );
}
