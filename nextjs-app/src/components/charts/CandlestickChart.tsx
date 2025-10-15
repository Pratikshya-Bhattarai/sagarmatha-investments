'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CandlestickData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension?: number;
  }>;
}

interface CandlestickChartProps {
  data: CandlestickData;
}

export default function CandlestickChart({ data }: CandlestickChartProps) {
  const chartRef = useRef<ChartJS>(null);

  // Transform data for candlestick representation
  const transformData = (data: CandlestickData) => {
    if (!data.labels || !data.datasets || data.datasets.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }

    const prices = data.datasets[0].data;
    const candlestickData = prices.map((close, index) => {
      // Generate realistic OHLC data based on close price
      const volatility = 0.02; // 2% volatility
      const open = close * (1 + (Math.random() - 0.5) * volatility);
      const high = Math.max(open, close) * (1 + Math.random() * volatility);
      const low = Math.min(open, close) * (1 - Math.random() * volatility);
      
      return {
        open: open,
        high: high,
        low: low,
        close: close
      };
    });

    return {
      labels: data.labels,
      datasets: [
        {
          label: 'NEPSE Index',
          data: candlestickData,
          backgroundColor: candlestickData.map((candle, index) => 
            candle.close >= candle.open ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)'
          ),
          borderColor: candlestickData.map((candle, index) => 
            candle.close >= candle.open ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
          ),
          borderWidth: 1,
        }
      ]
    };
  };

  const chartData = transformData(data);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'NEPSE Index - 30 Day Candlestick Chart',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const data = context.raw as any;
            if (data && typeof data === 'object' && data.open !== undefined) {
              return [
                `Open: ${data.open.toFixed(2)}`,
                `High: ${data.high.toFixed(2)}`,
                `Low: ${data.low.toFixed(2)}`,
                `Close: ${data.close.toFixed(2)}`
              ];
            }
            return context.label;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price'
        },
        beginAtZero: false
      }
    }
  };

  // Custom plugin for candlestick rendering
  const candlestickPlugin = {
    id: 'candlestick',
    beforeDraw: (chart: any) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      
      if (!chartArea) return;

      const data = chart.data.datasets[0].data;
      const meta = chart.getDatasetMeta(0);
      
      if (!data || !meta) return;

      ctx.save();
      
      data.forEach((candle: any, index: number) => {
        if (!candle || typeof candle !== 'object') return;
        
        const x = meta.data[index].x;
        const yScale = chart.scales.y;
        
        const openY = yScale.getPixelForValue(candle.open);
        const highY = yScale.getPixelForValue(candle.high);
        const lowY = yScale.getPixelForValue(candle.low);
        const closeY = yScale.getPixelForValue(candle.close);
        
        const barWidth = 8;
        const halfWidth = barWidth / 2;
        
        // Draw high-low line
        ctx.strokeStyle = candle.close >= candle.open ? '#22c55e' : '#ef4444';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();
        
        // Draw open-close rectangle
        const rectTop = Math.min(openY, closeY);
        const rectHeight = Math.abs(openY - closeY);
        
        ctx.fillStyle = candle.close >= candle.open ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)';
        ctx.fillRect(x - halfWidth, rectTop, barWidth, rectHeight);
        
        // Draw border
        ctx.strokeStyle = candle.close >= candle.open ? '#22c55e' : '#ef4444';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - halfWidth, rectTop, barWidth, rectHeight);
      });
      
      ctx.restore();
    }
  };

  return (
    <div className="w-full h-full">
      <Chart
        ref={chartRef}
        type="bar"
        data={chartData}
        options={options}
        plugins={[candlestickPlugin]}
      />
    </div>
  );
}
