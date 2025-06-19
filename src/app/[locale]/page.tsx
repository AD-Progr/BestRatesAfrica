import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{t('greeting')}</h1>
      <p>{t('rate')}</p>
    </main>
  );
}