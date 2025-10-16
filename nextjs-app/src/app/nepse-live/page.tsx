import React from 'react';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import NEPSELiveDashboard from '@/components/charts/nepse-live-dashboard';
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function NEPSELivePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20">
        <NEPSELiveDashboard />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}
