import React from 'react';

export default function PromoBanners() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Banner 1 */}
          <div className="relative rounded-[4px] overflow-hidden bg-gray-50 flex items-center min-h-[320px] shadow-sm hover:shadow-xl transition-shadow group">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 bg-gray-100">
              <img 
                src="/images/wholesale_bg.png" 
                alt="Business Handshake" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent/40"></div>
            </div>

            <div className="relative z-10 p-6 sm:p-12 max-w-[90%] sm:max-w-[75%]">
              <p className="text-brand-orange font-bold uppercase tracking-widest text-[14px] mb-2">TOPTAN ALIM</p>
              <h2 className="text-[36px] font-serif font-bold text-gray-900 mb-4 leading-tight">Özel Fiyatlar</h2>
               <p className="text-gray-600 font-sans text-[15px] mb-8 leading-relaxed font-medium">
                İşletmenize özel avantajlı fiyatlar<br/>ve hızlı teslimat seçenekleri için<br/>hemen bizimle iletişime geçin.
              </p>
              <button className="px-10 py-3.5 bg-brand-green text-white font-sans font-bold text-[14px] tracking-wide rounded-[4px] hover:bg-brand-light-green transition-colors shadow-md uppercase">
                TEKLİF AL
              </button>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative rounded-[4px] overflow-hidden bg-gray-50 flex items-center min-h-[320px] shadow-sm hover:shadow-xl transition-shadow group">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 bg-gray-100">
              <img 
                src="/images/recipes_bg.png" 
                alt="Wraps and Tacos" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              />
               <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent/40"></div>
            </div>

            <div className="relative z-10 p-6 sm:p-12 max-w-[90%] sm:max-w-[75%]">
              <p className="text-brand-orange font-bold uppercase tracking-widest text-[14px] mb-2">LEZZETLİ TARİFLER</p>
              <h2 className="text-[36px] font-serif font-bold text-brand-green mb-4 leading-tight">İLHAM ALIN</h2>
              <p className="text-gray-600 font-sans text-[15px] mb-8 leading-relaxed font-medium">
                Hilal Lavaş ile hazırlayabileceğiniz<br/>pratik ve lezzetli tarifleri keşfedin.
              </p>
              <button className="px-10 py-3.5 bg-brand-green text-white font-sans font-bold text-[14px] tracking-wide rounded-[4px] hover:bg-brand-light-green transition-colors shadow-md uppercase">
                TARİFLERİ KEŞFET
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
