import React from 'react';
import { getAllData } from '@/src/lib/getData';
import ClientProvider from '@/src/components/ClientProvider';

import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import FloatingSocialBar from '@/src/components/layout/FloatingSocialBar';
import CorporateHero from '@/src/components/corporate/CorporateHero';
import AboutUs from '@/src/components/corporate/AboutUs';
import VisionMission from '@/src/components/corporate/VisionMission';
import OurValues from '@/src/components/corporate/OurValues';

export const dynamic = 'force-dynamic';

export default async function CorporatePage() {
  const initialData = getAllData();

  return (
    <ClientProvider initialData={initialData}>
      <div className="min-h-screen flex flex-col relative w-full overflow-hidden bg-white">
        <Header />
        <main className="flex-grow flex flex-col">
          <CorporateHero />
          <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16 py-16">
            <AboutUs />
            <VisionMission />
            <OurValues />
          </div>
        </main>
        <Footer />
        <FloatingSocialBar />
      </div>
    </ClientProvider>
  );
}
