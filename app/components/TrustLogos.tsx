"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { trustClients } from "@/lib/content";

export function TrustLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  const singleSetWidthRef = useRef<number>(0);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const singleW = singleSetWidthRef.current;
    if (singleW > 0 && el.scrollLeft >= singleW) {
      el.scrollLeft -= singleW;
    }
  }, []);

  // Auto-scroll animation loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.5;

    const tick = (time: number) => {
      if (!isPaused && el) {
        if (lastTimeRef.current && time - lastTimeRef.current < 16) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        lastTimeRef.current = time;
        el.scrollLeft += speed;
        checkScroll();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused, checkScroll]);

  // Measure single set width and start from center on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Measure the first logoSet div width
    const firstSet = el.firstElementChild as HTMLElement | null;
    if (firstSet) {
      singleSetWidthRef.current = firstSet.scrollWidth;
    }
    // Start from the middle copy
    const mid = singleSetWidthRef.current;
    el.scrollLeft = mid;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const logoSet = (
    <div className="flex items-center gap-12 md:gap-16 px-6">
      {trustClients.map((client) => (
        <div
          key={client.name}
          className="flex-shrink-0 flex items-center justify-center h-20 w-40 md:w-52"
        >
          <Image
            src={client.logo}
            alt={client.name}
            width={180}
            height={64}
            className="h-14 md:h-16 w-auto object-contain"
            style={{
              filter: "grayscale(100%)",
              opacity: 0.6,
              width: "auto",
              height: "auto",
              maxHeight: "4.5rem",
              maxWidth: "12rem",
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-white via-purple-50/30 to-white">
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold text-crimson-200 uppercase tracking-[0.25em] mb-2">
          Trusted Partners
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-dark">
          Brands Who Trust Us
        </h2>
      </div>

      {/* Scrolling marquee */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, white, transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, white, transparent)",
          }}
        />
        {/* Scrolling brands */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {logoSet}
          {logoSet}
          {logoSet}
        </div>
      </div>
    </section>
  );
}
