import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#§$%&@";

interface ScrambleOptions {
  duration?: number;
  speed?: number;
  trigger?: "mount" | "view" | "manual";
  delay?: number;
}

export function useScramble(target: string, opts: ScrambleOptions = {}) {
  const { duration = 60, speed = 1, trigger = "mount", delay = 0 } = opts;
  const [output, setOutput] = useState(target);
  const elRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef(0);
  const rafRef = useRef(0);
  const startedRef = useRef(false);

  const run = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setTimeout(() => {
      const queue = target.split("").map((c, i) => ({
        from: " ",
        to: c,
        start: Math.floor(Math.random() * 20) + i * 1.5,
        end: Math.floor(Math.random() * 20) + duration + i * 1.5,
      }));
      frameRef.current = 0;

      const tick = () => {
        let out = "";
        let complete = 0;
        for (const q of queue) {
          if (frameRef.current >= q.end) {
            out += q.to;
            complete++;
          } else if (frameRef.current >= q.start) {
            if (q.to === " ") {
              out += " ";
            } else {
              out += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          } else {
            out += q.from;
          }
        }
        setOutput(out);
        if (complete === queue.length) return;
        frameRef.current += speed;
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    }, delay);
  };

  const reset = () => {
    cancelAnimationFrame(rafRef.current);
    startedRef.current = false;
    frameRef.current = 0;
  };

  useEffect(() => {
    if (trigger === "mount") {
      run();
    } else if (trigger === "view" && elRef.current) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              run();
              obs.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      obs.observe(elRef.current);
      return () => obs.disconnect();
    }
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, trigger]);

  return { output, elRef, run, reset };
}
