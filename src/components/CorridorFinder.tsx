'use client';

import {useEffect, useState} from 'react';
import {corridors as allCorridors, Region, Corridor} from '@/data/corridors';
import {useTranslations} from 'next-intl';

type Props = { corridors?: Corridor[] };

export default function CorridorFinder({ corridors = allCorridors }: Props) {
  /* ---------- i18n pour les libellés de filtres -------------- */
  const t = useTranslations('CorridorFilters');

  const FILTERS: { id: Region | 'all'; label: string }[] = [
    { id: 'all',        label: t('all') },
    { id: 'waemu',      label: t('waemu') },
    { id: 'waextra',    label: t('waextra') },
    { id: 'anglophone', label: t('anglophone') },
    { id: 'maghreb',    label: t('maghreb') }
  ];

  const [current, setCurrent] = useState<Region | 'all'>('all');

  /* ---------- noms de pays : safe côté client uniquement ----- */
  // On précise ici que l'état est une fonction prenant un string et renvoyant un string
  const [nameOf, setNameOf] = useState<(c: string) => string>(() => {
    return (c: string) => c;
  });

  useEffect(() => {
    try {
      const disp = new Intl.DisplayNames(undefined, { type: 'region' });
      setNameOf(() => (code: string) => disp.of(code as any) ?? code);
    } catch {
      /* vieux navigateur : on garde le code ISO */
    }
  }, []);

  const visible = current === 'all'
    ? corridors
    : corridors.filter(c => c.region === current);

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f.id}
            className={`px-3 py-1 rounded border ${current === f.id ? 'bg-black text-white' : ''}`}
            onClick={() => setCurrent(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="space-y-2">
        {visible.map((c, idx) => (
          <details key={idx} className="border rounded">
            <summary className="cursor-pointer select-none font-medium px-3 py-2">
              {c.from} → {c.to} · {c.sources.map(nameOf).join(', ')} → {c.destinations.map(nameOf).join(', ')}
            </summary>
          </details>
        ))}
      </div>
    </div>
  );
}
