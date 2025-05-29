'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Globe, Calculator, TrendingUp, Clock, DollarSign, ExternalLink, 
  BookOpen, Star, Shield, Zap, Bell, Mail, Target, CheckCircle 
} from 'lucide-react';

// TOUS LES SERVICES DE TRANSFERT - 12+ services pour chaque corridor
const transferServices = {
  'EUR-XOF': [
    {
      name: 'Sendwave',
      fee: '0€',
      rate: '654.80',
      time: '0-1 jour',
      total: '654.80',
      rating: 4.9,
      features: ['Sans frais', 'Mobile Money', 'Instantané'],
      affiliate: 'https://sendwave.com/',
      color: 'bg-cyan-500'
    },
    {
      name: 'Wise',
      fee: '0.41%',
      rate: '655.50',
      time: '1-2 jours',
      total: '653.31',
      rating: 4.8,
      features: ['Taux réel', 'Transparent', 'Rapide'],
      affiliate: 'https://wise.com/fr/',
      color: 'bg-green-500'
    },
    {
      name: 'Remitly',
      fee: '0.99€',
      rate: '654.20',
      time: '0-1 jour',
      total: '653.21',
      rating: 4.7,
      features: ['Livraison rapide', 'Mobile Money', 'Cash pickup'],
      affiliate: 'https://remitly.com/fr/',
      color: 'bg-blue-500'
    },
    {
      name: 'WorldRemit',
      fee: '0.99€',
      rate: '653.80',
      time: '0-24h',
      total: '652.81',
      rating: 4.6,
      features: ['Mobile Money', 'Bank transfer', 'Cash pickup'],
      affiliate: 'https://worldremit.com/fr/',
      color: 'bg-purple-500'
    },
    {
      name: 'Western Union',
      fee: '4.90€',
      rate: '652.00',
      time: '0-1 jour',
      total: '647.10',
      rating: 4.3,
      features: ['Réseau mondial', 'Cash pickup', 'Agent locations'],
      affiliate: 'https://westernunion.com/fr/',
      color: 'bg-yellow-500'
    },
    {
      name: 'MoneyGram',
      fee: '3.99€',
      rate: '651.50',
      time: '0-1 jour',
      total: '647.51',
      rating: 4.2,
      features: ['Cash pickup', 'Mobile wallet', 'Bank transfer'],
      affiliate: 'https://moneygram.com/fr/',
      color: 'bg-red-500'
    },
    {
      name: 'Ria Money Transfer',
      fee: '2.99€',
      rate: '652.80',
      time: '1-2 jours',
      total: '649.81',
      rating: 4.4,
      features: ['Competitive rates', 'Cash pickup', 'Bank transfer'],
      affiliate: 'https://riamoneytransfer.com/fr/',
      color: 'bg-orange-500'
    },
    {
      name: 'Xoom (PayPal)',
      fee: '1.99€',
      rate: '653.20',
      time: '0-1 jour',
      total: '651.21',
      rating: 4.5,
      features: ['PayPal integration', 'Mobile app', 'Bank transfer'],
      affiliate: 'https://xoom.com/france/',
      color: 'bg-indigo-500'
    },
    {
      name: 'Small World',
      fee: '1.49€',
      rate: '653.90',
      time: '1-2 jours',
      total: '652.41',
      rating: 4.3,
      features: ['Low fees', 'Cash pickup', 'Mobile money'],
      affiliate: 'https://smallworld.com/fr/',
      color: 'bg-pink-500'
    },
    {
      name: 'Azimo (Zepz)',
      fee: '0.99€',
      rate: '653.60',
      time: '0-24h',
      total: '652.61',
      rating: 4.4,
      features: ['Digital first', 'Competitive rates', 'Fast'],
      affiliate: 'https://azimo.com/fr/',
      color: 'bg-teal-500'
    },
    {
      name: 'Wave',
      fee: '0€',
      rate: '652.50',
      time: '0-1 jour',
      total: '652.50',
      rating: 4.6,
      features: ['Sans frais', 'Mobile Money', 'Senegal specialist'],
      affiliate: 'https://wave.com/',
      color: 'bg-green-600'
    },
    {
      name: 'Paysend',
      fee: '1.50€',
      rate: '653.40',
      time: '0-24h',
      total: '651.90',
      rating: 4.2,
      features: ['Card to card', 'Low fees', 'Fast transfer'],
      affiliate: 'https://paysend.com/fr/',
      color: 'bg-blue-600'
    }
  ],
  'USD-NGN': [
    {
      name: 'Sendwave',
      fee: '$0',
      rate: '1,542.30',
      time: '0-24h',
      total: '1,542.30',
      rating: 4.9,
      features: ['No fees', 'Mobile money', 'Instant transfer'],
      affiliate: 'https://sendwave.com/',
      color: 'bg-cyan-500'
    },
    {
      name: 'Wise',
      fee: '0.41%',
      rate: '1,540.50',
      time: '1-2 jours',
      total: '1,535.97',
      rating: 4.8,
      features: ['Real rate', 'Transparent', 'Fast'],
      affiliate: 'https://wise.com/us/',
      color: 'bg-green-500'
    },
    {
      name: 'Remitly',
      fee: '$2.99',
      rate: '1,538.50',
      time: '0-1 jour',
      total: '1,535.51',
      rating: 4.7,
      features: ['Express delivery', 'Bank transfer', 'Debit card'],
      affiliate: 'https://remitly.com/us/',
      color: 'bg-blue-500'
    },
    {
      name: 'Chipper Cash',
      fee: '$0',
      rate: '1,539.80',
      time: '0-1 jour',
      total: '1,539.80',
      rating: 4.6,
      features: ['No fees', 'Mobile app', 'P2P transfer'],
      affiliate: 'https://chippercash.com/',
      color: 'bg-green-600'
    },
    {
      name: 'Western Union',
      fee: '$4.99',
      rate: '1,535.20',
      time: '0-1 jour',
      total: '1,530.21',
      rating: 4.3,
      features: ['Global network', 'Cash pickup', 'Mobile wallet'],
      affiliate: 'https://westernunion.com/us/',
      color: 'bg-yellow-500'
    },
    {
      name: 'MoneyGram',
      fee: '$3.99',
      rate: '1,534.80',
      time: '0-1 jour',
      total: '1,530.81',
      rating: 4.2,
      features: ['Cash pickup', 'Mobile money', 'Bank transfer'],
      affiliate: 'https://moneygram.com/us/',
      color: 'bg-red-500'
    },
    {
      name: 'WorldRemit',
      fee: '$2.99',
      rate: '1,536.90',
      time: '0-24h',
      total: '1,533.91',
      rating: 4.6,
      features: ['Mobile money', 'Bank transfer', 'Airtime top-up'],
      affiliate: 'https://worldremit.com/us/',
      color: 'bg-purple-500'
    },
    {
      name: 'Ria Money Transfer',
      fee: '$2.99',
      rate: '1,537.40',
      time: '1-2 jours',
      total: '1,534.41',
      rating: 4.4,
      features: ['Competitive rates', 'Cash pickup', 'Bank deposit'],
      affiliate: 'https://riamoneytransfer.com/us/',
      color: 'bg-orange-500'
    },
    {
      name: 'Xoom (PayPal)',
      fee: '$4.99',
      rate: '1,536.20',
      time: '0-1 jour',
      total: '1,531.21',
      rating: 4.5,
      features: ['PayPal integration', 'Bank deposit', 'Cash pickup'],
      affiliate: 'https://xoom.com/',
      color: 'bg-indigo-500'
    },
    {
      name: 'Paysend',
      fee: '$1.50',
      rate: '1,538.90',
      time: '0-24h',
      total: '1,537.40',
      rating: 4.2,
      features: ['Card to card', 'Bank transfer', 'Low fees'],
      affiliate: 'https://paysend.com/us/',
      color: 'bg-blue-600'
    },
    {
      name: 'Flutterwave',
      fee: '$1.99',
      rate: '1,537.80',
      time: '0-1 jour',
      total: '1,535.81',
      rating: 4.5,
      features: ['African focus', 'Mobile money', 'Bank transfer'],
      affiliate: 'https://flutterwave.com/',
      color: 'bg-yellow-600'
    },
    {
      name: 'Skrill',
      fee: '$3.99',
      rate: '1,535.60',
      time: '0-24h',
      total: '1,531.61',
      rating: 4.1,
      features: ['Digital wallet', 'Email transfer', 'Mobile app'],
      affiliate: 'https://skrill.com/',
      color: 'bg-purple-600'
    }
  ],
  'GBP-GHS': [
    {
      name: 'Sendwave',
      fee: '£0',
      rate: '19.85',
      time: '0-24h',
      total: '19.85',
      rating: 4.9,
      features: ['No fees', 'Mobile money', 'Instant'],
      affiliate: 'https://sendwave.com/',
      color: 'bg-cyan-500'
    },
    {
      name: 'Wise',
      fee: '0.41%',
      rate: '19.80',
      time: '1-2 jours',
      total: '19.72',
      rating: 4.8,
      features: ['Real rate', 'Transparent', 'Fast'],
      affiliate: 'https://wise.com/gb/',
      color: 'bg-green-500'
    },
    {
      name: 'Remitly',
      fee: '£0.99',
      rate: '19.72',
      time: '0-1 jour',
      total: '19.63',
      rating: 4.7,
      features: ['Express delivery', 'Mobile money', 'Bank transfer'],
      affiliate: 'https://remitly.com/gb/',
      color: 'bg-blue-500'
    },
    {
      name: 'WorldRemit',
      fee: '£0.99',
      rate: '19.68',
      time: '0-24h',
      total: '19.59',
      rating: 4.6,
      features: ['Mobile money', 'Cash pickup', 'Bank transfer'],
      affiliate: 'https://worldremit.com/gb/',
      color: 'bg-purple-500'
    },
    {
      name: 'Western Union',
      fee: '£2.90',
      rate: '19.65',
      time: '0-1 jour',
      total: '19.56',
      rating: 4.3,
      features: ['Cash pickup', 'Global network', 'Mobile wallet'],
      affiliate: 'https://westernunion.com/gb/',
      color: 'bg-yellow-500'
    },
    {
      name: 'MoneyGram',
      fee: '£2.99',
      rate: '19.62',
      time: '0-1 jour',
      total: '19.53',
      rating: 4.2,
      features: ['Cash pickup', 'Mobile money', 'Bank transfer'],
      affiliate: 'https://moneygram.com/gb/',
      color: 'bg-red-500'
    },
    {
      name: 'Small World',
      fee: '£1.49',
      rate: '19.70',
      time: '1-2 jours',
      total: '19.61',
      rating: 4.3,
      features: ['Low fees', 'Cash pickup', 'Mobile money'],
      affiliate: 'https://smallworld.com/gb/',
      color: 'bg-pink-500'
    },
    {
      name: 'Azimo (Zepz)',
      fee: '£0.99',
      rate: '19.69',
      time: '0-24h',
      total: '19.60',
      rating: 4.4,
      features: ['Digital first', 'Competitive rates', 'Fast'],
      affiliate: 'https://azimo.com/gb/',
      color: 'bg-teal-500'
    },
    {
      name: 'Ria Money Transfer',
      fee: '£1.99',
      rate: '19.65',
      time: '1-2 jours',
      total: '19.46',
      rating: 4.4,
      features: ['Competitive rates', 'Cash pickup', 'Bank transfer'],
      affiliate: 'https://riamoneytransfer.com/gb/',
      color: 'bg-orange-500'
    },
    {
      name: 'Xoom (PayPal)',
      fee: '£2.49',
      rate: '19.63',
      time: '0-1 jour',
      total: '19.38',
      rating: 4.5,
      features: ['PayPal integration', 'Mobile app', 'Bank transfer'],
      affiliate: 'https://xoom.com/gb/',
      color: 'bg-indigo-500'
    },
    {
      name: 'Paysend',
      fee: '£1.50',
      rate: '19.67',
      time: '0-24h',
      total: '19.52',
      rating: 4.2,
      features: ['Card to card', 'Low fees', 'Fast transfer'],
      affiliate: 'https://paysend.com/gb/',
      color: 'bg-blue-600'
    },
    {
      name: 'Skrill',
      fee: '£2.99',
      rate: '19.60',
      time: '0-24h',
      total: '19.31',
      rating: 4.1,
      features: ['Digital wallet', 'Email transfer', 'Mobile app'],
      affiliate: 'https://skrill.com/',
      color: 'bg-purple-600'
    }
  ],
  'GBP-GMD': [
    {
      name: 'Sendwave',
      fee: '£0',
      rate: '81.50',
      time: '0-24h',
      total: '81.50',
      rating: 4.9,
      features: ['No fees', 'Mobile money', 'Instant'],
      affiliate: 'https://sendwave.com/',
      color: 'bg-cyan-500'
    },
    {
      name: 'Wise',
      fee: '0.41%',
      rate: '81.20',
      time: '1-2 jours',
      total: '80.87',
      rating: 4.8,
      features: ['Real rate', 'Transparent', 'Fast'],
      affiliate: 'https://wise.com/gb/',
      color: 'bg-green-500'
    },
    {
      name: 'Remitly',
      fee: '£0.99',
      rate: '80.90',
      time: '0-1 jour',
      total: '79.91',
      rating: 4.7,
      features: ['Express delivery', 'Mobile money', 'Bank transfer'],
      affiliate: 'https://remitly.com/gb/',
      color: 'bg-blue-500'
    },
    {
      name: 'WorldRemit',
      fee: '£0.99',
      rate: '80.60',
      time: '0-24h',
      total: '79.61',
      rating: 4.6,
      features: ['Mobile money', 'Cash pickup', 'Bank transfer'],
      affiliate: 'https://worldremit.com/gb/',
      color: 'bg-purple-500'
    },
    {
      name: 'Western Union',
      fee: '£2.90',
      rate: '80.20',
      time: '0-1 jour',
      total: '77.30',
      rating: 4.3,
      features: ['Cash pickup', 'Global network', 'Agent locations'],
      affiliate: 'https://westernunion.com/gb/',
      color: 'bg-yellow-500'
    },
    {
      name: 'MoneyGram',
      fee: '£2.99',
      rate: '79.90',
      time: '0-1 jour',
      total: '76.91',
      rating: 4.2,
      features: ['Cash pickup', 'Mobile money', 'Bank transfer'],
      affiliate: 'https://moneygram.com/gb/',
      color: 'bg-red-500'
    },
    {
      name: 'Small World',
      fee: '£1.49',
      rate: '80.40',
      time: '1-2 jours',
      total: '78.91',
      rating: 4.3,
      features: ['Low fees', 'Cash pickup', 'Mobile money'],
      affiliate: 'https://smallworld.com/gb/',
      color: 'bg-pink-500'
    },
    {
      name: 'Azimo (Zepz)',
      fee: '£0.99',
      rate: '80.35',
      time: '0-24h',
      total: '79.36',
      rating: 4.4,
      features: ['Digital first', 'Competitive rates', 'Fast'],
      affiliate: 'https://azimo.com/gb/',
      color: 'bg-teal-500'
    },
    {
      name: 'Ria Money Transfer',
      fee: '£1.99',
      rate: '80.15',
      time: '1-2 jours',
      total: '78.16',
      rating: 4.4,
      features: ['Competitive rates', 'Cash pickup', 'Bank transfer'],
      affiliate: 'https://riamoneytransfer.com/gb/',
      color: 'bg-orange-500'
    },
    {
      name: 'Xoom (PayPal)',
      fee: '£2.49',
      rate: '80.10',
      time: '0-1 jour',
      total: '77.61',
      rating: 4.5,
      features: ['PayPal integration', 'Mobile app', 'Bank transfer'],
      affiliate: 'https://xoom.com/gb/',
      color: 'bg-indigo-500'
    },
    {
      name: 'Paysend',
      fee: '£1.50',
      rate: '80.25',
      time: '0-24h',
      total: '78.75',
      rating: 4.2,
      features: ['Card to card', 'Low fees', 'Fast transfer'],
      affiliate: 'https://paysend.com/gb/',
      color: 'bg-blue-600'
    },
    {
      name: 'Wave',
      fee: '£0',
      rate: '80.00',
      time: '0-1 jour',
      total: '80.00',
      rating: 4.6,
      features: ['No fees', 'Mobile Money', 'Gambia specialist'],
      affiliate: 'https://wave.com/',
      color: 'bg-green-600'
    }
  ]
};

