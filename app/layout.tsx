import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CursorDots } from "./components/CursorDots";
import { ChatWidget } from "./components/ChatWidget";
import { JsonLd } from "./components/JsonLd";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const plusJakarta = localFont({
  src: [
    { path: "../public/fonts/PlusJakartaSans-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../public/fonts/PlusJakartaSans-ExtraLightItalic.ttf", weight: "200", style: "italic" },
    { path: "../public/fonts/PlusJakartaSans-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/PlusJakartaSans-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../public/fonts/PlusJakartaSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/PlusJakartaSans-Italic.ttf", weight: "400", style: "italic" },
    { path: "../public/fonts/PlusJakartaSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/PlusJakartaSans-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../public/fonts/PlusJakartaSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/PlusJakartaSans-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../public/fonts/PlusJakartaSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/PlusJakartaSans-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../public/fonts/PlusJakartaSans-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../public/fonts/PlusJakartaSans-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
  ],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blackboxtech.online";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BlackBox Tech — Discover. Design. Deliver.",
    template: "%s | BlackBox Tech",
  },
  description:
    "Full-cycle product development — from ideation to market-ready software. Discovery, design, engineering, and growth under one roof. Software training, custom development, and AI-powered solutions.",
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
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicon/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicon/android-chrome-512x512.png',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "BlackBox Tech — Discover. Design. Deliver.",
    description:
      "Full-cycle product development — from ideation to market-ready software.",
    type: "website",
    siteName: "BlackBox Tech",
    locale: "en_US",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/logos/logoBlackPlain.png`, width: 512, height: 512, alt: "BlackBox Tech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackBox Tech — Discover. Design. Deliver.",
    description: "Full-cycle product development — from ideation to market-ready software.",
    images: [`${SITE_URL}/logos/logoBlackPlain.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "", // Add Google Search Console verification code here
  },
  manifest: "/favicon/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-crimson-200 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium">
          Skip to main content
        </a>
        {!isAdmin && <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "BlackBox Tech",
          url: SITE_URL,
          logo: `${SITE_URL}/logos/logoBlackPlain.png`,
          description: "Full-cycle product development — from ideation to market-ready software.",
          contactPoint: { "@type": "ContactPoint", telephone: "+234-805-020-5349", contactType: "customer service", email: "info@blackboxtech.online" },
          sameAs: ["https://linkedin.com/company/blackboxtech", "https://instagram.com/blackboxtech", "https://twitter.com/blackboxtech", "https://facebook.com/blackboxtech"],
        }} />}
        {!isAdmin && <CursorDots />}
        {!isAdmin && <Header />}
        <main id="main-content" className="flex-1">{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <ChatWidget />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
