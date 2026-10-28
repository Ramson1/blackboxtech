import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { CursorDots } from "@/app/components/CursorDots";
import { ChatWidget } from "@/app/components/ChatWidget";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-crimson-200 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <CursorDots />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
