import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function PricingSection() {
  const pricingItems = [
    {
      title: "Brokerage Commission",
      description: "0.27% – 0.40% (based on transaction volume)"
    },
    {
      title: "Account Setup",
      description: "Rs. 100 one-time + Rs. 100 yearly maintenance"
    },
    {
      title: "Trading Platform",
      description: "Free mobile & web access"
    },
    {
      title: "Advisory & Research",
      description: "Free daily updates + premium research packages"
    }
  ]

  const commissionStructure = [
    { range: "Up to Rs. 50,000", rate: "0.40% commission" },
    { range: "Rs. 50,001 – 500,000", rate: "0.37% commission" },
    { range: "Rs. 500,001 – 2,000,000", rate: "0.34% commission" },
    { range: "Rs. 2,000,001 – 10,000,000", rate: "0.30% commission" },
    { range: "Above Rs. 10 million", rate: "0.27% commission" }
  ]

  return (
    <section 
      id="pricing" 
      className="py-16 px-4 scroll-mt-20"
      aria-labelledby="pricing-title"
    >
      <div className="max-w-6xl mx-auto">
        <Card className="bg-section-bg backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 
              id="pricing-title"
              className="text-2xl sm:text-3xl font-bold text-blue-600 mb-8 uppercase tracking-wider"
            >
              Pricing & Fees
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {pricingItems.map((item, index) => (
                <div 
                  key={index}
                  className="bg-card-bg border border-slate-200/25 p-6 rounded-xl shadow-elevation"
                >
                  <h3 className="font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-text leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <p className="text-text mb-4 italic">Brokerage fees as per SEBON rules:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {commissionStructure.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-card-bg border border-slate-200/25 p-4 rounded-xl shadow-elevation"
                  >
                    <p className="text-text">
                      <strong className="text-foreground">{item.range}</strong> → {item.rate}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Image
                src="/images/invest.png"
                alt="Pricing and commission structure"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <p className="text-sm text-text-muted mt-2 text-center">
                Transparent, regulation-aligned fees
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

