'use client';

import Sidebar from './Sidebar';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';

export default function AppShell({ children, title, subtitle }) {
  return (
    <ProtectedRoute>
      <Sidebar />
      <main className="min-h-screen bg-aura pb-36 md:ml-72 md:pb-28">
        <Header title={title} subtitle={subtitle} />
        <section className="px-4 py-6 md:px-8">{children}</section>
      </main>
    </ProtectedRoute>
  );
}
