import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section 
      id="about" 
      className="py-16 px-4 scroll-mt-20"
      aria-labelledby="about-title"
    >
      <div className="max-w-6xl mx-auto">
        <Card className="bg-section-bg backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 
              id="about-title"
              className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 uppercase tracking-wider"
            >
              About Sagarmatha Investments
            </h2>
            <p className="text-lg text-text mb-6 leading-relaxed">
              Sagarmatha Investments is a professional stock brokerage and investment advisory firm dedicated to helping clients achieve financial growth and security. Inspired by the strength and stability of Mount Everest, we combine deep market expertise with modern trading technology to provide{" "}
              <span className="text-brand-gold font-bold">transparent, reliable, and client-focused financial solutions</span>.
            </p>
            <p className="text-lg text-text mb-8">We specialize in:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-card-bg border border-slate-200/25 p-4 rounded-xl shadow-elevation">
                <p className="text-text leading-relaxed">
                  <strong className="text-foreground">Stock Brokerage Services</strong> – Seamless buying and selling of shares.
                </p>
              </div>
              <div className="bg-card-bg border border-slate-200/25 p-4 rounded-xl shadow-elevation">
                <p className="text-text leading-relaxed">
                  <strong className="text-foreground">Investment Advisory</strong> – Expert guidance for short-term and long-term wealth creation.
                </p>
              </div>
              <div className="bg-card-bg border border-slate-200/25 p-4 rounded-xl shadow-elevation">
                <p className="text-text leading-relaxed">
                  <strong className="text-foreground">Portfolio Management</strong> – Tailored strategies to balance risk and growth.
                </p>
              </div>
              <div className="bg-card-bg border border-slate-200/25 p-4 rounded-xl shadow-elevation">
                <p className="text-text leading-relaxed">
                  <strong className="text-foreground">Market Research</strong> – Data-driven insights to support smart investment decisions.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Image
                src="/images/office.png"
                alt="Sagarmatha Investments office and team"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <p className="text-sm text-text-muted mt-2 text-center">
                Experienced team backed by modern trading tools
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

