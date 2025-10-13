import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function AdditionalServicesSection() {
  const additionalServices = [
    {
      title: "Investor Education & Training",
      description: "Free/paid workshops, online tutorials, and step-by-step guides for beginners."
    },
    {
      title: "Customer Support Enhancements",
      description: "Dedicated Relationship Managers, 24/7 helpline, WhatsApp support, and chatbot integration."
    },
    {
      title: "Digital Tools & Insights",
      description: "Smart trading app with real-time NEPSE data, stock screeners, alerts, and AI-driven advisory."
    },
    {
      title: "Financial Products Beyond Stocks",
      description: "Mutual funds, ETFs, debentures, government bonds, and insurance brokerage."
    },
    {
      title: "Premium / VIP Services",
      description: "Portfolio Management, wealth advisory, and corporate investment solutions."
    },
    {
      title: "Value-Added Perks",
      description: "Referral bonuses, loyalty rewards, festival offers, and free IPO alerts with auto-application."
    },
    {
      title: "Sagarmatha Customer-Centric Features",
      description: "Smart Trading App, daily market reports, Investor Academy, dedicated advisors, diversified options, and loyalty benefits."
    }
  ]

  return (
    <section 
      id="additional-services" 
      className="py-16 px-4 scroll-mt-20"
      aria-labelledby="additional-title"
    >
      <div className="max-w-6xl mx-auto">
        <Card className="bg-section-bg backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 
              id="additional-title"
              className="text-2xl sm:text-3xl font-bold text-blue-600 mb-8 uppercase tracking-wider"
            >
              Additional Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {additionalServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-card-bg border border-slate-200/25 p-6 rounded-xl shadow-elevation hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-text leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Image
                src="/images/benifits.png"
                alt="Investor education and value-added benefits"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <p className="text-sm text-text-muted mt-2 text-center">
                Value-packed services for every investor
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