// Devises disponibles
const currencies = {
  'XOF': { name: 'Franc CFA BCEAO', flag: '🌍', countries: 'Sénégal, Mali, Burkina Faso, Côte d\'Ivoire, Niger, Bénin, Togo, Guinée-Bissau' },
  'NGN': { name: 'Naira nigérian', flag: '🇳🇬', countries: 'Nigeria' },
  'GHS': { name: 'Cedi ghanéen', flag: '🇬🇭', countries: 'Ghana' },
  'GMD': { name: 'Dalasi gambien', flag: '🇬🇲', countries: 'Gambie' },
  'GNF': { name: 'Franc guinéen', flag: '🇬🇳', countries: 'Guinée' },
  'LRD': { name: 'Dollar libérien', flag: '🇱🇷', countries: 'Liberia' },
  'SLL': { name: 'Leone sierra-léonais', flag: '🇸🇱', countries: 'Sierra Leone' },
  'CVE': { name: 'Escudo cap-verdien', flag: '🇨🇻', countries: 'Cap-Vert' },
  'MRU': { name: 'Ouguiya mauritanien', flag: '🇲🇷', countries: 'Mauritanie' },
  'MAD': { name: 'Dirham marocain', flag: '🇲🇦', countries: 'Maroc' },
  'EUR': { name: 'Euro', flag: '🇪🇺', countries: 'Zone Euro' },
  'USD': { name: 'Dollar américain', flag: '🇺🇸', countries: 'États-Unis' },
  'GBP': { name: 'Livre sterling', flag: '🇬🇧', countries: 'Royaume-Uni' },
  'CAD': { name: 'Dollar canadien', flag: '🇨🇦', countries: 'Canada' }
};

