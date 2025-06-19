/** @type {import('next-intl/dist/types').NextIntlRequestConfig} */
const config = {
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  localeDetection: true,
  messages: {
    en: './src/messages/en.json',
    fr: './src/messages/fr.json'
  }
};

module.exports = config;
