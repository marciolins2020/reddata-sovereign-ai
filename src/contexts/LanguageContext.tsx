import React, { createContext, useContext, useState } from 'react';
import ptTranslations from '@/translations/pt';
import enTranslations from '@/translations/en';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: ptTranslations,
  en: enTranslations
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('LanguageProvider: Initializing');
  
  const [language, setLanguageState] = useState<Language>('pt');

  const setLanguage = (lang: Language) => {
    console.log('LanguageProvider: Setting language to', lang);
    setLanguageState(lang);
    try {
      localStorage?.setItem('language', lang);
    } catch (e) {
      console.warn('LanguageProvider: Could not save to localStorage', e);
    }
  };

  const t = (key: string): string => {
    const currentTranslations = translations[language];
    const keys = key.split('.');
    let value: any = currentTranslations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    
    return value || key;
  };

  console.log('LanguageProvider: Rendering with language', language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
