import React from 'react';
import { getAllData } from '@/src/lib/getData';
import ClientProvider from '@/src/components/ClientProvider';

import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import FloatingSocialBar from '@/src/components/layout/FloatingSocialBar';
import RecipesHero from '@/src/components/recipes/RecipesHero';
import RecipesList from '@/src/components/recipes/RecipesList';
import RecipesCTA from '@/src/components/recipes/RecipesCTA';
import RecipesFeatures from '@/src/components/recipes/RecipesFeatures';

export const dynamic = 'force-dynamic';

export default async function RecipesPage() {
  const initialData = getAllData();

  return (
    <ClientProvider initialData={initialData}>
      <div className="min-h-screen flex flex-col relative w-full overflow-hidden bg-[#fafafa]">
        <Header />
        <main className="flex-grow flex flex-col">
          <RecipesHero />
          <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <RecipesList />
          </div>
          <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <RecipesCTA />
          </div>
          <RecipesFeatures />
        </main>
        <Footer />
        <FloatingSocialBar />
      </div>
    </ClientProvider>
  );
}
