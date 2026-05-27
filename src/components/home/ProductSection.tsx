"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useAdminState } from '../../lib/adminState';

const CATEGORIES = ["LAVAŞ", "TIRNAKLI PİDE", "TORTİLLA", "GOBİT (YUVARLAK PİDE)"];

export default function ProductSection() {
  const [activeCategory, setActiveCategory] = useState("LAVAŞ");
  const { products } = useAdminState();

  // Filter products for the showcase section
  const showcaseProducts = products.filter(p => p.category === 'showcase' || p.id.startsWith('sc'));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <p className="text-brand-orange font-bold uppercase tracking-widest text-[14px] mb-3">ÜRÜN GRUPLARIMIZ</p>
        <h2 className="text-[42px] md:text-[48px] font-serif font-bold text-brand-green mb-10">Her İhtiyaca Özel Lezzetler</h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded text-[14px] font-medium transition-colors border ${
                activeCategory === cat 
                  ? 'bg-brand-green text-white border-brand-green' 
                  : 'bg-white text-gray-700 border-gray-300 hover:text-brand-green'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid / Slider View */}
        <div className="relative group max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 lg:-ml-10 w-12 h-12 bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center text-gray-400 hover:text-brand-green z-10 hidden md:flex border border-gray-100 transition-colors">
            <ChevronLeft size={24} />
          </button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseProducts.map(product => (
              <Link href={`/urunler/${product.id}`} key={product.id} className="bg-white rounded-[4px] border border-gray-200 p-0 transition-transform duration-300 hover:-translate-y-1 flex flex-col h-full group/card overflow-hidden cursor-pointer block">
                {/* Image Wrapper */}
                <div className="aspect-[3/4.2] bg-[#f8f9fa] border-b border-gray-100/50 relative flex items-center justify-center overflow-hidden">
                   <img src={product.image || "https://placehold.co/600x800/f8f9fa/a1a1aa?text=LAVAS+PACK"} alt={product.name} className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover/card:scale-105" />
                </div>

                <div className="text-left mt-0 p-5 px-6 pb-6">
                  <h3 className="font-sans font-bold text-[18px] text-gray-900 mb-1.5 leading-tight">{product.name}</h3>
                  <p className="text-gray-500 text-[14px] mb-6 font-medium">{product.weight} <span className="mx-2 font-light">|</span> {product.count}</p>
                  
                  <div className="w-full flex items-center justify-center py-3 border-[1.5px] border-gray-300 text-gray-700 font-bold text-[13px] rounded group-hover/card:bg-brand-green group-hover/card:border-brand-green group-hover/card:text-white transition-colors uppercase tracking-widest">
                    İNCELE
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 lg:-mr-10 w-12 h-12 bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center text-gray-400 hover:text-brand-green z-10 hidden md:flex border border-gray-100 transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* View All Button */}
        <div className="mt-16">
          <Link href="/urunler" className="inline-block px-10 py-3.5 bg-brand-green text-white font-sans font-bold text-[14px] tracking-wide rounded-md hover:bg-brand-light-green transition-colors shadow-md">
            TÜM ÜRÜNLERİ GÖR
          </Link>
        </div>

      </div>
    </section>
  );
}
