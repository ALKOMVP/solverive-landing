'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Locale } from '../translations';

const STORAGE_KEY = 'solverive-locale';

type LocaleContextValue = { locale: Locale; setLocale: (l: Locale) => void };

const Context = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && (stored === 'es' || stored === 'en' || stored === 'pt')) setLocaleState(stored);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, l);
  }, []);

  return <Context.Provider value={{ locale, setLocale }}>{children}</Context.Provider>;
}

export function useLocale() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
