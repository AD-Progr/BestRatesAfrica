'use client';

import React, { useState } from 'react';
import { Bell, Mail, Target, CheckCircle } from 'lucide-react';

interface AlertFormProps {
  currentBestRate?: number;
  amount: number;
  from: string;
  to: string;
}

export default function AlertForm({ currentBestRate = 655, amount, from, to }: AlertFormProps) {
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
        
        // Reset du formulaire après 3 secondes
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

        {/* Service préféré (optionnel) */}
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
            <option value="Wise">Wise</option>
            <option value="Remitly">Remitly</option>
            <option value="WorldRemit">WorldRemit</option>
            <option value="Sendwave">Sendwave</option>
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