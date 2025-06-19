// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ▸ Activer Server Actions (option déjà présente auparavant)
  experimental: {
    serverActions: {}
  },

  // ▸ Ajouter nos alias pour que next-intl trouve les deux fichiers de config
  webpack: (config) => {
    // 1. Config « build-time » (déjà existante)
    config.resolve.alias['next-intl/config'] = path.resolve(
      __dirname,
      './next-intl.config.ts'       // ← garde .ts ici
    );

    // 2. Config « run-time » (celle que tu viens de créer)
    config.resolve.alias['next-intl/request'] = path.resolve(
      __dirname,
      './next-intl.request.js'      // ← mets .ts si tu l’as appelée .ts
    );

    return config; // toujours renvoyer le config modifié
  }
};

module.exports = nextConfig;
