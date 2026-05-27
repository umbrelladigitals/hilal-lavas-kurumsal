import React from 'react';
import { Heart, ShieldCheck, Leaf, Users } from 'lucide-react';

export default function OurValues() {
  const values = [
    {
      icon: <Heart strokeWidth={1.5} />,
      title: "Müşteri Odaklılık",
      desc: "Tüm faaliyetlerimizin merkezine müşteri memnuniyetini ve beklentilerini koyarız."
    },
    {
      icon: <ShieldCheck strokeWidth={1.5} />,
      title: "Güvenilirlik ve Şeffaflık",
      desc: "İş ahlakımız gereği, müşterilerimize, çalışanlarımıza ve iş ortaklarımıza karşı her zaman dürüst ve şeffafız."
    },
    {
      icon: <Leaf strokeWidth={1.5} />,
      title: "Doğallık",
      desc: "Ürünlerimizi en yüksek doğallık standartlarında ve insan sağlığına uygun olarak üretiriz."
    },
    {
      icon: <Users strokeWidth={1.5} />,
      title: "Takım Ruhu",
      desc: "Başarının, uyumlu ve birbirine destek olan bir ekibin eseri olduğuna inanırız."
    }
  ];

  return (
    <section id="degerlerimiz" className="bg-[#11462b] rounded-2xl text-white p-10 lg:p-14 mb-8">
      <div className="text-center mb-12">
        <h2 className="text-[26px] md:text-[32px] font-sans font-bold leading-tight text-white mb-4 uppercase tracking-wider">
          Temel Değerlerimiz
        </h2>
        <p className="text-[#cce8d7] font-sans text-[15px] max-w-2xl mx-auto font-medium">
          Bizi biz yapan ve her adımda bize rehberlik eden değerlerimizle daha güçlü yarınlara yürüyoruz.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         {values.map((v, idx) => (
           <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#175c39] flex items-center justify-center mb-5 border border-[#1e784a]">
                 {React.cloneElement(v.icon, { className: 'w-7 h-7 text-brand-orange' })}
              </div>
              <h4 className="font-sans font-bold text-[16px] text-white mb-2">{v.title}</h4>
              <p className="font-sans text-[13px] text-[#a5c0b1] leading-relaxed relative right-1">{v.desc}</p>
           </div>
         ))}
      </div>
    </section>
  );
}
