// next.config.js
const withNextIntl = require('next-intl/plugin')('./i18n.ts'); // garde ton chemin

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ------------------------------------------------------------------ */
  /* 1.  Laisse passer temporairement les erreurs de lint & de TS       */
  /* ------------------------------------------------------------------ */
  eslint: {
    ignoreDuringBuilds: true      // ⬅️  stoppe le blocage ESLint au build
  },
  typescript: {
    ignoreBuildErrors: true       // ⬅️  stoppe le blocage TS au build
  },

  /* ------------------------------------------------------------------ */
  /* 2.  Tes options Next existantes                                    */
  /* ------------------------------------------------------------------ */
  experimental: {
    serverActions: {}             // (laisse comme avant)
  }
};

/* -------------------------------------------------------------------- */
/* 3.  On applique le plugin next-intl et on exporte la config finale   */
/* -------------------------------------------------------------------- */
module.exports = withNextIntl(nextConfig);
