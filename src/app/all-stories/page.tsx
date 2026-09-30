import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { CATEGORIES } from '@/data/mockArticles';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import { ChevronRight, Newspaper } from 'lucide-react';

export const revalidate = 0; // Dynamic updates

export const metadata: Metadata = {
  title: 'All Stories & Archive | PULSE Entertainment',
  description:
    'Browse our complete collection of classic comedy sketches, vintage television moments, and entertainment retrospectives.',
  alternates: {
    canonical: 'https://www.pulseetm.click/all-stories',
  },
};

export default async function AllStoriesPage() {
  const articles = await getAllArticles();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-700 transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-medium">All Stories</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8 pb-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Newspaper className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Archives</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            All Stories
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Browse through all {articles.length} published stories and retrospectives.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/all-stories"
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-900 text-white"
          >
            All Stories
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="py-16 text-center bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-base font-semibold text-gray-900 mb-1">No stories published yet</h3>
          <p className="text-sm text-gray-500">
            New stories will appear here once published from the Admin dashboard.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.id || article.slug}
              article={article}
              showCategoryInUrl={false}
            />
          ))}
        </div>
      )}

      {/* Bottom Ad placement */}
      <div className="mt-14 pt-8 border-t border-gray-200">
        <AdBanner variant="multiplex" slot="9876543210" />
      </div>
    </div>
  );
}
