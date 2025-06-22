// src/app/[locale]/corridors/page.tsx
// -----------------------------------

import CorridorFinder from '@/components/CorridorFinder';
import {corridors}    from '@/data/corridors';   // ⬅️  ajoute ceci

export const metadata = { title: 'Corridors – BestRates Africa' };

export default function CorridorsPage() {
  return <CorridorFinder corridors={corridors} />;
}
