import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://smokyinsider.com"),
  title: {
    default: "SmokyInsider | Plan a Smoky Mountains Trip That Works",
    template: "%s | SmokyInsider",
  },
  description:
    "Explore Sevier County, Townsend and the Great Smoky Mountains. Save what fits and build a trip that actually works. Honest local planning judgment.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smokyinsider.com",
    siteName: "SmokyInsider",
    title: "SmokyInsider | Plan a Smoky Mountains Trip That Works",
    description:
      "Explore Sevier County, Townsend and the Great Smoky Mountains. Save what fits and build a trip that actually works.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmokyInsider",
    description: "Smokies planning that actually works.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://smokyinsider.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileBottomNav />
      </body>
    </html>
  );
}