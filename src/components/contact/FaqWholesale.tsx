"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';

const AccordionItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void, key?: number | string }) => {
  return (
    <div className="border-b border-gray-100">
      <button 
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className={`font-sans font-bold text-[14px] transition-colors ${isOpen ? 'text-[#11462b]' : 'text-gray-800 group-hover:text-[#11462b]'}`}>
          {question}
        </span>
        <div className="shrink-0 ml-4 text-gray-400">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="font-sans text-[13px] text-gray-600 leading-relaxed pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function FaqWholesale() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs = [
    {
      q: "Siparişleriniz hangi bölgelere gönderim yapıyor?",
      a: "Tüm Türkiye geneline frigofrik araçlarımız ve anlaşmalı kargo firmaları ile güvenli gönderim sağlıyoruz. Soğuk zincir gerektiren ürünlerde özel taşıma yöntemleri kullanılmaktadır."
    },
    {
      q: "Minimum sipariş miktarınız nedir?",
      a: "Toptan siparişlerde minimum miktar ürün grubuna göre değişiklik göstermektedir. Detaylı bilgi için satış ekibimizle iletişime geçebilirsiniz."
    },
    {
      q: "Ürünlerinizin raf ömrü ne kadardır?",
      a: "Ürünlerimiz taze saklama koşullarında ortalama 7-10 gün, dondurulmuş (donuk) ürünlerimiz ise -18 derecede 1 yıla kadar tazeliğini korumaktadır."
    },
    {
      q: "Özel ambalaj veya marka çalışması yapıyor musunuz?",
      a: "Evet, belirli adetlerin üzerindeki toptan siparişlerinizde kurumunuza özel ambalaj (PL - Private Label) üretimimiz bulunmaktadır."
    }
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
       {/* FAQ Section */}
       <div className="bg-[#fcfcfc] border border-gray-100 shadow-sm rounded-xl p-8">
          <p className="text-brand-orange font-bold uppercase tracking-widest text-[11px] mb-2 font-sans">
             SIKÇA SORULAN SORULAR
          </p>
          <div className="flex flex-col mt-4">
             {faqs.map((faq, idx) => (
                <AccordionItem 
                  key={idx}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openIndex === idx}
                  onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                />
             ))}
          </div>
       </div>

       {/* Wholesale Banner Component */}
       <div className="bg-[#f0ece1] rounded-xl overflow-hidden shadow-sm relative flex flex-col justify-center p-8 lg:p-12 min-h-[300px]">
          {/* Background Decorative Image */}
          <div className="absolute inset-0 z-0 bg-[#f9f5ea]">
             <img 
               src="/images/lavas_stack.png" 
               alt="Toplu Lavaş" 
               className="absolute -right-20 -bottom-20 w-full max-w-[400px] h-auto object-contain mix-blend-multiply opacity-50 lg:opacity-80 drop-shadow-xl"
             />
          </div>

          <div className="relative z-10 w-full max-w-sm">
             <p className="text-gray-500 font-bold uppercase tracking-widest text-[11px] mb-2 font-sans">
               TOPTAN SİPARİŞ
             </p>
             <h2 className="text-[26px] lg:text-[30px] font-sans font-medium text-[#11462b] leading-[1.1] mb-4">
               Toptan Alım İçin <br/> Özel Teklif Alın
             </h2>
             <p className="text-gray-700 font-sans text-[14px] leading-relaxed mb-8">
               İşletmenize özel fiyatlarımızı öğrenmek ve avantajlı tekliflerden yararlanmak için bizimle iletişime geçin.
             </p>
             <Link href="/iletisim" className="inline-block px-8 py-3.5 bg-[#11462b] text-white font-sans font-bold text-[12px] rounded hover:bg-brand-green transition-colors shadow-md uppercase tracking-wider">
               TEKLİF İSTE
             </Link>
          </div>
       </div>
    </section>
  );
}
