"use client";

import React, { useState } from 'react';
import { Search, ChevronRight, ArrowRight } from 'lucide-react';
import { useAdminState } from '../../lib/adminState';

const CATEGORIES = ["Tümü", "Kahvaltılık", "Ana Yemek", "Atıştırmalık", "Pratik Tarifler", "Tatlı", "Vejetaryen"];

export default function RecipesList() {
  const [activeCat, setActiveCat] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const { recipes } = useAdminState();

  // Search filter and Category filter
  const filteredRecipes = recipes.filter(r => {
    const matchesCategory = activeCat === "Tümü" || r.cat.toLowerCase() === activeCat.toLowerCase();
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-10">
      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2.5 rounded-md font-sans text-[13px] font-semibold whitespace-nowrap transition-colors border ${
                activeCat === cat 
                  ? 'bg-[#11462b] text-white border-[#11462b]' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64 shrink-0">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tarif ara..." 
            className="w-full h-11 pl-4 pr-10 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] font-sans text-[13px] placeholder:text-gray-400 font-semibold"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1 group flex flex-col h-full cursor-pointer">
              <div className="relative h-48 overflow-hidden bg-gray-50">
                <img 
                  src={recipe.img || "https://placehold.co/600x400/e5e7eb/a1a1aa?text=TARIF"} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#11462b]/95 backdrop-blur text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full font-sans tracking-wide">
                  {recipe.time}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] text-amber-600 font-bold uppercase tracking-widest mb-1.5">{recipe.cat}</span>
                <h3 className="font-sans font-extrabold text-gray-800 text-[16px] mb-2 leading-tight">{recipe.title}</h3>
                <p className="font-sans text-gray-500 text-[13px] leading-relaxed mb-4 flex-1 font-semibold">
                  {recipe.desc}
                </p>
                <div className="pt-4 border-t border-gray-100 flex items-center text-[#11462b] font-sans font-bold text-[13px] group-hover:text-brand-orange transition-colors">
                  Tarifi İncele <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-16 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-400 font-sans font-bold text-[14px]">Aradığınız kriterlere uygun tarif bulunamadı.</p>
        </div>
      )}

      {/* Pagination */}
      {filteredRecipes.length > 8 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button className="w-10 h-10 rounded-full bg-[#11462b] text-white flex items-center justify-center font-sans font-medium text-[14px]">1</button>
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center font-sans font-medium text-[14px] transition-colors">2</button>
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
