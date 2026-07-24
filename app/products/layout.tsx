import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blackboxtech.online";

export const metadata: Metadata = {
  title: "Our Products — In-House Software & Digital Solutions",
  description:
    "Explore BlackBox Tech's in-house products: Beautcia (beauty marketplace), LNEX Student App (EdTech), Rhema Expert Solutions (STEM), LifeLink MPCS (cooperative management), MetaShares (investment tech), QR Code Generator, Resume Builder, TokenVault (Web3), PayTracker (FinTech), and more.",
  keywords: ["BlackBox Tech products", "beauty marketplace app", "EdTech platform Nigeria", "cooperative management software", "investment platform Nigeria", "Web3 airdrop tool", "resume builder app"],
  alternates: { canonical: `${SITE_URL}/products` },
  openGraph: {
    title: "Our Products — BlackBox Tech",
    description: "10+ in-house products spanning beauty tech, EdTech, FinTech, Web3, cooperative management, and productivity tools.",
    type: "website",
    url: `${SITE_URL}/products`,
    images: [{ url: `${SITE_URL}/logos/logoBlackPlain.png`, width: 512, height: 512, alt: "BlackBox Tech Products" }],
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
