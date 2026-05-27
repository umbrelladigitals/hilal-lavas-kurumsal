"use client";

import React from 'react';
import { Mail, Phone, Instagram, Facebook, Youtube, Search, Settings } from 'lucide-react';
import Link from 'next/link';
import { useAdminState } from '../../lib/adminState';

export default function Header() {
  const { contact } = useAdminState();

  return (
    <header className="w-full bg-white relative z-50">
      {/* Top Bar */}
      <div className="w-full border-b border-gray-100 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-4">
          </div>
          <div className="flex items-center gap-6">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-brand-orange transition-colors">
              <Mail size={14} /> {contact.email}
            </a>
            <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-brand-orange transition-colors">
              <Phone size={14} /> {contact.phone}
            </a>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/hilallavash" target="_blank" rel="noreferrer" className="hover:text-brand-orange transition-colors"><Instagram size={14} /></a>
              <a href="https://www.facebook.com/hilallavash" target="_blank" rel="noreferrer" className="hover:text-brand-orange transition-colors"><Facebook size={14} /></a>
              <a href="https://www.youtube.com/@hilallavash" target="_blank" rel="noreferrer" className="hover:text-brand-orange transition-colors"><Youtube size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/hilallavas_logo.svg" alt="Hilal Lavaş" className="h-24 w-auto object-contain animate-fade-in" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 font-sans font-medium text-[15px] text-gray-800 tracking-wide uppercase">
          <Link href="/" className="hover:text-brand-orange transition-colors">ANA SAYFA</Link>
          <div className="group relative">
            <Link href="/urunler" className="flex items-center gap-1 hover:text-brand-orange transition-colors uppercase cursor-pointer text-[15px]">
              ÜRÜNLER <span className="text-[10px] sm:mt-0.5">▼</span>
            </Link>
            {/* Simple Dropdown placeholder */}
            <div className="absolute top-full left-0 mt-6 w-48 bg-white shadow-lg border border-gray-100 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link href="/urunler#lavas" className="block px-4 py-2 hover:bg-gray-50 hover:text-brand-orange">Lavaş</Link>
              <Link href="/urunler#tirnakli-pide" className="block px-4 py-2 hover:bg-gray-50 hover:text-brand-orange">Tırnaklı Pide</Link>
              <Link href="/urunler#tortilla" className="block px-4 py-2 hover:bg-gray-50 hover:text-brand-orange">Tortilla</Link>
              <Link href="/urunler#gobit" className="block px-4 py-2 hover:bg-gray-50 hover:text-brand-orange">Gobit</Link>
            </div>
          </div>
          <div className="group relative">
            <Link href="/kurumsal" className="flex items-center gap-1 hover:text-brand-orange transition-colors uppercase cursor-pointer text-[15px]">
              KURUMSAL <span className="text-[10px] sm:mt-0.5">▼</span>
            </Link>
            <div className="absolute top-full left-0 mt-6 w-48 bg-white shadow-lg border border-gray-100 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link href="/kurumsal#hakkimizda" className="block px-4 py-2 hover:bg-gray-50 hover:text-brand-orange">Hakkımızda</Link>
              <Link href="/kurumsal#vizyon-misyon" className="block px-4 py-2 hover:bg-gray-50 hover:text-brand-orange">Vizyon & Misyon</Link>
              <Link href="/kurumsal#degerlerimiz" className="block px-4 py-2 hover:bg-gray-50 hover:text-brand-orange">Değerlerimiz</Link>
            </div>
          </div>
          <Link href="/kalite" className="hover:text-brand-orange transition-colors text-[15px]">KALİTE</Link>
          <Link href="/tarifler" className="hover:text-brand-orange transition-colors text-[15px]">TARİFLER</Link>
          <Link href="/iletisim" className="hover:text-brand-orange transition-colors text-[15px]">İLETİŞİM</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link href="/iletisim" className="bg-[#11462b] text-white font-semibold text-[14px] px-6 py-2.5 rounded hover:bg-[#1e5c3c] transition-colors tracking-wide shadow-sm">
            TOPTAN SİPARİŞ
          </Link>
          <button className="text-gray-800 hover:text-brand-orange transition-colors">
            <Search size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
