'use client';

import { useState } from 'react';
import { corridors } from '@/data/Corridors';

const allZones = [
  'Toutes les zones',
  'Afrique de l’Ouest',
  'Afrique Centrale',
  'Afrique de l’Est',
  'Afrique Australe',
  'Afrique du Nord'
];

export default function CorridorTestPage() {
  const [selectedZone, setSelectedZone] = useState('Toutes les zones');

  const filteredCorridors =
    selectedZone === 'Toutes les zones'
      ? corridors
      : corridors.filter((c) => c.zone === selectedZone);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">🌍 Corridors de Transfert par Région</h1>

      {/* Menu de sélection de la zone */}
      <div className="max-w-sm mx-auto mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filtrer par région :</label>
        <select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          {allZones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage des corridors filtrés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCorridors.map((corridor, index) => (
          <div key={index} className="bg-white p-4 rounded shadow border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">
              {corridor.from} → {corridor.to}
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Diaspora :</strong> {corridor.countries.from.join(', ')}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Pays africains :</strong> {corridor.countries.to.join(', ')}
            </p>
            {corridor.notes && (
              <p className="text-xs text-gray-500 italic mt-2">{corridor.notes}</p>
            )}
            {corridor.popular && (
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                ⭐ Populaire
              </span>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
