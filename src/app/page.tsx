import React from 'react';
import { getAllData } from '@/src/lib/getData';
import ClientProvider from '@/src/components/ClientProvider';

import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import FloatingSocialBar from '@/src/components/layout/FloatingSocialBar';

import Hero from '@/src/components/home/Hero';
import FeaturesStrip from '@/src/components/home/FeaturesStrip';
import ProductSection from '@/src/components/home/ProductSection';
import QualitySection from '@/src/components/home/QualitySection';
import PartnersSection from '@/src/components/home/PartnersSection';
import PromoBanners from '@/src/components/home/PromoBanners';

// Ensure the page is dynamically rendered on every request to show live database edits
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const initialData = getAllData();

  return (
    <ClientProvider initialData={initialData}>
      <div className="min-h-screen flex flex-col relative w-full overflow-hidden bg-white">
        <Header />
        
        <main className="flex-grow flex flex-col">
          <Hero />
          <FeaturesStrip />
          <ProductSection />
          <QualitySection />
          <PartnersSection />
          <PromoBanners />
        </main>

        <Footer />
        <FloatingSocialBar />
      </div>
    </ClientProvider>
  );
}
