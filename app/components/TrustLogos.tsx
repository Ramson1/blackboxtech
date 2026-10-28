import Image from "next/image";
import { trustClients } from "@/lib/content";

export function TrustLogos() {
  const logoSet = (
    <div className="flex items-center gap-12 md:gap-16 px-6 shrink-0">
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
            className="h-14 md:h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            style={{
              maxHeight: "4.5rem",
              maxWidth: "12rem",
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-white via-purple-50/30 to-white overflow-hidden">
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
      <div className="relative overflow-hidden group">
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
        {/* Hardware-accelerated CSS marquee */}
        <div
          className="flex animate-marquee group-hover:[animation-play-state:paused] w-max"
          style={{ animationDuration: "28s" }}
        >
          {logoSet}
          {logoSet}
        </div>
      </div>
    </section>
  );
}
