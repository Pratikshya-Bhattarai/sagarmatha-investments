import React from 'react';
import NEPSESimpleData from '@/components/charts/nepse-simple-data';

export default function NEPSESimplePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NEPSE Market Data
          </h1>
          <p className="text-lg text-gray-600">
            Live stock market data from Nepal Stock Exchange with interactive charts and market analysis.
          </p>
        </div>
        
        <NEPSESimpleData />
      </div>
    </div>
  );
}