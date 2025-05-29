// src/lib/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types pour le contexte
type Language = 'fr' | 'en';
type TranslationKey = string;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

// Créez le contexte
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dictionnaire de traductions
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Traductions pour AlertForm
    "createAlert": "Créer une alerte",
    "alertSubtitle": "Soyez alerté par email dès qu'un taux avantageux est disponible pour vos transferts.",
    "yourEmail": "Votre email",
    "targetRate": "Taux cible minimum",
    "currently": "Actuellement",
    "bestAvailableRate": "meilleur taux disponible",
    "preferredService": "Service préféré (optionnel)",
    "allServices": "Tous les services",
    "alertSummary": "Récapitulatif de votre alerte :",
    "transfer": "Transfert",
    "targetRateIs": "Taux cible",
    "orBetter": "ou mieux",
    "service": "Service",
    "email": "Email",
    "toComplete": "À saisir",
    "createAlertButton": "Créer l'alerte",
    "dataSecured": "Vos données sont sécurisées",
    "onlyFavorableAlerts": "Vous recevrez uniquement des alertes à des taux avantageux",

    // Traductions pour CurrencySelector
    "transferCorridors": "Corridors de transfert",
    "selectCorridor": "Sélectionnez votre corridor de transfert pour comparer les meilleurs taux en temps réel.",
    "popularCorridors": "Corridors populaires",
    "seeMoreCorridors": "Voir 8 autres corridors",
    "selectedCorridor": "Corridor sélectionné",
    "realTimeComparison": "Comparaison des taux en temps réel",

    // Traductions pour RateChart
    "rateEvolution": "Évolution des taux",
    "realTimeTracking": "Suivi en temps réel pour",
    "updatedEvery10min": "Mise à jour toutes les 10 minutes",
    "increaseIsBetter": "Hausse = Meilleur pour vous",
    "timeFrame1h": "1h",
    "timeFrame6h": "6h",
    "timeFrame24h": "24h",
    
    // Autres traductions générales
    "refreshRates": "Actualiser les taux",
    "refreshing": "Actualisation...",
    "send": "Envoyer",
    "minutes": "Minutes",
    "hours": "heures",
    "days": "jours",
    "instantaneous": "Instantané"
  },
  en: {
    // Traductions pour AlertForm
    "createAlert": "Create an Alert",
    "alertSubtitle": "Get notified by email when a favorable rate is available for your transfers.",
    "yourEmail": "Your email",
    "targetRate": "Minimum target rate",
    "currently": "Currently",
    "bestAvailableRate": "best available rate",
    "preferredService": "Preferred service (optional)",
    "allServices": "All services",
    "alertSummary": "Alert summary:",
    "transfer": "Transfer",
    "targetRateIs": "Target rate",
    "orBetter": "or better",
    "service": "Service",
    "email": "Email",
    "toComplete": "To complete",
    "createAlertButton": "Create alert",
    "dataSecured": "Your data is secured",
    "onlyFavorableAlerts": "You will only receive alerts for favorable rates",

    // Traductions pour CurrencySelector
    "transferCorridors": "Transfer Corridors",
    "selectCorridor": "Select your transfer corridor to compare the best rates in real time.",
    "popularCorridors": "Popular Corridors",
    "seeMoreCorridors": "See 8 more corridors",
    "selectedCorridor": "Selected Corridor",
    "realTimeComparison": "Real-time rate comparison",

    // Traductions pour RateChart
    "rateEvolution": "Rate Evolution",
    "realTimeTracking": "Real-time tracking for",
    "updatedEvery10min": "Updated every 10 minutes",
    "increaseIsBetter": "Increase = Better for you",
    "timeFrame1h": "1h",
    "timeFrame6h": "6h", 
    "timeFrame24h": "24h",
    
    // Autres traductions générales
    "refreshRates": "Refresh rates",
    "refreshing": "Refreshing...",
    "send": "Send",
    "minutes": "Minutes",
    "hours": "hours",
    "days": "days",
    "instantaneous": "Instantaneous"
  }
};

// Provider du contexte
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  // Fonction de traduction
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};