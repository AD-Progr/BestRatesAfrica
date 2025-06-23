/* ------------------------------------------------------------
   src/data/services.ts
   Liste unique et typée des prestataires
------------------------------------------------------------ */

import type { Region } from './corridors';

/* ---------- Types ----------------------------------------- */

export type ServiceCategory =
  | 'b2c'
  | 'mobile-wallet'
  | 'b2b'
  | 'crypto'
  | 'p2p';

export interface Service {
  /** slug interne (minuscule, sans espace) */
  id: string;
  /** Nom marketing */
  name: string;
  /** URL publique */
  website: string;
  /** URL de logo (≈ 64 × 64 px idéalement CDN/Vercel Images) */
  logo: string;
  /** segmentation métier */
  category: ServiceCategory;
  /** zones réellement couvertes */
  corridors: Region[];
  /** infos d’affiliation – on les active quand on a le contrat */
  affiliate?: {
    /** identifiant de programme (« impact », « cj », « flex », « direct ») */
    network: 'impact' | 'cj' | 'flex' | 'direct';
    /** clé d’ENV à lire ex : WISE_AFFILIATE_ID */
    envKey: string;
  };
}

/* ---------- Helpers d’affiliation ------------------------- */
/* construit le lien final (ou null si pas encore d’ID)       */
export function affiliateLink(s: Service): string | null {
  if (!s.affiliate) return null;
  const id = process.env[s.affiliate.envKey as keyof NodeJS.ProcessEnv];
  if (!id) return null;

  switch (s.affiliate.network) {
    case 'impact':
      return `https://impact.com/aff?cid=${id}`;
    case 'cj':
      return `https://www.anrdoezrs.net/links/${id}/type/dlg/*/${s.website}`;
    case 'flex':
      return `https://prf.hn/click/${id}`;
    case 'direct':
      return `${s.website}?ref=${id}`;
  }
}

/* ---------- Catalogue ------------------------------------- */
/* (❗ Ajoute / modifie à volonté — tout est centralisé ici)    */
export const services: Service[] = [
  /* ======== B2C / néo-banques ============================= */
  {
    id: 'wise',
    name: 'Wise',
    website: 'https://wise.com',
    logo: '/logos/wise.svg',
    category: 'b2c',
    corridors: ['waemu', 'anglophone', 'maghreb'],
    affiliate: { network: 'impact', envKey: 'WISE_AFFILIATE_ID' }
  },
  {
    id: 'remitly',
    name: 'Remitly',
    website: 'https://remitly.com',
    logo: '/logos/remitly.svg',
    category: 'b2c',
    corridors: ['waemu', 'waextra', 'anglophone'],
    affiliate: { network: 'cj', envKey: 'REMITLY_AFFILIATE_ID' }
  },
  {
    id: 'worldremit',
    name: 'WorldRemit',
    website: 'https://www.worldremit.com',
    logo: '/logos/worldremit.svg',
    category: 'b2c',
    corridors: ['anglophone', 'waextra'],
    affiliate: { network: 'impact', envKey: 'WORLDREMIT_AFFILIATE_ID' }
  },

  /* ======== Diaspora-first / fintech Afrique --------------- */
  {
    id: 'sendwave',
    name: 'Sendwave',
    website: 'https://sendwave.com',
    logo: '/logos/sendwave.svg',
    category: 'b2c',
    corridors: ['anglophone', 'waemu'],
    affiliate: { network: 'flex', envKey: 'SENDWAVE_AFFILIATE_ID' }
  },
  {
    id: 'glocurrency',
    name: 'GloCurrency',
    website: 'https://glocurrency.com',
    logo: '/logos/glocurrency.svg',
    category: 'b2c',
    corridors: ['anglophone', 'waemu']
    // pas d’affiliation pour l’instant
  },
  {
    id: 'transfergo',
    name: 'TransferGo',
    website: 'https://www.transfergo.com',
    logo: '/logos/transfergo.svg',
    category: 'b2c',
    corridors: ['anglophone'],
    affiliate: { network: 'cj', envKey: 'TRANSFERGO_AFFILIATE_ID' }
  },

  /* ======== Mobile-Wallet / Cash pick-up ================== */
  {
    id: 'wave',
    name: 'Wave',
    website: 'https://wave.com',
    logo: '/logos/wave.png',
    category: 'mobile-wallet',
    corridors: ['waemu', 'waextra']
    // pas d’affiliation
  },
  {
    id: 'orange-money',
    name: 'Orange Money',
    website: 'https://orange.com',
    logo: '/logos/orange-money.svg',
    category: 'mobile-wallet',
    corridors: ['waemu', 'waextra', 'maghreb']
  },

  /* ======== B2B FX ======================================== */
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    website: 'https://flutterwave.com',
    logo: '/logos/flutterwave.svg',
    category: 'b2b',
    corridors: ['anglophone']
  },
  {
    id: 'dlocal',
    name: 'dLocal',
    website: 'https://dlocal.com',
    logo: '/logos/dlocal.svg',
    category: 'b2b',
    corridors: ['waemu', 'maghreb']
  },
  {
    id: 'currencycloud',
    name: 'Currency Cloud',
    website: 'https://currencycloud.com',
    logo: '/logos/currencycloud.svg',
    category: 'b2b',
    corridors: ['waemu', 'anglophone', 'maghreb'],
    affiliate: { network: 'direct', envKey: 'CURRENCYCLOUD_AFFILIATE_ID' }
  },

  /* ======== Crypto / Niche ================================ */
  {
    id: 'bitmama',
    name: 'Bitmama',
    website: 'https://bitmama.io',
    logo: '/logos/bitmama.svg',
    category: 'crypto',
    corridors: ['anglophone']
  },
  {
    id: 'afriex',
    name: 'Afriex',
    website: 'https://afriex.app',
    logo: '/logos/afriex.svg',
    category: 'crypto',
    corridors: ['anglophone']
  },
  {
    id: 'bitpesa',
    name: 'BitPesa (Aza)',
    website: 'https://azafinance.com',
    logo: '/logos/bitpesa.svg',
    category: 'crypto',
    corridors: ['waemu']
  },

  /* ======== P2P =========================================== */
  {
    id: 'paxful',
    name: 'Paxful',
    website: 'https://paxful.com',
    logo: '/logos/paxful.svg',
    category: 'p2p',
    corridors: ['anglophone', 'waextra']
  }
];
