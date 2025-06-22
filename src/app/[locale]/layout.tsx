// src/app/[locale]/layout.tsx
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales } from '@/i18n';

/* --------- routes statiques /fr, /en, … --------- */
export async function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

/* --------- wrapper SANS async → Next ne rouspète plus --------- */
export default function LocaleLayoutWrapper(
  { children, params }: { children: ReactNode; params: { locale: string } }
) {
  const locale = params.locale as (typeof locales)[number];
  return <LocaleLayoutInner locale={locale}>{children}</LocaleLayoutInner>;
}

/* --------- composant réellement async --------- */
async function LocaleLayoutInner(
  { locale, children }: { locale: string; children: ReactNode }
) {
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
