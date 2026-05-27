"use client";

import React, { useRef, useState } from 'react';
import { Upload, X, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  hint?: string;
}

export default function ImageUploader({ 
  value, 
  onChange, 
  label = 'Görsel Yükle / URL Ekle', 
  placeholder = 'Görsel url bağlantısını yapıştırın...',
  hint = 'Bir görsel seçin veya internetten bir görsel bağlantısı yapıştırın.'
}: ImageUploaderProps) {
  const [mode, setMode] = useState<'upload' | 'url'>(value && value.startsWith('http') && !value.includes('/uploads/') && !value.includes('cdn.hilallavas.com') && !value.includes('r2.cloudflarestorage.com') ? 'url' : 'upload');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check client-side limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya boyutu çok büyük! Lütfen 5MB'tan küçük bir görsel seçin.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Yükleme başarısız oldu.');
      }

      if (data.url) {
        onChange(data.url);
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      alert('Görsel yüklenemedi: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">
          {label}
        </label>
        <div className="flex bg-gray-100 rounded-md p-0.5">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 text-[10px] font-bold uppercase rounded flex items-center gap-1 transition-all ${
              mode === 'upload' ? 'bg-white shadow-sm text-[#11462b]' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Upload size={12} /> Yükle
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 text-[10px] font-bold uppercase rounded flex items-center gap-1 transition-all ${
              mode === 'url' ? 'bg-white shadow-sm text-[#11462b]' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <LinkIcon size={12} /> URL
          </button>
        </div>
      </div>

      <div className="mt-1">
        {mode === 'url' ? (
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder={placeholder}
              value={value && (value.startsWith('http') && !value.includes('/uploads/') && !value.includes('cdn.hilallavas.com') && !value.includes('r2.cloudflarestorage.com')) ? value : ''}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold bg-white text-gray-800 font-sans transition-all" 
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {value ? (
              <div className="relative w-full h-32 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center group overflow-hidden">
                <img src={value} alt="Preview" className="h-full object-contain" />
                {!uploading && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg transform scale-90 group-hover:scale-100"
                  >
                    <X size={16} />
                  </button>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-2">
                    <Loader2 className="w-6 h-6 text-[#11462b] animate-spin" />
                    <span className="text-[11px] font-bold text-[#11462b] tracking-wider uppercase">Görsel Yükleniyor...</span>
                  </div>
                )}
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative">
                {uploading ? (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Loader2 className="w-8 h-8 text-[#11462b] animate-spin mb-2" />
                    <p className="text-sm text-[#11462b] font-bold uppercase tracking-wider">Buluta Yükleniyor...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 font-semibold">Tıklayarak bir görsel seçin</p>
                    <p className="text-xs text-gray-400">PNG, JPG, SVG (Max: 5MB)</p>
                  </div>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </label>
            )}
          </div>
        )}
      </div>
      
      {hint && <p className="text-[10px] text-gray-400 font-medium leading-normal mt-0.5">{hint}</p>}
    </div>
  );
}
