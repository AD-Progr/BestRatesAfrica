import {getRequestConfig, type RequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const current = locale ?? 'fr';

  return {
    /* clé attendue par RequestConfig */
    locale: current,
    /* messages de la langue courante */
    messages: (await import(`../../messages/${current}.json`)).default
  } satisfies RequestConfig;
});
