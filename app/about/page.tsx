"use client";

import Link from "next/link";
import Image from "next/image";
import { metrics } from "@/lib/content";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Hero Header */}
      <section className="pt-32 pb-16 px-4 text-center -mt-20 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(251,69,69,0.12) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm font-medium mb-6 transition-colors">
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">About Us</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We are BlackBox Tech — a full-cycle product development company building the technology behind tomorrow&apos;s businesses.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white/5 rounded-2xl p-8 md:p-10 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-white/70 leading-relaxed text-base">
            To empower startups, enterprises, and institutions with cutting-edge technology solutions — from ideation and design to development, deployment, and growth. We bridge the gap between vision and execution, delivering secure, scalable, and AI-powered digital products that move markets.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
              <p className="text-3xl font-extrabold text-white mb-1">
                {m.prefix}{m.value}{m.suffix}
              </p>
              <p className="text-white/50 text-sm">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6">What We Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Software Development", desc: "Custom web, mobile, and API solutions built with modern stacks and engineering best practices.", icon: "💻" },
            { title: "UI/UX Design", desc: "Intuitive interfaces and experiences crafted through research, prototyping, and user testing.", icon: "🎨" },
            { title: "Training Programs", desc: "Hands-on courses for students and professionals in development, design, cybersecurity, and more.", icon: "🎓" },
            { title: "Cloud & Security", desc: "Scalable cloud infrastructure and cybersecurity solutions to protect and power your products.", icon: "🔒" },
          ].map((item) => (
            <div key={item.title} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors">
              <span className="text-3xl mb-3 block">{item.icon}</span>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Our Values</h2>
        <div className="space-y-4">
          {[
            { title: "Innovation First", desc: "We embrace emerging technologies and creative problem-solving to deliver solutions that give our clients a competitive edge." },
            { title: "Client Partnership", desc: "We work alongside our clients as true partners, ensuring transparent communication, timely delivery, and shared success." },
            { title: "Quality & Security", desc: "Every product we build is designed with performance, scalability, and security at its core — no shortcuts, no compromises." },
            { title: "Empowering Talent", desc: "Through our training programs, we invest in the next generation of tech talent, equipping them with real-world skills." },
          ].map((v) => (
            <div key={v.title} className="flex gap-4 bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="w-1 rounded-full bg-gradient-to-b from-[#fb4545dc] to-purple-400 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-white mb-1">{v.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logo */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white/5 rounded-2xl p-10 border border-white/10 text-center">
          <Image
            src="/logos/logoWhiteLandscape.png"
            alt="BlackBox Tech"
            width={180}
            height={45}
            className="object-contain mx-auto mb-4"
            style={{ width: "auto", height: "auto" }}
          />
          <p className="text-white/50 text-sm">
            Discover. Design. Deliver.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to build something great?</h2>
        <p className="text-white/50 mb-6">Let&apos;s turn your idea into a market-ready product.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#fb4545dc] hover:bg-[#fb4545dc]/80 text-white font-semibold text-sm transition-colors"
          >
            Let&apos;s Chat
          </button>
          <Link
            href="/build"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
          >
            Book Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}
