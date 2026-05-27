import React from 'react';
import { getAllData } from '@/src/lib/getData';
import ClientProvider from '@/src/components/ClientProvider';

import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import FloatingSocialBar from '@/src/components/layout/FloatingSocialBar';
import ContactHero from '@/src/components/contact/ContactHero';
import ContactCards from '@/src/components/contact/ContactCards';
import ContactFormMap from '@/src/components/contact/ContactFormMap';
import SocialWhatsAppBanner from '@/src/components/contact/SocialWhatsAppBanner';
import FaqWholesale from '@/src/components/contact/FaqWholesale';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const initialData = getAllData();

  return (
    <ClientProvider initialData={initialData}>
      <div className="min-h-screen flex flex-col relative w-full overflow-hidden bg-white">
        <Header />
        <main className="flex-grow flex flex-col">
          <ContactHero />
          <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 lg:gap-20 py-12 lg:py-16">
            <ContactCards />
            <ContactFormMap />
            <SocialWhatsAppBanner />
            <FaqWholesale />
          </div>
        </main>
        <Footer />
        <FloatingSocialBar />
      </div>
    </ClientProvider>
  );
}
