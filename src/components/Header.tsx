'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import {
  Search,
  Bookmark,
  Menu,
  X,
  TrendingUp,
  User as UserIcon,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import GoogleAuthModal from './GoogleAuthModal';

const NAV_LINKS = [
  { name: 'Movies', href: '/movies' },
  { name: 'TV & Streaming', href: '/tv-shows' },
  { name: 'Celebrities', href: '/celebrities' },
  { name: 'Music', href: '/music' },
  { name: 'Gaming', href: '/gaming' },
];

export default function Header() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Top Trending Ribbon */}
      <div className="bg-neutral-950 text-neutral-400 text-xs py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="flex items-center gap-1 font-semibold text-brand-500 uppercase tracking-wider text-[11px] shrink-0">
              <TrendingUp className="w-3.5 h-3.5" /> Trending:
            </span>
            <div className="flex items-center gap-4 text-neutral-300 text-xs overflow-x-auto no-scrollbar">
              <Link href="/movies/inside-christopher-nolans-next-sci-fi-epic-hollywood-project" className="hover:text-brand-400 transition">
                Nolan's Next Sci-Fi Epic
              </Link>
              <span className="text-neutral-700">•</span>
              <Link href="/tv-shows/the-bear-season-4-exclusive-cast-teases-culinary-chaos" className="hover:text-brand-400 transition">
                The Bear Season 4
              </Link>
              <span className="text-neutral-700">•</span>
              <Link href="/gaming/grand-theft-auto-vi-vice-city-map-size-next-gen-physics" className="hover:text-brand-400 transition">
                GTA VI Vice City
              </Link>
              <span className="text-neutral-700">•</span>
              <Link href="/celebrities/met-gala-red-carpet-breakdown-fashion-moments" className="hover:text-brand-400 transition">
                Met Gala Red Carpet
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[11px] text-neutral-400 shrink-0">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span className="text-neutral-300">Edition: US / North America</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-400 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link href="/" className="group flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-3xl font-black font-display tracking-tighter text-white group-hover:text-brand-400 transition">
                    PULSE
                  </span>
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                </div>
                <span className="text-[10px] font-semibold tracking-[0.25em] text-neutral-400 uppercase -mt-1">
                  Entertainment
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/60 rounded-lg transition"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Action Icons: Search & Google Auth */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition"
                aria-label="Search articles"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Bookmarks Link */}
              <Link
                href="/bookmarks"
                className="p-2.5 text-neutral-400 hover:text-brand-400 hover:bg-neutral-800 rounded-full transition relative"
                aria-label="Saved articles"
                title="Saved Articles"
              >
                <Bookmark className="w-5 h-5" />
              </Link>

              {/* Google Sign-in / User Profile */}
              {status === 'authenticated' && session?.user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2 pr-3 bg-neutral-800 hover:bg-neutral-700/80 rounded-full text-xs font-medium transition"
                  >
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        width={28}
                        height={28}
                        className="rounded-full ring-2 ring-brand-500/50"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
                        {session.user.name?.[0] || 'U'}
                      </div>
                    )}
                    <span className="hidden sm:inline-block max-w-[100px] truncate text-neutral-200">
                      {session.user.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-neutral-800 text-xs">
                        <p className="font-semibold text-white truncate">{session.user.name}</p>
                        <p className="text-neutral-400 truncate">{session.user.email}</p>
                      </div>
                      <Link
                        href="/bookmarks"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
                      >
                        <Bookmark className="w-4 h-4 text-brand-400" />
                        <span>Saved Articles</span>
                      </Link>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-neutral-800 transition text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-2 py-2 px-3.5 sm:px-4 bg-white hover:bg-neutral-100 text-neutral-950 text-xs sm:text-sm font-semibold rounded-full shadow transition"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>

          {/* Expandable Search Input Bar */}
          {searchOpen && (
            <div className="py-3 border-t border-neutral-800 animate-fade-in">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, celebrities, TV series, game reviews..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl py-2.5 pl-11 pr-24 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500"
                  autoFocus
                />
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg transition"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-800 bg-neutral-900 px-4 pt-2 pb-6 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-neutral-200 hover:text-white hover:bg-neutral-800"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2 text-sm text-neutral-400">
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1 hover:text-white">
                About Us & Editorial Standards
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1 hover:text-white">
                Contact Editorial Desk
              </Link>
              <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1 hover:text-white">
                Privacy Policy & CCPA
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Google Auth Modal */}
      <GoogleAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}
