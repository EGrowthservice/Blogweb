'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Type,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  FileText,
  Clock,
  Layers,
  HelpCircle,
  Home,
} from 'lucide-react';

export default function TextCasePage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Compute text statistics
  const stats = useMemo(() => {
    const raw = text;
    const trimmed = raw.trim();
    const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
    const chars = raw.length;
    const charsNoSpaces = raw.replace(/\s/g, '').length;
    const lines = trimmed.length === 0 ? 0 : raw.split(/\r\n|\r|\n/).length;
    const paragraphs = trimmed.length === 0 ? 0 : raw.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // 200 wpm average
    return { words, chars, charsNoSpaces, lines, paragraphs, readingTime };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const toUppercase = () => setText((prev) => prev.toUpperCase());
  const toLowercase = () => setText((prev) => prev.toLowerCase());

  const toTitleCase = () => {
    setText((prev) =>
      prev.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      )
    );
  };

  const toSentenceCase = () => {
    setText((prev) =>
      prev
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
    );
  };

  const toSlugCase = () => {
    setText((prev) =>
      prev
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
    );
  };

  const cleanExtraSpaces = () => {
    setText((prev) =>
      prev
        .split('\n')
        .map((line) => line.replace(/\s+/g, ' ').trim())
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
    );
  };

  const handleClear = () => setText('');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
        <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-blue-600 transition">
          Web Tools
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Text Case &amp; Word Counter</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-200">
          <Type className="w-3.5 h-3.5" />
          <span>Client-Side Editorial Utility</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-display mb-2">
          Text Case Converter &amp; Real-Time Word Counter
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Analyze character, word, and paragraph counts in real time. Instantly transform casing into UPPERCASE, lowercase, Title Case, and SEO slug format.
        </p>
      </div>

      {/* Main Interactive Tool Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-10">
        {/* Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-center">
            <span className="block text-2xl font-black text-slate-900">{stats.words}</span>
            <span className="text-xs text-slate-500 font-bold">Words</span>
          </div>
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-center">
            <span className="block text-2xl font-black text-blue-600">{stats.chars}</span>
            <span className="text-xs text-slate-500 font-bold">Chars (w/ space)</span>
          </div>
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-center">
            <span className="block text-2xl font-black text-emerald-600">{stats.charsNoSpaces}</span>
            <span className="text-xs text-slate-500 font-bold">Chars (no space)</span>
          </div>
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-center">
            <span className="block text-2xl font-black text-purple-600">{stats.lines}</span>
            <span className="text-xs text-slate-500 font-bold">Lines</span>
          </div>
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-center">
            <span className="block text-2xl font-black text-amber-600">{stats.paragraphs}</span>
            <span className="text-xs text-slate-500 font-bold">Paragraphs</span>
          </div>
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-center">
            <span className="block text-2xl font-black text-red-600">~{stats.readingTime}m</span>
            <span className="text-xs text-slate-500 font-bold">Read Time</span>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="relative mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Type or paste your text here to inspect word counts and apply instant transformations..."
            className="w-full p-4 sm:p-5 text-sm sm:text-base border border-slate-300 rounded-2xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition leading-relaxed resize-y font-mono"
          />
          {text.length > 0 && (
            <button
              onClick={handleClear}
              className="absolute top-3 right-3 p-1.5 text-xs text-slate-400 hover:text-red-500 bg-white/80 rounded-md border border-slate-200 transition"
              title="Clear all text"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={toUppercase}
              disabled={!text}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-40 transition"
            >
              UPPERCASE
            </button>
            <button
              onClick={toLowercase}
              disabled={!text}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-40 transition"
            >
              lowercase
            </button>
            <button
              onClick={toTitleCase}
              disabled={!text}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-40 transition"
            >
              Title Case
            </button>
            <button
              onClick={toSentenceCase}
              disabled={!text}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-40 transition"
            >
              Sentence case
            </button>
            <button
              onClick={toSlugCase}
              disabled={!text}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-40 transition"
              title="Convert to URL hyphenated slug"
            >
              slug-url-case
            </button>
            <button
              onClick={cleanExtraSpaces}
              disabled={!text}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 disabled:opacity-40 transition"
              title="Strip redundant consecutive whitespace and blank lines"
            >
              Clean Extra Spaces
            </button>
          </div>

          <button
            onClick={handleCopy}
            disabled={!text}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy Output
              </>
            )}
          </button>
        </div>
      </div>

      {/* Educational Article & Instructions for SEO & E-E-A-T */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 font-display">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          Text Casing Guidelines &amp; Editorial Standards
        </h2>
        <div className="space-y-4">
          <p>
            Standardizing typography and casing is critical when authoring software documentation, drafting client communications, or preparing web copy for search engine optimization (SEO).
          </p>

          <h3 className="text-base font-bold text-slate-900 mt-4">1. When to Use Each Case Style</h3>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
            <li>
              <strong>UPPERCASE:</strong> Recommended for acronyms (HTML, CSS, JSON, API), database reserved keywords, and emergency system alerts. Avoid full paragraph capitalization to maintain readability.
            </li>
            <li>
              <strong>Title Case:</strong> The standard convention for article headlines, book titles, and call-to-action buttons.
            </li>
            <li>
              <strong>Sentence case:</strong> The preferred format for standard body paragraphs, UI tooltips, and business correspondence.
            </li>
            <li>
              <strong>slug-case:</strong> Strips special punctuation and spaces, replacing them with standard hyphens (e.g., <code>how-to-fix-windows-11-lag</code>), ideal for clean web URLs and file naming.
            </li>
          </ul>

          <h3 className="text-base font-bold text-slate-900 mt-4">2. Reclaiming Clean Copy via Whitespace Normalization</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Text copied from PDF manuals or scanned documents frequently contains erratic line breaks and multi-space tabs. The &quot;Clean Extra Spaces&quot; function collapses duplicate whitespace into clean single spaces and normalizes paragraph breaks without corrupting your prose.
          </p>
        </div>
      </div>
    </div>
  );
}
