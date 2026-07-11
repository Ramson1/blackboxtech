"use client";

import { heroContent } from "@/lib/content";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="pt-4 pb-20 md:pt-12 md:pb-28 px-4 text-center bg-white"
    >
      {/* Scrolling announcement banner */}
      <div className="w-[80%] md:w-1/2 mx-auto mb-10 relative h-6">
        {/* Fade edges */}
        <div
          className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, white, transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, white, transparent)",
          }}
        />
        {/* Scrolling text */}
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="4"
          className="text-sm font-medium text-gray tracking-wide"
        >
          Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria
          offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria
          offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nigeria offices now open...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </marquee>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Large landscape logo */}
        <div className="w-[45%] mx-auto mb-8 drop-shadow-5xl bg-black border-4 border-white rounded-full">
          <Image
            src="/logos/logoWhiteLandscape.png"
            alt="BlackBox Tech"
            width={800}
            height={200}
            className="object-contain"
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>

        <h1 className="text-lg md:text-2xl uppercase tracking-tight text-dark leading-tight" style={{ fontFamily: "var(--font-plus-jakarta)", fontWeight: 900 }}>
          {heroContent.headline}
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray max-w-2xl mx-auto font-medium">
          {heroContent.subtitle}
        </p>
        <p className="mt-4 text-base text-gray max-w-xl mx-auto">
          {heroContent.description}
        </p>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
          className="mt-10 inline-block rounded-full bg-red-400 px-8 py-3.5 text-lg font-medium text-white hover:bg-crimson-200 transition-colors cursor-pointer"
        >
          {heroContent.cta.label}
        </button>
      </div>
    </section>
  );
}
