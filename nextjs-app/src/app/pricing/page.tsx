import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { PricingSection } from "@/components/sections/pricing-section"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background text-text">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      
      <Navbar />
      
      <main id="main" className="relative pt-16">
        <PricingSection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}
