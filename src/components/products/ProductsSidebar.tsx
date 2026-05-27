"use client";

import React from 'react';
import { Snowflake, Package } from 'lucide-react';
import Link from 'next/link';
import { useAdminState } from '../../lib/adminState';

export default function ProductsSidebar() {
  const { categories } = useAdminState();
  
  return (
    <div className="w-full flex flex-col gap-5">
      
      {/* Category Menu */}
      <div className="flex flex-col gap-2.5">
        {categories.map((c, idx) => (
          <a 
            key={c.id}
            href={`#cat-${c.id}`} 
            className={`flex items-center gap-3.5 px-4 py-3 rounded-lg font-sans font-bold text-[13px] tracking-wide uppercase transition-all shadow-sm hover:scale-[1.01] ${
              idx === 0 
                ? 'bg-[#11462b] text-white' 
                : 'bg-white text-gray-700 hover:bg-[#e9e2d5]/10 hover:text-brand-green border border-gray-100/90'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
              idx === 0 ? 'bg-[#f9f5eb] border-white/25 text-[#11462b]' : 'bg-[#fcf8ee] border-gray-100 text-amber-500'
            }`}>
              {c.id.includes('donuk') ? <Snowflake size={16} /> : <Package size={16} />}
            </div>
            {c.name}
          </a>
        ))}
      </div>

      {/* Promo Banner / Card */}
      <div className="bg-[#fdf9f4] rounded-xl p-5 border border-[#efe6db] flex flex-col justify-between relative overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.01)] hover:border-[#ebd7b1] transition-all group min-h-[290px]">
        <div className="relative z-10 w-full mb-4">
          <h3 className="font-sans font-extrabold text-[#11462b] text-[18px] sm:text-[19px] leading-snug mb-1.5">
            Toplu Alımda<br/>Özel Fiyatlar
          </h3>
          <p className="text-gray-600 font-sans text-[12.5px] leading-relaxed font-semibold">
            İşletmenize özel avantajlı fiyatlar ve düzenli tır tedariği için bizimle iletişime geçin.
          </p>
        </div>

        <div className="relative z-10 w-full mt-auto">
          <div className="bg-white/60 backdrop-blur-xs p-1.5 rounded-lg border border-[#efe6db]/60 mb-2.5 text-center text-[9px] font-extrabold text-[#11462b] font-sans tracking-widest uppercase">
            🔥 TOPTAN SİPARİŞ HATTI
          </div>
          <Link href="/iletisim" 
            className="block w-full text-center bg-[#11462b] text-white font-sans font-bold text-[12px] tracking-widest py-3 rounded-lg hover:bg-brand-green transition-colors uppercase shadow-sm"
          >
            İLETİŞİME GEÇİN
          </Link>
        </div>

        {/* Overlapping stack graphics rendering on bottom background */}
        <div className="absolute -right-8 -bottom-12 pointer-events-none opacity-20 group-hover:scale-105 transition-transform duration-500">
          <svg width="180" height="180" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-amber-700">
            <circle cx="50" cy="50" r="40" strokeWidth="1.5" strokeDasharray="3 3"/>
            <circle cx="50" cy="50" r="30" strokeWidth="1"/>
            <path d="M 10 50 Q 50 90 90 50" strokeWidth="1"/>
          </svg>
        </div>
      </div>
      
    </div>
  );
}
