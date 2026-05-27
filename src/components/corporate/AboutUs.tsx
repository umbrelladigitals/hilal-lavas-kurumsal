import React from 'react';

export default function AboutUs() {
  return (
    <section id="hakkimizda" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
         <h2 className="text-[26px] md:text-[32px] font-sans font-bold text-[#11462b] leading-tight mb-6">
            Gelenekten Geleceğe<br/>Ustalıklı Lezzetler
         </h2>
         <div className="space-y-4 text-gray-600 font-sans text-[14px] leading-relaxed">
           <p>
             Hilal Lavaş olarak, yıllardır sofralarınıza en doğal ve lezzetli lavaşları, pideleri ve tortillaları sunmanın gururunu yaşıyoruz. Sektördeki köklü tecrübemiz ve kaliteye olan sarsılmaz inancımızla, üretim süreçlerimizin her aşamasında titizlikle çalışıyoruz.
           </p>
           <p>
             Geleneksel tariflerimizi, modern üretim tesisimizde ve hijyen standartlarına sıkı sıkıya bağlı kalarak geleceğe taşıyoruz. Sadece bir gıda üreticisi değil, sofralarınızın değişmez lezzet ortaklarından biri olmak vizyonuyla yolumuza devam ediyoruz.
           </p>
         </div>
      </div>
      <div className="relative">
         <img 
            src="/images/about_us.png" 
            alt="Hakkımızda" 
            className="w-full h-auto rounded-xl shadow-lg border border-gray-100"
         />
         <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden md:flex flex-col items-center justify-center min-w-[140px]">
            <p className="text-brand-orange font-bold text-4xl font-serif mb-1">20+</p>
            <p className="text-gray-600 font-sans text-sm font-medium">Yıllık Tecrübe</p>
         </div>
      </div>
    </section>
  );
}
