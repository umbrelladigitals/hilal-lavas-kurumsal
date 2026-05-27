import React from 'react';
import { Target, Award, Leaf, Settings, ShieldCheck } from 'lucide-react';

export default function FeaturesStrip() {
  const features = [
    { icon: <Target className="w-5 h-5 text-white stroke-[1.5px]" />, title: "ISO 22000", desc: "Gıda Güvenliği" },
    { icon: <Award className="w-5 h-5 text-white stroke-[1.5px]" />, title: "Helal Sertifikalı", desc: "Üretim" },
    { icon: <Leaf className="w-5 h-5 text-white stroke-[1.5px]" />, title: "Katkısız ve", desc: "Koruyucusuz" },
    { icon: <Settings className="w-5 h-5 text-white stroke-[1.5px]" />, title: "Modern Üretim", desc: "Teknolojisi" },
    { icon: <ShieldCheck className="w-5 h-5 text-white stroke-[1.5px]" />, title: "Düzenli Kalite", desc: "Kontrolü" },
  ];

  return (
    <div className="w-full relative px-0 sm:px-4 lg:px-8 -mt-24 lg:-mt-28 z-30 mb-8 max-w-[1400px] mx-auto">
      <div className="bg-[#0b3821] sm:rounded-2xl shadow-xl overflow-hidden py-10 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-5 divide-x divide-white/20">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center px-4 text-white group">
              <div className="mb-4 shrink-0 flex items-center justify-center w-[50px] h-[50px] rounded-full border border-white/30 relative">
                <div className="absolute inset-1 rounded-full border border-white/10 flex items-center justify-center">
                   {feature.icon}
                </div>
              </div>
              <h3 className="font-sans font-medium text-[13px] leading-tight text-white mb-1.5">{feature.title}</h3>
              <p className="font-sans text-[12px] text-white/70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
