import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { searchArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import { Search, ChevronRight } from 'lucide-react';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || '';
  return {
    title: query ? `Search results for "${query}" | PULSE Entertainment` : 'Search Entertainment Stories',
    description: `Browse articles, reviews, and news matching "${query}".`,
    robots: {
      index: false, // Standard SEO practice: do not index internal search result URLs
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const results = query ? await searchArticles(query) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
        <Link href="/" className="hover:text-white transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
        <span className="text-white font-medium">Search</span>
      </nav>

      <div className="mb-10 max-w-3xl">
        <h1 className="text-3xl font-extrabold font-display text-white tracking-tight flex items-center gap-3">
          <Search className="w-8 h-8 text-brand-500" />
          {query ? `Results for "${query}"` : 'Search PULSE Entertainment'}
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          {query
            ? `Found ${results.length} ${results.length === 1 ? 'story' : 'stories'} matching your search.`
            : 'Explore our archive of Hollywood reporting, streaming reviews, and pop culture analysis.'}
        </p>

        {/* Search Input on page */}
        <form method="GET" action="/search" className="mt-6 flex gap-3">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search keywords, actors, directors, franchises..."
            className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-xl shadow transition"
          >
            Search
          </button>
        </form>
      </div>

      <AdBanner variant="leaderboard" slot="4920183756" />

      {/* Search Results */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 my-10">
          {results.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : query ? (
        <div className="py-16 text-center text-neutral-400 bg-neutral-900/40 rounded-2xl border border-neutral-800">
          <p className="text-base font-semibold text-white">No articles matched your query.</p>
          <p className="text-xs text-neutral-500 mt-2">
            Try searching for broader terms like "Nolan", "Oscars", "The Bear", or "Gaming".
          </p>
        </div>
      ) : null}
    </div>
  );
}
