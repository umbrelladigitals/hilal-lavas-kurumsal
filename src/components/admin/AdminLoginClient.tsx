'use client';

import React, { useState, useTransition } from 'react';
import { loginAction } from '@/src/app/actions';
import { ShieldAlert, Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginClient() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const res = await loginAction(formData);
      if (res.success) {
        // Successful login, refresh the page to load AdminDashboard on server
        window.location.reload();
      } else {
        setError(res.error || 'Giriş yapılamadı.');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#072415] via-[#0d3822] to-[#145233] px-4 py-12 font-sans relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-orange/10 blur-[100px] -top-20 -left-20"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[100px] -bottom-20 -right-20"></div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 text-[13px] font-bold tracking-wide uppercase transition-colors"
        >
          <ArrowLeft size={16} /> Siteye Geri Dön
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10 relative">
          
          {/* Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange to-[#ea7a00]"></div>
          
          <div className="p-8 sm:p-10 flex flex-col items-center">
            
            {/* Logo Sim */}
            <div className="flex flex-col items-center mb-6">
              <img src="/hilallavas_logo.svg" alt="Hilal Lavaş" className="h-24 w-auto object-contain" />
            </div>

            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#11462b] mb-4">
              <Lock size={20} />
            </div>

            <h2 className="text-xl font-bold text-[#11462b] mb-1 tracking-tight">Yönetici Girişi</h2>
            <p className="text-gray-500 text-[13px] text-center font-medium mb-8">Web sitesi dinamik içeriklerini düzenlemek için giriş yapın.</p>

            {/* Error Notification */}
            {error && (
              <div className="w-full flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4 text-red-800 text-[13px] font-semibold mb-6 animate-shake">
                <ShieldAlert className="w-5 h-5 shrink-0 text-red-500" />
                <p className="leading-snug">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} method="POST" className="w-full flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider pl-1">
                  Kullanıcı Adı
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <User size={16} />
                  </span>
                  <input 
                    name="username"
                    type="text" 
                    required
                    placeholder="kullanıcı adı..."
                    disabled={isPending}
                    className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#11462b]/20 focus:border-[#11462b] text-[13px] font-semibold bg-white text-gray-800 transition-all outline-none" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider pl-1">
                  Şifre
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <Lock size={16} />
                  </span>
                  <input 
                    name="password"
                    type="password" 
                    required
                    placeholder="••••••••"
                    disabled={isPending}
                    className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#11462b]/20 focus:border-[#11462b] text-[13px] font-semibold bg-white text-gray-800 transition-all outline-none" 
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-[#11462b] hover:bg-[#1a5538] disabled:bg-gray-400 text-white font-bold text-[13px] tracking-widest rounded-xl uppercase flex items-center justify-center gap-2 transition-all mt-4 shadow-lg shadow-emerald-950/20 active:scale-[0.98]"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Doğanıyor...
                  </>
                ) : (
                  'Giriş Yap'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
