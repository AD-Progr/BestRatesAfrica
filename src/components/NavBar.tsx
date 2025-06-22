'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';

/**
 * Barre de navigation « header ».
 * – Le lien s’adapte automatiquement à la locale courante (/fr, /en, …)
 * – Ajoutez ici d’autres onglets plus tard si besoin.
 */
export default function NavBar() {
  const locale = useLocale();             // « fr », « en », …
  const t = useTranslations('Nav');       // messages.Nav dans vos JSON

  const base = `/${locale}`;              // ex : /fr

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex gap-6 items-center">
        {/* Logo / Accueil */}
        <Link href={base} className="font-bold text-lg text-blue-600">
          BestRates
        </Link>

        {/* 👉 NOUVEL ONGLET : Corridors */}
        <Link
          href={`${base}/corridors`}
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          {t('corridors')}
        </Link>
      </div>
    </nav>
  );
}
