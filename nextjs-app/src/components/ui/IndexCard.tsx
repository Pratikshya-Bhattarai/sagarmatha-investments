'use client';

import { NEPSEIndicesData } from '@/lib/api';

interface IndexCardProps {
  index: NEPSEIndicesData;
}

export default function IndexCard({ index }: IndexCardProps) {
  const isPositive = index.change_percent >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const bgColor = isPositive ? 'bg-green-50' : 'bg-red-50';
  const borderColor = isPositive ? 'border-green-200' : 'border-red-200';

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${borderColor} p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{index.name}</h3>
          <p className="text-sm text-gray-600">{index.symbol}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${changeColor}`}>
          {isPositive ? '↗' : '↘'} {Math.abs(index.change_percent).toFixed(2)}%
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Current Value</span>
          <span className="text-xl font-bold text-gray-900">
            {index.current_value?.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Change</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${changeColor}`}>
              {isPositive ? '+' : ''}{index.change_amount?.toFixed(2)}
            </span>
            <span className={`text-sm font-medium ${changeColor}`}>
              ({isPositive ? '+' : ''}{index.change_percent?.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">52W High</span>
          <span className="text-sm font-medium text-green-600">
            {index.high_52w?.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">52W Low</span>
          <span className="text-sm font-medium text-red-600">
            {index.low_52w?.toFixed(2)}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Updated: {new Date(index.updated_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
