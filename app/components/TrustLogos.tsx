import { trustClients } from "@/lib/content";

export function TrustLogos() {
  const brandList = (
    <div className="flex items-center gap-6 md:gap-10 px-6">
      {trustClients.map((client) => (
        <div
          key={client.name}
          className="flex items-center gap-6 md:gap-10"
        >
          <span className="inline-flex items-center px-6 py-3 rounded-full bg-gray-50 border border-gray-100 text-base md:text-lg font-semibold text-dark/70 select-none whitespace-nowrap hover:border-crimson-100 hover:text-dark transition-colors">
            {client.name}
          </span>
          <span className="text-gray-200 text-lg select-none">&bull;</span>
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
      <div className="relative overflow-hidden">
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
        <marquee behavior="scroll" direction="left" scrollamount="5">
          <div className="flex">
            {brandList}
            {brandList}
          </div>
        </marquee>
      </div>
    </section>
  );
}
