// next-intl.request.js
/** @type {import('next-intl/dist/types').NextIntlRequestConfig} */
export default {
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  localeDetection: true
  // Pas besoin d’indiquer "messages" ici :
  // getMessages() ira automatiquement chercher ./messages/{locale}.json
};
