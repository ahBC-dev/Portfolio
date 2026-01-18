export const locales = ['en', 'ar', 'fa'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  fa: 'فارسی',
};

export async function getMessages(locale: Locale) {
  try {
    const messages = await import(`./messages/${locale}.json`);
    return messages.default;
  } catch (error) {
    // Fallback to default locale if translation file is missing
    if (locale !== defaultLocale) {
      const fallbackMessages = await import(`./messages/${defaultLocale}.json`);
      return fallbackMessages.default;
    }
    throw error;
  }
}

// Helper function to get nested translation values
export function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((o, p) => o && o[p], obj) || path;
}

// Translation function
export function createTranslator(messages: any) {
  return function t(key: string, params?: Record<string, string | number>): string {
    let text = getNestedValue(messages, key);
    
    // Replace parameters in the text
    if (params && typeof text === 'string') {
      Object.keys(params).forEach(param => {
        text = text.replace(new RegExp(`{${param}}`, 'g'), String(params[param]));
      });
    }
    
    return text;
  };
}
