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

const getInitialLanguage = (): Language => {
  try {
    if (typeof window === 'undefined') return 'pt';
    if (typeof localStorage === 'undefined') return 'pt';
    
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'pt') return saved;
    
    const browserLang = navigator?.language?.toLowerCase() || '';
    if (browserLang.startsWith('en')) return 'en';
  } catch {
    // Silently fail and return default
  }
  
  return 'pt';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('pt');

  // Initialize language after mount to avoid SSR issues
  React.useEffect(() => {
    const initialLang = getInitialLanguage();
    if (initialLang !== language) {
      setLanguageState(initialLang);
    }
  }, []);

  const setLanguage = React.useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('language', lang);
      }
    } catch {
      // Silently fail
    }
  }, []);

  const t = React.useCallback((key: string): string => {
    const currentTranslations = translations[language];
    const keys = key.split('.');
    let value: any = currentTranslations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    
    return value || key;
  }, [language]);

  const contextValue = React.useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
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
