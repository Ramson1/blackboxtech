"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { inHouseProducts } from "@/lib/content";

function DeviceMockup({ laptopImage, mobileImage, alt }: { laptopImage: string; mobileImage: string; alt: string }) {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Laptop frame image */}
      <div className="relative">
        <Image
          src={laptopImage}
          alt={`${alt} - Desktop view`}
          width={800}
          height={500}
          className="w-full h-auto rounded-lg"
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Mobile frame image — overlapping, fixed size container */}
      <div className="absolute -bottom-4 -right-2 w-28 md:w-36" style={{ aspectRatio: "9/19" }}>
        <Image
          src={mobileImage}
          alt={`${alt} - Mobile view`}
          fill
          className="drop-shadow-2xl"
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 7rem, 9rem"
        />
      </div>
    </div>
  );
}

export function Products() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const featured = inHouseProducts[featuredIndex];

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  // Auto-scroll animation loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.5; // pixels per frame (~30px/s at 60fps)

    const tick = (time: number) => {
      if (!isPaused && el) {
        if (lastTimeRef.current && time - lastTimeRef.current < 16) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        lastTimeRef.current = time;
        el.scrollLeft += speed;
        // Loop back to start when reaching the end
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
        checkScroll();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused, checkScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Start scrolled to middle
    const mid = (el.scrollWidth - el.clientWidth) / 2;
    el.scrollLeft = mid;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="products" className="py-20 md:py-28 bg-gradient-to-b from-white via-purple-50/20 to-white overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-16 px-4">
        <p className="text-xs font-semibold text-crimson-200 uppercase tracking-[0.25em] mb-2">
          What We&apos;ve Built
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
          Our Products
        </h2>
        <p className="text-gray max-w-2xl mx-auto text-lg">
          Products we&apos;ve built from the ground up to solve real problems.
        </p>
      </div>

      {/* Featured product showcase */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Device mockups */}
          <div className="order-2 lg:order-1">
            <DeviceMockup laptopImage={featured.laptopImage} mobileImage={featured.mobileImage} alt={featured.name} />
          </div>

          {/* Product info */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-sm font-semibold text-crimson-200 uppercase tracking-wider mb-2">
                {featured.category}
              </p>
              <h3 className="text-3xl md:text-4xl font-extrabold text-dark">
                {featured.name}
              </h3>
            </div>
            <p className="text-gray text-lg leading-relaxed">
              {featured.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {featured.features.slice(0, 5).map((f) => (
                <span key={f} className="text-xs font-medium px-3 py-1.5 rounded-full bg-crimson-50/50 text-dark border border-crimson-100/30">
                  {f}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray font-medium">
              <span className="font-semibold text-dark">Tech:</span> {featured.technologies}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable product cards with nav buttons */}
      <div className="relative">
        {/* Left button */}
        <button
          onClick={() => scroll("left")}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center cursor-pointer transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right button */}
        <button
          onClick={() => scroll("right")}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center cursor-pointer transition-opacity ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Fade edges */}
        <div
          className={`absolute inset-y-0 left-0 w-16 z-10 pointer-events-none transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
          style={{ background: "linear-gradient(to right, white, transparent)" }}
        />
        <div
          className={`absolute inset-y-0 right-0 w-16 z-10 pointer-events-none transition-opacity ${canScrollRight ? "opacity-100" : "opacity-0"}`}
          style={{ background: "linear-gradient(to left, white, transparent)" }}
        />

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-6 px-8 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {inHouseProducts.map((product, idx) => (
            <button
              key={`${product.name}-${idx}`}
              onClick={() => setFeaturedIndex(idx)}
              className={`flex-shrink-0 w-72 p-6 rounded-2xl text-left transition-all cursor-pointer ${
                featuredIndex === idx
                  ? "bg-dark text-white shadow-xl scale-[1.02]"
                  : "bg-white border border-gray-100 hover:shadow-md hover:border-crimson-100"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                  featuredIndex === idx
                    ? "bg-crimson-200"
                    : "bg-gradient-to-br from-crimson-50 to-purple-50"
                }`}
              >
                <span
                  className={`text-lg font-black ${
                    featuredIndex === idx ? "text-white" : "text-dark"
                  }`}
                >
                  {product.name.charAt(0)}
                </span>
              </div>
              <h4
                className={`text-lg font-bold mb-1 ${
                  featuredIndex === idx ? "text-white" : "text-dark"
                }`}
              >
                {product.name}
              </h4>
              <p
                className={`text-xs font-medium uppercase tracking-wider mb-3 ${
                  featuredIndex === idx ? "text-crimson-100" : "text-crimson-200"
                }`}
              >
                {product.category}
              </p>
              <p
                className={`text-sm leading-relaxed line-clamp-3 ${
                  featuredIndex === idx ? "text-white/70" : "text-gray"
                }`}
              >
                {product.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* View All button */}
      <div className="text-center mt-12">
        <a
          href="/products"
          className="inline-flex items-center gap-2 rounded-full bg-dark px-8 py-3.5 text-base font-medium text-white hover:bg-dark/80 transition-colors border-2 border-white shadow-lg"
        >
          View All Products
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
