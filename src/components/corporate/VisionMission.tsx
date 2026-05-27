import React from 'react';
import { Target, Lightbulb } from 'lucide-react';

export default function VisionMission() {
  return (
    <section id="vizyon-misyon" className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <div className="bg-[#f9fdfa] border border-[#eef4f0] rounded-2xl p-10 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-[#11462b]/20 mb-6 shadow-sm">
             <Target className="w-7 h-7 text-[#11462b]" />
          </div>
          <h3 className="font-sans font-bold text-[22px] text-[#11462b] mb-4 uppercase tracking-wide">Misyonumuz</h3>
          <p className="font-sans text-[14px] text-gray-600 leading-relaxed font-medium">
             Tüketicilerimize en sağlıklı, lezzetli ve yüksek kaliteli unlu mamülleri sunmak; üretim aşamalarımızda hijyen, doğallık ve müşteri memnuniyetini en üst düzeyde tutmak. Sektörde yenilikçi adımlar atarak, geleneksel lezzetleri modern dünyanın hızına uygun, pratik çözümlerle buluşturmak.
          </p>
       </div>

       <div className="bg-[#fcfbf9] border border-[#f0eadc] rounded-2xl p-10 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-brand-orange/30 mb-6 shadow-sm">
             <Lightbulb className="w-7 h-7 text-brand-orange" />
          </div>
          <h3 className="font-sans font-bold text-[22px] text-brand-orange mb-4 uppercase tracking-wide">Vizyonumuz</h3>
          <p className="font-sans text-[14px] text-gray-600 leading-relaxed font-medium">
             Ulusal ve uluslararası pazarda en çok tercih edilen, kalitesi ve güvenilirliği ile akla ilk gelen lider marka olmak. Sürdürülebilir üretim süreçlerini benimseyerek, gelecek nesillere daha yaşanabilir bir dünya bırakmaya katkıda bulunurken, sofralara değer katmaya devam etmek.
          </p>
       </div>
    </section>
  );
}
