"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import FloatingSocialBar from '../layout/FloatingSocialBar';
import { Leaf, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { useAdminState } from '../../lib/adminState';

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useAdminState();
  
  const prodItem = products.find(p => p.id === id) || products.find(p => p.category !== 'showcase') || products[0];

  // Use correct image based on category
  let defaultImg = "https://placehold.co/600x800/e5e7eb/a1a1aa?text=LAVAS+PAKET";
  let catName = "Lavaş";
  if (prodItem?.category === 'gobit') {
    defaultImg = "https://placehold.co/600x800/f8f9fa/9a6b1f?text=GOBIT+PAKET";
    catName = "Gobit";
  } else if (prodItem?.category === 'tirnakli') {
    defaultImg = "https://placehold.co/600x800/f8f9fa/b5531d?text=PIDE+PAKET";
    catName = "Tırnaklı Pide";
  } else if (prodItem?.category === 'tortilla') {
    defaultImg = "https://placehold.co/600x800/f8f9fa/22804d?text=TORTILLA+PAKET";
    catName = "Tortilla";
  } else if (prodItem?.category === 'showcase') {
    catName = "Öne Çıkan Ürün";
  }

  const product = {
    title: (prodItem?.name || prodItem?.category || "LAVAŞ").toUpperCase(),
    subtitle: prodItem?.title || "35x35 cm",
    count: prodItem?.count || "20 ADET",
    weight: `NET: ${prodItem?.weight || "90 g"}`,
    desc: prodItem?.description || `Doğal malzemelerle geleneksel yöntemlerle üretilen Hilal ${catName}, yumuşak dokusu ve uzun raf ömrü ile profesyonel mutfakların vazgeçilmezidir.`,
    images: prodItem?.image ? [prodItem.image] : [defaultImg],
    features: [
      { icon: <Leaf strokeWidth={1.5} />, label: "Katkısız Üretim" },
      { icon: <CheckCircle2 strokeWidth={1.5} />, label: "%100 Doğal İçerik" },
      { icon: <ShieldCheck strokeWidth={1.5} />, label: "Taş Fırın Lezzeti" },
      { icon: <Clock strokeWidth={1.5} />, label: "Günlük Tazelik" },
      { icon: <CheckCircle2 strokeWidth={1.5} />, label: "Türk Gıda Kodeksi Uyumlu" },
    ],
    series: [
      { size: prodItem?.title || "35x35 cm", count: prodItem?.count || "20 Adet", weight: prodItem?.weight || "90 g" }
    ],
    packing: [
      { label: "Paket İçi", value: prodItem?.count || "20 Adet" },
      { label: "Paket Gramajı", value: prodItem?.weight || "90 g" },
      { label: "Ambalaj Türü", value: "BOPP OPP / CPP" },
    ],
    box: [
      { label: "Koli İçi Paket Adedi", value: "12 Paket" },
      { label: "Nakliye Tipi", value: "Serin & Kuru Sevk" }
    ]
  };

  const [activeImg, setActiveImg] = useState<string | null>(null);
  const mainImg = activeImg || product.images[0];

  useEffect(() => {
    setActiveImg(null);
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-hidden bg-white">
      <Header />
      <main className="flex-grow flex flex-col">
          <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {/* Breadcrumb */}
            <div className="text-[12px] text-gray-500 font-sans tracking-wide mb-8">
              <Link href="/" className="hover:text-brand-orange cursor-pointer transition-colors">Ana Sayfa</Link> <span className="mx-1">&gt;</span> 
              <Link href="/urunler" className="hover:text-brand-orange cursor-pointer transition-colors">Ürünler</Link> <span className="mx-1">&gt;</span> 
              <span className="hover:text-brand-orange cursor-pointer transition-colors">Lavaş</span> <span className="mx-1">&gt;</span>
              <span className="text-gray-900 font-medium">{product.title} {product.subtitle}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
               {/* Left: Images */}
               <div className="flex flex-col gap-4">
                  <div className="w-full bg-[#f8f9fa] rounded-[4px] border border-gray-100 flex items-center justify-center p-8 aspect-[3/4] overflow-hidden shadow-sm">
                    <img src={mainImg} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                     {product.images.map((img, idx) => (
                       <button 
                          key={idx}
                          onClick={() => setActiveImg(img)}
                          className={`w-20 h-20 shrink-0 bg-[#f8f9fa] rounded-[4px] border flex items-center justify-center overflow-hidden p-2 transition-all shadow-sm ${mainImg === img ? 'border-[#11462b] opacity-100' : 'border-gray-200 opacity-60 hover:opacity-100'}`}
                       >
                          <img src={img} alt="Thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
                       </button>
                     ))}
                  </div>
               </div>

               {/* Right: Info */}
               <div className="flex flex-col pt-2">
                  <h1 className="text-[28px] lg:text-[36px] font-sans font-bold text-[#11462b] leading-[1.1] uppercase">
                    {product.title}
                  </h1>
                  <h2 className="text-[22px] lg:text-[26px] font-sans font-bold text-brand-orange mt-1 mb-6">
                    {product.subtitle}
                  </h2>
                  
                  <div className="flex items-center gap-4 mb-6">
                     <span className="inline-flex items-center gap-2 text-gray-500 font-sans text-[12px] border border-gray-200 rounded px-3 py-1.5 font-semibold">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
                       {product.count}
                     </span>
                     <span className="inline-flex items-center gap-2 text-gray-500 font-sans text-[12px] border border-gray-200 rounded px-3 py-1.5 font-semibold">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973M13 22l-1-1v-4"/></svg>
                        {product.weight}
                     </span>
                  </div>

                  <p className="font-sans text-[14px] text-gray-600 leading-relaxed mb-8 font-medium">
                    {product.desc}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10 border-b border-gray-100 pb-10">
                     {product.features.map((feat, idx) => (
                       <div key={idx} className="flex flex-col items-center text-center gap-3">
                          <div className="text-[#11462b] w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 shrink-0">
                             {React.cloneElement(feat.icon as React.ReactElement<any>, { className: 'w-5 h-5' })}
                          </div>
                          <span className="font-sans text-[10px] text-gray-600 font-bold uppercase tracking-wider px-1">{feat.label}</span>
                       </div>
                     ))}
                  </div>

                  {/* Tables */}
                  <div className="flex flex-col gap-8">
                     <div>
                       <h3 className="font-sans font-bold text-[#11462b] text-[15px] uppercase tracking-wider mb-4 border-l-4 border-brand-orange pl-3">ÜRÜN SERİSİ</h3>
                       <table className="w-full text-left font-sans text-[13px]">
                         <thead>
                           <tr className="border-b border-[#11462b]/20">
                              <th className="py-2.5 text-[#11462b] font-bold">Ürün Ölçüsü</th>
                              <th className="py-2.5 text-[#11462b] font-bold text-center">Adet</th>
                              <th className="py-2.5 text-[#11462b] font-bold text-right">Net Gramaj</th>
                           </tr>
                         </thead>
                         <tbody>
                           {product.series.map((row, idx) => (
                             <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                               <td className="py-3 text-gray-800 font-bold">{row.size}</td>
                               <td className="py-3 text-gray-600 text-center">{row.count}</td>
                               <td className="py-3 text-gray-600 text-right">{row.weight}</td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                     </div>

                     <div>
                       <h3 className="font-sans font-bold text-[#11462b] text-[15px] uppercase tracking-wider mb-4 border-l-4 border-brand-orange pl-3">PAKETLEME BİLGİLERİ</h3>
                       <div className="flex flex-col text-[13px] font-sans">
                         {product.packing.map((row, idx) => (
                           <div key={idx} className="flex py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                             <div className="w-1/2 font-bold text-gray-800 pl-2">{row.label}</div>
                             <div className="w-1/2 text-gray-600 pr-2">{row.value}</div>
                           </div>
                         ))}
                       </div>
                     </div>

                     <div>
                       <h3 className="font-sans font-bold text-[#11462b] text-[15px] uppercase tracking-wider mb-4 border-l-4 border-brand-orange pl-3">KOLİ BİLGİLERİ</h3>
                       <div className="flex flex-col text-[13px] font-sans">
                         {product.box.map((row, idx) => (
                           <div key={idx} className="flex py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                             <div className="w-1/2 font-bold text-gray-800 pl-2">{row.label}</div>
                             <div className="w-1/2 text-gray-600 pr-2">{row.value}</div>
                           </div>
                         ))}
                       </div>
                     </div>

                  </div>
               </div>
            </div>
          </div>
      </main>
      <Footer />
      <FloatingSocialBar />
    </div>
  );
}
