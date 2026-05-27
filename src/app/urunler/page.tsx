import React from 'react';
import { getAllData } from '@/src/lib/getData';
import ClientProvider from '@/src/components/ClientProvider';

import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import FloatingSocialBar from '@/src/components/layout/FloatingSocialBar';
import ProductsHeader from '@/src/components/products/ProductsHeader';
import ProductsContent from '@/src/components/products/ProductsContent';
import ProductsFeatures from '@/src/components/products/ProductsFeatures';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const initialData = getAllData();

  return (
    <ClientProvider initialData={initialData}>
      <div className="min-h-screen flex flex-col relative w-full overflow-hidden bg-white">
        <Header />
        
        <main className="flex-grow flex flex-col pt-8 pb-4">
          <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
            <ProductsHeader />
            <div className="mt-8">
              <ProductsContent />
            </div>
          </div>
        </main>

        <ProductsFeatures />

        <Footer />
        <FloatingSocialBar />
      </div>
    </ClientProvider>
  );
}
