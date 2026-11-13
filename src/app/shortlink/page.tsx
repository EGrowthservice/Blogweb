'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Sparkles, Shuffle, Copy, Check, ExternalLink, ArrowRight, Link as LinkIcon, RefreshCw } from 'lucide-react';

interface ShortLinkData {
  code: string;
  shortUrl: string;
  targetUrl: string;
  articleTitle: string;
  articleSlug: string;
  category: string;
  mode?: 'title' | 'random';
  clicks: number;
}

export default function ShortLinkPage() {
  const [loading, setLoading] = useState(false);
  const [currentLink, setCurrentLink] = useState<ShortLinkData | null>(null);
  const [copied, setCopied] = useState(false);
  const [recentLinks, setRecentLinks] = useState<ShortLinkData[]>([]);
  const [selectedMode, setSelectedMode] = useState<'title' | 'random'>('title');

  const fetchRecentLinks = useCallback(async () => {
    try {
      const res = await fetch('/api/shortlink');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRecentLinks(json.data.slice(0, 10));
      }
    } catch (err) {
      console.error('Failed to fetch recent links:', err);
    }
  }, []);

  const handleGenerate = useCallback(async (modeToUse: 'title' | 'random') => {
    setLoading(true);
    setCopied(false);
    try {
      const res = await fetch(`/api/shortlink?random=true&mode=${modeToUse}`);
      const json = await res.json();
      if (json.success && json.data) {
        setCurrentLink(json.data);
        fetchRecentLinks();
      }
    } catch (err) {
      console.error('Failed to generate shortlink:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchRecentLinks]);

  useEffect(() => {
    fetchRecentLinks();
    handleGenerate('title');
  }, [fetchRecentLinks, handleGenerate]);

  const handleCopy = (url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
          <LinkIcon className="w-4 h-4" />
          <span>Smart Blog Shortlinks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Blog Short Link Generator
        </h1>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          Tạo và xem trước link rút gọn cho các bài viết trên blog. Hỗ trợ 2 định dạng: <strong>Short theo Title</strong> (lấy từ khóa của tiêu đề) và <strong>Short theo Random</strong> (mã ngẫu nhiên).
        </p>
      </div>

      {/* Main Generator Card */}
      <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-blue-50/70 to-indigo-50/40 border border-blue-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>Tạo Shortlink Mới: Chọn Dạng Bạn Muốn</span>
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Chọn một trong 2 định dạng dưới đây và bấm tạo để xem trước link rút gọn.
          </p>
        </div>

        {/* 2 Mode Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              setSelectedMode('title');
              handleGenerate('title');
            }}
            disabled={loading}
            className={`p-4 rounded-xl border text-left transition ${
              selectedMode === 'title'
                ? 'border-blue-600 bg-white shadow-sm ring-2 ring-blue-600/30'
                : 'border-blue-200 bg-white/70 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                1. Short theo Title (Tiêu đề)
              </span>
              <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Khuyên dùng
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Trích xuất từ khóa ý nghĩa từ tiêu đề bài viết kết hợp mã ngắn. Ví dụ: <code className="text-blue-600 bg-blue-50/50 px-1 rounded">/s/news-desk-3a8f</code>
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedMode('random');
              handleGenerate('random');
            }}
            disabled={loading}
            className={`p-4 rounded-xl border text-left transition ${
              selectedMode === 'random'
                ? 'border-blue-600 bg-white shadow-sm ring-2 ring-blue-600/30'
                : 'border-blue-200 bg-white/70 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Shuffle className="w-4 h-4 text-indigo-600" />
                2. Short theo Random (Ngẫu nhiên)
              </span>
              <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                Siêu ngắn
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Tạo chuỗi ký tự ngẫu nhiên hoàn toàn không phụ thuộc tiêu đề. Ví dụ: <code className="text-indigo-600 bg-indigo-50/50 px-1 rounded">/s/rnd-8k2m9p</code>
            </p>
          </button>
        </div>

        {/* Current Result Preview */}
        {currentLink && (
          <div className="p-5 rounded-xl bg-white border border-blue-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  {currentLink.category}
                </span>
                <span className="text-[11px] text-gray-500 font-mono">
                  Định dạng: <strong>{currentLink.mode === 'random' ? 'Random' : 'Title-based'}</strong>
                </span>
              </div>
              <span className="text-xs text-gray-500">
                Lượt nhấp: <strong className="text-gray-900">{currentLink.clicks}</strong>
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug">
                {currentLink.articleTitle}
              </h3>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                Đích đến: <code className="text-blue-600 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">{currentLink.targetUrl}</code>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
              <div className="flex-1 px-3.5 py-2.5 rounded-lg bg-gray-900 font-mono text-sm text-blue-300 break-all select-all flex items-center">
                {currentLink.shortUrl}
              </div>

              <button
                type="button"
                onClick={() => handleCopy(currentLink.shortUrl)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sao chép Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleGenerate(selectedMode)}
                disabled={loading}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition"
                title="Tạo link cho bài viết ngẫu nhiên khác"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Đổi bài khác</span>
              </button>

              <a
                href={currentLink.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition"
                title="Thử nghiệm chuyển hướng"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Thử</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Universal Random URL Banner */}
      <div className="p-6 rounded-lg bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Shuffle className="w-4 h-4 text-blue-600" />
            <span>Link chuyển hướng ngẫu nhiên toàn cục: <code className="text-blue-600">/s/random</code></span>
          </h3>
          <p className="text-xs text-gray-600">
            Truy cập <code className="bg-white px-1 border rounded">https://www.pulseetm.click/s/random</code> sẽ tự động chuyển hướng độc giả đến một bài viết ngẫu nhiên bất kỳ trên website!
          </p>
        </div>
        <Link
          href="/s/random"
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-md text-xs font-semibold text-gray-800 transition"
        >
          <span>Thử /s/random</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Recent Shortlinks Table */}
      {recentLinks.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">
            Danh Sách Short Links Gần Đây
          </h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Mã Link</th>
                    <th className="py-3 px-4">Định Dạng</th>
                    <th className="py-3 px-4">Tiêu Đề Bài Viết</th>
                    <th className="py-3 px-4">Chuyên Mục</th>
                    <th className="py-3 px-4 text-center">Lượt Nhấp</th>
                    <th className="py-3 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentLinks.map((item) => (
                    <tr key={item.code} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4 font-mono font-medium text-blue-600">
                        /s/{item.code}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          item.mode === 'random' ? 'bg-indigo-50 text-indigo-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {item.mode === 'random' ? 'Random' : 'Title'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-900 font-medium max-w-xs truncate">
                        {item.articleTitle}
                      </td>
                      <td className="py-3 px-4">
                        <span className="capitalize px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px]">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600 font-semibold">
                        {item.clicks}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleCopy(item.shortUrl)}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Sao chép
                        </button>
                        <span>•</span>
                        <a
                          href={item.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Xem
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
