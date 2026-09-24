'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Search, Sparkles, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { ArticleData } from '@/data/mockArticles';
import ArticleCard from '@/components/ArticleCard';

interface CategoryArticleListProps {
  articles: ArticleData[];
  categoryName: string;
}

const ITEMS_PER_PAGE = 8;

export default function CategoryArticleList({
  articles,
  categoryName,
}: CategoryArticleListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'quick'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const listTopRef = useRef<HTMLDivElement>(null);

  // Filter & Sort
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          (a.tags && a.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    if (sortBy === 'popular') {
      result.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
    } else if (sortBy === 'quick') {
      result.sort((a, b) => a.readTimeMinutes - b.readTimeMinutes);
    } else {
      // Latest
      result.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    return result;
  }, [articles, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Spotlight story is the first article when on page 1 without active search
  const isSpotlightActive = currentPage === 1 && !searchQuery.trim() && filteredArticles.length > 0;
  const spotlightArticle = isSpotlightActive ? currentArticles[0] : null;
  const gridArticles = isSpotlightActive ? currentArticles.slice(1) : currentArticles;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={listTopRef} className="space-y-8">
      {/* Search & Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={`Search ${categoryName} stories, reviews, tags...`}
            className="w-full bg-neutral-950/80 border border-neutral-800 focus:border-brand-500 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 outline-none transition"
          />
        </div>

        {/* Sort Filter Tabs */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          <span className="text-[11px] font-medium text-neutral-400 mr-1 hidden md:inline flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" /> Sort:
          </span>
          <button
            onClick={() => {
              setSortBy('latest');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              sortBy === 'latest'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-neutral-800/80 text-neutral-400 hover:text-white'
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => {
              setSortBy('popular');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              sortBy === 'popular'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-neutral-800/80 text-neutral-400 hover:text-white'
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => {
              setSortBy('quick');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              sortBy === 'quick'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-neutral-800/80 text-neutral-400 hover:text-white'
            }`}
          >
            Quick Reads
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="py-20 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
          <p className="text-base text-neutral-400 font-medium">
            No articles found matching &ldquo;<span className="text-white">{searchQuery}</span>&rdquo;
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition"
          >
            Clear Search Filter
          </button>
        </div>
      )}

      {/* Featured Spotlight Story (Top of Page 1) */}
      {spotlightArticle && (
        <article className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition duration-300 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Image (7 cols) */}
            <div className="md:col-span-7 relative h-64 sm:h-80 md:h-[420px] bg-neutral-950 overflow-hidden">
              <Image
                src={spotlightArticle.featuredImage}
                alt={spotlightArticle.featuredImageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent md:hidden" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-600 text-white shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" /> Cover Story
                </span>
              </div>
            </div>

            {/* Details (5 cols) */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    {spotlightArticle.readTimeMinutes} min read
                  </span>
                  <span>•</span>
                  <span>
                    {new Date(spotlightArticle.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-display text-white group-hover:text-brand-400 transition leading-snug">
                  <Link href={`/${spotlightArticle.category}/${spotlightArticle.slug}`}>
                    {spotlightArticle.title}
                  </Link>
                </h2>

                <p className="text-sm text-neutral-300 leading-relaxed line-clamp-3">
                  {spotlightArticle.excerpt}
                </p>
              </div>

              {/* Author & Read More */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-brand-500">
                    <Image
                      src={spotlightArticle.author.avatar}
                      alt={spotlightArticle.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {spotlightArticle.author.name}
                    </span>
                    <span className="text-[10px] text-neutral-400 block">
                      {spotlightArticle.author.role.split('&')[0]}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/${spotlightArticle.category}/${spotlightArticle.slug}`}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs transition shadow-md"
                >
                  Read Story
                </Link>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Grid of Articles */}
      {gridArticles.length > 0 && (
        <div className="space-y-4">
          {gridArticles.map((article) => (
            <ArticleCard key={article.id} article={article} layout="horizontal" />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Category pagination"
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-800"
        >
          <span className="text-xs text-neutral-400">
            Showing <strong className="text-white">{startIndex + 1}</strong> -{' '}
            <strong className="text-white">
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredArticles.length)}
            </strong>{' '}
            of <strong className="text-white">{filteredArticles.length}</strong> stories
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - currentPage) <= 1
                )
                .map((pageNum, i, arr) => {
                  const prev = arr[i - 1];
                  const hasGap = prev && pageNum - prev > 1;

                  return (
                    <React.Fragment key={pageNum}>
                      {hasGap && <span className="text-neutral-600 px-1">...</span>}
                      <button
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${
                          currentPage === pageNum
                            ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                            : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                        }`}
                      >
                        {pageNum}
                      </button>
                    </React.Fragment>
                  );
                })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
