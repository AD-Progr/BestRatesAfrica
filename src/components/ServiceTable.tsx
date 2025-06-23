'use client';

import type { Corridor } from '@/data/corridors';
import { services, type Service } from '@/data/services';

/* ------------------------------------------------------------
   Helpers
------------------------------------------------------------ */

/** Construit (si dispo) le lien d’affiliation d’un prestataire  */
function affiliateLink(s: Service): string | null {
  if (!s.affiliate) return null;                                 // pas encore de deal

  const id = process.env[s.affiliate.envKey as keyof NodeJS.ProcessEnv];
  if (!id) return null;                                          // variable manquante

  switch (s.affiliate.network) {
    case 'impact':
      return `https://impact.com/aff?cid=${id}`;
    case 'cj':
      return `https://www.anrdoezrs.net/links/${id}/type/dlg/*/${s.website}`;
    case 'flex':
      return `https://prf.hn/click/${id}`;
    case 'direct':
      return `${s.website}?ref=${id}`;
    default:
      return null;
  }
}

/** Filtre les prestataires réellement disponibles pour ce corridor  */
function matchServices({ region }: Corridor): Service[] {
  return services.filter(s => s.corridors.includes(region));
}


/* ------------------------------------------------------------
   Composant
------------------------------------------------------------ */

type Props = { corridor: Corridor };

export default function ServiceTable({ corridor }: Props) {
  const list = matchServices(corridor);

  if (!list.length) {
    return <p className="italic text-gray-500">No service yet 😔</p>;
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-3 py-2 text-left">Service</th>
          <th className="px-3 py-2 text-left">Category</th>
          <th className="px-3 py-2 text-left">Link</th>
        </tr>
      </thead>
      <tbody>
        {list.map(s => {
          const url = affiliateLink(s) ?? s.website;
          return (
            <tr key={s.id} className="border-t">
              <td className="px-3 py-2 flex items-center gap-2">
                <img src={s.logo} alt={s.name} className="w-6 h-6" />
                {s.name}
              </td>
              <td className="px-3 py-2 capitalize">{s.category}</td>
              <td className="px-3 py-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit&nbsp;↗
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
