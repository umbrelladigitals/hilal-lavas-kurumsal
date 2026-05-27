import React from 'react';
import { getAllData } from '@/src/lib/getData';
import ClientProvider from '@/src/components/ClientProvider';
import ProductDetail from '@/src/components/products/ProductDetailView';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const initialData = getAllData();

  return (
    <ClientProvider initialData={initialData}>
      <ProductDetail />
    </ClientProvider>
  );
}
