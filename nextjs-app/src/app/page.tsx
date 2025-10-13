import { Navbar } from "@/components/layout/navbar"
import { Hero } from "@/components/layout/hero"
import { Footer } from "@/components/layout/footer"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AdditionalServicesSection } from "@/components/sections/additional-services-section"
import { ChartsSection } from "@/components/sections/charts-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { FAQSection } from "@/components/sections/faq-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      
      <Navbar />
      <Hero />
      
      <main id="main" className="relative">
        <AboutSection />
        <ServicesSection />
        <AdditionalServicesSection />
        <ChartsSection />
        
        {/* NEPSE Data Section - Simple Version */}
        <section style={{ padding: '40px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
              NEPSE Live Market Data
            </h2>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Market Indices</h3>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '200px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
                  <h4>NEPSE Index</h4>
                  <div style={{ fontSize: '28px', fontWeight: 'bold' }}>2,847.23</div>
                  <div style={{ color: 'green' }}>+0.54% (+15.40)</div>
                </div>
                <div style={{ flex: '1', minWidth: '200px', padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
                  <h4>Sensitive Index</h4>
                  <div style={{ fontSize: '28px', fontWeight: 'bold' }}>567.89</div>
                  <div style={{ color: 'green' }}>+1.47% (+8.25)</div>
                </div>
                <div style={{ flex: '1', minWidth: '200px', padding: '20px', backgroundColor: '#faf5ff', borderRadius: '8px' }}>
                  <h4>Float Index</h4>
                  <div style={{ fontSize: '28px', fontWeight: 'bold' }}>198.45</div>
                  <div style={{ color: 'green' }}>+1.09% (+2.15)</div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Top Stocks</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Symbol</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Company</th>
                    <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Price</th>
                    <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>NICL</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Nepal Investment Bank Limited</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right', fontWeight: 'bold' }}>Rs. 450.50</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right', color: 'green', fontWeight: 'bold' }}>+2.8%</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>NABIL</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Nabil Bank Limited</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right', fontWeight: 'bold' }}>Rs. 520.75</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right', color: 'red', fontWeight: 'bold' }}>-1.6%</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>SCB</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Standard Chartered Bank Nepal Limited</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right', fontWeight: 'bold' }}>Rs. 380.25</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right', color: 'green', fontWeight: 'bold' }}>+1.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Market Summary</h3>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>+0.54%</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>NEPSE Index</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'blue' }}>5</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Active Stocks</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'purple' }}>Rs. 1.95B</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Total Turnover</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'orange' }}>560K</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Total Volume</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}
