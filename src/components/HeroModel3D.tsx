import { useEffect, useRef, useState } from "react";

// resting 3/4 view — the camera supplies the downward angle, so keep the
// model near-flat and just turn it to a pleasing corner
const BASE_TILT_X = -0.05;
const BASE_TILT_Y = -0.6;

/**
 * HeroModel3D — loads a small glTF model and renders it with slow rotation +
 * cursor parallax. Built for performance on weak machines:
 *   • Three.js + GLTFLoader are code-split and loaded lazily (only when the
 *     element scrolls near the viewport).
 *   • The render loop PAUSES when the canvas is off-screen or the tab is
 *     hidden — zero GPU work when you're not looking at it.
 *   • Device pixel ratio capped (≤1.5) and frame rate capped (~40fps).
 *   • No shadows, minimal lights, no per-frame geometry work.
 *   • Reduced-motion → a single static frame; no WebGL → renders nothing.
 */
export default function HeroModel3D({
  src,
  className = "",
  scale = 1,
}: {
  src: string;
  className?: string;
  scale?: number;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  // only mount the 3D on capable, larger screens — phones/coarse pointers
  // never render the canvas, so Three.js is never loaded there at all
  const [enabled, setEnabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 821px) and (pointer: fine)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 821px) and (pointer: fine)");
    const on = () => setEnabled(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const mount = mountRef.current;
    if (!mount) return;

    let cleanup: (() => void) | null = null;
    let cancelled = false;
    let started = false;

    const init = async () => {
      if (cancelled || !mount) return;
      const THREE = await import("three");
      const { GLTFLoader } = await import(
        "three/examples/jsm/loaders/GLTFLoader.js"
      );
      if (cancelled || !mount) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        if (!renderer.getContext()) throw new Error("no webgl");
      } catch {
        return; // no WebGL — leave the layout untouched
      }

      const W = () => mount.clientWidth || 320;
      const H = () => mount.clientHeight || 320;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(W(), H());
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = false;
      renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, W() / H(), 0.1, 100);
      // raised + angled so we look DOWN onto the top of the computer (its keys
      // and body read as a dimensional 3/4 shot, not a flat edge-on slab)
      camera.position.set(0.1, 2.0, 3.0);
      camera.lookAt(0, -0.15, 0);

      const group = new THREE.Group();
      scene.add(group);

      // cheap, warm lighting — no shadow maps
      scene.add(new THREE.AmbientLight(0xffffff, 0.85));
      const key = new THREE.DirectionalLight(0xffe6c2, 2.2);
      key.position.set(3, 5, 4);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xd2641e, 1.1);
      rim.position.set(-4, -1, -3);
      scene.add(rim);
      scene.add(new THREE.HemisphereLight(0xfff0dd, 0x2a1206, 1.1));

      let model: import("three").Object3D | null = null;
      const loader = new GLTFLoader();
      loader.load(
        src,
        (gltf) => {
          if (cancelled) return;
          model = gltf.scene;
          group.add(model);
          // size with correct world matrices, then scale, then recentre
          scene.updateMatrixWorld(true);
          const box = new THREE.Box3().setFromObject(model);
          const sizeV = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(sizeV.x, sizeV.y, sizeV.z) || 1;
          model.scale.setScalar((2.0 / maxDim) * scale);
          scene.updateMatrixWorld(true);
          const center = new THREE.Box3()
            .setFromObject(model)
            .getCenter(new THREE.Vector3());
          model.position.sub(center);
          group.rotation.set(BASE_TILT_X, BASE_TILT_Y, 0);
          // many exported GLBs ship metalness=1 with no env map -> renders black.
          // normalise to a lit, matte-ish look so it's always visible.
          model.traverse((o) => {
            const mesh = o as import("three").Mesh;
            const mat = mesh.material as
              | (import("three").MeshStandardMaterial & { isMeshStandardMaterial?: boolean })
              | undefined;
            if (mat && mat.isMeshStandardMaterial) {
              mat.metalness = 0;
              if (mat.roughness < 0.5) mat.roughness = 0.75;
              mat.needsUpdate = true;
            }
          });
          renderOnce();
        },
        undefined,
        (err) => console.error("HeroModel3D: GLB load failed", err)
      );

      const pointer = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      const onMove = (e: MouseEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      if (!reduced) window.addEventListener("mousemove", onMove, { passive: true });

      const onResize = () => {
        const w = W(), h = H();
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderOnce();
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(mount);

      function renderOnce() {
        group.rotation.x = BASE_TILT_X + pointer.y * 0.2;
        renderer.render(scene, camera);
      }

      // --- gated render loop (the core optimisation) ---
      const FRAME_MS = 1000 / 40;
      let raf = 0;
      let last = 0;
      let running = false;
      const frame = (now: number) => {
        if (!running) return;
        raf = requestAnimationFrame(frame);
        if (now - last < FRAME_MS) return;
        last = now;
        pointer.x += (target.x - pointer.x) * 0.06;
        pointer.y += (target.y - pointer.y) * 0.06;
        group.rotation.y += 0.005;
        group.rotation.x = BASE_TILT_X + pointer.y * 0.2;
        group.position.x = pointer.x * 0.14;
        renderer.render(scene, camera);
      };
      const startLoop = () => {
        if (running || reduced) return;
        running = true;
        last = 0;
        raf = requestAnimationFrame(frame);
      };
      const stopLoop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      // pause when off-screen
      const visIO = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) startLoop();
          else stopLoop();
        },
        { threshold: 0.01 }
      );
      visIO.observe(mount);

      // pause when tab hidden
      const onVis = () => {
        if (document.hidden) stopLoop();
        else if (isOnScreen(mount)) startLoop();
      };
      document.addEventListener("visibilitychange", onVis);

      cleanup = () => {
        stopLoop();
        visIO.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("mousemove", onMove);
        scene.traverse((o) => {
          const m = o as import("three").Mesh;
          if (m.geometry) m.geometry.dispose();
          const mat = m.material as
            | import("three").Material
            | import("three").Material[]
            | undefined;
          if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
          else mat?.dispose();
        });
        renderer.dispose();
        if (renderer.domElement.parentNode === mount)
          mount.removeChild(renderer.domElement);
      };
    };

    function isOnScreen(el: HTMLElement) {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    }

    // only spin up Three when the model is near the viewport
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          io.disconnect();
          init(); // init() bails if the mount is hidden (clientHeight 0)
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(mount);

    return () => {
      cancelled = true;
      io.disconnect();
      cleanup?.();
    };
  }, [src, scale, enabled]);

  if (!enabled) return null;
  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
