import React from 'react';
import Link from 'next/link';

export default function RecipesCTA() {
  return (
    <section className="bg-[#f2efe6] rounded-xl overflow-hidden relative flex flex-col md:flex-row items-center border border-[#e1dac8]">
      {/* Content */}
      <div className="p-8 lg:p-14 md:w-1/2 relative z-10 flex flex-col items-start">
        <h2 className="text-[26px] lg:text-[32px] font-sans font-medium text-[#11462b] leading-[1.2] mb-4">
          Tariflerinize Lezzet Katın
        </h2>
        <p className="text-gray-700 font-sans text-[15px] leading-relaxed mb-8 max-w-md">
          Hilal Lavaş ile sofralarınıza lezzet, pratiklik ve sağlık katın. Daha fazla tarif için bizi takip edin!
        </p>
        <Link href="/tarifler" 
          className="inline-block px-8 py-3.5 bg-[#11462b] text-white font-sans font-bold text-[13px] rounded hover:bg-brand-green transition-colors shadow-sm uppercase tracking-wider"
        >
          Tüm Tarifleri Keşfet
        </Link>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 h-[250px] md:h-full md:absolute md:right-0 md:top-0 md:bottom-0">
        <img 
          src="/images/recipes_cta.png" 
          alt="Lavaş Sunum" 
          className="w-full h-full object-cover md:object-contain object-right"
        />
      </div>
    </section>
  );
}
