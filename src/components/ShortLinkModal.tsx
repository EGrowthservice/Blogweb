'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Shuffle, Copy, Check, ExternalLink, X, Link2, RefreshCw } from 'lucide-react';

interface ShortLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleTitle: string;
  articleSlug: string;
  category?: string;
}

export default function ShortLinkModal({
  isOpen,
  onClose,
  articleTitle,
  articleSlug,
  category,
}: ShortLinkModalProps) {
  const [mode, setMode] = useState<'title' | 'random'>('title');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [shortCode, setShortCode] = useState<string>('');
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchShortLink = useCallback(async (targetMode: 'title' | 'random', regenerate = false) => {
    if (!articleSlug) return;
    setLoading(true);
    setCopied(false);
    try {
      const res = await fetch(
        `/api/shortlink?slug=${encodeURIComponent(articleSlug)}&mode=${targetMode}&regenerate=${regenerate}`
      );
      const json = await res.json();
      if (json.success && json.data) {
        setShortUrl(json.data.shortUrl);
        setShortCode(json.data.code);
        setTargetUrl(json.data.targetUrl);
      }
    } catch (err) {
      console.error('Error generating shortlink:', err);
    } finally {
      setLoading(false);
    }
  }, [articleSlug]);

  useEffect(() => {
    if (isOpen && articleSlug) {
      fetchShortLink(mode, false);
    }
  }, [isOpen, articleSlug, mode, fetchShortLink]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (shortUrl && navigator.clipboard) {
      navigator.clipboard.writeText(shortUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleModeChange = (newMode: 'title' | 'random') => {
    setMode(newMode);
    fetchShortLink(newMode, false);
  };

  const handleRegenerate = () => {
    fetchShortLink(mode, true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-none">
                Tạo & Xem Trước Short Link
              </h3>
              <p className="text-[11px] text-gray-500 mt-1">
                Tùy chọn tạo link rút gọn theo Title hoặc Random
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Article Info */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            {category && (
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mb-1">
                {category}
              </span>
            )}
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2">
              {articleTitle}
            </h4>
          </div>

          {/* Mode Selector (2 Dạng) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Chọn định dạng Shortlink:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleModeChange('title')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                  mode === 'title'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-700 font-semibold ring-1 ring-blue-600'
                    : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Theo Title (Tiêu đề)</span>
                </div>
                <span className="text-[10px] text-gray-500 mt-1">
                  vd: /s/news-desk-3a8f
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('random')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                  mode === 'random'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-700 font-semibold ring-1 ring-blue-600'
                    : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs">
                  <Shuffle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Theo Random (Ngẫu nhiên)</span>
                </div>
                <span className="text-[10px] text-gray-500 mt-1">
                  vd: /s/rnd-8k2m9p
                </span>
              </button>
            </div>
          </div>

          {/* Shortlink Preview Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">Link rút gọn của bạn:</span>
              <button
                type="button"
                onClick={handleRegenerate}
                disabled={loading}
                className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                <span>Tạo mã khác</span>
              </button>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-900 rounded-xl text-white">
              <input
                type="text"
                readOnly
                value={loading ? 'Đang tạo link...' : shortUrl}
                className="flex-1 bg-transparent border-none text-xs sm:text-sm font-mono text-blue-300 focus:outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                disabled={loading || !shortUrl}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Đã chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>

            {targetUrl && (
              <p className="text-[11px] text-gray-500 truncate pt-1">
                Đích đến: <code className="text-gray-700 bg-gray-100 px-1 py-0.5 rounded">{targetUrl}</code>
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-gray-50 border-t border-gray-100 text-xs">
          {shortUrl ? (
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Mở thử link rút gọn</span>
            </a>
          ) : <div />}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
