import React from 'react';
import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';

export const revalidate = 60; // ISR

export default async function HomePage() {
  const articles = await getAllArticles();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top Ad placement if configured */}
      <div className="mb-8">
        <AdBanner variant="leaderboard" slot="1029384756" />
      </div>

      {/* Main 2-Column Stories Feed matching reference site */}
      <section className="mb-12">
        <div className="border-b border-gray-200 pb-3 mb-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Latest Stories
          </h2>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <Link href="/comedy" className="hover:text-blue-600 transition">
              Comedy Classics
            </Link>
            <span>•</span>
            <Link href="/vintage-moments" className="hover:text-blue-600 transition">
              Vintage Moments
            </Link>
          </div>
        </div>

        {/* 2-Columns Grid like module-list-new--columns-2 on reference site */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id || article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Bottom Ad placement */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <AdBanner variant="multiplex" slot="9876543210" />
      </div>
    </div>
  );
}
