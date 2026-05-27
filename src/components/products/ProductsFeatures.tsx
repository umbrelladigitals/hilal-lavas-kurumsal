import React from 'react';
import { Leaf, Settings, ShieldCheck, Truck, Users } from 'lucide-react';

export default function ProductsFeatures() {
  const features = [
    { icon: <Leaf className="w-8 h-8 text-brand-green" strokeWidth={1.5} />, title: "%100 DOĞAL", desc: "Katkısız ve koruyucusuz, doğadan gelen lezzet." },
    { icon: <Settings className="w-8 h-8 text-brand-green" strokeWidth={1.5} />, title: "MODERN ÜRETİM", desc: "Hijyenik tesislerde üretim garantisi." },
    { icon: <ShieldCheck className="w-8 h-8 text-brand-green" strokeWidth={1.5} />, title: "YÜKSEK KALİTE", desc: "Her aşamada kalite kontrol ve üstün lezzet." },
    { icon: <Truck className="w-8 h-8 text-brand-green" strokeWidth={1.5} />, title: "GÜVENLİ TESLİMAT", desc: "Zamanında ve güvenilir lojistik hizmeti." },
    { icon: <Users className="w-8 h-8 text-brand-green" strokeWidth={1.5} />, title: "MÜŞTERİ ODAKLI", desc: "İhtiyacınıza uygun çözümler ve destek." },
  ];

  return (
    <div className="w-full bg-white border-t border-b border-gray-100 py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-x divide-gray-100">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 px-4 hover:scale-105 transition-transform duration-300">
               <div className="shrink-0">{feature.icon}</div>
               <div>
                  <h4 className="font-sans font-bold text-gray-800 text-[13px] mb-1 leading-tight tracking-wide">{feature.title}</h4>
                  <p className="font-sans text-gray-500 text-[11px] leading-relaxed">{feature.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
