"use client";

import React from 'react';
import { Snowflake, Plus } from 'lucide-react';
import Link from 'next/link';
import ProductsSidebar from './ProductsSidebar';
import { useAdminState } from '../../lib/adminState';

function ProductCard({ p }: { p: any }) {
  return (
    <Link 
      id={`p-${p.id}`} href={`/urunler/${p.id}`} 
      className="bg-white rounded-lg overflow-hidden relative flex flex-col group border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:border-[#ebd7b1] transition-all duration-300 h-full cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="w-full bg-[#fcfbfc] flex items-center justify-center relative p-1.5 border-b border-gray-50 aspect-[4/5]">
        {p.image ? (
          <img src={p.image} alt={p.name || p.title} className="w-full h-full object-contain" />
        ) : (
          <img src="https://placehold.co/300x400/e5e7eb/a1a1aa?text=GOERSEL+YOK" alt="Görsel Yok" className="w-full h-full object-cover rounded-sm opacity-50 mix-blend-multiply" />
        )}
      </div>

      <div className="flex px-3 py-3 mt-auto items-end justify-between bg-white min-h-[58px]">
        {p.name ? (
          /* Multi-line Label for Tortillas: (Name, Size, Pack weight specification) */
          <div className="flex flex-col">
            <h4 className="font-extrabold text-gray-800 font-sans text-[13px] leading-tight mb-0.5">{p.name}</h4>
            <div className="text-[11px] text-gray-500 font-bold leading-none mb-1">{p.title}</div>
            <div className="flex items-center gap-1 text-[11px] text-gray-400 font-bold leading-none">
              <span>{p.weight}</span>
              <span className="w-[1px] h-2 bg-gray-200"></span>
              <span>{p.count}</span>
            </div>
          </div>
        ) : (
          /* Standard 2-line Label for Lavaş / Pides: (Size, Spec) */
          <div className="flex flex-col">
            <h4 className="font-extrabold text-gray-800 font-sans text-[13.5px] leading-tight mb-1">{p.title}</h4>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold leading-none">
              <span>{p.weight}</span>
              <span className="w-[1px] h-2 bg-gray-200"></span>
              <span>{p.count}</span>
            </div>
          </div>
        )}

        {/* Plus Circular Accent Add Icon */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#11462b] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
          <Plus size={16} strokeWidth={3} />
        </div>
      </div>
    </Link>
  );
}

export default function ProductsContent() {
  const { products } = useAdminState();
  const PRODUCTS_LAVAS = products.filter(p => p.category === 'lavas');
  const PRODUCTS_GOBIT = products.filter(p => p.category === 'gobit');
  const PRODUCTS_TIRNAKLI = products.filter(p => p.category === 'tirnakli');
  const PRODUCTS_TORTILLA = products.filter(p => p.category === 'tortilla');
  const PRODUCTS_DONUK = products.filter(p => p.category === 'donuk');

  return (
    <div className="w-full flex-1 flex flex-col gap-10">
      
      {/* 1. TOP DUAL SPLIT ROW: Left Sidebar Categories Menu & Right Lavaş/Gobit Section Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start w-full">
        
        {/* Left Column (Sidebar Column) - Span 1 of 4 columns on desktop */}
        <div className="lg:col-span-1 w-full flex flex-col gap-5 sticky top-24">
          <ProductsSidebar />
        </div>

        {/* Right Column (Lavaş & Gobit list area) - Span 3 of 4 columns on desktop */}
        <div className="lg:col-span-3 flex flex-col gap-10 w-full">
          
          {/* LAVAŞ Section */}
          <section id="cat-lavas" className="flex flex-col bg-[#fdfcf9] border border-[#f2eadc]/80 rounded-xl p-4 sm:p-5 w-full scroll-mt-24 shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
            <div className="flex items-center justify-between gap-4 mb-4 pb-2.5 border-b border-[#f2eadc]/40">
              <div>
                <h2 className="text-[17px] sm:text-[19px] font-sans font-extrabold text-[#11462b] uppercase tracking-wider mb-0.5 leading-none">
                  LAVAŞ
                </h2>
                <p className="text-gray-400 font-sans text-[11px] sm:text-[12px] font-semibold leading-none">
                  Yumuşacık, esnek ve dayanıklı yapısıyla her sofraya uyum sağlar.
                </p>
              </div>
              <Link href="/iletisim" 
                className="text-white bg-[#11462b] px-3.5 py-1.5 rounded font-sans text-[10.5px] uppercase tracking-widest font-extrabold hover:bg-brand-green transition-all shadow-sm shrink-0 h-max"
              >
                Tüm Lavaş Ürünleri →
              </Link>
            </div>
            {/* Exactly 4 Product Columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 items-stretch w-full">
              {PRODUCTS_LAVAS.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>

          {/* GOBİT Section */}
          <section id="cat-gobit" className="flex flex-col bg-[#fdfcf9] border border-[#f2eadc]/80 rounded-xl p-4 sm:p-5 w-full scroll-mt-24 shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
            <div className="flex items-center justify-between gap-4 mb-4 pb-2.5 border-b border-[#f2eadc]/40">
              <div>
                <h2 className="text-[17px] sm:text-[19px] font-sans font-extrabold text-[#11462b] uppercase tracking-wider mb-0.5 leading-none">
                  GOBİT (YUVARLAK PİDE)
                </h2>
                <p className="text-gray-400 font-sans text-[11px] sm:text-[12px] font-semibold leading-none">
                  Yuvarlak formu ve özel dokusuyla geleneksel lezzet.
                </p>
              </div>
              <Link href="/iletisim" 
                className="text-white bg-[#11462b] px-3.5 py-1.5 rounded font-sans text-[10.5px] uppercase tracking-widest font-extrabold hover:bg-brand-green transition-all shadow-sm shrink-0 h-max"
              >
                Tüm Gobit Ürünleri →
              </Link>
            </div>
            {/* Exactly 3 Product Columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 items-stretch w-full">
              {PRODUCTS_GOBIT.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>

        </div>
      </div>

      {/* 2. MIDDLE RAMP: TIRNAKLI PİDE (Left, Span 5 of 12) & TORTILLA (Right, Span 7 of 12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
        
        {/* Left Side: TIRNAKLI PİDE - col-span-5 */}
        <section id="cat-tirnakli" className="lg:col-span-5 flex flex-col bg-[#fdfcf9] border border-[#f2eadc]/80 rounded-xl p-4 sm:p-5 w-full scroll-mt-24 shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between gap-3 mb-4 pb-2.5 border-b border-[#f2eadc]/40">
            <div>
              <h2 className="text-[17px] font-sans font-extrabold text-[#11462b] uppercase tracking-wider mb-0.5 leading-none">
                TIRNAKLI PİDE
              </h2>
              <p className="text-gray-400 font-sans text-[11px] font-semibold leading-none">
                Geleneksel taş fırın lezzeti, çıtır dokusu ile.
              </p>
            </div>
            <Link href="/iletisim" 
              className="text-white bg-[#11462b] px-3 py-1.5 rounded font-sans text-[10px] uppercase tracking-widest font-extrabold hover:bg-brand-green transition-all shadow-sm shrink-0"
            >
              Tüm Pide Ürünleri →
            </Link>
          </div>
          {/* Exactly 3 columns of Pides */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 items-stretch w-full h-full">
            {PRODUCTS_TIRNAKLI.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>

        {/* Right Side: TORTILLA - col-span-7 */}
        <section id="cat-tortilla" className="lg:col-span-7 flex flex-col bg-[#fdfcf9] border border-[#f2eadc]/80 rounded-xl p-4 sm:p-5 w-full scroll-mt-24 shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between gap-3 mb-4 pb-2.5 border-b border-[#f2eadc]/40">
            <div>
              <h2 className="text-[17px] font-sans font-extrabold text-[#11462b] uppercase tracking-wider mb-0.5 leading-none">
                TORTILLA
              </h2>
              <p className="text-gray-400 font-sans text-[11px] font-semibold leading-none">
                Esnek yapısıyla tariflerinize lezzet katar.
              </p>
            </div>
            <Link href="/iletisim" 
              className="text-white bg-[#11462b] px-3 py-1.5 rounded font-sans text-[10px] uppercase tracking-widest font-extrabold hover:bg-brand-green transition-all shadow-sm shrink-0"
            >
              Tüm Tortilla Ürünleri →
            </Link>
          </div>
          {/* Exactly 5 columns of Tortillas */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 items-stretch w-full h-full">
            {PRODUCTS_TORTILLA.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>

      </div>

      {/* 3. BOTTOM ROW: DONUK ÜRÜNLER */}
      <section id="cat-donuk-urunler" className="flex flex-col gap-5 bg-[#f4f8fe] border border-[#dce6f2] rounded-xl p-5 sm:p-6 w-full scroll-mt-24 shadow-[0_2px_12px_rgba(15,59,117,0.02)]">
        <div className="flex items-center justify-between gap-4 border-b border-[#c9d9ec]/60 pb-3">
          <div className="flex items-center gap-2.5">
            <Snowflake className="text-[#0f3b75] w-6 h-6 shrink-0 animate-pulse" strokeWidth={2.5} />
            <div>
              <h2 className="text-[17px] sm:text-[18px] font-sans font-extrabold text-[#0f3b75] uppercase tracking-wider mb-0.5 leading-none">
                DONUK ÜRÜNLER
              </h2>
              <p className="text-gray-400 font-sans text-[11px] sm:text-[12px] font-semibold leading-none">
                Lezzetini koruyan, pratik ve uzun ömürlü donuk ürünlerimiz.
              </p>
            </div>
          </div>
          <Link href="/iletisim" 
            className="text-white bg-[#0f3b75] px-3.5 py-1.5 rounded font-sans text-[10.5px] uppercase tracking-widest font-extrabold hover:bg-blue-800 transition-all shadow-sm shrink-0"
          >
            Tüm Donuk Ürünler →
          </Link>
        </div>

        {/* Dynamic Frozen Product Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 items-stretch w-full">
          {PRODUCTS_DONUK.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

    </div>
  );
}
