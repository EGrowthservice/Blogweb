import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES, ArticleData } from '@/data/mockArticles';
import CommentSection from '@/components/CommentSection';
import AdBanner from '@/components/AdBanner';
import { Clock } from 'lucide-react';

interface ArticleDetailViewProps {
  article: ArticleData;
  allArticles: ArticleData[];
  isCategoryPath?: boolean;
}

export default function ArticleDetailView({
  article,
  allArticles,
  isCategoryPath = false,
}: ArticleDetailViewProps) {
  const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pulseetm.click';
  const categoryInfo = CATEGORIES.find((c) => c.slug === article.category);
  const recommendedArticles = allArticles.filter((a) => a.slug !== article.slug);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const pageUrl = isCategoryPath
    ? `${siteBase}/${article.category}/${article.slug}`
    : `${siteBase}/${article.slug}`;

  const publishedIso =
    typeof article.publishedAt === 'string'
      ? article.publishedAt
      : new Date(article.publishedAt).toISOString();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    headline: article.title,
    description: article.excerpt,
    image: [article.featuredImage],
    datePublished: publishedIso,
    dateModified: publishedIso,
    publisher: {
      '@type': 'Organization',
      name: 'PULSE Entertainment',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top advertisement banner REMOVED as requested */}

        {/* 2-Column Article Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Article Content (8 cols) */}
          <main className="lg:col-span-8">
            <article>
              {/* Category Eyebrow */}
              <div className="mb-2">
                <Link
                  href={`/${article.category}`}
                  className="text-xs font-semibold text-blue-600 hover:underline uppercase tracking-wider"
                >
                  {categoryInfo?.name || 'Comedy Classics'}
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug tracking-tight mb-3">
                {article.title}
              </h1>

              {/* Meta: Only Posted Date (No read time, No author) */}
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 pb-4 border-b border-gray-200">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>Posted {formattedDate}</span>
              </div>

              {/* Featured Image */}
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-gray-100 mb-6">
                <Image
                  src={article.featuredImage}
                  alt={article.featuredImageAlt || article.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-cover"
                />
              </div>

              {/* Article Content Body */}
              <div
                className="article-prose"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* In-article ad placement (retained inside article content) */}
              <div className="my-8">
                <AdBanner variant="in-article" slot="5492817364" />
              </div>

              {/* Guest Comment Box */}
              <CommentSection articleSlug={article.slug} />
            </article>
          </main>

          {/* Sidebar: Recommended Posts (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="text-base font-bold text-gray-900 pb-3 mb-4 border-b border-gray-200">
                Recommended Posts
              </h3>

              <div className="space-y-4">
                {recommendedArticles.slice(0, 5).map((rec) => {
                  const recDate = new Date(rec.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  // If inside category path, use category url; else use clean slug
                  const recUrl = isCategoryPath
                    ? `/${rec.category}/${rec.slug}`
                    : `/${rec.slug}`;

                  return (
                    <article
                      key={rec.slug}
                      className="group flex gap-3 items-start pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
                    >
                      <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden bg-gray-200">
                        <Link href={recUrl} prefetch={true}>
                          <Image
                            src={rec.featuredImage}
                            alt={rec.title}
                            fill
                            sizes="80px"
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        </Link>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug">
                          <Link href={recUrl} prefetch={true}>
                            {rec.title}
                          </Link>
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1.5">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span>Posted {recDate}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Ad Placement */}
            <AdBanner variant="sidebar" slot="3829104756" />
          </aside>
        </div>
      </div>
    </>
  );
}
