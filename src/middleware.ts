import createIntlMiddleware from 'next-intl/middleware';

export default createIntlMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'fr'
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']   // laisse passer les assets (_next, images…)
};
