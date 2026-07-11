"use client";

import { useEffect, useRef } from "react";

const GRID_SPACING = 36;
const REVEAL_RADIUS = 130;
const DOT_SIZE = 6;
const LERP_SPEED = 0.08;

export function CursorDots() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotData = useRef<{
    el: HTMLDivElement;
    baseX: number;
    baseY: number;
    currentOpacity: number;
  }[]>([]);
  const mousePos = useRef({ x: -9999, y: -9999 });
  const rafId = useRef<number>(0);
  const touchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const buildGrid = () => {
      // Clear existing dots
      for (const dot of dotData.current) {
        dot.el.remove();
      }
      dotData.current = [];

      // Build the grid of dots — viewport only (container is fixed)
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cols = Math.ceil(w / GRID_SPACING) + 1;
      const rows = Math.ceil(h / GRID_SPACING) + 1;

      const offsetX = GRID_SPACING / 2;
      const offsetY = GRID_SPACING / 2;

      const dots: typeof dotData.current = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * GRID_SPACING;
          const y = offsetY + row * GRID_SPACING;

          if (x > w || y > h) continue;

          const el = document.createElement("div");
          el.className = "absolute rounded-full";
          el.style.width = `${DOT_SIZE}px`;
          el.style.height = `${DOT_SIZE}px`;
          el.style.left = `${x - DOT_SIZE / 2}px`;
          el.style.top = `${y - DOT_SIZE / 2}px`;
          el.style.opacity = "0";
          el.style.backgroundColor = "rgba(30, 30, 30, 0.6)";
          el.style.border = "1px solid rgba(255, 255, 255, 1)";
          el.style.willChange = "opacity";
          el.style.boxSizing = "border-box";
          container.appendChild(el);

          dots.push({ el, baseX: x, baseY: y, currentOpacity: 0 });
        }
      }

      dotData.current = dots;
    };

    buildGrid();

    const onResize = () => {
      buildGrid();
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        // Cancel any pending hide timer
        if (touchTimer.current) {
          clearTimeout(touchTimer.current);
          touchTimer.current = null;
        }
        mousePos.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const onTouchEnd = () => {
      // Hide dots after 1 second of no touch
      touchTimer.current = setTimeout(() => {
        mousePos.current = { x: -9999, y: -9999 };
        touchTimer.current = null;
      }, 1000);
    };

    const animate = () => {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      for (const dot of dotData.current) {
        const dx = dot.baseX - mx;
        const dy = dot.baseY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let target = 0;
        if (dist < REVEAL_RADIUS) {
          const t = 1 - dist / REVEAL_RADIUS;
          target = t * t * (3 - 2 * t);
        }

        dot.currentOpacity += (target - dot.currentOpacity) * LERP_SPEED;

        if (Math.abs(dot.currentOpacity - target) > 0.005 || target > 0.01) {
          dot.el.style.opacity = String(Math.max(0, dot.currentOpacity));
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId.current);
      if (touchTimer.current) clearTimeout(touchTimer.current);
      for (const dot of dotData.current) {
        dot.el.remove();
      }
      dotData.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 30,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    />
  );
}
