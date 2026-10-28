import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blackboxtech.online";

export const metadata: Metadata = {
  title: "Build My Software — Custom Software Development Services",
  description:
    "Get custom software built by experts. BlackBox Tech develops web applications, mobile apps, AI solutions, e-commerce platforms, and enterprise systems. From discovery to deployment — agile process, transparent pricing, 48-hour response time.",
  keywords: [
    "custom software development",
    "hire software developers Nigeria",
    "build web application",
    "mobile app development service",
    "startup MVP development",
    "enterprise software development",
  ],
  alternates: { canonical: `${SITE_URL}/build` },
  openGraph: {
    title: "Build My Software — BlackBox Tech",
    description:
      "Custom software development service. Web apps, mobile apps, AI solutions, e-commerce — from concept to launch.",
    type: "website",
    url: `${SITE_URL}/build`,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "BlackBox Tech Build Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Build My Software — BlackBox Tech",
    description:
      "Custom software development service. Web apps, mobile apps, AI solutions — from concept to launch.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function BuildLayout({ children }: { children: React.ReactNode }) {
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Build My Software",
        item: `${SITE_URL}/build`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Software Engineering & Product Development",
    provider: {
      "@type": "Organization",
      name: "BlackBox Tech",
      url: SITE_URL,
      logo: `${SITE_URL}/logos/logoBlackPlain.webp`,
    },
    serviceType: "Full-Cycle Software Engineering",
    areaServed: "Global",
    description:
      "Full-cycle custom software development including web applications, iOS/Android mobile apps, AI solutions, cloud infrastructure, and cybersecurity.",
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      {children}
    </>
  );
}
