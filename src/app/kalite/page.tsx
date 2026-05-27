import React from 'react';
import { getAllData } from '@/src/lib/getData';
import ClientProvider from '@/src/components/ClientProvider';

import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import FloatingSocialBar from '@/src/components/layout/FloatingSocialBar';
import QualityHero from '@/src/components/quality/QualityHero';
import Certificates from '@/src/components/quality/Certificates';
import QualityPolicy from '@/src/components/quality/QualityPolicy';
import ProductionJourney from '@/src/components/quality/ProductionJourney';
import QualityControl from '@/src/components/quality/QualityControl';
import NaturalQualityBanner from '@/src/components/quality/NaturalQualityBanner';

export const dynamic = 'force-dynamic';

export default async function QualityPage() {
  const initialData = getAllData();

  return (
    <ClientProvider initialData={initialData}>
      <div className="min-h-screen flex flex-col relative w-full overflow-hidden bg-white">
        <Header />
        <main className="flex-grow flex flex-col">
          <QualityHero />
          <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16 py-16">
            <Certificates />
            <QualityPolicy />
            <ProductionJourney />
            <QualityControl />
          </div>
          <NaturalQualityBanner />
        </main>
        <Footer />
        <FloatingSocialBar />
      </div>
    </ClientProvider>
  );
}
