import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { JsonLd } from "./components/JsonLd";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blackboxtech.online";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BlackBox Tech — Software Development, Training & AI Solutions | Nigeria",
    template: "%s | BlackBox Tech",
  },
  description:
    "BlackBox Tech is a Nigeria-based full-cycle software development company. We build custom web & mobile apps, AI solutions, and provide professional software training. From startup MVPs to enterprise systems — discover, design, deliver.",
  category: "technology",
  creator: "BlackBox Tech Team",
  publisher: "BlackBox Tech",
  formatDetection: {
    email: true,
    telephone: true,
  },
  keywords: [
    "software development",
    "web development",
    "mobile apps",
    "AI solutions",
    "software training",
    "startup technology",
    "product design",
    "full-stack development",
    "Nigeria tech company",
    "BlackBox Tech",
  ],
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon/android-chrome-512x512.png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "BlackBox Tech — Software Development, Training & AI Solutions | Nigeria",
    description:
      "Nigeria-based full-cycle software development company. Custom web & mobile apps, AI solutions, cloud infrastructure, and professional training.",
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
    title: "BlackBox Tech — Software Development, Training & AI Solutions | Nigeria",
    description:
      "Nigeria-based full-cycle software development company. Custom web & mobile apps, AI solutions, and professional training.",
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: "BlackBox Tech",
                url: SITE_URL,
                logo: `${SITE_URL}/logos/logoBlackPlain.webp`,
                description:
                  "Full-cycle software development company in Nigeria offering custom web & mobile app development, AI solutions, cybersecurity, cloud computing, UI/UX design, and professional software training.",
                foundingDate: "2020",
                slogan: "Discover. Design. Deliver.",
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+234-805-020-5349",
                  contactType: "customer service",
                  email: "info@blackboxtech.online",
                  availableLanguage: ["English"],
                },
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "NG",
                },
                sameAs: [
                  "https://linkedin.com/company/blackboxtech",
                  "https://instagram.com/blackboxtech",
                  "https://twitter.com/blackboxtech",
                  "https://facebook.com/blackboxtech",
                ],
                knowsAbout: [
                  "Software Development",
                  "Web Development",
                  "Mobile App Development",
                  "Artificial Intelligence",
                  "Machine Learning",
                  "Cloud Computing",
                  "Cybersecurity",
                  "UI/UX Design",
                  "DevOps",
                  "Software Training",
                  "Product Design",
                  "Full-Stack Development",
                  "SaaS Development",
                  "Enterprise Software",
                  "Startup Technology",
                ],
              },
              {
                "@type": "EducationalOrganization",
                "@id": `${SITE_URL}/#educational-organization`,
                name: "BlackBox Tech Academy",
                url: `${SITE_URL}/register/student`,
                parentOrganization: { "@id": `${SITE_URL}/#organization` },
                description:
                  "Hands-on technology training academy in Nigeria offering student coding programs and professional software engineering courses.",
                offers: {
                  "@type": "Offer",
                  category: "Software & Technology Courses",
                  priceCurrency: "NGN",
                  availability: "https://schema.org/InStock",
                },
              },
            ],
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
