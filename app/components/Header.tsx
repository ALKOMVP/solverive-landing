'use client';

import Link from 'next/link';
import { useLocale } from '../context/LocaleContext';
import { translations } from '../translations';
import type { Locale } from '../translations';

const FLAGS: { locale: Locale; label: string; emoji: string }[] = [
  { locale: 'en', label: 'English', emoji: '🇺🇸' },
  { locale: 'es', label: 'Español', emoji: '🇪🇸' },
  { locale: 'pt', label: 'Português', emoji: '🇧🇷' },
];

export default function Header() {
  const { locale, setLocale } = useLocale();
  const t = translations[locale].nav;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[var(--bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          Solverive
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#demo" className="text-sm text-zinc-400 transition hover:text-white">
            {t.demo}
          </a>
          <a href="#features" className="text-sm text-zinc-400 transition hover:text-white">
            {t.features}
          </a>
          <a href="#plataforma" className="text-sm text-zinc-400 transition hover:text-white">
            {t.platform}
          </a>
          <a href="#servicio" className="text-sm text-zinc-400 transition hover:text-white">
            {t.service}
          </a>
          <a href="#como-funciona" className="text-sm text-zinc-400 transition hover:text-white">
            {t.howItWorks}
          </a>
          <a href="#contacto" className="text-sm text-zinc-400 transition hover:text-white">
            {t.contact}
          </a>
          <div className="flex items-center gap-1" role="group" aria-label="Idioma / Language">
            {FLAGS.map(({ locale: l, label, emoji }) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                title={label}
                aria-label={label}
                aria-current={locale === l ? 'true' : undefined}
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-base transition focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[var(--bg)] ${
                  locale === l
                    ? 'scale-110 ring-2 ring-white/30'
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
              >
                <span role="img" aria-hidden>
                  {emoji}
                </span>
              </button>
            ))}
          </div>
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 md:hidden" role="group" aria-label="Idioma">
            {FLAGS.map(({ locale: l, label, emoji }) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                title={label}
                aria-label={label}
                aria-current={locale === l ? 'true' : undefined}
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-base transition focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                  locale === l ? 'scale-110 ring-2 ring-white/30' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span role="img" aria-hidden>
                  {emoji}
                </span>
              </button>
            ))}
          </div>
          <Link
            href="#contacto"
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-400"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
