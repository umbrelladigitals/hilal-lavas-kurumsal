"use client";

import React from 'react';
import { Phone, Instagram, Facebook } from 'lucide-react';
import { MessageCircle } from 'lucide-react'; // Appending WhatsApp like icon
import { useAdminState } from '../../lib/adminState';

export default function FloatingSocialBar() {
  const { contact } = useAdminState();

  return (
    <div className="fixed right-0 top-1/3 flex flex-col gap-0 z-50 bg-white shadow-[0px_4px_15px_rgba(0,0,0,0.1)] rounded-l-2xl border border-gray-100 py-4 overflow-hidden">
      
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
  );
}
