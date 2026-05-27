'use client';

import React from 'react';
import { AdminStateProvider, AdminStateData } from '@/src/lib/adminState';

export default function ClientProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: AdminStateData;
}) {
  return React.createElement(AdminStateProvider, { initialData, children });
}
