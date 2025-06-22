/* ------------------------------------------------------------------
   src/data/corridors.ts
   ------------------------------------------------------------------
   • Les seuls corridors couverts : WAEMU, “WAEXTRA”, Anglophone, Maghreb
   • Devises d’envoi         : USD · CAD · EUR · GBP
   ------------------------------------------------------------------ */

/* ---------- ajoute ce type ---------- */
export type Region = 'waemu' | 'waextra' | 'anglophone' | 'maghreb';

/* ---------- modifie ici : Corridor possède désormais la région --- */
export type Corridor = {
  /** Devise source (USD, CAD…)           */ from: string;
  /** Devise destination (XOF, MRU…)     */ to:   string;
  /** Pays d’envoi (ISO-3166-1 α-2)       */ sources:      string[];
  /** Pays de réception (ISO-3166-1 α-2)  */ destinations: string[];
  /** Région du corridor                 */ region:       Region;
};

/* ===== Helpers =================================================== */

/** Groupes “classiques” de pays expéditeurs */
const US = ['US'];                                  // États-Unis
const CA = ['CA'];                                  // Canada
const EU = ['FR', 'DE', 'ES', 'IT', 'BE', 'NL'];    // Europe « gros flux »
const GB = ['GB'];                                  // Royaume-Uni

type Src = { usd?: boolean; cad?: boolean; eur?: boolean; gbp?: boolean };
const mkSources = ({usd,cad,eur,gbp}: Src): string[] => [
  ...(usd ? US : []),
  ...(cad ? CA : []),
  ...(eur ? EU : []),
  ...(gbp ? GB : [])
];

/* ===== Destinations ============================================= */

const WAEMU     = ['SN','CI','ML','BJ','TG','BF','NE','GW'];           // XOF
const WAEXTRA   = { MRU:['MR'], CPV:['CV'], GNF:['GN'] };            // MRU • CVE • GNF
const ANGLO     = { GMD:['GM'], GHS:['GH'], NGN:['NG'] };           // GMD • GHS • NGN
const MAGHREB   = { DZD:['DZ'], MAD:['MA'], TND:['TN'] };           // DZD • MAD • TND

/* ===== Construction =================================================
   → pour chaque couple (devise d’envoi, devise destinataire) on génère
     un objet Corridor avec la bonne liste de pays source/destination.
   ================================================================== */

/* ---------- helper makeRows reçoit désormais la région ---------- */
function makeRows(
  region: Region,
  dstCurrency: keyof typeof WAEXTRA | keyof typeof ANGLO | keyof typeof MAGHREB | 'XOF',
  destinations: string[]
): Corridor[] {
  return ['USD','CAD','EUR','GBP'].map(dev => ({
    from: dev,
    to:   dstCurrency,
    sources: mkSources({
      usd: dev === 'USD',
      cad: dev === 'CAD',
      eur: dev === 'EUR',
      gbp: dev === 'GBP'
    }),
    destinations,
    region  // ← injecté ici
  }));
}

/* ===== Tableau final ---------------------------------------------- */
export const corridors: Corridor[] = [

  /* 1️⃣ WAEMU (XOF) */
  ...makeRows('waemu',     'XOF', WAEMU),

  /* 2️⃣ “WAEXTRA” (hors UEMOA) */
  ...makeRows('waextra',   'MRU', WAEXTRA.MRU),
  ...makeRows('waextra',   'CPV', WAEXTRA.CPV),
  ...makeRows('waextra',   'GNF', WAEXTRA.GNF),

  /* 3️⃣ Anglophones */
  ...makeRows('anglophone','GMD', ANGLO.GMD),   // Gambie
  ...makeRows('anglophone','GHS', ANGLO.GHS),   // Ghana
  ...makeRows('anglophone','NGN', ANGLO.NGN),   // Nigéria

  /* 4️⃣ Maghreb */
  ...makeRows('maghreb',   'DZD', MAGHREB.DZD), // Algérie
  ...makeRows('maghreb',   'MAD', MAGHREB.MAD), // Maroc
  ...makeRows('maghreb',   'TND', MAGHREB.TND)  // Tunisie

];
