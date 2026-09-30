'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ExternalLink } from 'lucide-react';

export default function PopupAdModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this browser session
    const isDismissed = sessionStorage.getItem('pulse_popup_ad_dismissed');
    if (isDismissed) {
      setHasDismissed(true);
      return;
    }

    // 10-second delay as requested
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);
    try {
      sessionStorage.setItem('pulse_popup_ad_dismissed', 'true');
    } catch {
      // ignore in private browsing
    }
  };

  if (!isOpen || hasDismissed) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Advertisement"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] animate-fade-in"
    >
      {/* Mobile-optimized modal popup */}
      <div className="relative w-full max-w-[340px] sm:max-w-[400px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 transform transition-all animate-scale-up">
        {/* Top Header Bar with Close Button */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-gray-50 border-b border-gray-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Advertisement
          </span>
          <button
            onClick={handleClose}
            aria-label="Close Advertisement"
            className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ad Body Content */}
        <div className="p-4 sm:p-5 text-center">
          <div className="relative w-full h-44 rounded-lg overflow-hidden bg-gray-100 mb-3.5">
            <Image
              src="https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=800&q=80"
              alt="Classic Variety Comedy Special Edition"
              fill
              sizes="(max-width: 400px) 100vw, 400px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3 text-left">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-amber-500 text-black">
                Featured Special
              </span>
            </div>
          </div>

          <h3 className="text-base font-bold text-gray-900 leading-snug mb-1.5">
            The Golden Age of Comedy Collection
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            Relive remastered television gems, uncut outtakes, and Tim Conway&apos;s most hilarious moments in stunning digital clarity.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="flex-1 py-2 px-3 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Skip
            </button>
            <a
              href="https://www.pulseetm.click"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
            >
              <span>Explore</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
