"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [status, setStatus] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("Sending...")
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus("Thanks! We will reach out shortly.")
      setFormData({ name: "", email: "", message: "" })
    } catch {
      setStatus("Something went wrong. Please try again.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section 
      id="contact" 
      className="py-16 px-4 scroll-mt-20"
      aria-labelledby="contact-title"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="bg-section-bg backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 
              id="contact-title"
              className="text-2xl sm:text-3xl font-bold text-blue-600 mb-8 uppercase tracking-wider text-center"
            >
              Contact Us
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <address className="not-italic space-y-4">
                  <p className="text-text">
                    <strong className="text-foreground">Email:</strong>{" "}
                    <a 
                      href="mailto:info@sagarmathainvestments.com"
                      className="text-link hover:text-link-hover transition-colors"
                    >
                      info@sagarmathainvestments.com
                    </a>
                  </p>
                  <p className="text-text">
                    <strong className="text-foreground">Phone:</strong>{" "}
                    <a 
                      href="tel:+9779876543211"
                      className="text-link hover:text-link-hover transition-colors"
                    >
                      +977-9876543211
                    </a>
                  </p>
                  <p className="text-text">
                    <strong className="text-foreground">Address:</strong> Kathmandu, Nepal
                  </p>
                </address>
              </div>

              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-card-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-card-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-card-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors resize-vertical"
                    />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button type="submit" size="lg">
                      Send Message
                    </Button>
                    {status && (
                      <span className="text-sm text-text-muted" role="status" aria-live="polite">
                        {status}
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
