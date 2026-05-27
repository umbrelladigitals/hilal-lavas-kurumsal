"use client";

import React from 'react';
import { Instagram, Facebook, Youtube, Linkedin, MessageCircle } from 'lucide-react';
import { useAdminState } from '../../lib/adminState';

export default function SocialWhatsAppBanner() {
  const { contact } = useAdminState();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden bg-[#11462b] shadow-xl text-white">
       {/* Left block - Socials */}
       <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
         <p className="text-[#a5c0b1] font-sans font-bold uppercase tracking-widest text-[11px] mb-3">
           BİZİ TAKİP EDİN
         </p>
         <h2 className="text-[28px] lg:text-[32px] font-sans font-medium text-white mb-4">
           Sosyal Medyada Biz
         </h2>
         <p className="text-[#cce8d7] font-sans text-[14px] leading-relaxed mb-8 max-w-sm">
           Yenilikler, kampanyalar ve lezzetli tarifler için bizi sosyal medya hesaplarımızdan takip edin.
         </p>
         
         <div className="flex gap-4">
           <a href="https://www.instagram.com/hilallavash" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#11462b] transition-all">
             <Instagram size={20} />
           </a>
           <a href="https://www.facebook.com/hilallavash" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#11462b] transition-all">
             <Facebook size={20} />
           </a>
           <a href="https://www.youtube.com/@hilallavash" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#11462b] transition-all">
             <Youtube size={20} />
           </a>
           <a href="https://www.linkedin.com/company/hilallavash" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#11462b] transition-all">
             <Linkedin size={20} />
           </a>
         </div>
       </div>

       {/* Right block - WhatsApp */}
       <div className="p-10 lg:p-14 relative flex flex-col justify-center overflow-hidden">
         <p className="text-[#a5c0b1] font-sans font-bold uppercase tracking-widest text-[11px] mb-3 relative z-10">
           WHATSAPP İLE HEMEN ULAŞIN
         </p>
         <h2 className="text-[28px] lg:text-[32px] font-sans font-medium text-white mb-4 relative z-10">
           Hızlı Destek Hattımız
         </h2>
         <p className="text-[#cce8d7] font-sans text-[14px] leading-relaxed mb-8 max-w-sm relative z-10">
           Sipariş, ürün bilgisi veya diğer talepleriniz için WhatsApp hattımızdan bize yazabilirsiniz.
         </p>
         
         <div className="relative z-10">
           <a 
             href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} 
             target="_blank" 
             rel="noreferrer" 
             className="inline-flex items-center gap-3 px-6 py-3 border border-white/30 rounded-full hover:bg-white hover:text-[#11462b] transition-all font-sans font-bold text-[12px] uppercase tracking-widest"
           >
             WHATSAPP'A YAZ
             <MessageCircle className="w-5 h-5 animate-pulse" />
           </a>
         </div>

         {/* Phone Mockup visual */}
         <div className="absolute right-0 bottom-0 translate-x-12 translate-y-24 lg:translate-x-4 lg:translate-y-12 w-[220px] h-auto pointer-events-none opacity-50 lg:opacity-100 hidden sm:block">
            <img src="/images/whatsapp_phone.png" alt="WhatsApp Mockup" className="w-full h-full object-cover rounded-t-3xl border-8 border-gray-800" />
         </div>
       </div>
    </section>
  );
}
