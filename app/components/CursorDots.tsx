"use client";

import { useEffect, useRef } from "react";

const GRID_SPACING = 36;
const REVEAL_RADIUS = 130;
const DOT_RADIUS = 2.5;

export function CursorDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only run on desktop devices with a precision pointer (mouse)
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -9999;
    let mouseY = -9999;
    let rafId = 0;
    let isMouseOver = false;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isMouseOver && mouseX > -100) {
        const startX = Math.max(0, mouseX - REVEAL_RADIUS);
        const endX = Math.min(width, mouseX + REVEAL_RADIUS);
        const startY = Math.max(0, mouseY - REVEAL_RADIUS);
        const endY = Math.min(height, mouseY + REVEAL_RADIUS);

        const firstCol = Math.floor(startX / GRID_SPACING) * GRID_SPACING + GRID_SPACING / 2;
        const firstRow = Math.floor(startY / GRID_SPACING) * GRID_SPACING + GRID_SPACING / 2;

        for (let x = firstCol; x <= endX; x += GRID_SPACING) {
          for (let y = firstRow; y <= endY; y += GRID_SPACING) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < REVEAL_RADIUS) {
              const t = 1 - dist / REVEAL_RADIUS;
              const alpha = t * t * (3 - 2 * t) * 0.45;

              ctx.beginPath();
              ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(30, 30, 30, ${alpha})`;
              ctx.fill();
            }
          }
        }
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ width: "100vw", height: "100vh" }}
      aria-hidden="true"
    />
  );
}
