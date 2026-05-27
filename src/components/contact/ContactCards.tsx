"use client";

import React from 'react';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import { useAdminState } from '../../lib/adminState';

export default function ContactCards() {
  const { contact } = useAdminState();

  const cards = [
    {
      icon: <Phone className="w-7 h-7 text-[#11462b]" />,
      title: "Telefon",
      sub: contact.phoneSub,
      value: contact.phone
    },
    {
      icon: <MessageCircle className="w-7 h-7 text-[#11462b]" />,
      title: "WhatsApp",
      sub: contact.whatsappSub,
      value: contact.whatsapp
    },
    {
      icon: <Mail className="w-7 h-7 text-[#11462b]" />,
      title: "E-Posta",
      sub: contact.emailSub,
      value: contact.email
    },
    {
      icon: <MapPin className="w-7 h-7 text-[#11462b]" />,
      title: contact.addressTitle,
      sub: contact.addressSub,
      value: contact.addressValue
    }
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative -mt-20 z-20">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 flex flex-col items-center text-center border border-gray-100/50 hover:border-gray-200 transition-colors">
          <div className="w-14 h-14 rounded-full bg-[#f3eedd] flex items-center justify-center mb-5 shrink-0">
            {card.icon}
          </div>
          <h3 className="font-sans font-bold text-gray-800 text-[16px] mb-2">{card.title}</h3>
          <p className="font-sans text-gray-500 text-[12px] mb-1.5">{card.sub}</p>
          <p className="font-sans font-bold text-[#11462b] text-[15px]">{card.value}</p>
        </div>
      ))}
    </section>
  );
}
