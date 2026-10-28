"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { heroContent, heroVideo } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { captureAttribution } from "@/lib/attribution";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

function VideoFunnelCard() {
  const [playing, setPlaying] = useState(false);
  const isVertical = heroVideo.layout === "vertical";

  return (
    <div className="mt-12 mx-auto w-full max-w-2xl">
      <div
        className={`relative overflow-hidden rounded-3xl border border-gray-100 bg-dark shadow-2xl mx-auto ${
          isVertical ? "aspect-[9/16] max-w-[280px] sm:max-w-[340px]" : "aspect-video"
        }`}
      >
        {playing && heroVideo.src ? (
          <video
            src={heroVideo.src}
            poster={heroVideo.poster}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <>
            {/* Muted autoplay preview (optional) or static poster — aspect-ratio
                container keeps layout shift at exactly zero. */}
            {heroVideo.autoplayPreview && heroVideo.src ? (
              <video
                src={heroVideo.src}
                poster={heroVideo.poster}
                muted
                loop
                autoPlay
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden="true"
              />
            ) : (
              <Image
                src={heroVideo.poster}
                alt={heroVideo.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
                priority
              />
            )}
            {heroVideo.src ? (
              <button
                onClick={() => {
                  captureAttribution();
                  setPlaying(true);
                }}
                aria-label="Play video"
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30 cursor-pointer"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-transform hover:scale-105">
                  <svg className="ml-1 h-7 w-7 text-crimson-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            ) : null}
          </>
        )}
      </div>
      <p className="mt-4 text-sm text-gray">
        <span className="font-semibold text-dark">{heroVideo.title}</span>
        {" — "}
        {heroVideo.caption}
      </p>
    </div>
  );
}

export function Hero() {
  // Computed post-mount to avoid server/client hydration mismatch on the href.
  const [waHref, setWaHref] = useState("https://wa.me/");
  useEffect(() => {
    captureAttribution();
    setWaHref(buildWhatsAppUrl("Hi! I found BlackBox Tech online and I'd like to discuss a project."));
  }, []);

  return (
    <section
      id="home"
      className="pt-4 pb-20 md:pt-12 md:pb-28 px-4 text-center bg-white relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-[-100%] animate-gradient-rotate" style={{ background: "conic-gradient(from 0deg at 50% 50%, #fb4545 0deg, #ffffff 72deg, #ddd7fd 144deg, #ffffff 216deg, #fb4545 288deg, #ffffff 360deg)", filter: "blur(80px)", opacity: 0.3 }} />
      </div>
      {/* Scrolling announcement banner */}
      <div className="w-[80%] md:w-1/2 mx-auto mb-10 relative h-6 z-10 mt-20">
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
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee text-sm font-medium text-gray tracking-wide">
            Nigeria offices now open • Software Development • AI Solutions • Professional &amp; Student Training •&nbsp;&nbsp;
            Nigeria offices now open • Software Development • AI Solutions • Professional &amp; Student Training •&nbsp;&nbsp;
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Large landscape logo */}
        <div className="w-[45%] mx-auto mb-8 drop-shadow-5xl bg-black border-4 border-white rounded-full">
          <Image
            src="/logos/logoWhiteLandscape.webp"
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

        {/* Split CTAs: estimate (fast-quote widget), training enrollment, WhatsApp */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="#fast-quote"
            onClick={() => captureAttribution()}
            className="w-full sm:w-auto inline-block rounded-full bg-red-400 px-8 py-3.5 text-lg font-medium text-white hover:bg-crimson-200 transition-colors cursor-pointer"
          >
            Get Instant Project Estimate
          </Link>
          <Link
            href="/register/professional"
            className="w-full sm:w-auto inline-block rounded-full bg-dark px-8 py-3.5 text-lg font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Enroll in Training
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#25D366] px-8 py-3 text-lg font-medium text-[#1da851] hover:bg-[#25D366] hover:text-white transition-colors"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>

        {/* VSL / explainer video funnel card — only shown once a video src is configured */}
        {heroVideo.src ? <VideoFunnelCard /> : null}
      </div>
    </section>
  );
}
