"use client";

import Image from "next/image";
import { inHouseProducts } from "@/lib/content";
import Link from "next/link";

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

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-white">
      {/* Hero header */}
      <div className="pt-32 pb-16 px-4 text-center -mt-20" style={{ background: "linear-gradient(135deg, #fb4545dc 0%, #ddd7fd 100%)" }}>
        <p className="text-xs font-semibold text-white/80 uppercase tracking-[0.25em] mb-2">
          What We&apos;ve Built
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Our Products
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg">
          Products we&apos;ve built from the ground up to solve real problems.
        </p>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {inHouseProducts.map((product) => {
            return (
              <div
                key={product.name}
                className="group"
              >
                {/* Device mockups */}
                <div className="mb-8">
                  <DeviceMockup laptopImage={product.laptopImage} mobileImage={product.mobileImage} alt={product.name} />
                </div>

                {/* Product info */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-crimson-200 uppercase tracking-wider mb-2">
                      {product.category}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-dark">
                      {product.name}
                    </h2>
                  </div>
                  <p className="text-gray text-base leading-relaxed">
                    {product.description}
                  </p>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-sm font-bold text-dark mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((f) => (
                        <span key={f} className="text-xs font-medium px-3 py-1.5 rounded-full bg-crimson-50/50 text-dark border border-crimson-100/30">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <p className="text-xs text-gray font-medium">
                    <span className="font-semibold text-dark">Technologies:</span> {product.technologies}
                  </p>
                </div>

                {/* Divider */}
                <div className="mt-12 border-t border-gray-100" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Back to home */}
      <div className="text-center pb-20">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 rounded-full bg-dark px-8 py-3.5 text-base font-medium text-white hover:bg-dark/80 transition-colors border-2 border-white shadow-lg"
        >
          <svg
            className="w-4 h-4 rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          Back to Products
        </Link>
      </div>
    </div>
  );
}
