'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Clock, Shield, AlertCircle, ExternalLink, Globe, Languages } from 'lucide-react';
import CurrencySelector from '@/components/CurrencySelector';
import AlertForm from '@/components/AlertForm';
import RateChart from '@/components/RateChart';
// 🎯 AJOUT: Import des fonctions de tracking
import { trackServiceClick, trackComparison, trackPageEngagement } from '../lib/analytics';

// Types pour les taux de change
interface ExchangeRate {
  service: string;
  logo: string;
  exchangeRate: number;
  amountReceived: number;
  fees: number;
  duration: string;
  trust: string;
  url?: string; // Pour le tracking
}

// 🚀 CONFIGURATION ÉTENDUE - TOUS LES CORRIDORS
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
    // 🌍 PAYS ÉTENDUS
    countries: {
      SN: "le Sénégal",
      ML: "le Mali",
      CI: "la Côte d'Ivoire", 
      BF: "le Burkina Faso",
      NE: "le Niger",
      GN: "la Guinée",
      GM: "la Gambie", 
      NG: "le Nigeria",
      GH: "le Ghana",
      TG: "le Togo",
      KE: "le Kenya",
      UG: "l'Ouganda",
      ZA: "l'Afrique du Sud",
      CD: "la RDC",
      CM: "le Cameroun",
      BI: "le Burundi",
      MA: "le Maroc",
      TN: "la Tunisie",
      DZ: "l'Algérie",
      GQ: "la Guinée Équatoriale"
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
      ML: "Mali",
      CI: "Côte d'Ivoire",
      BF: "Burkina Faso", 
      NE: "Niger",
      GN: "Guinea",
      GM: "Gambia",
      NG: "Nigeria", 
      GH: "Ghana",
      TG: "Togo",
      KE: "Kenya",
      UG: "Uganda",
      ZA: "South Africa",
      CD: "DRC",
      CM: "Cameroon",
      BI: "Burundi",
      MA: "Morocco",
      TN: "Tunisia",
      DZ: "Algeria",
      GQ: "Equatorial Guinea"
    }
  }
};

// 🎯 CONFIGURATION PAYS ÉTENDUE
const countryMapping: Record<string, string> = {
  // Afrique de l'Ouest - CFA
  XOF: 'SN', // Franc CFA → Sénégal (défaut, aussi Mali, CI, BF, NE, GN)
  
  // Autres devises africaines
  GMD: 'GM', // Dalasi → Gambie
  NGN: 'NG', // Naira → Nigeria
  GHS: 'GH', // Cedi → Ghana
  KES: 'KE', // Shilling → Kenya
  UGX: 'UG', // Shilling → Ouganda
  ZAR: 'ZA', // Rand → Afrique du Sud
  CDF: 'CD', // Franc congolais → RDC
  XAF: 'CM', // Franc CFA Central → Cameroun (défaut pour Guinée Équatoriale aussi)
  BIF: 'BI', // Franc → Burundi
  MAD: 'MA', // Dirham → Maroc
  TND: 'TN', // Dinar → Tunisie
  DZD: 'DZ'  // Dinar → Algérie
};

// 🌍 NOMS DES DEVISES ÉTENDUS
const currencyNames = {
  fr: {
    XOF: "Franc CFA",
    GMD: "Dalasi",
    NGN: "Naira", 
    GHS: "Cedi",
    KES: "Shilling",
    UGX: "Shilling",
    ZAR: "Rand",
    CDF: "Franc Congolais",
    XAF: "Franc CFA Central",
    BIF: "Franc Burundais",
    MAD: "Dirham",
    TND: "Dinar Tunisien",
    DZD: "Dinar Algérien"
  },
  en: {
    XOF: "CFA Franc",
    GMD: "Dalasi",
    NGN: "Naira",
    GHS: "Cedi", 
    KES: "Shilling",
    UGX: "Shilling",
    ZAR: "Rand",
    CDF: "Congolese Franc",
    XAF: "Central CFA Franc",
    BIF: "Burundian Franc",
    MAD: "Dirham",
    TND: "Tunisian Dinar",
    DZD: "Algerian Dinar"
  }
};

