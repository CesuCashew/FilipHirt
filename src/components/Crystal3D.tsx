import { useEffect, useRef, useState } from "react";

/**
 * A self-contained warm faceted "amber stone" — slow auto-rotation,
 * mouse parallax, a blueprint wireframe overlay. Three.js is loaded
 * lazily (only when this scrolls near the viewport) and code-split into
 * its own chunk. Falls back to an SVG line-art ornament if WebGL is
 * unavailable or motion is reduced.
 */
export default function Crystal3D({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cleanup: (() => void) | null = null;
    let cancelled = false;

    const init = async () => {
      const THREE = await import("three");
      if (cancelled || !mount) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        if (!renderer.getContext()) throw new Error("no webgl");
      } catch {
        setFallback(true);
        return;
      }

      const size = () => Math.max(220, Math.min(mount.clientWidth, 420));
      let w = size();
      renderer.setSize(w, w);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.display = "block";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(0, 0, 4.3);

      const group = new THREE.Group();
      scene.add(group);

      const geo = new THREE.IcosahedronGeometry(1.28, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xb2431a,
        metalness: 0.18,
        roughness: 0.42,
        flatShading: true,
      });
      const stone = new THREE.Mesh(geo, mat);
      group.add(stone);

      const wireGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.34, 0));
      const wireMat = new THREE.LineBasicMaterial({ color: 0xd2641e, transparent: true, opacity: 0.4 });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      group.add(wire);

      scene.add(new THREE.AmbientLight(0xb23a17, 0.55));
      const key = new THREE.DirectionalLight(0xf3ad5e, 2.4);
      key.position.set(3, 4, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xa9761b, 1.5);
      rim.position.set(-4, -2, -3);
      scene.add(rim);
      const fill = new THREE.PointLight(0xd2641e, 6, 14);
      fill.position.set(-2, 2, 3);
      scene.add(fill);

      const pointer = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      const onMove = (e: MouseEvent) => {
        const r = mount.getBoundingClientRect();
        target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      if (!reduced) window.addEventListener("mousemove", onMove);

      const onResize = () => { w = size(); renderer.setSize(w, w); };
      const ro = new ResizeObserver(onResize);
      ro.observe(mount);

      let raf = 0;
      const render = () => {
        pointer.x += (target.x - pointer.x) * 0.05;
        pointer.y += (target.y - pointer.y) * 0.05;
        if (!reduced) group.rotation.y += 0.0036;
        group.rotation.x = pointer.y * 0.4;
        group.rotation.z = pointer.x * -0.12;
        group.position.x = pointer.x * 0.12;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };
      render();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        window.removeEventListener("mousemove", onMove);
        geo.dispose();
        mat.dispose();
        wireGeo.dispose();
        wireMat.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    };

    // Only load three when the stone is near the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          io.disconnect();
          init();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(mount);

    return () => {
      cancelled = true;
      io.disconnect();
      cleanup?.();
    };
  }, []);

  if (fallback) {
    return (
      <svg className={className} viewBox="0 0 360 320" fill="none" aria-hidden="true">
        <circle cx="180" cy="160" r="78" stroke="var(--terracotta)" strokeWidth="1" opacity="0.6" />
        <circle cx="180" cy="160" r="110" stroke="var(--terracotta)" strokeWidth="1" strokeDasharray="3 7" opacity="0.4" />
        <circle cx="180" cy="160" r="8" fill="var(--terracotta)" opacity="0.8" />
      </svg>
    );
  }

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
