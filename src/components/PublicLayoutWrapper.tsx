'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import PopupAdModal from '@/components/ads/PopupAdModal';
import AntiCopy from '@/components/AntiCopy';
import { CategoryData } from '@/lib/categories';

interface PublicLayoutWrapperProps {
  children: React.ReactNode;
  categories?: CategoryData[];
}

export default function PublicLayoutWrapper({
  children,
  categories = [],
}: PublicLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <div className="min-h-screen flex flex-col w-full">{children}</div>;
  }

  return (
    <>
      <Header categories={categories} />
      <main className="flex-1">{children}</main>
      <Footer categories={categories} />
      <BackToTop />
      {/* 10-Second Mobile-Friendly Popup Ad */}
      <PopupAdModal />
      {/* Anti-copy content protection */}
      <AntiCopy />
    </>
  );
}
