import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blackboxtech.online";

export const metadata: Metadata = {
  title: "Build My Software — Custom Software Development Services",
  description:
    "Get custom software built by experts. BlackBox Tech develops web applications, mobile apps, AI solutions, e-commerce platforms, and enterprise systems. From discovery to deployment — agile process, transparent pricing, 48-hour response time.",
  keywords: ["custom software development", "hire software developers Nigeria", "build web application", "mobile app development service", "startup MVP development", "enterprise software development"],
  alternates: { canonical: `${SITE_URL}/build` },
  openGraph: {
    title: "Build My Software — BlackBox Tech",
    description: "Custom software development service. Web apps, mobile apps, AI solutions, e-commerce — from concept to launch.",
    type: "website",
    url: `${SITE_URL}/build`,
    images: [{ url: `${SITE_URL}/logos/logoBlackPlain.png`, width: 512, height: 512, alt: "BlackBox Tech Build Service" }],
  },
};

export default function BuildLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
