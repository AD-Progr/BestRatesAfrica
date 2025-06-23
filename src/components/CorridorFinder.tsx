'use client';

import { useEffect, useState } from 'react';
import { corridors as allCorridors, Region, Corridor } from '@/data/corridors';
import { useTranslations } from 'next-intl';
import ServiceTable from '@/components/ServiceTable';   // ⬅️ NEW

type Props = { corridors?: Corridor[] };

export default function CorridorFinder({ corridors = allCorridors }: Props) {
  /* ---------- i18n filtres ------------------------------ */
  const t = useTranslations('CorridorFilters');

  const FILTERS: { id: Region | 'all'; label: string }[] = [
    { id: 'all',        label: t('all') },
    { id: 'waemu',      label: t('waemu') },
    { id: 'waextra',    label: t('waextra') },
    { id: 'anglophone', label: t('anglophone') },
    { id: 'maghreb',    label: t('maghreb') }
  ];

  const [current, setCurrent] = useState<Region | 'all'>('all');

  /* ---------- Display Names (safe client-side) ---------- */
  const [nameOf, setNameOf] = useState<(code: string) => string>(
    () => (code: string) => code
  );

  useEffect(() => {
    try {
      const disp = new Intl.DisplayNames(undefined, { type: 'region' });
      setNameOf(() => (code: string) => disp.of(code as any) ?? code);
    } catch {/* vieux navigateur */}
  }, []);

  const visible = current === 'all'
    ? corridors
    : corridors.filter((c) => c.region === current);

  /* ---------- RENDER ----------------------------------- */
  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`px-3 py-1 rounded border ${current === f.id ? 'bg-black text-white' : ''}`}
            onClick={() => setCurrent(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste des corridors + services */}
      <div className="space-y-2">
        {visible.map((c, idx) => (
          <details key={idx} className="border rounded">
            <summary className="cursor-pointer select-none font-medium px-3 py-2">
              {c.from} → {c.to} · {c.sources.map(nameOf).join(', ')} →{' '}
              {c.destinations.map(nameOf).join(', ')}
            </summary>

            {/* ⬇️  tableau des prestataires pour CE corridor */}
            <div className="p-4 bg-gray-50">
              <ServiceTable corridor={c} />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
