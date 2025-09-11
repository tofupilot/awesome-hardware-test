import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  // Try to get locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().substring(0, 2))
      .find((lang) => locales.includes(lang));
    if (preferredLocale) return preferredLocale;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // For root path, redirect to detected locale or default
  if (pathname === '/') {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}`, request.url),
      { status: 302 } // Use temporary redirect for language detection
    );
  }

  // Redirect other paths missing locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url),
      { status: 301 } // Use permanent redirect for SEO
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static files
    '/((?!_next|api|favicon\\.ico|favicon\\.png|apple-icon\\.png|icon.*\\.png|icon.*\\.svg|opengraph-image.*|twitter-image.*|sitemap\\.xml|robots\\.txt|manifest\\.json|.*\\..*|placeholder\\.svg).*)'
  ]
};