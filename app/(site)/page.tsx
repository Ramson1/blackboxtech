import { Hero } from "@/app/components/Hero";
import { TrustLogos } from "@/app/components/TrustLogos";
import { Stats } from "@/app/components/Stats";
import { Services } from "@/app/components/Services";
import { FastQuote } from "@/app/components/FastQuote";
import { Products } from "@/app/components/Products";
import { BlogPreview } from "@/app/components/BlogPreview";
import { Awards } from "@/app/components/Awards";
import { FAQ } from "@/app/components/FAQ";
import { JsonLd } from "@/app/components/JsonLd";
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
    description:
      "Full-cycle product development company in Nigeria. Custom software, AI solutions, cloud infrastructure, and professional training — from ideation to market-ready products.",
    type: "website",
    siteName: "BlackBox Tech",
    locale: "en_NG",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "BlackBox Tech — Discover. Design. Deliver.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackBox Tech — Software Development, Training & AI Solutions",
    description:
      "Full-cycle product development company in Nigeria. Custom software, AI solutions, and professional training.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "BlackBox Tech",
    url: SITE_URL,
    description:
      "Full-cycle software development company in Nigeria offering custom web & mobile app development, AI solutions, and professional software training.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "BlackBox Tech",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logos/logoBlackPlain.webp`,
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Core Software Engineering Services",
    itemListElement: [
      {
        "@type": "Service",
        name: "Custom Software Development",
        description:
          "End-to-end software development services including web applications, mobile apps, APIs, and enterprise systems built with modern technology stacks.",
        provider: { "@type": "Organization", name: "BlackBox Tech" },
        url: `${SITE_URL}/build`,
      },
      {
        "@type": "Service",
        name: "UI/UX Design",
        description:
          "User-centered design services including UX research, wireframing, prototyping, and visual design for web and mobile applications.",
        provider: { "@type": "Organization", name: "BlackBox Tech" },
        url: `${SITE_URL}/build`,
      },
      {
        "@type": "Service",
        name: "AI & Machine Learning Solutions",
        description:
          "Artificial intelligence and machine learning solutions including NLP, computer vision, predictive analytics, and intelligent automation.",
        provider: { "@type": "Organization", name: "BlackBox Tech" },
        url: `${SITE_URL}/build`,
      },
      {
        "@type": "Service",
        name: "Cloud & DevOps",
        description:
          "Cloud infrastructure setup, migration, and management on AWS, Azure, and GCP. CI/CD pipeline automation and containerization.",
        provider: { "@type": "Organization", name: "BlackBox Tech" },
        url: `${SITE_URL}/build`,
      },
      {
        "@type": "Service",
        name: "Cybersecurity",
        description:
          "Comprehensive cybersecurity services including threat assessment, penetration testing, security audits, and compliance consulting.",
        provider: { "@type": "Organization", name: "BlackBox Tech" },
        url: `${SITE_URL}/build`,
      },
    ],
  };

  const coursesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Software & Tech Training Programs",
    itemListElement: [
      {
        "@type": "Course",
        name: "Full Stack Web Development",
        description:
          "End-to-end web application development with React, Next.js, Node.js, and Supabase.",
        provider: {
          "@type": "EducationalOrganization",
          name: "BlackBox Tech Academy",
          url: `${SITE_URL}/register/professional`,
        },
      },
      {
        "@type": "Course",
        name: "Mobile App Development",
        description:
          "Cross-platform iOS and Android application engineering with React Native.",
        provider: {
          "@type": "EducationalOrganization",
          name: "BlackBox Tech Academy",
          url: `${SITE_URL}/register/professional`,
        },
      },
      {
        "@type": "Course",
        name: "Artificial Intelligence & Machine Learning",
        description:
          "Applied machine learning, NLP, computer vision, and prompt engineering fundamentals.",
        provider: {
          "@type": "EducationalOrganization",
          name: "BlackBox Tech Academy",
          url: `${SITE_URL}/register/professional`,
        },
      },
      {
        "@type": "Course",
        name: "Scratch & Young Coders Programming",
        description:
          "Visual block coding, logic building, and mini-game creation for students and kids.",
        provider: {
          "@type": "EducationalOrganization",
          name: "BlackBox Tech Academy",
          url: `${SITE_URL}/register/student`,
        },
      },
    ],
  };

  const softwareAppsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "In-House Digital Products",
    itemListElement: [
      {
        "@type": "SoftwareApplication",
        name: "Beautcia",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        description:
          "Digital beauty booking marketplace connecting clients with verified stylists and salons.",
      },
      {
        "@type": "SoftwareApplication",
        name: "LNEX Student App",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web, Mobile",
        description:
          "Campus management and CBT examination suite for higher education institutions.",
      },
      {
        "@type": "SoftwareApplication",
        name: "TokenVault",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        description:
          "Web3 token allocation, crypto gifting, and decentralized airdrop management platform.",
      },
    ],
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={coursesSchema} />
      <JsonLd data={softwareAppsSchema} />
      <Hero />
      <TrustLogos />
      <Stats />
      <Services />
      <FastQuote />
      <Products />
      <BlogPreview />
      <Awards />
      <FAQ />
    </>
  );
}
