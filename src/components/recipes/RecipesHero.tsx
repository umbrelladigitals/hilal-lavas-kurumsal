import React from 'react';
import Link from 'next/link';
import { Clock, Heart, Star, Leaf } from 'lucide-react';

export default function RecipesHero() {
  return (
    <section className="relative w-full bg-white pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden border-b border-gray-100 shadow-sm">
      {/* Background Image - Right side */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] z-0">
        <img 
          src="/images/recipes_hero.png" 
          alt="Tarifler" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:from-white lg:via-white/95 lg:to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-1/3 bg-white hidden lg:block"></div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 max-w-xl">
           <div className="text-[12px] text-gray-500 font-sans tracking-wide mb-8">
             <Link href="/" className="hover:text-brand-orange cursor-pointer transition-colors">Ana Sayfa</Link> <span className="mx-1">&gt;</span> <span className="text-gray-400 font-medium">Tarifler</span>
           </div>
           <p className="text-brand-orange font-bold uppercase tracking-[0.1em] text-[13px] mb-3 font-sans">
             LEZZETİ PAYLAŞIYORUZ
           </p>
           <h1 className="text-[3rem] lg:text-[4rem] font-serif font-bold text-[#11462b] leading-[1.1] mb-6">
             TARİFLER
           </h1>
           <p className="text-gray-700 font-sans text-[15px] leading-relaxed font-medium mb-12">
             Hilal Lavaş ile hazırlayabileceğiniz birbirinden lezzetli ve pratik tarifler. Geleneksel lezzetlerden modern sunumlara uzanan tarifleri keşfedin.
           </p>

           <div className="flex flex-wrap gap-8 lg:gap-10 items-start mt-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center bg-transparent">
                   <Clock className="text-[#11462b] w-7 h-7" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-sans font-bold text-gray-700 text-center uppercase tracking-wider">Pratik ve<br/>Kolay</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center bg-transparent">
                   <Heart className="text-[#11462b] w-7 h-7" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-sans font-bold text-gray-700 text-center uppercase tracking-wider">Lezzetli<br/>Sonuçlar</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center bg-transparent">
                   <Star className="text-[#11462b] w-7 h-7" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-sans font-bold text-gray-700 text-center uppercase tracking-wider">Her Öğüne<br/>Uygun</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center bg-transparent">
                   <Leaf className="text-[#11462b] w-7 h-7" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-sans font-bold text-gray-700 text-center uppercase tracking-wider">Sağlıklı ve<br/>Doğal</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
