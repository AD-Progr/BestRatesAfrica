/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  './i18n.ts'          // ← chemin vers le fichier que nous venons de créer
  // (Vous pourriez passer un 2ᵉ argument avec des options si besoin)
);

module.exports = withNextIntl({
  experimental: {
    serverActions: {}  // ⚠️ gardez vos autres options ici
  }
});
