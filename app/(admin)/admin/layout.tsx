import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — BlackBox Tech",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-root min-h-screen bg-[#111111]">{children}</div>;
}
