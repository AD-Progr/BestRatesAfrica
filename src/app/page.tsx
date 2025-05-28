'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Clock, Shield, AlertCircle, ExternalLink, Globe, Languages } from 'lucide-react';
import CurrencySelector from '@/components/CurrencySelector';
import AlertForm from '@/components/AlertForm';
import RateChart from '@/components/RateChart';

// Types pour les taux de change
interface ExchangeRate {
  service: string;
  logo: string;
  exchangeRate: number;
  amountReceived: number;
  fees: number;
  duration: string;
  trust: string;
}

// Configuration multilingue
const translations = {
  fr: {
    title: "BestRates Africa",
    subtitle: "Comparez les meilleurs taux pour vos transferts",
    calculator: "Calculateur rapide",
    amountToSend: "Montant à envoyer",
    bestRateAvailable: "Meilleur taux disponible",
    refreshRates: "Actualiser les taux",
    createAlert: "Créer une alerte",
    serviceComparison: "Comparaison des services de transfert",
    realTimeData: "Données en temps réel",
    service: "SERVICE",
    exchangeRate: "TAUX DE CHANGE",
    fees: "FRAIS",
    amountReceived: "MONTANT REÇU",
    duration: "DURÉE",
    action: "ACTION",
    send: "Envoyer",
    minutes: "Minutes",
    hours: "heures",
    securityGuarantee: "Sécurité garantie",
    securityText: "Tous les services sont régulés et sécurisés. Vos transferts sont protégés.",
    realTimeRates: "Taux en temps réel",
    realTimeText: "Les taux sont récupérés en temps réel depuis notre API pour vous offrir les meilleures opportunités.",
    personalizedAlerts: "Alertes personnalisées",
    alertsText: "Recevez une notification dès qu'un taux favorable est disponible.",
    lastUpdate: "Dernière mise à jour",
    online: "En ligne",
    totalCost: "Coût total",
    countries: {
      SN: "le Sénégal",
      GM: "la Gambie", 
      NG: "le Nigeria",
      GH: "le Ghana",
      KE: "le Kenya",
      UG: "l'Ouganda",
      ZA: "l'Afrique du Sud"
    }
  },
  en: {
    title: "BestRates Africa",
    subtitle: "Compare the best rates for your transfers",
    calculator: "Quick calculator",
    amountToSend: "Amount to send",
    bestRateAvailable: "Best rate available",
    refreshRates: "Refresh rates",
    createAlert: "Create alert",
    serviceComparison: "Transfer service comparison",
    realTimeData: "Real-time data",
    service: "SERVICE",
    exchangeRate: "EXCHANGE RATE",
    fees: "FEES",
    amountReceived: "AMOUNT RECEIVED",
    duration: "DURATION",
    action: "ACTION",
    send: "Send",
    minutes: "Minutes",
    hours: "hours",
    securityGuarantee: "Security guarantee",
    securityText: "All services are regulated and secure. Your transfers are protected.",
    realTimeRates: "Real-time rates",
    realTimeText: "Rates are retrieved in real-time from our API to offer you the best opportunities.",
    personalizedAlerts: "Personalized alerts",
    alertsText: "Get notified when a favorable rate is available.",
    lastUpdate: "Last update",
    online: "Online",
    totalCost: "Total cost",
    countries: {
      SN: "Senegal",
      GM: "Gambia",
      NG: "Nigeria", 
      GH: "Ghana",
      KE: "Kenya",
      UG: "Uganda",
      ZA: "South Africa"
    }
  }
};

// Configuration des pays de destination
const countryMapping: Record<string, string> = {
  XOF: 'SN', // Franc CFA → Sénégal
  GMD: 'GM', // Dalasi → Gambie
  NGN: 'NG', // Naira → Nigeria
  GHS: 'GH', // Cedi → Ghana
  KES: 'KE', // Shilling → Kenya
  UGX: 'UG', // Shilling → Ouganda
  ZAR: 'ZA'  // Rand → Afrique du Sud
};

// Noms des devises
const currencyNames = {
  fr: {
    XOF: "Franc CFA",
    GMD: "Dalasi",
    NGN: "Naira", 
    GHS: "Cedi",
    KES: "Shilling",
    UGX: "Shilling",
    ZAR: "Rand"
  },
  en: {
    XOF: "CFA Franc",
    GMD: "Dalasi",
    NGN: "Naira",
    GHS: "Cedi", 
    KES: "Shilling",
    UGX: "Shilling",
    ZAR: "Rand"
  }
};

