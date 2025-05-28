'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Clock } from 'lucide-react';

interface RateData {
  timestamp: string;
  time: string;
  Wise: number;
  Remitly: number;
  WorldRemit: number;
  Sendwave: number;
}

interface RateChartProps {
  from: string;
  to: string;
  amount: number;
}

export default function RateChart({ from, to, amount }: RateChartProps) {
  const [rateHistory, setRateHistory] = useState<RateData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h'>('6h');

  useEffect(() => {
    setIsLoading(true);
    
    // Génération de données historiques réalistes
    const generateHistoricalData = () => {
      const now = new Date();
      const data: RateData[] = [];
      const periods = timeRange === '1h' ? 12 : timeRange === '6h' ? 36 : 144; // Points de données
      const intervalMinutes = timeRange === '1h' ? 5 : timeRange === '6h' ? 10 : 10;

      // Taux de base réalistes
      const baseRates = {
        Wise: 655.50,
        Remitly: 652.80,
        WorldRemit: 650.15,
        Sendwave: 648.90
      };

      for (let i = periods - 1; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * intervalMinutes * 60 * 1000);
        
        // Génération de variations réalistes (tendances + bruit)
        const timeProgress = (periods - 1 - i) / periods;
        const trendFactor = Math.sin(timeProgress * Math.PI * 2) * 2; // Tendance cyclique
        
        data.push({
          timestamp: timestamp.toISOString(),
          time: timestamp.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          Wise: parseFloat((baseRates.Wise + trendFactor + (Math.random() - 0.5) * 1.5).toFixed(2)),
          Remitly: parseFloat((baseRates.Remitly + trendFactor * 0.8 + (Math.random() - 0.5) * 2).toFixed(2)),
          WorldRemit: parseFloat((baseRates.WorldRemit + trendFactor * 0.6 + (Math.random() - 0.5) * 2.5).toFixed(2)),
          Sendwave: parseFloat((baseRates.Sendwave + trendFactor * 0.4 + (Math.random() - 0.5) * 1).toFixed(2))
        });
      }

      return data;
    };
    
    // Simulation du chargement des données
    setTimeout(() => {
      const data = generateHistoricalData();
      setRateHistory(data);
      setIsLoading(false);
    }, 1000);
  }, [timeRange]);

  // Calcul des statistiques
  const getStats = () => {
    if (rateHistory.length === 0) return null;

    const latest = rateHistory[rateHistory.length - 1];
    const oldest = rateHistory[0];

    const changes = {
      Wise: ((latest.Wise - oldest.Wise) / oldest.Wise) * 100,
      Remitly: ((latest.Remitly - oldest.Remitly) / oldest.Remitly) * 100,
      WorldRemit: ((latest.WorldRemit - oldest.WorldRemit) / oldest.WorldRemit) * 100,
      Sendwave: ((latest.Sendwave - oldest.Sendwave) / oldest.Sendwave) * 100
    };

    return { latest, changes };
  };

  const stats = getStats();

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{
      color: string;
      dataKey: string;
      value: number;
    }>;
    label?: string;
  }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">
              {entry.dataKey}: <strong>{entry.value.toFixed(2)} {to}</strong>
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Évolution des taux {from}→{to}
            </h3>
            <p className="text-sm text-gray-600">
              Suivi en temps réel pour {amount.toLocaleString()} {from}
            </p>
          </div>
        </div>

        {/* Sélecteur de période */}
        <div className="flex space-x-2">
          {(['1h', '6h', '24h'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeRange(period)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeRange === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Statistiques */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(stats.changes).map(([service, change]) => {
            const isPositive = change > 0;
            const currentRate = stats.latest[service as keyof typeof stats.latest] as number;
            
            return (
              <div key={service} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{service}</span>
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {currentRate.toFixed(2)} {to}
                </div>
                <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}{change.toFixed(2)}%
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Graphique */}
      <div className="h-80">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Chargement des données historiques...</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rateHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <Line 
                type="monotone" 
                dataKey="Wise" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#2563eb' }}
              />
              <Line 
                type="monotone" 
                dataKey="Remitly" 
                stroke="#dc2626" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#dc2626' }}
              />
              <Line 
                type="monotone" 
                dataKey="WorldRemit" 
                stroke="#16a34a" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#16a34a' }}
              />
              <Line 
                type="monotone" 
                dataKey="Sendwave" 
                stroke="#ea580c" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#ea580c' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Légende */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>Mise à jour toutes les {timeRange === '1h' ? '5' : '10'} minutes</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Hausse = Meilleur pour vous</span>
        </div>
      </div>
    </div>
  );
}