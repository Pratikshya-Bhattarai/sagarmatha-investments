import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function ServicesSection() {
  const services = [
    {
      title: "Stock Trading (Equity Delivery & Intraday)",
      description: "Buying & selling company shares on NEPSE or other markets. Intraday trading for quick profits or long-term delivery trades."
    },
    {
      title: "IPO / FPO Application Handling",
      description: "Easy online application for Initial Public Offerings and Further Public Offerings. Support with ASBA & CDSC accounts."
    },
    {
      title: "Portfolio Management Services (PMS)",
      description: "Expert-managed investment portfolio based on risk appetite. Diversification across stocks, mutual funds, bonds."
    },
    {
      title: "Mutual Funds & Bonds Trading",
      description: "Access to government bonds, debentures, and mutual funds."
    },
    {
      title: "Research & Advisory",
      description: "Market insights, stock analysis, buy/sell recommendations."
    },
    {
      title: "Online Trading Platforms",
      description: "Mobile & web apps for trading convenience with real-time market data & charts."
    },
    {
      title: "Demat & MeroShare Support",
      description: "Demat account opening & management. Assistance with share transfers, pledging, or dematerialization."
    }
  ]

  return (
    <section 
      id="services" 
      className="py-16 px-4 scroll-mt-20"
      aria-labelledby="services-title"
    >
      <div className="max-w-6xl mx-auto">
        <Card className="bg-section-bg backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 
              id="services-title"
              className="text-2xl sm:text-3xl font-bold text-blue-600 mb-8 uppercase tracking-wider"
            >
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {services.map((service, index) => (
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
                src="/images/services.png"
                alt="Overview of trading and advisory services"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <p className="text-sm text-text-muted mt-2 text-center">
                Full-service brokerage and advisory
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

