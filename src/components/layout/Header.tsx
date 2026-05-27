"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Instagram, Facebook, Youtube, Search, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useAdminState } from '../../lib/adminState';

export default function Header() {
  const { contact } = useAdminState();
  const [activeLang, setActiveLang] = useState('tr');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    {
      code: 'tr',
      label: 'Türkçe',
      shortLabel: 'TR',
      flag: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 rounded-full overflow-hidden shadow-sm flex-shrink-0">
          <rect width="24" height="24" fill="#e30a17"/>
          <circle cx="9.5" cy="12" r="5" fill="#fff"/>
          <circle cx="11" cy="12" r="4" fill="#e30a17"/>
          <polygon points="15.5,12 13.5,13.5 14,11 12,9.5 14.5,9.5" fill="#fff"/>
        </svg>
      )
    },
    {
      code: 'en',
      label: 'English',
      shortLabel: 'EN',
      flag: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 rounded-full overflow-hidden shadow-sm flex-shrink-0">
          <rect width="24" height="24" fill="#00247d"/>
          <path d="M0,0 L24,24 M24,0 L0,24" stroke="#fff" strokeWidth="3"/>
          <path d="M0,0 L24,24 M24,0 L0,24" stroke="#cf142b" strokeWidth="1.5"/>
          <path d="M12,0 L12,24 M0,12 L24,12" stroke="#fff" strokeWidth="5"/>
          <path d="M12,0 L12,24 M0,12 L24,12" stroke="#cf142b" strokeWidth="3"/>
        </svg>
      )
    },
    {
      code: 'ar',
      label: 'العربية',
      shortLabel: 'AR',
      flag: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 rounded-full overflow-hidden shadow-sm flex-shrink-0">
          <rect width="24" height="24" fill="#007a3d"/>
          <path d="M0,8 H24 V24 H0 Z" fill="#ffffff"/>
          <path d="M0,16 H24 V24 H0 Z" fill="#000000"/>
          <path d="M0,0 L8,12 L0,24 Z" fill="#ce1126"/>
        </svg>
      )
    }
  ];

  useEffect(() => {
    const getActiveLanguage = () => {
      if (typeof document === 'undefined') return 'tr';
      const cookies = document.cookie.split(';');
      const googtransCookie = cookies.find(c => c.trim().startsWith('googtrans='));
      if (googtransCookie) {
        const value = googtransCookie.split('=')[1];
        const parts = value.split('/');
        const lang = parts[parts.length - 1];
        if (['tr', 'en', 'ar'].includes(lang.toLowerCase())) {
          return lang.toLowerCase();
        }
      }
      return 'tr';
    };

    setActiveLang(getActiveLanguage());

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    if (typeof document !== 'undefined') {
      if (langCode === 'tr') {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.hilallavas.com";
      } else {
        document.cookie = `googtrans=/tr/${langCode}; path=/;`;
        document.cookie = `googtrans=/tr/${langCode}; path=/; domain=.hilallavas.com`;
      }
    }
    setActiveLang(langCode);
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const currentLangOption = languages.find(l => l.code === activeLang) || languages[0];

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
          {/* Custom Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 border border-gray-200 hover:border-[#11462b] rounded-full px-3 py-1.5 bg-white text-gray-700 hover:text-[#11462b] font-semibold text-[13px] transition-all cursor-pointer shadow-sm focus:outline-none"
            >
              {currentLangOption.flag}
              <span>{currentLangOption.shortLabel}</span>
              <ChevronDown size={12} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-lg shadow-xl py-1.5 z-50 animate-fade-in">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center gap-2.5 px-4 py-2 text-left text-[13px] font-medium transition-colors cursor-pointer ${
                      activeLang === lang.code
                        ? 'bg-[#f4fbf7] text-[#11462b]'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#11462b]'
                    }`}
                  >
                    {lang.flag}
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

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

