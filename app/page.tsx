import { Hero } from "./components/Hero";
import { TrustLogos } from "./components/TrustLogos";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { Products } from "./components/Products";
import { BlogPreview } from "./components/BlogPreview";
import { Awards } from "./components/Awards";
import { FAQ } from "./components/FAQ";
import { JsonLd } from "./components/JsonLd";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blackboxtech.online";

export const metadata: Metadata = {
  title: "BlackBox Tech — Software Development, Training & AI Solutions in Nigeria",
  description:
    "BlackBox Tech is a full-cycle software development company in Nigeria offering custom web & mobile app development, AI solutions, cybersecurity, UI/UX design, and professional software training. From startup MVPs to enterprise systems — discover, design, deliver.",
  keywords: [
    "software development company Nigeria",
    "web development Lagos",
    "mobile app development Nigeria",
    "AI solutions Africa",
    "software training Nigeria",
    "custom software development",
    "startup technology partner",
    "product design company",
    "full-stack development agency",
    "cybersecurity services Nigeria",
    "cloud computing services Africa",
    "UI UX design agency",
    "DevOps company Nigeria",
    "enterprise software development",
    "SaaS development Africa",
    "BlackBox Tech",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "BlackBox Tech — Software Development, Training & AI Solutions",
    description: "Full-cycle product development company in Nigeria. Custom software, AI solutions, cloud infrastructure, and professional training — from ideation to market-ready products.",
    type: "website",
    siteName: "BlackBox Tech",
    locale: "en_NG",
    url: SITE_URL,
    images: [
      { url: `${SITE_URL}/logos/logoBlackPlain.png`, width: 512, height: 512, alt: "BlackBox Tech — Software Development Company" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackBox Tech — Software Development, Training & AI Solutions",
    description: "Full-cycle product development company in Nigeria. Custom software, AI solutions, and professional training.",
    images: [`${SITE_URL}/logos/logoBlackPlain.png`],
  },
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BlackBox Tech",
    "url": SITE_URL,
    "description": "Full-cycle software development company in Nigeria offering custom web & mobile app development, AI solutions, and professional software training.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    "publisher": {
      "@type": "Organization",
      "name": "BlackBox Tech",
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logos/logoBlackPlain.png` },
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "Service", "name": "Custom Software Development", "description": "End-to-end software development services including web applications, mobile apps, APIs, and enterprise systems built with modern technology stacks.", "provider": { "@type": "Organization", "name": "BlackBox Tech" } },
      { "@type": "Service", "name": "UI/UX Design", "description": "User-centered design services including UX research, wireframing, prototyping, and visual design for web and mobile applications.", "provider": { "@type": "Organization", "name": "BlackBox Tech" } },
      { "@type": "Service", "name": "AI & Machine Learning Solutions", "description": "Artificial intelligence and machine learning solutions including NLP, computer vision, predictive analytics, and intelligent automation.", "provider": { "@type": "Organization", "name": "BlackBox Tech" } },
      { "@type": "Service", "name": "Cloud & DevOps", "description": "Cloud infrastructure setup, migration, and management on AWS, Azure, and GCP. CI/CD pipeline automation and containerization.", "provider": { "@type": "Organization", "name": "BlackBox Tech" } },
      { "@type": "Service", "name": "Cybersecurity", "description": "Comprehensive cybersecurity services including threat assessment, penetration testing, security audits, and compliance consulting.", "provider": { "@type": "Organization", "name": "BlackBox Tech" } },
      { "@type": "Service", "name": "Software Training Programs", "description": "Professional and student training programs in web development, mobile development, AI, cybersecurity, data analytics, UI/UX design, and more.", "provider": { "@type": "Organization", "name": "BlackBox Tech" } },
    ],
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={serviceSchema} />
      <Hero />
      <TrustLogos />
      <Stats />
      <Services />
      <Products />
      <BlogPreview />
      <Awards />
      <FAQ />
    </>
  );
}
