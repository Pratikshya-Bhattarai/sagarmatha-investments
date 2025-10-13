"use client"

import React, { useEffect, useRef } from 'react'

interface TradingViewWidgetProps {
  symbol?: string
  interval?: string
  theme?: 'light' | 'dark'
  autosize?: boolean
  height?: number
  width?: number
  className?: string
}

export function TradingViewWidget({ 
  symbol = "AAPL",
  interval = "D",
  theme = "light",
  autosize = true,
  height = 400,
  width = 800,
  className = ""
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear previous content
    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize,
      symbol: symbol,
      interval: interval,
      timezone: "Etc/UTC",
      theme: theme,
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      container_id: `tradingview_${Math.random().toString(36).substr(2, 9)}`,
      studies: [
        "RSI@tv-basicstudies",
        "MACD@tv-basicstudies"
      ],
      hide_volume: false,
      support_host: "https://www.tradingview.com"
    })

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [symbol, interval, theme, autosize])

  return (
    <div 
      ref={containerRef}
      className={`tradingview-widget-container ${className}`}
      style={{ 
        height: autosize ? '100%' : `${height}px`,
        width: autosize ? '100%' : `${width}px`
      }}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}

// Mini chart component for smaller displays
export function TradingViewMiniChart({ 
  symbol = "AAPL",
  theme = "light",
  className = ""
}: { symbol?: string; theme?: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: "100%",
      height: "100%",
      locale: "en",
      dateRange: "12M",
      colorTheme: theme,
      isTransparent: false,
      autosize: true,
      largeChartUrl: ""
    })

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [symbol, theme])

  return (
    <div 
      ref={containerRef}
      className={`tradingview-widget-container ${className}`}
      style={{ height: '300px', width: '100%' }}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}

// Market overview widget
export function TradingViewMarketOverview({ 
  theme = "light",
  className = ""
}: { theme?: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      colorTheme: theme,
      dateRange: "12M",
      showChart: true,
      locale: "en",
      width: "100%",
      height: "100%",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      plotLineColorGrowing: "rgba(41, 98, 255, 1)",
      plotLineColorFalling: "rgba(41, 98, 255, 1)",
      gridLineColor: "rgba(240, 243, 250, 0)",
      scaleFontColor: "rgba(120, 123, 134, 1)",
      belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
      belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
      tabs: [
        {
          title: "Indices",
          symbols: [
            {
              s: "FOREXCOM:SPXUSD",
              d: "S&P 500"
            },
            {
              s: "FOREXCOM:NSXUSD",
              d: "US 100"
            },
            {
              s: "FOREXCOM:DJIUSD",
              d: "Dow 30"
            },
            {
              s: "INDEX:NKY",
              d: "Nikkei 225"
            },
            {
              s: "INDEX:DEU40",
              d: "DAX Index"
            },
            {
              s: "FOREXCOM:UKXGBP",
              d: "UK 100"
            }
          ],
          originalTitle: "Indices"
        },
        {
          title: "Futures",
          symbols: [
            {
              s: "CME_MINI:ES1!",
              d: "S&P 500"
            },
            {
              s: "CME:6E1!",
              d: "Euro"
            },
            {
              s: "COMEX:GC1!",
              d: "Gold"
            },
            {
              s: "NYMEX:CL1!",
              d: "Crude Oil"
            },
            {
              s: "NYMEX:NG1!",
              d: "Natural Gas"
            },
            {
              s: "CBOT:ZC1!",
              d: "Corn"
            }
          ],
          originalTitle: "Futures"
        },
        {
          title: "Bonds",
          symbols: [
            {
              s: "CME:GE1!",
              d: "Eurodollar"
            },
            {
              s: "CBOT:ZB1!",
              d: "T-Bond"
            },
            {
              s: "CBOT:UB1!",
              d: "Ultra T-Bond"
            },
            {
              s: "EUREX:FGBL1!",
              d: "Euro Bund"
            },
            {
              s: "EUREX:FBTP1!",
              d: "Euro BTP"
            },
            {
              s: "EUREX:FGBM1!",
              d: "Euro BOBL"
            }
          ],
          originalTitle: "Bonds"
        },
        {
          title: "Forex",
          symbols: [
            {
              s: "FX:EURUSD",
              d: "EUR/USD"
            },
            {
              s: "FX:GBPUSD",
              d: "GBP/USD"
            },
            {
              s: "FX:USDJPY",
              d: "USD/JPY"
            },
            {
              s: "FX:USDCHF",
              d: "USD/CHF"
            },
            {
              s: "FX:AUDUSD",
              d: "AUD/USD"
            },
            {
              s: "FX:USDCAD",
              d: "USD/CAD"
            }
          ],
          originalTitle: "Forex"
        }
      ]
    })

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [theme])

  return (
    <div 
      ref={containerRef}
      className={`tradingview-widget-container ${className}`}
      style={{ height: '600px', width: '100%' }}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}
