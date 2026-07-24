import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blackboxtech.online";

export const metadata: Metadata = {
  title: "About Us — Full-Cycle Software Development Company",
  description:
    "Learn about BlackBox Tech — a Nigeria-based software development company empowering startups, enterprises, and institutions with custom software, AI solutions, cloud infrastructure, and professional training. 5+ years of excellence, 150K+ users across deployed products.",
  keywords: ["about BlackBox Tech", "software company Nigeria", "tech company Africa", "software development agency"],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Us — BlackBox Tech",
    description: "A full-cycle product development company building the technology behind tomorrow's businesses. Discovery, design, engineering, and growth under one roof.",
    type: "website",
    url: `${SITE_URL}/about`,
    images: [{ url: `${SITE_URL}/logos/logoBlackPlain.png`, width: 512, height: 512, alt: "BlackBox Tech" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
