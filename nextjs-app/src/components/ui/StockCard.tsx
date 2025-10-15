'use client';

import { NEPSEStockData } from '@/lib/api';

interface StockCardProps {
  stock: NEPSEStockData;
}

export default function StockCard({ stock }: StockCardProps) {
  const isPositive = stock.change_percent >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const bgColor = isPositive ? 'bg-green-50' : 'bg-red-50';
  const borderColor = isPositive ? 'border-green-200' : 'border-red-200';

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${borderColor} p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{stock.symbol}</h3>
          <p className="text-sm text-gray-600 truncate">{stock.company_name}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${changeColor}`}>
          {stock.sector}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Current Price</span>
          <span className="text-lg font-bold text-gray-900">
            ₹{stock.current_price?.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Change</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${changeColor}`}>
              {isPositive ? '+' : ''}{stock.change?.toFixed(2)}
            </span>
            <span className={`text-sm font-medium ${changeColor}`}>
              ({isPositive ? '+' : ''}{stock.change_percent?.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Volume</span>
          <span className="text-sm font-medium text-gray-900">
            {stock.volume?.toLocaleString()}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">52W High/Low</span>
          <div className="text-sm text-gray-900">
            <span className="text-green-600">{stock.high_52w?.toFixed(2)}</span>
            <span className="mx-1">/</span>
            <span className="text-red-600">{stock.low_52w?.toFixed(2)}</span>
          </div>
        </div>
        
        {stock.pe_ratio && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">P/E Ratio</span>
            <span className="text-sm font-medium text-gray-900">
              {stock.pe_ratio.toFixed(2)}
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Last trade: {new Date(stock.last_trade_time).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
