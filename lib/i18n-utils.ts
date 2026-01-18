import { locales, type Locale } from '@/i18n';

export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If path already has a locale, replace it
  const localePattern = new RegExp(`^(${locales.join('|')})/`);
  if (localePattern.test(cleanPath)) {
    return `/${cleanPath.replace(localePattern, `${locale}/`)}`;
  }
  
  // Otherwise, prepend the new locale
  return `/${locale}/${cleanPath}`;
}

export function removeLocaleFromPath(path: string): string {
  const localePattern = new RegExp(`^/(${locales.join('|')})(/|$)`);
  return path.replace(localePattern, '/');
}