// Corridors de transfert
const corridors = [
  { from: 'EUR', to: 'XOF', popular: true, description: 'Europe → Sénégal, Mali, Burkina Faso, Côte d\'Ivoire, Niger, Bénin, Togo, Guinée-Bissau' },
  { from: 'USD', to: 'XOF', popular: true, description: 'États-Unis → Zone UEMOA' },
  { from: 'GBP', to: 'XOF', popular: false, description: 'Royaume-Uni → Zone UEMOA' },
  { from: 'USD', to: 'NGN', popular: true, description: 'États-Unis → Nigeria' },
  { from: 'EUR', to: 'NGN', popular: true, description: 'Europe → Nigeria' },
  { from: 'GBP', to: 'NGN', popular: true, description: 'Royaume-Uni → Nigeria' },
  { from: 'USD', to: 'GHS', popular: true, description: 'États-Unis → Ghana' },
  { from: 'EUR', to: 'GHS', popular: false, description: 'Europe → Ghana' },
  { from: 'GBP', to: 'GHS', popular: true, description: 'Royaume-Uni → Ghana' },
  { from: 'USD', to: 'GMD', popular: false, description: 'États-Unis → Gambie' },
  { from: 'EUR', to: 'GMD', popular: false, description: 'Europe → Gambie' },
  { from: 'GBP', to: 'GMD', popular: true, description: 'Royaume-Uni → Gambie' },
  { from: 'USD', to: 'GNF', popular: false, description: 'États-Unis → Guinée' },
  { from: 'EUR', to: 'GNF', popular: true, description: 'Europe → Guinée' },
  { from: 'USD', to: 'LRD', popular: true, description: 'États-Unis → Liberia' },
  { from: 'EUR', to: 'LRD', popular: false, description: 'Europe → Liberia' },
  { from: 'USD', to: 'SLL', popular: false, description: 'États-Unis → Sierra Leone' },
  { from: 'GBP', to: 'SLL', popular: true, description: 'Royaume-Uni → Sierra Leone' },
  { from: 'EUR', to: 'CVE', popular: true, description: 'Europe → Cap-Vert' },
  { from: 'EUR', to: 'MRU', popular: false, description: 'Europe → Mauritanie' },
  { from: 'EUR', to: 'MAD', popular: true, description: 'Europe → Maroc' },
  { from: 'USD', to: 'MAD', popular: false, description: 'États-Unis → Maroc' },
  { from: 'CAD', to: 'MAD', popular: false, description: 'Canada → Maroc' }
];