export default function Home() {
  // États pour la devise et la langue
  const [selectedPair, setSelectedPair] = useState({ from: 'USD', to: 'XOF' });
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [amount, setAmount] = useState(1000);
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const t = translations[language];

  // Fonction pour obtenir le titre dynamique
  const getDynamicTitle = () => {
    const countryCode = countryMapping[selectedPair.to] || 'SN';
    const countryName = t.countries[countryCode as keyof typeof t.countries] || t.countries.SN;
    const currencyName = currencyNames[language][selectedPair.to as keyof typeof currencyNames.fr] || 'CFA';
    
    return {
      main: `${selectedPair.from} vers ${selectedPair.to} (${currencyName})`,
      subtitle: language === 'fr' 
        ? `Comparez les meilleurs taux pour vos transferts vers l'Afrique`
        : `Compare the best rates for your transfers to Africa`
    };
  };

  const dynamicTitle = getDynamicTitle();

  // Fonction pour récupérer les taux
  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/rates?from=${selectedPair.from}&to=${selectedPair.to}&amount=${amount}`);
      const data = await response.json();
      
      if (data.success) {
        setRates(data.data.rates);
        setLastUpdate(new Date().toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US'));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des taux:', error);
    } finally {
      setLoading(false);
    }
  };

  // Récupération des taux au chargement et changement de corridor
  useEffect(() => {
    fetchRates();
  }, [selectedPair, amount]);

  // Calcul des montants en temps réel
  const calculateAmounts = (newAmount: number): ExchangeRate[] => {
    return rates.map(rate => ({
      ...rate,
      amountReceived: Math.round(newAmount * rate.exchangeRate)
    }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value) || 0;
    setAmount(newAmount);
    setRates(calculateAmounts(newAmount));
  };

  const bestRate = rates.length > 0 ? rates[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header avec sélecteur de langue */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
            </div>
            
            {/* Sélecteur de langue */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Languages className="h-4 w-4 text-gray-600" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'fr' | 'en')}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="fr">🇫🇷 Français</option>
                  <option value="en">🇬🇧 English</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{t.lastUpdate}: {lastUpdate}</span>
                <span className="text-green-600 font-medium">• {t.online}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sélecteur de corridors */}
        <CurrencySelector
          selectedPair={selectedPair}
          onPairChange={setSelectedPair}
        />

        {/* Titre principal dynamique */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">
              {selectedPair.from === 'USD' ? '🇺🇸' : selectedPair.from === 'EUR' ? '🇪🇺' : selectedPair.from === 'GBP' ? '🇬🇧' : '🇨🇦'}
            </span>
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <span className="text-2xl">
              {selectedPair.to === 'XOF' ? '🇸🇳' : selectedPair.to === 'GMD' ? '🇬🇲' : selectedPair.to === 'NGN' ? '🇳🇬' : selectedPair.to === 'GHS' ? '🇬🇭' : selectedPair.to === 'KES' ? '🇰🇪' : selectedPair.to === 'UGX' ? '🇺🇬' : '🇿🇦'}
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {dynamicTitle.main}
          </h2>
          <p className="text-xl text-gray-600">
            {dynamicTitle.subtitle}
          </p>
        </div>

        {/* Calculateur rapide */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Calculator className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">{t.calculator}</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.amountToSend} ({selectedPair.from})
              </label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="1000"
              />
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600">
                {bestRate ? bestRate.amountReceived.toLocaleString() : '...'} {selectedPair.to}
              </div>
              <div className="text-sm text-green-700 mt-1">
                {t.bestRateAvailable}
              </div>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          <button
            onClick={fetchRates}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
              loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{language === 'fr' ? 'Actualisation...' : 'Refreshing...'}</span>
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4" />
                <span>{t.refreshRates}</span>
              </>
            )}
          </button>
          
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
            <AlertCircle className="h-4 w-4" />
            <span>{t.createAlert}</span>
          </button>
        </div>

        {/* Graphique d'évolution */}
        <div className="mb-8">
          <RateChart from={selectedPair.from} to={selectedPair.to} amount={amount} />
        </div>

        {/* Tableau de comparaison */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{t.serviceComparison}</h3>
                <p className="text-gray-600">
                  {language === 'fr' ? `Pour ${amount.toLocaleString()} ${selectedPair.from} vers ${countryMapping[selectedPair.to] ? t.countries[countryMapping[selectedPair.to] as keyof typeof t.countries] : t.countries.SN}` : `For ${amount.toLocaleString()} ${selectedPair.from} to ${countryMapping[selectedPair.to] ? t.countries[countryMapping[selectedPair.to] as keyof typeof t.countries] : t.countries.SN}`} • {t.realTimeData}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.service}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.exchangeRate}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.fees}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.amountReceived}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.duration}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.action}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rates.map((rate, index) => (
                  <tr key={rate.service} className={index === 0 ? 'bg-green-50' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={rate.logo} alt={rate.service} className="h-8 w-8 rounded mr-3" />
                        <div>
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{rate.service}</div>
                            {index === 0 && (
                              <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                {language === 'fr' ? 'MEILLEUR' : 'BEST'}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">★ {rate.trust}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rate.exchangeRate.toFixed(2)} {selectedPair.to}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rate.fees === 0 ? (
                        <span className="text-green-600 font-medium">
                          {language === 'fr' ? 'Gratuit' : 'Free'}
                        </span>
                      ) : (
                        `${rate.fees.toFixed(2)} ${selectedPair.from}`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {rate.amountReceived.toLocaleString()} {selectedPair.to}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t.totalCost}: {(rate.fees + (selectedPair.from === 'USD' ? amount : amount)).toFixed(2)} {selectedPair.from}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center text-sm text-gray-900">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {rate.duration === 'Minutes' ? t.minutes : rate.duration.includes('heures') ? rate.duration : rate.duration}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1">
                        <span>{t.send}</span>
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulaire d'alertes */}
        <div className="mb-8">
          <AlertForm 
            currentBestRate={bestRate?.exchangeRate || 655}
            amount={amount}
            from={selectedPair.from}
            to={selectedPair.to}
          />
        </div>

        {/* Section informative */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">{t.securityGuarantee}</h3>
            </div>
            <p className="text-gray-600">{t.securityText}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">{t.realTimeRates}</h3>
            </div>
            <p className="text-gray-600">{t.realTimeText}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <AlertCircle className="h-6 w-6 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">{t.personalizedAlerts}</h3>
            </div>
            <p className="text-gray-600">{t.alertsText}</p>
          </div>
        </div>
      </main>
    </div>
  );
}