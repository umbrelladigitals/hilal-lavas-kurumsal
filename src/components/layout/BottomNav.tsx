"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, BookOpen, Info, PhoneCall } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  // Helper to determine if a route is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    {
      label: 'Ana Sayfa',
      path: '/',
      icon: <Home size={20} strokeWidth={isActive('/') ? 2.5 : 2} />
    },
    {
      label: 'Ürünler',
      path: '/urunler',
      icon: <Grid size={20} strokeWidth={isActive('/urunler') ? 2.5 : 2} />
    },
    {
      label: 'Tarifler',
      path: '/tarifler',
      icon: <BookOpen size={20} strokeWidth={isActive('/tarifler') ? 2.5 : 2} />
    },
    {
      label: 'Kurumsal',
      path: '/kurumsal',
      icon: <Info size={20} strokeWidth={isActive('/kurumsal') ? 2.5 : 2} />
    },
    {
      label: 'İletişim',
      path: '/iletisim',
      icon: <PhoneCall size={20} strokeWidth={isActive('/iletisim') ? 2.5 : 2} />
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full h-[66px] bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] z-50 flex items-center justify-around md:hidden px-2 pb-safe">
      {navItems.map((item) => {
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full py-2.5 transition-all duration-300 relative ${
              active 
                ? 'text-[#11462b]' 
                : 'text-gray-400 hover:text-[#11462b]'
            }`}
          >
            {/* Active Dot Indicator */}
            {active && (
              <span className="absolute top-1.5 w-1 h-1 rounded-full bg-[#11462b] animate-fade-in" />
            )}
            
            <div className={`transition-transform duration-300 ${active ? '-translate-y-0.5 scale-105' : ''}`}>
              {item.icon}
            </div>
            
            <span className={`text-[10px] font-sans font-bold mt-1 leading-none tracking-wide transition-colors ${
              active ? 'text-[#11462b] font-extrabold' : 'text-gray-500 font-medium'
            }`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
