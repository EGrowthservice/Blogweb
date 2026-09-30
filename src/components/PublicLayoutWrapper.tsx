'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import PopupAdModal from '@/components/ads/PopupAdModal';
import AntiCopy from '@/components/AntiCopy';

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <div className="min-h-screen flex flex-col w-full">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      {/* 10-Second Mobile-Friendly Popup Ad */}
      <PopupAdModal />
      {/* Anti-copy content protection */}
      <AntiCopy />
    </>
  );
}
