import React from 'react';

export default function RecipesFeatures() {
  return (
    <section className="border-t border-gray-100 bg-white py-12">
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-[#11462b]">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
               </svg>
             </div>
             <div>
               <h4 className="font-sans font-bold text-gray-800 text-[13px] uppercase tracking-wide mb-1">%100 DOĞAL</h4>
               <p className="font-sans text-gray-500 text-[12px] leading-relaxed">Katkısız ve koruyucusuz, doğadan gelen lezzet.</p>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-[#11462b]">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="16" height="16" x="4" y="4" rx="2"/>
                  <rect width="6" height="6" x="9" y="9" rx="1"/>
                  <path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>
               </svg>
             </div>
             <div>
               <h4 className="font-sans font-bold text-gray-800 text-[13px] uppercase tracking-wide mb-1">TAZE ÜRETİM</h4>
               <p className="font-sans text-gray-500 text-[12px] leading-relaxed">Günlük üretimle daima taze ürünler.</p>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-[#11462b]">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
               </svg>
             </div>
             <div>
               <h4 className="font-sans font-bold text-gray-800 text-[13px] uppercase tracking-wide mb-1">KOLAY HAZIRLIK</h4>
               <p className="font-sans text-gray-500 text-[12px] leading-relaxed">Pratik ve hızlı tariflerle zaman kazanın.</p>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-[#11462b]">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
               </svg>
             </div>
             <div>
               <h4 className="font-sans font-bold text-gray-800 text-[13px] uppercase tracking-wide mb-1">HER ÖĞÜNE UYGUN</h4>
               <p className="font-sans text-gray-500 text-[12px] leading-relaxed">Kahvaltıdan akşam yemeğine her öğüne özel tarifler.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
