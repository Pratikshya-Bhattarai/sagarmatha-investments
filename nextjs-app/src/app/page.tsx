import { Navbar } from "@/components/layout/navbar"
import { Hero } from "@/components/layout/hero"
import { Footer } from "@/components/layout/footer"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AdditionalServicesSection } from "@/components/sections/additional-services-section"
import { ChartsSection } from "@/components/sections/charts-section"
import NEPSEChartsSection from "@/components/sections/nepse-charts-section"
import MarketOverview from "@/components/sections/market-overview"
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
        <MarketOverview />
        <NEPSEChartsSection />
        
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}
