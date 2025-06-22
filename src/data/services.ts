export type Service = {
  id: string;
  name: string;
  type: 'app' | 'wallet' | 'bank';
  website: string;
  affiliate?: string;          // ID d’affiliation (laissez vide pour l’instant)
  supports: {
    from: string[];            // devises diaspora
    to:   string[];            // devises locales
  };
};

/* Plateformes à forte dispo Afrique de l’Ouest / Maghreb */
export const services: Service[] = [
  {
    id:'wise', name:'Wise', type:'bank',
    website:'https://wise.com',
    affiliate: process.env.WISE_AFFILIATE_ID,
    supports:{from:['EUR','USD','GBP','CAD'], to:['XOF','MAD','DZD','TND','GMD']}
  },
  {
    id:'remitly', name:'Remitly', type:'app',
    website:'https://remitly.com',
    affiliate: process.env.REMITLY_AFFILIATE_ID,
    supports:{from:['EUR','USD','GBP','CAD'], to:['XOF','MAD','TND']}
  },
  {
    id:'worldremit', name:'WorldRemit', type:'app',
    website:'https://worldremit.com',
    affiliate: process.env.WORLDREMIT_AFFILIATE_ID,
    supports:{from:['EUR','USD','GBP','CAD'], to:['XOF','MAD','DZD','TND','GMD']}
  },
  /* ajoutez ici Sendwave, SmallWorld, NALA, GloCurrency, Orange Money, etc. */
];
