import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { AboutSection } from "@/components/sections/about-section"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

export default function About() {
  return (
    <div className="min-h-screen bg-background text-text">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      
      <Navbar />
      
      <main id="main" className="relative pt-16">
        <AboutSection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}
