"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Additional", href: "/additional-services" },
  { name: "Charts", href: "/charts" },
  { name: "NEPSE", href: "/nepse" },
  { name: "API Docs", href: "/api-docs" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-slate-900/85 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
      aria-label="Primary navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white font-bold text-lg hover:opacity-80 transition-opacity"
            aria-label="Sagarmatha Investments home"
          >
            <Image
              src="/favicon.svg"
              alt=""
              width={28}
              height={28}
              className="w-7 h-7"
              aria-hidden="true"
            />
            <span className="hidden sm:block">Sagarmatha Investments</span>
            <span className="sm:hidden">Sagarmatha</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-white hover:bg-white/10 border border-white/30"
              aria-label="Toggle color theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

