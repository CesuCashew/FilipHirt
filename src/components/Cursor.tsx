import { useEffect, useRef } from "react";

export default function Cursor() {
  const arrowRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const prevPos = useRef({ x: -200, y: -200 });
  const rotation = useRef(0);
  const targetRotation = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (isMobile) return;

    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      prevPos.current = { ...mousePos.current };
      mousePos.current = { x: e.clientX, y: e.clientY };

      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 2) {
        targetRotation.current = Math.atan2(dy, dx) * (180 / Math.PI) + 45;
      }
    };

    const lerpAngle = (a: number, b: number, t: number) => {
      let diff = b - a;
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      return a + diff * t;
    };

    const animate = () => {
      rotation.current = lerpAngle(rotation.current, targetRotation.current, 0.1);

      if (arrowRef.current) {
        arrowRef.current.style.left = `${mousePos.current.x}px`;
        arrowRef.current.style.top = `${mousePos.current.y}px`;
        arrowRef.current.style.transform = `translate(-4px, -4px) rotate(${rotation.current}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => arrowRef.current?.classList.add("cursor-arrow--hovered");
    const onLeaveLink = () => arrowRef.current?.classList.remove("cursor-arrow--hovered");

    const attachListeners = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="cursor-arrow" ref={arrowRef}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-arrow__svg"
      >
        {/* Blurred glow layer */}
        <path
          d="M4 4L24 12L14 14L12 24L4 4Z"
          fill="#C8F135"
          className="cursor-arrow__glow-path"
        />
        {/* Solid arrow */}
        <path
          d="M4 4L24 12L14 14L12 24L4 4Z"
          fill="#C8F135"
        />
        {/* Inner highlight */}
        <path
          d="M6 6L20 12.5L13.2 14L11.8 20.5L6 6Z"
          fill="rgba(255,255,255,0.25)"
        />
      </svg>
    </div>
  );
}
