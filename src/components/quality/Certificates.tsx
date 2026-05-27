import React from 'react';

export default function Certificates() {
  const certificates = [
    { title: "ISO 22000", desc: "Gıda Güvenliği", sub: "Yönetim Sistemi", img: "https://placehold.co/200x200/ffffff/555555?text=ISO" },
    { title: "HALAL", desc: "Helal Sertifikası", sub: "", img: "https://placehold.co/200x200/ffffff/555555?text=HALAL" },
    { title: "Yerli Üretim Belgesi", desc: "", sub: "", img: "https://placehold.co/200x200/ffffff/555555?text=YERLİ+ÜRETİM" },
    { title: "TSE Uygunluk Belgesi", desc: "", sub: "", img: "https://placehold.co/200x200/ffffff/555555?text=TSE" }
  ];

  return (
    <section>
      <div className="mb-10">
        <h2 className="text-[20px] font-sans font-bold text-gray-800 uppercase tracking-widest leading-tight mb-2">
          SERTİFİKALARIMIZ
        </h2>
        <p className="text-gray-500 font-sans text-[14px]">
          Ulusal ve uluslararası sertifikalarımızla kaliteyi belgeliyoruz.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {certificates.map((cert, index) => (
           <div key={index} className="bg-white border border-gray-100 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-shadow">
             <div className="h-28 mb-5 flex items-center justify-center w-full">
               <img src={cert.img} alt={cert.title} className="max-h-full max-w-full mix-blend-multiply opacity-80" />
             </div>
             <h4 className="font-sans font-bold text-gray-800 text-[15px] leading-tight mb-1.5">{cert.title}</h4>
             {cert.desc && <p className="font-sans text-gray-500 text-[13px]">{cert.desc}</p>}
             {cert.sub && <p className="font-sans text-gray-500 text-[13px]">{cert.sub}</p>}
           </div>
         ))}
      </div>
    </section>
  );
}
