import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const locales = ['en', 'ar', 'fa'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\..*).*)'],
};
