'use client';

import React from 'react';
import { ArrowRight, Globe, Star } from 'lucide-react';

interface CurrencyPair {
  from: string;
  to: string;
  fromName: string;
  toName: string;
  fromFlag: string;
  toFlag: string;
  popular: boolean;
  baseRate: number; // Taux de référence approximatif
}

interface CurrencySelectorProps {
  selectedPair: { from: string; to: string };
  onPairChange: (pair: { from: string; to: string }) => void;
}

const AVAILABLE_CORRIDORS: CurrencyPair[] = [
  // Corridors populaires
  {
    from: 'USD', to: 'XOF',
    fromName: 'Dollar US', toName: 'Franc CFA',
    fromFlag: '🇺🇸', toFlag: '🇸🇳',
    popular: true,
    baseRate: 655
  },
  {
    from: 'EUR', to: 'XOF', 
    fromName: 'Euro', toName: 'Franc CFA',
    fromFlag: '🇪🇺', toFlag: '🇸🇳',
    popular: true,
    baseRate: 715
  },
  {
    from: 'USD', to: 'NGN',
    fromName: 'Dollar US', toName: 'Naira',
    fromFlag: '🇺🇸', toFlag: '🇳🇬',
    popular: true,
    baseRate: 1650
  },
  {
    from: 'GBP', to: 'GHS',
    fromName: 'Livre Sterling', toName: 'Cedi',
    fromFlag: '🇬🇧', toFlag: '🇬🇭',
    popular: true,
    baseRate: 16.8
  },
  {
    from: 'USD', to: 'GMD',
    fromName: 'Dollar US', toName: 'Dalasi',
    fromFlag: '🇺🇸', toFlag: '🇬🇲',
    popular: true,
    baseRate: 69.5
  },
  
  // Autres corridors
  {
    from: 'USD', to: 'KES',
    fromName: 'Dollar US', toName: 'Shilling',
    fromFlag: '🇺🇸', toFlag: '🇰🇪',
    popular: false,
    baseRate: 155
  },
  {
    from: 'EUR', to: 'NGN',
    fromName: 'Euro', toName: 'Naira',
    fromFlag: '🇪🇺', toFlag: '🇳🇬',
    popular: false,
    baseRate: 1800
  },
  {
    from: 'EUR', to: 'GMD',
    fromName: 'Euro', toName: 'Dalasi',
    fromFlag: '🇪🇺', toFlag: '🇬🇲',
    popular: false,
    baseRate: 76.2
  },
  {
    from: 'GBP', to: 'GMD',
    fromName: 'Livre Sterling', toName: 'Dalasi',
    fromFlag: '🇬🇧', toFlag: '🇬🇲',
    popular: false,
    baseRate: 87.8
  },
  {
    from: 'USD', to: 'UGX',
    fromName: 'Dollar US', toName: 'Shilling',
    fromFlag: '🇺🇸', toFlag: '🇺🇬',
    popular: false,
    baseRate: 3800
  },
  {
    from: 'GBP', to: 'XOF',
    fromName: 'Livre Sterling', toName: 'Franc CFA',
    fromFlag: '🇬🇧', toFlag: '🇸🇳',
    popular: false,
    baseRate: 815
  },
  {
    from: 'USD', to: 'ZAR',
    fromName: 'Dollar US', toName: 'Rand',
    fromFlag: '🇺🇸', toFlag: '🇿🇦',
    popular: false,
    baseRate: 18.5
  },
  {
    from: 'CAD', to: 'XOF',
    fromName: 'Dollar Canadien', toName: 'Franc CFA',
    fromFlag: '🇨🇦', toFlag: '🇸🇳',
    popular: false,
    baseRate: 485
  }
];

export default function CurrencySelector({ selectedPair, onPairChange }: CurrencySelectorProps) {
  const [showAll, setShowAll] = React.useState(false);
  
  const popularCorridors = AVAILABLE_CORRIDORS.filter(c => c.popular);
  const otherCorridors = AVAILABLE_CORRIDORS.filter(c => !c.popular);
  
  const displayedCorridors = showAll ? AVAILABLE_CORRIDORS : popularCorridors;
  
  const isSelected = (corridor: CurrencyPair) => 
    corridor.from === selectedPair.from && corridor.to === selectedPair.to;

  const handleCorridorSelect = (corridor: CurrencyPair) => {
    onPairChange({ from: corridor.from, to: corridor.to });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <Globe className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-800">Corridors de transfert</h3>
      </div>

      <p className="text-gray-600 mb-6">
        Sélectionnez votre corridor de transfert pour comparer les meilleurs taux en temps réel.
      </p>

      {/* Corridors populaires */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Star className="h-4 w-4 text-yellow-500" />
          <h4 className="font-medium text-gray-800">Corridors populaires</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {popularCorridors.map((corridor) => (
            <button
              key={`${corridor.from}-${corridor.to}`}
              onClick={() => handleCorridorSelect(corridor)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isSelected(corridor)
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{corridor.fromFlag}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span className="text-xl">{corridor.toFlag}</span>
                </div>
                {corridor.popular && (
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                )}
              </div>
              
              <div className="text-sm font-medium text-gray-800">
                {corridor.from} → {corridor.to}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {corridor.fromName} → {corridor.toName}
              </div>
              <div className="text-xs text-blue-600 mt-2">
                ~{corridor.baseRate.toLocaleString()} {corridor.to}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Autres corridors */}
      {showAll && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-3">Autres corridors</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {otherCorridors.map((corridor) => (
              <button
                key={`${corridor.from}-${corridor.to}`}
                onClick={() => handleCorridorSelect(corridor)}
                className={`p-3 rounded-lg border transition-all text-left ${
                  isSelected(corridor)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{corridor.fromFlag}</span>
                  <ArrowRight className="h-3 w-3 text-gray-400" />
                  <span className="text-lg">{corridor.toFlag}</span>
                </div>
                
                <div className="text-sm font-medium text-gray-800">
                  {corridor.from} → {corridor.to}
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  ~{corridor.baseRate.toLocaleString()} {corridor.to}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bouton voir plus/moins */}
      <div className="text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          {showAll ? 'Voir moins de corridors' : `Voir ${otherCorridors.length} autres corridors`}
        </button>
      </div>

      {/* Corridor sélectionné */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {AVAILABLE_CORRIDORS.find(c => isSelected(c))?.fromFlag}
            <ArrowRight className="h-4 w-4 text-blue-600" />
            {AVAILABLE_CORRIDORS.find(c => isSelected(c))?.toFlag}
          </div>
          <div>
            <div className="font-medium text-blue-800">
              Corridor sélectionné: {selectedPair.from} → {selectedPair.to}
            </div>
            <div className="text-sm text-blue-600">
              Comparaison des taux en temps réel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}