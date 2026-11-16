import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Link2,
  Type,
  KeyRound,
  QrCode,
  Code2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Home,
  Wrench,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Online Browser Utilities & Tools Suite | PULSE TechTips',
  description:
    'A curated collection of 100% free, client-side digital productivity tools: ShortLink generator, text case & word counter, cryptographic password generator, QR maker, and JSON formatter.',
  alternates: {
    canonical: '/tools',
  },
};

const TOOLS = [
  {
    title: 'ShortLink Generator',
    slug: '/shortlink',
    description:
      'Generate lightning-fast short links with dual modes: SEO-friendly title keywords or secure alphanumeric random codes.',
    icon: Link2,
    badge: 'Popular',
    color: 'from-blue-600 to-indigo-600',
    tags: ['ShortURL', 'Marketing', 'Sharing'],
  },
  {
    title: 'Text Case & Word Counter',
    slug: '/tools/text-case',
    description:
      'Real-time word, character, and line counts. Instant case transformation: UPPERCASE, lowercase, Title Case, camelCase, slug-case, and whitespace cleanup.',
    icon: Type,
    badge: 'Editor',
    color: 'from-emerald-600 to-teal-600',
    tags: ['Text Tool', 'Copywriting', 'SEO Content'],
  },
  {
    title: 'Cryptographic Password Generator',
    slug: '/tools/password-generator',
    description:
      'Generate brute-force resistant passwords. Customize length (6-64 chars), mix uppercase, lowercase, numbers, symbols, and evaluate entropy strength.',
    icon: KeyRound,
    badge: 'Security',
    color: 'from-amber-600 to-orange-600',
    tags: ['Cybersecurity', 'Accounts', 'Entropy'],
  },
  {
    title: 'Instant QR Code Maker',
    slug: '/tools/qr-generator',
    description:
      'Create high-resolution QR codes for websites, plain text, Wi-Fi network credentials, and phone numbers. Instant scanning and free PNG export.',
    icon: QrCode,
    badge: 'Utility',
    color: 'from-purple-600 to-pink-600',
    tags: ['QR Code', 'Mobile', 'Wi-Fi'],
  },
  {
    title: 'JSON Formatter & Validator',
    slug: '/tools/json-formatter',
    description:
      'Beautify messy JSON payloads with 2-space or 4-space indentation, minify for production payload transfer, and diagnose syntax errors per line.',
    icon: Code2,
    badge: 'Developer',
    color: 'from-cyan-600 to-blue-600',
    tags: ['JSON', 'Developer', 'Debugging'],
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-medium">
        <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Online Tools Suite</span>
      </nav>

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% Free • Client-Side Processing • No Login Required</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display mb-4">
          Browser Productivity &amp; Utility Suite
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Essential developer, editorial, and security utilities that process your data entirely within your local browser. No server storage, zero data telemetry, instant execution.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={tool.slug}
              className="group relative flex flex-col bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Top Accent Gradient Bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${tool.color}`}
              />

              {/* Icon & Badge */}
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition">
                  {tool.badge}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition mb-2 font-display">
                {tool.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                {tool.description}
              </p>

              {/* Tags & Action Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-slate-50 text-slate-500 font-medium text-[11px]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 font-bold text-blue-600 group-hover:translate-x-1 transition duration-200">
                  Open Tool <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Trust & Privacy Guarantee */}
      <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 p-8 sm:p-10 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Local Client-Side Privacy</h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Text statistics, passwords, QR payloads, and JSON objects are computed locally in your browser DOM. No data is transmitted to our servers.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Zero Latency Performance</h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Instant feedback in milliseconds. No rate-limiting, no account gates, and optimized for both mobile touchscreens and desktop keyboards.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Permanently Free Access</h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Free forever for developers, students, content creators, and remote teams. No paywalls, subscription fees, or trial expirations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
