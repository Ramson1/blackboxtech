import { awards } from "@/lib/content";

const awardMeta = [
  { emoji: "🏆", year: "2017", gradient: "from-amber-400/20 to-orange-500/10" },
  { emoji: "🛡️", year: "2022", gradient: "from-blue-400/20 to-indigo-500/10" },
  { emoji: "⭐", year: "2023", gradient: "from-crimson-100/40 to-pink-400/10" },
  { emoji: "🎨", year: "2024", gradient: "from-purple-400/20 to-violet-500/10" },
];

export function Awards() {
  return (
    <section
      id="company"
      className="py-20 md:py-28 bg-dark relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-[-100%] animate-gradient-rotate" style={{ background: "conic-gradient(from 0deg at 50% 50%, #1b1b1b 0deg, #fb4545 72deg, #1a1a2e 144deg, #ddd7fd 216deg, #1b1b1b 288deg, #fb4545 360deg)", filter: "blur(100px)", opacity: 0.25 }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-crimson-200 uppercase tracking-[0.25em] mb-2">
            Recognition
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Awards &amp; Accreditations
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Milestones that define our commitment to excellence and innovation.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">
          {/* Featured large card — first award */}
          <div className="md:col-span-7 group relative">
            <div
              className={`relative h-full p-8 rounded-3xl bg-gradient-to-br ${awardMeta[0].gradient} border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all overflow-hidden`}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-6xl">{awardMeta[0].emoji}</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-white/70 uppercase tracking-wider">
                    {awardMeta[0].year}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                  {awards[0].title}
                </h3>
                <p className="text-white/50 text-base">{awards[0].org}</p>
              </div>
            </div>
          </div>

          {/* Right column — stacked smaller cards */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {/* Second award */}
            <div className="group relative">
              <div
                className={`relative p-6 rounded-3xl bg-gradient-to-br ${awardMeta[1].gradient} border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="relative z-10 flex items-center gap-4">
                  <span className="text-4xl">{awardMeta[1].emoji}</span>
                  <div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                      {awardMeta[1].year}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {awards[1].title}
                    </h3>
                    <p className="text-sm text-white/50">{awards[1].org}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Third award */}
            <div className="group relative">
              <div
                className={`relative p-6 rounded-3xl bg-gradient-to-br ${awardMeta[2].gradient} border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="relative z-10 flex items-center gap-4">
                  <span className="text-4xl">{awardMeta[2].emoji}</span>
                  <div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                      {awardMeta[2].year}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {awards[2].title}
                    </h3>
                    <p className="text-sm text-white/50">{awards[2].org}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom wide card — fourth award */}
          <div className="md:col-span-12 group relative">
            <div
              className={`relative p-6 md:p-8 rounded-3xl bg-gradient-to-br ${awardMeta[3].gradient} border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <span className="text-5xl">{awardMeta[3].emoji}</span>
                <div className="text-center md:text-left">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                    {awardMeta[3].year}
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-1">
                    {awards[3].title}
                  </h3>
                  <p className="text-white/50">{awards[3].org}</p>
                </div>
                {/* Decorative stars */}
                <div className="hidden md:flex ml-auto gap-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-xl">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badge */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/30 font-medium">
            🌍 Trusted by 50+ clients across Africa and beyond
          </p>
        </div>
      </div>
    </section>
  );
}
