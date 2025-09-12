import { Metadata } from 'next';
import { Locale } from '@/lib/translations';
import { SiteFooter } from '@/components/site-footer';
import { Inter } from "next/font/google";
import { CSPostHogProvider } from "@/components/providers/posthog-provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.awesome-hardware-test.com';

// Ensure proper SSG with dynamic params
export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'fr' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  
  return {
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        'x-default': `${siteUrl}/en`,
        'en': `${siteUrl}/en`,
        'fr': `${siteUrl}/fr`,
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };
  
  return (
    <html lang={lang} suppressHydrationWarning className="bg-zinc-900">
      <body
        className={`${inter.variable} antialiased bg-zinc-900 min-h-screen text-zinc-100`}
      >
        <CSPostHogProvider>
          <div className="min-h-screen flex flex-col">
            <div className="flex-1">
              {children}
            </div>
            <div className="container mx-auto px-4">
              <SiteFooter lang={lang} />
            </div>
          </div>
          <Analytics />
        </CSPostHogProvider>
      </body>
    </html>
  );
}