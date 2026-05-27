import React from 'react';
import { ShieldCheck, Award, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function QualityHero() {
  return (
    <section className="relative w-full bg-white pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden border-b border-gray-100">
      {/* Background Image - Right side */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] z-0">
        <img 
          src="/images/quality_hero.png" 
          alt="Üretim Hattı" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay to fade into white on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:from-white lg:via-white/95 lg:to-transparent"></div>
        {/* Added solid white on extreme left to ensure text is readable if image stretches */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-white hidden lg:block"></div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8">
           <div className="text-[12px] text-gray-500 font-sans tracking-wide mb-8">
             <Link href="/" className="hover:text-brand-orange cursor-pointer transition-colors">Ana Sayfa</Link> <span className="mx-1">&gt;</span> <span className="hover:text-brand-orange cursor-pointer transition-colors">Kurumsal</span> <span className="mx-1">&gt;</span> <span className="text-gray-400 font-medium">Kalite</span>
           </div>
           <p className="text-brand-orange font-bold uppercase tracking-[0.1em] text-[13px] mb-3 font-sans">
             KALİTEMİZ, GELECEĞİMİZ
           </p>
           <h1 className="text-[3rem] lg:text-[4rem] font-serif font-bold text-[#11462b] leading-[1.1] mb-6">
             KALİTE ANLAYIŞIMIZ
           </h1>
           <p className="text-gray-700 font-sans text-[15px] max-w-lg leading-relaxed font-medium mb-12">
             Hilal Lavaş olarak, sağlıklı, güvenilir ve üstün kaliteli ürünler üretmek 
             en temel önceliğimizdir. Üretim süreçlerimizin her aşamasında ulusal 
             ve uluslararası standartlara uygunluğu garanti altına alıyoruz.
           </p>

           {/* Icons row */}
           <div className="flex flex-wrap gap-8 lg:gap-12 items-start mt-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-[50px] h-[50px] rounded-full border-[1.5px] border-gray-300 flex items-center justify-center bg-transparent">
                   <ShieldCheck className="text-gray-600 w-6 h-6" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-sans font-bold text-gray-700 text-center uppercase tracking-wider">Güvenilir<br/>Üretim</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-[50px] h-[50px] rounded-full border-[1.5px] border-gray-300 flex items-center justify-center bg-transparent">
                   <Award className="text-gray-600 w-6 h-6" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-sans font-bold text-gray-700 text-center uppercase tracking-wider">Yüksek<br/>Standart</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-[50px] h-[50px] rounded-full border-[1.5px] border-gray-300 flex items-center justify-center bg-transparent">
                   <TrendingUp className="text-gray-600 w-6 h-6" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-sans font-bold text-gray-700 text-center uppercase tracking-wider">Sürekli<br/>İyileştirme</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-[50px] h-[50px] rounded-full border-[1.5px] border-gray-300 flex items-center justify-center bg-transparent">
                   <Users className="text-gray-600 w-6 h-6" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-sans font-bold text-gray-700 text-center uppercase tracking-wider">Müşteri<br/>Memnuniyeti</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
