import React from 'react';
import Link from 'next/link';

export default function NaturalQualityBanner() {
  return (
    <section className="relative w-full min-h-[360px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
         <img 
            src="/images/natural_wide.png" 
            alt="Buğday ve Un" 
            className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
         {/* Extra solid background on the far left for ultra-wide screens */}
         <div className="absolute inset-y-0 left-0 w-[40%] bg-white hidden xl:block z-[-1]"></div>
      </div>
      
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        <div className="max-w-md">
           <h2 className="text-[26px] md:text-[32px] font-sans font-bold text-[#11462b] uppercase tracking-wide leading-tight mb-4">
             DOĞALLIKTAN GELEN KALİTE
           </h2>
           <p className="font-sans text-gray-700 text-[15px] leading-relaxed font-medium mb-8">
             Katkısız, doğal ve geleneksel yöntemlerle ürettiğimiz lavaşlarımız, 
             sofralarınıza sağlık ve lezzet getirir.
           </p>
           <Link href="/urunler" className="inline-block px-8 py-3.5 bg-[#11462b] text-white font-sans font-bold text-[13px] rounded hover:bg-brand-green transition-colors shadow-md uppercase tracking-wider">
             ÜRÜNLERİMİZİ İNCELEYİN
           </Link>
        </div>
      </div>
    </section>
  );
}