// 💰 SERVICES ÉTENDUS (basés sur votre rapport)
const mockServices: ExchangeRate[] = [
  {
    service: "Wise",
    logo: "/logos/wise.png",
    exchangeRate: 655.50,
    amountReceived: 655500,
    fees: 7.50,
    duration: "2-4 heures",
    trust: "4.8/5",
    url: "https://wise.com/invite/ath/abdoulayec113"
  },
  {
    service: "Orange Money",
    logo: "/logos/orange.png", 
    exchangeRate: 652.30,
    amountReceived: 652300,
    fees: 12.00,
    duration: "Instantané",
    trust: "4.7/5",
    url: "https://orangemoney.com"
  },
  {
    service: "Ria Money Transfer",
    logo: "/logos/ria.png",
    exchangeRate: 650.80,
    amountReceived: 650800,
    fees: 9.99,
    duration: "1-3 jours",
    trust: "4.6/5",
    url: "https://riamoneytransfer.com"
  },
  {
    service: "Tap Tap Send",
    logo: "/logos/taptap.png",
    exchangeRate: 648.90,
    amountReceived: 648900,
    fees: 5.00,
    duration: "30 minutes",
    trust: "4.5/5", 
    url: "https://taptapsend.com"
  },
  {
    service: "Wave",
    logo: "/logos/wave.png",
    exchangeRate: 647.20,
    amountReceived: 647200,
    fees: 0.00,
    duration: "Instantané",
    trust: "4.4/5",
    url: "https://wave.com"
  },
  {
    service: "Remitly",
    logo: "/logos/remitly.png",
    exchangeRate: 645.70,
    amountReceived: 645700,
    fees: 15.00,
    duration: "1-3 jours",
    trust: "4.7/5",
    url: "https://remitly.com"
  },
  {
    service: "Western Union",
    logo: "/logos/westernunion.png",
    exchangeRate: 642.50,
    amountReceived: 642500,
    fees: 25.00,
    duration: "Minutes",
    trust: "4.3/5",
    url: "https://westernunion.com"
  },
  {
    service: "MoneyGram",
    logo: "/logos/moneygram.png",
    exchangeRate: 640.20,
    amountReceived: 640200,
    fees: 20.00,
    duration: "10 minutes",
    trust: "4.2/5",
    url: "https://moneygram.com"
  },
  {
    service: "Xoom",
    logo: "/logos/xoom.png",
    exchangeRate: 638.90,
    amountReceived: 638900,
    fees: 18.00,
    duration: "4 heures",
    trust: "4.1/5",
    url: "https://xoom.com"
  }
];

