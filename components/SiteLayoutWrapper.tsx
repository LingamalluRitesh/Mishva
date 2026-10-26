'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import AIAssistantFloat from '@/components/AIAssistantFloat';

export default function SiteLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Check if current page is the admin portal
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    // Render ONLY the standalone admin portal without public navbar, footer, or customer widgets
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        {children}
      </div>
    );
  }

  // Regular public website with high-contrast customer navigation & floating tools
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* 24/7 AI Smart Assistant on Bottom-Left */}
      <AIAssistantFloat />
      {/* WhatsApp Quick Desk on Bottom-Right - Guaranteed ZERO overlap */}
      <WhatsAppFloat />
    </>
  );
}
