import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <header 
      className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4 overflow-hidden"
      id="top"
    >
      {/* Mountain silhouette background */}
      <div className="absolute bottom-0 left-0 right-0 h-36 opacity-60">
        <div className="w-full h-full bg-gradient-to-t from-white/8 to-transparent clip-path-mountain" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          Sagarmatha Investments
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Climb higher with a trusted partner in brokerage, PMS, and research.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="#contact">
            <Button size="lg" className="text-base">Open Demat & Start Trading</Button>
          </Link>
          <Link href="#pricing">
            <Button variant="secondary" size="lg" className="text-base">View Pricing</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
