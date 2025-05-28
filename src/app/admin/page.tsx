'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, MousePointer, Calendar, Eye, Target, ArrowUp, ArrowDown, Globe, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    dailyVisitors: 0,
    totalClicks: 0,
    conversionRate: 0,
    topService: 'Wise',
    topCountry: 'Sénégal',
    revenueToday: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulation des données (remplacez par vos vraies données Analytics)
  useEffect(() => {
    const loadMetrics = () => {
      setMetrics({
        dailyVisitors: Math.floor(Math.random() * 150) + 50,
        totalClicks: Math.floor(Math.random() * 25) + 8,
        conversionRate: Math.round((Math.random() * 6 + 3) * 10) / 10,
        topService: 'Wise',
        topCountry: 'Sénégal',
        revenueToday: Math.floor(Math.random() * 50) + 15
      });
      setIsLoading(false);
    };

    loadMetrics();
    // Actualisation toutes les 5 minutes
    const interval = setInterval(loadMetrics, 300000);
    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ icon: Icon, title, value, change, color = 'blue', prefix = '', suffix = '' }: any) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-1">{prefix}{value}{suffix}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des métriques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard BestRates Africa</h1>
                <p className="text-gray-600">Suivi des performances en temps réel • {new Date().toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="/"
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 font-medium transition-colors"
              >
                ← Retour au site
              </a>
              <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">En direct</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Users}
            title="Visiteurs aujourd'hui"
            value={metrics.dailyVisitors}
            change={12}
            color="blue"
          />
          <MetricCard
            icon={MousePointer}
            title="Clics sur services"
            value={metrics.totalClicks}
            change={8}
            color="green"
          />
          <MetricCard
            icon={Target}
            title="Taux de conversion"
            value={metrics.conversionRate.toFixed(1)}
            change={-2}
            color="purple"
            suffix="%"
          />
          <MetricCard
            icon={TrendingUp}
            title="Revenus estimés"
            value={metrics.revenueToday}
            change={15}
            color="orange"
            prefix="€"
          />
        </div>

        {/* Objectifs quotidiens */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 Objectifs du jour</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Visiteurs (objectif: 100)</span>
                <span className="text-sm text-gray-600">{metrics.dailyVisitors}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min((metrics.dailyVisitors / 100) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Clics (objectif: 20)</span>
                <span className="text-sm text-gray-600">{metrics.totalClicks}/20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min((metrics.totalClicks / 20) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Revenus (objectif: €30)</span>
                <span className="text-sm text-gray-600">€{metrics.revenueToday}/€30</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min((metrics.revenueToday / 30) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">⚡ Actions rapides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors">
              <h3 className="font-semibold text-blue-900 mb-2">📊 Google Analytics</h3>
              <p className="text-blue-700 text-sm mb-3">Consultez vos stats détaillées</p>
              <a 
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors inline-block"
              >
                Ouvrir Analytics
              </a>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors">
              <h3 className="font-semibold text-green-900 mb-2">🔍 Search Console</h3>
              <p className="text-green-700 text-sm mb-3">Surveillez votre SEO</p>
              <a 
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors inline-block"
              >
                Ouvrir Console
              </a>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors">
              <h3 className="font-semibold text-purple-900 mb-2">📱 Réseaux Sociaux</h3>
              <p className="text-purple-700 text-sm mb-3">Partagez vos contenus</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors">
                Créer post
              </button>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg hover:bg-orange-100 transition-colors">
              <h3 className="font-semibold text-orange-900 mb-2">✍️ Nouveau contenu</h3>
              <p className="text-orange-700 text-sm mb-3">Améliorez votre SEO</p>
              <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700 transition-colors">
                Écrire article
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques détaillées */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🌍 Top Destinations</h2>
            <div className="space-y-4">
              {[
                { name: 'Sénégal', clicks: 35, flag: '🇸🇳' },
                { name: 'Mali', clicks: 28, flag: '🇲🇱' },
                { name: 'Côte d\'Ivoire', clicks: 22, flag: '🇨🇮' },
                { name: 'Nigeria', clicks: 18, flag: '🇳🇬' },
                { name: 'Ghana', clicks: 15, flag: '🇬🇭' }
              ].map((country, index) => (
                <div key={country.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="font-medium text-gray-700">{country.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(country.clicks / 35) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{country.clicks}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🏆 Services les plus cliqués</h2>
            <div className="space-y-4">
              {[
                { name: 'Wise', clicks: 45, logo: '💸', color: 'blue' },
                { name: 'Remitly', clicks: 32, logo: '🌍', color: 'green' },
                { name: 'WorldRemit', clicks: 28, logo: '⚡', color: 'purple' },
                { name: 'Western Union', clicks: 20, logo: '💰', color: 'orange' },
                { name: 'MoneyGram', clicks: 15, logo: '📱', color: 'red' }
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{service.logo}</span>
                    <span className="font-medium text-gray-700">{service.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {service.clicks} clics
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conseils du jour */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-3">💡 Conseils pour aujourd'hui</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">🎯 Optimisation</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Publier sur LinkedIn à 14h (heure de pointe)</li>
                <li>• Répondre aux commentaires pour améliorer l'engagement</li>
                <li>• Tester une nouvelle accroche sur la page d'accueil</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">📈 Croissance</h4>
              <ul className="text-purple-700 text-sm space-y-1">
                <li>• Contacter 3 influenceurs fintech aujourd'hui</li>
                <li>• Créer du contenu sur les nouveaux taux EUR/XOF</li>
                <li>• Analyser les concurrents pour trouver des opportunités</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}