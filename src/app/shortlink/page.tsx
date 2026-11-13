'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Sparkles, Shuffle, Copy, Check, ExternalLink, ArrowRight, Link as LinkIcon } from 'lucide-react';

interface ShortLinkData {
  code: string;
  shortUrl: string;
  targetUrl: string;
  articleTitle: string;
  articleSlug: string;
  category: string;
  clicks: number;
}

export default function ShortLinkPage() {
  const [loading, setLoading] = useState(false);
  const [currentLink, setCurrentLink] = useState<ShortLinkData | null>(null);
  const [copied, setCopied] = useState(false);
  const [recentLinks, setRecentLinks] = useState<ShortLinkData[]>([]);

  const fetchRecentLinks = useCallback(async () => {
    try {
      const res = await fetch('/api/shortlink');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRecentLinks(json.data.slice(0, 8));
      }
    } catch (err) {
      console.error('Failed to fetch recent links:', err);
    }
  }, []);

  const handleGenerateRandom = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/shortlink?random=true');
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
    handleGenerateRandom();
  }, [fetchRecentLinks, handleGenerateRandom]);

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
          Generate clean, memorable short links based on random keywords from our article titles. Perfect for sharing stories quickly across social media and messaging apps.
        </p>
      </div>

      {/* Main Generator Card */}
      <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-blue-50/70 to-indigo-50/40 border border-blue-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Random Title Short Link</span>
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Selects a published article at random and generates an optimized short code from its title.
            </p>
          </div>

          <button
            onClick={handleGenerateRandom}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition"
          >
            <Shuffle className="w-4 h-4" />
            <span>{loading ? 'Picking story...' : 'Generate New Random Title Link'}</span>
          </button>
        </div>

        {/* Current Result */}
        {currentLink && (
          <div className="p-5 rounded-lg bg-white border border-blue-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                {currentLink.category}
              </span>
              <span className="text-xs text-gray-500">
                Total clicks tracked: <strong className="text-gray-900">{currentLink.clicks}</strong>
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug">
                {currentLink.articleTitle}
              </h3>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                Target URL: <code className="text-blue-600 bg-gray-50 px-1 py-0.5 rounded">{currentLink.targetUrl}</code>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
              <div className="flex-1 px-3.5 py-2.5 rounded-md bg-gray-50 border border-gray-300 font-mono text-sm text-gray-800 break-all select-all">
                {currentLink.shortUrl}
              </div>

              <button
                onClick={() => handleCopy(currentLink.shortUrl)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold shadow-sm transition"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <a
                href={currentLink.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Test Redirect</span>
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
            <span>Universal Instant Random Link: <code className="text-blue-600">/s/random</code></span>
          </h3>
          <p className="text-xs text-gray-600">
            Anyone visiting <code className="bg-white px-1 border rounded">https://www.pulseetm.click/s/random</code> will be automatically redirected to a random published article!
          </p>
        </div>
        <Link
          href="/s/random"
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-md text-xs font-semibold text-gray-800 transition"
        >
          <span>Try /s/random</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Recent Shortlinks Table */}
      {recentLinks.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">
            Recently Generated Short Links
          </h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Title Code</th>
                    <th className="py-3 px-4">Article Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-center">Clicks</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentLinks.map((item) => (
                    <tr key={item.code} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4 font-mono font-medium text-blue-600">
                        /s/{item.code}
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
                          Copy
                        </button>
                        <span>•</span>
                        <a
                          href={item.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Visit
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
