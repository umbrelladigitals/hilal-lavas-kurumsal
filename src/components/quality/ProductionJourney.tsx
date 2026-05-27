import React from 'react';
import { Leaf, Droplets, Flame, Search, Box, Truck, ArrowRight } from 'lucide-react';

export default function ProductionJourney() {
  const steps = [
    { num: "01", title: "Hammadde Seçimi", desc: "En kaliteli buğdaylar özenle seçilir ve kontrol edilir.", icon: <Leaf strokeWidth={1.5} className="w-8 h-8 text-[#11462b]" /> },
    { num: "02", title: "Hamur Hazırlama", desc: "Geleneksel yöntemlerle hamur hazırlanır ve dinlendirilir.", icon: <Droplets strokeWidth={1.5} className="w-8 h-8 text-[#11462b]" /> },
    { num: "03", title: "Pişirme", desc: "Taş fırınlarda ideal sıcaklıkta pişirilerek lezzetini kazanır.", icon: <Flame strokeWidth={1.5} className="w-8 h-8 text-[#11462b]" /> },
    { num: "04", title: "Kalite Kontrol", desc: "Her ürün tek tek kontrol edilerek standartlara uygunluğu onaylanır.", icon: <Search strokeWidth={1.5} className="w-8 h-8 text-[#11462b]" /> },
    { num: "05", title: "Paketleme", desc: "Hijyenik koşullarda modern teknoloji ile paketlenir.", icon: <Box strokeWidth={1.5} className="w-8 h-8 text-[#11462b]" /> },
    { num: "06", title: "Sevkiyat", desc: "Tazeliğini koruyarak güvenli şekilde teslim edilir.", icon: <Truck strokeWidth={1.5} className="w-8 h-8 text-[#11462b]" /> }
  ];

  return (
    <section>
      <div className="mb-12">
        <h2 className="text-[20px] font-sans font-bold text-gray-800 uppercase tracking-widest leading-tight mb-2">
          ÜRETİMDE KALİTE YOLCULUĞUMUZ
        </h2>
        <p className="text-gray-500 font-sans text-[14px]">
          Ham maddeden sofranıza uzanan titiz bir üretim süreci.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between min-w-full overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-8 lg:gap-0">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center text-center w-full lg:w-[150px] shrink-0 group">
              <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center mb-5 group-hover:bg-[#f9fdfa] transition-colors">
                {step.icon}
              </div>
              <span className="font-sans font-bold text-gray-400 text-[14px] mb-1.5">{step.num}</span>
              <h4 className="font-sans font-bold text-gray-800 text-[13px] leading-tight mb-2">{step.title}</h4>
              <p className="font-sans text-gray-500 text-[11px] leading-relaxed px-4 lg:px-2 font-medium">{step.desc}</p>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden lg:flex items-center justify-center h-16 shrink-0 text-gray-300">
                <ArrowRight size={20} strokeWidth={2} className="opacity-50" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
