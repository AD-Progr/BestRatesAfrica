export const locales = ['en', 'fr'] as const;
/** Type utilitaire pratique si besoin */
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';
