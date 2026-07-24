import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blackboxtech.online";

export const metadata: Metadata = {
  title: "Blog — Software Development, AI, Tech & Training Insights",
  description:
    "Read expert articles on software development, AI & machine learning, startup technology, cybersecurity, cloud computing, product design, and software training. Stay updated with the latest tech trends from the BlackBox Tech team.",
  keywords: [
    "software development blog",
    "AI technology articles",
    "tech insights Nigeria",
    "startup advice",
    "cybersecurity articles",
    "cloud computing blog",
    "web development tutorials",
    "software training news",
    "product design insights",
    "tech trends Africa",
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog — BlackBox Tech Insights",
    description: "Expert articles on software development, AI, startup tech, cybersecurity, and more from the BlackBox Tech team.",
    type: "website",
    url: `${SITE_URL}/blog`,
    images: [{ url: `${SITE_URL}/logos/logoBlackPlain.png`, width: 512, height: 512, alt: "BlackBox Tech Blog" }],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
