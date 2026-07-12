"use client";

import { metrics } from "@/lib/content";
import { useCountUp } from "@/app/hooks/useCountUp";

function StatCounter({
  value,
  prefix,
  suffix,
  label,
}: {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className="relative text-center px-6 py-8">
      {/* Number */}
      <div className="text-5xl md:text-6xl font-black text-white leading-none">
        {prefix}
        {count}
        {suffix}
      </div>
      {/* Label */}
      <p className="mt-4 text-sm md:text-base text-white/60 font-medium uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-20 md:py-28 bg-dark relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-[-100%] animate-gradient-rotate" style={{ background: "conic-gradient(from 0deg at 50% 50%, #1b1b1b 0deg, #fb454540 72deg, #222222 144deg, #ddd7fd30 216deg, #1b1b1b 288deg, #fb454540 360deg)", filter: "blur(60px)", opacity: 0.9 }} />
      </div>

      {/* Heading */}
      <div className="text-center mb-14 px-4 relative z-10">
        <p className="text-xs font-semibold text-crimson-200 uppercase tracking-[0.25em] mb-2">
          Our Impact
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Numbers That Speak
        </h2>
      </div>

      {/* Stats grid */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="relative flex items-center justify-center">
            {/* Vertical divider between items on desktop */}
            {index < metrics.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/10" />
            )}
            <StatCounter
              value={metric.value}
              prefix={metric.prefix}
              suffix={metric.suffix}
              label={metric.label}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
