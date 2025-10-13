export default function NEPSEPage() {
  return (
    <div>
      <h1>NEPSE Live Data</h1>
      <h2>Market Indices</h2>
      <div>
        <h3>NEPSE Index: 2,847.23 (+0.54%)</h3>
        <h3>Sensitive Index: 567.89 (+1.47%)</h3>
        <h3>Float Index: 198.45 (+1.09%)</h3>
      </div>
      <h2>Top Stocks</h2>
      <table>
        <tr>
          <th>Symbol</th>
          <th>Company</th>
          <th>Price</th>
          <th>Change</th>
        </tr>
        <tr>
          <td>NICL</td>
          <td>Nepal Investment Bank Limited</td>
          <td>Rs. 450.50</td>
          <td>+2.8%</td>
        </tr>
        <tr>
          <td>NABIL</td>
          <td>Nabil Bank Limited</td>
          <td>Rs. 520.75</td>
          <td>-1.6%</td>
        </tr>
        <tr>
          <td>SCB</td>
          <td>Standard Chartered Bank Nepal Limited</td>
          <td>Rs. 380.25</td>
          <td>+1.5%</td>
        </tr>
      </table>
    </div>
  )
}