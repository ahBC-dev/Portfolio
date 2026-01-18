'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { Locale } from '@/i18n';
import { createTranslator } from '@/i18n';

interface I18nContextType {
  locale: Locale;
  messages: any;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function useTranslations() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslations must be used within an I18nProvider');
  }
  return context.t;
}

export function useLocale() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useLocale must be used within an I18nProvider');
  }
  return context.locale;
}

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: Locale;
  messages: any;
}) {
  // Create translation function on the client side
  const t = useMemo(() => createTranslator(messages), [messages]);

  return (
    <I18nContext.Provider value={{ locale, messages, t }}>
      {children}
    </I18nContext.Provider>
  );
}