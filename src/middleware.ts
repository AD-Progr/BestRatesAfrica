import createIntlMiddleware from 'next-intl/middleware';
import intlConfig from '../next-intl.config';

export default createIntlMiddleware(intlConfig);

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']   // ignore les assets et API
};
