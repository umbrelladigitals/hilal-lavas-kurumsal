import React from 'react';
import Link from 'next/link';

export default function CorporateHero() {
  return (
    <section className="relative w-full bg-white pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden border-b border-gray-100 shadow-sm">
      {/* Background Image - Right side */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] z-0">
        <img 
          src="/images/corporate_hero.png" 
          alt="Kurumsal" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:from-white lg:via-white/95 lg:to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-1/3 bg-white hidden lg:block"></div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 max-w-xl">
           <div className="text-[12px] text-gray-500 font-sans tracking-wide mb-8">
             <Link href="/" className="hover:text-brand-orange cursor-pointer transition-colors">Ana Sayfa</Link> <span className="mx-1">&gt;</span> <span className="text-gray-400 font-medium">Kurumsal</span>
           </div>
           <p className="text-brand-orange font-bold uppercase tracking-[0.1em] text-[13px] mb-3 font-sans">
             HİLAL LAVAŞ
           </p>
           <h1 className="text-[3rem] lg:text-[4rem] font-serif font-bold text-[#11462b] leading-[1.1] mb-6">
             HAKKIMIZDA
           </h1>
           <p className="text-gray-700 font-sans text-[15px] leading-relaxed font-medium mb-12">
             Yılların getirdiği tecrübe ve bitmeyen tutkumuzla, en kaliteli malzemeleri kullanarak sofralarınıza eşsiz lezzetler sunuyoruz. Gelenekten geleceğe uzanan kalite yolculuğumuz.
           </p>
        </div>
      </div>
    </section>
  );
}
