import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { getAllCategories } from '@/lib/categories';
import ArticleCard from '@/components/ArticleCard';
import { ChevronRight, BookOpen, Sparkles, Filter, Home } from 'lucide-react';

export const revalidate = 60; // ISR cache 60s for instant loading

export const metadata: Metadata = {
  title: 'Complete Tutorials & Tech Guides Archive | PULSE TechTips',
  description:
    'Browse our comprehensive catalog of field-tested guides on Windows 11, macOS, Android, iPhone, Excel modeling, and cybersecurity essentials.',
  alternates: {
    canonical: 'https://www.pulseetm.click/all-stories',
  },
};

export default async function AllStoriesPage() {
  const [categories, articles] = await Promise.all([
    getAllCategories(),
    getAllArticles(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
        <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">Complete Tutorial Archive</span>
      </nav>

      {/* Page Header: White / Black / Red / Blue */}
      <div className="mb-10 pb-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-red-600 mb-2 text-xs font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span>Comprehensive Index</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            All Practical Tech Tutorials ({articles.length})
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
            Browse through our complete library of audited step-by-step guides, troubleshooting workflows, and software cheat sheets.
          </p>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/all-stories"
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-950 text-white shadow-sm"
          >
            All Disciplines ({articles.length})
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition border border-slate-200"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Articles Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
      {articles.length === 0 ? (
        <div className="py-20 text-center bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">No tutorials available</h3>
          <p className="text-sm text-slate-500">
            Articles will appear here once published from the technical console.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.id || article.slug}
              article={article}
              showCategoryInUrl={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
