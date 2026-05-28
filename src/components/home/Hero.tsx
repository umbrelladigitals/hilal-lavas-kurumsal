"use client";

import React from 'react';
import { Leaf, ShieldCheck, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useAdminState } from '../../lib/adminState';

export default function Hero() {
  const { hero } = useAdminState();

  return (
    <section className="relative w-full min-h-[480px] sm:min-h-[600px] lg:min-h-[850px] flex items-center overflow-hidden pt-8 pb-16 lg:pt-0 lg:pb-32">
      {/* Background Full Bleed Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.bgImage} 
          alt={hero.title} 
          className="w-full h-full object-cover object-center bg-[#fdfaf4]"
        />
        {/* Elegant overlay gradient to increase premium readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-start pt-4 justify-center min-h-[380px] sm:min-h-[500px] lg:min-h-[650px]">
        
        {/* Left-aligned Compact Content */}
        <div className="w-full max-w-[560px] text-left mt-4 sm:mt-8">
          <div className="relative z-10">
            <p className="text-brand-orange font-bold uppercase tracking-[0.25em] text-[12px] sm:text-[14px] mb-2 sm:mb-3 font-sans animate-pulse">
              {hero.badge}
            </p>
            <h1 className="text-[1.8rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-sans font-extrabold text-[#11462b] leading-[1.15] mb-3 sm:mb-5 tracking-tight">
              {hero.title}
            </h1>
            <p className="text-gray-600 font-sans text-[14px] sm:text-[16px] mb-5 sm:mb-8 leading-relaxed font-semibold">
              {hero.desc}
            </p>

            {/* Compact Feature Badges with Dividers */}
            <div className="flex flex-wrap items-center justify-start gap-4 sm:gap-5 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full border border-gray-100 bg-[#fbf9f4] flex items-center justify-center text-[#11462b] shadow-sm shrink-0">
                  <Leaf size={16} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-extrabold font-sans text-gray-800 leading-none uppercase tracking-wider">%100 Doğal</span>
              </div>
              
              <div className="hidden sm:block w-px h-6 bg-gray-200"></div>

              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full border border-gray-100 bg-[#fbf9f4] flex items-center justify-center text-[#11462b] shadow-sm shrink-0">
                  <ShieldCheck size={16} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-extrabold font-sans text-gray-800 leading-none uppercase tracking-wider">Yüksek Hijyen</span>
              </div>

              <div className="hidden sm:block w-px h-6 bg-gray-200"></div>

              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full border border-gray-100 bg-[#fbf9f4] flex items-center justify-center text-[#11462b] shadow-sm shrink-0">
                  <ThumbsUp size={16} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-extrabold font-sans text-gray-800 leading-none uppercase tracking-wider">Katkısız</span>
              </div>
            </div>

            {/* Compact CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-start gap-3 w-full">
              <Link href="/urunler" className="w-full sm:w-auto px-7 py-3.5 bg-[#11462b] text-white font-sans font-bold text-[12px] tracking-widest rounded-lg uppercase hover:bg-brand-green transition-all text-center shadow-md">
                {hero.btn1Text}
              </Link>
              <Link href="/kurumsal" className="w-full sm:w-auto px-7 py-3.5 bg-white text-[#11462b] font-sans font-bold text-[12px] tracking-widest rounded-lg uppercase hover:bg-gray-50 transition-all text-center shadow-sm border border-gray-200/80">
                {hero.btn2Text}
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
