import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ContactSection } from "@/components/sections/contact-section"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-text">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      
      <Navbar />
      
      <main id="main" className="relative pt-16">
        <ContactSection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}
