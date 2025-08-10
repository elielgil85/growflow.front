'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import en from '@/locales/en.json';
import pt from '@/locales/pt.json';

type Locale = 'en' | 'pt';
type Translations = typeof en;

const translations: Record<Locale, Translations> = { en, pt };

interface I18nContextType {
  language: Locale;
  setLanguage: (language: Locale) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Helper function to get nested keys
const getNestedValue = (obj: any, path: string): string | undefined => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Locale>('en');

  const t = useMemo(() => (key: string, replacements?: Record<string, string | number>): string => {
    let translation = getNestedValue(translations[language], key);

    if (!translation) {
      // Fallback to English if translation is missing
      translation = getNestedValue(translations.en, key);
      if (!translation) {
        console.warn(`Translation not found for key: ${key}`);
        return key;
      }
    }

    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        translation = translation!.replace(`{${placeholder}}`, String(replacements[placeholder]));
      });
    }

    return translation!;
  }, [language]);

  const value = { language, setLanguage, t };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
