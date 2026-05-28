"use client";

import React from 'react';
import { Phone, Instagram, Facebook } from 'lucide-react';
import { MessageCircle } from 'lucide-react'; // Appending WhatsApp like icon
import { useAdminState } from '../../lib/adminState';

export default function FloatingSocialBar() {
  const { contact } = useAdminState();

  return (
    <>
      {/* Desktop Vertical Social Bar - Hidden on Mobile */}
      <div className="fixed right-0 top-1/3 flex flex-col gap-0 z-50 bg-white shadow-[0px_4px_15px_rgba(0,0,0,0.1)] rounded-l-2xl border border-gray-100 py-4 overflow-hidden hidden md:flex">
        
        <a 
          href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} 
          target="_blank" 
          rel="noreferrer" 
          className="w-[90px] h-[80px] bg-white flex flex-col items-center justify-center text-[#25D366] hover:bg-gray-50 transition-colors group relative px-2"
        >
          <MessageCircle size={32} strokeWidth={2} />
          <span className="text-[13px] font-medium text-gray-800 mt-2">WhatsApp</span>
        </a>
        
        <div className="w-8/12 mx-auto h-px bg-gray-100 my-0.5"></div>

        <a 
          href={`tel:${contact.phone.replace(/\s+/g, '')}`} 
          className="w-[90px] h-[80px] bg-white flex flex-col items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors group relative px-2"
        >
          <Phone size={30} strokeWidth={2} />
          <span className="text-[13px] font-medium text-gray-700 mt-2">Hemen Ara</span>
        </a>

        <div className="w-8/12 mx-auto h-px bg-gray-100 my-0.5"></div>

        <a 
          href="https://www.instagram.com/hilallavash" 
          target="_blank" 
          rel="noreferrer" 
          className="w-[90px] h-[80px] bg-white flex flex-col items-center justify-center text-[#E1306C] hover:bg-gray-50 transition-colors group relative px-2"
        >
          <Instagram size={30} strokeWidth={2} />
          <span className="text-[13px] font-medium text-gray-800 mt-2">Instagram</span>
        </a>

        <div className="w-8/12 mx-auto h-px bg-gray-100 my-0.5"></div>

        <a 
          href="https://www.facebook.com/hilallavash" 
          target="_blank" 
          rel="noreferrer" 
          className="w-[90px] h-[80px] bg-white flex flex-col items-center justify-center text-[#1877F2] hover:bg-gray-50 transition-colors group relative px-2"
        >
          <Facebook size={30} strokeWidth={2} />
          <span className="text-[13px] font-medium text-gray-800 mt-2">Facebook</span>
        </a>

        <div className="w-8/12 mx-auto h-px bg-gray-100 my-0.5"></div>

        <a href="#" className="w-[90px] h-[80px] bg-white flex flex-col items-center justify-center text-brand-green hover:bg-gray-50 transition-colors group relative px-2">
          <div className="w-8 h-8 border-[2.5px] border-current rounded-md relative flex items-center justify-center mb-0.5">
              <span className="text-[min(10px)] leading-none rounded-full bg-current w-2 h-2"></span>
          </div>
          <span className="text-[13px] font-bold mt-1 text-center leading-[1.1]">E-Katalog</span>
        </a>

      </div>

      {/* Mobile Floating WhatsApp FAB - Pulses and sits safely above the BottomNav */}
      <a 
        href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} 
        target="_blank" 
        rel="noreferrer" 
        className="fixed bottom-[80px] right-4 z-50 flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-[0_4px_12px_rgba(37,211,102,0.4)] hover:bg-[#20b858] transition-transform hover:scale-105 active:scale-95 animate-pulse md:hidden"
        aria-label="WhatsApp Destek Hattı"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.288 1.487 4.908 1.488 5.37-.001 9.743-4.372 9.746-9.743.002-2.585-1.002-5.02-2.825-6.845-1.824-1.825-4.262-2.83-6.853-2.831-5.378 0-9.754 4.374-9.756 9.75-.001 1.706.46 3.374 1.332 4.839l-1.02 3.722 3.822-1.002h-.002zm10.75-5.922c-.287-.144-1.7-.84-1.962-.935-.262-.096-.453-.144-.644.144-.191.288-.738.936-.905 1.129-.166.19-.332.215-.618.072-.287-.144-1.21-.446-2.305-1.424-.852-.76-1.428-1.7-1.594-1.986-.167-.287-.018-.442.124-.585.129-.128.287-.335.43-.503.144-.167.19-.287.287-.479.095-.192.048-.36-.024-.503-.072-.143-.644-1.554-.882-2.13-.233-.564-.47-.487-.644-.496-.167-.008-.358-.01-.55-.01-.19 0-.5.07-.762.36-.262.287-1.002.983-1.002 2.399 0 1.417 1.03 2.784 1.173 2.976.143.19 2.028 3.1 4.912 4.346.685.297 1.22.474 1.637.607.69.219 1.317.189 1.812.115.553-.082 1.7-.694 1.938-1.365.238-.67.238-1.244.167-1.364-.07-.12-.26-.192-.547-.336z"/>
        </svg>
      </a>
    </>
  );
}
