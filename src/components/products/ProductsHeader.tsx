import React from 'react';

const WheatHeaderDecoration = () => (
  <svg className="w-56 h-28 text-amber-600/30 absolute right-16 -top-12 pointer-events-none mix-blend-multiply" viewBox="0 0 200 100" fill="currentColor">
    {/* Stalk 1 */}
    <path d="M 60 95 C 80 80 120 50 165 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Stalk 2 */}
    <path d="M 50 100 C 70 70 105 35 150 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Stalk 1 wheat grains */}
    <ellipse cx="110" cy="62" rx="5" ry="2.5" transform="rotate(-30, 110, 62)" />
    <ellipse cx="118" cy="56" rx="5" ry="2.5" transform="rotate(-30, 118, 56)" />
    <ellipse cx="126" cy="50" rx="5" ry="2.5" transform="rotate(-30, 126, 50)" />
    <ellipse cx="134" cy="44" rx="5" ry="2.5" transform="rotate(-30, 134, 44)" />
    <ellipse cx="142" cy="38" rx="5" ry="2.5" transform="rotate(-30, 142, 38)" />
    <ellipse cx="150" cy="32" rx="5" ry="2.5" transform="rotate(-30, 150, 32)" />
    <ellipse cx="158" cy="26" rx="5" ry="2.5" transform="rotate(-30, 158, 26)" />

    <ellipse cx="106" cy="69" rx="5" ry="2.5" transform="rotate(10, 106, 69)" />
    <ellipse cx="114" cy="63" rx="5" ry="2.5" transform="rotate(10, 114, 63)" />
    <ellipse cx="122" cy="57" rx="5" ry="2.5" transform="rotate(10, 122, 57)" />
    <ellipse cx="130" cy="51" rx="5" ry="2.5" transform="rotate(10, 130, 51)" />
    <ellipse cx="138" cy="45" rx="5" ry="2.5" transform="rotate(10, 138, 45)" />
    <ellipse cx="146" cy="39" rx="5" ry="2.5" transform="rotate(10, 146, 39)" />

    {/* Stalk 2 wheat grains */}
    <ellipse cx="90" cy="68" rx="5" ry="2.5" transform="rotate(-20, 90, 68)" />
    <ellipse cx="99" cy="60" rx="5" ry="2.5" transform="rotate(-20, 99, 60)" />
    <ellipse cx="108" cy="52" rx="5" ry="2.5" transform="rotate(-20, 108, 52)" />
    <ellipse cx="117" cy="44" rx="5" ry="2.5" transform="rotate(-20, 117, 44)" />
    <ellipse cx="126" cy="36" rx="5" ry="2.5" transform="rotate(-20, 126, 36)" />
    <ellipse cx="135" cy="28" rx="5" ry="2.5" transform="rotate(-20, 135, 28)" />
    <ellipse cx="144" cy="20" rx="5" ry="2.5" transform="rotate(-20, 144, 20)" />

    <ellipse cx="85" cy="74" rx="5" ry="2.5" transform="rotate(20, 85, 74)" />
    <ellipse cx="94" cy="66" rx="5" ry="2.5" transform="rotate(20, 94, 66)" />
    <ellipse cx="103" cy="58" rx="5" ry="2.5" transform="rotate(20, 103, 58)" />
    <ellipse cx="112" cy="50" rx="5" ry="2.5" transform="rotate(20, 112, 50)" />
    <ellipse cx="121" cy="42" rx="5" ry="2.5" transform="rotate(20, 121, 42)" />
    <ellipse cx="130" cy="34" rx="5" ry="2.5" transform="rotate(20, 130, 34)" />
  </svg>
);

export default function ProductsHeader() {
  return (
    <div className="relative mb-6 flex justify-between items-end border-b border-gray-100 pb-5 w-full">
      <div className="flex flex-col">
        <h1 className="text-[34px] sm:text-[38px] font-sans font-extrabold text-[#11462b] leading-none uppercase tracking-wider mb-2.5">
          ÜRÜNLERİMİZ
        </h1>
        <p className="text-gray-500 font-sans text-[13.5px] sm:text-[14.5px] max-w-xl font-medium leading-relaxed">
          Geleneksel lezzetlerimizi modern üretim anlayışıyla ve en doğal malzemeleri kullanarak sizlere ulaştırıyoruz.
        </p>
      </div>

      {/* Elegant wheat illustration & %100 Natural Seal Badge */}
      <div className="hidden md:flex items-center gap-4 relative shrink-0 select-none pb-0.5">
        <WheatHeaderDecoration />
        
        {/* Real-looking physical circular %100 Natural seal badge */}
        <div className="border-2 border-dashed border-[#11462b]/30 rounded-full p-0.5 w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] flex items-center justify-center bg-white relative z-10 shadow-sm">
          <div className="w-full h-full border border-solid border-[#11462b] rounded-full flex flex-col items-center justify-center text-center p-1 bg-white">
            <span className="font-extrabold text-brand-orange font-sans leading-none text-[15px] sm:text-[17px] tracking-tight mb-0.5">%100</span>
            <span className="font-sans font-extrabold text-[#11462b] leading-none text-[8.5px] sm:text-[9.5px] tracking-widest">DOĞAL</span>
            <span className="font-sans font-extrabold text-[#11462b] leading-none text-[8px] sm:text-[9px] tracking-wider mt-0.5">İÇERİK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
