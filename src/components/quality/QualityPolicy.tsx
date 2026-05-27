import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function QualityPolicy() {
  const policies = [
    "Katkısız ve doğal içerikli ürünler üretiriz.",
    "Gıda güvenliği ve hijyen standartlarına tam uyum sağlarız.",
    "Sürekli iyileştirme anlayışıyla süreçlerimizi geliştiririz.",
    "Çevreye duyarlı ve sürdürülebilir üretim politikası izleriz.",
    "Müşteri memnuniyetini her şeyin üzerinde tutarız."
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      <div>
        <h2 className="text-[20px] font-sans font-bold text-gray-800 uppercase tracking-widest leading-tight mb-3">
          KALİTE POLİTİKAMIZ
        </h2>
        <p className="text-gray-600 font-sans text-[14px] leading-relaxed mb-6 font-medium">
          Hilal Lavaş olarak, yasal mevzuatlara ve müşteri gereksinimlerine
          uygun, sağlıklı ve lezzetli ürünler sunmayı taahhüt ediyoruz.
        </p>
        
        <ul className="flex flex-col gap-3.5">
          {policies.map((policy, idx) => (
            <li key={idx} className="flex items-start gap-3 group">
              <CheckCircle2 className="text-[#11462b] w-5 h-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2} />
              <span className="font-sans text-gray-800 text-[14px] leading-relaxed font-semibold">{policy}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-[#eef4f0] rounded-2xl p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden shadow-sm">
        {/* Wheat bg decoration - fully filling the card */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/wheat_detail.png" 
            alt="Wheat" 
            className="w-full h-full object-cover"
          />
          {/* Light overlay to maintain text readability */}
          <div className="absolute inset-0 bg-[#f9fdfa]/90"></div>
        </div>
        
        <div className="relative z-10 flex items-start gap-5">
           <div className="w-12 h-12 rounded-full border-[1.5px] border-[#11462b] flex items-center justify-center shrink-0">
             <ShieldCheck className="text-[#11462b] w-6 h-6" strokeWidth={1.5} />
           </div>
           <div>
             <h3 className="font-sans font-bold text-[#11462b] text-[16px] leading-[1.3] mb-3">
               TÜRK GIDA KODEKSİNE <br/> TAM UYUM
             </h3>
             <p className="font-sans text-gray-600 text-[13px] leading-relaxed font-medium">
               Ürünlerimiz Türk Gıda Kodeksi Yönetmeliği'ne uygun olarak
               üretilmekte ve düzenli olarak
               denetlenmektedir.
             </p>
           </div>
        </div>
      </div>
    </section>
  );
}
