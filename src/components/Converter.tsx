'use client';
import { useState, useEffect } from 'react';

type CurrencyMap = { [key: string]: { description: string } };

export default function Converter() {
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('XOF');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState<CurrencyMap>({});

  // Charger la liste des devises depuis open.er-api.com (pas besoin de clé)
  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((res) => res.json())
      .then((data) => {
        const currencyList = Object.keys(data.rates).reduce((acc, code) => {
          acc[code] = { description: code };
          return acc;
        }, {} as CurrencyMap);
        setCurrencies(currencyList);
      })
      .catch((err) => {
        console.error('Erreur chargement devises', err);
        setCurrencies({});
      });
  }, []);

  // Calcul du taux
  useEffect(() => {
    if (fromCurrency && toCurrency && amount > 0) {
      setLoading(true);
      fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
        .then((res) => res.json())
        .then((data) => {
          const rate = data.rates[toCurrency];
          if (rate) {
            setResult(rate * amount);
          } else {
            setResult(null);
          }
        })
        .catch(() => setResult(null))
        .finally(() => setLoading(false));
    }
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="p-4 bg-white rounded shadow-md w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Convertisseur universel / Universal Converter</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Montant / Amount :</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">De / From :</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {Object.entries(currencies).map(([code, { description }]) => (
              <option key={code} value={code}>
                {code} - {description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">À / To :</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {Object.entries(currencies).map(([code, { description }]) => (
              <option key={code} value={code}>
                {code} - {description}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center mt-6">
        {loading ? (
          <p>Chargement / Loading...</p>
        ) : typeof result === 'number' ? (
          <p className="text-lg font-semibold">
            Résultat : {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
          </p>
        ) : (
          <p className="text-red-500">Conversion non disponible</p>
        )}
      </div>
    </div>
  );
}
