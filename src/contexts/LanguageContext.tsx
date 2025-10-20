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
  const [language, setLanguageState] = useState<Language>('pt');
  const [isLanguageSet, setIsLanguageSet] = useState(false);

  // Detect language based on IP geolocation
  React.useEffect(() => {
    const detectLanguage = async () => {
      // Check localStorage first
      try {
        const stored = localStorage?.getItem('language');
        if (stored === 'pt' || stored === 'en') {
          setLanguageState(stored);
          setIsLanguageSet(true);
          return;
        }
      } catch {
        // Silently fail
      }

      // Fallback to browser language
      const browserLang = navigator.language.toLowerCase();
      const fallbackLang = browserLang.startsWith('pt') ? 'pt' : 'en';
      setLanguageState(fallbackLang);
      setIsLanguageSet(true);
      
      // Store the detected language
      try {
        localStorage?.setItem('language', fallbackLang);
      } catch {
        // Silently fail
      }
    };

    detectLanguage();
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage?.setItem('language', lang);
    } catch {
      // Silently fail
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
