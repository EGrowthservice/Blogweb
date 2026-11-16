import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { searchArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import { Search, ChevronRight } from 'lucide-react';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || '';
  return {
    title: query ? `Search Results for "${query}" | PULSE TechTips` : 'Search Tutorials & Guides | PULSE TechTips',
    description: `Search verified technical tutorials, computer guides, and digital utilities matching "${query}".`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const results = query ? await searchArticles(query) : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-700 transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-medium">Search</span>
      </nav>

      <div className="mb-8 max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
          <Search className="w-6 h-6 text-gray-500" />
          {query ? `Results for "${query}"` : 'Search Tech Tutorials & Online Utilities'}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {query
            ? `Found ${results.length} verified technical guide${results.length === 1 ? '' : 's'} matching your query.`
            : 'Search Windows optimization guides, iPhone battery tips, Excel formulas, or browser tools.'}
        </p>

        {/* Search Input on page */}
        <form method="GET" action="/search" className="mt-5 flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="e.g. speed up windows 11, xlookup formula, shortcuts, dns cache..."
            className="flex-1 bg-white border border-gray-300 rounded-md px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-gray-900 hover:bg-blue-600 text-white text-sm font-semibold rounded-md shadow-sm transition"
          >
            Search
          </button>
        </form>
      </div>

      {query && results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((art) => (
            <ArticleCard key={art.id || art.slug} article={art} />
          ))}
        </div>
      ) : query ? (
        <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
          No tutorials found matching &quot;{query}&quot;. Try different keywords such as &quot;windows&quot;, &quot;excel&quot;, or &quot;security&quot;.
        </div>
      ) : null}
    </div>
  );
}
