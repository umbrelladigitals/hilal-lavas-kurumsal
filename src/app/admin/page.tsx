import React from 'react';
import { getSession } from '@/src/lib/auth';
import { getAllData } from '@/src/lib/getData';
import ClientProvider from '@/src/components/ClientProvider';
import AdminDashboard from '@/src/components/admin/AdminDashboard';
import AdminLoginClient from '@/src/components/admin/AdminLoginClient';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const sessionUser = await getSession();

  if (!sessionUser) {
    // Render the beautiful, secure login screen
    return <AdminLoginClient />;
  }

  // Render the dashboard with server-side dynamic SQLite values
  const initialData = getAllData();

  return (
    <ClientProvider initialData={initialData}>
      <AdminDashboard />
    </ClientProvider>
  );
}