export default function Home() {
  // États pour la devise et la langue
  const [selectedPair, setSelectedPair] = useState({ from: 'EUR', to: 'XOF' });
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [amount, setAmount] = useState(1000);
  const [rates, setRates] = useState<ExchangeRate[]>(mockServices);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const t = translations[language];

  // 🎯 AJOUT: Track page view au chargement
  useEffect(() => {
    trackPageEngagement(`BestRates Africa - ${selectedPair.from} to ${selectedPair.to}`);
    setLastUpdate(new Date().toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US'));
  }, []);

  // 🎯 AJOUT: Track changement de corridor
  useEffect(() => {
    if (selectedPair.from && selectedPair.to) {
      // @ts-ignore
      if (typeof gtag !== 'undefined') {
        // @ts-ignore
        gtag('event', 'corridor_change', {
          from_currency: selectedPair.from,
          to_currency: selectedPair.to,
          event_category: 'engagement',
          event_label: `${selectedPair.from}-${selectedPair.to}`
        });
        console.log(`🔄 CORRIDOR CHANGÉ: ${selectedPair.from} → ${selectedPair.to}`);
      }
    }
  }, [selectedPair]);

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
    
    // 🎯 AJOUT: Track refresh rates
    // @ts-ignore
    if (typeof gtag !== 'undefined') {
      // @ts-ignore
      gtag('event', 'refresh_rates', {
        from_currency: selectedPair.from,
        to_currency: selectedPair.to,
        amount: amount,
        event_category: 'engagement',
        event_label: `refresh-${selectedPair.from}-${selectedPair.to}`
      });
      console.log(`🔄 ACTUALISATION TAUX: ${selectedPair.from} → ${selectedPair.to} pour ${amount}`);
    }
    
    try {
      // Simulation API call avec données réalistes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calcul des taux basés sur le montant
      const updatedRates = mockServices.map(service => ({
        ...service,
        amountReceived: Math.round(amount * service.exchangeRate)
      }));
      
      setRates(updatedRates);
      setLastUpdate(new Date().toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US'));
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
    
    // 🎯 AJOUT: Track amount change
    // @ts-ignore
    if (typeof gtag !== 'undefined') {
      // @ts-ignore
      gtag('event', 'amount_change', {
        new_amount: newAmount,
        from_currency: selectedPair.from,
        to_currency: selectedPair.to,
        event_category: 'engagement'
      });
    }
  };

  // 🎯 AJOUT: Fonction pour tracker les clics sur les services
  const handleServiceClick = (rate: ExchangeRate) => {
    trackServiceClick(
      rate.service,
      amount,
      selectedPair.from,
      selectedPair.to
    );
    
    // Ouvrir le lien du service
    if (rate.url) {
      window.open(rate.url, '_blank');
    }
  };

  // 🎯 AJOUT: Fonction pour tracker les changements de sélecteur de devises
  const handlePairChange = (newPair: { from: string; to: string }) => {
    setSelectedPair(newPair);
    trackComparison(newPair.from, newPair.to, amount);
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
        {/* Sélecteur de corridors - 🎯 MODIFICATION: Ajout du tracking */}
        <CurrencySelector
          selectedPair={selectedPair}
          onPairChange={handlePairChange}
        />

        {/* Titre principal dynamique */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">
              {selectedPair.from === 'USD' ? '🇺🇸' : selectedPair.from === 'EUR' ? '🇪🇺' : selectedPair.from === 'GBP' ? '🇬🇧' : '🇨🇦'}
            </span>
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <span className="text-2xl">
              {selectedPair.to === 'XOF' ? '🇸🇳' : selectedPair.to === 'GMD' ? '🇬🇲' : selectedPair.to === 'NGN' ? '🇳🇬' : selectedPair.to === 'GHS' ? '🇬🇭' : selectedPair.to === 'KES' ? '🇰🇪' : selectedPair.to === 'UGX' ? '🇺🇬' : selectedPair.to === 'ZAR' ? '🇿🇦' : selectedPair.to === 'MAD' ? '🇲🇦' : '🌍'}
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {dynamicTitle.main}
          </h2>
          <p className="text-xl text-gray-600">
            {dynamicTitle.subtitle}
          </p>
        </div>

        {/* 📊 STATISTIQUES RAPIDES */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border text-center">
            <div className="text-2xl font-bold text-blue-600">9</div>
            <div className="text-sm text-gray-600">Services comparés</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border text-center">
            <div className="text-2xl font-bold text-green-600">20+</div>
            <div className="text-sm text-gray-600">Pays destinations</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border text-center">
            <div className="text-2xl font-bold text-orange-600">€25</div>
            <div className="text-sm text-gray-600">Économies moyennes</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border text-center">
            <div className="text-2xl font-bold text-purple-600">4.6★</div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </div>
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
                {t.bestRateAvailable} • {bestRate?.service || 'Chargement...'}
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

        {/* Tableau de comparaison ÉTENDU */}
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
                        <div className="h-8 w-8 rounded mr-3 bg-gray-100 flex items-center justify-center text-xs font-bold">
                          {rate.service.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{rate.service}</div>
                            {index === 0 && (
                              <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                {language === 'fr' ? 'MEILLEUR' : 'BEST'}
                              </span>
                            )}
                            {rate.service === 'Wave' && (
                              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                {language === 'fr' ? 'POPULAIRE' : 'POPULAR'}
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
                        {t.totalCost}: {(rate.fees + amount).toFixed(2)} {selectedPair.from}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center text-sm text-gray-900">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {rate.duration === 'Minutes' ? t.minutes : rate.duration.includes('heures') ? rate.duration : rate.duration}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* 🎯 MODIFICATION: Ajout du tracking sur le clic */}
                      <button 
                        onClick={() => handleServiceClick(rate)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1"
                      >
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

        {/* 🌍 SECTION CORRIDORS POPULAIRES */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🌍 Corridors les plus populaires</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { from: 'EUR', to: 'XOF', country: '🇫🇷→🇸🇳', name: 'France → Sénégal' },
              { from: 'EUR', to: 'XOF', country: '🇫🇷→🇲🇱', name: 'France → Mali' },
              { from: 'EUR', to: 'XOF', country: '🇫🇷→🇨🇮', name: 'France → Côte d\'Ivoire' },
              { from: 'EUR', to: 'NGN', country: '🇫🇷→🇳🇬', name: 'France → Nigeria' },
              { from: 'EUR', to: 'MAD', country: '🇪🇸→🇲🇦', name: 'Espagne → Maroc' },
              { from: 'EUR', to: 'CDF', country: '🇧🇪→🇨🇩', name: 'Belgique → RDC' },
              { from: 'EUR', to: 'GHS', country: '🇩🇪→🇬🇭', name: 'Allemagne → Ghana' },
              { from: 'USD', to: 'KES', country: '🇺🇸→🇰🇪', name: 'USA → Kenya' }
            ].map((corridor, index) => (
              <button
                key={index}
                onClick={() => handlePairChange({ from: corridor.from, to: corridor.to })}
                className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
              >
                <div className="text-lg mb-1">{corridor.country}</div>
                <div className="text-xs text-gray-600">{corridor.name}</div>
              </button>
            ))}
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