// Taux de change
const exchangeRates: { [key: string]: number } = {
  'EUR-XOF': 655.50, 'USD-XOF': 590.20, 'GBP-XOF': 728.40,
  'EUR-NGN': 1650.30, 'USD-NGN': 1542.30, 'GBP-NGN': 1890.50,
  'EUR-GHS': 17.85, 'USD-GHS': 16.12, 'GBP-GHS': 19.85,
  'EUR-GMD': 72.50, 'USD-GMD': 65.80, 'GBP-GMD': 81.20,
  'EUR-GNF': 9456.00, 'USD-GNF': 8560.00,
  'USD-LRD': 190.50, 'EUR-LRD': 210.30,
  'USD-SLL': 24500.00, 'GBP-SLL': 30200.00,
  'EUR-CVE': 110.30, 'USD-CVE': 100.20,
  'EUR-MRU': 39.80, 'USD-MRU': 36.15,
  'EUR-MAD': 10.85, 'USD-MAD': 9.85, 'CAD-MAD': 7.35
};

// Composant AlertForm
function AlertForm({ 
  currentBestRate = 655, 
  amount, 
  from, 
  to 
}: { 
  currentBestRate?: number; 
  amount: number; 
  from: string; 
  to: string 
}) {
  const [email, setEmail] = useState('');
  const [targetRate, setTargetRate] = useState(currentBestRate + 2);
  const [selectedService, setSelectedService] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          targetRate,
          service: selectedService || undefined,
          from,
          to,
          amount
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setMessage('🎉 Alerte créée ! Vérifiez votre email de confirmation.');
        
        setTimeout(() => {
          setIsSuccess(false);
          setEmail('');
          setTargetRate(currentBestRate + 2);
          setSelectedService('');
        }, 3000);
      } else {
        setMessage(`❌ Erreur: ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Erreur de connexion. Réessayez plus tard.');
      console.error('Erreur alerte:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-8 w-8 text-green-600" />
          <div>
            <h3 className="text-lg font-semibold text-green-800">Alerte créée !</h3>
            <p className="text-green-700">Nous vous préviendrons par email dès qu'un meilleur taux sera disponible.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-4">
        <Bell className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-800">Créer une alerte</h3>
      </div>
      
      <p className="text-gray-600 mb-6">
        Soyez alerté par email dès qu'un taux avantageux est disponible pour vos transferts.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="inline h-4 w-4 mr-2" />
            Votre email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="votre@email.com"
          />
        </div>

        {/* Taux cible */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Target className="inline h-4 w-4 mr-2" />
            Taux cible minimum ({to})
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              value={targetRate}
              onChange={(e) => setTargetRate(parseFloat(e.target.value))}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">{to}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Actuellement: {currentBestRate} {to} (meilleur taux disponible)
          </p>
        </div>

        {/* Service préféré */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service préféré (optionnel)
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tous les services</option>
            <option value="Sendwave">Sendwave</option>
            <option value="Wise">Wise</option>
            <option value="Remitly">Remitly</option>
            <option value="WorldRemit">WorldRemit</option>
            <option value="Western Union">Western Union</option>
            <option value="MoneyGram">MoneyGram</option>
            <option value="Ria Money Transfer">Ria Money Transfer</option>
            <option value="Xoom (PayPal)">Xoom (PayPal)</option>
            <option value="Small World">Small World</option>
            <option value="Azimo (Zepz)">Azimo (Zepz)</option>
            <option value="Wave">Wave</option>
            <option value="Paysend">Paysend</option>
            <option value="Chipper Cash">Chipper Cash</option>
            <option value="Flutterwave">Flutterwave</option>
            <option value="Skrill">Skrill</option>
          </select>
        </div>

        {/* Récapitulatif */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">Récapitulatif de votre alerte :</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Transfert: {amount} {from} → {to}</li>
            <li>• Taux cible: {targetRate} {to} ou mieux</li>
            <li>• Service: {selectedService || 'Tous les services'}</li>
            <li>• Email: {email || 'À saisir'}</li>
          </ul>
        </div>

        {/* Message d'erreur/succès */}
        {message && (
          <div className={`p-3 rounded-lg ${
            message.includes('Erreur') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message}
          </div>
        )}

        {/* Bouton */}
        <button
          type="submit"
          disabled={isLoading || !email || !targetRate}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isLoading || !email || !targetRate
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Création de l'alerte...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Bell className="h-4 w-4 mr-2" />
              Créer l'alerte
            </span>
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        🔒 Vos données sont sécurisées. Vous recevrez uniquement des alertes de taux avantageux.
      </p>
    </div>
  );
}

