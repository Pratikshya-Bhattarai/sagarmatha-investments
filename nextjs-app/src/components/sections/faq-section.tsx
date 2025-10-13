"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How do I open a Demat and trading account?",
      answer: "Reach out via the contact form below. Our team will help you set up Demat, MeroShare, and trading credentials within 1–2 business days."
    },
    {
      question: "What is the minimum amount required to start investing?",
      answer: "There is no strict minimum. We recommend starting with an amount aligned to your risk tolerance and goals; our advisors can guide you."
    },
    {
      question: "Do you provide research and daily market insights?",
      answer: "Yes. We offer daily market briefs, screeners, and premium research packages for active traders and long-term investors."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section 
      id="faq" 
      className="py-16 px-4 scroll-mt-20"
      aria-labelledby="faq-title"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="bg-section-bg backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 
              id="faq-title"
              className="text-2xl sm:text-3xl font-bold text-blue-600 mb-8 uppercase tracking-wider text-center"
            >
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-card-bg border border-slate-200/25 rounded-xl shadow-elevation overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left font-semibold text-foreground hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors flex justify-between items-center"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.question}</span>
                    <span className={`transform transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}>
                      ▼
                    </span>
                  </button>
                  {openIndex === index && (
                    <div 
                      id={`faq-answer-${index}`}
                      className="px-6 pb-4 text-text leading-relaxed"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

