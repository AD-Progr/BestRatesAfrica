import {useTranslations} from 'next-intl';

export default function HomePage() {
  // Charger la table de traduction courante
  const t = useTranslations();

  return (
    <main style={{padding: '2rem'}}>
      <h1>{t('welcome')}</h1>
      <p>
        {/*
          Texte fixe juste pour vérifier que la page s’affiche ;
          on l’améliorera plus tard.
        */}
        ✅ La configuration i18n fonctionne !
      </p>
    </main>
  );
}
