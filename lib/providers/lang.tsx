"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  defaultLanguage,
  getTranslation,
  type Language,
  type LanguageOption,
  languages,
} from "@/lib/i18n";

interface LanguageContextValue {
  language: Language;
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  setLanguage: (language: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [mounted, setMounted] = useState(false);

  // Initialize language from localStorage on mount
  useEffect(() => {
    queueMicrotask(() => {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      const initialLanguage = stored || defaultLanguage;

      setLanguageState(initialLanguage);
      document.documentElement.setAttribute("lang", initialLanguage);
      setMounted(true);
    });
  }, []);

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem(STORAGE_KEY, newLanguage);
    document.documentElement.setAttribute("lang", newLanguage);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      return getTranslation(language, key, vars);
    },
    [language],
  );

  const currentLanguage = useMemo(
    () => languages.find((l) => l.code === language) || languages[0],
    [language],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      currentLanguage,
      languages,
      setLanguage,
      t,
      mounted,
    }),
    [language, currentLanguage, setLanguage, t, mounted],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}
