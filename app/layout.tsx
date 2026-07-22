import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileBottomNav } from "@/components/MobileBottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const socialImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Great_Smoky_Mountains_National_Park_GRSM8831.jpg/1280px-Great_Smoky_Mountains_National_Park_GRSM8831.jpg";

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
    images: [
      {
        url: socialImage,
        width: 1280,
        height: 853,
        alt: "Layered forest ridges in Great Smoky Mountains National Park",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmokyInsider",
    description: "Smokies planning that actually works.",
    images: [socialImage],
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
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
