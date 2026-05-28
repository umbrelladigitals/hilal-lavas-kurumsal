import React from 'react';
import { Target, Award, RefreshCcw, CheckCircle2 } from 'lucide-react';

export default function QualitySection() {
  return (
    <section className="py-0 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row shadow-xl rounded-[4px] overflow-hidden bg-white mb-20 border border-gray-100">
          
          {/* Left Side: Quality Standards (Dark Mode) */}
          <div className="w-full lg:w-[45%] relative p-6 sm:p-10 md:p-16 flex flex-col justify-center overflow-hidden">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 bg-gray-100">
              <img 
                src="/images/quality_bg.png" 
                alt="Flour and Wheat" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
            </div>

            <div className="relative z-10 text-white">
              <p className="text-brand-orange font-bold uppercase tracking-widest text-[14px] mb-4">KALİTE ANLAYIŞIMIZ</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white leading-tight">Doğallık, Hijyen<br/>ve Güven</h2>
              
              <p className="text-white font-sans text-[15px] mb-10 max-w-sm leading-relaxed opacity-90">
                Hilal Lavaş olarak, üretimin her aşamasında uluslararası kalite ve gıda güvenliği standartlarına uygun hareket ediyoruz.
              </p>

              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={22} strokeWidth={2.5} className="text-brand-orange flex-shrink-0" />
                  <span className="font-semibold text-[15px]">ISO 22000:2018 Gıda Güvenliği</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={22} strokeWidth={2.5} className="text-brand-orange flex-shrink-0" />
                  <span className="font-semibold text-[15px]">Helal Sertifikalı Üretim</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={22} strokeWidth={2.5} className="text-brand-orange flex-shrink-0" />
                  <span className="font-semibold text-[15px]">Katkısız ve Koruyucusuz</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={22} strokeWidth={2.5} className="text-brand-orange flex-shrink-0" />
                  <span className="font-semibold text-[15px]">Modern Üretim Tesisleri</span>
                </li>
              </ul>

              <button className="px-8 py-3.5 border border-white text-white font-sans font-bold text-[14px] tracking-wide rounded-[4px] hover:bg-white hover:text-black transition-colors w-max uppercase">
                KALİTE POLİTİKAMIZ
              </button>
            </div>
          </div>

          {/* Right Side: Why Hilal Lavas? (Light Mode) */}
          <div className="w-full lg:w-[55%] p-6 sm:p-10 md:p-16 md:pl-20 bg-white relative flex flex-col justify-center">
             <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] opacity-20 pointer-events-none rounded-full overflow-hidden blur-[2px]">
              <img 
                src="/images/texture_bg.png" 
                alt="Lavash Texture" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            
            <div className="relative z-10 max-w-lg">
              <p className="font-bold uppercase tracking-widest text-[14px] mb-8 text-brand-orange">NEDEN HİLAL LAVAŞ?</p>
              
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 text-brand-green bg-white shadow-sm">
                    <Target size={26} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold text-gray-900 text-[18px] mb-1">Geleneksel Deneyim</h3>
                    <p className="text-gray-500 text-[15px] leading-relaxed">Yılların tecrübesiyle geleneksel lezzeti geleceğe taşıyoruz.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 text-brand-green bg-white shadow-sm">
                    <Award size={26} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold text-gray-900 text-[18px] mb-1">Geniş Ürün Yelpazesi</h3>
                    <p className="text-gray-500 text-[15px] leading-relaxed">Her ihtiyaca uygun lavaş, tortilla ve pide çeşitleri.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 text-brand-green bg-white shadow-sm">
                    <RefreshCcw size={26} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold text-gray-900 text-[18px] mb-1">Türkiye Genelinde Dağıtım</h3>
                    <p className="text-gray-500 text-[15px] leading-relaxed">Yaygın bayi ağımızla her yerdeyiz.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 text-brand-green bg-white shadow-sm">
                    <Target size={26} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold text-gray-900 text-[18px] mb-1">Müşteri Memnuniyeti</h3>
                    <p className="text-gray-500 text-[15px] leading-relaxed">Kalite ve lezzet odaklı hizmet anlayışı.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
