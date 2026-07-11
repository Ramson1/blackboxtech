import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CursorDots } from "./components/CursorDots";
import { ChatWidget } from "./components/ChatWidget";

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

export const metadata: Metadata = {
  title: "BlackBox Tech — Discover. Design. Deliver.",
  description:
    "Full-cycle product development — from ideation to market-ready software. Discovery, design, engineering, and growth under one roof.",
  openGraph: {
    title: "BlackBox Tech — Discover. Design. Deliver.",
    description:
      "Full-cycle product development — from ideation to market-ready software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CursorDots />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
