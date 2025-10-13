"use client"

import { useState, useEffect } from "react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <button
      className={`scroll-top-btn ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
    >
      ↑
    </button>
  )
}

