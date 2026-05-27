import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PARTNERS = [
  { id: 1, name: "mado", color: "#1d4e89", logo: "MADO" },
  { id: 2, name: "hdiskender", color: "#e31837", logo: "HD", sub: "İSKENDER" },
  { id: 3, name: "baydoner", color: "#e31837", logo: "baydöner" },
  { id: 4, name: "sbarro", color: "#e31837", logo: "SBARRO" },
  { id: 5, name: "ustadonerci", color: "#000", logo: "USTA DÖNERCİ" },
  { id: 6, name: "pidem", color: "#e31837", logo: "pidem" },
];

export default function PartnersSection() {
  return (
    <section className="bg-[#0b3821] py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        
        <p className="font-bold uppercase tracking-widest text-[14px] text-white/50 mb-2 font-sans">BİZİ TERCİH EDENLER</p>
        <h2 className="text-3xl font-serif font-bold mb-12 text-white">Güvenilir Çözüm Ortağınız</h2>

        <div className="relative group mx-auto px-4 lg:px-12">
          <button className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 z-10 hidden lg:flex transition-colors">
            <ChevronLeft size={20} />
          </button>

          <div className="flex overflow-x-auto lg:grid lg:grid-cols-6 gap-5 hide-scrollbar snap-x snap-mandatory pb-4 lg:pb-0">
            {PARTNERS.map(partner => (
              <div key={partner.id} className="min-w-[160px] lg:min-w-0 bg-white rounded-md flex flex-col items-center justify-center p-4 lg:p-6 h-[100px] snap-center hover:scale-105 transition-transform duration-300 shadow-lg cursor-pointer border border-transparent hover:border-brand-light-green group">
                {/* Simulated Logo Text */}
                <div className="flex flex-col items-center justify-center h-full w-full">
                  {partner.id === 2 ? (
                    <>
                      <span className="font-bold text-2xl tracking-tighter" style={{ color: partner.color }}>{partner.logo}</span>
                      <span className="font-semibold text-[10px] tracking-widest" style={{ color: partner.color }}>{partner.sub}</span>
                    </>
                  ) : partner.id === 5 ? (
                    <span className="font-bold text-lg tracking-tighter uppercase" style={{ color: partner.color }}>
                       <span className="text-[#e31837]">USTA</span> DÖNERCİ
                    </span>
                  ) : partner.id === 4 ? (
                     <span className="font-black text-2xl tracking-tighter uppercase border-4 border-current px-1" style={{ color: partner.color }}>
                       {partner.logo}
                    </span>
                  ) : partner.id === 3 ? (
                      <span className="font-bold text-2xl tracking-tight lowercase flex items-center gap-1" style={{ color: partner.color }}>
                        <span className="text-xl">🌶️</span> {partner.logo}
                      </span>
                  ) : (
                    <span className="font-bold text-2xl tracking-tight" style={{ color: partner.color }}>{partner.logo}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 z-10 hidden lg:flex transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}
