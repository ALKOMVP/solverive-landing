'use client';

import Link from 'next/link';
import { useLocale } from '../context/LocaleContext';
import { translations } from '../translations';
import InteractiveDemo from './InteractiveDemo';

export default function LandingContent() {
  const { locale } = useLocale();
  const t = translations[locale];

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-20 sm:px-6">
        <div className="gradient-orb gradient-orb-1" aria-hidden />
        <div className="gradient-orb gradient-orb-2" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-block rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm text-sky-300 opacity-0 animate-fade-up">
            {t.hero.badge}
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white opacity-0 animate-fade-up animate-delay-100 sm:text-5xl md:text-6xl lg:text-7xl">
            {t.hero.title}{' '}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 opacity-0 animate-fade-up animate-delay-200 sm:text-xl">
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 opacity-0 animate-fade-up animate-delay-300 sm:flex-row">
            <Link
              href="#contacto"
              className="w-full rounded-full bg-sky-500 px-8 py-4 text-center font-semibold text-white transition hover:bg-sky-400 sm:w-auto"
            >
              {t.hero.ctaPrimary}
            </Link>
            <Link
              href="#features"
              className="w-full rounded-full border border-zinc-600 bg-white/5 px-8 py-4 text-center font-medium text-white transition hover:border-zinc-500 hover:bg-white/10 sm:w-auto"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Demo interactiva */}
      <section id="demo" className="relative border-t border-white/5 py-24 sm:py-32 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.demo.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              {t.demo.subtitle}
            </p>
          </div>
          <div className="mt-14">
            <InteractiveDemo panelLabel={t.demo.panelLabel} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative border-t border-white/5 py-24 sm:py-32 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.features.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              {t.features.subtitle}
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.items.map((f, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/5 bg-surface-900/50 p-6 transition hover:border-sky-500/20 hover:bg-surface-900/80"
              >
                <span className="text-2xl" aria-hidden>{f.icon}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Panel */}
      <section id="plataforma" className="relative border-t border-white/5 py-24 sm:py-32 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.platform.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              {t.platform.subtitle}
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
              {/* Barra del panel: navegación */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-violet-900/30 px-3 py-2 sm:px-4">
                <nav className="flex flex-wrap items-center gap-1 text-xs sm:gap-2 sm:text-sm">
                  {t.platform.nav.map((item, i) => (
                    <span
                      key={item}
                      className={`rounded px-2 py-1 ${
                        i === 3 ? 'bg-white/15 font-medium text-white' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </nav>
                <span className="rounded px-2 py-1 text-xs text-zinc-400 sm:text-sm">{t.platform.logout}</span>
              </div>
              {/* Tarjetas de resumen */}
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 p-3 sm:p-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-2xl font-bold text-white">200</p>
                  <p className="mt-0.5 text-xs text-zinc-400">{t.platform.summaryStudents}</p>
                  <p className="mt-1 text-xs text-sky-400">{t.platform.viewStudents}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-2xl font-bold text-white">11</p>
                  <p className="mt-0.5 text-xs text-zinc-400">{t.platform.summaryClasses}</p>
                  <p className="mt-1 text-xs text-sky-400">{t.platform.viewClasses}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-2xl font-bold text-white">252</p>
                  <p className="mt-0.5 text-xs text-zinc-400">{t.platform.summaryReservations}</p>
                  <p className="mt-1 text-xs text-sky-400">{t.platform.viewCalendar}</p>
                </div>
              </div>
              {/* Calendario (vista actual) */}
              <div className="border-b border-white/10 bg-violet-900/20 px-3 py-2 sm:px-4">
                <p className="text-sm font-medium text-white">{t.platform.calendarTitle}</p>
                <p className="mt-0.5 text-xs text-zinc-400">{t.platform.calendarHint}</p>
              </div>
              <div className="space-y-3 p-3 sm:p-4">
                {['Martes 17', 'Jueves 19', 'Sábado 21'].map((day) => (
                  <div key={day} className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3">
                    <p className="text-sm font-medium text-white">{day} de marzo · Semana 12</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[
                        { time: '10:00', n: 21, temp: 5 },
                        { time: '17:30', n: 17, temp: 1 },
                        { time: '19:00', n: 29, temp: 4 },
                      ].map((c) => (
                        <div key={c.time} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm">
                          <span className="text-zinc-300">Yoga {c.time}</span>
                          <span className="ml-1 text-zinc-500 sm:ml-2">· {c.n} {t.platform.enrolled}</span>
                          <span className="ml-1 font-medium text-emerald-400 sm:ml-2">
                            {c.temp} {c.temp !== 1 ? t.platform.temporales : t.platform.temporal}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Accesos rápidos */}
              <div className="border-t border-white/10 px-3 py-2 sm:px-4">
                <p className="text-xs font-medium text-zinc-400">{t.platform.quickAccess}</p>
                <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-sky-400">
                  <span>{t.platform.nav[0]}</span>
                  <span>·</span>
                  <span>{t.platform.nav[1]}</span>
                  <span>·</span>
                  <span>{t.platform.nav[2]}</span>
                  <span>·</span>
                  <span>{t.platform.nav[4]}</span>
                  <span>·</span>
                  <span>{t.platform.nav[5]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicio */}
      <section id="servicio" className="relative border-t border-white/5 py-24 sm:py-32 scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.service.title}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            {t.service.subtitle}
          </p>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-left sm:p-8">
            <p className="font-display font-semibold text-white">{t.service.listTitle}</p>
            <ul className="mt-4 space-y-2 text-zinc-300">
              {t.service.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="relative border-t border-white/5 py-24 sm:py-32 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.howItWorks.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              {t.howItWorks.subtitle}
            </p>
          </div>
          <div className="mt-16 flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            {t.howItWorks.steps.map((s, i) => (
              <div key={i} className="flex-1 text-center md:text-left">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 text-lg font-bold text-sky-400">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-zinc-400">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" className="relative border-t border-white/5 py-24 sm:py-32 scroll-mt-20">
        <div className="gradient-orb gradient-orb-1" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold leading-snug tracking-tight text-white sm:text-4xl pt-[0.12em] [overflow:visible] [text-rendering:geometricPrecision]">
            {t.cta.title}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            {t.cta.subtitle}
          </p>
          <div className="mt-10">
            <a
              href={`mailto:${t.cta.email}?subject=Demo%20Solverive`}
              className="inline-block rounded-full bg-sky-500 px-8 py-4 font-semibold text-white transition hover:bg-sky-400"
            >
              {t.cta.email}
            </a>
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            {t.cta.whatsapp}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="font-display font-semibold text-white">Solverive</span>
            <p className="text-sm text-zinc-500">
              {t.footer.tagline}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
