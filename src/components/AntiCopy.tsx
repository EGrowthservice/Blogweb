'use client';

import React, { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function AntiCopy() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const showToast = (msg: string) => {
      setToastMessage(msg);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    };

    const isInputOrTextarea = (target: EventTarget | null): boolean => {
      if (!target || !(target instanceof HTMLElement)) return false;
      const tagName = target.tagName.toLowerCase();
      return (
        tagName === 'input' ||
        tagName === 'textarea' ||
        target.isContentEditable ||
        target.closest('.allow-select') !== null
      );
    };

    // Prevent copy event
    const handleCopy = (e: ClipboardEvent) => {
      if (!isInputOrTextarea(e.target)) {
        e.preventDefault();
        showToast('Nội dung được bảo vệ - không thể sao chép.');
      }
    };

    // Prevent cut event
    const handleCut = (e: ClipboardEvent) => {
      if (!isInputOrTextarea(e.target)) {
        e.preventDefault();
      }
    };

    // Block keyboard shortcuts (Ctrl+C, Cmd+C, Ctrl+U, Ctrl+S)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      if (isCtrlOrCmd && (e.key === 'c' || e.key === 'C')) {
        if (!isInputOrTextarea(e.target)) {
          e.preventDefault();
          showToast('Nội dung được bảo vệ - không thể sao chép.');
        }
      }

      if (isCtrlOrCmd && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
      }

      if (isCtrlOrCmd && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
      }
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-2 px-4 py-2.5 bg-gray-900/95 text-white text-xs font-medium rounded-full shadow-lg border border-gray-700 animate-fade-in pointer-events-none">
      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
}
