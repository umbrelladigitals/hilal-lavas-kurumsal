"use client";

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useAdminState } from '../../lib/adminState';

export default function Footer() {
  const { contact } = useAdminState();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="flex flex-col">
            <Link href="/" className="mb-4 inline-block">
              <img src="/hilallavas_logo.svg" alt="Hilal Lavaş" className="h-24 w-auto object-contain" />
            </Link>
            <p className="text-gray-800 font-bold font-sans text-sm mb-2">Hilal Lavaş Pide Unlu Mamüller<br />Tic. Ltd. Şti.</p>
            <p className="text-gray-500 text-sm font-serif italic mb-6">Gelenekten Geleceğe...</p>
          </div>

          {/* Links Col 1 - KURUMSAL & ÜRÜNLER */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="font-sans font-bold text-sm text-gray-900 tracking-wider mb-4 uppercase">KURUMSAL</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li><Link href="/kurumsal" className="hover:text-brand-orange transition-colors">Hakkımızda</Link></li>
                <li><Link href="/kurumsal#vizyon-misyon" className="hover:text-brand-orange transition-colors">Vizyon & Misyon</Link></li>
                <li><Link href="/kalite" className="hover:text-brand-orange transition-colors">Kalite Politikamız</Link></li>
                <li><Link href="/kurumsal#degerlerimiz" className="hover:text-brand-orange transition-colors">Değerlerimiz</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-gray-900 tracking-wider mb-4 uppercase">ÜRÜNLER</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-brand-orange transition-colors">Lavaş</Link></li>
                <li><Link href="#" className="hover:text-brand-orange transition-colors">Tırnaklı Pide</Link></li>
                <li><Link href="#" className="hover:text-brand-orange transition-colors">Tortilla</Link></li>
                <li><Link href="#" className="hover:text-brand-orange transition-colors">Gobit</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Col */}
          <div>
            <div className="flex gap-16 mb-6">
              <div>
                <h4 className="font-sans font-bold text-sm text-gray-900 tracking-wider mb-4 uppercase">DESTEK</h4>
                <ul className="flex flex-col gap-3 text-sm text-gray-600">
                  <li><Link href="/iletisim#sss" className="hover:text-brand-orange transition-colors">Sıkça Sorulan Sorular</Link></li>
                  <li><Link href="/tarifler" className="hover:text-brand-orange transition-colors">Tarifler</Link></li>
                  <li><Link href="/iletisim" className="hover:text-brand-orange transition-colors">İletişim</Link></li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-sans font-bold text-sm text-gray-900 tracking-wider mb-4 uppercase">İLETİŞİM</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 text-brand-green" />
                  <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:text-brand-orange transition-colors">
                    {contact.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-brand-green" />
                  <a href={`mailto:${contact.email}`} className="hover:text-brand-orange transition-colors">{contact.email}</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 text-brand-green" />
                  <span>{contact.addressSub}<br />{contact.addressValue}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-sans pb-[20px]">
          <p>© 2025 Hilal Lavaş. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-brand-orange transition-colors">KVKK</Link>
            <Link href="#" className="hover:text-brand-orange transition-colors border-l border-gray-300 pl-6">Kullanım Şartları</Link>
            <Link href="#" className="hover:text-brand-orange transition-colors border-l border-gray-300 pl-6">Gizlilik Politikası</Link>
          </div>
        </div>
      </div>
      
      {/* Sticky WhatsApp Order Button - Hidden on mobile (replaced by Floating FAB) */}
      <a 
        href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-0 right-10 bg-[#25D366] text-white px-8 py-3 rounded-t-xl hover:bg-[#20b858] transition-colors items-center gap-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] group min-w-[200px] justify-center hidden md:flex"
      >
        {/* Simple mock speech bubble path for whatsapp icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:scale-110 transition-transform">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        <span className="font-bold text-[15px] tracking-wide ml-1">WhatsApp ile Sipariş Ver</span>
      </a>
    </footer>
  );
}
