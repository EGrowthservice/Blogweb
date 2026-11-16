'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  Wrench,
  Laptop,
  Smartphone,
  FileSpreadsheet,
  Globe,
  BookOpen,
  Home,
  Link2,
  Type,
  KeyRound,
  QrCode,
  Code2,
  ShieldCheck,
  Layers,
  Mail,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { CategoryData } from '@/lib/categories';

interface HeaderProps {
  categories?: CategoryData[];
}

export default function Header({ categories = [] }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Lock body scroll when mobile off-canvas drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Clean, concise desktop navigation links
  const desktopNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'PC Tips', href: '/pc-tips' },
    { name: 'Mobile', href: '/mobile-tips' },
    { name: 'Office & Excel', href: '/office-productivity' },
    { name: 'Security', href: '/web-tools' },
    { name: 'Tech Blog', href: '/blog' },
    { name: 'All Guides', href: '/all-stories' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setMobileMenuOpen(false);
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Mobile Hamburger & Brand Logo */}
            <div className="flex items-center gap-3 shrink-0 mr-4 xl:mr-8">
              {/* Mobile Drawer Trigger (Opens from Left) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden p-2 -ml-2 text-slate-700 hover:text-slate-950 focus:outline-none rounded-xl hover:bg-slate-100 transition"
                aria-label="Open navigation menu from left"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Brand Logo: White, Black, Red, Blue */}
              <Link href="/" className="group flex flex-col justify-center select-none">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-display tracking-tighter text-slate-950 group-hover:text-blue-600 transition leading-none">
                    PULSE
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-600 text-white ml-0.5 shadow-sm">
                    TECH
                  </span>
                </div>
                <span className="text-[9px] font-bold tracking-[0.24em] text-slate-500 uppercase mt-0.5">
                  TIPS &amp; DIGITAL TOOLS
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation Bar (Unbroken, Single-line, No Wrapping) */}
            <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
              {desktopNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`whitespace-nowrap text-xs xl:text-sm font-semibold transition py-1 ${
                      isActive
                        ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                        : 'text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Tools Shortcut & Search Bar */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm whitespace-nowrap"
                title="Access 100% Free Online Browser Utilities"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Online Tools</span>
                <span className="sm:hidden">Tools</span>
              </Link>

              <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tutorials..."
                  className="w-36 lg:w-44 focus:w-56 pl-3 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          MOBILE OFF-CANVAS DRAWER: SLIDES FROM LEFT (User Request)
          ======================================================== */}
      {/* 1. Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Slide-out Drawer Panel (Left-anchored) */}
      <aside
        className={`fixed inset-y-0 left-0 w-[300px] sm:w-[340px] max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile Navigation Drawer"
      >
        <div>
          {/* Drawer Header: Logo + Close Button */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black font-display tracking-tight text-slate-950 leading-none">
                  PULSE
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-600 text-white ml-0.5">
                  TECH
                </span>
              </div>
              <span className="text-[8px] font-bold tracking-[0.24em] text-slate-500 uppercase mt-0.5">
                TIPS &amp; DIGITAL TOOLS
              </span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Search Box */}
          <div className="p-4 border-b border-slate-100">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tech tutorials, shortcuts..."
                className="w-full pl-3.5 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Navigation Links Group 1: Tutorials */}
          <div className="p-4 space-y-1">
            <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400 px-3 py-1 mb-1">
              Tutorial Categories
            </span>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Home className="w-4 h-4 text-blue-600" />
              <span>Home Overview</span>
            </Link>
            <Link
              href="/pc-tips"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                pathname === '/pc-tips' ? 'bg-blue-50 text-blue-600' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Laptop className="w-4 h-4 text-blue-600" />
              <span>PC &amp; Windows Tips</span>
            </Link>
            <Link
              href="/mobile-tips"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                pathname === '/mobile-tips' ? 'bg-blue-50 text-blue-600' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Mobile &amp; Smartphone</span>
            </Link>
            <Link
              href="/office-productivity"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                pathname === '/office-productivity' ? 'bg-blue-50 text-blue-600' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-600" />
              <span>Office &amp; Excel Productivity</span>
            </Link>
            <Link
              href="/web-tools"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                pathname === '/web-tools' ? 'bg-blue-50 text-blue-600' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Globe className="w-4 h-4 text-purple-600" />
              <span>Network &amp; Security</span>
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                pathname === '/blog' ? 'bg-blue-50 text-blue-600' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Tech Blog</span>
            </Link>
            <Link
              href="/all-stories"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                pathname === '/all-stories' ? 'bg-blue-50 text-blue-600' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4 text-red-600" />
              <span>Complete Tutorial Archive</span>
            </Link>
          </div>

          {/* Navigation Links Group 2: Free Browser Tools */}
          <div className="p-4 pt-2 border-t border-slate-100 space-y-1">
            <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400 px-3 py-1 mb-1">
              Free Browser Tools
            </span>
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                pathname === '/tools' ? 'bg-blue-50 text-blue-600' : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>All Web Tools Suite</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
            </Link>
            <Link
              href="/shortlink"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-50 transition"
            >
              <Link2 className="w-3.5 h-3.5 text-slate-400" />
              <span>ShortLink Generator</span>
            </Link>
            <Link
              href="/tools/text-case"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-50 transition"
            >
              <Type className="w-3.5 h-3.5 text-slate-400" />
              <span>Text Case &amp; Word Counter</span>
            </Link>
            <Link
              href="/tools/password-generator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-50 transition"
            >
              <KeyRound className="w-3.5 h-3.5 text-slate-400" />
              <span>Secure Password Generator</span>
            </Link>
            <Link
              href="/tools/qr-generator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-50 transition"
            >
              <QrCode className="w-3.5 h-3.5 text-slate-400" />
              <span>Instant QR Code Maker</span>
            </Link>
            <Link
              href="/tools/json-formatter"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-50 transition"
            >
              <Code2 className="w-3.5 h-3.5 text-slate-400" />
              <span>JSON Formatter &amp; Validator</span>
            </Link>
          </div>
        </div>

        {/* Drawer Footer: Legal Links & Support */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600">
            <Link
              href="/privacy-policy"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Terms of Service
            </Link>
            <Link
              href="/disclaimer"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Disclaimer
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Contact Desk
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
            <span>© PULSE TechTips</span>
            <a href="mailto:hieucv2004@gmail.com" className="text-blue-600 hover:underline">
              hieucv2004@gmail.com
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
