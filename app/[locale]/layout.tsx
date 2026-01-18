import React from 'react';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Syne } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/subComponents/CustomCursor';
import { Analytics } from '@vercel/analytics/next';
import { locales, type Locale, getMessages, createTranslator } from '@/i18n';
import { I18nProvider } from '@/components/I18nProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale as Locale);
  const t = createTranslator(messages);

  return {
    title: `${t('hero.name')} | ${t('hero.role')}`,
    description: t('hero.description'),
    keywords: [
      'Full Stack Developer',
      'React Developer',
      'Next.js',
      'Web Developer',
      'UAE',
      'Frontend',
      'Backend',
      'JavaScript',
      'TypeScript',
    ],
    authors: [{ name: 'Ahmad Hosseini' }],
    openGraph: {
      title: `${t('hero.name')} | ${t('hero.role')}`,
      description: t('hero.description'),
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Get messages for the current locale
  const messages = await getMessages(locale as Locale);

  // Determine text direction based on locale
  const dir = locale === 'ar' || locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${syne.variable} antialiased`}
      >
        <I18nProvider locale={locale as Locale} messages={messages}>
          <Analytics />
          <CustomCursor />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
