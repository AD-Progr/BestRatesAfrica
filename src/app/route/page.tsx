'use client';

import React from 'react';
import Link from 'next/link';

export default function RoutePage() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          BestRates Africa
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Nous avons créé une nouvelle version du site. Cliquez ci-dessous pour y accéder.
        </p>
        <div className="flex justify-center">
          <Link 
            href="/home" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Accéder au site
          </Link>
        </div>
      </div>
    </div>
  );
}