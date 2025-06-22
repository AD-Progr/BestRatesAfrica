import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'fr'] as const;
export const defaultLocale = 'fr';

export default getRequestConfig(async ({locale}) => {
  // S’assure que locale est toujours une string
  const lng = locale ?? defaultLocale;

  return {
    locale: lng,                                             // ← plus “undefined”
    messages: (await import(`./messages/${lng}.json`)).default
  };
});
