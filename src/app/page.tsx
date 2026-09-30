import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles } from '@/lib/articles';
import { getAllCategories } from '@/lib/categories';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import { Clock, ArrowRight } from 'lucide-react';

export const revalidate = 0; // Dynamic database updates

export default async function HomePage() {
  const [categories, articles] = await Promise.all([
    getAllCategories(),
    getAllArticles(),
  ]);

  // Find top featured article for each dynamic category from database
  const categoryHighlights = categories.map((cat) => {
    const featured =
      articles.find((a) => a.category === cat.slug && a.isFeatured) ||
      articles.find((a) => a.category === cat.slug);
    return {
      category: cat,
      article: featured,
    };
  });

  const hasAnyCategoryArticles = categoryHighlights.some((c) => c.article !== undefined);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* 1. Dynamic Categories Showcase (Show only when articles exist) */}
      {hasAnyCategoryArticles && (
        <section className="mb-12 pb-10 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {categoryHighlights.map(({ category, article }) => (
              <div key={category.slug} className="flex flex-col">
                {/* Category Header */}
                <div className="border-b-2 border-gray-900 pb-2 mb-4">
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                    <Link href={`/${category.slug}`} className="hover:text-blue-600 transition">
                      {category.name}
                    </Link>
                  </h3>
                </div>

                {/* Category Featured Article Card */}
                {article ? (
                  <article className="group flex flex-col flex-1 bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition duration-200">
                    <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                      <Link href={`/${article.slug}`} tabIndex={-1} prefetch={true}>
                        <Image
                          src={article.featuredImage}
                          alt={article.featuredImageAlt || article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </Link>
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition leading-snug line-clamp-2">
                        <Link href={`/${article.slug}`} prefetch={true}>
                          {article.title}
                        </Link>
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2 mb-2">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>
                          Posted{' '}
                          {new Date(article.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </article>
                ) : (
                  <div className="p-8 text-center bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-400">
                    Stories coming soon
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. Main 2-Column Stories Feed */}
      <section className="mb-12">
        <div className="border-b border-gray-200 pb-3 mb-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Latest Stories
          </h2>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {categories.map((cat, idx) => (
              <React.Fragment key={cat.slug}>
                {idx > 0 && <span>•</span>}
                <Link href={`/${cat.slug}`} className="hover:text-blue-600 transition">
                  {cat.name}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="py-16 text-center bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-base font-semibold text-gray-900 mb-1">No stories published yet</h3>
            <p className="text-sm text-gray-500">
              New stories will appear here once published from the Admin dashboard.
            </p>
          </div>
        ) : (
          <>
            {/* 2-Columns Grid with direct /[slug] on homepage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id || article.slug}
                  article={article}
                  showCategoryInUrl={false}
                />
              ))}
            </div>

            {/* 3. More Stories Action Button */}
            <div className="mt-10 pt-4 flex justify-center">
              <Link
                href="/all-stories"
                prefetch={true}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gray-900 hover:bg-blue-600 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition duration-200"
              >
                <span>More Stories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Bottom Ad placement */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <AdBanner variant="multiplex" slot="9876543210" />
      </div>
    </div>
  );
}