// Composant principal
export default function EnhancedHomePage() {
  const [language, setLanguage] = useState('fr');
  const [selectedCorridor, setSelectedCorridor] = useState('EUR-XOF');
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('XOF');
  const [convertAmount, setConvertAmount] = useState(1);

  // Traductions
  const translations = {
    fr: {
      title: 'Comparateur de Taux - Transfert d\'Argent Afrique de l\'Ouest',
      subtitle: '🏆 Trouvez les meilleurs taux parmi 12+ services pour vos transferts vers l\'Afrique de l\'Ouest + Maroc',
      quickCalc: '⚡ Calculateur Rapide',
      amount: 'Montant à envoyer',
      calculate: 'Calculer',
      comparison: '📊 Comparaison des Services',
      service: 'Service',
      fees: 'Frais',
      rate: 'Taux',
      time: 'Délai',
      total: 'Total reçu',
      send: 'Envoyer',
      converter: '💱 Convertisseur Universel',
      from: 'De',
      to: 'Vers',
      seoArticles: '📝 Guides & Conseils',
      readMore: 'Lire la suite',
      selectCorridor: 'Sélectionnez votre corridor de transfert',
      popular: 'Populaire',
      bestChoice: '🏆 Meilleur choix',
      saveUp: '💰 Économisez jusqu\'à 90% sur vos transferts !',
      startNow: '🚀 Commencer maintenant',
      completeGuide: '📖 Guide complet'
    },
    en: {
      title: 'Rate Comparator - West Africa Money Transfer',
      subtitle: '🏆 Find the best rates among 12+ services for your transfers to West Africa + Morocco',
      quickCalc: '⚡ Quick Calculator',
      amount: 'Amount to send',
      calculate: 'Calculate',
      comparison: '📊 Service Comparison',
      service: 'Service',
      fees: 'Fees',
      rate: 'Rate',
      time: 'Time',
      total: 'Total received',
      send: 'Send',
      converter: '💱 Universal Converter',
      from: 'From',
      to: 'To',
      seoArticles: '📝 Guides & Tips',
      readMore: 'Read more',
      selectCorridor: 'Select your transfer corridor',
      popular: 'Popular',
      bestChoice: '🏆 Best choice',
      saveUp: '💰 Save up to 90% on your transfers!',
      startNow: '🚀 Start now',
      completeGuide: '📖 Complete guide'
    }
  };

  const t = (key: string) => {
    const langTranslations = translations[language as keyof typeof translations];
    return (langTranslations as any)[key] || key;
  };

  const handleServiceClick = (serviceName: string, affiliateLink: string) => {
    console.log(`Clic sur ${serviceName} - Lien: ${affiliateLink}`);
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'affiliate_click', {
        service_name: serviceName,
        corridor: selectedCorridor,
        amount: amount
      });
    }
    
    window.open(affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const handleArticleClick = (articleTitle: string) => {
    alert(`Article "${articleTitle}" en cours de rédaction. Bientôt disponible !`);
  };

  const currentServices = transferServices[selectedCorridor as keyof typeof transferServices] || transferServices['EUR-XOF'];
  const conversionRate = exchangeRates[`${fromCurrency}-${toCurrency}`] || 1;

  // Articles SEO
  const seoArticles = [
    {
      title: language === 'fr' ? 'Comment envoyer de l\'argent au Sénégal depuis la France en 2024' : 'How to send money to Senegal from France in 2024',
      excerpt: language === 'fr' ? 'Guide complet des meilleures options pour transférer de l\'argent vers le Sénégal avec les taux les plus avantageux.' : 'Complete guide to the best options for transferring money to Senegal with the most advantageous rates.',
      readTime: '5 min',
      category: language === 'fr' ? 'Guide' : 'Guide'
    },
    {
      title: language === 'fr' ? 'Sendwave vs Wise vs Remitly : Comparaison complète 2024' : 'Sendwave vs Wise vs Remitly: Complete comparison 2024',
      excerpt: language === 'fr' ? 'Comparaison détaillée des trois services de transfert les plus populaires pour l\'Afrique de l\'Ouest.' : 'Detailed comparison of the three most popular transfer services for West Africa.',
      readTime: '7 min',
      category: language === 'fr' ? 'Comparaison' : 'Comparison'
    },
    {
      title: language === 'fr' ? 'Transfert d\'argent vers la Gambie : Guide complet 2024' : 'Money transfer to Gambia: Complete guide 2024',
      excerpt: language === 'fr' ? 'Tout savoir sur les transferts vers la Gambie : dalasi, services disponibles et meilleurs taux.' : 'Everything you need to know about transfers to Gambia: dalasi, available services and best rates.',
      readTime: '6 min',
      category: language === 'fr' ? 'Guide Pays' : 'Country Guide'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <p className="text-gray-600 text-sm">{t('subtitle')}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
            >
              <Globe className="w-4 h-4" />
              {language === 'fr' ? 'English' : 'Français'}
            </button>
            
            <Link href="/route" className="text-blue-600 hover:text-blue-800 transition-colors">
              ← {language === 'fr' ? 'Retour' : 'Back'}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Bandeau de services */}
        <section className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'fr' ? '🎯 12+ Services de Transfert Disponibles' : '🎯 12+ Transfer Services Available'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'fr' 
                ? 'Comparez tous les services majeurs en temps réel pour obtenir le meilleur taux'
                : 'Compare all major services in real time to get the best rate'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Sendwave', 'Wise', 'Remitly', 'WorldRemit', 'Western Union', 'MoneyGram', 'Ria', 'Xoom', 'Small World', 'Azimo', 'Wave', 'Paysend'].map((service) => (
                <span 
                  key={service}
                  className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm border"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Sélecteur de corridor */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            {t('selectCorridor')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
            {corridors.map((corridor) => {
              const key = `${corridor.from}-${corridor.to}`;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCorridor(key)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedCorridor === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${corridor.popular ? 'ring-2 ring-yellow-300' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">
                      {corridor.from} → {corridor.to}
                    </span>
                    {corridor.popular && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{t('popular')}</span>}
                  </div>
                  <p className="text-xs text-gray-600">{corridor.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Calculateur rapide */}
        <section className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-600" />
            {t('quickCalc')}
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('amount')}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100"
              />
            </div>
            
            <div className="text-2xl font-bold text-gray-600">
              {selectedCorridor.split('-')[0]}
            </div>
            
            <div className="text-2xl text-gray-400">→</div>
            
            <div className="text-2xl font-bold text-green-600">
              {selectedCorridor.split('-')[1]}
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600 mb-1">
                {language === 'fr' ? 'Estimation meilleur service' : 'Best service estimate'}
              </div>
              <div className="text-lg font-bold text-green-800">
                {(amount * (exchangeRates[selectedCorridor] || 1) * 0.999).toLocaleString()} {selectedCorridor.split('-')[1]}
              </div>
            </div>
          </div>
        </section>

        {/* Tableau de comparaison des services */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            {t('comparison')} - {amount} {selectedCorridor.split('-')[0]}
            <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
              {currentServices.length} services disponibles
            </span>
          </h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-6">
              {currentServices.map((service, index) => (
                <div
                  key={service.name}
                  className={`relative border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
                    index === 0 ? 'border-green-400 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  {index === 0 && (
                    <div className="absolute -top-3 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {t('bestChoice')}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${service.color}`}></div>
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('fees')}:</span>
                      <span className="font-medium">{service.fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('rate')}:</span>
                      <span className="font-medium">{service.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('time')}:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.time}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>{t('total')}:</span>
                      <span className="text-green-600">
                        {(amount * parseFloat(service.total)).toLocaleString()} {selectedCorridor.split('-')[1]}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleServiceClick(service.name, service.affiliate)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                      index === 0
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('send')} {language === 'fr' ? 'avec' : 'with'} {service.name}
                  </button>
                </div>
              ))}
            </div>
            
            {/* Message d'encouragement */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 border-t">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {language === 'fr' 
                    ? '💡 Plus de choix = Plus d\'économies !' 
                    : '💡 More choices = More savings!'
                  }
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'fr' 
                    ? 'Nous comparons tous les services pour vous faire économiser sur chaque transfert'
                    : 'We compare all services to help you save on every transfer'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Alertes Email */}
        <section className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <Bell className="w-6 h-6 text-blue-600" />
              {language === 'fr' ? '🔔 Alertes Taux Avantageux' : '🔔 Favorable Rate Alerts'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'fr' 
                ? 'Ne ratez plus jamais une bonne opportunité ! Recevez un email dès qu\'un taux exceptionnel est disponible pour votre corridor.'
                : 'Never miss a great opportunity again ! Get an email as soon as an exceptional rate is available for your corridor.'
              }
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <AlertForm 
              currentBestRate={exchangeRates[selectedCorridor] || 1}
              amount={amount}
              from={selectedCorridor.split('-')[0]}
              to={selectedCorridor.split('-')[1]}
            />
          </div>
          
          {/* Statistiques des alertes */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">24/7</div>
              <div className="text-blue-700 font-medium">
                {language === 'fr' ? 'Surveillance continue' : 'Continuous monitoring'}
              </div>
              <div className="text-sm text-blue-600 mt-1">
                {language === 'fr' ? 'Tous les corridors' : 'All corridors'}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-800 mb-2">⚡</div>
              <div className="text-green-700 font-medium">
                {language === 'fr' ? 'Alertes instantanées' : 'Instant alerts'}
              </div>
              <div className="text-sm text-green-600 mt-1">
                {language === 'fr' ? 'Email immédiat' : 'Immediate email'}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-800 mb-2">🎯</div>
              <div className="text-purple-700 font-medium">
                {language === 'fr' ? 'Alertes personnalisées' : 'Personalized alerts'}
              </div>
              <div className="text-sm text-purple-600 mt-1">
                {language === 'fr' ? 'Vos critères' : 'Your criteria'}
              </div>
            </div>
          </div>
        </section>

        {/* Convertisseur universel */}
        <section className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-600" />
            {t('converter')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Montant' : 'Amount'}
              </label>
              <input
                type="number"
                value={convertAmount}
                onChange={(e) => setConvertAmount(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('from')}
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(currencies).map(([code, currency]) => (
                  <option key={code} value={code}>
                    {currency.flag} {code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('to')}
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(currencies).map(([code, currency]) => (
                  <option key={code} value={code}>
                    {currency.flag} {code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-800 mb-2">
                {convertAmount.toLocaleString()} {fromCurrency} = {(convertAmount * conversionRate).toLocaleString()} {toCurrency}
              </div>
              <div className="text-sm text-purple-600">
                {language === 'fr' ? 'Taux' : 'Rate'}: 1 {fromCurrency} = {conversionRate.toLocaleString()} {toCurrency}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {language === 'fr' ? 'Taux indicatif - Vérifiez auprès du prestataire pour le taux final' : 'Indicative rate - Check with provider for final rate'}
              </div>
            </div>
          </div>
        </section>

        {/* Articles SEO */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            {t('seoArticles')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seoArticles.map((article, index) => (
              <article
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleArticleClick(article.title)}
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white bg-opacity-90 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      📚 {article.readTime}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-900 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors">
                    {t('readMore')}
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            {t('saveUp')}
          </h2>
          <p className="text-lg mb-6 opacity-90">
            {language === 'fr' 
              ? 'Comparez 12+ services en temps réel et choisissez le meilleur pour votre transfert vers l\'Afrique de l\'Ouest.'
              : 'Compare 12+ services in real time and choose the best for your transfer to West Africa.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t('startNow')}
            </button>
            <button 
              onClick={() => handleArticleClick('Guide complet')}
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              {t('completeGuide')}
            </button>
          </div>
        </section>

        {/* Trust indicators */}
        <section className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {language === 'fr' ? '🛡️ Pourquoi nous faire confiance ?' : '🛡️ Why trust us?'}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">
                {language === 'fr' ? '100% Sécurisé' : '100% Secure'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'fr' 
                  ? 'Nous ne traitons aucune transaction. Vous êtes redirigé vers les plateformes officielles.'
                  : 'We do not process any transactions. You are redirected to official platforms.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">
                {language === 'fr' ? 'Comparaison Instantanée' : 'Instant Comparison'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'fr' 
                  ? 'Taux mis à jour en temps réel pour une comparaison précise et actuelle.'
                  : 'Real-time updated rates for accurate and current comparison.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">
                {language === 'fr' ? 'Services Vérifiés' : 'Verified Services'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'fr' 
                  ? 'Tous les services listés sont régulés et ont fait leurs preuves sur le marché.'
                  : 'All listed services are regulated and have proven themselves in the market.'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Pays d'Afrique de l'Ouest couverts */}
        <section className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            {language === 'fr' ? '🌍 Pays d\'Afrique de l\'Ouest couverts' : '🌍 West African countries covered'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-medium">🇸🇳 Sénégal</div>
              <div className="text-sm text-gray-600">XOF - Franc CFA</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-medium">🇳🇬 Nigeria</div>
              <div className="text-sm text-gray-600">NGN - Naira</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-medium">🇬🇭 Ghana</div>
              <div className="text-sm text-gray-600">GHS - Cedi</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-medium">🇬🇲 Gambie</div>
              <div className="text-sm text-gray-600">GMD - Dalasi</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-medium">🇲🇱 Mali</div>
              <div className="text-sm text-gray-600">XOF - Franc CFA</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-medium">🇧🇫 Burkina Faso</div>
              <div className="text-sm text-gray-600">XOF - Franc CFA</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-medium">🇨🇮 Côte d'Ivoire</div>
              <div className="text-sm text-gray-600">XOF - Franc CFA</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-medium">🇬🇳 Guinée</div>
              <div className="text-sm text-gray-600">GNF - Franc guinéen</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-medium">🇱🇷 Liberia</div>
              <div className="text-sm text-gray-600">LRD - Dollar libérien</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-medium">🇸🇱 Sierra Leone</div>
              <div className="text-sm text-gray-600">SLL - Leone</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-medium">🇨🇻 Cap-Vert</div>
              <div className="text-sm text-gray-600">CVE - Escudo</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-medium">🇲🇦 Maroc</div>
              <div className="text-sm text-gray-600">MAD - Dirham</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">BestRatesAfrica</h3>
              <p className="text-gray-400 text-sm">
                {language === 'fr' 
                  ? 'Votre comparateur de référence pour les transferts d\'argent vers l\'Afrique de l\'Ouest + Maroc. Plus de 12 services comparés.'
                  : 'Your reference comparator for money transfers to West Africa + Morocco. 12+ services compared.'
                }
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'fr' ? 'Services Populaires' : 'Popular Services'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://sendwave.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sendwave (Sans frais)</a></li>
                <li><a href="https://wise.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Wise</a></li>
                <li><a href="https://remitly.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Remitly</a></li>
                <li><a href="https://worldremit.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WorldRemit</a></li>
                <li><a href="https://westernunion.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Western Union</a></li>
                <li><a href="https://moneygram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">MoneyGram</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'fr' ? 'Corridors Populaires' : 'Popular Corridors'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setSelectedCorridor('EUR-XOF')} className="hover:text-white transition-colors text-left">
                  {language === 'fr' ? 'Europe → Sénégal/Mali' : 'Europe → Senegal/Mali'}
                </button></li>
                <li><button onClick={() => setSelectedCorridor('USD-NGN')} className="hover:text-white transition-colors text-left">
                  USA → Nigeria
                </button></li>
                <li><button onClick={() => setSelectedCorridor('GBP-GHS')} className="hover:text-white transition-colors text-left">
                  UK → Ghana
                </button></li>
                <li><button onClick={() => setSelectedCorridor('GBP-GMD')} className="hover:text-white transition-colors text-left">
                  UK → {language === 'fr' ? 'Gambie' : 'Gambia'}
                </button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'fr' ? 'Ressources' : 'Resources'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => handleArticleClick('Guides de transfert')} className="hover:text-white transition-colors text-left">
                  {language === 'fr' ? 'Guides de transfert' : 'Transfer guides'}
                </button></li>
                <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-white transition-colors text-left">
                  {language === 'fr' ? 'Taux de change' : 'Exchange rates'}
                </button></li>
                <li><button onClick={() => handleArticleClick('Actualités')} className="hover:text-white transition-colors text-left">
                  {language === 'fr' ? 'Actualités' : 'News'}
                </button></li>
                <li><button onClick={() => alert('Support: contact@bestratesafrica.com')} className="hover:text-white transition-colors text-left">
                  Support
                </button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 BestRatesAfrica. {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}. | 
              <button onClick={() => alert('Mentions légales en cours de rédaction')} className="hover:text-white ml-2">
                {language === 'fr' ? 'Mentions légales' : 'Legal notices'}
              </button> | 
              <button onClick={() => alert('Politique de confidentialité en cours de rédaction')} className="hover:text-white ml-2">
                {language === 'fr' ? 'Politique de confidentialité' : 'Privacy policy'}
              </button>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}