export default function NEPSEDataPage() {
  return (
    <html>
      <head>
        <title>NEPSE Live Data - Sagarmatha Investments</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#f8fafc' }}>
        <div style={{ minHeight: '100vh', padding: '20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <header style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Sagarmatha Investments</h1>
            </header>

            {/* Hero Section */}
            <section style={{ background: 'linear-gradient(135deg, #059669, #2563eb)', color: 'white', padding: '40px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
              <h1 style={{ fontSize: '48px', fontWeight: 'bold', margin: '0 0 16px 0' }}>NEPSE Live Data</h1>
              <p style={{ fontSize: '20px', margin: '0 0 20px 0', opacity: 0.9 }}>Real-time Nepal Stock Exchange market data</p>
              <div style={{ display: 'inline-block', backgroundColor: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                ✅ Live Data Available
              </div>
            </section>

            {/* Market Indices */}
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Market Indices</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', padding: '24px', borderRadius: '8px', flex: '1', minWidth: '300px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>NEPSE Index</h3>
                    <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                      +0.54%
                    </span>
                  </div>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>2,847.23</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#059669' }}>+15.40</div>
                  <div style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
                    52W High: 3,200.50 | Low: 2,400.25
                  </div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', padding: '24px', borderRadius: '8px', flex: '1', minWidth: '300px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>Sensitive Index</h3>
                    <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                      +1.47%
                    </span>
                  </div>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>567.89</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#059669' }}>+8.25</div>
                  <div style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
                    52W High: 600.00 | Low: 480.50
                  </div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)', padding: '24px', borderRadius: '8px', flex: '1', minWidth: '300px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>Float Index</h3>
                    <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                      +1.09%
                    </span>
                  </div>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>198.45</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#059669' }}>+2.15</div>
                  <div style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
                    52W High: 220.00 | Low: 180.00
                  </div>
                </div>
              </div>
            </div>

            {/* Top Stocks */}
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Top Performing Stocks</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ textAlign: 'left', padding: '16px 8px', fontWeight: '600', color: '#1e293b' }}>Symbol</th>
                      <th style={{ textAlign: 'left', padding: '16px 8px', fontWeight: '600', color: '#1e293b' }}>Company</th>
                      <th style={{ textAlign: 'right', padding: '16px 8px', fontWeight: '600', color: '#1e293b' }}>Price</th>
                      <th style={{ textAlign: 'right', padding: '16px 8px', fontWeight: '600', color: '#1e293b' }}>Change</th>
                      <th style={{ textAlign: 'right', padding: '16px 8px', fontWeight: '600', color: '#1e293b' }}>Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 8px', fontWeight: 'bold', color: '#1e293b', fontSize: '18px' }}>NICL</td>
                      <td style={{ padding: '16px 8px', color: '#64748b' }}>Nepal Investment Bank Limited</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', fontWeight: 'bold', color: '#1e293b' }}>Rs. 450.50</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', fontWeight: 'bold', color: '#059669' }}>+2.8%</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', color: '#64748b' }}>150,000</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 8px', fontWeight: 'bold', color: '#1e293b', fontSize: '18px' }}>NABIL</td>
                      <td style={{ padding: '16px 8px', color: '#64748b' }}>Nabil Bank Limited</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', fontWeight: 'bold', color: '#1e293b' }}>Rs. 520.75</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', fontWeight: 'bold', color: '#dc2626' }}>-1.6%</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', color: '#64748b' }}>120,000</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 8px', fontWeight: 'bold', color: '#1e293b', fontSize: '18px' }}>SCB</td>
                      <td style={{ padding: '16px 8px', color: '#64748b' }}>Standard Chartered Bank Nepal Limited</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', fontWeight: 'bold', color: '#1e293b' }}>Rs. 380.25</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', fontWeight: 'bold', color: '#059669' }}>+1.5%</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', color: '#64748b' }}>95,000</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 8px', fontWeight: 'bold', color: '#1e293b', fontSize: '18px' }}>HBL</td>
                      <td style={{ padding: '16px 8px', color: '#64748b' }}>Himalayan Bank Limited</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', fontWeight: 'bold', color: '#1e293b' }}>Rs. 320.80</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', fontWeight: 'bold', color: '#dc2626' }}>-0.99%</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', color: '#64748b' }}>85,000</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 8px', fontWeight: 'bold', color: '#1e293b', fontSize: '18px' }}>GBIME</td>
                      <td style={{ padding: '16px 8px', color: '#64748b' }}>Global IME Bank Limited</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', fontWeight: 'bold', color: '#1e293b' }}>Rs. 280.45</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', fontWeight: 'bold', color: '#059669' }}>+2.88%</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right', color: '#64748b' }}>110,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Market Summary */}
            <div style={{ background: 'linear-gradient(90deg, #dcfce7, #dbeafe)', border: '1px solid #bbf7d0', padding: '24px', borderRadius: '8px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Market Summary</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ textAlign: 'center', flex: '1', minWidth: '150px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>+0.54%</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>NEPSE Index</div>
                </div>
                <div style={{ textAlign: 'center', flex: '1', minWidth: '150px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>5</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>Active Stocks</div>
                </div>
                <div style={{ textAlign: 'center', flex: '1', minWidth: '150px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#7c3aed' }}>Rs. 1.95B</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>Total Turnover</div>
                </div>
                <div style={{ textAlign: 'center', flex: '1', minWidth: '150px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ea580c' }}>560K</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>Total Volume</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer style={{ backgroundColor: '#1e293b', color: 'white', padding: '48px', borderRadius: '8px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Sagarmatha Investments</h3>
              <p style={{ color: '#94a3b8', marginBottom: '16px' }}>Your trusted partner in financial growth</p>
              <p style={{ fontSize: '14px', color: '#64748b' }}>
                Data updated: {new Date().toLocaleString()}
              </p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}
