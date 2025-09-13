import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from "@/components/providers/posthog-provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.awesome-hardware-test.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Awesome Hardware Test - Open Source Testing Tools & Frameworks",
    template: "%s | Awesome Hardware Test"
  },
  description: "Complete collection of hardware testing tools. Test execution engines, wafer maps, instrument interfaces, and validation frameworks for electronics and semiconductors.",
  keywords: ["hardware testing", "test automation", "semiconductor testing", "wafer maps", "pytest hardware", "openhtf", "pyvisa", "embedded testing", "electronics validation", "test frameworks"],
  authors: [{ name: "Awesome Hardware Test Community" }],
  creator: "Awesome Hardware Test",
  publisher: "Awesome Hardware Test",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon1.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon1.png', sizes: '32x32', type: 'image/png' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icon0.svg',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Awesome Hardware Test - Open Source Testing Tools",
    description: "Complete collection of hardware testing tools and frameworks for electronics validation",
    url: siteUrl,
    siteName: "Awesome Hardware Test",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Awesome Hardware Test - Testing Tools Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awesome Hardware Test - Testing Tools & Frameworks",
    description: "Complete collection of hardware testing tools for electronics validation",
    images: ["/og-image.png"],
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
  alternates: {
    canonical: `${siteUrl}/en`,
    languages: {
      'x-default': `${siteUrl}/en`,
      'en': `${siteUrl}/en`,
      'fr': `${siteUrl}/fr`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}