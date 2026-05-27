import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function QualityControl() {
  const controls = [
    "Hammadde giriş kontrolleri",
    "Fiziksel ve kimyasal analizler",
    "Mikrobiyolojik testler",
    "Paketleme öncesi son kontrol",
    "Periyodik ürün analizleri"
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Box */}
      <div className="border border-[#f2eadc] rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-sm">
        {/* Lab bg decoration - fully filling the card */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/quality_lab.png" 
            alt="Mikroskop" 
            className="w-full h-full object-cover"
          />
          {/* Light overlay to maintain text readability */}
          <div className="absolute inset-0 bg-[#fdfcf8]/90"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-[18px] font-sans font-bold text-gray-800 uppercase tracking-widest leading-tight mb-3">
            KALİTE KONTROL SÜREÇLERİMİZ
          </h2>
          <p className="text-gray-600 font-sans text-[14px] leading-relaxed mb-8 max-w-sm font-medium">
            Üretimin her aşamasında laboratuvar testleri ve uzman 
            kontrolleri ile kaliteyi güvence altına alıyoruz.
          </p>
          
          <ul className="flex flex-col gap-3.5">
            {controls.map((control, idx) => (
              <li key={idx} className="flex items-center gap-3">
                 <CheckCircle2 className="text-[#11462b] w-[18px] h-[18px] shrink-0" strokeWidth={2.5} />
                 <span className="font-sans text-gray-800 text-[14px] font-medium tracking-wide">{control}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Box Base on dark green with background image */}
      <div className="rounded-2xl p-8 lg:p-12 relative overflow-hidden flex flex-col justify-center text-white shadow-md bg-[#11462b]">
        {/* Packaged lavas bg decoration - fully filling the card */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/packaged_lavas.png" 
            alt="Lavaş Paketleme" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay to maintain white text readability */}
          <div className="absolute inset-0 bg-[#11462b]/95"></div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-[20px] font-sans font-bold uppercase tracking-widest leading-tight mb-4 text-[#e8f0eb]">
            GÜVENİNİZ BİZİM İÇİN DEĞERLİ
          </h2>
          <p className="font-sans text-[#a5c0b1] text-[15px] leading-relaxed mb-12 max-w-sm">
            Hilal Lavaş, sağlıklı nesiller için güvenilir gıda üretmeye
            ve kalite standartlarını sürekli yükseltmeye kararlıdır.
          </p>
          <div className="font-serif italic text-[#cce8d7] text-[28px] opacity-90">
            Hilal Lavaş Kalite Ekibi
          </div>
        </div>
      </div>
    </section>
  );
}
