'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Sparkles, Wrench, Laptop, Smartphone, FileSpreadsheet, Globe, BookOpen } from 'lucide-react';
import { CategoryData } from '@/lib/categories';

interface HeaderProps {
  categories?: CategoryData[];
}

export default function Header({ categories = [] }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically build navigation from database categories + Web Tools Suite
  const navLinks = [
    { name: 'Home', href: '/' },
    ...categories.map((c) => ({ name: c.name, href: `/${c.slug}` })),
    { name: 'Web Tools', href: '/tools' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-950 focus:outline-none rounded-lg hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Redesigned Logo: White, Black, Red, Blue (NO "ENTERTAINMENT") */}
            <Link href="/" className="group flex flex-col justify-center">
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

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition ${
                    isActive
                      ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5'
                      : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search Bar & Web Tools Shortcut */}
          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm border border-blue-600"
              title="Access 100% Free Online Browser Utilities"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Online Tools</span>
              <span className="md:hidden">Tools</span>
            </Link>

            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutorials, shortcuts..."
                className="w-48 md:w-56 pl-3 pr-9 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tutorials, shortcuts, guides..."
              className="w-full pl-3 pr-9 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-1 animate-fade-in">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-semibold transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
