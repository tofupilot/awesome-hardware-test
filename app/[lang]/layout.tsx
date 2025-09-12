import { Metadata } from 'next';
import { Locale } from '@/lib/translations';
import { SiteFooter } from '@/components/site-footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.awesome-hardware-test.com';

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
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {children}
      </div>
      <div className="container mx-auto px-4">
        <SiteFooter lang={lang} />
      </div>
    </div>
  );
}