import React from 'react';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import NEPSEComprehensiveDashboard from "@/components/charts/nepse-comprehensive-dashboard";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function ChartsPage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              NEPSE Market Analytics
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive market analysis with interactive charts, real-time data, and detailed insights into Nepal's stock market performance.
            </p>
          </div>
        </div>
        
        <NEPSEComprehensiveDashboard />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}