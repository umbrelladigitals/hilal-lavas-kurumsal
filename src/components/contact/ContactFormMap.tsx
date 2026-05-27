"use client";

import React from 'react';
import { Send, MapPin } from 'lucide-react';

export default function ContactFormMap() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Form Section */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-8">
        <h2 className="text-[20px] font-sans font-bold text-gray-800 leading-tight mb-8">
          Bize Mesaj Gönderin
        </h2>
        
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[12px] font-sans font-medium text-gray-600 mb-1.5">Ad Soyad</label>
              <input type="text" placeholder="Adınızı ve soyadınızı giriniz" className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#11462b] focus:ring-1 focus:ring-[#11462b] outline-none transition-all text-sm font-sans" />
            </div>
            <div>
              <label className="block text-[12px] font-sans font-medium text-gray-600 mb-1.5">E-Posta</label>
              <input type="email" placeholder="E-posta adresinizi giriniz" className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#11462b] focus:ring-1 focus:ring-[#11462b] outline-none transition-all text-sm font-sans" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[12px] font-sans font-medium text-gray-600 mb-1.5">Telefon</label>
              <input type="tel" placeholder="Telefon numaranızı giriniz" className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#11462b] focus:ring-1 focus:ring-[#11462b] outline-none transition-all text-sm font-sans" />
            </div>
            <div>
              <label className="block text-[12px] font-sans font-medium text-gray-600 mb-1.5">Konu</label>
              <div className="relative">
                <select defaultValue="" className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#11462b] focus:ring-1 focus:ring-[#11462b] outline-none transition-all text-sm font-sans appearance-none text-gray-500">
                  <option value="" disabled>Konu Seçiniz</option>
                  <option value="Toptan Sipariş">Toptan Sipariş</option>
                  <option value="Ürün Bilgisi">Ürün Bilgisi</option>
                  <option value="Öneri/Şikayet">Öneri / Şikayet</option>
                  <option value="Diğer">Diğer</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">▼</div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-sans font-medium text-gray-600 mb-1.5">Mesajınız</label>
            <textarea placeholder="Mesajınızı buraya yazınız..." rows={4} className="w-full p-4 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#11462b] focus:ring-1 focus:ring-[#11462b] outline-none transition-all text-sm font-sans resize-none"></textarea>
          </div>

          <div className="flex items-start gap-3">
            <input type="checkbox" id="kvkk" className="mt-1 flex-shrink-0 w-4 h-4 rounded border-gray-300 text-[#11462b] focus:ring-[#11462b]" />
            <label htmlFor="kvkk" className="text-[12px] text-gray-500 font-sans leading-relaxed cursor-pointer">
              KVKK kapsamında aydınlatma metnini okudum, kabul ediyorum.
            </label>
          </div>

          <button type="submit" className="w-full h-12 bg-[#11462b] text-white rounded-lg font-sans font-bold text-[13px] uppercase tracking-wider hover:bg-brand-green transition-colors flex items-center justify-center gap-2 mt-4">
            MESAJ GÖNDER <Send size={16} />
          </button>
        </form>
      </div>

      {/* Map Section */}
      <div className="bg-[#f9fdfa] border border-[#eef4f0] shadow-sm rounded-xl p-8 flex flex-col">
         <h2 className="text-[20px] font-sans font-bold text-gray-800 leading-tight mb-8">
          Konumumuz
        </h2>
        
        <div className="w-full h-[280px] bg-gray-200 rounded-lg overflow-hidden mb-6 relative">
          <img 
            src="/images/map_mockup.png" 
            alt="Harita" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
             <div className="bg-white rounded-lg shadow-lg flex items-center gap-3 px-4 py-2 font-sans font-medium text-[13px] text-gray-800">
                <MapPin className="text-brand-orange w-5 h-5 flex-shrink-0" />
                <span>Hilal Lavaş Unlu Mamüller Tic. Ltd. Şti.</span>
             </div>
          </div>
        </div>

        <div className="mb-8">
            <h4 className="font-sans font-bold text-gray-800 text-[14px] mb-1">Hilal Lavaş Unlu Mamüller Tic. Ltd. Şti.</h4>
            <p className="font-sans text-gray-600 text-[13px] leading-relaxed">
              Saray Mah. 86 Cad. No:5/A <br/>
              Kahramankazan / ANKARA
            </p>
        </div>

        <button className="w-full h-12 border border-gray-300 text-gray-700 bg-white rounded-lg font-sans font-bold text-[13px] uppercase tracking-wider hover:border-[#11462b] hover:text-[#11462b] transition-colors mt-auto">
          YOL TARİFİ AL
        </button>
      </div>
    </section>
  );
}
