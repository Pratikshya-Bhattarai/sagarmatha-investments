import React from 'react';
import NEPSELiveData from '@/components/charts/nepse-live-data';

export default function NEPSELivePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Live NEPSE Market Data
          </h1>
          <p className="text-lg text-gray-600">
            Real-time stock market data from Nepal Stock Exchange with interactive charts and comprehensive market analysis.
          </p>
        </div>
        
        <NEPSELiveData />
      </div>
    </div>
  );
}
