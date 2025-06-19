export type Corridor = { 
  from: string;
  to: string;
  countries: {
    from: string[];
    to: string[];
  };
  popular: boolean;
  zone: string;
  notes?: string;
};

// 1. Définition des corridors “classiques”
const corridors: Corridor[] = [
  // 🌍 Afrique de l’Ouest (UEMOA)
  { from: 'EUR', to: 'XOF', countries: { from: ['France','Belgique','Italie','Espagne','Allemagne'], to: ['Sénégal','Mali','Burkina Faso','Côte d’Ivoire','Niger','Togo','Bénin','Guinée-Bissau'] }, popular: true,  zone: 'Afrique de l’Ouest', notes: 'Zone euro → UEMOA' },
  { from: 'USD', to: 'XOF', countries: { from: ['États-Unis','Canada'], to: ['Sénégal','Mali','Burkina Faso','Côte d’Ivoire','Niger','Togo','Bénin','Guinée-Bissau'] }, popular: true,  zone: 'Afrique de l’Ouest', notes: 'NA diaspora → UEMOA' },
  { from: 'CAD', to: 'XOF', countries: { from: ['Canada'], to: ['Sénégal','Mali','Burkina Faso','Côte d’Ivoire','Niger','Togo','Bénin','Guinée-Bissau'] }, popular: false, zone: 'Afrique de l’Ouest' },
  { from: 'GBP', to: 'XOF', countries: { from: ['Royaume-Uni'], to: ['Sénégal','Mali','Burkina Faso','Côte d’Ivoire','Niger','Togo','Bénin','Guinée-Bissau'] }, popular: false, zone: 'Afrique de l’Ouest' },
  { from: 'BRL', to: 'XOF', countries: { from: ['Brésil'], to: ['Sénégal','Mali','Côte d’Ivoire'] }, popular: false, zone: 'Afrique de l’Ouest' },
  { from: 'JPY', to: 'XOF', countries: { from: ['Japon'], to: ['Sénégal','Mali','Côte d’Ivoire'] }, popular: false, zone: 'Afrique de l’Ouest' },

  // 🌍 Afrique Centrale (BEAC)
  { from: 'EUR', to: 'XAF', countries: { from: ['France','Belgique'], to: ['Cameroun','Tchad','Gabon','Congo','RCA','Guinée équatoriale'] }, popular: true,  zone: 'Afrique Centrale', notes: 'Zone euro → BEAC' },
  { from: 'USD', to: 'XAF', countries: { from: ['États-Unis','Canada'], to: ['Cameroun','Tchad','Gabon','Congo','RCA','Guinée équatoriale'] }, popular: false, zone: 'Afrique Centrale' },
  { from: 'CAD', to: 'XAF', countries: { from: ['Canada'], to: ['Cameroun','Tchad','Gabon','Congo','RCA','Guinée équatoriale'] }, popular: false, zone: 'Afrique Centrale' },
  { from: 'GBP', to: 'XAF', countries: { from: ['Royaume-Uni'], to: ['Cameroun','Congo'] }, popular: false, zone: 'Afrique Centrale' },
  { from: 'BRL', to: 'XAF', countries: { from: ['Brésil'], to: ['Cameroun','Gabon'] }, popular: false, zone: 'Afrique Centrale' },
  { from: 'JPY', to: 'XAF', countries: { from: ['Japon'], to: ['Cameroun','Gabon'] }, popular: false, zone: 'Afrique Centrale' },

  // 🌍 Afrique de l’Est
  { from: 'EUR', to: 'KES', countries: { from: ['France','Pays-Bas','Allemagne'], to: ['Kenya'] }, popular: true,  zone: 'Afrique de l’Est' },
  { from: 'USD', to: 'KES', countries: { from: ['États-Unis','Canada'], to: ['Kenya'] }, popular: true,  zone: 'Afrique de l’Est' },
  { from: 'CAD', to: 'KES', countries: { from: ['Canada'], to: ['Kenya'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'GBP', to: 'KES', countries: { from: ['Royaume-Uni'], to: ['Kenya'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'BRL', to: 'KES', countries: { from: ['Brésil'], to: ['Kenya'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'JPY', to: 'KES', countries: { from: ['Japon'], to: ['Kenya'] }, popular: false, zone: 'Afrique de l’Est' },

  { from: 'EUR', to: 'UGX', countries: { from: ['France','Allemagne'], to: ['Ouganda'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'USD', to: 'UGX', countries: { from: ['États-Unis','Canada'], to: ['Ouganda'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'CAD', to: 'UGX', countries: { from: ['Canada'], to: ['Ouganda'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'GBP', to: 'UGX', countries: { from: ['Royaume-Uni'], to: ['Ouganda'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'BRL', to: 'UGX', countries: { from: ['Brésil'], to: ['Ouganda'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'JPY', to: 'UGX', countries: { from: ['Japon'], to: ['Ouganda'] }, popular: false, zone: 'Afrique de l’Est' },

  { from: 'EUR', to: 'TZS', countries: { from: ['France','Italie'], to: ['Tanzanie'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'USD', to: 'TZS', countries: { from: ['États-Unis','Canada'], to: ['Tanzanie'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'CAD', to: 'TZS', countries: { from: ['Canada'], to: ['Tanzanie'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'GBP', to: 'TZS', countries: { from: ['Royaume-Uni'], to: ['Tanzanie'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'BRL', to: 'TZS', countries: { from: ['Brésil'], to: ['Tanzanie'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'JPY', to: 'TZS', countries: { from: ['Japon'], to: ['Tanzanie'] }, popular: false, zone: 'Afrique de l’Est' },

  { from: 'EUR', to: 'ETB', countries: { from: ['Allemagne','France'], to: ['Éthiopie'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'USD', to: 'ETB', countries: { from: ['États-Unis','Canada'], to: ['Éthiopie'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'CAD', to: 'ETB', countries: { from: ['Canada'], to: ['Éthiopie'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'GBP', to: 'ETB', countries: { from: ['Royaume-Uni'], to: ['Éthiopie'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'BRL', to: 'ETB', countries: { from: ['Brésil'], to: ['Éthiopie'] }, popular: false, zone: 'Afrique de l’Est' },
  { from: 'JPY', to: 'ETB', countries: { from: ['Japon'], to: ['Éthiopie'] }, popular: false, zone: 'Afrique de l’Est' },

  // 🌍 Afrique Australe
  { from: 'EUR', to: 'ZAR', countries: { from: ['France','Allemagne','Royaume-Uni'], to: ['Afrique du Sud'] }, popular: true,  zone: 'Afrique Australe' },
  { from: 'USD', to: 'ZAR', countries: { from: ['États-Unis','Canada'], to: ['Afrique du Sud'] }, popular: true,  zone: 'Afrique Australe' },
  { from: 'CAD', to: 'ZAR', countries: { from: ['Canada'], to: ['Afrique du Sud'] }, popular: false, zone: 'Afrique Australe' },
  { from: 'GBP', to: 'ZAR', countries: { from: ['Royaume-Uni'], to: ['Afrique du Sud'] }, popular: false, zone: 'Afrique Australe' },
  { from: 'BRL', to: 'ZAR', countries: { from: ['Brésil'], to: ['Afrique du Sud'] }, popular: false, zone: 'Afrique Australe' },
  { from: 'JPY', to: 'ZAR', countries: { from: ['Japon'], to: ['Afrique du Sud'] }, popular: false, zone: 'Afrique Australe' },

  { from: 'EUR', to: 'ZMW', countries: { from: ['France','Royaume-Uni'], to: ['Zambie'] }, popular: false, zone: 'Afrique Australe' },
  { from: 'USD', to: 'ZMW', countries: { from: ['États-Unis','Canada'], to: ['Zambie'] }, popular: false, zone: 'Afrique Australe' },
  { from: 'CAD', to: 'ZMW', countries: { from: ['Canada'], to: ['Zambie'] }, popular: false, zone: 'Afrique Australe' },
  { from: 'GBP', to: 'ZMW', countries: { from: ['Royaume-Uni'], to: ['Zambie'] }, popular: false, zone: 'Afrique Australe' },
  { from: 'BRL', to: 'ZMW', countries: { from: ['Brésil'], to: ['Zambie'] }, popular: false, zone: 'Afrique Australe' },
  { from: 'JPY', to: 'ZMW', countries: { from: ['Japon'], to: ['Zambie'] }, popular: false, zone: 'Afrique Australe' },

  { from: 'EUR', to: 'MWK', countries: { from: ['France','Royaume-Uni'], to: ['Malawi'] }, popular: false, zone: 'Afrique Australe' },
  { from: 'USD', to: 'MWK', countries: { from: ['États-Unis','Canada'], to: ['Malawi'] }, popular: false, zone: 'Afrique Australe' },
  { from: 'CAD', to: 'MWK', countries: { from: ['Canada'], to: ['Malawi'] }, popular: false, zone: 'Afrique Australe' },
  { from: 'GBP', to: 'MWK', countries: { from: ['Royaume-Uni'], to: ['Malawi'] }, popular: false, zone: 'Afrique Australe' },
  { from: 'BRL', to: 'MWK', countries: { from: ['Brésil'], to: ['Malawi'] }, popular: false, zone: 'Afrique Australe' },
  { from: 'JPY', to: 'MWK', countries: { from: ['Japon'], to: ['Malawi'] }, popular: false, zone: 'Afrique Australe' },

  // 🌍 Afrique du Nord
  { from: 'EUR', to: 'MAD', countries: { from: ['France','Italie','Espagne'], to: ['Maroc'] }, popular: true,  zone: 'Afrique du Nord' },
  { from: 'USD', to: 'MAD', countries: { from: ['États-Unis','Canada'], to: ['Maroc'] }, popular: true,  zone: 'Afrique du Nord' },
  { from: 'CAD', to: 'MAD', countries: { from: ['Canada'], to: ['Maroc'] }, popular: false, zone: 'Afrique du Nord' },
  { from: 'GBP', to: 'MAD', countries: { from: ['Royaume-Uni'], to: ['Maroc'] }, popular: false, zone: 'Afrique du Nord' },
  { from: 'BRL', to: 'MAD', countries: { from: ['Brésil'], to: ['Maroc'] }, popular: false, zone: 'Afrique du Nord' },
  { from: 'JPY', to: 'MAD', countries: { from: ['Japon'], to: ['Maroc'] }, popular: false, zone: 'Afrique du Nord' },

  { from: 'EUR', to: 'DZD', countries: { from: ['France','Italie'], to: ['Algérie'] }, popular: true,  zone: 'Afrique du Nord' },
  { from: 'USD', to: 'DZD', countries: { from: ['États-Unis','Canada'], to: ['Algérie'] }, popular: false, zone: 'Afrique du Nord' },
  { from: 'CAD', to: 'DZD', countries: { from: ['Canada'], to: ['Algérie'] }, popular: false, zone: 'Afrique du Nord' },
  { from: 'GBP', to: 'DZD', countries: { from: ['Royaume-Uni'], to: ['Algérie'] }, popular: false, zone: 'Afrique du Nord' },
  { from: 'BRL', to: 'DZD', countries: { from: ['Brésil'], to: ['Algérie'] }, popular: false, zone: 'Afrique du Nord' },
  { from: 'JPY', to: 'DZD', countries: { from: ['Japon'], to: ['Algérie'] }, popular: false, zone: 'Afrique du Nord' },

  { from: 'EUR', to: 'TND', countries: { from: ['France','Italie'], to: ['Tunisie'] }, popular: true,  zone: 'Afrique du Nord' },
  { from: 'USD', to: 'TND', countries: { from: ['États-Unis','Canada'], to: ['Tunisie'] }, popular: false, zone: 'Afrique du Nord' },
  { from: 'CAD', to: 'TND', countries: { from: ['Canada'], to: ['Tunisie'] }, popular: false, zone: 'Afrique du Nord' },
  { from: 'GBP', to: 'TND', countries: { from: ['Royaume-Uni'], to: ['Tunisie'] }, popular: false, zone: 'Afrique du Nord' },
  { from: 'BRL', to: 'TND', countries: { from: ['Brésil'], to: ['Tunisie'] }, popular: false, zone: 'Afrique du Nord' },
  { from: 'JPY', to: 'TND', countries: { from: ['Japon'], to: ['Tunisie'] }, popular: false, zone: 'Afrique du Nord' },
];

// 2. Configuration des pays hors blocs
const extraCountries: Record<string, { zone: string; countryName: string }> = {
  GMD: { zone: 'Afrique de l’Ouest', countryName: 'Gambie' },
  GNF: { zone: 'Afrique de l’Ouest', countryName: 'Guinée' },
  CVE: { zone: 'Afrique de l’Ouest', countryName: 'Cap-Vert' },
  SLL: { zone: 'Afrique de l’Ouest', countryName: 'Sierra Leone' },
  LRD: { zone: 'Afrique de l’Ouest', countryName: 'Liberia' },
  ERN: { zone: 'Afrique de l’Est', countryName: 'Érythrée' },
  SSP: { zone: 'Afrique de l’Est', countryName: 'Soudan du Sud' },
};

// 3. Les devises de diaspora que l’on couvre
const diasporas = ['EUR', 'USD', 'CAD', 'GBP', 'BRL', 'JPY'] as const;

// 4. Pays d’origine typiques par devise
const originCountries: Record<typeof diasporas[number], string[]> = {
  EUR: ['France','Belgique','Italie','Espagne','Allemagne'],
  USD: ['États-Unis','Canada'],
  CAD: ['Canada'],
  GBP: ['Royaume-Uni'],
  BRL: ['Brésil'],
  JPY: ['Japon'],
};

// 5. Génération automatique des corridors “extra”
Object.entries(extraCountries).forEach(([to, { zone, countryName }]) => {
  diasporas.forEach((from) => {
    corridors.push({
      from,
      to,
      countries: {
        from: originCountries[from],
        to: [countryName],
      },
      popular: false,
      zone,
      notes: `Corridor généré automatiquement vers ${countryName}`
    });
  });
});

// 6. Export final
export { corridors };
